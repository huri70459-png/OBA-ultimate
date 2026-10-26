// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): durable job queue.
//
// Generic queue mechanics ON TOP of the existing CaptureJob table (extend, not
// duplicate): OCR/chunk/embed/extract/reconcile jobs ride the same durable
// ledger that capture idempotency already uses. Non-negotiables implemented:
//   - every job is idempotent (unique idempotencyKey, upsert semantics)
//   - workers claim with a LEASE (lockedAt/lockedBy) + stale-lease reclaim,
//     so a crashed worker cannot wedge a job forever
//   - failures back off exponentially and dead-letter after maxAttempts
//   - every failed job stays VISIBLE (status/lastError) and retryable
//
// Capture-ledger rows (kind "CAPTURE", status "completed") are never claimed:
// the queue only picks status "pending" with runAfter <= now.

import { randomUUID } from "crypto";
import { db } from "@/lib/db";

export const JOB_KINDS = [
  "CAPTURE",
  "OCR_ASSET",
  "CHUNK_ITEM",
  "EMBED_ITEM",
  "EXTRACT_ITEM",
  "REBUILD_PROJECT_SUMMARY",
  "SYNC_VAULT",
  "RECONCILE_VAULT",
  "GENERATE_REVIEW_QUEUE",
  "VERIFY_ACTION",
  "PROJECT_COMPRESS",
] as const;

export type JobKind = (typeof JOB_KINDS)[number];

export function isJobKind(value: unknown): value is JobKind {
  return typeof value === "string" && (JOB_KINDS as readonly string[]).includes(value);
}

const LEASE_STALE_MS = 5 * 60_000; // a lease older than this is reclaimed
const BASE_BACKOFF_MS = 30_000; // first retry waits 30s, then 60s, 120s ...

export interface EnqueueResult {
  job: {
    id: string;
    kind: string;
    status: string;
    attempts: number;
    runAfter: string;
  };
  deduped: boolean;
}

/** Idempotent enqueue: the same idempotencyKey folds into the existing row. */
export async function enqueueJob(params: {
  kind: JobKind;
  idempotencyKey?: string;
  payload?: Record<string, unknown>;
  runAfter?: Date;
  maxAttempts?: number;
}): Promise<EnqueueResult> {
  const idempotencyKey = (params.idempotencyKey || `job_${randomUUID().replace(/-/g, "").slice(0, 16)}`).slice(0, 191);
  const existing = await db.captureJob.findUnique({ where: { idempotencyKey } });
  if (existing) {
    return {
      job: {
        id: existing.id,
        kind: existing.kind,
        status: existing.status,
        attempts: existing.attempts,
        runAfter: existing.runAfter.toISOString(),
      },
      deduped: true,
    };
  }
  const created = await db.captureJob.create({
    data: {
      id: `job_${randomUUID().replace(/-/g, "").slice(0, 16)}`,
      idempotencyKey,
      kind: params.kind,
      payloadJson: JSON.stringify(params.payload ?? {}).slice(0, 8000),
      status: "pending",
      attempts: 0,
      maxAttempts: Math.min(Math.max(params.maxAttempts ?? 5, 1), 20),
      runAfter: params.runAfter ?? new Date(),
    },
  });
  return {
    job: {
      id: created.id,
      kind: created.kind,
      status: created.status,
      attempts: created.attempts,
      runAfter: created.runAfter.toISOString(),
    },
    deduped: false,
  };
}

/**
 * Claim one runnable job for a worker (lease acquisition). Only claims kinds
 * that a handler is registered for when `kinds` is provided — unregistered
 * kinds stay pending and visible instead of crash-looping.
 */
export async function claimJob(workerId: string, kinds?: JobKind[]) {
  const staleBefore = new Date(Date.now() - LEASE_STALE_MS);
  return db.$transaction(async (tx) => {
    const job = await tx.captureJob.findFirst({
      where: {
        status: "pending",
        runAfter: { lte: new Date() },
        OR: [{ lockedAt: null }, { lockedAt: { lt: staleBefore } }],
        ...(kinds && kinds.length ? { kind: { in: kinds } } : {}),
      },
      orderBy: { runAfter: "asc" },
    });
    if (!job) return null;
    return tx.captureJob.update({
      where: { id: job.id },
      data: {
        status: "processing",
        lockedAt: new Date(),
        lockedBy: workerId,
        attempts: { increment: 1 },
      },
    });
  });
}

export async function completeJob(id: string, resultItemId?: string | null) {
  return db.captureJob.update({
    where: { id },
    data: { status: "completed", lockedAt: null, lockedBy: null, lastError: "", ...(resultItemId ? { resultItemId } : {}) },
  });
}

/**
 * Failure path: exponential backoff while attempts remain, dead-letter
 * afterwards. The error is always persisted (failure visibility rule).
 */
export async function failJob(id: string, error: string) {
  const job = await db.captureJob.findUnique({ where: { id } });
  if (!job) return null;
  if (job.attempts >= job.maxAttempts) {
    return db.captureJob.update({
      where: { id },
      data: { status: "dead", lastError: error.slice(0, 2000), lockedAt: null, lockedBy: null },
    });
  }
  const backoffMs = BASE_BACKOFF_MS * Math.pow(2, Math.max(job.attempts - 1, 0));
  return db.captureJob.update({
    where: { id },
    data: {
      status: "pending",
      lastError: error.slice(0, 2000),
      runAfter: new Date(Date.now() + backoffMs),
      lockedAt: null,
      lockedBy: null,
    },
  });
}

/** Reclaim leases held by crashed workers (called at the top of every pass). */
export async function requeueStaleJobs(): Promise<number> {
  const staleBefore = new Date(Date.now() - LEASE_STALE_MS);
  const res = await db.captureJob.updateMany({
    where: { status: "processing", lockedAt: { lt: staleBefore } },
    data: { status: "pending", lockedAt: null, lockedBy: null },
  });
  return res.count;
}

export async function recentJobs(limit = 20) {
  const rows = await db.captureJob.findMany({
    orderBy: { updatedAt: "desc" },
    take: Math.min(Math.max(limit, 1), 100),
  });
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind,
    status: r.status,
    attempts: r.attempts,
    maxAttempts: r.maxAttempts,
    runAfter: r.runAfter.toISOString(),
    lastError: r.lastError,
    resultItemId: r.resultItemId,
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export async function jobStats(): Promise<{
  counts: Record<string, number>;
  pendingRunnable: number;
  deadLettered: number;
}> {
  const grouped = await db.captureJob.groupBy({ by: ["status"], _count: { status: true } });
  const counts: Record<string, number> = {};
  for (const g of grouped) counts[g.status] = g._count.status;
  const runnable = await db.captureJob.count({
    where: { status: "pending", runAfter: { lte: new Date() } },
  });
  return { counts, pendingRunnable: runnable, deadLettered: counts.dead ?? 0 };
}
