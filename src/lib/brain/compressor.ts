// Project Brain OS — Engine 3: AI Memory Compression Daemon
// Port/upgrade of the blueprint's memory_compressor.py:
//   1. Session Rollup      -> groups captures from one coding block (gap <= 90 min)
//                             into a "session" item (Universal Timeline / Work Replay
//                             without 24/7 recording).
//   2. Project Summary Update -> re-synthesizes rolling memory (Tier 1) per project
//                             and persists the Knowledge Health Score + gap flags.
// Deterministic (no LLM required), idempotent (deterministic session keys), and
// safe to run repeatedly. Triggers: manual (UI/POST), auto-idle (>= 6h since last
// run, kicked off from /api/health), and self-test.

import { db } from "@/lib/db";
import { topKeywords } from "./embeddings";
import { computeHealthAndGaps, ensureVectorIndex, saveItem } from "./store";
import type {
  BrainDecision,
  BrainItem,
  BrainProject,
  CompressionReport,
  HealthGap,
} from "./types";

const SESSION_GAP_MS = 90 * 60 * 1000; // a new session starts after a 90-minute lull
const MIN_SESSION_ITEMS = 2; // a block needs >= 2 captures to be worth rolling up
const AUTO_INTERVAL_MS = 6 * 60 * 60 * 1000; // auto/idle cadence: every 6 hours
const SUMMARY_WINDOW_DAYS = 14;

// ------------------------------------------
// Daemon state (per server process)
// ------------------------------------------
let lastRunAt: string | null = null;
let lastReport: CompressionReport | null = null;
let inflight: Promise<CompressionReport> | null = null;

export function getDaemonStatus() {
  return { lastRunAt, lastReport, autoIntervalMs: AUTO_INTERVAL_MS, running: Boolean(inflight) };
}

/**
 * Auto/idle trigger — fires a compression cycle in the background if the last run
 * is older than the 6h cadence. Never throws; never blocks the caller.
 */
export function maybeAutoCompress(): void {
  if (inflight) return;
  if (lastRunAt && Date.now() - new Date(lastRunAt).getTime() < AUTO_INTERVAL_MS) return;
  void runCompressionCycle("auto").catch(() => {
    /* daemon errors are non-fatal by design */
  });
}

// ------------------------------------------
// 1. SESSION ROLLUP
// ------------------------------------------

interface TimeBlock {
  projectId: string | null;
  items: { id: string; itemType: string; title: string; structuredSummary: string; rawContent: string; capturedAt: Date }[];
  start: Date;
  end: Date;
}

/** Splits an ordered item stream into coding blocks whenever the gap exceeds 90 minutes. */
function splitIntoBlocks(
  rows: { id: string; itemType: string; title: string; structuredSummary: string; rawContent: string; projectId: string | null; capturedAt: Date }[]
): TimeBlock[] {
  const blocks: TimeBlock[] = [];
  let current: TimeBlock | null = null;

  const groups = new Map<string | null, typeof rows>();
  for (const row of rows) {
    const key = row.projectId ?? "__inbox__";
    const arr = groups.get(key) ?? [];
    arr.push(row);
    groups.set(key, arr);
  }

  for (const [key, groupRows] of groups) {
    current = null;
    for (const row of groupRows) {
      if (
        current &&
        row.capturedAt.getTime() - current.end.getTime() <= SESSION_GAP_MS
      ) {
        current.items.push(row);
        current.end = row.capturedAt;
      } else {
        current = {
          projectId: key === "__inbox__" ? null : row.projectId,
          items: [row],
          start: row.capturedAt,
          end: row.capturedAt,
        };
        blocks.push(current);
      }
    }
  }
  return blocks;
}

function fmtHM(d: Date): string {
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}

async function rollupSessions(): Promise<CompressionReport["sessionDetails"]> {
  const rows = await db.item.findMany({
    where: { itemType: { not: "session" } }, // never re-rollup previous rollups
    orderBy: { capturedAt: "asc" },
    select: {
      id: true,
      itemType: true,
      title: true,
      structuredSummary: true,
      rawContent: true,
      projectId: true,
      capturedAt: true,
    },
  });

  const blocks = splitIntoBlocks(rows).filter(
    (b) => b.items.length >= MIN_SESSION_ITEMS
  );

  const created: CompressionReport["sessionDetails"] = [];
  for (const block of blocks) {
    const first = block.items[0];
    const last = block.items[block.items.length - 1];
    // Deterministic, idempotent session key — same block never rolls up twice
    const sessionKey = `sess_${block.projectId ?? "inbox"}_${first.id}_${last.id}`;

    const existing = await db.item.findFirst({
      where: { itemType: "session", metadata: { contains: sessionKey } },
      select: { id: true },
    });
    if (existing) continue;

    const typeCounts: Record<string, number> = {};
    for (const it of block.items) {
      typeCounts[it.itemType] = (typeCounts[it.itemType] ?? 0) + 1;
    }
    const typeStr = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([t, n]) => `${n} ${t}${n > 1 ? "s" : ""}`)
      .join(", ");
    const keywords = topKeywords(
      block.items.map((i) => `${i.title} ${i.rawContent}`).join(" "),
      6
    );
    const day = block.start.toISOString().slice(0, 10);
    const projectName = block.projectId
      ? (await db.project.findUnique({ where: { id: block.projectId }, select: { name: true } }))?.name ?? "Project"
      : "Inbox";
    const title = `Work Session ${day} · ${fmtHM(block.start)}–${fmtHM(last.capturedAt)} · ${block.items.length} captures`;

    const rawContent =
      `# ${title}\n\n` +
      `**Project:** ${projectName}\n` +
      `**Block:** ${block.start.toISOString()} → ${last.capturedAt.toISOString()} (gap-tolerant rollup, 90 min)\n` +
      `**Members:** ${block.items.length} (${typeStr})\n` +
      `**Top topics:** ${keywords.join(", ") || "—"}\n\n` +
      `## Captures in this block\n` +
      block.items
        .map((i) => `- [${fmtHM(i.capturedAt)}] **${i.itemType}** ${i.title}${i.structuredSummary ? ` — ${i.structuredSummary.slice(0, 140)}` : ""}`)
        .join("\n") +
      "\n";

    await saveItem({
      title,
      rawContent,
      itemType: "session",
      projectId: block.projectId,
      structuredSummary: `Rolled up ${block.items.length} captures (${typeStr}) · topics: ${keywords.slice(0, 4).join(", ") || "—"}`,
      sourceApp: "MemoryCompressionDaemon",
      metadata: {
        session_key: sessionKey,
        session_start: block.start.toISOString(),
        session_end: last.capturedAt.toISOString(),
        member_ids: block.items.map((i) => i.id),
        type_counts: typeCounts,
        keywords,
      },
    });

    created.push({
      projectId: block.projectId,
      projectName,
      title,
      members: block.items.length,
    });
  }
  return created;
}

// ------------------------------------------
// 2. PROJECT SUMMARY RE-SYNTHESIS + HEALTH PERSISTENCE
// ------------------------------------------

function synthesizeRollingSummary(
  project: BrainProject,
  items: BrainItem[],
  decisions: BrainDecision[],
  gaps: HealthGap[],
  lastSessionTitle: string | null
): string {
  const typeCounts: Record<string, number> = {};
  for (const it of items) typeCounts[it.itemType] = (typeCounts[it.itemType] ?? 0) + 1;
  const typeStr = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([t, n]) => `${n} ${t}${n > 1 ? "s" : ""}`)
    .join(", ");
  const keywords = topKeywords(
    items.map((i) => `${i.title} ${i.rawContent}`).join(" "),
    8
  );
  const sessionLine = lastSessionTitle ? `\n- Latest work session: ${lastSessionTitle}` : "";

  const lines: string[] = [];
  lines.push(
    `Compressed memory for **${project.name}** (auto-synthesized by the Memory Compression Daemon).`
  );
  lines.push(``);
  lines.push(`## Current Focus`);
  lines.push(
    keywords.length > 0
      ? `Active themes across recent captures: ${keywords.join(", ")}.`
      : `No recent capture activity to derive themes from.`
  );
  lines.push(``);
  lines.push(`## Recent Activity (last ${SUMMARY_WINDOW_DAYS} days)`);
  lines.push(`- ${items.length} captures on record (${typeStr || "none"}).${sessionLine}`);
  lines.push(``);
  lines.push(`## Active Decisions (do not violate)`);
  if (decisions.length > 0) {
    for (const d of decisions.slice(0, 5)) {
      lines.push(`- **${d.title}**: ${d.decision} (Reason: ${d.reasoning})`);
    }
  } else {
    lines.push(`- None logged yet — capture choices with 'Decision: ... Reason: ...'`);
  }
  if (gaps.length > 0) {
    lines.push(``);
    lines.push(`## Knowledge Gaps`);
    for (const g of gaps) lines.push(`- [${g.severity.toUpperCase()}] ${g.gap} — ${g.detail}`);
  }
  return lines.join("\n");
}

async function updateProjectSummaries(
  trigger: CompressionReport["trigger"]
): Promise<{ updated: string[]; gapReport: Record<string, HealthGap[]> }> {
  const projects = await db.project.findMany({ orderBy: { updatedAt: "desc" } });
  const updated: string[] = [];
  const gapReport: Record<string, HealthGap[]> = {};

  for (const prow of projects) {
    const [itemRows, decisionRows] = await Promise.all([
      db.item.findMany({
        where: {
          projectId: prow.id,
          capturedAt: {
            gte: new Date(Date.now() - SUMMARY_WINDOW_DAYS * 864e5),
          },
        },
        orderBy: { capturedAt: "desc" },
        take: 100,
      }),
      db.decision.findMany({
        where: { projectId: prow.id },
        orderBy: { decidedAt: "desc" },
        take: 10,
      }),
    ]);

    // Nothing to derive from — keep existing summary untouched
    if (itemRows.length === 0) continue;

    const items = itemRows.map((r) => ({
      id: r.id,
      itemType: r.itemType,
      title: r.title,
      structuredSummary: r.structuredSummary,
      rawContent: r.rawContent,
      metadata: r.metadata,
      projectId: r.projectId,
      capturedAt: r.capturedAt,
    })) as never as BrainItem[];

    const decisions: BrainDecision[] = decisionRows.map((d) => ({
      id: d.id,
      projectId: d.projectId,
      title: d.title,
      decision: d.decision,
      alternatives: [],
      reasoning: d.reasoning,
      outcome: d.outcome,
      sourceItemId: d.sourceItemId,
      decidedAt: d.decidedAt.toISOString(),
    }));

    const project = {
      id: prow.id,
      name: prow.name,
      slug: prow.slug,
      rootPath: prow.rootPath,
      keywords: JSON.parse(prow.keywords || "[]") as string[],
      gitRemotes: JSON.parse(prow.gitRemotes || "[]") as string[],
      rollingSummary: prow.rollingSummary,
      createdAt: prow.createdAt.toISOString(),
      updatedAt: prow.updatedAt.toISOString(),
    };

    const { score, gaps } = computeHealthAndGaps(project, items, decisions);
    gapReport[project.name] = gaps;

    const lastSessionRow = await db.item.findFirst({
      where: { projectId: prow.id, itemType: "session" },
      orderBy: { capturedAt: "desc" },
      select: { title: true },
    });

    const synthesized = synthesizeRollingSummary(
      project,
      items,
      decisions,
      gaps,
      lastSessionRow?.title ?? null
    );

    // Only write when content actually changed (no churn on repeated runs)
    if (synthesized !== prow.rollingSummary) {
      await db.project.update({
        where: { id: prow.id },
        data: {
          rollingSummary: synthesized,
          healthScore: score,
          healthGaps: JSON.stringify(gaps),
          lastCompressedAt: new Date(),
          updatedAt: new Date(),
        },
      });
      updated.push(project.name);
    } else {
      // Persist health/lastCompressed even when summary is unchanged
      await db.project.update({
        where: { id: prow.id },
        data: {
          healthScore: score,
          healthGaps: JSON.stringify(gaps),
          lastCompressedAt: new Date(),
        },
      });
    }
  }

  void trigger;
  return { updated, gapReport };
}

// ------------------------------------------
// MAIN CYCLE (serialized & idempotent)
// ------------------------------------------

export async function runCompressionCycle(
  trigger: CompressionReport["trigger"] = "manual"
): Promise<CompressionReport> {
  if (inflight) return inflight; // never run two cycles concurrently
  inflight = (async () => {
    const startedAt = Date.now();
    const backfill = await ensureVectorIndex();
    const sessionDetails = await rollupSessions();
    const { updated, gapReport } = await updateProjectSummaries(trigger);
    const report: CompressionReport = {
      ranAt: new Date().toISOString(),
      durationMs: Date.now() - startedAt,
      trigger,
      sessionsCreated: sessionDetails.length,
      sessionDetails,
      summariesUpdated: updated,
      gapReport,
      vectorsBackfilled: backfill.backfilled,
    };
    lastRunAt = report.ranAt;
    lastReport = report;
    return report;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}
