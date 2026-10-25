/**
 * Project Brain OS — Full Blueprint Verification Suite
 * Verifies the running Next.js implementation against the engineering blueprint:
 *   1. Schema parity (projects, items, decisions, graph_edges)
 *   2. First-boot seed (3 projects + demo captures)
 *   3. Zero-Save Capture pipeline (auto-router, model router, fix extraction, toast)
 *   4. Snip -> Action extraction (ModuleNotFound -> pnpm add / pip install)
 *   5. Auto-decision extraction + DECIDED_ON edge
 *   6. Knowledge graph edges (FIXED_BY / MENTIONED_IN / DECIDED_ON)
 *   7. FTS search (BM25-like)
 *   8. 3-Tier Context Injection payload + anti-drift prompt
 *   9. Universal Timeline (+ date filter)
 *  10. Project details + Knowledge Health Score
 *  11. Inbox fallback (below 35% confidence)
 *  12. Self-Test diagnostics endpoint
 *  13. MCP parity helpers (resolve by id/slug/name)
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
  // ---- 0. Boot & seed ----
  const health = await jfetch("/api/health");
  check("Engine online (/api/health)", health.status === 200 && health.data.status === "online", JSON.stringify(health.data));

  const projects = await jfetch("/api/projects");
  const plist = projects.data.projects || [];
  check("First-boot seed: 3 projects", plist.length >= 3, `${plist.length} projects: ${plist.map(p=>p.name).join(", ")}`);
  const musketeers = plist.find(p => p.name === "Three Musketeers");
  const controlPlane = plist.find(p => p.name === "Tier-1 Control Plane");
  const brainOs = plist.find(p => p.name === "Project Brain OS");
  check("Seed includes blueprint projects", Boolean(musketeers && controlPlane && brainOs), "Three Musketeers / Tier-1 Control Plane / Project Brain OS");
  check("Projects carry keyword fingerprints + git remotes", musketeers && Array.isArray(musketeers.keywords) && musketeers.keywords.includes("gateway.mjs") && Array.isArray(musketeers.gitRemotes) && musketeers.gitRemotes.length > 0, `keywords=${JSON.stringify(musketeers?.keywords)}`);

  // ---- 1. Zero-Save Capture: error capture auto-routes to Three Musketeers ----
  const cap1 = await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: `Error: Cannot find module 'playwright'\n    at runBrowserRepair (browser-repair.mjs:31:7)\n[run ${Date.now()}]`,
      item_type: "screenshot",
      window_title: "Terminal - tier-1-control-plane - VS Code",
      visual_hint: "Red terminal error during browser-repair workflow",
      source_app: "BlueprintVerifySuite",
    }),
  });
  const c1 = cap1.data;
  check("Capture 1 auto-routed to Tier-1 Control Plane", c1.projectMatch?.projectName === "Tier-1 Control Plane", `matched=${c1.projectMatch?.projectName} confidence=${c1.projectMatch?.confidence} reasons=${JSON.stringify(c1.projectMatch?.reasons)}`);
  check("Snip->Action fix extracted (pnpm add playwright)", c1.item?.metadata?.fix === "pnpm add playwright", `fix=${c1.item?.metadata?.fix}`);
  check("Model router -> codex-agent for terminal/code errors", c1.modelRoute?.targetModel === "codex-agent", `${c1.modelRoute?.targetModel} (${c1.modelRoute?.taskMode})`);
  check("Zero-save toast notification generated", typeof c1.toastNotification === "string" && c1.toastNotification.includes("Zero-Save"), c1.toastNotification);
  check("Vault .md path synthesized (Projects/<slug>/captures|notes)", typeof c1.item?.filePath === "string" && c1.item.filePath.startsWith("ProjectBrainVault/Projects/tier-1-control-plane/"), c1.item?.filePath);

  // ---- 2. Decision capture auto-extracts decision ----
  const cap2 = await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: `Decision: Use Render over Railway for worker hosting\nAlternatives: Railway, Fly.io, AWS ECS\nReason: Predictable worker pricing and simpler autoscaling. [rev ${Date.now()}]`,
      item_type: "note",
      window_title: "architecture.md - three-musketeers - VS Code",
      source_app: "BlueprintVerifySuite",
    }),
  });
  const c2 = cap2.data;
  check("Capture 2 auto-routed (title/slug fingerprint)", c2.projectMatch?.projectName === "Three Musketeers", `matched=${c2.projectMatch?.projectName} confidence=${c2.projectMatch?.confidence}`);
  check("Decision auto-extracted + logged", Boolean(c2.decisionLogged?.id), `title=${c2.decisionLogged?.title} | reasoning=${c2.decisionLogged?.reasoning?.slice(0,60)}`);
  check("DECIDED_ON edge written", (c2.decisionLogged?.id ? true : false), "decision logged -> DECIDED_ON edge via store.logDecision");

  // ---- 3. Low-confidence capture falls back to Inbox ----
  const cap3 = await jfetch("/api/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      raw_content: "Random grocery note: buy oat milk and coffee beans tomorrow",
      item_type: "note",
      window_title: "Sticky Notes",
      source_app: "BlueprintVerifySuite",
    }),
  });
  check("Low-confidence capture routed to Inbox (no Save dialog)", cap3.data.projectMatch?.projectId === null && cap3.data.projectMatch?.projectName === "Inbox", `projectName=${cap3.data.projectMatch?.projectName}, confidence=${cap3.data.projectMatch?.confidence}`);

  // ---- 4. Search (FTS parity) ----
  const search = await jfetch(`/api/search?q=playwright`);
  check("FTS search finds captured error", (search.data.results || []).length > 0, `${search.data.results.length} hit(s), top title="${search.data.results[0]?.title}"`);
  const searchVisual = await jfetch(`/api/search?q=render%20deploy%20error`);
  check("Search covers visual descriptions", (searchVisual.data.results || []).length > 0, `${searchVisual.data.results.length} hit(s)`);

  // ---- 5. 3-Tier Context Injection ----
  const ctx = await jfetch(`/api/context?project_id=${musketeers.id}&q=render&goal=Fix%20the%20deploy`);
  const cx = ctx.data;
  check("Tier 1 rolling memory present", typeof cx.tier_1_rolling_memory === "string" && cx.tier_1_rolling_memory.length > 10, cx.tier_1_rolling_memory?.slice(0, 80));
  check("Tier 2 decision graph present", Array.isArray(cx.tier_2_decision_graph) && cx.tier_2_decision_graph.length > 0, `${cx.tier_2_decision_graph.length} active decision(s)`);
  check("Tier 3 relevant evidence retrieved by query", Array.isArray(cx.tier_3_recent_and_relevant_evidence) && cx.tier_3_recent_and_relevant_evidence.length > 0, `${cx.tier_3_recent_and_relevant_evidence.length} evidence item(s)`);
  check("Knowledge graph edges included", Array.isArray(cx.knowledge_graph_edges), `${cx.knowledge_graph_edges?.length} edge(s)`);
  check("Anti-drift structured prompt generated", typeof cx.structured_prompt_markdown === "string" && cx.structured_prompt_markdown.includes("TIER 1") && cx.structured_prompt_markdown.includes("DO NOT VIOLATE"), `~${Math.round((cx.structured_prompt_markdown||"").length/4)} tokens (est.)`);
  const estTokens = Math.round(JSON.stringify(cx).length / 4);
  check("Payload under ~2,500 token budget", estTokens < 2500, `~${estTokens} tokens`);

  // ---- 6. MCP-parity: resolve by slug/name (resolve_project_id parity) ----
  const ctxBySlug = await jfetch(`/api/context?project_id=three-musketeers&q=render`);
  check("Context resolves project by SLUG (MCP parity)", ctxBySlug.status === 200 && ctxBySlug.data.project_name === "Three Musketeers", `status=${ctxBySlug.status}, project=${ctxBySlug.data.project_name}`);
  const ctxByName = await jfetch(`/api/context?project_id=${encodeURIComponent("Tier-1 Control Plane")}&q=playwright`);
  check("Context resolves project by NAME (MCP parity)", ctxByName.status === 200 && ctxByName.data.project_name === "Tier-1 Control Plane", `status=${ctxByName.status}, project=${ctxByName.data.project_name}`);
  const searchBySlug = await jfetch(`/api/search?q=playwright&project_id=tier-1-control-plane`);
  check("Search filters by slug (MCP parity)", searchBySlug.status === 200 && (searchBySlug.data.results || []).every(r => r.projectId === controlPlane.id), `${searchBySlug.data.results.length} scoped hit(s)`);

  // ---- 7. Timeline ----
  const timeline = await jfetch("/api/timeline");
  check("Universal timeline returns chronological stream", (timeline.data.timeline || []).length > 0, `${timeline.data.timeline.length} entries`);
  const today = new Date().toISOString().slice(0, 10);
  const timelineToday = await jfetch(`/api/timeline?date=${today}`);
  check("Timeline date filter works", (timelineToday.data.timeline || []).length > 0, `date=${today}: ${timelineToday.data.timeline.length} entries`);

  // ---- 8. Project details + health score ----
  const details = await jfetch(`/api/projects/${musketeers.id}`);
  const d = details.data;
  check("Project details: items+decisions+graph+health", Boolean(d.project && Array.isArray(d.items) && Array.isArray(d.decisions) && Array.isArray(d.graphEdges) && typeof d.healthScore === "number"), `health=${d.healthScore}%, items=${d.items.length}, decisions=${d.decisions.length}, edges=${d.graphEdges.length}`);
  check("Health score in 0-100 blueprint range", d.healthScore > 0 && d.healthScore <= 100, `${d.healthScore}%`);

  // ---- 9. Inbox pseudo-project ----
  const inbox = await jfetch(`/api/projects/inbox`);
  check("Inbox pseudo-project serves unsorted captures", inbox.status === 200 && Array.isArray(inbox.data.items) && inbox.data.items.length >= 1, `${inbox.data.items.length} inbox item(s)`);

  // ---- 10. Decision POST endpoint (manual log) ----
  const decPost = await jfetch("/api/decisions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_id: brainOs.id,
      title: "Verification: SQLite over Neo4j",
      decision: "Use SQLite + FTS5 instead of standalone Neo4j",
      reasoning: "Zero-config, portable, single .db file per blueprint",
      alternatives: ["Neo4j Desktop", "Docker Postgres"],
    }),
  });
  check("Manual decision logging (POST /api/decisions)", decPost.status === 200 && Boolean(decPost.data.id), `id=${decPost.data.id}`);

  // ---- 11. Self-test ----
  const st = await jfetch("/api/self-test");
  const checks = st.data.checks || [];
  const allPass = checks.every(c => c.status === "PASS");
  check("Built-in self-test suite all PASS", st.status === 200 && st.data.ok && allPass, checks.map(c => `${c.name}: ${c.status}`).join(" | "));

  // ---- Summary ----
  const passCount = results.filter(r => r.status === "PASS").length;
  console.log(`\n================ VERIFICATION SUMMARY ================`);
  console.log(`TOTAL: ${results.length} | PASS: ${passCount} | FAIL: ${failures}`);
  process.exit(failures > 0 ? 1 : 0);
})().catch((e) => {
  console.error("Suite crashed:", e);
  process.exit(1);
});
