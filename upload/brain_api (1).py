"""
brain_api.py - Unified Local HTTP Server & Workspace Host for Project Brain OS
Zero external dependencies (uses Python standard library http.server, json, urllib, pathlib).
Serves the full Dark-Mode AI Workspace at http://127.0.0.1:8765/
"""

import json
from pathlib import Path
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from sqlite_store import BrainStore
from project_router import ProjectAndModelRouter
from capture_pipeline import ZeroSaveCapturePipeline

store = BrainStore("./ProjectBrainVault")
router = ProjectAndModelRouter(store)
pipeline = ZeroSaveCapturePipeline(store, router)


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


def get_project_details(project_id: str) -> dict:
    """Fetches items, decisions, and graph edges for a project."""
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

    # Calculate live Knowledge Health Score
    has_summary = bool(project.get("rolling_summary"))
    has_decisions = len(decisions) > 0
    has_items = len(items) > 0
    score = 40 + (20 if has_summary else 0) + (20 if has_decisions else 0) + min(20, len(items) * 5)

    return {
        "project": project,
        "health_score": min(100, score),
        "items": items,
        "decisions": decisions,
        "graph_edges": edges
    }


def run_self_diagnostics() -> dict:
    """Runs an automated end-to-end health check so you never feel lost testing the app."""
    checks = []
    try:
        projs = store.get_all_projects()
        checks.append({"name": "SQLite & Project Registry", "status": "PASS", "detail": f"{len(projs)} projects online"})

        test_cap = pipeline.capture(
            raw_content="Self-Test Check: ModuleNotFoundError: No module named 'pytest' in test_runner.py",
            item_type="terminal",
            window_title="Self-Test Runner - project-brain",
            source_app="DiagnosticEngine"
        )
        fix_found = test_cap["item"]["metadata"].get("fix", "")
        checks.append({
            "name": "Zero-Save Capture & Snip-to-Action",
            "status": "PASS" if fix_found == "pip install pytest" else "WARN",
            "detail": f"Auto-routed to [{test_cap['project_match']['project_name']}] | Extracted Fix: `{fix_found}`"
        })

        hits = store.search_vault("pytest")
        checks.append({
            "name": "FTS5 BM25 Full-Text & Semantic Index",
            "status": "PASS" if len(hits) > 0 else "FAIL",
            "detail": f"Retrieved {len(hits)} matching item(s)"
        })

        target_proj_id = test_cap["project_match"]["project_id"] or projs[0]["id"]
        ctx = store.build_context_injection_payload(target_proj_id, active_query="pytest")
        checks.append({
            "name": "3-Tier Context Injection Engine",
            "status": "PASS" if "tier_1_rolling_memory" in ctx else "FAIL",
            "detail": f"Built compact payload for [{ctx.get('project_name')}]"
        })
        return {"ok": True, "checks": checks}
    except Exception as e:
        checks.append({"name": "Runtime Exception", "status": "FAIL", "detail": str(e)})
        return {"ok": False, "checks": checks}


class BrainRequestHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Keep console output clean
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

        # Serve Workspace UI at root
        if parsed.path in ("/", "/index.html", "/workspace.html"):
            ui_file = Path(__file__).parent / "workspace.html"
            if ui_file.exists():
                return self._send_html(ui_file.read_text(encoding="utf-8"))
            return self._send_html("<h1>workspace.html not found in current directory.</h1>", status=404)

        if parsed.path == "/health":
            return self._send_json({"status": "online", "engine": "Project Brain OS v1"})

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

        if parsed.path == "/context":
            project_id = params.get("project_id", [""])[0]
            query = params.get("q", [""])[0]
            raw_goal = params.get("goal", [""])[0]
            payload = store.build_context_injection_payload(project_id, active_query=query)

            # Build anti-drift structured prompt wrapper
            structured_prompt = (
                f"# ROLE & GROUNDING CONSTRAINTS\n"
                f"You are working on project **{payload.get('project_name', 'Unknown')}**.\n"
                f"Follow the architectural decisions and evidence below strictly. Do NOT hallucinate unapproved libraries or revert past decisions.\n\n"
                f"## TIER 1: COMPRESSED PROJECT MEMORY\n{payload.get('tier_1_rolling_memory', '')}\n\n"
                f"## TIER 2: ACTIVE ARCHITECTURAL DECISIONS (DO NOT VIOLATE)\n"
            )
            for d in payload.get("tier_2_decision_graph", []):
                structured_prompt += f"- **{d['title']}**: {d['decision']} (Reason: {d['reasoning']})\n"

            structured_prompt += "\n## TIER 3: RELEVANT VAULT EVIDENCE & PAST FIXES\n"
            for ev in payload.get("tier_3_recent_and_relevant_evidence", []):
                structured_prompt += f"- [{ev['type'].upper()}] **{ev['title']}**: {ev.get('summary', '')}\n"

            if raw_goal:
                structured_prompt += (
                    f"\n## CURRENT TASK / REWRITTEN EXECUTION SPEC\n"
                    f"**Objective:** {raw_goal}\n"
                    f"**Required Output:** Provide modular, runnable code that respects Tier 1 & Tier 2 constraints and includes a quick verification step.\n"
                )

            payload["structured_prompt_markdown"] = structured_prompt
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
            return self._send_json(result)

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
            return self._send_json(dec)

        self._send_json({"error": "Unknown endpoint"}, status=404)


def run_server(host: str = "127.0.0.1", port: int = 8765):
    ensure_seed_data()
    server = HTTPServer((host, port), BrainRequestHandler)
    print("=" * 72)
    print(f"🧠 PROJECT BRAIN OS LIVE AT: http://{host}:{port}")
    print("=" * 72)
    print("   • Open http://127.0.0.1:8765 in your browser for the Full AI Workspace")
    print("   • POST /capture          (Zero-Save Capture + Auto-Project + Model Router)")
    print("   • GET  /context          (3-Tier Context Injection + Prompt Rewriter)")
    print("   • GET  /self-test        (Automated End-to-End Diagnostic Suite)")
    print("=" * 72)
    server.serve_forever()


if __name__ == "__main__":
    run_server()
