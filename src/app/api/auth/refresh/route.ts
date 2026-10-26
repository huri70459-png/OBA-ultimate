// POST /api/auth/refresh — sliding-session renewal. The api-client calls this
// once on a 401 and replays the original request with the fresh cookie
// (blueprint's refresh-token flow, implemented with httpOnly cookies instead of
// client-stored refresh tokens).

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { issueSessionToken, readSessionCookie, verifySessionToken, type Role } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const current = await verifySessionToken(readSessionCookie(req));
    if (!current) {
      return NextResponse.json({ error: "No renewable session" }, { status: 401 });
    }
    // Re-read the account so role changes take effect without waiting for expiry.
    const account = await db.userAccount.findUnique({ where: { id: current.id } });
    if (!account) {
      return NextResponse.json({ error: "Account no longer exists" }, { status: 401 });
    }
    const { token, exp } = await issueSessionToken({
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role as Role,
    });
    const res = NextResponse.json({ ok: true, expires_at: exp });
    res.cookies.set("brain_session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 7 * 24 * 3600 });
    return res;
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Refresh failed" },
      { status: 500 },
    );
  }
}
