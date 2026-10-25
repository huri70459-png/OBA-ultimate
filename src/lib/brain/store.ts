// Project Brain OS — Store Layer (port of sqlite_store.py)
// SQLite via Prisma + BM25-like token search + vector (semantic) hybrid search
// + REAL on-disk Obsidian-style vault (v2: two-way markdown disk sync)

import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import {
  cosineSimilarity,
  decodeVector,
  embedForStorage,
  embedText,
  newVectorId,
} from "./embeddings";
import type {
  BrainDecision,
  BrainItem,
  BrainProject,
  ContextPayload,
  DiskSyncStats,
  GraphEdge,
  ProjectDetails,
  TimelineEntry,
  TriageResult,
} from "./types";

type ProjectRow = {
  id: string;
  name: string;
  slug: string;
  rootPath: string;
  keywords: string;
  gitRemotes: string;
  rollingSummary: string;
  createdAt: Date;
  updatedAt: Date;
};

type ItemRow = Record<string, unknown> & {
  metadata?: string | null;
  capturedAt: Date;
};

type DecisionRow = {
  id: string;
  projectId: string;
  title: string;
  decision: string;
  alternatives: string;
  reasoning: string;
  outcome: string;
  sourceItemId: string | null;
  decidedAt: Date;
};

// ==========================================
// REAL DISK VAULT (v2 Two-Way Obsidian Sync)
// Files live at <cwd>/ProjectBrainVault — the same layout as sqlite_store.py.
// Every write is best-effort: a disk failure never breaks capture/search.
// ==========================================

export function vaultRoot(): string {
  return path.join(process.cwd(), "ProjectBrainVault");
}

/** Resolves a stored relative filePath ("ProjectBrainVault/...") to an absolute disk path. */
export function resolveVaultPath(filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
}

function frontmatterBlock(input: {
  id: string;
  type: string;
  projectName: string;
  sourceApp: string;
  sourceUrl: string;
  capturedAt: string;
}): string {
  return (
    `---\n` +
    `id: ${input.id}\n` +
    `type: ${input.type}\n` +
    `project: ${input.projectName}\n` +
    `source_app: ${input.sourceApp}\n` +
    `source_url: ${input.sourceUrl}\n` +
    `captured_at: ${input.capturedAt}\n` +
    `---\n\n`
  );
}

/** Builds the Obsidian-compatible .md body (YAML frontmatter + "## Content" marker). */
export function buildItemMarkdown(input: {
  id: string;
  itemType: string;
  projectName: string;
  sourceApp: string;
  sourceUrl: string;
  capturedAt: string;
  title: string;
  structuredSummary?: string;
  visualDescription?: string;
  suggestedFix?: string;
  rawContent: string;
}): string {
  let body = `# ${input.title}\n\n`;
  if (input.structuredSummary) body += `> **AI Summary:** ${input.structuredSummary}\n\n`;
  if (input.visualDescription) body += `> **Visual Context:** ${input.visualDescription}\n\n`;
  if (input.suggestedFix) body += `### Suggested Fix\n\`\`\`bash\n${input.suggestedFix}\n\`\`\`\n\n`;
  body += `## Content\n${input.rawContent}\n`;
  return frontmatterBlock({
    id: input.id,
    type: input.itemType,
    projectName: input.projectName,
    sourceApp: input.sourceApp,
    sourceUrl: input.sourceUrl,
    capturedAt: input.capturedAt,
  }) + body;
}

/** Writes a file inside the vault (creates parent dirs); returns the relative path on success. */
export async function writeVaultFile(relativePath: string, content: string): Promise<string | null> {
  try {
    const abs = resolveVaultPath(relativePath);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, content, "utf-8");
    return relativePath;
  } catch {
    return null; // never let disk failures break the engine
  }
}

export function slugify(text: string): string {
  const slug = text
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "-");
  return slug || "untitled";
}

export function toProject(row: ProjectRow): BrainProject {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    rootPath: row.rootPath ?? "",
    keywords: safeParseArray(row.keywords),
    gitRemotes: safeParseArray(row.gitRemotes),
    rollingSummary: row.rollingSummary ?? "",
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toItem(row: ItemRow): BrainItem {
  return {
    id: row.id as string,
    projectId: (row.projectId as string | null) ?? null,
    itemType: row.itemType as string,
    title: row.title as string,
    rawContent: row.rawContent as string,
    structuredSummary: (row.structuredSummary as string) ?? "",
    visualDescription: (row.visualDescription as string) ?? "",
    filePath: (row.filePath as string) ?? "",
    assetPath: (row.assetPath as string) ?? "",
    sourceApp: (row.sourceApp as string) ?? "",
    sourceUrl: (row.sourceUrl as string) ?? "",
    metadata: safeParseObject((row.metadata as string) || "{}"),
    capturedAt: new Date(row.capturedAt).toISOString(),
  };
}

export function toDecision(row: DecisionRow): BrainDecision {
  return {
    id: row.id,
    projectId: row.projectId,
    title: row.title,
    decision: row.decision,
    alternatives: safeParseArray(row.alternatives),
    reasoning: row.reasoning,
    outcome: row.outcome,
    sourceItemId: row.sourceItemId,
    decidedAt: row.decidedAt.toISOString(),
  };
}

function safeParseArray(json: string | null | undefined): string[] {
  try {
    const parsed = JSON.parse(json || "[]");
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function safeParseObject(json: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

// ==========================================
// PROJECT MANAGEMENT
// ==========================================

export async function upsertProject(input: {
  name: string;
  rootPath?: string;
  keywords?: string[];
  gitRemotes?: string[];
  rollingSummary?: string;
}): Promise<BrainProject> {
  const slug = slugify(input.name);
  const keywords = input.keywords ?? [];
  const gitRemotes = input.gitRemotes ?? [];

  const existing = await db.project.findUnique({ where: { slug } });
  let project: BrainProject;

  if (existing) {
    const updated = await db.project.update({
      where: { id: existing.id },
      data: {
        name: input.name,
        rootPath: input.rootPath ?? existing.rootPath,
        keywords: JSON.stringify(keywords),
        gitRemotes: JSON.stringify(gitRemotes),
        rollingSummary: input.rollingSummary || existing.rollingSummary,
        updatedAt: new Date(),
      },
    });
    project = toProject(updated);
  } else {
    const created = await db.project.create({
      data: {
        id: `proj_${randomUUID().replace(/-/g, "").slice(0, 10)}`,
        name: input.name,
        slug,
        rootPath: input.rootPath ?? "",
        keywords: JSON.stringify(keywords),
        gitRemotes: JSON.stringify(gitRemotes),
        rollingSummary: input.rollingSummary ?? "",
      },
    });
    project = toProject(created);
  }

  // v2: maintain the human-readable _project_summary.md on disk (sqlite_store.py parity:
  // writes when a summary exists or the file is missing)
  const effectiveSummary = project.rollingSummary;
  const summaryRelPath = `ProjectBrainVault/Projects/${project.slug}/_project_summary.md`;
  const summaryAbs = resolveVaultPath(summaryRelPath);
  let summaryExists = true;
  try {
    await readFile(summaryAbs, "utf-8");
  } catch {
    summaryExists = false;
  }
  if (effectiveSummary || !summaryExists) {
    const now = new Date().toISOString();
    await writeVaultFile(
      summaryRelPath,
      `# ${project.name} — Project Brain Summary\n\n` +
        `**Root Path:** \`${project.rootPath}\`\n` +
        `**Keywords:** ${project.keywords.join(", ")}\n` +
        `**Last Updated:** ${now}\n\n` +
        `## Rolling Memory\n${effectiveSummary || "No summary compressed yet."}\n`
    );
  }

  return project;
}

export async function getProjectById(id: string): Promise<BrainProject | null> {
  const row = await db.project.findUnique({ where: { id } });
  return row ? toProject(row) : null;
}

export async function getAllProjects(): Promise<BrainProject[]> {
  const rows = await db.project.findMany({ orderBy: { updatedAt: "desc" } });
  return rows.map(toProject);
}

/** Resolves proj_xxx id, slug, or display name -> project id (port of mcp resolve_project_id). */
export async function resolveProjectId(identifier: string): Promise<string | null> {
  if (!identifier) return null;
  const projects = await getAllProjects();
  for (const p of projects) {
    if (p.id === identifier || p.slug === identifier || p.name === identifier) return p.id;
  }
  const lower = identifier.toLowerCase();
  for (const p of projects) {
    if (p.name.toLowerCase() === lower || p.slug === lower) return p.id;
  }
  return null;
}

// ==========================================
// ZERO-SAVE ITEM CAPTURE (real Vault .md file on disk, Obsidian-compatible)
// ==========================================

function vaultFilePath(project: BrainProject | null, itemType: string, title: string, now: Date): string {
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
    now.getUTCDate()
  ).padStart(2, "0")}_${String(now.getUTCHours()).padStart(2, "0")}${String(now.getUTCMinutes()).padStart(
    2,
    "0"
  )}${String(now.getUTCSeconds()).padStart(2, "0")}`;
  const fileSlug = slugify(title).slice(0, 50);
  const filename = `${stamp}_${fileSlug}.md`;
  if (project) {
    const subfolder = ["screenshot", "clip", "terminal"].includes(itemType) ? "captures" : "notes";
    return `ProjectBrainVault/Projects/${project.slug}/${subfolder}/${filename}`;
  }
  return `ProjectBrainVault/Inbox/${filename}`;
}

export async function saveItem(input: {
  title: string;
  rawContent: string;
  itemType?: string;
  projectId?: string | null;
  structuredSummary?: string;
  visualDescription?: string;
  assetPath?: string;
  sourceApp?: string;
  sourceUrl?: string;
  metadata?: Record<string, unknown>;
}): Promise<BrainItem> {
  const itemId = `item_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
  const now = new Date();
  const itemType = input.itemType || "note";
  const metadata = input.metadata ?? {};
  const project = input.projectId ? await getProjectById(input.projectId) : null;

  const created = await db.item.create({
    data: {
      id: itemId,
      projectId: project?.id ?? null,
      itemType,
      title: input.title,
      rawContent: input.rawContent,
      structuredSummary: input.structuredSummary ?? "",
      visualDescription: input.visualDescription ?? "",
      filePath: vaultFilePath(project, itemType, input.title, now),
      assetPath: input.assetPath ?? "",
      sourceApp: input.sourceApp ?? "",
      sourceUrl: input.sourceUrl ?? "",
      metadata: JSON.stringify(metadata),
      capturedAt: now,
      // Vector sidecar write (sqlite-vec pattern) — every item is semantically indexed
      vector: {
        create: {
          id: newVectorId(),
          projectId: project?.id ?? null,
          ...embedForStorage(
            `${input.title}\n${input.rawContent}\n${input.structuredSummary ?? ""}\n${input.visualDescription ?? ""}`
          ),
        },
      },
    },
    include: { vector: true },
  });

  if (project) {
    await db.project.update({ where: { id: project.id }, data: { updatedAt: now } });
  }

  // v2: write the real Obsidian-compatible .md file to disk (best-effort, sqlite_store parity)
  await writeVaultFile(
    created.filePath,
    buildItemMarkdown({
      id: created.id,
      itemType: created.itemType,
      projectName: project?.name ?? "Inbox",
      sourceApp: created.sourceApp,
      sourceUrl: created.sourceUrl,
      capturedAt: created.capturedAt.toISOString(),
      title: created.title,
      structuredSummary: created.structuredSummary,
      visualDescription: created.visualDescription,
      suggestedFix: typeof metadata.fix === "string" ? metadata.fix : undefined,
      rawContent: created.rawContent,
    })
  );

  return toItem(created);
}

// ==========================================
// v2.1 INBOX TRIAGE & RESOLUTION (port of brain_api.list_inbox / triage_item / resolve_item)
// Triage physically MOVES the vault .md file from ProjectBrainVault/Inbox/ into the
// target project's notes/ or captures/ folder, re-points SQLite + the vector sidecar,
// and stamps triage state into the item metadata. Resolution records an optional note.
// ==========================================

export async function listInbox(limit = 80): Promise<BrainItem[]> {
  const rows = await db.item.findMany({
    where: { projectId: null },
    orderBy: { capturedAt: "desc" },
    take: Math.max(1, Math.min(Math.floor(limit) || 80, 200)),
  });
  return rows.map((r) => toItem({ ...r, metadata: r.metadata }));
}

export async function triageItem(itemId: string, projectId: string): Promise<TriageResult> {
  const row = await db.item.findUnique({ where: { id: itemId } });
  if (!row) return { ok: false, item_id: itemId, project_id: projectId, project_name: "", file_moved: false, file_path: "", error: "Item not found" };
  const prow = await db.project.findUnique({ where: { id: projectId } });
  if (!prow) return { ok: false, item_id: itemId, project_id: projectId, project_name: "", file_moved: false, file_path: "", error: "Project not found" };
  if (row.projectId === projectId) {
    return { ok: false, item_id: itemId, project_id: projectId, project_name: prow.name, file_moved: false, file_path: row.filePath, error: "Item already belongs to this project" };
  }

  const item = toItem({ ...row, metadata: row.metadata });
  const subfolder = ["screenshot", "clip", "terminal"].includes(item.itemType) ? "captures" : "notes";
  const destDir = path.join(vaultRoot(), "Projects", prow.slug, subfolder);
  let newPath = item.filePath; // fallback when there is no disk file to move
  let fileMoved = false;

  try {
    await mkdir(destDir, { recursive: true });
    const oldAbs = resolveVaultPath(item.filePath);
    let candidate = path.join(destDir, path.basename(item.filePath || `${item.id}.md`));
    // Avoid clobbering an existing file with the same name (36h dedup makes this rare)
    try {
      await readFile(candidate, "utf-8");
      candidate = path.join(destDir, `${item.id}_${path.basename(item.filePath || "capture.md")}`);
    } catch {
      /* name is free */
    }
    try {
      await rename(oldAbs, candidate);
      fileMoved = true;
      newPath = path.relative(process.cwd(), candidate).split(path.sep).join("/");
    } catch {
      fileMoved = false; // source file missing — keep path as-is
    }
  } catch {
    fileMoved = false; // disk failure never breaks triage
  }

  const metadata = { ...item.metadata };
  metadata.triage_status = "triaged";
  metadata.triaged_at = new Date().toISOString();
  metadata.triaged_to = prow.name;

  const now = new Date();
  await db.item.update({
    where: { id: itemId },
    data: {
      projectId: prow.id,
      filePath: newPath,
      metadata: JSON.stringify(metadata),
    },
  });
  await db.project.update({ where: { id: prow.id }, data: { updatedAt: now } });

  // The vector sidecar carries projectId for scoped semantic search — re-point it
  await db.itemVector.updateMany({ where: { itemId }, data: { projectId: prow.id } });

  return {
    ok: true,
    item_id: itemId,
    project_id: prow.id,
    project_name: prow.name,
    file_moved: fileMoved,
    file_path: newPath,
  };
}

export async function resolveItem(
  itemId: string,
  resolution: string
): Promise<{ ok: boolean; item_id: string; triage_status: string; error?: string }> {
  const row = await db.item.findUnique({ where: { id: itemId } });
  if (!row) return { ok: false, item_id: itemId, triage_status: "", error: "Item not found" };

  const metadata = toItem({ ...row, metadata: row.metadata }).metadata;
  metadata.triage_status = "resolved";
  metadata.resolution = resolution.trim();
  metadata.resolved_at = new Date().toISOString();

  await db.item.update({ where: { id: itemId }, data: { metadata: JSON.stringify(metadata) } });
  return { ok: true, item_id: itemId, triage_status: "resolved" };
}

// ==========================================
// TWO-WAY OBSIDIAN DISK SYNC (v2, port of memory_compressor.sync_markdown_edits_from_disk)
// If the user edited a tracked .md file directly on disk (Obsidian / VS Code),
// sync the new content back into SQLite and re-embed the semantic vector.
// ==========================================

export async function syncMarkdownEditsFromDisk(): Promise<DiskSyncStats> {
  const stats: DiskSyncStats = { files_checked: 0, sqlite_records_updated: 0, vectors_resynced: 0 };

  const rows = await db.item.findMany({
    where: { filePath: { not: "" } },
    select: {
      id: true,
      title: true,
      rawContent: true,
      filePath: true,
      structuredSummary: true,
      visualDescription: true,
      projectId: true,
    },
    take: 2000,
    orderBy: { capturedAt: "desc" },
  });

  for (const r of rows) {
    stats.files_checked += 1;
    let diskText: string;
    try {
      diskText = await readFile(resolveVaultPath(r.filePath), "utf-8");
    } catch {
      continue; // file missing/unreadable — skip silently
    }

    // The editable payload lives after the "## Content\n" marker
    const marker = "## Content\n";
    let newRaw: string;
    if (diskText.includes(marker)) {
      newRaw = diskText.split(marker, 2)[1].trim();
    } else {
      newRaw = diskText.trim();
    }

    if (newRaw && newRaw !== r.rawContent.trim()) {
      await db.item.update({ where: { id: r.id }, data: { rawContent: newRaw } });
      stats.sqlite_records_updated += 1;

      // Re-embed so FTS-equivalent fields AND semantic search stay in sync
      await db.itemVector.upsert({
        where: { itemId: r.id },
        update: { ...embedForStorage(`${r.title}\n${newRaw}\n${r.structuredSummary}\n${r.visualDescription}`), indexedAt: new Date() },
        create: {
          id: newVectorId(),
          itemId: r.id,
          projectId: r.projectId,
          ...embedForStorage(`${r.title}\n${newRaw}\n${r.structuredSummary}\n${r.visualDescription}`),
        },
      });
      stats.vectors_resynced += 1;
    }
  }

  return stats;
}

// ==========================================
// DECISION LOG + KNOWLEDGE GRAPH
// ==========================================

export async function logDecision(input: {
  projectId: string;
  title: string;
  decision: string;
  reasoning: string;
  alternatives?: string[];
  outcome?: string;
  sourceItemId?: string | null;
}): Promise<BrainDecision> {
  const decId = `dec_${randomUUID().replace(/-/g, "").slice(0, 10)}`;
  const created = await db.decision.create({
    data: {
      id: decId,
      projectId: input.projectId,
      title: input.title,
      decision: input.decision,
      alternatives: JSON.stringify(input.alternatives ?? []),
      reasoning: input.reasoning,
      outcome: input.outcome ?? "Active",
      sourceItemId: input.sourceItemId ?? null,
    },
  });

  // Link decision in the Knowledge Graph (DECIDED_ON edge), as sqlite_store.log_decision does
  await addGraphEdge(input.projectId, input.title, input.decision, "DECIDED_ON");
  return toDecision(created);
}

export async function addGraphEdge(
  projectId: string | null,
  sourceNode: string,
  targetNode: string,
  relationType = "RELATED_TO",
  weight = 1.0
): Promise<GraphEdge> {
  const edge = await db.graphEdge.create({
    data: {
      id: `edge_${randomUUID().replace(/-/g, "").slice(0, 12)}`,
      projectId,
      sourceNode: sourceNode.trim(),
      targetNode: targetNode.trim(),
      relationType: relationType.toUpperCase(),
      weight,
    },
  });
  return {
    id: edge.id,
    projectId: edge.projectId,
    sourceNode: edge.sourceNode,
    targetNode: edge.targetNode,
    relationType: edge.relationType,
    weight: edge.weight,
    createdAt: edge.createdAt.toISOString(),
  };
}

export async function getProjectGraph(projectId: string, limit = 100): Promise<GraphEdge[]> {
  const rows = await db.graphEdge.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map((e) => ({
    id: e.id,
    projectId: e.projectId,
    sourceNode: e.sourceNode,
    targetNode: e.targetNode,
    relationType: e.relationType,
    weight: e.weight,
    createdAt: e.createdAt.toISOString(),
  }));
}

// ==========================================
// VECTOR INDEX MAINTENANCE (backfill + invariant)
// ==========================================

let vectorIndexReady = false;

/**
 * Backfills embeddings for any item missing its vector sidecar row.
 * Called lazily before semantic search / daemon cycles; memoized after first success
 * (saveItem guarantees the invariant for new items).
 */
export async function ensureVectorIndex(): Promise<{ backfilled: number }> {
  if (vectorIndexReady) return { backfilled: 0 };
  const missing = await db.item.findMany({
    where: { vector: { is: null } },
    take: 5000,
    orderBy: { capturedAt: "asc" },
  });
  for (const row of missing) {
    const item = toItem(row);
    await db.itemVector.create({
      data: {
        id: newVectorId(),
        itemId: item.id,
        projectId: item.projectId,
        ...embedForStorage(
          `${item.title}\n${item.rawContent}\n${item.structuredSummary}\n${item.visualDescription}`
        ),
      },
    });
  }
  vectorIndexReady = true;
  return { backfilled: missing.length };
}

export function isVectorIndexReady(): boolean {
  return vectorIndexReady;
}

// ==========================================
// SEARCH (FTS5 BM25 -> token OR match across indexed fields)
// ==========================================

export async function searchVault(
  query: string,
  projectId: string | null = null,
  limit = 20
): Promise<(BrainItem & { rank: number })[]> {
  const cleanTokens = query
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
    .filter((t) => t.length > 1);
  if (cleanTokens.length === 0) return [];

  // SQLite: case-insensitive contains across the FTS-indexed fields, OR-combined per token
  const tokenFilter = cleanTokens.map((t) => ({
    OR: [
      { title: { contains: t } },
      { rawContent: { contains: t } },
      { structuredSummary: { contains: t } },
      { visualDescription: { contains: t } },
    ],
  }));

  const rows = await db.item.findMany({
    where: { AND: [{ OR: tokenFilter }, ...(projectId ? [{ projectId }] : [])] },
    orderBy: { capturedAt: "desc" },
    take: limit * 3,
  });

  // BM25-ish ranking: more token hits across fields = better rank, tiebreak by recency
  const scored = rows.map((row: ItemRow) => {
    const item = toItem(row);
    const haystack = `${item.title}\n${item.rawContent}\n${item.structuredSummary}\n${item.visualDescription}`.toLowerCase();
    let hits = 0;
    for (const t of cleanTokens) {
      if (haystack.includes(t.toLowerCase())) hits += 1;
    }
    const ageHours = (Date.now() - new Date(item.capturedAt).getTime()) / 36e5;
    const rank = hits * 10 + Math.max(0, 5 - ageHours / 24);
    return { ...item, rank };
  });

  scored.sort((a, b) => b.rank - a.rank);
  return scored.slice(0, limit);
}

export type SearchMode = "hybrid" | "semantic" | "fts";

export interface SemanticSearchHit extends BrainItem {
  rank: number;
  /** Cosine similarity vs the query embedding (0..1). Present on vector-matched hits. */
  similarity?: number;
  /** Which ranking channels contributed: "vector" and/or "fts". */
  modes: string[];
}

/**
 * Hybrid semantic search (Sprint 3 upgrade):
 *  - "semantic": pure cosine similarity over brain-hash-v1 embeddings
 *  - "fts":      legacy BM25-like token ranking (searchVault)
 *  - "hybrid":   0.6*vector + 0.25*token-overlap + 0.15*recency (default)
 */
export async function searchVaultHybrid(
  query: string,
  opts: {
    projectId?: string | null;
    limit?: number;
    mode?: SearchMode;
  } = {}
): Promise<SemanticSearchHit[]> {
  const { projectId = null, limit = 20, mode = "hybrid" } = opts;
  if (!query.trim()) return [];

  if (mode === "fts") {
    const fts = await searchVault(query, projectId, limit);
    return fts.map((r) => ({ ...r, modes: ["fts"] }));
  }

  await ensureVectorIndex();
  const cleanTokens = query
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
    .filter((t) => t.length > 1);
  const queryVec = embedText(query);

  const [vectorRows, tokenHits] = await Promise.all([
    db.itemVector.findMany({
      where: projectId ? { projectId } : {},
      include: { item: true },
      take: 3000,
      orderBy: { indexedAt: "desc" },
    }),
    cleanTokens.length > 0
      ? searchVault(query, projectId, limit * 3)
      : Promise.resolve([]),
  ]);

  const tokenScore = new Map<string, number>();
  if (cleanTokens.length > 0) {
    for (const hit of tokenHits) {
      const haystack =
        `${hit.title}\n${hit.rawContent}\n${hit.structuredSummary}\n${hit.visualDescription}`.toLowerCase();
      let hits = 0;
      for (const t of cleanTokens) {
        if (haystack.includes(t.toLowerCase())) hits += 1;
      }
      tokenScore.set(hit.id, hits / cleanTokens.length); // 0..1 coverage
    }
  }

  const maxAgeHours = 24 * 14;
  const scored: SemanticSearchHit[] = vectorRows.map((row) => {
    const item = toItem(row.item);
    const sim = Math.max(0, cosineSimilarity(queryVec, decodeVector(row.vector)));
    const tScore = tokenScore.get(item.id) ?? 0;
    const ageHours = (Date.now() - new Date(item.capturedAt).getTime()) / 36e5;
    const recency = Math.max(0, 1 - ageHours / maxAgeHours);
    const rank =
      mode === "semantic"
        ? sim
        : 0.6 * sim + 0.25 * tScore + 0.15 * recency;
    const modes: string[] = [];
    if (sim > 0.01) modes.push("vector");
    if (tScore > 0) modes.push("fts");
    return { ...item, rank, similarity: sim, modes };
  });

  scored.sort((a, b) => b.rank - a.rank);
  return scored.slice(0, limit);
}

// ==========================================
// TIMELINE
// ==========================================

export async function getUniversalTimeline(datePrefix?: string | null, limit = 50): Promise<TimelineEntry[]> {
  const rows = await db.item.findMany({
    where: datePrefix
      ? {
          capturedAt: {
            gte: new Date(`${datePrefix}T00:00:00.000Z`),
            lt: new Date(`${datePrefix}T23:59:59.999Z`),
          },
        }
      : undefined,
    orderBy: { capturedAt: "desc" },
    take: limit,
    include: { project: { select: { name: true } } },
  });

  return rows.map((r) => ({
    id: r.id,
    itemType: r.itemType,
    title: r.title,
    structuredSummary: r.structuredSummary,
    sourceApp: r.sourceApp,
    capturedAt: r.capturedAt.toISOString(),
    projectName: r.project?.name ?? null,
  }));
}

// ==========================================
// KNOWLEDGE HEALTH SCORE + GAP DETECTION (shared by details API & compressor)
// ==========================================

export interface ComputedHealth {
  score: number;
  gaps: { gap: string; detail: string; severity: "high" | "medium" | "low" }[];
}

/**
 * Deterministic Knowledge Health scoring + gap detection (v2.1-aligned).
 * Base: 40 + 20 summary + 20 decisions + min(20, items*5); gaps subtract up to 20.
 * v2.1 adds the "fixes without a root-cause decision" rule from
 * memory_compressor._compute_health_and_gaps. Blueprint example: "40 screenshots of
 * database errors but no Database Architecture doc" -> flagged.
 */
export function computeHealthAndGaps(
  project: BrainProject,
  items: BrainItem[],
  decisions: BrainDecision[],
  resolvedFixes: string[] = []
): ComputedHealth {
  const gaps: ComputedHealth["gaps"] = [];
  let score =
    40 +
    (project.rollingSummary ? 20 : 0) +
    (decisions.length > 0 ? 20 : 0) +
    Math.min(20, items.length * 5);

  // Gap 1 — unresolved error captures (blueprint: error surge without documented fix)
  const unresolved = items.filter((it) => {
    const isError = /error|exception|traceback|failed|cannot find|module not found/i.test(
      `${it.title} ${it.rawContent}`
    );
    if (!isError) return false;
    // metadata is already parsed into an object by toItem
    return !it.metadata || !it.metadata.fix;
  });
  if (unresolved.length >= 3) {
    gaps.push({
      gap: "Unresolved error captures piling up",
      detail: `${unresolved.length} error captures have no logged fix — log the fix or decision that resolved them`,
      severity: "high",
    });
  }

  // Gap 2 — visual-heavy, text-light memory
  const shots = items.filter((i) => i.itemType === "screenshot").length;
  const notes = items.filter((i) => i.itemType === "note").length;
  if (shots >= 5 && notes === 0) {
    gaps.push({
      gap: "Visual-heavy memory without notes",
      detail: `${shots} screenshots but zero written notes — screenshots are hard to recall without a summary note`,
      severity: "medium",
    });
  }

  // Gap 3 — captures without decisions
  if (items.length >= 8 && decisions.length === 0) {
    gaps.push({
      gap: "Captures without logged decisions",
      detail: `${items.length} captures yet no architectural decisions — capture choices with 'Decision: ... Reason: ...'`,
      severity: "medium",
    });
  }

  // Gap 4 — stale project memory
  if (items.length > 0) {
    const newest = Math.max(...items.map((i) => new Date(i.capturedAt).getTime()));
    const staleDays = Math.floor((Date.now() - newest) / 864e5);
    if (staleDays > 14) {
      gaps.push({
        gap: "Stale project memory",
        detail: `No new captures in ${staleDays} days — project knowledge is going stale`,
        severity: "low",
      });
    }
  }

  // Gap 5 — no compressed memory
  if (!project.rollingSummary) {
    gaps.push({
      gap: "No compressed memory",
      detail: "Run the Memory Compressor to synthesize Tier-1 rolling memory",
      severity: "medium",
    });
  }

  // Gap 6 (v2.1) — fixes exist without a corresponding root-cause decision
  if (resolvedFixes.length > 0 && decisions.length === 0) {
    gaps.push({
      gap: "Fixes without a root-cause decision",
      detail: `${resolvedFixes.length} fix(es) logged but no architectural decision explains the root cause — capture the 'why' with 'Decision: ... Reason: ...'`,
      severity: "medium",
    });
  }

  const penalty = gaps.reduce(
    (acc, g) => acc + (g.severity === "high" ? 8 : g.severity === "medium" ? 4 : 2),
    0
  );
  score = Math.max(0, Math.min(100, score - Math.min(20, penalty)));
  return { score, gaps };
}

// ==========================================
// PROJECT DETAILS + KNOWLEDGE HEALTH SCORE
// ==========================================

export async function getProjectDetails(projectId: string): Promise<ProjectDetails | { error: string }> {
  const raw = await db.project.findUnique({ where: { id: projectId } });
  if (!raw) return { error: "Project not found" };
  const project = toProject(raw);

  const [itemRows, decisionRows, edges] = await Promise.all([
    db.item.findMany({ where: { projectId }, orderBy: { capturedAt: "desc" }, take: 50 }),
    db.decision.findMany({ where: { projectId }, orderBy: { decidedAt: "desc" }, take: 30 }),
    getProjectGraph(projectId),
  ]);

  const items = itemRows.map(toItem);
  const decisions = decisionRows.map(toDecision);
  // v2.1: resolved fixes feed the "fixes without a root-cause decision" health gap
  const resolvedFixes = items
    .map((it) => (typeof it.metadata?.fix === "string" ? it.metadata.fix : ""))
    .filter(Boolean);
  const { score, gaps } = computeHealthAndGaps(project, items, decisions, resolvedFixes);

  return {
    project,
    healthScore: score,
    healthGaps: gaps,
    lastCompressedAt: raw.lastCompressedAt ? raw.lastCompressedAt.toISOString() : null,
    items,
    decisions,
    graphEdges: edges,
  };
}

// ==========================================
// 3-TIER CONTEXT INJECTION PAYLOAD
// ==========================================

export async function buildContextInjectionPayload(
  projectId: string,
  activeQuery = ""
): Promise<ContextPayload | { error: string }> {
  const project = await getProjectById(projectId);
  if (!project) return { error: `Project ${projectId} not found` };

  const [decisionRows, recentRows, edges] = await Promise.all([
    db.decision.findMany({ where: { projectId }, orderBy: { decidedAt: "desc" }, take: 6 }),
    db.item.findMany({ where: { projectId }, orderBy: { capturedAt: "desc" }, take: 6 }),
    getProjectGraph(projectId, 5),
  ]);

  const tier2 = decisionRows.map(toDecision).map((d) => ({
    title: d.title,
    decision: d.decision.length > 80 ? `${d.decision.slice(0, 80)}…` : d.decision,
    reasoning: d.reasoning.length > 60 ? `${d.reasoning.slice(0, 60)}…` : d.reasoning,
    outcome: d.outcome,
    decidedAt: d.decidedAt,
  }));

  let tier3: ContextPayload["tier_3_recent_and_relevant_evidence"] = [];
  if (activeQuery) {
    const hits = await searchVault(activeQuery, projectId, 5);
    tier3 = hits.map((h) => ({
      title: h.title.slice(0, 70),
      type: h.itemType,
      summary: (h.structuredSummary || h.rawContent).slice(0, 140),
      visual_context: h.visualDescription ? h.visualDescription.slice(0, 100) : undefined,
      captured_at: h.capturedAt,
    }));
  }

  if (tier3.length === 0) {
    tier3 = recentRows.map((r) => {
      const item = toItem(r);
      return {
        title: item.title,
        type: item.itemType,
        summary: item.structuredSummary.slice(0, 180),
        captured_at: item.capturedAt,
      };
    });
  }

  return {
    project_name: project.name,
    tier_1_rolling_memory: project.rollingSummary || "Active development project.",
    tier_2_decision_graph: tier2,
    tier_3_recent_and_relevant_evidence: tier3,
    // Slim edge projection keeps the JSON transport payload compact — the graph
    // itself (full edges) is served by /api/projects/[id] for the Graph view.
    knowledge_graph_edges: edges.map((e) => ({
      source_node: e.sourceNode,
      target_node: e.targetNode,
      relation_type: e.relationType,
    })),
  };
}

/** Builds the anti-drift structured prompt wrapper (port of brain_api.py /context prompt rewriter). */
export function buildStructuredPrompt(
  payload: ContextPayload,
  rawGoal = ""
): string {
  let prompt =
    `# ROLE & GROUNDING CONSTRAINTS\n` +
    `You are working on project **${payload.project_name}**.\n` +
    `Follow the architectural decisions and evidence below strictly. Do NOT hallucinate unapproved libraries or revert past decisions.\n\n` +
    `## TIER 1: COMPRESSED PROJECT MEMORY\n${payload.tier_1_rolling_memory}\n\n` +
    `## TIER 2: ACTIVE ARCHITECTURAL DECISIONS (DO NOT VIOLATE)\n`;

  for (const d of payload.tier_2_decision_graph) {
    prompt += `- **${d.title}**: ${d.decision} (Reason: ${d.reasoning})\n`;
  }

  prompt += `\n## TIER 3: RELEVANT VAULT EVIDENCE & PAST FIXES\n`;
  for (const ev of payload.tier_3_recent_and_relevant_evidence) {
    prompt += `- [${ev.type.toUpperCase()}] **${ev.title}**: ${ev.summary}\n`;
  }

  if (rawGoal) {
    prompt +=
      `\n## CURRENT TASK / REWRITTEN EXECUTION SPEC\n` +
      `**Objective:** ${rawGoal}\n` +
      `**Required Output:** Provide modular, runnable code that respects Tier 1 & Tier 2 constraints and includes a quick verification step.\n`;
  }

  return prompt;
}
