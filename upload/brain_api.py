"""
brain_api.py - Local HTTP Bridge & MCP-Compatible Server for APEX-EDITOR-V1
Zero external dependencies (uses Python's built-in http.server) OR integrates with FastAPI.
Run `python brain_api.py` to start the local Project Brain daemon on http://127.0.0.1:8765
"""

import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from sqlite_store import BrainStore
from project_router import ProjectAndModelRouter
from capture_pipeline import ZeroSaveCapturePipeline

store = BrainStore("./ProjectBrainVault")
router = ProjectAndModelRouter(store)
pipeline = ZeroSaveCapturePipeline(store, router)


class BrainRequestHandler(BaseHTTPRequestHandler):
    def _send_json(self, data: dict, status: int = 200):
        body = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send_json({"ok": True})

    def do_GET(self):
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)

        if parsed.path == "/health":
            return self._send_json({"status": "online", "engine": "Project Brain OS v1"})

        if parsed.path == "/projects":
            return self._send_json({"projects": store.get_all_projects()})

        if parsed.path == "/timeline":
            date_prefix = params.get("date", [None])[0]
            return self._send_json({"timeline": store.get_universal_timeline(date_prefix=date_prefix)})

        if parsed.path == "/search":
            q = params.get("q", [""])[0]
            project_id = params.get("project_id", [None])[0]
            return self._send_json({"results": store.search_vault(q, project_id=project_id)})

        if parsed.path == "/context":
            project_id = params.get("project_id", [""])[0]
            query = params.get("q", [""])[0]
            return self._send_json(store.build_context_injection_payload(project_id, active_query=query))

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
                source_app=payload.get("source_app", "APEX-EDITOR-V1"),
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

        self._send_json({"error": "Unknown endpoint"}, status=404)


def run_server(host: str = "127.0.0.1", port: int = 8765):
    server = HTTPServer((host, port), BrainRequestHandler)
    print(f"🧠 Project Brain OS Local Daemon listening on http://{host}:{port}")
    print("   - POST /capture   (Zero-Save Capture + Auto-Project + Model Router)")
    print("   - GET  /context   (3-Tier Context Injection Payload)")
    print("   - GET  /search    (FTS5 Semantic + Visual Description Search)")
    print("   - GET  /timeline  (Universal Chronological Work Stream)")
    server.serve_forever()


if __name__ == "__main__":
    run_server()
