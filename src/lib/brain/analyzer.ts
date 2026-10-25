// Project Brain OS — Built-in Deterministic Intelligence Analyzer (v2)
// Port of llm_bridge.py::analyze_capture_callback (upgraded Snip -> Action analyzer):
//   - Node  "Cannot find module 'x'"        -> pnpm add x
//   - Python "ModuleNotFoundError: x"       -> pip install x
//   - Locked port "EADDRINUSE ...:3000"     -> npx kill-port 3000        (v2 NEW)
//   - Runtime exceptions (SyntaxError, TypeError, ReferenceError, KeyError, ValueError) (v2 NEW)
//   - File & component mentions -> MENTIONED_IN Knowledge Graph edges
//   - Architectural decision extraction (Decision:/why we chose/we decided to/switched from)
//   - Optional live LLM 1-sentence summary enrichment when a backend is reachable (v2 NEW)
// Works fully offline with zero API keys via the deterministic fallback path.

import { llmBridge } from "./llm-bridge";
import type { AnalysisResult } from "./types";

export async function analyzeCapture(input: {
  rawContent: string;
  windowTitle?: string;
  visualHint?: string;
  routedModel: string;
}): Promise<AnalysisResult> {
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

  // A. Snip -> Action: extract missing dependencies / terminal errors + fix commands
  const nodeMod = rawContent.match(/Cannot find module ['"]([^'"]+)['"]/);
  const pyMod = rawContent.match(/ModuleNotFoundError: No module named ['"]([^'"]+)['"]/);
  const portErr = rawContent.match(/EADDRINUSE.*?:(\d+)/);
  const syntaxErr = rawContent.match(
    /(SyntaxError|TypeError|ReferenceError|KeyError|ValueError):\s*([^\n]+)/
  );

  if (nodeMod) {
    const pkg = nodeMod[1];
    const fixCmd = `pnpm add ${pkg}`;
    title = `Error: Missing Node dependency '${pkg}'`;
    actionMetadata.error = "ModuleNotFound";
    actionMetadata.rootCause = `Missing npm/pnpm package '${pkg}'`;
    actionMetadata.fix = fixCmd;
    graphEdges.push({ source: title, target: fixCmd, relation: "FIXED_BY" });
  } else if (pyMod) {
    const pkg = pyMod[1];
    const fixCmd = `pip install ${pkg}`;
    title = `Error: Missing Python module '${pkg}'`;
    actionMetadata.error = "ModuleNotFoundError";
    actionMetadata.rootCause = `Missing Python package '${pkg}'`;
    actionMetadata.fix = fixCmd;
    graphEdges.push({ source: title, target: fixCmd, relation: "FIXED_BY" });
  } else if (portErr) {
    const port = portErr[1];
    const fixCmd = `npx kill-port ${port}`;
    title = `Error: Port ${port} already in use (EADDRINUSE)`;
    actionMetadata.error = "EADDRINUSE";
    actionMetadata.rootCause = `Port ${port} locked by another process`;
    actionMetadata.fix = fixCmd;
    graphEdges.push({ source: title, target: fixCmd, relation: "FIXED_BY" });
  } else if (syntaxErr) {
    const errType = syntaxErr[1];
    const errMsg = syntaxErr[2].trim();
    title = `${errType}: ${errMsg.slice(0, 45)}`;
    actionMetadata.error = errType;
    actionMetadata.rootCause = errMsg;
    actionMetadata.fix = `Inspect stack trace for ${errType}`;
  }

  // B. Extract File & Component Graph Nodes
  const fileMentions = (rawContent + " " + windowTitle).match(
    /\b([a-zA-Z0-9_-]+\.(?:py|ts|tsx|js|mjs|json|md|sql|html))\b/g
  );
  if (fileMentions) {
    for (const fm of new Set(fileMentions)) {
      graphEdges.push({ source: fm, target: title, relation: "MENTIONED_IN" });
    }
  }

  // C. Extract Architectural Decisions (Decision + Alternatives + Reasoning)
  const lower = rawContent.toLowerCase();
  if (
    lower.includes("decision:") ||
    lower.includes("why we chose") ||
    lower.includes("we decided to") ||
    lower.includes("switched from")
  ) {
    const reasonMatch = rawContent.match(/(?:reason|reasoning|because|why)[:\s]+([^\n.]+)/i);
    const altMatch = rawContent.match(/(?:alternatives|instead of|over|rejected)[:\s]+([^\n.]+)/i);
    decisionData = {
      title,
      chosen: firstLine,
      reasoning: reasonMatch ? reasonMatch[1].trim() : "Captured from architectural rationale note",
      alternatives: altMatch
        ? altMatch[1].split(",").map((a) => a.trim()).filter(Boolean)
        : [],
    };
  }

  // D. Optional live LLM summary upgrade (only when Ollama/Cloud backend is reachable)
  // v2.2: short 6s cap — capture-path UX must never wait on a slow cloud provider.
  let llmSummary = "";
  if (rawContent.length > 120) {
    llmSummary = await llmBridge.completeText(
      "Summarize this developer capture in 1 concise sentence (< 25 words) focusing on technical facts.",
      rawContent.slice(0, 1500),
      80,
      { timeoutMs: 6_000 }
    );
  }

  let summary: string;
  if (llmSummary) {
    summary = `[${routedModel}] ${llmSummary}`;
  } else if (actionMetadata.fix) {
    summary = `[${routedModel}] Diagnosed ${actionMetadata.error} -> Suggested Fix: \`${actionMetadata.fix}\``;
  } else {
    summary = `[${routedModel}] ` + lines.slice(0, 2).join(" ").slice(0, 180);
  }

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
