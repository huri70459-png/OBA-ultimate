// POST /api/auth/login — credential sign-in, issues the httpOnly session cookie.

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthState, issueSessionToken, verifyPassword, type Role } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const state = await getAuthState();
    if (state.accountCount === 0) {
      return NextResponse.json({ error: "No account exists yet — complete setup first" }, { status: 404 });
    }
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    const account = await db.userAccount.findUnique({ where: { email } });
    if (!account || !verifyPassword(password, account.passwordHash)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    await db.userAccount.update({ where: { id: account.id }, data: { lastLoginAt: new Date() } });

    const { token, exp } = await issueSessionToken({
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role as Role,
    });
    const res = NextResponse.json({
      ok: true,
      user: { id: account.id, email: account.email, name: account.name, role: account.role },
      expires_at: exp,
    });
    res.cookies.set("brain_session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 7 * 24 * 3600 });
    return res;
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Login failed" },
      { status: 500 },
    );
  }
}
