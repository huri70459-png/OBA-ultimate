// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): append-only audit trail.
//
// Every state-changing action that matters (captures, edits, fix verifications,
// job failures) records who/what/when with structured details. Two hard rules:
//   1. recordAuditEvent is a NEVER-THROW: auditing must never break the
//      operation it observes (failures log a warning and are swallowed).
//   2. Rows are append-only: nothing in this module updates or deletes events.

import { randomUUID } from "crypto";
import { db } from "@/lib/db";

export type AuditActorType = "user" | "agent" | "system" | "llm";

export interface AuditEventInput {
  projectId?: string | null;
  actorType?: AuditActorType;
  actorId?: string | null;
  eventType: string;
  entityType?: string;
  entityId?: string | null;
  details?: Record<string, unknown>;
}

/** Append one audit row. Never throws — non-fatal by contract. */
export async function recordAuditEvent(input: AuditEventInput): Promise<void> {
  try {
    await db.brainAuditEvent.create({
      data: {
        id: `aud_${randomUUID().replace(/-/g, "").slice(0, 16)}`,
        projectId: input.projectId ?? null,
        actorType: input.actorType ?? "system",
        actorId: input.actorId ?? null,
        eventType: input.eventType.slice(0, 120),
        entityType: (input.entityType || "Item").slice(0, 60),
        entityId: input.entityId ?? null,
        detailsJson: JSON.stringify(input.details ?? {}).slice(0, 8000),
      },
    });
  } catch (err) {
    console.warn(
      "[audit] event write failed (non-fatal):",
      err instanceof Error ? err.message : err
    );
  }
}

function safeParse(json: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

export interface AuditEventView {
  id: string;
  projectId: string | null;
  actorType: string;
  actorId: string | null;
  eventType: string;
  entityType: string;
  entityId: string | null;
  details: Record<string, unknown>;
  createdAt: string;
}

/** Recent events, newest first. Read model for /api/audit (and Phase 6 ops view). */
export async function listAuditEvents(
  opts: {
    projectId?: string;
    eventType?: string;
    entityId?: string;
    limit?: number;
  } = {}
): Promise<AuditEventView[]> {
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
  const rows = await db.brainAuditEvent.findMany({
    where: {
      ...(opts.projectId ? { projectId: opts.projectId } : {}),
      ...(opts.eventType ? { eventType: opts.eventType } : {}),
      ...(opts.entityId ? { entityId: opts.entityId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map((r) => ({
    id: r.id,
    projectId: r.projectId,
    actorType: r.actorType,
    actorId: r.actorId,
    eventType: r.eventType,
    entityType: r.entityType,
    entityId: r.entityId,
    details: safeParse(r.detailsJson),
    createdAt: r.createdAt.toISOString(),
  }));
}

/** Per-event-type counts over all time — quick health signal for the ops board. */
export async function auditEventStats(): Promise<Record<string, number>> {
  const grouped = await db.brainAuditEvent.groupBy({
    by: ["eventType"],
    _count: { eventType: true },
  });
  const stats: Record<string, number> = {};
  for (const g of grouped) stats[g.eventType] = g._count.eventType;
  return stats;
}
