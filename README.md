# Project Brain OS

A local-first **universal knowledge capture, memory, and execution system** — a single workspace that watches what you do, remembers what mattered, and hands the right context back to any AI agent before it drifts.

Engine **v2.5** (Privacy Guard + Vision OCR + Closed-Loop Fixes + Two-Way Editing + MCP) with v2.6 boundary hardening (schema-validated capture, body-size caps, durable vault-sync state).

## What it does

- **Zero-save capture** — paste or stream any error, note, terminal output, or screenshot; the engine auto-routes it to the right project (title/slug/keyword fingerprints, confidence-scored, low-confidence goes to the Inbox), extracts suggested fixes, and writes an Obsidian-compatible `.md` note into a real on-disk vault.
- **Project memory (3 tiers)** — Tier 1 rolling summary (auto re-compressed on every capture), Tier 2 decision graph, Tier 3 relevant evidence retrieval, all folded into an anti-drift structured prompt under a ~2,500-token budget.
- **Closed-loop fix verification** — suggested fixes are *not* resolutions: an Action ledger walks `detected → suggested → attempted → verified | failed`, health scoring only counts verified fixes, and VERIFIED_BY edges are written into the knowledge graph.
- **Two-way vault editing** — edit notes in the workspace (optimistic-concurrency PATCH with 409 conflict detection + revision snapshots) or edit the `.md` files on disk (Obsidian/VS Code) and the engine syncs edits back into SQLite.
- **Privacy Guard** — sensitive windows (password managers, private browsing, `.env`, keychain) are blocked outright (422); secrets (`sk-…`, `AIza…`, `ghp_…`, Bearer headers, PEM blocks, env assignments) are redacted **before** anything persists, at every capture entrypoint.
- **Vision OCR** — screenshot captures persist the image into the vault (`assets/`) and run multimodal OCR (OpenAI-compatible endpoint when configured, local-asset-store fallback offline).
- **MCP server + desktop agent** — `scripts/mcp_server.mjs` speaks JSON-RPC 2.0 stdio (6 tools); `scripts/desktop_agent.py` captures clipboard/snips/screenshots with client-side privacy redaction and a JSONL spool for offline retries.
- **Grounded chat** — NDJSON-streaming assistant answers grounded in the captured corpus, with an explicit offline badge when no LLM backend is configured.

## Quickstart

```bash
cp .env.example .env          # adjust DATABASE_URL if needed
npm install
npm run db:generate           # prisma generate
npm run db:push               # create/sync the SQLite schema (dev workflow)
npm run dev                   # http://localhost:3000
```

First boot seeds 3 demo projects + 2 captures so the workspace is alive in seconds. The schema can also be applied via migrations on servers/CI:

```bash
npm run db:migrate:deploy     # prisma migrate deploy (uses prisma/migrations)
```

## Verification

The repository carries its own regression board — **239 checks across 9 suites**, all runnable against a live dev server:

```bash
npm run test:regression       # blueprint 31, upgrade 21, v2 20, v2.1 23, v2.2 19,
                              # enterprise 34, ops 23, realtime 29, v2.5 39
npm run type-check            # tsc --noEmit
npm run lint                  # eslint .
npm run ci                    # lint + type-check + build
```

## Architecture map

```
src/lib/brain/
  store.ts            SQLite (Prisma) + vault writer (atomic .tmp+rename, item-id
                      filenames) + search (BM25-like + brain-hash-v1 vectors) +
                      health engine + disk-sync + vault-sync state backfill
  capture-schema.ts   zod boundary gate for every capture entrypoint
                      (both snake_case agent wire + camelCase UI keys, per-field
                      caps, content-length body-size guard answered pre-read)
  privacy-redactor.ts sensitive-window exclusions + secret redaction + content hash
  ingest.ts           shared enrichment gate (privacy -> OCR -> hash -> ledger)
                      so UI, MCP, and the desktop agent can never bypass privacy
  vision-ocr.ts       screenshot assets + multimodal OCR (+ offline fallback)
  action-verifier.ts  fix-verification classification + verified health breakdown
  pipeline.ts         zero-save capture orchestration (route -> analyze -> save -> graph)
  router.ts           project auto-detection scoring (+ forced-project override)
  compressor.ts       Tier-1 rolling memory / work-session daemon
  dedup.ts            exact-duplicate folding inside a project-scoped window
  embeddings.ts       brain-hash-v1 deterministic offline embeddings (sidecar table)

src/app/api/          health, projects (+[id]), capture, agent/capture (token auth),
                      items/[id] (PATCH: edit + fix lifecycle + revisions + 409),
                      decisions, timeline, search, context, triage, resolve,
                      metrics, feature-flags, feedback, daemon, self-test, llm-backend
scripts/
  mcp_server.mjs      JSON-RPC 2.0 stdio MCP server (6 tools)
  desktop_agent.py    stdlib-only desktop agent (clipboard/snip/screenshot/watch)
  verify-*.mjs        the 9 regression suites (npm run test:regression)
mini-services/
  realtime-service    optional socket.io relay (chat presence/typing/peer notes);
                      the app degrades silently without it
```

Full endpoint contracts: [`docs/API_CONTRACTS.md`](docs/API_CONTRACTS.md). Ops runbook: [`docs/OPERATIONS.md`](docs/OPERATIONS.md). Deployment (Docker standalone + Caddy): [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Desktop agent & MCP

```bash
# agent (against a running workspace)
python scripts/desktop_agent.py --check          # handshake
python scripts/desktop_agent.py --clipboard      # watch clipboard
python scripts/desktop_agent.py --screenshot     # one-shot snip -> OCR

# MCP (stdio; point any MCP client at it)
BRAIN_API_URL=http://localhost:3000 node scripts/mcp_server.mjs
```

## Vault layout

```
ProjectBrainVault/
  Projects/<slug>/
    notes/       stamp_slug_shortid.md     (short id -> same-second collisions impossible)
    captures/    terminal|screenshot|clip notes
    assets/      screenshot binaries (OCR'd)
    _project_summary.md                    (rolling summary mirror)
  Inbox/                                   (low-confidence captures awaiting triage)
```

Every item carries durable `vaultSyncStatus` (`pending | synced | failed`) — a capture never presents itself as fully saved while its `.md` is pending, rows stuck in pending are reconciled against the filesystem once per boot, and failures surface as visible chips in the Vault view.

## Search — honest maturity note

Text search is Prisma `contains` + custom scoring; semantic search is deterministic hashed features (`brain-hash-v1`) — a deliberate offline-first baseline, **not** SQLite FTS5/BM25 and **not** a neural embedding model. FTS5, chunked documents, and a true embeddings provider behind a feature flag are roadmap items.

## Notes

- Auth: in-house credential accounts (scrypt + HMAC-SHA256 JWT in an httpOnly cookie) with RBAC; API access can be enforced or opened per deployment; desktop agents use a dedicated ingest token.
- Realtime chat uses the platform gateway contract (`/?XTransformPort=` routing in the sandbox Caddyfile); outside that sandbox, deploy a fixed-upstream reverse proxy (see `docs/DEPLOYMENT.md`).
- `.env` is git-ignored; `.env.example` documents every variable the engine reads.
