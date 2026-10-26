// v2.3 (blueprint "Bento Grid page.tsx") — live summary powering the Dashboard:
// workspace-wide counters, per-project knowledge health, and the latest activity.

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { getUniversalTimeline } from "@/lib/brain/store";
import { db } from "@/lib/db";
import type { DashboardSummary } from "@/lib/brain/types";

export const dynamic = "force-dynamic";

function healthStatus(score: number | null): string {
  if (score === null) return "Not scored yet";
  if (score >= 80) return "Healthy";
  if (score >= 55) return "Fair";
  return "Needs attention";
}

export async function GET(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: false });
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
  await ensureSeedDataOnce();

  const [projects, captures, decisions, edges, inbox, recent, projectRows] = await Promise.all([
    db.project.count(),
    db.item.count(),
    db.decision.count(),
    db.graphEdge.count(),
    db.item.count({ where: { projectId: null } }),
    getUniversalTimeline(null, 8),
    db.project.findMany({
      select: { id: true, name: true, healthScore: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const scored = projectRows.filter((p) => typeof p.healthScore === "number");
  const avgHealth =
    scored.length > 0
      ? Math.round(scored.reduce((sum, p) => sum + (p.healthScore ?? 0), 0) / scored.length)
      : null;

  const summary: DashboardSummary = {
    projects,
    captures,
    decisions,
    edges,
    inbox,
    avg_health: avgHealth,
    recent,
    health: projectRows.map((p) => ({
      id: p.id,
      name: p.name,
      score: p.healthScore ?? 0,
      status: healthStatus(p.healthScore),
    })),
  };
  return NextResponse.json(summary);
}
