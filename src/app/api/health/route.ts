import { NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { maybeAutoCompress } from "@/lib/brain/compressor";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSeedDataOnce();
    // Idle daemon: fire-and-forget compression cycle if the 6h cadence elapsed
    maybeAutoCompress();
    return NextResponse.json({ status: "online", engine: "Project Brain OS v1" });
  } catch (e) {
    return NextResponse.json(
      { status: "degraded", error: e instanceof Error ? e.message : "seed failed" },
      { status: 500 }
    );
  }
}
