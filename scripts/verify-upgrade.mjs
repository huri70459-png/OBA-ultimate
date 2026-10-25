/**
 * Project Brain OS — Engine 3 + Vector Search Upgrade Verification
 * Covers:
 *   A. Daemon status endpoint (GET /api/daemon)
 *   B. Compression cycle (POST /api/daemon): session rollups, summary re-synthesis,
 *      gap report, vector backfill, duration
 *   C. Idempotency: second run creates 0 duplicate sessions
 *   D. Work-session items appear in timeline + context evidence
 *   E. Rolling summary upgraded (Tier 1 contains synthesized structure)
 *   F. Health gaps persisted on projects & returned by details API
 *   G. Vector semantic search: blueprint query "screenshot with red Render logs"
 *   H. Search modes: semantic / fts / hybrid + similarity field
 *   I. Session items are vector-indexed (semantic "work session" query)
 *   J. Self-test: all 6 checks PASS (incl. 2 new engine checks)
 */
const BASE = "http://localhost:3000";
const results = [];
let failures = 0;

function check(name, cond, detail) {
  const status = cond ? "PASS" : "FAIL";
  if (!cond) failures++;
  results.push({ name, status, detail });
  console.log(`[${status}] ${name} — ${detail}`);
}

async function jfetch(path, opts) {
  const res = await fetch(BASE + path, opts);
  let data = null;
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}

(async () => {
  // ---- A. Daemon status ----
  const status = await jfetch("/api/daemon");
  check("Daemon status endpoint", status.status === 200 && Boolean(status.data.daemon && status.data.vectorIndex), `model=${status.data.vectorIndex?.model} dim=${status.data.vectorIndex?.dim} vectors=${status.data.vectorIndex?.vectors} sessions=${status.data.sessions}`);

  // Ensure activity exists for session rollup: 2 fresh captures in one project, same block
  await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: "Quick thought: the vector index should roll this up into a work session block",
      item_type: "note",
      window_title: "notes.md - project-brain-os - VS Code",
      source_app: "UpgradeVerifySuite",
    }),
  });
  await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: "Quick thought: session rollup groups captures that happen within 90 minutes of each other",
      item_type: "note",
      window_title: "notes.md - project-brain-os - VS Code",
      source_app: "UpgradeVerifySuite",
    }),
  });

  // ---- B. Compression cycle ----
  const t0 = Date.now();
  const run1 = await jfetch("/api/daemon", { method: "POST" });
  const r1 = run1.data;
  check("Compression cycle executes", run1.status === 200 && typeof r1.sessionsCreated === "number", `${r1.sessionsCreated} session(s), ${r1.summariesUpdated?.length} summaries, ${r1.vectorsBackfilled} vectors backfilled, ${r1.durationMs}ms (wall ${Date.now() - t0}ms)`);
  check("Session rollups created from time blocks", r1.sessionsCreated >= 1, (r1.sessionDetails || []).map(s => `${s.projectName}: ${s.title} (${s.members} captures)`).join(" | ").slice(0, 220));
  check("Project summaries re-synthesized", Array.isArray(r1.summariesUpdated) && r1.summariesUpdated.length >= 1, `updated: ${(r1.summariesUpdated || []).join(", ")}`);
  check("Gap report generated per project", Boolean(r1.gapReport) && Object.keys(r1.gapReport).length >= 1, Object.entries(r1.gapReport || {}).map(([p, g]) => `${p}: ${g.length} gap(s)`).join(" | ").slice(0, 200));
  check("Legacy vectors backfilled", typeof r1.vectorsBackfilled === "number" && r1.vectorsBackfilled >= 0, `${r1.vectorsBackfilled} item(s) indexed retroactively`);

  // ---- C. Idempotency ----
  const run2 = await jfetch("/api/daemon", { method: "POST" });
  check("Daemon is idempotent (no duplicate sessions)", run2.data.sessionsCreated === 0, `2nd run created ${run2.data.sessionsCreated} sessions`);

  // ---- D. Session items in timeline ----
  const timeline = await jfetch("/api/timeline");
  const sessionEntries = (timeline.data.timeline || []).filter(t => t.itemType === "session");
  check("Work sessions visible in Universal Timeline", sessionEntries.length >= 1, `${sessionEntries.length} session item(s), latest: "${sessionEntries[0]?.title ?? "—"}"`);

  // ---- E. Rolling summary upgraded (Tier 1) ----
  const projects = await jfetch("/api/projects");
  const brainOs = (projects.data.projects || []).find(p => p.name === "Project Brain OS");
  const ctx = await jfetch(`/api/context?project_id=${brainOs.id}&q=session`);
  check("Tier-1 rolling memory now daemon-synthesized", typeof ctx.data.tier_1_rolling_memory === "string" && ctx.data.tier_1_rolling_memory.includes("Compressed memory") && ctx.data.tier_1_rolling_memory.includes("Current Focus"), ctx.data.tier_1_rolling_memory?.slice(0, 130).replace(/\n/g, " "));

  // ---- F. Health gaps in details API ----
  const details = await jfetch(`/api/projects/${brainOs.id}`);
  check("Details API returns healthGaps + lastCompressedAt", Array.isArray(details.data.healthGaps) && Boolean(details.data.lastCompressedAt), `gaps=${JSON.stringify(details.data.healthGaps?.map(g => `${g.severity}:${g.gap}`))}, lastCompressed=${details.data.lastCompressedAt}`);
  check("Health score persists (0-100 with gap penalties)", typeof details.data.healthScore === "number" && details.data.healthScore >= 0 && details.data.healthScore <= 100, `${details.data.healthScore}%`);

  // ---- G. Vector semantic search (blueprint query) ----
  const sem = await jfetch(`/api/search?q=${encodeURIComponent("find the screenshot with red Render logs")}&mode=semantic`);
  const semTop = (sem.data.results || [])[0];
  check("Semantic search answers blueprint query", sem.status === 200 && (sem.data.results || []).length > 0 && (semTop.similarity ?? 0) > 0, `top: "${semTop?.title}" sim=${semTop?.similarity?.toFixed?.(3)}`);
  const isRenderRelated = /render|dotenv|deployment|gateway/i.test(`${semTop?.title} ${semTop?.visualDescription} ${semTop?.rawContent}`);
  check("Semantic top-hit is actually on-topic (Render error)", isRenderRelated, `title=${semTop?.title}`);

  // ---- H. Search modes ----
  const hybrid = await jfetch(`/api/search?q=render&mode=hybrid`);
  check("Hybrid mode (vector+fts+recency) works", hybrid.status === 200 && (hybrid.data.results || []).length > 0 && (hybrid.data.results[0].modes || []).length > 0, `top rank=${hybrid.data.results[0]?.rank?.toFixed?.(3)}, modes=${JSON.stringify(hybrid.data.results[0]?.modes)}`);
  const fts = await jfetch(`/api/search?q=pytest&mode=fts`);
  check("FTS legacy mode still works", fts.status === 200 && (fts.data.results || []).length > 0, `${fts.data.results.length} fts hit(s)`);

  // ---- I. Session items vector-indexed ----
  const sessSearch = await jfetch(`/api/search?q=${encodeURIComponent("work session rollup captures")}&mode=semantic`);
  const sessHit = (sessSearch.data.results || []).find(r => r.itemType === "session");
  check("Session rollups are semantically searchable", Boolean(sessHit) && (sessHit.similarity ?? 0) > 0, sessHit ? `"${sessHit.title}" sim=${sessHit.similarity?.toFixed?.(3)}` : "no session hit");

  // ---- J. Self-test (8 guided scenarios) ----
  const st = await jfetch("/api/self-test");
  const checks = st.data.checks || [];
  const names = checks.map(c => c.name);
  check("Self-test runs 8 guided scenarios", checks.length === 8, names.join(" | "));
  check("Memory Compression scenario PASS", Boolean(checks.find(c => c.name.includes("5. Memory Compression"))?.status === "PASS"), checks.find(c => c.name.includes("5. Memory Compression"))?.detail);
  check("Disk-sync scenario PASS", Boolean(checks.find(c => c.name.includes("4. Two-Way Obsidian"))?.status === "PASS"), checks.find(c => c.name.includes("4. Two-Way Obsidian"))?.detail);
  check("Full self-test suite all PASS", st.data.ok && checks.every(c => c.status === "PASS"), checks.map(c => `${c.name}: ${c.status}`).join(" | "));

  // ---- Context payload budget regression ----
  const estTokens = Math.round(JSON.stringify(ctx.data).length / 4);
  check("Context payload still under ~2,500 tokens", estTokens < 2500, `~${estTokens} tokens`);

  const passCount = results.filter(r => r.status === "PASS").length;
  console.log(`\n================ UPGRADE VERIFICATION SUMMARY ================`);
  console.log(`TOTAL: ${results.length} | PASS: ${passCount} | FAIL: ${failures}`);
  process.exit(failures > 0 ? 1 : 0);
})().catch((e) => {
  console.error("Suite crashed:", e);
  process.exit(1);
});
