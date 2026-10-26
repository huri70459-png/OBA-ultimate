// GET /api/auth/session — single source of truth for the UI auth gate.
// Always 200: the response shape tells the client what to render.
//   { mode: "open" }                              → no gate, workspace renders
//   { mode: "enforced", needs_setup: true }       → offer optional owner setup
//   { mode: "enforced", authenticated: true, user } → workspace renders
//   { mode: "enforced", authenticated: false }    → login card

import { NextRequest, NextResponse } from "next/server";
import { getAuthState, readSessionCookie, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const state = await getAuthState();
    if (state.mode === "open") {
      return NextResponse.json({ mode: "open", authenticated: false, needs_setup: false, user: null });
    }
    const user = await verifySessionToken(readSessionCookie(req));
    return NextResponse.json({
      mode: "enforced",
      authenticated: Boolean(user),
      needs_setup: state.accountCount === 0,
      user,
    });
  } catch (e) {
    return NextResponse.json(
      { mode: "open", authenticated: false, needs_setup: false, user: null, error: e instanceof Error ? e.message : "session check failed" },
      { status: 200 },
    );
  }
}
