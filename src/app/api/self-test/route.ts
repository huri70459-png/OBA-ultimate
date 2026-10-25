import { NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { runSelfDiagnostics } from "@/lib/brain/selftest";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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
