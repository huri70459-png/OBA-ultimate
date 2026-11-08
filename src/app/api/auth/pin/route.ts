// POST /api/auth/pin — opt-in local quick unlock. A PIN is intentionally not
// presented as a WebAuthn passkey: it is lower assurance and only suitable for
// a trusted local installation.
import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { issueSessionToken, type Role } from "@/lib/auth";

export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; startedAt: number }>();

function browserForm(req: NextRequest) {
  return req.headers.get("content-type")?.includes("application/x-www-form-urlencoded") ?? false;
}

function redirect(req: NextRequest, result: "invalid" | "disabled" | "limited") {
  return new NextResponse(null, { status: 303, headers: { Location: `/local-pin?${result}=1` } });
}

function clientKey(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const state = attempts.get(key);
  if (!state || now - state.startedAt > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return state.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string) {
  const now = Date.now();
  const state = attempts.get(key);
  if (!state || now - state.startedAt > WINDOW_MS) {
    attempts.set(key, { count: 1, startedAt: now });
  } else {
    state.count += 1;
  }
}

function sameSecret(value: string, configured: string) {
  const a = Buffer.from(value);
  const b = Buffer.from(configured);
  return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const form = browserForm(req);
  const configuredPin = process.env.AUTH_LOCAL_PIN?.trim() ?? "";
  if (!configuredPin) return form ? redirect(req, "disabled") : NextResponse.json({ error: "Local PIN login is not enabled" }, { status: 404 });
  const key = clientKey(req);
  if (isRateLimited(key)) return form ? redirect(req, "limited") : NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });

  try {
    const body = form ? Object.fromEntries(await req.formData()) : await req.json().catch(() => ({}));
    const pin = String(body.pin ?? "");
    if (!sameSecret(pin, configuredPin)) {
      recordFailure(key);
      return form ? redirect(req, "invalid") : NextResponse.json({ error: "Invalid local PIN" }, { status: 401 });
    }

    const owner = await db.userAccount.findFirst({ where: { role: "owner" }, orderBy: { createdAt: "asc" } });
    if (!owner) return form ? redirect(req, "disabled") : NextResponse.json({ error: "No owner account is configured" }, { status: 404 });

    attempts.delete(key);

    const { token, exp } = await issueSessionToken({ id: owner.id, email: owner.email, name: owner.name, role: owner.role as Role });
    const res = form ? new NextResponse(null, { status: 303, headers: { Location: "/?pin-login=1" } }) : NextResponse.json({ ok: true, expires_at: exp });
    res.cookies.set("brain_session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 7 * 24 * 3600 });
    return res;
  } catch (error) {
    console.error("Local PIN login failed", error instanceof Error ? error.message : "unknown error");
    return form ? redirect(req, "invalid") : NextResponse.json({ error: "Local PIN login failed" }, { status: 500 });
  }
}
