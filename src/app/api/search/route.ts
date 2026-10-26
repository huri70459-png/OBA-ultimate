import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { resolveProjectId, searchVaultHybrid, type SearchMode } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: false, allowAgentToken: true });
  if (!gate.ok) return NextResponse.json({ error: gate.error, results: [] }, { status: gate.status });
  await ensureSeedDataOnce();
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const rawId = req.nextUrl.searchParams.get("project_id");
  // Optional filter accepts id, slug, or name (MCP resolve_project_id parity)
  const projectId = rawId ? await resolveProjectId(rawId) : null;
  const rawMode = (req.nextUrl.searchParams.get("mode") ?? "hybrid").toLowerCase();
  const mode: SearchMode =
    rawMode === "semantic" || rawMode === "fts" ? rawMode : "hybrid";
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 20);

  const results = await searchVaultHybrid(q, {
    projectId,
    mode,
    limit: Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 20,
  });
  return NextResponse.json({ results, mode });
}
