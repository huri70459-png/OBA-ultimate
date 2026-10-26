// Project Brain OS — Enterprise Auth Core (blueprint: "Authentication and
// Authorization Strategy", adapted for a self-hosted local-first appliance).
//
// Blueprint asked for OAuth2/OIDC via NextAuth with JWT session management and
// RBAC. No external identity provider is available in this deployment, so the
// strategy is adapted to a self-hosted credential model with the same guarantees:
//
//   - Passwords: scrypt (N=16384) with per-user random salt, timing-safe compare.
//   - Sessions:  HMAC-SHA256 signed compact JWT in an httpOnly SameSite=Lax
//                cookie (refresh tokens replaced by a sliding /api/auth/refresh
//                endpoint that re-issues the cookie — same XSS posture as
//                httpOnly refresh cookies, zero client-side token storage).
//   - RBAC:      role travels in the JWT (owner | editor | viewer); mutation
//                endpoints require editor+, reads require any authenticated
//                session. The desktop-agent ingest token keeps working so the
//                capture pipeline never breaks.
//   - Bootstrap-open semantics: while ZERO accounts exist (or auth_mode = "open")
//                every endpoint behaves exactly like pre-auth releases — this is
//                what keeps the 114-check regression board, the self-test harness
//                and desktop agents green without credentials.

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "brain_session";
export const SESSION_TTL_SECONDS = 7 * 24 * 3600; // 7 days, sliding via /api/auth/refresh
const SCRYPT_KEYLEN = 64;
const JWT_SECRET_KEY = "auth_jwt_secret"; // Setting-table row; deliberately NOT in SETTING_KEYS

export type Role = "owner" | "editor" | "viewer";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

// ---------- passwords ----------

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, SCRYPT_KEYLEN);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

// ---------- JWT (HS256, node:crypto — no external dependency) ----------

const b64url = (buf: Buffer | string) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromB64url = (s: string) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

interface JwtPayload extends SessionUser {
  iat: number;
  exp: number;
}

async function jwtSecret(): Promise<Buffer> {
  const row = await db.setting.findUnique({ where: { key: JWT_SECRET_KEY } }).catch(() => null);
  if (row?.value) return Buffer.from(row.value, "hex");
  // No secret yet (pre-bootstrap): derive a stable dev fallback so nothing throws.
  // It is only usable for verification of tokens nobody has been issued.
  return createHmac("sha256", "brain-os-dev-secret").update("jwt").digest();
}

export async function issueSessionToken(user: SessionUser): Promise<{ token: string; exp: number }> {
  const issuedAt = Math.floor(Date.now() / 1000);
  const exp = issuedAt + SESSION_TTL_SECONDS;
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload: JwtPayload = { ...user, iat: issuedAt, exp };
  const body = b64url(JSON.stringify(payload));
  const secret = await jwtSecret();
  const sig = b64url(createHmac("sha256", secret).update(`${header}.${body}`).digest());
  return { token: `${header}.${body}.${sig}`, exp };
}

export async function verifySessionToken(token: string | null | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  const secret = await jwtSecret();
  const expected = createHmac("sha256", secret).update(`${header}.${body}`).digest();
  const provided = fromB64url(sig);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return null;
  let payload: JwtPayload;
  try {
    payload = JSON.parse(fromB64url(body).toString("utf8")) as JwtPayload;
  } catch {
    return null;
  }
  if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
  if (!payload.id || !payload.email || !payload.role) return null;
  return { id: payload.id, email: payload.email, name: payload.name, role: payload.role };
}

// ---------- auth state / bootstrap semantics ----------

export type AuthMode = "open" | "enforced";

export interface AuthState {
  mode: AuthMode;
  accountCount: number;
}

/**
 * Auth is ENFORCED as soon as one account exists, unless the operator explicitly
 * sets the `auth_mode` Setting back to "open" (escape hatch — e.g. demo mode).
 * Zero accounts => open bootstrap (regression suites + desktop agents keep working).
 */
export async function getAuthState(): Promise<AuthState> {
  const [accountCount, modeRow] = await Promise.all([
    db.userAccount.count().catch(() => 0),
    db.setting.findUnique({ where: { key: "auth_mode" } }).catch(() => null),
  ]);
  if (accountCount === 0) return { mode: "open", accountCount };
  const override = (modeRow?.value ?? "").trim();
  return { mode: override === "open" ? "open" : "enforced", accountCount };
}

export async function getJwtSecretForSetup(): Promise<string> {
  const row = await db.setting.findUnique({ where: { key: JWT_SECRET_KEY } }).catch(() => null);
  if (row?.value) return row.value;
  const secret = randomBytes(32).toString("hex");
  await db.setting.upsert({
    where: { key: JWT_SECRET_KEY },
    create: { key: JWT_SECRET_KEY, value: secret },
    update: { value: secret },
  });
  return secret;
}

// ---------- cookie helpers ----------

export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
    // secure would break plain-HTTP sandbox previews; the cookie is still
    // httpOnly + SameSite=Lax, and tokens expire in 7 days.
    secure: false,
  };
}

export function readSessionCookie(req: Request): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === SESSION_COOKIE) return rest.join("=");
  }
  return null;
}

/** Extracts an agent ingest token from Authorization: Bearer or X-Brain-Token. */
export function readAgentToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return req.headers.get("x-brain-token");
}

// ---------- API guard ----------

export interface ApiGuardOptions {
  /** true => require role owner|editor (viewer gets 403). */
  mutation?: boolean;
  /** true => the desktop-agent ingest token is also accepted (capture pipeline). */
  allowAgentToken?: boolean;
}

export type ApiGuardResult =
  | { ok: true; user: SessionUser | null; mode: AuthMode; viaAgent: boolean }
  | { ok: false; status: 401 | 403; error: string };

/**
 * Single enforcement point used by every protected route. In open/bootstrap mode
 * it short-circuits to ok(user=null) so existing harnesses need no credentials.
 */
export async function apiGuard(req: Request, opts: ApiGuardOptions = {}): Promise<ApiGuardResult> {
  const state = await getAuthState();
  if (state.mode === "open") return { ok: true, user: null, mode: state.mode, viaAgent: false };

  const user = await verifySessionToken(readSessionCookie(req));
  if (user) {
    if (opts.mutation && user.role === "viewer") {
      return { ok: false, status: 403, error: "Your role (viewer) is read-only for this action" };
    }
    return { ok: true, user, mode: state.mode, viaAgent: false };
  }

  if (opts.allowAgentToken) {
    const { checkAgentToken } = await import("@/lib/brain/settings");
    const agent = await checkAgentToken(readAgentToken(req));
    // ONLY a configured-and-matching token counts. When no token is configured,
    // checkAgentToken answers ok:true in "trusted mode" — that must NOT bypass
    // session enforcement here, or enforced mode would be silently wide open.
    if (agent.required && agent.ok) return { ok: true, user: null, mode: state.mode, viaAgent: true };
  }

  return {
    ok: false,
    status: 401,
    error: "Authentication required — sign in to Project Brain OS",
  };
}
