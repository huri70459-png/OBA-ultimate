# Project Brain OS — API Contracts

> Verified against the actual route handlers (`src/app/api/**/route.ts`) and the
> realtime mini-service. This document is the backend/frontend contract of
> record; the "review delta" column maps it against the externally reviewed
> assumption table so nobody wires a client against a phantom endpoint.

All HTTP endpoints are Next.js App Router handlers under `/api`, authenticated
by the JWT httpOnly session cookie (`brain_session`) when protection is
**enforced** (bootstrap-open mode keeps them credential-free). Mutations add
RBAC checks — `viewer` gets `403`; unauthenticated requests get `401`.
Envelope: JSON bodies; errors are `{ "error": string }` with proper status.

---

## 1. Knowledge & Context

### `GET /api/context` — Tier 1/2/3 context payload

| | |
|---|---|
| Query | `project_id` (accepts raw id, slug, or display name), `q?` (focus query), `goal?` |
| Response | `ContextPayload` — tiers 1/2/3 incl. `graphEdges: GraphEdge[]`, `decisions`, compressed memory |
| Errors | `404` project not found (`{error}`) |
| Consumers | `ContextView`, `GraphView` (edges → client-side `inferGraph`), `DashboardView` |

**Review delta:** the review assumed `POST /api/context { capture }`. The
shipped contract is a read-only **GET**; captures go through `POST /api/capture`.

### `GET /api/search?q=&project_id=` — semantic + keyword hybrid search
### `GET /api/timeline?project_id=` — recent activity feed
### `GET /api/dashboard` — bento counters (avg health, per-project scores, recent events)
### `GET /api/cross-project` — duplicate/related-capture clusters

## 2. Capture & Triage

### `POST /api/capture`

```jsonc
// request (snake_case first — desktop-agent wire parity; camelCase accepted)
{ "raw_content": string, "item_type?": "note|error|file|url", "window_title?": string,
  "active_file_path?": string, "source_app?": string, "source_url?": string,
  "asset_path?": string, "visual_hint?": string, "project_hint?": string }
// response
{ success, item_id, project_match, dedup?: {...}, memory_compression?: {...} }
```

**Review delta:** response carries the full pipeline result (`item_id`,
dedup verdict), not just `{ success, captureId }`.

### `POST /api/triage`

```jsonc
{ "item_id": string, "project_id": string }   // id | slug | display name
// response
{ success, item_id, project_id, ...triageResult }  // routes the inbox item
```

**Review delta:** review assumed `{ captureId, action }` → `{ newTaskId }`.
Triage here assigns an inbox item to a project; there is no action enum.

### `POST /api/resolve`

```jsonc
{ "item_id": string, "resolution": string }   // resolve an inbox item with a note
// response { success, ... }
```

**Review delta:** takes `item_id` + `resolution` text, not `{ captureId }`.

### `GET /api/inbox` — triage queue · `POST /api/sync-disk` — vault sync · `POST /api/compress` — force memory compression · `POST /api/agent/capture` — desktop-agent ingest (token-gated)

## 3. Grounded Q&A (streaming)

### `POST /api/ask/stream` — NDJSON event stream

```jsonc
// request
{ "query": string, "project_id?": string, "mode?": "ask" | "synthesize" }
// response: text/event-stream-style NDJSON, one JSON object per line:
{ "type": "status",  "stage": string, "detail?": string }
{ "type": "sources", "sources": [{ "id", "title", "excerpt", "captured_at" }] }
{ "type": "delta",   "text": string }                    // Ollama/OpenAI token streaming
{ "type": "done",    "answer", "llm_used": boolean, "grounded": boolean }
{ "type": "saved",   "user_message_id", "message_id" }   // both sides persisted
{ "type": "error",   "error": string }
```

**Review delta:** request is `{query, project_id, mode}`, **not**
`{ messages, capture }` — thread context is server-resolved per project; the
honesty contract guarantees evidence-grounded or explicitly badged excerpts.

### `GET /api/chat?project_id=` — persisted thread (newest pruned to 120)
### `DELETE /api/chat?project_id=` — clear thread
### `POST /api/synthesize` — wiki-page synthesis over a topic

**Review delta:** there is no `/api/chat/history` — history IS
`GET /api/chat`, consumed via TanStack Query (`["chat-history", thread]`).

## 4. Graph data flow (review item: `/api/graph/infer`)

**`/api/graph/infer` does not exist — by design.** Edge extraction happens at
capture time (analyzer: `FIXED_BY` / `DECIDED_ON` / `MENTIONED_IN` /
`RELATED_TO`) and ships inside `GET /api/context` as `graphEdges`. Layout
inference is a pure client function (`GraphView.inferGraph`) mapping relations
to node kinds — no network round-trip needed for a re-layout.

## 5. Auth & Ops

| Endpoint | Method | Contract |
|---|---|---|
| `/api/auth/setup` | POST | first-run account bootstrap (open mode only) |
| `/api/auth/login` | POST | `{ email, password }` → JWT httpOnly cookie |
| `/api/auth/logout` | POST | clears session |
| `/api/auth/session` | GET | `{ mode: "open"\|"enforced", authenticated, needs_setup, user }` |
| `/api/auth/refresh` | POST | rolling session renewal |
| `/api/health` | GET | `{ status, version, uptime_seconds, memory_rss_bytes }` |
| `/api/metrics` | POST/GET | telemetry ingest (kill-switched by `ops.telemetry_ingest`) / aggregation |
| `/api/feature-flags` | GET/PUT | registry + owner-only overrides |
| `/api/feedback` | POST/GET | user feedback funnel / owner review feed |
| `/api/client-log` | POST | browser log sink (JSONL, rotated) |
| `/api/self-test` | POST | 8-scenario self test |
| `/api/llm-backend` | GET/PUT | Ollama/OpenAI backend status + config |
| `/api/daemon` | POST | desktop-agent command channel |

## 6. Realtime socket protocol (mini-service `:3003` via gateway)

Client connects with `io('/?XTransformPort=3003')` (Caddy forwards on the
`XTransformPort` query; engine path is the server's catch-all `"/"` — never a
bare `host:port` URL). Rooms are `chat:<threadKey>`; identity is stamped
server-side from the `chat:join` record — clients cannot spoof peers.

| Direction | Event | Payload |
|---|---|---|
| C→S | `chat:join` | `{ room, user: { id, name } }` (id is advisory; server stamps socket ids) |
| C→S | `chat:typing` | `{ room, typing }` (identity from join record) |
| C→S | `chat:note` | `{ room, note: { clientId, content, kind: "question"\|"note" } }` |
| S→C | `chat:presence` | `{ room, peers: [{ id, name }] }` — ids are server socket ids; the client lib subtracts the local socket ("others online") |
| S→C | `chat:typing` | `{ room, user: { id, name }, typing }` |
| S→C | `chat:note` | `{ room, note: { id: "rt-…", clientId, kind, content, author, ts } }` (sender-echo suppressed) |
| C→S | `rt:ping` | ack callback → `{ pong: true, ts }` |

Server-side guards: rooms ≤128 chars, names ≤80, content ≤4000 (truncated),
room-mismatched payloads dropped. Notes are **ephemeral** — persisted history
remains `POST /api/ask/stream` + `GET/DELETE /api/chat`. The service is
optional infrastructure: when it is down, clients degrade silently after ≤4
bounded reconnect attempts and the UI hides live affordances.

## 7. v2.5 — Privacy Guard, Vision OCR, Two-Way Editing, Closed-Loop Fixes, MCP

### `POST /api/capture` (+ `POST /api/agent/capture`) — ingest now runs the privacy layer

```jsonc
// NEW request fields
{ "image_base64?": string,        // data-URL or bare base64 — persisted to
                                  // ProjectBrainVault/**/assets/ + vision OCR
  "forced_project_id?": string }  // id | slug | name — overrides routing (conf 1.0)
// NEW response fields (additive)
{ "content_hash": "16-hex",        // optimistic-concurrency token for PATCH
  "privacy": { "redaction_count": n },
  "ocr?": { "provider": "openai-vision" | "local-asset-store" },
  "capture_job": { "id", "status": "completed", "attempts": n } }
// NEW error: 422 { status: "blocked", reason } — Privacy Guard rejected the
// source window (1Password/Bitwarden/KeePass/LastPass/incognito/inprivate/
// keychain/.env). Secrets (sk-, sk-ant-, AIza…, ghp_…, Bearer …, PEM blocks,
// *_SECRET|PASSWORD|TOKEN|API_KEY= assignments) are scrubbed BEFORE persist.
```

### `PATCH /api/items/[id]` — two-way editing + fix verification (NEW)

```jsonc
// request — any subset
{ "raw_content?": string,   // in-place edit (secret-redacted, revision snapshotted,
                            // vector re-embedded, vault .md rewritten atomically)
  "title?": string,
  "expected_hash?": string, // stale content_hash -> 409
  "fix_status?": "detected" | "suggested" | "attempted" | "verified" | "failed",
  "verification_note?": string }
// responses
200 { status: "updated", item_id, title, content_hash, revision_created,
      vault_sync_status: "synced" | "failed" | "skipped", fix_status?, privacy? }
409 { error: "CONFLICT_DETECTED", message, server_content, server_hash }
404 unknown item · 400 invalid fix_status
// side effects: verified fix -> Action row + VERIFIED_BY graph edge;
//               "failed" reopens the error in health scoring (Gap 1)
```

### Health scoring delta — closed-loop classification

`GET /api/projects/[id]` healthGaps now includes **"Unverified fix
suggestions"** (medium) when ≥3 error fixes sit unverified; Gap 1 counts a fix
as resolved **only when verified**. Metadata keys: `content_hash`,
`privacy_redactions`, `fix_status`, `verification_note`, `verified_at`,
`vault_sync_status`, `ocr_provider`.

### External surfaces (token-auth via `x-brain-token` / `Authorization: Bearer`)

- `scripts/mcp_server.mjs` — spec-compliant JSON-RPC 2.0 **stdio MCP server**
  (initialize / ping / tools/list / tools/call) with 6 tools:
  `list_projects`, `get_project_context`, `search_project_brain`,
  `zero_save_capture`, `log_decision`, `verify_fix_outcome`. Register in
  Cursor / Claude Code / Windsurf with `BRAIN_API_URL` + optional
  `BRAIN_AGENT_TOKEN` env.
- `scripts/desktop_agent.py` — cross-platform agent (`--once` / `--screenshot`
  / `--watch` / `--check`): OS window detection, client-side privacy guard +
  secret redaction (defense in depth — the server re-checks), screen capture
  to base64 for the OCR pipeline, and an offline JSONL spool
  (`~/.project-brain-spool.jsonl`) flushed on next successful send.

**Review delta (v2.5 bundle):** `schema.txt`'s wholesale replacement
(BrainProject/BrainItem renames + snake_case `@map`s, dropping `Setting` /
`UserAccount` / `ChatMessage`) was **rejected** — it would have wiped auth,
settings, chat history and all data on `db push`. Only the three genuinely
new models were merged additively in the repo's naming convention:
`Action`, `CaptureJob`, `ItemRevision`. The bundle's
`PATCH /api/items/[id]` was adapted to the shipped model names, the atomic
vault writer, and the FIXED_BY edge convention.
