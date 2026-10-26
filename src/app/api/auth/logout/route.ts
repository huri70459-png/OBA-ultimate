// POST /api/auth/logout — clears the session cookie.

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("brain_session", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
