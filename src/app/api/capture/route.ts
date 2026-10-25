import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { capture } from "@/lib/brain/pipeline";
import { compressProjectMemory } from "@/lib/brain/compressor";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await ensureSeedDataOnce();
    const body = await req.json();
    const result = await capture({
      rawContent: body.raw_content ?? body.rawContent ?? "",
      itemType: body.item_type ?? body.itemType ?? "note",
      windowTitle: body.window_title ?? body.windowTitle ?? "",
      activeFilePath: body.active_file_path ?? body.activeFilePath ?? "",
      sourceApp: body.source_app ?? body.sourceApp ?? "Workspace UI",
      sourceUrl: body.source_url ?? body.sourceUrl ?? "",
      assetPath: body.asset_path ?? body.assetPath ?? "",
      visualHint: body.visual_hint ?? body.visualHint ?? "",
    });
    // v2 wiring (brain_api.py parity): automatically re-compress project memory
    // whenever a new capture lands so Tier-1 rolling memory is always fresh.
    const matchedPid = result.projectMatch?.projectId;
    if (matchedPid) {
      const compression = await compressProjectMemory(matchedPid);
      return NextResponse.json({ ...result, memory_compression: compression });
    }
    return NextResponse.json({ ...result, memory_compression: { skipped: true } });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Capture failed" },
      { status: 500 }
    );
  }
}
