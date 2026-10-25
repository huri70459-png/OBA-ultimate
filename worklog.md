# Worklog

---
Task ID: 1
Agent: main (Z.ai)
Task: Build the Project Brain OS web app from uploaded Python engine files

Work Log:
- Reviewed uploaded files: sqlite_store.py, project_router.py, capture_pipeline.py, brain_api.py, desktop_agent.py, mcp_server.py, workspace.html, roadmap docs
- Initialized fullstack Next.js 16 environment via init script
- Defined Prisma schema (Project / Item / Decision / GraphEdge) and pushed to SQLite (db/custom.db)
- Ported engine to TypeScript:
  - src/lib/brain/store.ts (projects, items, decisions, graph edges, search, timeline, 3-tier context, structured prompt)
  - src/lib/brain/router.ts + model-routing.ts (project detection scoring + AI model routing)
  - src/lib/brain/analyzer.ts (ModuleNotFound fix extraction, decision detection, file-mention graph edges)
  - src/lib/brain/pipeline.ts (zero-save capture orchestration)
  - src/lib/brain/seed.ts (first-boot seed: 3 projects + 2 demo captures)
  - src/lib/brain/selftest.ts (end-to-end diagnostics)
- API routes: /api/health, /api/projects (+[id] incl. inbox), /api/capture, /api/decisions, /api/timeline, /api/search, /api/context, /api/self-test
- UI (single page /): dark-mode AI Workspace — header w/ universal search + Alt+S zero-save capture + self-test; sidebar w/ project spaces + knowledge health + inbox; 4 tabs (Vault & Editor w/ live Snip-to-Action preview, Universal Timeline, Decision & Knowledge Graph w/ SVG bipartite graph, Context Injector w/ 3-tier payload + copy prompt/JSON); dialogs (capture, new project, log decision, search results, self-test)
- Lint clean; API endpoints verified via curl; browser-verified via agent-browser (boot, editor live preview, capture+toast, timeline, graph, context synthesis, search, self-test 4/4 PASS, Alt+S hotkey, new project creation, mobile 390px)

Stage Summary:
- Deliverable: runnable Next.js 16 Project Brain OS workspace (port of Python engine + upgraded UI)
- DB: Prisma + SQLite at db/custom.db; seeds automatically on first /api/health call
- All golden paths browser-verified; no console/page errors

---
Task ID: 2
Agent: main (Z.ai)
Task: Full blueprint verification of Project Brain OS against uploaded plan + Python reference files

Work Log:
- Re-audited all engine modules (store.ts, router.ts, model-routing.ts, analyzer.ts, pipeline.ts, selftest.ts, seed.ts), Prisma schema, 9 API routes, and UI (4 tabs + 5 dialogs) against the blueprint & uploaded Python files
- Wrote scripts/verify-blueprint.mjs: 31-check end-to-end suite (seed, capture routing, fix extraction, model routing, decision extraction, inbox fallback, FTS, 3-tier context, token budget, timeline, health score, MCP parity, self-test)
- Found 1 gap: /api/context, /api/search, /api/decisions accepted only raw project ids — blueprint MCP parity requires id/slug/name resolution (resolve_project_id)
- Fixed all 3 routes to use store.resolveProjectId(); lint clean; page renders 200
- Re-ran suite: 31/31 PASS

Stage Summary:
- Blueprint conformance verified: schema, capture pipeline, router scoring weights, model router, decision/graph extraction, 3-tier context injection (<2,500 tokens), timeline, health score, self-test all match
- Deviations (by design): vault paths are synthesized metadata (no disk writes in cloud workspace); vector search deferred (Python reference also uses FTS5 only); Memory Compression Daemon (Sprint 4) pending; OS-level hotkey = Alt+S in web (desktop_agent.py covers OS integration)
- Verification suite kept at scripts/verify-blueprint.mjs for regression runs

---
Task ID: 3
Agent: main (Z.ai)
Task: Build Memory Compression Daemon (Engine 3) + Vector Semantic Search upgrade

Work Log:
- Prisma: added ItemVector sidecar table (base64 Float32 vectors in SQLite, sqlite-vec pattern) + Project.healthScore/healthGaps/lastCompressedAt; db:push clean
- embeddings.ts: local "brain-hash-v1" engine — 256-dim hashed features (word uni+bigrams, char trigrams, FNV-1a, signed buckets, sublinear TF, L2 norm), cosine similarity, base64 codec, topKeywords
- store.ts: saveItem now writes vector sidecar atomically; ensureVectorIndex() lazy backfill (memoized); searchVaultHybrid(query, {projectId, limit, mode}) with semantic|fts|hybrid ranking (0.6*cos + 0.25*token + 0.15*recency); computeHealthAndGaps() shared scorer (5 deterministic gap rules, penalty-capped); details API returns healthGaps + lastCompressedAt; inbox route aligned
- compressor.ts: Engine 3 daemon — session rollup (90-min gap blocks, >=2 captures, deterministic session_key idempotency, session items saved as itemType "session" with member list/topics), rolling summary re-synthesis (Current Focus / Recent Activity / Active Decisions / Knowledge Gaps), health + gaps persisted per project, runCompressionCycle() serialized+idempotent, maybeAutoCompress() 6h idle trigger fired from /api/health
- API: /api/daemon (GET status incl. vector index stats, POST run cycle, PUT idle nudge); /api/search mode=semantic|fts|hybrid; selftest.ts +2 checks (Vector Semantic Search, Memory Compression Daemon) = 6 total
- UI: Header "Compress Memory" button w/ toast report; Sidebar Knowledge Gaps panel (severity-colored, tooltip detail); session item style (Layers icon, emerald) in ui-shared + VaultView type select; workspace-store compressMemory action
- Verification: scripts/verify-upgrade.mjs 21/21 PASS (rollups, idempotency, timeline sessions, Tier-1 synthesis, gaps, blueprint semantic query "screenshot with red Render logs" -> dotenv capture sim=0.342, modes, session search, self-test 6/6, token budget 1656); regression verify-blueprint.mjs 31/31 PASS; lint clean; page 200

Stage Summary:
- Both deferred blueprint items now implemented: Engine 3 (Memory Compression Daemon) + Sprint-3 vector semantic search
- Idle daemon auto-fired during health checks (verified in daemon lastReport: trigger=self-test/auto, sessions across 3 projects)
- Deviations: hash-embeddings are deterministic/offline (not neural) — swap point is embedText() if a hosted embedder is added later; vectors stored in SQLite per sqlite-vec pattern (no LanceDB dependency)

---
Task ID: 4
Agent: main (Z.ai)
Task: Integrate user's v2 upgrade (Option 1 Hybrid LLM Bridge & Memory Compression Engine + Option 2 8-Scenario Chaos Harness) into the Next.js Brain OS

Work Log:
- Ported llm_bridge.py -> src/lib/brain/llm-bridge.ts: HybridLLMBridge with detectActiveBackend() (Ollama probe w/ 30s memo -> OPENAI/ANTHROPIC/GEMINI env keys -> deterministic-offline), completeText() (Ollama + OpenAI, graceful "" fallback), rewriteRawPrompt() (5-Section Engineering Spec: Clarified Objective / TIER 1 State / TIER 2 MUST RESPECT guardrails / TIER 3 Evidence+Known Fixes / Strict Output & Verification Contract, ~4 chars/token estimator, OPTIMAL/WARNING budget status)
- Upgraded analyzer.ts (analyzeCaptureCallback parity): EADDRINUSE -> `npx kill-port <port>`, runtime exceptions (SyntaxError/TypeError/ReferenceError/KeyError/ValueError) -> metadata {error, rootCause}, decision triggers + "we decided to"/"switched from", extensions +sql/html, optional live-LLM 1-sentence summary when backend reachable; analyzeCapture now async, pipeline awaits
- Vault upgraded from synthetic paths to REAL disk writes at <cwd>/ProjectBrainVault (sqlite_store.py layout): saveItem writes Obsidian-compatible .md (YAML frontmatter + "## Content" marker), upsertProject maintains _project_summary.md; store.syncMarkdownEditsFromDisk() scans tracked files, syncs disk edits back into SQLite + re-embeds vector sidecar (semantic search stays in sync)
- compressor.ts: added compressProjectMemory(projectId) (per-project <450-token Tier-1 re-synthesis w/ Resolved Fixes + Key Files sections, optional LLM digest pass, writes _project_summary.md + _work_replay.md with per-date capture grouping), findCrossProjectSolutions() (Cross-Project Bug Reuse), unified synthesis shared with daemon cycle; fixed metadata-parsing bug in updateProjectSummaries (now via toItem)
- API v2 wiring (brain_api.py parity): /api/health reports engine v2 + llm_backend; /api/capture + /api/decisions auto-compress matched project (memory_compression in response); /api/context compresses on-the-fly then returns token_estimate/token_budget_status/backend_used/refined_objective/known_fixes_referenced + 5-section spec; /api/projects/[id] runs disk sync before details; NEW POST /api/compress (id/slug/name resolution), POST /api/sync-disk, GET /api/cross-project
- selftest.ts upgraded 6 checks -> 8 Guided & Chaos scenarios w/ plain-English fix hints: vault init + summary file, snip-to-action fix, chaos multi-project (path beats momentum) + decision, disk-edit->sync, compression<450+replay, prompt rewriter<2500 grounded in decisions, cross-project reuse, MCP resolve-by-name/slug + malformed-call resilience
- UI: header AI-backend badge (Offline Synthesizer/Ollama/cloud); ContextView shows budget badge + backend chip + clarified objective + known fixes; SearchDialog gains "Cross-Project Fixes" mode (source-project badge + reusable fix chip, excludes selected project); SelfTestDialog describes 8 scenarios w/ ALL 8/8 scorecard line
- Slimmed /api/context transport payload (6 decisions w/ capped reasoning, 140-char evidence, 5 slim graph edges) to keep whole-JSON under the 2,500-token budget; MAX_SUMMARY_CHARS 1300
- Verification: scripts/verify-v2.mjs 20/20 PASS (health v2+backend, EADDRINUSE+SyntaxError detections, real vault file, auto-compression, <450 budget, both .md files on disk, disk-edit sync w/ 49 files checked, cross-project reuse, spec structure+budget, 8/8 self-test, decision auto-compress); regression verify-blueprint.mjs 31/31 PASS; verify-upgrade.mjs 21/21 PASS (updated self-test expectations); lint clean
- Browser-verified via agent-browser: boot, header badge "OFFLINE SYNTHESIZER", Context Injector spec w/ OPTIMAL badge + clarified objective, Cross-Project search (THREE MUSKETEERS -> "Reusable fix: pnpm add dotenv"), Self-Test ALL 8/8 SCENARIOS PASSED, Compress Memory refresh, mobile 390px render; no console/page errors

Stage Summary:
- All four v2 capabilities live: Hybrid LLM Bridge (auto-detect w/ offline fallback), Anti-Drift Prompt Pre-Structurer, Two-Way Obsidian Disk Sync (real vault at ProjectBrainVault/), Cross-Project Learning, 8-Scenario Guided & Chaos Harness (UI + /api/self-test)
- Deviations: anthropic/gemini keys detected but completion falls back to offline synthesis (llm_bridge.py v2 parity); vault lives in sandbox workspace disk (user-side Obsidian sync needs the desktop agent pointing at their own vault path)
- Combined regression board: 31/31 blueprint + 21/21 upgrade + 20/20 v2 = 72 checks green

---
Task ID: 5
Agent: main (Z.ai)
Task: Integrate v2.1 Part A (UI & Deduplication Upgrade) into the Next.js Brain OS

Work Log:
- Ported memory_compressor.py v2.1 dedup -> src/lib/brain/dedup.ts: canonicalizeText (CRLF->LF, trim, lowercase, whitespace collapse), contentFingerprint (sha256 "type\\0canonical" so note vs terminal of same text never merge), findRecentDuplicate (36h window, project/inbox-scoped, take 250 desc, on-the-fly fingerprints for pre-v2.1 items), recordDuplicateOccurrence (occurrence_count+1, last_seen_at, fingerprint seeding), occurrenceCount() read helper
- pipeline.capture: new step 1.5 — duplicate check after detectProject, before analysis/save; returns status "duplicate_merged" with toast "Duplicate folded into existing capture (N occurrences)"; new items seed dedup_fingerprint + occurrence_count 1 in metadata; /api/capture returns early on merge with memory_compression {skipped, reason:"duplicate_merged"} (brain_api.py parity)
- store.ts: listInbox(limit<=200), triageItem (validates item+project, PHYSICALLY moves vault .md from Inbox/ to Projects/<slug>/(captures|notes)/ with rename + collision prefix, re-points DB filePath + metadata.triage_status/triaged_at/triaged_to, bumps project.updatedAt, updateMany on ItemVector.projectId so scoped semantic search follows), resolveItem (triage_status=resolved + resolution + resolved_at); computeHealthAndGaps gains v2.1 Gap 6 "Fixes without a root-cause decision" (resolvedFixes param, wired into details API + both compressor paths)
- grounded.ts (new): port of brain_api.grounded_answer — /ask + /synthesize over searchVaultHybrid with an evidence relevance gate (FTS token match OR cosine >= 0.45; measured junk-query ceiling ~0.34, weak paraphrase 0.34-0.42, on-topic 0.48+), sources capped at 700-char excerpts, no-evidence -> "couldn't find supporting project evidence" (grounded:false), no LLM -> explicit "Offline mode" excerpt notice (never fabricates a generated answer), llm_used flag
- compressor.ts: _work_replay.md regenerated v2.1-style — day headers "N unique captures / M occurrences", 45-minute session splitting ("### Session k · HH:MM-HH:MM"), exact repeats folded as "xN" suffixes; compressProjectMemory returns occurrences_represented (sum of occurrence_count) and _project_summary.md now reports unique captures + observed occurrences
- API v2.1 routes: GET /api/inbox (triage_status projection), POST /api/triage (id/slug/name resolution), POST /api/resolve, POST /api/ask, POST /api/synthesize; /api/health bumps to engine v2.1 + version "2.1"
- selftest.ts 8 -> 10 scenarios: 9. v2.1 Exact Duplicate Folding (exact repeat folds x2, case/whitespace variant folds x3 into SAME item, cross-project + cross-type create new items), 10. v2.1 Inbox Triage + Resolution + Grounded Ask (file move to notes/, resolve note, evidence-grounded offline-honest ask, garbage query admits no evidence); scenario 3 content nonced so repeat harness runs keep logging decisions; offline-vs-LLM asserted backend-agnostically
- UI: VaultView — Grounded Ask & Wiki Synthesis panel (Ask/Synthesize buttons, offline "evidence excerpts only" badge vs "LLM-grounded answer", numbered source cards, all content rendered as escaped React text = XSS-safe, never dangerouslySetInnerHTML); inbox item stream gains per-item triage target select + Triage/Resolve buttons with inline resolution note input + "Resolved" checkmark state; OccurrenceBadge xN chip (ui-shared) on folded captures; CaptureDialog + VaultView save show "Duplicate folded - no new item" toast on merge; SelfTestDialog copy updated to 10 scenarios; live Snip->Action preview fixed to async analyzeCapture via useEffect (pre-existing sync-call type error)
- Regression upkeep: verify-blueprint.mjs captures nonced (zero-save toast + decisionLogged survive dedup on re-runs); verify-upgrade.mjs quick-thought captures nonced + self-test count 8->10; verify-v2.mjs captures nonced, replay check updated to v2.1 session format, self-test 10/10; new scripts/verify-v21.mjs 23-check suite (engine version, fold semantics B1-B3, skip-compression on merge, type/project scoping, 36h window via direct Prisma backdate, inbox listing, slug triage with real file move + vector re-point, resolution metadata, grounded ask/synthesize/miss, occurrences_represented, replay format + x3 folding, self-test 10/10)
- Verification: verify-v21 23/23 PASS; regression board stable across consecutive runs: blueprint 31/31 + upgrade 21/21 + v2 20/20 + v2.1 23/23 = 95/95; tsc clean in src/; eslint clean
- Browser-verified via agent-browser: boot, grounded ask (offline badge + 8 cited sources), inbox triage via UI (file physically moved to Projects/project-brain-os/notes/, confirmed via scoped search), self-test dialog 10/10 details, duplicate capture via dialog folded to occurrence_count 2 (single item), no console/page errors; screenshots scripts/brain-15-v21-selftest.png + brain-16-v21-workspace.png

Stage Summary:
- All v2.1 Part A capabilities live in the TypeScript stack: exact project-scoped duplicate folding w/ occurrence counts + last-seen, session-based work replay regeneration (45-min sessions, xN folding), inbox triage/resolve with real vault file moves + vector re-pointing, grounded Q&A/wiki synthesis with honest offline evidence-excerpt mode, health gap "fixes without root-cause decision"
- API surface now matches brain_api.py v2.1: /inbox /triage /resolve /ask /synthesize /capture(dedup) /compress /sync-disk /cross-project /self-test(10)
- Combined regression board: 95 checks green (blueprint 31 + upgrade 21 + v2 20 + v2.1 23)
- Deviations: evidence gate uses FTS-or-strong-cosine (junk-proof, measured) instead of Python's pure FTS; triage updates the vector sidecar projectId (semantic search upgrade Python lacks); no CORS/body-limit config needed (Next.js API routes are same-origin JSON)
