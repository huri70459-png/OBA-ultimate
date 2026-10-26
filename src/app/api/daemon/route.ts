import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { getDaemonStatus, maybeAutoCompress, runCompressionCycle } from "@/lib/brain/compressor";
import { isVectorIndexReady } from "@/lib/brain/store";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET /api/daemon — Memory Compression Daemon + vector index status. */
export async function GET() {
  await ensureSeedDataOnce();
  const status = getDaemonStatus();
  const [sessionCount, vectorCount, lastCompressed] = await Promise.all([
    db.item.count({ where: { itemType: "session" } }),
    db.itemVector.count(),
    db.project.aggregate({ _max: { lastCompressedAt: true } }),
  ]);

  return NextResponse.json({
    daemon: {
      autoIntervalMs: status.autoIntervalMs,
      lastRunAt: status.lastRunAt,
      lastReport: status.lastReport,
      running: status.running,
    },
    vectorIndex: {
      model: "brain-hash-v1",
      dim: 256,
      ready: isVectorIndexReady(),
      vectors: vectorCount,
    },
    sessions: sessionCount,
    lastCompressedAt: lastCompressed._max.lastCompressedAt,
  });
}

/** POST /api/daemon — run a compression cycle now (idempotent; safe to repeat). */
export async function POST(req: NextRequest) {
  try {
    const gate = await apiGuard(req, { mutation: true });
    if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
    await ensureSeedDataOnce();
    const report = await runCompressionCycle("manual");
    return NextResponse.json(report);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Compression cycle failed" },
      { status: 500 }
    );
  }
}

/** Keepalive hook for long-lived clients wanting an idle-scheduler nudge. */
export async function PUT(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: true });
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
  await ensureSeedDataOnce();
  maybeAutoCompress();
  return NextResponse.json({ ok: true });
}
