/**
 * Project Brain OS — v2 Upgrade Verification (Hybrid LLM Bridge & Memory Compression Engine)
 * Ports the 8-scenario Guided & Chaos philosophy of test_harness.py to the live Next.js engine.
 * Covers:
 *   A. /api/health reports v2 engine + llm_backend (HybridLLMBridge detection)
 *   B. Analyzer v2: EADDRINUSE -> npx kill-port, SyntaxError -> runtime-error metadata
 *   C. /api/capture returns memory_compression + writes REAL .md file into the vault on disk
 *   D. POST /api/compress: < 450-token Tier-1 summary, health report, _project_summary.md
 *      + _work_replay.md regenerated on disk
 *   E. Two-Way Obsidian Disk Sync: disk edit -> POST /api/sync-disk -> searchable in SQLite
 *   F. Cross-Project Learning: /api/cross-project finds a fix solved in another project
 *   G. Anti-Drift Prompt Pre-Structurer: /api/context?goal= -> 5-section spec under budget
 *   H. /api/self-test: all 8 guided scenarios PASS
 *   I. /api/decisions auto-compresses Tier-1 memory
 */
import fs from "fs";
import path from "path";

const BASE = "http://localhost:3000";
const results = [];
let failures = 0;

function check(name, cond, detail) {
  const status = cond ? "PASS" : "FAIL";
  if (!cond) failures++;
  results.push({ name, status, detail });
  console.log(`[${status}] ${name} — ${detail}`);
}

async function jfetch(pathname, opts) {
  const res = await fetch(BASE + pathname, opts);
  let data = null;
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}

const absVault = (rel) => path.join(process.cwd(), rel);

(async () => {
  // ---- A. Health: v2 engine + llm_backend ----
  const health = await jfetch("/api/health");
  check("v2 engine online with llm_backend", health.status === 200 && /v2/.test(health.data.engine ?? "") && Boolean(health.data.llm_backend?.provider),
    `engine="${health.data.engine}" backend=${health.data.llm_backend?.provider} (${health.data.llm_backend?.mode})`);

  // ---- B. Analyzer v2 detections ----
  const capPort = await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: "Error: listen EADDRINUSE: address already in use :::3000\n  at Server.setupListenListen",
      item_type: "terminal",
      window_title: "Terminal - project-brain-os",
      source_app: "V2VerifySuite",
    }),
  });
  const portFix = capPort.data.item?.metadata?.fix ?? "";
  check("Analyzer v2: EADDRINUSE -> npx kill-port", /^npx kill-port \d+$/.test(portFix), `fix="${portFix}" (title="${capPort.data.item?.title}")`);

  const capSyntax = await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: "SyntaxError: Unexpected end of JSON input while parsing gateway config",
      item_type: "terminal",
      window_title: "Terminal - three-musketeers",
      source_app: "V2VerifySuite",
    }),
  });
  check("Analyzer v2: runtime exception metadata", capSyntax.data.item?.metadata?.error === "SyntaxError", `error=${capSyntax.data.item?.metadata?.error}, rootCause="${(capSyntax.data.item?.metadata?.rootCause ?? "").slice(0, 60)}"`);

  // ---- C. Capture auto-compression + real vault file on disk ----
  const capDisk = capSyntax.data;
  const realFileOk = capDisk.item?.filePath && fs.existsSync(absVault(capDisk.item.filePath));
  check("Capture writes real .md into vault on disk", Boolean(realFileOk), `filePath=${capDisk.item?.filePath}`);
  const mc = capDisk.memory_compression;
  check("Capture auto-runs per-project memory compression", Boolean(mc?.project_id) && typeof mc?.estimated_summary_tokens === "number",
    mc?.project_name ? `${mc.project_name}: ${mc.estimated_summary_tokens} tokens, health ${mc.health.score}/100 (${mc.health.status})` : "missing");

  // ---- D. POST /api/compress ----
  const comp = await jfetch("/api/compress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project_id: "Three Musketeers" }),
  });
  const c = comp.data;
  check("Per-project compression under 450-token budget", comp.status === 200 && c.estimated_summary_tokens < 450, `${c.estimated_summary_tokens} tokens (< 450) from ${c.items_compressed} captures`);
  check("Compression report carries health + gaps", typeof c.health?.score === "number" && Array.isArray(c.health?.gaps), `score=${c.health?.score}/100 (${c.health?.status}), gaps=${JSON.stringify(c.health?.gaps).slice(0, 120)}`);
  const summaryOnDisk = c.summary_file && fs.existsSync(absVault(c.summary_file));
  const replayOnDisk = c.work_replay_file && fs.existsSync(absVault(c.work_replay_file));
  check("_project_summary.md regenerated on disk", Boolean(summaryOnDisk), c.summary_file);
  check("_work_replay.md (chronological) regenerated on disk", Boolean(replayOnDisk), c.work_replay_file);
  const replayText = replayOnDisk ? fs.readFileSync(absVault(c.work_replay_file), "utf-8") : "";
  check("Work replay groups captures by date", replayText.includes("📅"), replayText.split("\n").slice(0, 3).join(" | ").slice(0, 140));

  // ---- E. Two-Way Obsidian Disk Sync ----
  const token = `DiskEditProbe${Date.now()}`;
  // capture a fresh item so its vault .md is guaranteed to exist on disk
  const capProbe = await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: `Obsidian two-way sync probe note ${token}: edit the file on disk and it must flow back into SQLite`,
      item_type: "note",
      window_title: "sync-probe.md - project-brain-os - VS Code",
      source_app: "V2VerifySuite",
    }),
  });
  const trackedRel = capProbe.data.item?.filePath;
  let syncOk = false;
  let syncStats = {};
  if (trackedRel && fs.existsSync(absVault(trackedRel))) {
    const abs = absVault(trackedRel);
    const before = fs.readFileSync(abs, "utf-8");
    fs.writeFileSync(abs, `${before}\nManual Obsidian Edit: Hotfix Token ${token}\n`, "utf-8");
    const sync = await jfetch("/api/sync-disk", { method: "POST" });
    syncStats = sync.data || {};
    const after = await jfetch(`/api/search?q=${token}`);
    syncOk = (syncStats.sqlite_records_updated ?? 0) >= 1 && (after.data.results || []).length >= 1;
    // restore file to pre-edit content to keep the vault clean, then re-sync so SQLite follows
    fs.writeFileSync(abs, before, "utf-8");
    await jfetch("/api/sync-disk", { method: "POST" });
  }
  check("Disk edit -> /api/sync-disk -> searchable in SQLite", syncOk,
    `checked=${syncStats.files_checked}, updated=${syncStats.sqlite_records_updated}, vectors_resynced=${syncStats.vectors_resynced}`);

  // ---- F. Cross-Project Learning ----
  const xproj = await jfetch(`/api/cross-project?q=${encodeURIComponent("dotenv gateway")}&exclude_project_id=tier-1-control-plane`);
  const sol = (xproj.data.solutions || [])[0];
  check("Cross-project reuse finds fix from another project", Boolean(sol) && sol.suggested_fix === "pnpm add dotenv",
    sol ? `fix="${sol.suggested_fix}" from [${sol.source_project}]` : "no solutions");

  // ---- G. Anti-Drift Prompt Pre-Structurer ----
  const ctx = await jfetch(`/api/context?project_id=three-musketeers&q=deploy&goal=${encodeURIComponent("fix the render deployment and stop the gateway crash loop")}`);
  const cx = ctx.data;
  const spec = cx.structured_prompt_markdown ?? "";
  check("Context returns token budget status + backend", Boolean(cx.token_budget_status) && Boolean(cx.backend_used?.provider),
    `${cx.token_budget_status} · backend=${cx.backend_used?.provider} · est=${cx.token_estimate}`);
  check("5-Section Engineering Spec structure", spec.includes("Clarified Engineering Objective") && spec.includes("Strict Output & Verification Contract") && spec.includes("MUST RESPECT"),
    `sections: ${["1. Clarified", "2. TIER 1", "3. TIER 2", "4. TIER 3", "5. Strict Output"].map(s => spec.includes(s.split(". ")[1].slice(0, 8)) ? "✓" : "✗").join(" ")}`);
  check("Spec stays under 2,500-token budget", (cx.token_estimate ?? 99999) < 2500, `${cx.token_estimate} tokens`);
  check("Spec grounded in Tier-1 compressed memory", spec.includes(cx.tier_1_rolling_memory?.slice(0, 40) ?? "___"), cx.tier_1_rolling_memory?.slice(0, 90).replace(/\n/g, " "));

  // ---- H. 8-Scenario Self-Test ----
  const st = await jfetch("/api/self-test");
  const checks = st.data.checks || [];
  const names = checks.map((x) => x.name);
  check("Self-test runs 8 guided scenarios", checks.length === 8, names.join(" | "));
  const scenarioNames = ["1. Vault & SQLite", "2. Zero-Save Capture", "3. Chaos Test", "4. Two-Way Obsidian", "5. Memory Compression", "6. Anti-Drift Prompt", "7. Cross-Project", "8. MCP"];
  const allNamed = scenarioNames.every((s) => names.some((n) => n.startsWith(s)));
  check("All 8 blueprint scenarios present", allNamed, names.join(" | ").slice(0, 220));
  check("8/8 scenarios PASS", st.data.ok && st.data.passedCount === 8 && checks.every((x) => x.status === "PASS"),
    checks.map((x) => `${x.name.split(".")[0]}:${x.status}`).join(" "));

  // ---- I. Decision auto-compression ----
  const dec = await jfetch("/api/decisions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id: "Tier-1 Control Plane",
      title: `v2 Verify Decision ${Date.now()}`,
      decision: "Keep verification artifacts out of the live vault",
      reasoning: "Deterministic suites must not pollute user-facing memory",
      alternatives: ["Separate sandbox DB"],
    }),
  });
  check("Decision logging auto-compresses memory", dec.status === 200 && Boolean(dec.data.memory_compression?.project_id),
    dec.data.memory_compression ? `${dec.data.memory_compression.project_name}: ${dec.data.memory_compression.estimated_summary_tokens} tokens` : "missing");

  const passCount = results.filter((r) => r.status === "PASS").length;
  console.log(`\n================ V2 UPGRADE VERIFICATION SUMMARY ================`);
  console.log(`TOTAL: ${results.length} | PASS: ${passCount} | FAIL: ${failures}`);
  process.exit(failures > 0 ? 1 : 0);
})().catch((e) => {
  console.error("Suite crashed:", e);
  process.exit(1);
});
