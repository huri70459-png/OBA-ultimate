import { NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSeedDataOnce();
    return NextResponse.json({ status: "online", engine: "Project Brain OS v1" });
  } catch (e) {
    return NextResponse.json(
      { status: "degraded", error: e instanceof Error ? e.message : "seed failed" },
      { status: 500 }
    );
  }
}
