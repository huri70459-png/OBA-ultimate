// v2.1 (port of brain_api.py POST /resolve) — mark an inbox item resolved with an
// optional note; state lives in the item's JSON metadata (backward compatible).

import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { resolveItem } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await ensureSeedDataOnce();
    const body = await req.json().catch(() => ({}));
    const itemId = String(body.item_id ?? body.itemId ?? "");
    const resolution = String(body.resolution ?? "");
    if (!itemId) {
      return NextResponse.json({ error: "item_id is required" }, { status: 400 });
    }
    const result = await resolveItem(itemId, resolution);
    return NextResponse.json(result, { status: result.ok ? 200 : 404 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Resolve failed" },
      { status: 500 }
    );
  }
}
