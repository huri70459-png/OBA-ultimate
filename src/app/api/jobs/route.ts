// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1 + Phase 6 seed):
// durable job queue API.
//
//   GET  /api/jobs
//        -> { kinds, registered, stats: { counts, pendingRunnable, deadLettered },
//             recent: Job[] }
//
//   POST /api/jobs { action: "enqueue", kind, idempotency_key?, payload?,
//                    run_after? }
//        -> idempotent enqueue (same key folds into the existing row)
//   POST /api/jobs { action: "drain", max? }
//        -> run one worker pass; ONLY kinds with a registered handler are
//           claimed — unknown kinds stay pending and visible, never crash-loop
//
// Auth: standard apiGuard (mutation guarded; reads need a session in enforced
// mode). This endpoint is the seed of the blueprint's Phase 6 /api/admin/jobs.

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import {
  JOB_KINDS,
  enqueueJob,
  isJobKind,
  jobStats,
  recentJobs,
} from "@/lib/brain/jobs";
import { runDueJobs, registeredJobKinds } from "@/lib/brain/job-worker";
import { recordAuditEvent } from "@/lib/brain/audit";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: false });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });
  await ensureSeedDataOnce();
  const [stats, recent] = await Promise.all([jobStats(), recentJobs(20)]);
  return NextResponse.json({
    kinds: JOB_KINDS,
    registered: registeredJobKinds(),
    stats,
    recent,
  });
}

interface JobsPostBody {
  action?: string;
  kind?: string;
  idempotency_key?: string;
  idempotencyKey?: string;
  payload?: Record<string, unknown>;
  run_after?: string | number;
  runAfter?: string | number;
  max?: number;
}

export async function POST(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: true });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });
  await ensureSeedDataOnce();

  const body = (await req.json().catch(() => ({}))) as JobsPostBody;
  const action = String(body.action ?? "").trim();

  if (action === "enqueue") {
    const kind = body.kind;
    if (!isJobKind(kind)) {
      return NextResponse.json(
        { error: `Unknown job kind: ${String(kind)}`, allowed: JOB_KINDS },
        { status: 400 }
      );
    }
    const key = String(body.idempotency_key ?? body.idempotencyKey ?? "").trim();
    const runAfterRaw = body.run_after ?? body.runAfter;
    let runAfter: Date | undefined;
    if (typeof runAfterRaw === "number" && Number.isFinite(runAfterRaw)) {
      runAfter = new Date(runAfterRaw);
    } else if (typeof runAfterRaw === "string" && runAfterRaw.trim()) {
      const parsed = new Date(runAfterRaw);
      if (!Number.isNaN(parsed.getTime())) runAfter = parsed;
    }
    const { job, deduped } = await enqueueJob({
      kind,
      idempotencyKey: key || undefined,
      payload: body.payload && typeof body.payload === "object" ? body.payload : {},
      runAfter,
    });
    await recordAuditEvent({
      actorType: guard.viaAgent ? "agent" : guard.user ? "user" : "system",
      eventType: "job.enqueued",
      entityType: "CaptureJob",
      entityId: job.id,
      details: { kind, deduped, idempotency_key: key || null },
    });
    return NextResponse.json({ ok: true, deduped, job });
  }

  if (action === "drain") {
    const max = Number(body.max ?? 10);
    const summary = await runDueJobs({
      max: Number.isFinite(max) ? max : 10,
    });
    const failures = summary.details.filter((d) => d.outcome !== "completed");
    for (const f of failures.slice(0, 20)) {
      await recordAuditEvent({
        actorType: "system",
        eventType: "job.failed",
        entityType: "CaptureJob",
        entityId: f.id,
        details: { kind: f.kind, outcome: f.outcome, error: f.error ?? null },
      });
    }
    return NextResponse.json({ ok: true, ...summary });
  }

  return NextResponse.json(
    { error: "Unknown action — use 'enqueue' or 'drain'" },
    { status: 400 }
  );
}
