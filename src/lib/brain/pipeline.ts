// Project Brain OS — Zero-Save Universal Capture Pipeline
// Port of capture_pipeline.py::ZeroSaveCapturePipeline

import { randomUUID } from "crypto";
import { detectProject, routeAiModel } from "./router";
import { analyzeCapture, formatHudToast } from "./analyzer";
import { addGraphEdge, logDecision, saveItem } from "./store";
import type { CaptureResult } from "./types";

export async function capture(input: {
  rawContent: string;
  itemType?: string;
  windowTitle?: string;
  activeFilePath?: string;
  sourceApp?: string;
  sourceUrl?: string;
  assetPath?: string;
  visualHint?: string;
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
  } = input;

  // 1. Auto-Detect Project
  const projMatch = await detectProject({ rawContent, windowTitle, activeFilePath, sourceUrl });
  const projectId = projMatch.projectId;

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
      // v2 (llm_bridge parity): persist the full Snip->Action diagnosis
      ...(analysis.actionMetadata.error
        ? { error: analysis.actionMetadata.error, rootCause: analysis.actionMetadata.rootCause ?? "" }
        : {}),
      ...(analysis.actionMetadata.fix ? { fix: analysis.actionMetadata.fix } : {}),
    },
  });

  // 5. Auto-Populate Decision Graph if a decision was detected
  let decisionLogged = null;
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
