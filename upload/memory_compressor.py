"""
memory_compressor.py - AI Memory Compression Daemon, Session Replay & Obsidian Two-Way Sync
Zero external dependencies (uses Python standard library sqlite3, json, re, pathlib, datetime).

Solves:
1. Token Exhaustion: Compresses hundreds of raw notes, terminal logs, and screenshots into a
   compact (< 450 token) Rolling Project Summary stored in SQLite and `_project_summary.md`.
2. Knowledge Health Score & Gap Analysis: Detects undocumented recurring errors or missing decisions.
3. Work Session Replay: Reconstructs chronological work blocks (`_work_replay.md`) without 24/7 screen recording.
4. Cross-Project Learning: Detects when an error in Project A was already solved in Project B.
5. Two-Way Obsidian Disk Sync: Detects if a user edited a `.md` file directly on disk and updates SQLite/FTS5.
"""

import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List, Optional
from sqlite_store import BrainStore
from llm_bridge import HybridLLMBridge


class MemoryCompressor:
    def __init__(self, store: BrainStore, llm_bridge: Optional[HybridLLMBridge] = None):
        self.store = store
        self.llm = llm_bridge or HybridLLMBridge()

    # =========================================================================
    # 1. PROJECT MEMORY COMPRESSION (Kills Token Exhaustion)
    # =========================================================================
    def compress_project_memory(self, project_id: str, max_summary_chars: int = 1600) -> Dict[str, Any]:
        """
        Synthesizes all items, decisions, and error fixes for a project into a high-density,
        token-efficient Rolling Summary (< 450 tokens) and updates `_project_summary.md`
        and `_work_replay.md`.
        """
        project = self.store.get_project_by_id(project_id)
        if not project:
            return {"error": f"Project '{project_id}' not found"}

        with self.store._get_conn() as conn:
            items = [
                dict(r) for r in conn.execute(
                    "SELECT * FROM items WHERE project_id = ? ORDER BY captured_at DESC LIMIT 100",
                    (project_id,)
                ).fetchall()
            ]
            decisions = [
                dict(r) for r in conn.execute(
                    "SELECT * FROM decisions WHERE project_id = ? ORDER BY decided_at DESC LIMIT 25",
                    (project_id,)
                ).fetchall()
            ]

        edges = self.store.get_project_graph(project_id)

        # Categorize project knowledge
        screenshots_count = sum(1 for i in items if i["item_type"] == "screenshot")
        terminals_count = sum(1 for i in items if i["item_type"] == "terminal")
        notes_count = sum(1 for i in items if i["item_type"] == "note")

        resolved_fixes = []
        active_files = set()
        recent_highlights = []

        for it in items:
            meta = json.loads(it.get("metadata") or "{}")
            if meta.get("fix"):
                resolved_fixes.append(f"{it['title']} -> `{meta['fix']}`")
            if len(recent_highlights) < 6:
                recent_highlights.append(f"[{it['item_type'].upper()}] {it['title']}")

        for edge in edges:
            if edge["relation_type"] == "MENTIONED_IN":
                active_files.add(edge["source_node"])

        # Calculate Knowledge Health Score & Identify Gaps
        health_report = self._compute_health_and_gaps(
            project=project,
            items=items,
            decisions=decisions,
            resolved_fixes=resolved_fixes,
            active_files=list(active_files)
        )

        # Build deterministic compressed memory block
        decision_summary = "; ".join(
            f"{d['title']} ({d['decision']})" for d in decisions[:4]
        ) or "No formal architectural decisions logged yet."

        fixes_summary = "; ".join(resolved_fixes[:4]) or "No automated bug fixes logged yet."
        files_summary = ", ".join(sorted(list(active_files))[:10]) or "None indexed yet."

        deterministic_digest = (
            f"Project '{project['name']}' ({len(items)} captures: {notes_count} notes, "
            f"{screenshots_count} screenshots, {terminals_count} terminal logs). "
            f"Key Files: {files_summary}. "
            f"Core Decisions: {decision_summary}. "
            f"Resolved Fixes: {fixes_summary}. "
            f"Recent Activity: {'; '.join(recent_highlights[:4])}."
        )

        # Optional LLM compression pass if Ollama/Cloud API is available
        llm_digest = self.llm.complete_text(
            system_prompt=(
                "Compress the following project state into a dense, factual paragraph (< 120 words) "
                "for an AI coding assistant. Preserve exact filenames, decisions, and package fixes."
            ),
            user_prompt=deterministic_digest,
            max_tokens=200
        )

        final_rolling_summary = (llm_digest or deterministic_digest)[:max_summary_chars]
        now = datetime.utcnow().isoformat()

        # Update SQLite project record with new rolling_summary and health_score
        with self.store._get_conn() as conn:
            conn.execute("""
                UPDATE projects
                SET rolling_summary = ?, health_score = ?, updated_at = ?
                WHERE id = ?
            """, (final_rolling_summary, health_report["score"], now, project_id))

        # Write enriched _project_summary.md and _work_replay.md to disk
        proj_folder = self.store.projects_dir / project["slug"]
        proj_folder.mkdir(parents=True, exist_ok=True)

        summary_md_path = proj_folder / "_project_summary.md"
        summary_md_content = (
            f"# {project['name']} — Compressed Project Brain\n\n"
            f"- **Health Score:** {health_report['score']}/100 ({health_report['status']})\n"
            f"- **Total Captures Indexed:** {len(items)} ({notes_count} notes, {screenshots_count} screenshots, {terminals_count} terminal logs)\n"
            f"- **Decisions Logged:** {len(decisions)}\n"
            f"- **Last Compressed:** {now}\n\n"
            f"## 1. Compressed Rolling Memory (Tier-1 Prompt Payload)\n"
            f"{final_rolling_summary}\n\n"
            f"## 2. Key Architectural Decisions\n"
            + ("\n".join(f"- **{d['title']}**: {d['decision']} *(Reason: {d['reasoning']})*" for d in decisions) or "- None recorded yet.")
            + "\n\n## 3. Known Bug Fixes & Actionable Remedies\n"
            + ("\n".join(f"- {fx}" for fx in resolved_fixes) or "- None recorded yet.")
            + "\n\n## 4. Knowledge Gaps & Recommendations\n"
            + ("\n".join(f"- ⚠️ {gap}" for gap in health_report["gaps"]) or "- ✅ No knowledge gaps detected!")
            + "\n"
        )
        summary_md_path.write_text(summary_md_content, encoding="utf-8")

        replay_path = self._write_work_session_replay(proj_folder, project["name"], items)

        return {
            "project_id": project_id,
            "project_name": project["name"],
            "compressed_rolling_summary": final_rolling_summary,
            "estimated_summary_tokens": max(1, len(final_rolling_summary) // 4),
            "health_report": health_report,
            "summary_file": str(summary_md_path),
            "work_replay_file": str(replay_path),
            "items_compressed": len(items)
        }

    def _compute_health_and_gaps(
        self,
        project: Dict[str, Any],
        items: List[Dict[str, Any]],
        decisions: List[Dict[str, Any]],
        resolved_fixes: List[str],
        active_files: List[str]
    ) -> Dict[str, Any]:
        score = 50
        gaps = []

        if items:
            score += min(20, len(items) * 4)
        else:
            gaps.append("No captures or notes recorded in this project yet.")

        if decisions:
            score += 15
        else:
            gaps.append("Missing Decision Graph entries: Log at least 1 architectural decision (`Decision: ... Reason: ...`).")

        if project.get("keywords"):
            score += 10
        else:
            gaps.append("No project keyword fingerprints configured for Auto-Project Detection.")

        if len(resolved_fixes) > 0 and len(decisions) == 0:
            gaps.append("Multiple bug fixes captured, but no root-cause architectural decision documented.")

        if active_files:
            score += 5

        final_score = min(100, score)
        status = "EXCELLENT" if final_score >= 85 else ("HEALTHY" if final_score >= 65 else "NEEDS ATTENTION")
        return {"score": final_score, "status": status, "gaps": gaps}

    def _write_work_session_replay(self, proj_folder: Path, project_name: str, items: List[Dict[str, Any]]) -> Path:
        """Groups chronological captures by date into a human-readable Work Replay timeline."""
        replay_path = proj_folder / "_work_replay.md"
        grouped: Dict[str, List[Dict[str, Any]]] = {}
        for it in items:
            day = (it.get("captured_at") or "")[:10] or "Unknown-Date"
            grouped.setdefault(day, []).append(it)

        lines = [f"# ⏪ {project_name} — Chronological Work Session Replay\n"]
        for day, day_items in sorted(grouped.items(), reverse=True):
            lines.append(f"## 📅 {day} ({len(day_items)} captures)")
            for it in day_items:
                time_part = (it.get("captured_at") or "")[11:19]
                lines.append(
                    f"- **`{time_part}` [{it['item_type'].upper()}] {it['title']}** "
                    f"*(via {it.get('source_app') or 'App'})* — {it.get('structured_summary') or ''}"
                )
            lines.append("")

        replay_path.write_text("\n".join(lines), encoding="utf-8")
        return replay_path

    # =========================================================================
    # 2. CROSS-PROJECT LEARNING & BUG REUSE DETECTOR
    # =========================================================================
    def find_cross_project_solutions(self, error_query: str, exclude_project_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Searches across ALL OTHER projects in the vault to see if a similar bug or error
        was already solved elsewhere (Cross-Project Intelligence).
        """
        hits = self.store.search_vault(error_query, project_id=None, limit=15)
        reusable = []
        for h in hits:
            if exclude_project_id and h.get("project_id") == exclude_project_id:
                continue
            meta = json.loads(h.get("metadata") or "{}")
            proj = self.store.get_project_by_id(h["project_id"]) if h.get("project_id") else None
            reusable.append({
                "item_id": h["id"],
                "source_project": proj["name"] if proj else "Inbox",
                "title": h["title"],
                "summary": h["structured_summary"],
                "suggested_fix": meta.get("fix", ""),
                "captured_at": h["captured_at"]
            })
        return reusable

    # =========================================================================
    # 3. TWO-WAY OBSIDIAN DISK SYNC (Disk .md Edits -> SQLite + FTS5)
    # =========================================================================
    def sync_markdown_edits_from_disk(self) -> Dict[str, int]:
        """
        Scans all tracked items in SQLite; if the user edited the `.md` file directly in
        Obsidian or VS Code, syncs the updated Markdown content back into SQLite and FTS5.
        """
        updated_count = 0
        checked_count = 0

        with self.store._get_conn() as conn:
            rows = conn.execute("SELECT id, title, raw_content, file_path, structured_summary, visual_description FROM items").fetchall()
            for r in rows:
                checked_count += 1
                fpath = r["file_path"]
                if not fpath:
                    continue
                md_file = Path(fpath)
                if not md_file.exists():
                    continue

                disk_text = md_file.read_text(encoding="utf-8")
                # Extract content after "## Content\n"
                marker = "## Content\n"
                if marker in disk_text:
                    new_raw = disk_text.split(marker, 1)[1].strip()
                else:
                    new_raw = disk_text.strip()

                if new_raw and new_raw != r["raw_content"].strip():
                    conn.execute(
                        "UPDATE items SET raw_content = ? WHERE id = ?",
                        (new_raw, r["id"])
                    )
                    conn.execute(
                        "DELETE FROM items_fts WHERE item_id = ?",
                        (r["id"],)
                    )
                    conn.execute("""
                        INSERT INTO items_fts (item_id, title, raw_content, structured_summary, visual_description)
                        VALUES (?, ?, ?, ?, ?)
                    """, (r["id"], r["title"], new_raw, r["structured_summary"], r["visual_description"]))
                    updated_count += 1

        return {"files_checked": checked_count, "sqlite_records_updated": updated_count}
