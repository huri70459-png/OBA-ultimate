import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { resolveProjectId } from "@/lib/brain/store";
import { compressProjectMemory } from "@/lib/brain/compressor";

export const dynamic = "force-dynamic";

/**
 * POST /api/compress — force per-project Memory Compression (brain_api.py v2 parity).
 * Body: { project_id } (accepts id, slug, or display name).
 * Re-synthesizes the Tier-1 rolling summary (< 450 tokens), persists the Knowledge
 * Health Score, and regenerates _project_summary.md + _work_replay.md on disk.
 */
export async function POST(req: NextRequest) {
  try {
    await ensureSeedDataOnce();
    const body = await req.json().catch(() => ({}));
    const identifier = String(body.project_id ?? body.projectId ?? "");
    if (!identifier) {
      return NextResponse.json({ error: "Field 'project_id' is required" }, { status: 400 });
    }
    const projectId = await resolveProjectId(identifier);
    if (!projectId) {
      return NextResponse.json({ error: `Project '${identifier}' not found` }, { status: 404 });
    }
    const report = await compressProjectMemory(projectId);
    if ("error" in report) {
      return NextResponse.json(report, { status: 404 });
    }
    return NextResponse.json(report);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Compression failed" },
      { status: 500 }
    );
  }
}
