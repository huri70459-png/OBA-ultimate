"""
brain_api.py — Project Brain OS v2.1 local workspace API.

Requires the existing sibling modules:
sqlite_store.py, project_router.py, capture_pipeline.py, llm_bridge.py,
memory_compressor.py, test_harness.py.

Local-first only. The standard-library HTTP server is for local development,
not production or exposure to untrusted networks.
"""
import json
import os
import re
import shutil
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

from sqlite_store import BrainStore
from project_router import ProjectAndModelRouter
from capture_pipeline import ZeroSaveCapturePipeline
from llm_bridge import HybridLLMBridge
from memory_compressor import MemoryCompressor
from test_harness import GuidedTestHarness

store = BrainStore(os.environ.get("BRAIN_VAULT", "./ProjectBrainVault"))
router = ProjectAndModelRouter(store)
llm_bridge = HybridLLMBridge()
pipeline = ZeroSaveCapturePipeline(store, router, llm_callback=llm_bridge.analyze_capture_callback)
compressor = MemoryCompressor(store, llm_bridge)
MAX_BODY_BYTES = 1_000_000


def _json_metadata(raw):
    try:
        value = json.loads(raw or "{}")
        return value if isinstance(value, dict) else {}
    except (TypeError, ValueError):
        return {}


def _get_item(item_id):
    with store._get_conn() as conn:
        row = conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
    if not row:
        return None
    item = dict(row)
    item["metadata"] = _json_metadata(item.get("metadata"))
    return item


def get_project_details(project_id):
    compressor.sync_markdown_edits_from_disk()
    project = store.get_project_by_id(project_id)
    if not project:
        return {"error": "Project not found"}
    with store._get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM items WHERE project_id = ? ORDER BY captured_at DESC LIMIT 80",
            (project_id,)
        ).fetchall()
        decisions = conn.execute(
            "SELECT * FROM decisions WHERE project_id = ? ORDER BY decided_at DESC LIMIT 40",
            (project_id,)
        ).fetchall()
    items = [dict(r) for r in rows]
    for item in items:
        item["metadata"] = _json_metadata(item.get("metadata"))
    decisions = [dict(r) for r in decisions]
    for decision in decisions:
        try:
            decision["alternatives"] = json.loads(decision.get("alternatives") or "[]")
        except ValueError:
            decision["alternatives"] = []
    return {
        "project": project,
        "health_score": project.get("health_score", 85),
        "llm_backend": llm_bridge.detect_active_backend(),
        "items": items,
        "decisions": decisions,
        "graph_edges": store.get_project_graph(project_id)
    }


def list_inbox(limit=80):
    with store._get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM items WHERE project_id IS NULL ORDER BY captured_at DESC LIMIT ?",
            (max(1, min(int(limit), 200)),)
        ).fetchall()
    items = [dict(r) for r in rows]
    for item in items:
        item["metadata"] = _json_metadata(item.get("metadata"))
        item["triage_status"] = item["metadata"].get("triage_status", "open")
    return items


def triage_item(item_id, project_id):
    item = _get_item(item_id)
    project = store.get_project_by_id(project_id)
    if not item or not project:
        return {"error": "Item or project not found"}
    dest_folder = store.projects_dir / project["slug"] / (
        "captures" if item["item_type"] in ("screenshot", "clip", "terminal") else "notes"
    )
    dest_folder.mkdir(parents=True, exist_ok=True)
    old_path = Path(item["file_path"]) if item.get("file_path") else None
    new_path = old_path
    if old_path and old_path.exists():
        candidate = dest_folder / old_path.name
        if candidate.resolve() != old_path.resolve():
            if candidate.exists():
                candidate = dest_folder / f"{item_id}_{old_path.name}"
            shutil.move(str(old_path), str(candidate))
            new_path = candidate
    metadata = item["metadata"]
    metadata["triage_status"] = "triaged"
    metadata["triaged_at"] = __import__("datetime").datetime.utcnow().isoformat()
    with store._get_conn() as conn:
        conn.execute(
            "UPDATE items SET project_id = ?, file_path = ?, metadata = ? WHERE id = ?",
            (project_id, str(new_path) if new_path else item.get("file_path"),
             json.dumps(metadata, ensure_ascii=False), item_id)
        )
        conn.execute("UPDATE projects SET updated_at = ? WHERE id = ?",
                     (__import__("datetime").datetime.utcnow().isoformat(), project_id))
    return {"ok": True, "item_id": item_id, "project_id": project_id, "project_name": project["name"]}


def resolve_item(item_id, resolution):
    item = _get_item(item_id)
    if not item:
        return {"error": "Item not found"}
    metadata = item["metadata"]
    metadata.update({
        "triage_status": "resolved",
        "resolution": resolution.strip(),
        "resolved_at": __import__("datetime").datetime.utcnow().isoformat()
    })
    with store._get_conn() as conn:
        conn.execute("UPDATE items SET metadata = ? WHERE id = ?",
                     (json.dumps(metadata, ensure_ascii=False), item_id))
    return {"ok": True, "item_id": item_id, "triage_status": "resolved"}


def grounded_answer(project_id, query, mode="ask"):
    if not query.strip():
        return {"error": "A non-empty query is required", "sources": []}
    hits = store.search_vault(query, project_id=project_id or None, limit=8)
    sources = [{
        "id": h["id"], "title": h["title"], "project_id": h.get("project_id"),
        "captured_at": h.get("captured_at"),
        "excerpt": (h.get("structured_summary") or h.get("raw_content") or "")[:700]
    } for h in hits]
    if not sources:
        return {
            "answer": "I couldn't find supporting project evidence in the local vault. Capture or add relevant notes first.",
            "sources": [], "grounded": False
        }
    project = store.get_project_by_id(project_id) if project_id else None
    evidence = "\n\n".join(
        f"[{i+1}] {s['title']} ({s['captured_at']})\n{s['excerpt']}"
        for i, s in enumerate(sources)
    )
    instruction = (
        "Synthesize a concise project wiki note from only the evidence. "
        "Mark uncertainty and do not invent facts."
        if mode == "synthesize" else
        "Answer using only the supplied evidence. If it is insufficient, say so. "
        "Cite evidence inline with [1], [2], etc."
    )
    generated = llm_bridge.complete_text(
        system_prompt=instruction,
        user_prompt=f"Project: {project['name'] if project else 'All projects'}\nQuestion/task: {query}\n\nEvidence:\n{evidence}",
        max_tokens=700
    )
    if not generated:
        generated = (
            "Offline mode: no live LLM response is available. These are the closest indexed "
            "evidence excerpts; use the source list below to inspect them."
        )
    return {"answer": generated, "sources": sources, "grounded": True, "mode": mode}


def run_self_diagnostics():
    report = GuidedTestHarness().run_all_scenarios(cleanup=True)
    return {
        "ok": report.get("all_passed", False),
        "checks": [{
            "name": r.get("scenario"), "status": r.get("status"),
            "detail": r.get("explanation") if r.get("passed") else
                      f"{r.get('explanation')} | Fix: {r.get('inspect_hint')}"
        } for r in report.get("results", [])]
    }


class BrainRequestHandler(BaseHTTPRequestHandler):
    server_version = "ProjectBrainLocal/2.1"

    def log_message(self, fmt, *args):
        # Keep logs simple; do not echo arbitrary request content.
        print(f"[BrainAPI] {self.client_address[0]} {self.command} {self.path.split('?')[0]}")

    def _send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False, default=str).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_html(self, text, status=200):
        body = text.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            raise ValueError("Invalid Content-Length")
        if length < 0 or length > MAX_BODY_BYTES:
            raise ValueError("Request body exceeds 1 MB limit")
        raw = self.rfile.read(length) if length else b"{}"
        value = json.loads(raw.decode("utf-8"))
        if not isinstance(value, dict):
            raise ValueError("JSON body must be an object")
        return value

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Allow", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)
        path = parsed.path
        if path in ("/", "/index.html", "/workspace.html"):
            file = Path(__file__).with_name("workspace.html")
            return self._send_html(file.read_text(encoding="utf-8")) if file.exists() else self._send_html("workspace.html missing", 404)
        if path == "/health":
            return self._send_json({"status": "online", "version": "2.1", "llm_backend": llm_bridge.detect_active_backend()})
        if path == "/projects":
            return self._send_json({"projects": store.get_all_projects()})
        if path == "/project-details":
            return self._send_json(get_project_details(params.get("project_id", [""])[0]))
        if path == "/inbox":
            return self._send_json({"items": list_inbox(params.get("limit", [80])[0])})
        if path == "/timeline":
            return self._send_json({"timeline": store.get_universal_timeline(params.get("date", [None])[0], limit=80)})
        if path == "/search":
            return self._send_json({"results": store.search_vault(params.get("q", [""])[0], params.get("project_id", [None])[0], 25)})
        if path == "/cross-project":
            return self._send_json({"solutions": compressor.find_cross_project_solutions(
                params.get("q", [""])[0], params.get("exclude_project_id", [None])[0])})
        if path == "/context":
            pid = params.get("project_id", [""])[0]
            query = params.get("q", [""])[0]
            if pid:
                compressor.compress_project_memory(pid)
            payload = store.build_context_injection_payload(pid, active_query=query)
            rewritten = llm_bridge.rewrite_raw_prompt(
                raw_user_prompt=params.get("goal", [query or "Continue development"])[0],
                context_payload=payload
            ) if not payload.get("error") else {}
            payload.update({
                "structured_prompt_markdown": rewritten.get("structured_prompt_markdown", ""),
                "token_estimate": rewritten.get("estimated_tokens"),
                "token_budget_status": rewritten.get("token_budget_status")
            })
            return self._send_json(payload)
        if path == "/self-test":
            return self._send_json(run_self_diagnostics())
        return self._send_json({"error": "Not found"}, 404)

    def do_POST(self):
        try:
            payload = self._read_json()
        except (ValueError, UnicodeDecodeError, json.JSONDecodeError) as exc:
            return self._send_json({"error": str(exc)}, 400)
        path = urlparse(self.path).path
        try:
            if path == "/capture":
                raw = str(payload.get("raw_content", "")).strip()
                if not raw:
                    return self._send_json({"error": "raw_content is required"}, 400)
                kind = str(payload.get("item_type", "note"))[:40]
                match = router.detect_project(
                    raw_content=raw, window_title=str(payload.get("window_title", "")),
                    active_file_path=str(payload.get("active_file_path", "")),
                    source_url=str(payload.get("source_url", ""))
                )
                duplicate = compressor.find_recent_duplicate(
                    raw_content=raw, item_type=kind, project_id=match.get("project_id")
                )
                if duplicate:
                    updated = compressor.record_duplicate_occurrence(duplicate["id"])
                    return self._send_json({
                        "status": "duplicate_merged", "item": updated,
                        "project_match": match,
                        "toast_notification": f"Duplicate folded into existing capture ({updated.get('metadata', {}).get('occurrence_count', 1)} occurrences)"
                    })
                result = pipeline.capture(
                    raw_content=raw, item_type=kind,
                    window_title=str(payload.get("window_title", "")),
                    active_file_path=str(payload.get("active_file_path", "")),
                    source_app=str(payload.get("source_app", "Workspace UI")),
                    source_url=str(payload.get("source_url", "")),
                    asset_path=str(payload.get("asset_path", "")),
                    visual_hint=str(payload.get("visual_hint", ""))
                )
                pid = result.get("project_match", {}).get("project_id")
                if pid:
                    result["memory_compression"] = compressor.compress_project_memory(pid)
                return self._send_json(result)
            if path == "/triage":
                result = triage_item(str(payload.get("item_id", "")), str(payload.get("project_id", "")))
                return self._send_json(result, 200 if result.get("ok") else 404)
            if path == "/resolve":
                result = resolve_item(str(payload.get("item_id", "")), str(payload.get("resolution", "")))
                return self._send_json(result, 200 if result.get("ok") else 404)
            if path in ("/ask", "/synthesize"):
                result = grounded_answer(
                    str(payload.get("project_id", "")),
                    str(payload.get("query", "")),
                    "synthesize" if path == "/synthesize" else "ask"
                )
                return self._send_json(result, 400 if result.get("error") else 200)
            if path == "/compress":
                return self._send_json(compressor.compress_project_memory(str(payload.get("project_id", ""))))
            if path == "/sync-disk":
                return self._send_json(compressor.sync_markdown_edits_from_disk())
            if path == "/projects":
                return self._send_json(store.upsert_project(
                    name=str(payload["name"]), root_path=str(payload.get("root_path", "")),
                    keywords=payload.get("keywords", []), git_remotes=payload.get("git_remotes", []),
                    rolling_summary=str(payload.get("rolling_summary", ""))
                ))
            if path == "/decisions":
                pid = str(payload["project_id"])
                decision = store.log_decision(
                    project_id=pid, title=str(payload["title"]), decision=str(payload["decision"]),
                    reasoning=str(payload["reasoning"]), alternatives=payload.get("alternatives", []),
                    outcome=str(payload.get("outcome", "Active"))
                )
                compressor.compress_project_memory(pid)
                return self._send_json(decision)
            return self._send_json({"error": "Unknown endpoint"}, 404)
        except (KeyError, TypeError, ValueError) as exc:
            return self._send_json({"error": f"Invalid request: {exc}"}, 400)
        except Exception as exc:
            # Avoid leaking stack traces or local filesystem details to the UI.
            print(f"[BrainAPI] Request failed: {type(exc).__name__}")
            return self._send_json({"error": "Request failed; see local server log"}, 500)


def run_server(host="127.0.0.1", port=8765):
    if host not in ("127.0.0.1", "localhost", "::1"):
        raise ValueError("v2.1 is local-only; bind to loopback (127.0.0.1)")
    server = ThreadingHTTPServer((host, port), BrainRequestHandler)
    print(f"Project Brain OS v2.1: http://{host}:{port} (local-only)")
    print("Endpoints: /inbox /triage /resolve /ask /synthesize /capture /project-details /self-test")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    run_server()
