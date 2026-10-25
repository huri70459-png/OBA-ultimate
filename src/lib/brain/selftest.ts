// Project Brain OS — Guided Scenario & Chaos Verification Suite (v2.1)
// Port of test_harness.py::GuidedTestHarness — 10 real-world scenarios run against the
// live engine, printing plain-English diagnostics with exact file/function pointers
// when anything ever breaks. Safe to run repeatedly: scenario content is nonced so
// v2.1 duplicate folding never collapses two different runs into one.

import { findCrossProjectSolutions, compressProjectMemory } from "./compressor";
import { capture } from "./pipeline";
import { groundedAnswer } from "./grounded";
import { llmBridge } from "./llm-bridge";
import {
  buildContextInjectionPayload,
  getAllProjects,
  resolveProjectId,
  resolveItem,
  searchVault,
  syncMarkdownEditsFromDisk,
  resolveVaultPath,
  triageItem,
} from "./store";
import type { SelfTestCheck } from "./types";

export type { SelfTestCheck };

export interface SelfTestReport {
  ok: boolean;
  passedCount: number;
  totalCount: number;
  checks: SelfTestCheck[];
}

function record(
  checks: SelfTestCheck[],
  scenario: string,
  passed: boolean,
  explanation: string,
  inspectHint: string
): void {
  checks.push({
    name: scenario,
    status: passed ? "PASS" : "FAIL",
    detail: passed ? explanation : `${explanation} | Fix hint: ${inspectHint}`,
    fixHint: passed ? undefined : inspectHint,
  });
}

export async function runSelfDiagnostics(): Promise<SelfTestReport> {
  const checks: SelfTestCheck[] = [];

  try {
    // -----------------------------------------------------------------
    // SCENARIO 1: Vault & SQLite Initialization
    // -----------------------------------------------------------------
    const projects = await getAllProjects();
    const hasSeedProjects =
      projects.some((p) => p.name === "Three Musketeers") &&
      projects.some((p) => p.name === "Tier-1 Control Plane") &&
      projects.some((p) => p.name === "Project Brain OS");
    let summaryFileOk = false;
    try {
      const { readFile } = await import("fs/promises");
      const musketeers = projects.find((p) => p.name === "Three Musketeers");
      if (musketeers) {
        await readFile(
          resolveVaultPath(`ProjectBrainVault/Projects/${musketeers.slug}/_project_summary.md`),
          "utf-8"
        );
        summaryFileOk = true;
      }
    } catch {
      summaryFileOk = false;
    }
    record(
      checks,
      "1. Vault & SQLite Initialization",
      hasSeedProjects && summaryFileOk,
      `${projects.length} projects registered in SQLite and '_project_summary.md' verified on disk in the vault.`,
      "Check store.upsertProject() in src/lib/brain/store.ts (writes _project_summary.md)"
    );

    // -----------------------------------------------------------------
    // SCENARIO 2: Zero-Save Capture & Snip-to-Action Fix Extraction
    // -----------------------------------------------------------------
    const cap1 = await capture({
      rawContent: "Error: Cannot find module 'dotenv'\n  at gateway.mjs:14:2",
      itemType: "screenshot",
      windowTitle: "Terminal - three-musketeers",
      visualHint: "Red Render deployment terminal error for gateway.mjs",
      sourceApp: "GuidedTestHarness",
    });
    const extractedFix = (cap1.item.metadata.fix as string) || "";
    record(
      checks,
      "2. Zero-Save Capture & Snip-to-Action Fix",
      cap1.projectMatch.projectName === "Three Musketeers" && extractedFix === "pnpm add dotenv",
      `Auto-routed to [${cap1.projectMatch.projectName}] and extracted fix \`${extractedFix}\`.`,
      "Check analyzeCapture() in src/lib/brain/analyzer.ts"
    );

    // -----------------------------------------------------------------
    // SCENARIO 3: Chaos Test — Ambiguous Multi-Project Capture & Decision Extraction
    // Hard file path (+0.65) must beat session momentum from Scenario 2!
    // -----------------------------------------------------------------
    const capChaos = await capture({
      rawContent:
        `Decision: Use Playwright trace viewer instead of raw screenshots (rev ${Date.now()})\n` +
        "Reason: Easier DOM replay.",
      itemType: "note",
      windowTitle: "notes.md",
      activeFilePath: "C:/dev/tier1-control-plane/docs/notes.md",
      sourceApp: "GuidedTestHarness",
    });
    record(
      checks,
      "3. Chaos Test: Ambiguous Multi-Project & Decision Extraction",
      capChaos.projectMatch.projectName === "Tier-1 Control Plane" &&
        capChaos.decisionLogged !== null,
      `Hard file path beat session momentum: routed to [${capChaos.projectMatch.projectName}] and logged Decision "${capChaos.decisionLogged?.title ?? "None"}".`,
      "Check detectProject() in src/lib/brain/router.ts (path weight +0.65 vs momentum +0.15)"
    );

    // -----------------------------------------------------------------
    // SCENARIO 4: Two-Way Obsidian Disk Edit -> SQLite Search Sync
    // -----------------------------------------------------------------
    const mdPath = cap1.item.filePath;
    const absPath = resolveVaultPath(mdPath);
    let diskText = "";
    try {
      diskText = await (await import("fs/promises")).readFile(absPath, "utf-8");
    } catch {
      diskText = "";
    }
    const marker = `Manual Obsidian Edit: Added Hotfix Token Verification${Date.now()}`;
    const editToken = marker.split(" ").pop() ?? marker;
    let syncStats = { files_checked: 0, sqlite_records_updated: 0, vectors_resynced: 0 };
    let editSynced = false;
    if (diskText) {
      await (await import("fs/promises")).writeFile(
        absPath,
        `${diskText}\n${marker}\n`,
        "utf-8"
      );
      syncStats = await syncMarkdownEditsFromDisk();
      const afterEdit = await searchVault(editToken, cap1.projectMatch.projectId);
      editSynced = syncStats.sqlite_records_updated >= 1 && afterEdit.length >= 1;
    }
    record(
      checks,
      "4. Two-Way Obsidian Disk Edit -> SQLite Sync",
      editSynced,
      `Edited '${mdPath.split("/").pop()}' on disk; disk sync picked it up (${syncStats.sqlite_records_updated} record(s) updated, ${syncStats.vectors_resynced} vector(s) re-embedded) and the edit is now searchable.`,
      "Check syncMarkdownEditsFromDisk() in src/lib/brain/store.ts"
    );

    // -----------------------------------------------------------------
    // SCENARIO 5: Memory Compression & Work Session Replay
    // -----------------------------------------------------------------
    // v2.2: self-contained — capture a FRESH dotenv fix (unique per run via the
    // nonce'd deploy path, so dedup never folds it) before compressing. This keeps
    // the assertion "summary mentions dotenv" true regardless of unrelated capture
    // floods pushing older evidence out of the rolling-summary window.
    const musketeersId = await resolveProjectId("Three Musketeers");
    if (musketeersId) {
      await capture({
        rawContent:
          `Error: Cannot find module 'dotenv'\n` +
          `    at Function.Module._resolveFilename (/srv/app/deploy-${Date.now()}/gateway.mjs:2:14)`,
        itemType: "terminal",
        windowTitle: "Terminal - node gateway.mjs",
        sourceApp: "SelfTestSuite",
      });
    }
    const compRes = musketeersId
      ? await compressProjectMemory(musketeersId)
      : { error: "project missing" };
    const compOk =
      !("error" in compRes) &&
      compRes.estimated_summary_tokens < 450 &&
      compRes.compressed_rolling_summary.includes("dotenv");
    record(
      checks,
      "5. Memory Compression & Work Session Replay",
      compOk,
      !("error" in compRes)
        ? `Compressed project memory to ${compRes.estimated_summary_tokens} tokens (< 450 budget) and generated '${compRes.work_replay_file}'.`
        : "Compression failed",
      "Check compressProjectMemory() in src/lib/brain/compressor.ts"
    );

    // -----------------------------------------------------------------
    // SCENARIO 6: Anti-Drift Prompt Pre-Structurer (< 2,500 Token Budget)
    // -----------------------------------------------------------------
    const controlPlaneId = await resolveProjectId("Tier-1 Control Plane");
    let s6ok = false;
    let s6detail = "Skipped — project context unavailable";
    if (controlPlaneId) {
      const ctxPayload = await buildContextInjectionPayload(controlPlaneId, "playwright");
      if (!("error" in ctxPayload)) {
        const rewritten = await llmBridge.rewriteRawPrompt(
          "make the browser repair script stop failing on timeouts and log traces",
          ctxPayload
        );
        const spec = rewritten.structured_prompt_markdown;
        s6ok =
          spec.includes("Playwright trace viewer") &&
          spec.includes("Strict Output & Verification Contract") &&
          rewritten.estimated_tokens < 2500;
        s6detail = `Rewrote raw prompt into a ${rewritten.estimated_tokens}-token spec grounded in Tier-2 Decision Graph ("Playwright trace viewer"); backend: ${rewritten.backend_used.provider}.`;
      }
    }
    record(
      checks,
      "6. Anti-Drift Prompt Pre-Structurer (< 2,500 Tokens)",
      s6ok,
      s6detail,
      "Check rewriteRawPrompt() in src/lib/brain/llm-bridge.ts"
    );

    // -----------------------------------------------------------------
    // SCENARIO 7: Cross-Project Bug Fix Reuse Detection
    // -----------------------------------------------------------------
    const reusableHits = await findCrossProjectSolutions("dotenv gateway", controlPlaneId);
    const s7ok =
      reusableHits.length > 0 && reusableHits[0].suggested_fix === "pnpm add dotenv";
    record(
      checks,
      "7. Cross-Project Bug Fix Reuse Detection",
      s7ok,
      reusableHits.length > 0
        ? `Queried from [Tier-1 Control Plane] and found reusable fix \`${reusableHits[0].suggested_fix}\` from [${reusableHits[0].source_project}].`
        : "No cross-project hits found",
      "Check findCrossProjectSolutions() in src/lib/brain/compressor.ts"
    );

    // -----------------------------------------------------------------
    // SCENARIO 8: MCP Parity — Project Resolution & Malformed Call Resilience
    // -----------------------------------------------------------------
    const byName = await resolveProjectId("Three Musketeers");
    const bySlug = await resolveProjectId("three-musketeers");
    const badResolve = await resolveProjectId("non_existent_project_xyz");
    let gracefulCtxError = false;
    try {
      const ctx = await buildContextInjectionPayload("proj_does_not_exist_123", "");
      gracefulCtxError = "error" in ctx;
    } catch {
      gracefulCtxError = true;
    }
    record(
      checks,
      "8. MCP Server Parity & Malformed Call Resilience",
      Boolean(byName) && byName === bySlug && badResolve === null && gracefulCtxError,
      `Verified MCP 'get_project_context' resolution by project name${byName === bySlug ? " and slug" : ""}, clean null on unknown identifiers, and graceful error on invalid project context calls.`,
      "Check resolveProjectId() in src/lib/brain/store.ts"
    );

    // -----------------------------------------------------------------
    // SCENARIO 9: v2.1 Exact Duplicate Folding (36h, project-scoped)
    // -----------------------------------------------------------------
    const dedupNonce = Date.now();
    const dedupBase = `Error: Cannot find module 'dedup-probe-${dedupNonce}'\n  at gateway.mjs:14:2`;
    const capDup1 = await capture({
      rawContent: dedupBase,
      itemType: "terminal",
      windowTitle: "Terminal - three-musketeers",
      sourceApp: "GuidedTestHarness",
    });
    const capDup2 = await capture({
      rawContent: dedupBase, // exact repeat -> must fold, not create a new item
      itemType: "terminal",
      windowTitle: "Terminal - three-musketeers",
      sourceApp: "GuidedTestHarness",
    });
    // Same canonical content but routed to a DIFFERENT project -> must NOT fold
    const capDupCross = await capture({
      rawContent: dedupBase,
      itemType: "terminal",
      windowTitle: "Terminal - tier1-control-plane",
      activeFilePath: "C:/dev/tier1-control-plane/src/probe.mjs",
      sourceApp: "GuidedTestHarness",
    });
    // Whitespace/case variants are the SAME canonical content -> fold again (×3)
    const capDupFuzzy = await capture({
      rawContent: `ERROR:   cannot   FIND\nModule 'dedup-probe-${dedupNonce}'\n  AT gateway.mjs:14:2`,
      itemType: "terminal",
      windowTitle: "Terminal - three-musketeers",
      sourceApp: "GuidedTestHarness",
    });
    const foldedCount = Number(capDupFuzzy.item.metadata.occurrence_count ?? 1);
    const dupOk =
      capDup1.status === "captured_zero_save" &&
      capDup2.status === "duplicate_merged" &&
      capDup2.item.id === capDup1.item.id &&
      foldedCount >= 3 &&
      capDupFuzzy.item.id === capDup1.item.id &&
      capDupCross.status === "captured_zero_save" &&
      capDupCross.item.id !== capDup1.item.id;
    record(
      checks,
      "9. v2.1 Exact Duplicate Folding (36h, Project-Scoped)",
      dupOk,
      `Repeat capture folded into '${capDup1.item.title}' (now ${foldedCount} occurrences, last-seen stamped); a case/whitespace variant merged into the SAME item, while the cross-project repeat correctly created a separate capture.`,
      "Check findRecentDuplicate() / recordDuplicateOccurrence() in src/lib/brain/dedup.ts and the duplicate branch in pipeline.capture()"
    );

    // -----------------------------------------------------------------
    // SCENARIO 10: v2.1 Inbox Triage + Resolution + Grounded Ask
    // -----------------------------------------------------------------
    const probeNonce = Date.now();
    const capInbox = await capture({
      rawContent: `Grocery triage probe ${probeNonce}: buy oat milk and coffee beans`,
      itemType: "note",
      windowTitle: "Sticky Notes",
      sourceApp: "GuidedTestHarness",
    });
    const capInbox2 = await capture({
      rawContent: `Unrelated noise probe ${probeNonce}: old screenshot of a login screen`,
      itemType: "note",
      windowTitle: "Sticky Notes",
      sourceApp: "GuidedTestHarness",
    });
    const musketeersForTriage = await resolveProjectId("three-musketeers");
    let triageOk = false;
    let triageDetail = "Skipped — inbox capture or project unavailable";
    let askOk = false;
    let askDetail = "Skipped — no evidence available";
    if (capInbox.item.projectId === null && musketeersForTriage) {
      const triaged = await triageItem(capInbox.item.id, musketeersForTriage);
      const resolved = await resolveItem(capInbox2.item.id, "Handled manually during cleanup");
      triageOk =
        triaged.ok &&
        triaged.file_moved &&
        triaged.file_path.startsWith("ProjectBrainVault/Projects/three-musketeers/notes/") &&
        resolved.ok;
      triageDetail = triaged.ok
        ? `Inbox note triaged into [${triaged.project_name}]: vault file moved to '${triaged.file_path}'${resolved.ok ? "; second noise probe resolved with a resolution note" : ""}.`
        : `Triage failed: ${triaged.error ?? "unknown"}`;

      // Grounded ask over the triaged evidence — offline mode must be honest (excerpts,
      // not a fabricated answer). Python parity: sources + offline notice, llm_used=false.
      const ask = await groundedAnswer({
        projectId: musketeersForTriage,
        query: "oat milk grocery",
        mode: "ask",
      });
      const miss = await groundedAnswer({
        projectId: musketeersForTriage,
        // v2.2: wordless junk (no dictionary tokens) — earlier miss probes contained
        // real words like "evidence", which hash-embeddings could cosine-match against
        // vault items sharing that vocabulary, flaking the no-evidence assertion.
        query: `zzq7x-${probeNonce}-qxn88k`,
        mode: "ask",
      });
      askOk =
        ask.grounded &&
        ask.sources.length >= 1 &&
        // Offline: honest excerpt notice; Live LLM: a real generated answer. Both valid.
        (ask.llm_used ? ask.answer.trim().length > 20 : ask.answer.includes("Offline mode")) &&
        miss.grounded === false &&
        miss.sources.length === 0;
      askDetail = ask.grounded
        ? `Grounded ask retrieved ${ask.sources.length} vault excerpt(s); offline mode returned the evidence list instead of a generated answer; garbage query correctly answered 'no supporting evidence'.`
        : "Grounded ask returned no evidence";
    }
    record(checks, "10. v2.1 Inbox Triage, Resolution & Grounded Ask", triageOk && askOk, `${triageDetail} ${askDetail}`, "Check triageItem()/resolveItem() in src/lib/brain/store.ts and groundedAnswer() in src/lib/brain/grounded.ts");
  } catch (e) {
    checks.push({
      name: "Runtime Exception",
      status: "FAIL",
      detail: e instanceof Error ? e.message : String(e),
      fixHint: "Check dev.log for the full stack trace",
    });
  }

  const passedCount = checks.filter((c) => c.status === "PASS").length;
  return {
    ok: passedCount === checks.length,
    passedCount,
    totalCount: checks.length,
    checks,
  };
}