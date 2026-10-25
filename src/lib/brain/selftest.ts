// Project Brain OS — Automated End-to-End Diagnostic Suite (port of brain_api.py::run_self_diagnostics)

import { runCompressionCycle } from "./compressor";
import { capture } from "./pipeline";
import {
  buildContextInjectionPayload,
  getAllProjects,
  searchVault,
  searchVaultHybrid,
} from "./store";
import type { SelfTestCheck } from "./types";

export type { SelfTestCheck };

export async function runSelfDiagnostics(): Promise<{ ok: boolean; checks: SelfTestCheck[] }> {
  const checks: SelfTestCheck[] = [];
  try {
    const projs = await getAllProjects();
    checks.push({
      name: "SQLite & Project Registry",
      status: "PASS",
      detail: `${projs.length} projects online`,
    });

    const testCap = await capture({
      rawContent:
        "Self-Test Check: ModuleNotFoundError: No module named 'pytest' in test_runner.py",
      itemType: "terminal",
      windowTitle: "Self-Test Runner - project-brain",
      sourceApp: "DiagnosticEngine",
    });

    const fixFound = (testCap.item.metadata.fix as string) || "";
    checks.push({
      name: "Zero-Save Capture & Snip-to-Action",
      status: fixFound === "pip install pytest" ? "PASS" : "WARN",
      detail: `Auto-routed to [${testCap.projectMatch.projectName}] | Extracted Fix: \`${fixFound}\``,
    });

    const hits = await searchVault("pytest");
    checks.push({
      name: "Full-Text & Semantic Index",
      status: hits.length > 0 ? "PASS" : "FAIL",
      detail: `Retrieved ${hits.length} matching item(s)`,
    });

    const targetProjId = testCap.projectMatch.projectId || projs[0]?.id || "";
    const ctx = await buildContextInjectionPayload(targetProjId, "pytest");
    const hasTier1 = "tier_1_rolling_memory" in ctx;
    checks.push({
      name: "3-Tier Context Injection Engine",
      status: hasTier1 ? "PASS" : "FAIL",
      detail: `Built compact payload for [${"project_name" in ctx ? ctx.project_name : "?"}]`,
    });

    // Vector semantic search — blueprint query style: "find the screenshot with red Render logs"
    const semHits = await searchVaultHybrid("screenshot with red Render deployment error logs", {
      mode: "semantic",
      limit: 5,
    });
    const topSim = semHits[0]?.similarity ?? 0;
    checks.push({
      name: "Vector Semantic Search (brain-hash-v1)",
      status: semHits.length > 0 && topSim > 0 ? "PASS" : "FAIL",
      detail: semHits.length
        ? `Top match: "${semHits[0].title}" · cosine=${topSim.toFixed(3)}`
        : "No semantic hits returned",
    });

    // Memory Compression Daemon — idempotent cycle: sessions + summaries + gaps
    const report = await runCompressionCycle("self-test");
    const daemonOk =
      typeof report.sessionsCreated === "number" &&
      report.sessionsCreated >= 0 &&
      Array.isArray(report.summariesUpdated);
    checks.push({
      name: "Memory Compression Daemon",
      status: daemonOk ? "PASS" : "FAIL",
      detail: `${report.sessionsCreated} session rollup(s) · ${report.summariesUpdated.length} summaries synthesized · ${report.vectorsBackfilled} vectors backfilled · ${report.durationMs}ms`,
    });

    return { ok: true, checks };
  } catch (e) {
    checks.push({
      name: "Runtime Exception",
      status: "FAIL",
      detail: e instanceof Error ? e.message : String(e),
    });
    return { ok: false, checks };
  }
}
