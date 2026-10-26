"""
project_router.py - Zero-Tagging Auto-Project Detection & AI Task Model Router
Automatically detects which project a capture belongs to AND routes the task to the right AI model (e.g., Codex, Vision, Reasoner).
"""

import re
from typing import Dict, Any, Optional, List
from sqlite_store import BrainStore


class ProjectAndModelRouter:
    def __init__(self, store: BrainStore):
        self.store = store
        self.last_active_project_id: Optional[str] = None

    def detect_project(
        self,
        raw_content: str = "",
        window_title: str = "",
        active_file_path: str = "",
        source_url: str = "",
        confidence_threshold: float = 0.35
    ) -> Dict[str, Any]:
        """
        Scores all registered projects against the active capture's metadata and text.
        Returns the best matching project or falls back to 'Inbox' if confidence is below threshold.
        """
        projects = self.store.get_all_projects()
        if not projects:
            return {"project_id": None, "project_name": "Inbox", "confidence": 0.0, "reasons": ["No projects registered"]}

        combined_context = f"{window_title} {active_file_path} {source_url} {raw_content}".lower()
        norm_file_path = active_file_path.replace("\\", "/").lower()

        best_match = None
        best_score = 0.0
        best_reasons: List[str] = []

        for proj in projects:
            score = 0.0
            reasons = []

            # 1. Hard Path Match (+0.65)
            root_path = (proj.get("root_path") or "").replace("\\", "/").lower()
            if root_path and root_path in norm_file_path:
                score += 0.65
                reasons.append(f"File path matched project root '{root_path}'")

            # 2. Project Name or Slug in Window Title / URL (+0.45)
            slug = proj["slug"].lower()
            name_lower = proj["name"].lower()
            if slug in window_title.lower() or name_lower in window_title.lower():
                score += 0.45
                reasons.append(f"Window title contains project name/slug '{proj['name']}'")
            elif slug in source_url.lower():
                score += 0.40
                reasons.append(f"URL contains project slug '{slug}'")

            # 3. Git Remote Match (+0.50)
            for remote in proj.get("git_remotes", []):
                if remote.lower() in combined_context:
                    score += 0.50
                    reasons.append(f"Matched git remote '{remote}'")

            # 4. Keyword Fingerprint Matches (+0.18 per keyword, capped at +0.54)
            kw_hits = 0
            for kw in proj.get("keywords", []):
                if kw.lower() in combined_context:
                    kw_hits += 1
                    reasons.append(f"Matched keyword '{kw}'")
            score += min(kw_hits * 0.18, 0.54)

            # 5. Session Momentum Bonus (+0.15 if this was the most recently active project)
            if self.last_active_project_id and proj["id"] == self.last_active_project_id and score > 0:
                score += 0.15
                reasons.append("Session momentum bonus (last active project)")

            if score > best_score:
                best_score = min(score, 1.0)
                best_match = proj
                best_reasons = reasons

        if best_match and best_score >= confidence_threshold:
            self.last_active_project_id = best_match["id"]
            return {
                "project_id": best_match["id"],
                "project_name": best_match["name"],
                "project_slug": best_match["slug"],
                "confidence": round(best_score, 2),
                "reasons": best_reasons
            }

        return {
            "project_id": None,
            "project_name": "Inbox",
            "project_slug": "inbox",
            "confidence": round(best_score, 2),
            "reasons": ["Confidence below threshold; routed to Inbox"]
        }

    @staticmethod
    def route_ai_model(
        item_type: str,
        raw_content: str,
        has_image: bool = False
    ) -> Dict[str, str]:
        """
        Automatically selects the optimal AI model/agent without manual intervention:
        - Code errors, stack traces, refactoring, patches -> Codex / Code Specialist Model
        - Screenshots / UI / Diagrams -> Vision-Capable Multimodal Model
        - Architectural decisions / multi-doc synthesis -> Deep Reasoning / NotebookLM-style Synthesizer
        """
        content_lower = raw_content.lower()

        code_error_signals = [
            "traceback (most recent call last)",
            "error:",
            "exception",
            "module not found",
            "err_module_not_found",
            "syntaxerror",
            "typeerror",
            "pnpm ",
            "npm err!",
            "def ",
            "function ",
            "const ",
            "import "
        ]
        decision_signals = [
            "decision:",
            "why we chose",
            "alternatives:",
            "tradeoff",
            "architecture",
            "migrating from"
        ]

        if any(sig in content_lower for sig in code_error_signals) or item_type == "terminal":
            return {
                "target_model": "codex-agent",
                "task_mode": "error_diagnosis_and_patch",
                "reason": "Detected stack trace, terminal log, or source code snippet"
            }

        if any(sig in content_lower for sig in decision_signals):
            return {
                "target_model": "reasoning-architect",
                "task_mode": "decision_and_graph_extraction",
                "reason": "Detected architectural rationale or tradeoff discussion"
            }

        if has_image or item_type == "screenshot":
            return {
                "target_model": "vision-ocr-extractor",
                "task_mode": "visual_semantic_markdown",
                "reason": "Visual screenshot capture requiring OCR + semantic indexing"
            }

        return {
            "target_model": "fast-memory-structurer",
            "task_mode": "summarize_and_link",
            "reason": "Standard note or web clip capture"
        }
