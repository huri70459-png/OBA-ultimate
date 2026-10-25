# Project Brain OS v2.1 — Part A

This bundle replaces `workspace.html`, `brain_api.py`, and `memory_compressor.py`.
It targets the existing sibling modules from the earlier Project Brain OS bundle:
`sqlite_store.py`, `project_router.py`, `capture_pipeline.py`, `llm_bridge.py`,
and `test_harness.py`. It does not replace or migrate the SQLite schema.

## What changed
- Exact, project-scoped duplicate capture folding within a 36-hour window.
- Occurrence counts and last-seen metadata, without deleting existing captures.
- Rebuilt project summary and work replay files; replay groups events into 45-minute
  work sessions and folds repeated captures.
- Inbox triage to a project, file move to the project's notes/captures folder, and
  resolution status with optional notes.
- Workspace timeline/search, project editor with escaped Markdown preview, grounded
  ask/wiki synthesis with source excerpts, cross-project fix lookup, and decision logging.
- Local-only bind default, request body limit, JSON validation, no wildcard CORS.
- No new Python package dependencies.

## Install
1. Back up your project folder and vault.
2. Copy the three replacement files into the same folder as the existing sibling modules.
3. Start with `python brain_api.py`.
4. Open `http://127.0.0.1:8765`.
5. For an offline smoke check, run `python -m py_compile brain_api.py memory_compressor.py`.
   The existing GuidedTestHarness remains available at `/self-test` from the UI/server.

## API additions
- `GET /inbox`
- `POST /triage` `{ "item_id": "...", "project_id": "..." }`
- `POST /resolve` `{ "item_id": "...", "resolution": "..." }`
- `POST /ask` or `/synthesize` `{ "project_id": "...", "query": "..." }`

## Notes / limitations
- Deduplication merges only exact normalized content plus item type, within the same
  project/inbox and time window. It deliberately avoids fuzzy merges.
- Asking/synthesis is evidence-grounded. If no LLM backend is configured, the UI shows
  retrieved excerpts rather than pretending a generated answer exists.
- Existing `sqlite_store.py` schema is retained for backward compatibility; item state
  and occurrence counts live in the existing JSON `metadata` field.
- The server is intentionally loopback-only. Python's built-in `http.server` family is
  suitable for local development, not production or direct exposure to untrusted networks.
