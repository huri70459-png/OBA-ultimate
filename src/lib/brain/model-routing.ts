// Pure AI-model routing logic (no DB imports) — safe for client components.
// Port of project_router.py::route_ai_model

import type { ModelRoute } from "./types";

const CODE_ERROR_SIGNALS = [
  "traceback (most recent call last)",
  "error:",
  "exception",
  "module not found",
  "err_module_not_found",
  "syntaxerror",
  "typeerror",
  "pnpm ",
  "npm err!",
  "def ",
  "function ",
  "const ",
  "import ",
];

const DECISION_SIGNALS = [
  "decision:",
  "why we chose",
  "alternatives:",
  "tradeoff",
  "architecture",
  "migrating from",
];

export function routeAiModel(input: {
  itemType: string;
  rawContent: string;
  hasImage?: boolean;
}): ModelRoute {
  const { itemType, rawContent, hasImage = false } = input;
  const contentLower = rawContent.toLowerCase();

  if (CODE_ERROR_SIGNALS.some((sig) => contentLower.includes(sig)) || itemType === "terminal") {
    return {
      targetModel: "codex-agent",
      taskMode: "error_diagnosis_and_patch",
      reason: "Detected stack trace, terminal log, or source code snippet",
    };
  }

  if (DECISION_SIGNALS.some((sig) => contentLower.includes(sig))) {
    return {
      targetModel: "reasoning-architect",
      taskMode: "decision_and_graph_extraction",
      reason: "Detected architectural rationale or tradeoff discussion",
    };
  }

  if (hasImage || itemType === "screenshot") {
    return {
      targetModel: "vision-ocr-extractor",
      taskMode: "visual_semantic_markdown",
      reason: "Visual screenshot capture requiring OCR + semantic indexing",
    };
  }

  return {
    targetModel: "fast-memory-structurer",
    taskMode: "summarize_and_link",
    reason: "Standard note or web clip capture",
  };
}
