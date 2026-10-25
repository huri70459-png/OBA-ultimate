import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { resolveProjectId } from "@/lib/brain/store";
import { findCrossProjectSolutions } from "@/lib/brain/compressor";

export const dynamic = "force-dynamic";

/**
 * GET /api/cross-project?q=...&exclude_project_id=... — Cross-Project Learning
 * (brain_api.py v2 parity). Searches all OTHER projects in the vault to surface
 * a fix for a bug that was already solved somewhere else.
 */
export async function GET(req: NextRequest) {
  try {
    await ensureSeedDataOnce();
    const q = req.nextUrl.searchParams.get("q") ?? "";
    if (!q.trim()) {
      return NextResponse.json({ solutions: [] });
    }
    const excludeRaw = req.nextUrl.searchParams.get("exclude_project_id") ?? "";
    const excludeProjectId = excludeRaw ? await resolveProjectId(excludeRaw) : null;
    const solutions = await findCrossProjectSolutions(q, excludeProjectId);
    return NextResponse.json({ solutions });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Cross-project search failed" },
      { status: 500 }
    );
  }
}
