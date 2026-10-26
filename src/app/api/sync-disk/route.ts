import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { syncMarkdownEditsFromDisk } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

/**
 * POST /api/sync-disk — Two-Way Obsidian Disk Sync (brain_api.py v2 parity).
 * Scans every tracked vault .md file; if the user edited it directly in Obsidian
 * or VS Code, the new content is synced into SQLite and the semantic vector
 * is re-embedded so search stays instant and accurate.
 */
export async function POST(req: NextRequest) {
  try {
    const gate = await apiGuard(req, { mutation: true });
    if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
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
