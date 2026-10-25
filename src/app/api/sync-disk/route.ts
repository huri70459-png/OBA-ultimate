import { NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { syncMarkdownEditsFromDisk } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

/**
 * POST /api/sync-disk — Two-Way Obsidian Disk Sync (brain_api.py v2 parity).
 * Scans every tracked vault .md file; if the user edited it directly in Obsidian
 * or VS Code, the new content is synced into SQLite and the semantic vector
 * is re-embedded so search stays instant and accurate.
 */
export async function POST() {
  try {
    await ensureSeedDataOnce();
    const stats = await syncMarkdownEditsFromDisk();
    return NextResponse.json(stats);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Disk sync failed" },
      { status: 500 }
    );
  }
}
