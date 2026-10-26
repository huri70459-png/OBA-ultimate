// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): audit trail read API.
//
//   GET /api/audit?limit=50&event_type=capture.created&project_id=...&entity_id=...
//        -> { events: AuditEventView[], count, stats }
//
// Read-only view over the append-only BrainAuditEvent ledger (Phase 6's
// operations dashboard will build on this). Standard apiGuard — audit data is
// internal, so it requires a session in enforced mode.

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { auditEventStats, listAuditEvents } from "@/lib/brain/audit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: false });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  const params = req.nextUrl.searchParams;
  const limitRaw = Number(params.get("limit") ?? 50);
  const events = await listAuditEvents({
    limit: Number.isFinite(limitRaw) ? limitRaw : 50,
    eventType: params.get("event_type") || undefined,
    projectId: params.get("project_id") || undefined,
    entityId: params.get("entity_id") || undefined,
  });
  const stats = await auditEventStats();
  return NextResponse.json({ events, count: events.length, stats });
}
