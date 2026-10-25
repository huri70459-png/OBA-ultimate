// Project Brain OS — Built-in Deterministic Intelligence Analyzer
// Port of capture_pipeline.py::_builtin_intelligent_analyzer (works fully offline, zero API keys)

import type { AnalysisResult } from "./types";

export function analyzeCapture(input: {
  rawContent: string;
  windowTitle?: string;
  visualHint?: string;
  routedModel: string;
}): AnalysisResult {
  const { rawContent, windowTitle = "", visualHint = "", routedModel } = input;

  const lines = rawContent
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const firstLine = lines[0] ? lines[0].replace(/^#+\s*/, "") : windowTitle || "Quick Capture";
  let title = firstLine.slice(0, 65);

  const actionMetadata: AnalysisResult["actionMetadata"] = {};
  const graphEdges: AnalysisResult["graphEdges"] = [];
  let decisionData: AnalysisResult["decision"] = null;

  // Detect missing module / package errors (Snip -> Action)
  const modMatch = rawContent.match(
    /Cannot find module ['"]([^'"]+)['"]|ModuleNotFoundError: No module named ['"]([^'"]+)['"]/
  );
  if (modMatch) {
    const missingPkg = modMatch[1] || modMatch[2];
    const installer = modMatch[1] ? `pnpm add ${missingPkg}` : `pip install ${missingPkg}`;
    title = `Error: Missing dependency '${missingPkg}'`;
    actionMetadata.error = "ModuleNotFound";
    actionMetadata.rootCause = `Missing package '${missingPkg}'`;
    actionMetadata.fix = installer;
    graphEdges.push({ source: title, target: installer, relation: "FIXED_BY" });
  }

  // Detect file mentions for Knowledge Graph
  const fileMentions = (rawContent + " " + windowTitle).match(
    /\b([a-zA-Z0-9_-]+\.(?:py|ts|tsx|js|mjs|json|md))\b/g
  );
  if (fileMentions) {
    for (const fm of new Set(fileMentions)) {
      graphEdges.push({ source: fm, target: title, relation: "MENTIONED_IN" });
    }
  }

  // Detect architectural decision blocks
  const lower = rawContent.toLowerCase();
  if (lower.includes("decision:") || lower.includes("why we chose")) {
    const reasonMatch = rawContent.match(/(?:reason|because|why)[:\s]+([^\n.]+)/i);
    const altMatch = rawContent.match(/(?:alternatives|instead of|over)[:\s]+([^\n.]+)/i);
    decisionData = {
      title,
      chosen: firstLine,
      reasoning: reasonMatch ? reasonMatch[1].trim() : "Captured from architectural note",
      alternatives: altMatch
        ? altMatch[1].split(",").map((a) => a.trim())
        : [],
    };
  }

  const summary =
    `[${routedModel}] ` +
    (actionMetadata.fix
      ? `Diagnosed ${actionMetadata.error} -> Fix: \`${actionMetadata.fix}\``
      : lines.slice(0, 2).join(" ").slice(0, 180));

  return {
    title,
    summary,
    visualDescription:
      visualHint || (windowTitle ? `Visual capture from '${windowTitle}'` : ""),
    actionMetadata,
    decision: decisionData,
    graphEdges,
  };
}

export function formatHudToast(input: {
  projectMatch: { projectName: string; confidence: number };
  modelRoute: { targetModel: string };
  actionMetadata: { fix?: string };
}): string {
  const { projectMatch, modelRoute, actionMetadata } = input;
  const fixStr = actionMetadata.fix ? ` | Suggested Fix: \`${actionMetadata.fix}\`` : "";
  return (
    `✅ Zero-Save -> [${projectMatch.projectName}] (${Math.round(projectMatch.confidence * 100)}% match) ` +
    `| Model: ${modelRoute.targetModel}${fixStr}`
  );
}
