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
