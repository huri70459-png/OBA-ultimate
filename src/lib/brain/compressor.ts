// Project Brain OS — Engine 3: AI Memory Compression Daemon (v2)
// Port of the blueprint's memory_compressor.py + the Option-2 memory_compressor.py upgrade:
//   1. Session Rollup      -> groups captures from one coding block (gap <= 90 min)
//                             into a "session" item (Universal Timeline / Work Replay
//                             without 24/7 recording).
//   2. Project Summary Update -> re-synthesizes rolling memory (Tier 1) per project
//                             and persists the Knowledge Health Score + gap flags.
//   3. compressProjectMemory() -> per-project compression (v2): dense < 450-token
//                             summary, _project_summary.md + _work_replay.md written to
//                             the real vault on disk, optional live-LLM digest pass.
//   4. findCrossProjectSolutions() -> Cross-Project Learning: find the fix for a bug
//                             that was already solved in ANOTHER project (v2).
// Deterministic (no LLM required), idempotent (deterministic session keys), and
// safe to run repeatedly. Triggers: manual (UI/POST), auto-idle (>= 6h since last
// run, kicked off from /api/health), after every capture/decision (v2), and self-test.

import { db } from "@/lib/db";
import { topKeywords } from "./embeddings";
import { llmBridge } from "./llm-bridge";
import {
  computeHealthAndGaps,
  ensureVectorIndex,
  getProjectGraph,
  saveItem,
  searchVault,
  toDecision,
  toItem,
  writeVaultFile,
} from "./store";
import type {
  BrainDecision,
  BrainItem,
  BrainProject,
  CompressionReport,
  CrossProjectSolution,
  HealthGap,
  ProjectCompressionReport,
} from "./types";

const SESSION_GAP_MS = 90 * 60 * 1000; // a new session starts after a 90-minute lull
const MIN_SESSION_ITEMS = 2; // a block needs >= 2 captures to be worth rolling up
const AUTO_INTERVAL_MS = 6 * 60 * 60 * 1000; // auto/idle cadence: every 6 hours
const SUMMARY_WINDOW_DAYS = 14;
const MAX_SUMMARY_CHARS = 1300; // ~325 tokens — keeps Tier 1 well under the 450-token budget

export function healthStatus(score: number): string {
  return score >= 85 ? "EXCELLENT" : score >= 65 ? "HEALTHY" : "NEEDS ATTENTION";
}

/** Resolved fix commands + files actively mentioned in the Knowledge Graph. */
function extractFixesAndFiles(
  items: BrainItem[],
  edges: { sourceNode: string; relationType: string }[]
): { resolvedFixes: string[]; activeFiles: string[] } {
  const resolvedFixes: string[] = [];
  const activeFiles = new Set<string>();
  for (const it of items) {
    const fix = it.metadata?.fix;
    if (typeof fix === "string" && fix) resolvedFixes.push(`${it.title} -> \`${fix}\``);
  }
  for (const e of edges) {
    if (e.relationType === "MENTIONED_IN") activeFiles.add(e.sourceNode);
  }
  return { resolvedFixes, activeFiles: [...activeFiles] };
}

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
  lastSessionTitle: string | null,
  resolvedFixes: string[] = [],
  activeFiles: string[] = []
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
    `Compressed memory for **${project.name}** (${items.length} captures: ${typeStr || "none"}; auto-synthesized by the Memory Compression Daemon).`
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
  lines.push(`- ${items.length} captures on record.${sessionLine}`);
  lines.push(``);
  lines.push(`## Active Decisions (do not violate)`);
  if (decisions.length > 0) {
    for (const d of decisions.slice(0, 5)) {
      lines.push(`- **${d.title.slice(0, 60)}**: ${d.decision.slice(0, 80)} (Reason: ${d.reasoning.slice(0, 60)})`);
    }
  } else {
    lines.push(`- None logged yet — capture choices with 'Decision: ... Reason: ...'`);
  }
  lines.push(``);
  lines.push(`## Resolved Fixes`);
  if (resolvedFixes.length > 0) {
    for (const fx of resolvedFixes.slice(0, 4)) lines.push(`- ${fx.slice(0, 130)}`);
  } else {
    lines.push(`- No automated bug fixes logged yet.`);
  }
  if (activeFiles.length > 0) {
    lines.push(``);
    lines.push(`## Key Files on Record`);
    lines.push(`- ${activeFiles.slice(0, 10).join(", ")}`);
  }
  if (gaps.length > 0) {
    lines.push(``);
    lines.push(`## Knowledge Gaps`);
    for (const g of gaps) lines.push(`- [${g.severity.toUpperCase()}] ${g.gap} — ${g.detail}`);
  }
  return lines.join("\n").slice(0, MAX_SUMMARY_CHARS);
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

    // Proper parsing via toItem keeps metadata a real object (fixes detection)
    const items: BrainItem[] = itemRows.map((r) =>
      toItem({ ...r, metadata: r.metadata })
    );

    const decisions: BrainDecision[] = decisionRows.map(toDecision);

    const project: BrainProject = {
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

    const edges = await getProjectGraph(prow.id, 50);
    const { resolvedFixes, activeFiles } = extractFixesAndFiles(items, edges);
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
      lastSessionRow?.title ?? null,
      resolvedFixes,
      activeFiles
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

// ==========================================
// 3. PER-PROJECT COMPRESSION (v2, port of memory_compressor.compress_project_memory)
// Kills token exhaustion: compresses notes, screenshots, decisions and bug fixes into a
// dense summary (< 450 tokens), persists it as Tier-1 rolling memory, and writes
// _project_summary.md + _work_replay.md into the real vault on disk.
// ==========================================

async function writeWorkSessionReplay(
  projectSlug: string,
  projectName: string,
  items: BrainItem[]
): Promise<string> {
  const relPath = `ProjectBrainVault/Projects/${projectSlug}/_work_replay.md`;
  const grouped = new Map<string, BrainItem[]>();
  for (const it of items) {
    const day = (it.capturedAt || "").slice(0, 10) || "Unknown-Date";
    const arr = grouped.get(day) ?? [];
    arr.push(it);
    grouped.set(day, arr);
  }

  const lines: string[] = [`# ⏪ ${projectName} — Chronological Work Session Replay`, ""];
  const days = [...grouped.keys()].sort((a, b) => b.localeCompare(a));
  for (const day of days) {
    const dayItems = grouped.get(day)!;
    lines.push(`## 📅 ${day} (${dayItems.length} captures)`);
    for (const it of dayItems) {
      const timePart = (it.capturedAt || "").slice(11, 19);
      lines.push(
        `- **\`${timePart}\` [${it.itemType.toUpperCase()}] ${it.title}**` +
          ` *(${it.sourceApp || "App"})* — ${it.structuredSummary || ""}`
      );
    }
    lines.push("");
  }

  await writeVaultFile(relPath, lines.join("\n"));
  return relPath;
}

export async function compressProjectMemory(
  projectId: string,
  opts: { skipDiskWrites?: boolean } = {}
): Promise<ProjectCompressionReport | { error: string }> {
  const prow = await db.project.findUnique({ where: { id: projectId } });
  if (!prow) return { error: `Project '${projectId}' not found` };

  const [itemRows, decisionRows] = await Promise.all([
    db.item.findMany({
      where: { projectId },
      orderBy: { capturedAt: "desc" },
      take: 100,
    }),
    db.decision.findMany({
      where: { projectId },
      orderBy: { decidedAt: "desc" },
      take: 25,
    }),
  ]);
  const edges = await getProjectGraph(projectId, 100);

  const items: BrainItem[] = itemRows.map((r) => toItem(r));
  const decisions: BrainDecision[] = decisionRows.map(toDecision);
  const project: BrainProject = {
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

  const notesCount = items.filter((i) => i.itemType === "note").length;
  const shotsCount = items.filter((i) => i.itemType === "screenshot").length;
  const termsCount = items.filter((i) => i.itemType === "terminal").length;

  const { resolvedFixes, activeFiles } = extractFixesAndFiles(items, edges);
  const { score, gaps } = computeHealthAndGaps(project, items, decisions);

  const lastSessionRow = await db.item.findFirst({
    where: { projectId, itemType: "session" },
    orderBy: { capturedAt: "desc" },
    select: { title: true },
  });

  // Deterministic compressed digest (works offline, zero API keys)
  let finalSummary = synthesizeRollingSummary(
    project,
    items,
    decisions,
    gaps,
    lastSessionRow?.title ?? null,
    resolvedFixes,
    activeFiles
  );

  // Optional live-LLM compression pass (Ollama / OpenAI) — falls back seamlessly
  let llmDigestUsed = false;
  const llmDigest = await llmBridge.completeText(
    "Compress the following project state into a dense, factual paragraph (< 120 words) " +
      "for an AI coding assistant. Preserve exact filenames, decisions, and package fixes.",
    finalSummary,
    200
  );
  if (llmDigest) {
    finalSummary = llmDigest.slice(0, MAX_SUMMARY_CHARS);
    llmDigestUsed = true;
  }

  const now = new Date();
  await db.project.update({
    where: { id: projectId },
    data: {
      rollingSummary: finalSummary,
      healthScore: score,
      healthGaps: JSON.stringify(gaps),
      lastCompressedAt: now,
      updatedAt: now,
    },
  });

  // v2: write the enriched _project_summary.md + _work_replay.md to the real vault
  const summaryRelPath = `ProjectBrainVault/Projects/${project.slug}/_project_summary.md`;
  if (!opts.skipDiskWrites) {
    const decisionsMd =
      decisions
        .map((d) => `- **${d.title}**: ${d.decision} *(Reason: ${d.reasoning})*`)
        .join("\n") || "- None recorded yet.";
    const fixesMd = resolvedFixes.map((fx) => `- ${fx}`).join("\n") || "- None recorded yet.";
    const gapsMd = gaps.map((g) => `- ⚠️ ${g.gap} — ${g.detail}`).join("\n") || "- ✅ No knowledge gaps detected!";
    const keywords = topKeywords(items.map((i) => `${i.title} ${i.rawContent}`).join(" "), 8);

    await writeVaultFile(
      summaryRelPath,
      `# ${project.name} — Compressed Project Brain\n\n` +
        `- **Health Score:** ${score}/100 (${healthStatus(score)})\n` +
        `- **Total Captures Indexed:** ${items.length} (${notesCount} notes, ${shotsCount} screenshots, ${termsCount} terminal logs)\n` +
        `- **Decisions Logged:** ${decisions.length}\n` +
        `- **Last Compressed:** ${now.toISOString()}\n\n` +
        `## 1. Compressed Rolling Memory (Tier-1 Prompt Payload)\n${finalSummary}\n\n` +
        `## 2. Key Architectural Decisions\n${decisionsMd}\n\n` +
        `## 3. Known Bug Fixes & Actionable Remedies\n${fixesMd}\n\n` +
        `## 4. Knowledge Gaps & Recommendations\n${gapsMd}\n` +
        (activeFiles.length > 0 ? `\n## 5. Key Files\n- ${activeFiles.slice(0, 10).join(", ")}\n` : "") +
        (keywords.length > 0 ? `\n_Topics: ${keywords.join(", ")}_\n` : "")
    );
  }
  const replayRelPath = opts.skipDiskWrites
    ? `ProjectBrainVault/Projects/${project.slug}/_work_replay.md`
    : await writeWorkSessionReplay(project.slug, project.name, items);

  return {
    project_id: project.id,
    project_name: project.name,
    compressed_rolling_summary: finalSummary,
    estimated_summary_tokens: Math.max(1, Math.floor(finalSummary.length / 4)),
    health: {
      score,
      status: healthStatus(score),
      gaps: gaps.map((g) => g.gap),
    },
    summary_file: summaryRelPath,
    work_replay_file: replayRelPath,
    items_compressed: items.length,
    llm_digest_used: llmDigestUsed,
  };
}

// ==========================================
// 4. CROSS-PROJECT LEARNING & BUG REUSE DETECTOR (v2)
// Searches across ALL OTHER projects to check if a bug was already solved elsewhere.
// ==========================================

export async function findCrossProjectSolutions(
  errorQuery: string,
  excludeProjectId: string | null = null
): Promise<CrossProjectSolution[]> {
  const hits = await searchVault(errorQuery, null, 15);
  const reusable: CrossProjectSolution[] = [];

  for (const h of hits) {
    if (excludeProjectId && h.projectId === excludeProjectId) continue;
    let sourceProject = "Inbox";
    if (h.projectId) {
      const proj = await db.project.findUnique({ where: { id: h.projectId }, select: { name: true } });
      sourceProject = proj?.name ?? "Inbox";
    }
    reusable.push({
      item_id: h.id,
      source_project: sourceProject,
      title: h.title,
      summary: h.structuredSummary,
      suggested_fix: typeof h.metadata?.fix === "string" ? h.metadata.fix : "",
      captured_at: h.capturedAt,
    });
  }
  return reusable;
}
