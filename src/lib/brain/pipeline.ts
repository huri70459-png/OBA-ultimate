// Project Brain OS — Zero-Save Universal Capture Pipeline
// Port of capture_pipeline.py::ZeroSaveCapturePipeline
// v2.1: exact duplicate folding (memory_compressor.find_recent_duplicate) runs after
// project detection — a repeat capture within the dedup window in the SAME project/
// inbox folds into the existing item (occurrence_count + 1) instead of creating a row.
// v2.2: the window is runtime-tunable (DEDUP_WINDOW_HOURS env -> setting -> 36h default).

import { randomUUID } from "crypto";
import { detectProject, routeAiModel } from "./router";
import { analyzeCapture, formatHudToast } from "./analyzer";
import { findRecentDuplicate, recordDuplicateOccurrence } from "./dedup";
import { addGraphEdge, getProjectById, logDecision, resolveProjectId, saveItem } from "./store";
import type { BrainDecision, CaptureResult, ProjectMatch } from "./types";

export async function capture(input: {
  rawContent: string;
  itemType?: string;
  windowTitle?: string;
  activeFilePath?: string;
  sourceApp?: string;
  sourceUrl?: string;
  assetPath?: string;
  visualHint?: string;
  /** v2.5: explicit project override (MCP zero_save_capture / desktop agent) —
   *  accepts proj_xxx id, slug, or display name; confidence becomes 1.0. */
  forcedProjectId?: string;
  /** v2.5: extra metadata stamped by the ingest layer (content_hash,
   *  privacy_redactions, ocr_provider) — merged over the pipeline defaults. */
  extraMetadata?: Record<string, unknown>;
}): Promise<CaptureResult> {
  const {
    rawContent = "",
    itemType = "note",
    windowTitle = "",
    activeFilePath = "",
    sourceApp = "Workspace UI",
    sourceUrl = "",
    assetPath = "",
    visualHint = "",
    forcedProjectId = "",
    extraMetadata = {},
  } = input;

  // 1. Auto-Detect Project
  let projMatch: ProjectMatch = await detectProject({ rawContent, windowTitle, activeFilePath, sourceUrl });
  // v2.5: forced_project_id (MCP / desktop agent) overrides detection entirely.
  if (forcedProjectId) {
    const forcedId = await resolveProjectId(forcedProjectId);
    const forcedProject = forcedId ? await getProjectById(forcedId) : null;
    if (forcedProject) {
      projMatch = {
        projectId: forcedProject.id,
        projectName: forcedProject.name,
        projectSlug: forcedProject.slug,
        confidence: 1,
        reasons: ["forced_project_id override"],
      };
    }
  }
  const projectId = projMatch.projectId;

  // 1.5 v2.1 Exact Duplicate Folding — same project/inbox + same type + same canonical
  // content within the 36-hour window merges into the existing capture. The toast tells
  // the user the repeat was folded with its new occurrence count (brain_api.py parity).
  const duplicate = await findRecentDuplicate({ rawContent, itemType, projectId });
  if (duplicate.item) {
    const merged = await recordDuplicateOccurrence(duplicate.item.id);
    return {
      status: "duplicate_merged",
      toastNotification: `Duplicate folded into existing capture (${merged.occurrence_count} occurrences) — no new item created.`,
      item: merged.item,
      projectMatch: projMatch,
      modelRoute: routeAiModel({ itemType, rawContent, hasImage: Boolean(assetPath) || itemType === "screenshot" }),
      decisionLogged: null,
    };
  }

  // 2. Auto-Route to the right AI Model (Codex vs Vision vs Architect)
  const modelRoute = routeAiModel({
    itemType,
    rawContent,
    hasImage: Boolean(assetPath) || itemType === "screenshot",
  });

  // 3. Extract Structured Intelligence (Error fix, Decision, Entities, Summary)
  //    v2: async — optionally enriched by the HybridLLMBridge when a backend is reachable
  const analysis = await analyzeCapture({ rawContent, windowTitle, visualHint, routedModel: modelRoute.targetModel });

  // 4. Save Item (SQLite + FTS index + virtual Vault md path)
  const savedItem = await saveItem({
    title: analysis.title,
    rawContent,
    itemType,
    projectId,
    structuredSummary: analysis.summary,
    visualDescription: analysis.visualDescription,
    assetPath,
    sourceApp,
    sourceUrl,
    metadata: {
      routed_model: modelRoute.targetModel,
      task_mode: modelRoute.taskMode,
      project_confidence: projMatch.confidence,
      routing_reasons: projMatch.reasons,
      // v2.1: seed the dedup fingerprint so future lookups skip re-hashing every candidate
      dedup_fingerprint: duplicate.fingerprint,
      occurrence_count: 1,
      // v2 (llm_bridge parity): persist the full Snip->Action diagnosis
      ...(analysis.actionMetadata.error
        ? { error: analysis.actionMetadata.error, rootCause: analysis.actionMetadata.rootCause ?? "" }
        : {}),
      ...(analysis.actionMetadata.fix ? { fix: analysis.actionMetadata.fix } : {}),
      // v2.5: ingest-layer stamps (privacy hash, redactions, OCR provider)
      ...extraMetadata,
    },
  });

  // 5. Auto-Populate Decision Graph if a decision was detected
  let decisionLogged: BrainDecision | null = null;
  if (analysis.decision && projectId) {
    decisionLogged = await logDecision({
      projectId,
      title: analysis.decision.title,
      decision: analysis.decision.chosen,
      reasoning: analysis.decision.reasoning,
      alternatives: analysis.decision.alternatives,
      sourceItemId: savedItem.id,
    });
  }

  // 6. Auto-Populate Knowledge Graph Edges
  for (const edge of analysis.graphEdges) {
    await addGraphEdge(projectId, edge.source, edge.target, edge.relation);
  }

  return {
    status: "captured_zero_save",
    toastNotification: formatHudToast({
      projectMatch: projMatch,
      modelRoute,
      actionMetadata: analysis.actionMetadata,
    }),
    item: savedItem,
    projectMatch: projMatch,
    modelRoute,
    decisionLogged,
  };
}

/** Generates deterministic IDs for external callers needing stable references. */
export function newCaptureId(): string {
  return `cap_${randomUUID().replace(/-/g, "").slice(0, 10)}`;
}
