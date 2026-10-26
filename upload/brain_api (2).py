"""
brain_api.py - Unified Local HTTP Server & Workspace Host for Project Brain OS (v2)
Zero external dependencies (uses Python standard library http.server, json, urllib, pathlib).
Now integrates:
- HybridLLMBridge (llm_bridge.py) for local Ollama / Cloud API / Offline fallback + Prompt Pre-Structuring
- MemoryCompressor (memory_compressor.py) for rolling memory compression, Work Replay, and Two-Way Obsidian Disk Sync
- GuidedTestHarness (test_harness.py) for 8-scenario automated chaos diagnostics via `/self-test`
"""

import json
from pathlib import Path
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

from sqlite_store import BrainStore
from project_router import ProjectAndModelRouter
from capture_pipeline import ZeroSaveCapturePipeline
from llm_bridge import HybridLLMBridge
from memory_compressor import MemoryCompressor
from test_harness import GuidedTestHarness

store = BrainStore("./ProjectBrainVault")
router = ProjectAndModelRouter(store)
llm_bridge = HybridLLMBridge()
pipeline = ZeroSaveCapturePipeline(store, router, llm_callback=llm_bridge.analyze_capture_callback)
compressor = MemoryCompressor(store, llm_bridge)


def ensure_seed_data() -> None:
    """Seeds initial projects and sample captures if the vault is brand new so the UI works in 5 seconds."""
    existing = store.get_all_projects()
    if existing:
        return

    p1 = store.upsert_project(
        name="Three Musketeers",
        root_path="C:/dev/three-musketeers",
        keywords=["three-musketeers", "gateway.mjs", "render", "deployment", "dotenv"],
        git_remotes=["github.com/shaan/three-musketeers"],
        rolling_summary="Multi-agent gateway service deployed on Render. Uses pnpm workspaces and gateway.mjs entrypoint."
    )
    p2 = store.upsert_project(
        name="Tier-1 Control Plane",
        root_path="C:/dev/tier1-control-plane",
        keywords=["tier-1", "control-plane", "browser-repair", "playwright", "mcp"],
        git_remotes=["github.com/shaan/tier1-control-plane"],
        rolling_summary="Dependency-light Python control plane for browser-repair workflows, automated model routing, and MCP tools."
    )
    p3 = store.upsert_project(
        name="Project Brain OS",
        root_path="C:/dev/project-brain-os",
        keywords=["project-brain", "sqlite_store.py", "brain_api.py", "obsidian", "notebooklm", "zero-save"],
        git_remotes=["github.com/shaan/project-brain-os"],
        rolling_summary="Universal Knowledge Capture, Project Memory, Decision Graph, and Context Injection OS."
    )

    pipeline.capture(
        raw_content="Error: Cannot find module 'dotenv'\n    at Function.Module._resolveFilename (gateway.mjs:14:2)",
        item_type="screenshot",
        window_title="Terminal - node gateway.mjs",
        source_app="Windows Terminal",
        visual_hint="Red terminal deployment error logs from Render showing missing dotenv module in gateway.mjs"
    )
    pipeline.capture(
        raw_content=(
            "Decision: Use SQLite + FTS5 instead of standalone Neo4j server\n"
            "Alternatives: Neo4j Desktop, Docker Postgres\n"
            "Reason: Keeps Project Brain OS dependency-light and portable with zero external DB daemons."
        ),
        item_type="note",
        window_title="architecture.md - Project Brain OS",
        active_file_path="C:/dev/project-brain-os/docs/architecture.md",
        source_app="Workspace Editor"
    )

    # Run initial memory compression on seeded projects
    for p in (p1, p2, p3):
        compressor.compress_project_memory(p["id"])


def get_project_details(project_id: str) -> dict:
    """Fetches items, decisions, graph edges, and live health score for a project."""
    # First sync any manual edits made on disk in Obsidian/VS Code
    compressor.sync_markdown_edits_from_disk()

    project = store.get_project_by_id(project_id)
    if not project:
        return {"error": "Project not found"}

    with store._get_conn() as conn:
        items = [
            dict(r) for r in conn.execute(
                "SELECT * FROM items WHERE project_id = ? ORDER BY captured_at DESC LIMIT 50",
                (project_id,)
            ).fetchall()
        ]
        for it in items:
            it["metadata"] = json.loads(it.get("metadata") or "{}")

        decisions = [
            dict(r) for r in conn.execute(
                "SELECT * FROM decisions WHERE project_id = ? ORDER BY decided_at DESC LIMIT 30",
                (project_id,)
            ).fetchall()
        ]
        for d in decisions:
            d["alternatives"] = json.loads(d.get("alternatives") or "[]")

    edges = store.get_project_graph(project_id)

    return {
        "project": project,
        "health_score": project.get("health_score", 85),
        "llm_backend": llm_bridge.detect_active_backend(),
        "items": items,
        "decisions": decisions,
        "graph_edges": edges
    }


def run_self_diagnostics() -> dict:
    """Runs the full 8-scenario GuidedTestHarness in an isolated sandbox and returns results for the UI."""
    harness = GuidedTestHarness()
    report = harness.run_all_scenarios(cleanup=True)
    checks = []
    for r in report["results"]:
        checks.append({
            "name": r["scenario"],
            "status": r["status"],
            "detail": r["explanation"] if r["passed"] else f"{r['explanation']} | Fix: {r['inspect_hint']}"
        })
    return {"ok": report["all_passed"], "checks": checks}


class BrainRequestHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"[BrainAPI] {self.address_string()} - {format % args}")

    def _send_json(self, data: dict, status: int = 200):
        body = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_html(self, html_text: str, status: int = 200):
        body = html_text.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send_json({"ok": True})

    def do_GET(self):
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)

        if parsed.path in ("/", "/index.html", "/workspace.html"):
            ui_file = Path(__file__).parent / "workspace.html"
            if ui_file.exists():
                return self._send_html(ui_file.read_text(encoding="utf-8"))
            return self._send_html("<h1>workspace.html not found in current directory.</h1>", status=404)

        if parsed.path == "/health":
            return self._send_json({
                "status": "online",
                "engine": "Project Brain OS v2 (Hybrid LLM + Memory Compressor)",
                "llm_backend": llm_bridge.detect_active_backend()
            })

        if parsed.path == "/projects":
            return self._send_json({"projects": store.get_all_projects()})

        if parsed.path == "/project-details":
            project_id = params.get("project_id", [""])[0]
            return self._send_json(get_project_details(project_id))

        if parsed.path == "/timeline":
            date_prefix = params.get("date", [None])[0]
            return self._send_json({"timeline": store.get_universal_timeline(date_prefix=date_prefix, limit=50)})

        if parsed.path == "/search":
            q = params.get("q", [""])[0]
            project_id = params.get("project_id", [None])[0]
            return self._send_json({"results": store.search_vault(q, project_id=project_id, limit=20)})

        if parsed.path == "/cross-project":
            q = params.get("q", [""])[0]
            exclude_id = params.get("exclude_project_id", [None])[0]
            return self._send_json({"solutions": compressor.find_cross_project_solutions(q, exclude_project_id=exclude_id)})

        if parsed.path == "/context":
            project_id = params.get("project_id", [""])[0]
            query = params.get("q", [""])[0]
            raw_goal = params.get("goal", [""])[0]

            # Compress project memory on-the-fly so Tier 1 is always fresh and token-bounded
            if project_id:
                compressor.compress_project_memory(project_id)

            payload = store.build_context_injection_payload(project_id, active_query=query)
            rewritten = llm_bridge.rewrite_raw_prompt(
                raw_user_prompt=raw_goal or query or "Continue development on current project tasks.",
                context_payload=payload
            )
            payload["structured_prompt_markdown"] = rewritten["structured_prompt_markdown"]
            payload["token_estimate"] = rewritten["estimated_tokens"]
            payload["token_budget_status"] = rewritten["token_budget_status"]
            return self._send_json(payload)

        if parsed.path == "/self-test":
            return self._send_json(run_self_diagnostics())

        self._send_json({"error": "Not found"}, status=404)

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        payload = json.loads(raw_body)

        if self.path == "/capture":
            result = pipeline.capture(
                raw_content=payload.get("raw_content", ""),
                item_type=payload.get("item_type", "note"),
                window_title=payload.get("window_title", ""),
                active_file_path=payload.get("active_file_path", ""),
                source_app=payload.get("source_app", "Workspace UI"),
                source_url=payload.get("source_url", ""),
                asset_path=payload.get("asset_path", ""),
                visual_hint=payload.get("visual_hint", "")
            )
            # Automatically re-compress project memory when new item is captured
            matched_pid = result["project_match"].get("project_id")
            if matched_pid:
                result["memory_compression"] = compressor.compress_project_memory(matched_pid)
            return self._send_json(result)

        if self.path == "/compress":
            project_id = payload.get("project_id", "")
            return self._send_json(compressor.compress_project_memory(project_id))

        if self.path == "/sync-disk":
            return self._send_json(compressor.sync_markdown_edits_from_disk())

        if self.path == "/projects":
            proj = store.upsert_project(
                name=payload["name"],
                root_path=payload.get("root_path", ""),
                keywords=payload.get("keywords", []),
                git_remotes=payload.get("git_remotes", []),
                rolling_summary=payload.get("rolling_summary", "")
            )
            return self._send_json(proj)

        if self.path == "/decisions":
            dec = store.log_decision(
                project_id=payload["project_id"],
                title=payload["title"],
                decision=payload["decision"],
                reasoning=payload["reasoning"],
                alternatives=payload.get("alternatives", []),
                outcome=payload.get("outcome", "Active")
            )
            compressor.compress_project_memory(payload["project_id"])
            return self._send_json(dec)

        self._send_json({"error": "Unknown endpoint"}, status=404)


def run_server(host: str = "127.0.0.1", port: int = 8765):
    ensure_seed_data()
    server = HTTPServer((host, port), BrainRequestHandler)
    backend = llm_bridge.detect_active_backend()
    print("=" * 76)
    print(f"🧠 PROJECT BRAIN OS v2 LIVE AT: http://{host}:{port}")
    print(f"🤖 Active AI Backend: {backend['provider']} ({backend['model']} - {backend['mode']})")
    print("=" * 76)
    print("   • Open http://127.0.0.1:8765 in your browser for the Full AI Workspace")
    print("   • Run `python test_harness.py` anytime for the 8-Scenario Chaos Scorecard")
    print("   • POST /capture    (Zero-Save Capture + Auto-Project + Memory Compression)")
    print("   • GET  /context    (3-Tier Context Injection + Anti-Drift Prompt Rewriter)")
    print("   • POST /compress   (Force Memory Compression & Work Replay Generation)")
    print("   • GET  /self-test  (Runs 8-Scenario Sandbox Diagnostics from Browser)")
    print("=" * 76)
    server.serve_forever()


if __name__ == "__main__":
    run_server()
