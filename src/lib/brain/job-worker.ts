// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): in-process job worker.
//
// A drain pass claims due jobs (lease-held), runs the registered handler, and
// lands the outcome (complete / backoff / dead-letter). Handlers are registered
// per kind — unregistered kinds are never claimed, so a future job type cannot
// crash-loop the worker before its handler ships.
//
// Built-in handlers wire the queue to REAL existing engine work so the loop is
// useful immediately; Phase 2/3 adds CHUNK_ITEM/EMBED_ITEM/EXTRACT_ITEM on top.

import { randomUUID } from "crypto";
import {
  claimJob,
  completeJob,
  failJob,
  requeueStaleJobs,
  type JobKind,
} from "./jobs";
import { syncMarkdownEditsFromDisk } from "./store";
import { compressProjectMemory } from "./compressor";

type JobHandler = (
  payload: Record<string, unknown>,
  job: { id: string; kind: JobKind }
) => Promise<Record<string, unknown> | void>;

const handlers = new Map<JobKind, JobHandler>();

export function registerJobHandler(kind: JobKind, handler: JobHandler): void {
  handlers.set(kind, handler);
}

export function registeredJobKinds(): JobKind[] {
  return [...handlers.keys()];
}

// ---- built-in handlers (real engine work, wired day one) -------------------

registerJobHandler("RECONCILE_VAULT", async () => {
  const stats = await syncMarkdownEditsFromDisk();
  return { ...(stats as unknown as Record<string, unknown>) };
});

registerJobHandler("PROJECT_COMPRESS", async (payload) => {
  const projectId = String(payload.projectId ?? "");
  if (!projectId) throw new Error("PROJECT_COMPRESS requires payload.projectId");
  const report = await compressProjectMemory(projectId);
  if (report && typeof report === "object" && "error" in report) {
    throw new Error(String(report.error)); // translate soft errors -> backoff
  }
  return { ...(report as unknown as Record<string, unknown>) };
});

// ---- drain pass --------------------------------------------------------------

export interface DrainSummary {
  workerId: string;
  claimed: number;
  completed: number;
  failed: number;
  dead: number;
  details: Array<{ id: string; kind: string; outcome: string; error?: string }>;
}

/**
 * One worker pass. Returns a full accounting — the caller (API route, daemon,
 * future scheduler) decides what to log/report. Never throws job errors upward.
 */
export async function runDueJobs(opts: { max?: number; workerId?: string } = {}): Promise<DrainSummary> {
  const workerId = opts.workerId || `worker_${randomUUID().replace(/-/g, "").slice(0, 8)}`;
  const max = Math.min(Math.max(opts.max ?? 10, 1), 50);
  const summary: DrainSummary = { workerId, claimed: 0, completed: 0, failed: 0, dead: 0, details: [] };

  await requeueStaleJobs();

  for (let i = 0; i < max; i++) {
    const job = await claimJob(workerId, registeredJobKinds());
    if (!job) break;
    summary.claimed++;
    const kind = job.kind as JobKind;
    const handler = handlers.get(kind);
    if (!handler) {
      // Defensive: claimJob filters to registered kinds, this is belt-and-braces.
      await failJob(job.id, `No handler registered for kind ${kind}`);
      summary.failed++;
      summary.details.push({ id: job.id, kind, outcome: "failed", error: "no handler" });
      continue;
    }
    let payload: Record<string, unknown> = {};
    try {
      payload = JSON.parse(job.payloadJson || "{}") as Record<string, unknown>;
    } catch {
      payload = {};
    }
    try {
      const result = await handler(payload, { id: job.id, kind });
      await completeJob(job.id);
      summary.completed++;
      summary.details.push({ id: job.id, kind, outcome: "completed" });
      void result;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const updated = await failJob(job.id, message);
      const dead = updated?.status === "dead";
      if (dead) summary.dead++;
      else summary.failed++;
      summary.details.push({ id: job.id, kind, outcome: dead ? "dead" : "retry_scheduled", error: message });
    }
  }

  return summary;
}
