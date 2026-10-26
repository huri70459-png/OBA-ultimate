// v2.1 (port of brain_api.py GET /inbox) — unrouted captures with triage state

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { listInbox } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const gate = await apiGuard(req, { mutation: false });
    if (!gate.ok) return NextResponse.json({ error: gate.error, items: [] }, { status: gate.status });
    await ensureSeedDataOnce();
    const limit = Number(req.nextUrl.searchParams.get("limit") ?? "80");
    const items = await listInbox(Number.isFinite(limit) ? limit : 80);
    return NextResponse.json({
      items: items.map((it) => ({
        ...it,
        triage_status:
          typeof it.metadata?.triage_status === "string" ? it.metadata.triage_status : "open",
      })),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Inbox listing failed" },
      { status: 500 }
    );
  }
}
