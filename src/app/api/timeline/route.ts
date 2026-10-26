import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { getUniversalTimeline } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: false });
  if (!gate.ok) return NextResponse.json({ error: gate.error, timeline: [] }, { status: gate.status });
  await ensureSeedDataOnce();
  const date = req.nextUrl.searchParams.get("date");
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 50);
  const timeline = await getUniversalTimeline(date, Number.isFinite(limit) ? limit : 50);
  return NextResponse.json({ timeline });
}
