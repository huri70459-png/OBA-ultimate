import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { runSelfDiagnostics } from "@/lib/brain/selftest";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // The harness writes scenario captures — editor+ role required when enforced.
    const gate = await apiGuard(req, { mutation: true });
    if (!gate.ok) {
      return NextResponse.json(
        { ok: false, checks: [{ name: "Auth", status: "FAIL", detail: gate.error }] },
        { status: gate.status }
      );
    }
    await ensureSeedDataOnce();
    const result = await runSelfDiagnostics();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { ok: false, checks: [{ name: "Bootstrap", status: "FAIL", detail: e instanceof Error ? e.message : String(e) }] },
      { status: 500 }
    );
  }
}
