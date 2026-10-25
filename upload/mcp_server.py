"""
mcp_server.py - Model Context Protocol (MCP) Server for Project Brain OS
Zero external dependencies (JSON-RPC 2.0 over stdio).
Connects Cursor, Claude Code, Windsurf, or custom AI agents directly to your SQLite + Vault Brain.

Exposed MCP Tools:
  1. list_projects          - Lists all registered projects and their IDs/keywords
  2. get_project_context    - Returns the 3-Tier Context Injection payload (<2,500 tokens)
  3. search_project_brain   - Searches notes, screenshots, and terminal fixes via FTS5 BM25
  4. zero_save_capture      - Saves new findings, bugs, or notes with automatic project routing
  5. log_decision           - Records an architectural decision so future AI sessions never revert it
"""

import sys
import json
from typing import Dict, Any
from sqlite_store import BrainStore
from project_router import ProjectAndModelRouter
from capture_pipeline import ZeroSaveCapturePipeline

store = BrainStore("./ProjectBrainVault")
router = ProjectAndModelRouter(store)
pipeline = ZeroSaveCapturePipeline(store, router)


MCP_TOOLS = [
    {
        "name": "list_projects",
        "description": "List all projects in Project Brain OS along with their IDs, root paths, and rolling summaries.",
        "inputSchema": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "get_project_context",
        "description": "Fetch the compact 3-Tier Context Payload (Rolling Summary + Active Decisions + Relevant Vault Evidence) to prevent context drift and hallucination.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "project_id": {"type": "string", "description": "Project ID (or slug/name)"},
                "active_query": {"type": "string", "description": "Optional current task or bug keyword"}
            },
            "required": ["project_id"]
        }
    },
    {
        "name": "search_project_brain",
        "description": "Search across all captured screenshots, terminal logs, and markdown notes in the vault.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Natural language or keyword query"},
                "project_id": {"type": "string", "description": "Optional project_id filter"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "zero_save_capture",
        "description": "Capture a bug fix, terminal log, or note into Project Brain OS with automatic project routing and graph linking.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "raw_content": {"type": "string", "description": "Content to capture"},
                "item_type": {"type": "string", "description": "note, terminal, screenshot, or clip"},
                "window_title": {"type": "string", "description": "Optional window or file context"}
            },
            "required": ["raw_content"]
        }
    },
    {
        "name": "log_decision",
        "description": "Record an architectural decision (Decision + Alternatives + Reasoning) in the project's Decision Graph.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "project_id": {"type": "string"},
                "title": {"type": "string"},
                "decision": {"type": "string"},
                "reasoning": {"type": "string"},
                "alternatives": {"type": "array", "items": {"type": "string"}}
            },
            "required": ["project_id", "title", "decision", "reasoning"]
        }
    }
]


def resolve_project_id(identifier: str) -> str:
    """Allows callers to pass either proj_xxx, slug, or project name."""
    projects = store.get_all_projects()
    for p in projects:
        if identifier in (p["id"], p["slug"], p["name"]) or identifier.lower() == p["name"].lower():
            return p["id"]
    return projects[0]["id"] if projects else identifier


def handle_tool_call(name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
    if name == "list_projects":
        return {"projects": store.get_all_projects()}

    if name == "get_project_context":
        pid = resolve_project_id(arguments.get("project_id", ""))
        query = arguments.get("active_query", "")
        return store.build_context_injection_payload(pid, active_query=query)

    if name == "search_project_brain":
        pid = arguments.get("project_id")
        if pid:
            pid = resolve_project_id(pid)
        return {"results": store.search_vault(arguments.get("query", ""), project_id=pid)}

    if name == "zero_save_capture":
        return pipeline.capture(
            raw_content=arguments.get("raw_content", ""),
            item_type=arguments.get("item_type", "note"),
            window_title=arguments.get("window_title", "MCP Agent"),
            source_app="MCP-Client"
        )

    if name == "log_decision":
        pid = resolve_project_id(arguments["project_id"])
        return store.log_decision(
            project_id=pid,
            title=arguments["title"],
            decision=arguments["decision"],
            reasoning=arguments["reasoning"],
            alternatives=arguments.get("alternatives", [])
        )

    raise ValueError(f"Unknown MCP tool: {name}")


def main():
    """Standard JSON-RPC 2.0 loop over stdin/stdout for MCP clients."""
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
            method = req.get("method")
            req_id = req.get("id")

            if method == "initialize":
                resp = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "protocolVersion": "2024-11-05",
                        "capabilities": {"tools": {}},
                        "serverInfo": {"name": "project-brain-os-mcp", "version": "1.0.0"}
                    }
                }
            elif method == "tools/list":
                resp = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {"tools": MCP_TOOLS}
                }
            elif method == "tools/call":
                params = req.get("params", {})
                tool_output = handle_tool_call(params.get("name", ""), params.get("arguments", {}))
                resp = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "content": [{"type": "text", "text": json.dumps(tool_output, indent=2)}]
                    }
                }
            else:
                continue

            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()
        except Exception as exc:
            err_resp = {
                "jsonrpc": "2.0",
                "id": None,
                "error": {"code": -32000, "message": str(exc)}
            }
            sys.stdout.write(json.dumps(err_resp) + "\n")
            sys.stdout.flush()


if __name__ == "__main__":
    if "--test" in sys.argv:
        print("🧪 Running MCP Server Self-Test...")
        print(json.dumps(handle_tool_call("list_projects", {}), indent=2))
    else:
        main()
