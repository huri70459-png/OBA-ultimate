"""
capture_pipeline.py - Zero-Save Universal Capture Pipeline & End-to-End Verification Demo
Handles instant capture -> OCR/Structure -> Auto-Project Detection -> Model Routing -> Graph & Decision Extraction -> Vault Storage.
"""

import re
import json
from typing import Dict, Any, Optional, Callable
from sqlite_store import BrainStore
from project_router import ProjectAndModelRouter


class ZeroSaveCapturePipeline:
    def __init__(
        self,
        store: BrainStore,
        router: ProjectAndModelRouter,
        llm_callback: Optional[Callable[[str, str, str], Dict[str, Any]]] = None
    ):
        """
        :param store: BrainStore instance (SQLite + Vault + FTS5 + Graph)
        :param router: ProjectAndModelRouter instance
        :param llm_callback: Optional custom function(model_name, task_mode, prompt) -> dict
                             Falls back to built-in deterministic heuristic analyzer if None (for offline/zero-key runnability).
        """
        self.store = store
        self.router = router
        self.llm_callback = llm_callback

    def capture(
        self,
        raw_content: str,
        item_type: str = "screenshot",
        window_title: str = "",
        active_file_path: str = "",
        source_app: str = "Desktop",
        source_url: str = "",
        asset_path: str = "",
        visual_hint: str = ""
    ) -> Dict[str, Any]:
        """
        Executes the complete Zero-Save Capture loop with zero manual folders or dialogs.
        """
        # 1. Auto-Detect Project
        proj_match = self.router.detect_project(
            raw_content=raw_content,
            window_title=window_title,
            active_file_path=active_file_path,
            source_url=source_url
        )
        project_id = proj_match["project_id"]

        # 2. Auto-Route to the right AI Model (Codex vs Vision vs Architect)
        model_route = self.router.route_ai_model(
            item_type=item_type,
            raw_content=raw_content,
            has_image=bool(asset_path or item_type == "screenshot")
        )

        # 3. Extract Structured Intelligence (Error fix, Decision, Entities, Summary)
        if self.llm_callback:
            analysis = self.llm_callback(model_route["target_model"], model_route["task_mode"], raw_content)
        else:
            analysis = self._builtin_intelligent_analyzer(raw_content, window_title, visual_hint, model_route["target_model"])

        # 4. Save Item to SQLite + FTS5 + Markdown Vault
        saved_item = self.store.save_item(
            title=analysis["title"],
            raw_content=raw_content,
            item_type=item_type,
            project_id=project_id,
            structured_summary=analysis["summary"],
            visual_description=analysis["visual_description"],
            asset_path=asset_path,
            source_app=source_app,
            source_url=source_url,
            metadata={
                "routed_model": model_route["target_model"],
                "task_mode": model_route["task_mode"],
                "project_confidence": proj_match["confidence"],
                "routing_reasons": proj_match["reasons"],
                **analysis.get("action_metadata", {})
            }
        )

        # 5. Auto-Populate Decision Graph if a decision was detected
        logged_decision = None
        if analysis.get("decision") and project_id:
            dec = analysis["decision"]
            logged_decision = self.store.log_decision(
                project_id=project_id,
                title=dec["title"],
                decision=dec["chosen"],
                reasoning=dec["reasoning"],
                alternatives=dec.get("alternatives", []),
                source_item_id=saved_item["id"]
            )

        # 6. Auto-Populate Knowledge Graph Edges
        for edge in analysis.get("graph_edges", []):
            self.store.add_graph_edge(
                project_id=project_id,
                source_node=edge["source"],
                target_node=edge["target"],
                relation_type=edge["relation"]
            )

        return {
            "status": "captured_zero_save",
            "toast_notification": self._format_hud_toast(saved_item, proj_match, model_route, analysis),
            "item": saved_item,
            "project_match": proj_match,
            "model_route": model_route,
            "decision_logged": logged_decision
        }

    def _builtin_intelligent_analyzer(
        self,
        raw_content: str,
        window_title: str,
        visual_hint: str,
        routed_model: str
    ) -> Dict[str, Any]:
        """
        Deterministic local extractor that works out-of-the-box offline, extracting
        error fixes, architectural decisions, titles, and knowledge graph edges.
        """
        lines = [line.strip() for line in raw_content.splitlines() if line.strip()]
        first_line = re.sub(r"^#+\s*", "", lines[0]) if lines else (window_title or "Quick Capture")
        title = first_line[:65]

        action_metadata: Dict[str, Any] = {}
        graph_edges = []
        decision_data = None

        # Detect missing module / package errors (Snip -> Action)
        mod_match = re.search(r"Cannot find module ['\"]([^'\"]+)['\"]|ModuleNotFoundError: No module named ['\"]([^'\"]+)['\"]", raw_content)
        if mod_match:
            missing_pkg = mod_match.group(1) or mod_match.group(2)
            installer = f"pnpm add {missing_pkg}" if mod_match.group(1) else f"pip install {missing_pkg}"
            title = f"Error: Missing dependency '{missing_pkg}'"
            action_metadata = {
                "error": "ModuleNotFound",
                "rootCause": f"Missing package '{missing_pkg}'",
                "fix": installer
            }
            graph_edges.append({"source": title, "target": installer, "relation": "FIXED_BY"})

        # Detect file mentions for Knowledge Graph
        file_mentions = re.findall(r"\b([a-zA-Z0-9_-]+\.(?:py|ts|tsx|js|mjs|json|md))\b", raw_content + " " + window_title)
        for fm in set(file_mentions):
            graph_edges.append({"source": fm, "target": title, "relation": "MENTIONED_IN"})

        # Detect architectural decision blocks
        if "decision:" in raw_content.lower() or "why we chose" in raw_content.lower():
            dec_title = title
            reason_match = re.search(r"(?:reason|because|why)[:\s]+([^\n.]+)", raw_content, re.IGNORECASE)
            alt_match = re.search(r"(?:alternatives|instead of|over)[:\s]+([^\n.]+)", raw_content, re.IGNORECASE)
            decision_data = {
                "title": dec_title,
                "chosen": first_line,
                "reasoning": reason_match.group(1).strip() if reason_match else "Captured from architectural note",
                "alternatives": [a.strip() for a in alt_match.group(1).split(",")] if alt_match else []
            }

        summary = f"[{routed_model}] " + (
            f"Diagnosed {action_metadata['error']} -> Fix: `{action_metadata['fix']}`"
            if action_metadata.get("fix")
            else " ".join(lines[:2])[:180]
        )

        return {
            "title": title,
            "summary": summary,
            "visual_description": visual_hint or (f"Visual capture from '{window_title}'" if window_title else ""),
            "action_metadata": action_metadata,
            "decision": decision_data,
            "graph_edges": graph_edges
        }

    @staticmethod
    def _format_hud_toast(
        saved_item: Dict[str, Any],
        proj_match: Dict[str, Any],
        model_route: Dict[str, str],
        analysis: Dict[str, Any]
    ) -> str:
        fix_str = ""
        if analysis.get("action_metadata", {}).get("fix"):
            fix_str = f" | Suggested Fix: `{analysis['action_metadata']['fix']}`"
        return (
            f"✅ Zero-Save -> [{proj_match['project_name']}] ({int(proj_match['confidence']*100)}% match) "
            f"| Model: {model_route['target_model']}{fix_str}"
        )


# =====================================================================
# SELF-CONTAINED VERIFICATION DEMO (Run `python capture_pipeline.py`)
# =====================================================================
if __name__ == "__main__":
    print("=" * 75)
    print("🚀 INITIALIZING PROJECT BRAIN OS ENGINE (SQLite + Router + Zero-Save)")
    print("=" * 75)

    store = BrainStore("./ProjectBrainVault")
    router = ProjectAndModelRouter(store)
    pipeline = ZeroSaveCapturePipeline(store, router)

    # 1. Seed Your Real Projects with Fingerprints
    p1 = store.upsert_project(
        name="Three Musketeers",
        root_path="C:/dev/three-musketeers",
        keywords=["three-musketeers", "gateway.mjs", "render", "deployment"],
        git_remotes=["github.com/shaan/three-musketeers"],
        rolling_summary="Multi-agent gateway service deployed on Render."
    )
    p2 = store.upsert_project(
        name="Tier-1 Control Plane",
        root_path="C:/dev/tier1-control-plane",
        keywords=["tier-1", "control-plane", "browser-repair", "rayclaude-wiki", "playwright"],
        git_remotes=["github.com/shaan/tier1-control-plane"],
        rolling_summary="Dependency-light Python LAB for safe browser-repair workflows and automated model routing."
    )
    p3 = store.upsert_project(
        name="APEX-EDITOR-V1",
        root_path="C:/dev/apex-editor-v1",
        keywords=["apex-editor", "obsidian", "notion-ai", "notebooklm", "sqlite_store.py"],
        git_remotes=["github.com/shaan/apex-editor-v1"],
        rolling_summary="Next-gen AI Notepad combining Obsidian vault longevity, Notion AI slash commands, and NotebookLM project grounding."
    )

    print(f"\nRegistered {len(store.get_all_projects())} projects in SQLite & created Vault folders.\n")

    # 2. Simulate Capture #1: Terminal Screenshot with a Missing Dependency Error
    cap1 = pipeline.capture(
        raw_content="Error: Cannot find module 'dotenv'\n    at Function.Module._resolveFilename (gateway.mjs:14:2)",
        item_type="screenshot",
        window_title="Terminal - node gateway.mjs",
        source_app="Windows Terminal",
        visual_hint="Red terminal deployment error logs from Render showing missing dotenv module in gateway.mjs"
    )
    print("📸 Capture 1:", cap1["toast_notification"])

    # 3. Simulate Capture #2: Architectural Decision Note for Tier-1 Control Plane
    cap2 = pipeline.capture(
        raw_content=(
            "Decision: Use SQLite + FTS5 instead of standalone Neo4j server\n"
            "Alternatives: Neo4j Desktop, Docker Postgres\n"
            "Reason: Keeps Tier-1 Control Plane dependency-light and portable with zero external DB daemons."
        ),
        item_type="note",
        window_title="rayclaude-wiki - architecture.md",
        active_file_path="C:/dev/tier1-control-plane/docs/architecture.md",
        source_app="APEX-EDITOR-V1"
    )
    print("📝 Capture 2:", cap2["toast_notification"])

    # 4. Demonstrate Semantic / Visual Screenshot Search
    print("\n🔍 Searching Vault for: 'red terminal error Render logs'")
    search_hits = store.search_vault("red terminal error Render logs")
    for hit in search_hits:
        print(f"   -> Found [{hit['item_type']}] '{hit['title']}' in {hit['file_path']}")

    # 5. Demonstrate 3-Tier Context Injection Payload for "Three Musketeers"
    print("\n🧠 Generating 3-Tier Context Injection Payload for [Three Musketeers]:")
    context_payload = store.build_context_injection_payload(p1["id"], active_query="deployment error gateway")
    print(json.dumps(context_payload, indent=2))
