// Project Brain OS — Store Layer (port of sqlite_store.py)
// SQLite via Prisma + BM25-like token search (SQLite LIKE fallback) + vault metadata

import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import type {
  BrainDecision,
  BrainItem,
  BrainProject,
  ContextPayload,
  GraphEdge,
  ProjectDetails,
  TimelineEntry,
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
// ZERO-SAVE ITEM CAPTURE (Vault metadata = virtual md file path)
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
    },
  });

  if (project) {
    await db.project.update({ where: { id: project.id }, data: { updatedAt: now } });
  }

  return toItem(created);
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
  const scored = rows.map((row) => {
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
// PROJECT DETAILS + KNOWLEDGE HEALTH SCORE
// ==========================================

export async function getProjectDetails(projectId: string): Promise<ProjectDetails | { error: string }> {
  const project = await getProjectById(projectId);
  if (!project) return { error: "Project not found" };

  const [itemRows, decisionRows, edges] = await Promise.all([
    db.item.findMany({ where: { projectId }, orderBy: { capturedAt: "desc" }, take: 50 }),
    db.decision.findMany({ where: { projectId }, orderBy: { decidedAt: "desc" }, take: 30 }),
    getProjectGraph(projectId),
  ]);

  const items = itemRows.map(toItem);
  const decisions = decisionRows.map(toDecision);

  // Live Knowledge Health Score: 40 base + 20 summary + 20 decisions + min(20, items*5)
  const score =
    40 +
    (project.rollingSummary ? 20 : 0) +
    (decisions.length > 0 ? 20 : 0) +
    Math.min(20, items.length * 5);

  return {
    project,
    healthScore: Math.min(100, score),
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
    db.decision.findMany({ where: { projectId }, orderBy: { decidedAt: "desc" }, take: 8 }),
    db.item.findMany({ where: { projectId }, orderBy: { capturedAt: "desc" }, take: 6 }),
    getProjectGraph(projectId, 15),
  ]);

  const tier2 = decisionRows.map(toDecision).map((d) => ({
    title: d.title,
    decision: d.decision,
    reasoning: d.reasoning,
    outcome: d.outcome,
    decidedAt: d.decidedAt,
  }));

  let tier3: ContextPayload["tier_3_recent_and_relevant_evidence"] = [];
  if (activeQuery) {
    const hits = await searchVault(activeQuery, projectId, 5);
    tier3 = hits.map((h) => ({
      title: h.title,
      type: h.itemType,
      summary: h.structuredSummary || h.rawContent.slice(0, 300),
      visual_context: h.visualDescription,
      captured_at: h.capturedAt,
    }));
  }

  if (tier3.length === 0) {
    tier3 = recentRows.map((r) => {
      const item = toItem(r);
      return {
        title: item.title,
        type: item.itemType,
        summary: item.structuredSummary,
        captured_at: item.capturedAt,
      };
    });
  }

  return {
    project_name: project.name,
    tier_1_rolling_memory: project.rollingSummary || "Active development project.",
    tier_2_decision_graph: tier2,
    tier_3_recent_and_relevant_evidence: tier3,
    knowledge_graph_edges: edges,
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
