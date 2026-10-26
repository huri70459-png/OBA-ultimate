// POST /api/auth/setup — bootstrap the FIRST account (owner role), OR — once an
// owner is signed in — invite additional accounts (owner|editor|viewer) without
// switching the session. Refuses unauthenticated second-account creation.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "node:crypto";
import {
  apiGuard,
  getAuthState,
  getJwtSecretForSetup,
  hashPassword,
  issueSessionToken,
  type Role,
} from "@/lib/auth";
import { writeSettings } from "@/lib/brain/settings";

export const dynamic = "force-dynamic";

const ROLES: Role[] = ["owner", "editor", "viewer"];

export async function POST(req: NextRequest) {
  try {
    const state = await getAuthState();
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim() || email.split("@")[0];
    const password = String(body.password ?? "");
    const requestedRole = ROLES.includes(body.role as Role) ? (body.role as Role) : "owner";

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const bootstrap = state.accountCount === 0;
    let role: Role = "owner";
    if (!bootstrap) {
      // Invite flow: only a signed-in owner may mint additional accounts.
      const gate = await apiGuard(req, { mutation: true });
      if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
      if (gate.user?.role !== "owner") {
        return NextResponse.json({ error: "Only the owner can invite accounts" }, { status: 403 });
      }
      role = requestedRole;
    }

    await getJwtSecretForSetup(); // generate the HMAC secret on first bootstrap
    const account = await db.userAccount.create({
      data: {
        id: randomUUID(),
        email,
        name,
        passwordHash: hashPassword(password),
        role,
        lastLoginAt: bootstrap ? new Date() : null,
      },
    });
    if (bootstrap) {
      // A now-existing account flips the default to enforced (unless explicitly open).
      await writeSettings({ auth_mode: "enforced" });
    }

    const res = NextResponse.json({
      ok: true,
      invited: !bootstrap,
      user: { id: account.id, email: account.email, name: account.name, role: account.role },
    });
    if (bootstrap) {
      const { token } = await issueSessionToken({
        id: account.id,
        email: account.email,
        name: account.name,
        role: "owner",
      });
      res.cookies.set("brain_session", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 3600,
      });
    }
    return res;
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Setup failed" },
      { status: 500 },
    );
  }
}
