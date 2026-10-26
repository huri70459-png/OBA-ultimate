"""
memory_compressor.py — Project memory compression, deduplication and replay.

Compatibility: uses the existing BrainStore and HybridLLMBridge interfaces.
Deduplication is exact-content, project-scoped and time-bounded; similar-but-not-
identical content is intentionally not merged to avoid accidental data loss.
"""
import hashlib
import json
import re
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional

from sqlite_store import BrainStore
from llm_bridge import HybridLLMBridge


def _now():
    return datetime.utcnow().replace(microsecond=0).isoformat()


def _meta(value):
    try:
        result = json.loads(value or "{}")
        return result if isinstance(result, dict) else {}
    except (TypeError, ValueError):
        return {}


def _canonical(text):
    text = (text or "").replace("\r\n", "\n").replace("\r", "\n").strip().lower()
    return re.sub(r"\s+", " ", text)


class MemoryCompressor:
    def __init__(self, store: BrainStore, llm_bridge: Optional[HybridLLMBridge] = None):
        self.store = store
        self.llm = llm_bridge or HybridLLMBridge()

    @staticmethod
    def _fingerprint(raw_content, item_type):
        canonical = f"{(item_type or 'note').strip().lower()}\0{_canonical(raw_content)}"
        return hashlib.sha256(canonical.encode("utf-8")).hexdigest()

    def find_recent_duplicate(self, raw_content, item_type="note", project_id=None, hours=36):
        fingerprint = self._fingerprint(raw_content, item_type)
        cutoff = (datetime.utcnow() - timedelta(hours=max(1, hours))).isoformat()
        with self.store._get_conn() as conn:
            if project_id:
                rows = conn.execute(
                    "SELECT * FROM items WHERE project_id = ? AND captured_at >= ? ORDER BY captured_at DESC LIMIT 250",
                    (project_id, cutoff)
                ).fetchall()
            else:
                rows = conn.execute(
                    "SELECT * FROM items WHERE project_id IS NULL AND captured_at >= ? ORDER BY captured_at DESC LIMIT 250",
                    (cutoff,)
                ).fetchall()
        for row in rows:
            item = dict(row)
            metadata = _meta(item.get("metadata"))
            prior = metadata.get("dedup_fingerprint")
            if prior is None:
                prior = self._fingerprint(item.get("raw_content", ""), item.get("item_type", "note"))
            if prior == fingerprint:
                item["metadata"] = metadata
                return item
        return None

    def record_duplicate_occurrence(self, item_id):
        item = None
        with self.store._get_conn() as conn:
            row = conn.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
            if not row:
                return {}
            item = dict(row)
            metadata = _meta(item.get("metadata"))
            metadata["dedup_fingerprint"] = metadata.get(
                "dedup_fingerprint", self._fingerprint(item.get("raw_content", ""), item.get("item_type", "note"))
            )
            metadata["occurrence_count"] = int(metadata.get("occurrence_count", 1)) + 1
            metadata["last_seen_at"] = _now()
            conn.execute("UPDATE items SET metadata = ? WHERE id = ?",
                         (json.dumps(metadata, ensure_ascii=False), item_id))
        item["metadata"] = metadata
        return item

    def compress_project_memory(self, project_id: str, max_summary_chars: int = 1600) -> Dict[str, Any]:
        project = self.store.get_project_by_id(project_id)
        if not project:
            return {"error": f"Project '{project_id}' not found"}
        with self.store._get_conn() as conn:
            items = [dict(r) for r in conn.execute(
                "SELECT * FROM items WHERE project_id = ? ORDER BY captured_at DESC LIMIT 500", (project_id,)
            ).fetchall()]
            decisions = [dict(r) for r in conn.execute(
                "SELECT * FROM decisions WHERE project_id = ? ORDER BY decided_at DESC LIMIT 50", (project_id,)
            ).fetchall()]
        edges = self.store.get_project_graph(project_id)
        counts = {}
        for item in items:
            counts[item["item_type"]] = counts.get(item["item_type"], 0) + 1
        occurrences = sum(max(1, int(_meta(i.get("metadata")).get("occurrence_count", 1))) for i in items)
        fixes, recent = [], []
        files = set()
        for item in items:
            metadata = _meta(item.get("metadata"))
            if metadata.get("fix"):
                fixes.append(f"{item['title']} -> `{metadata['fix']}`")
            if len(recent) < 8:
                recent.append(f"[{item['item_type'].upper()}] {item['title']}")
        for edge in edges:
            if edge.get("relation_type") == "MENTIONED_IN":
                files.add(edge.get("source_node", ""))
        decisions_text = "; ".join(f"{d['title']} ({d['decision']})" for d in decisions[:5]) or "No formal decisions logged."
        deterministic = (
            f"Project '{project['name']}' has {len(items)} unique captures representing {occurrences} occurrences "
            f"({', '.join(f'{n} {k}' for k, n in sorted(counts.items())) or 'no captures'}). "
            f"Key files: {', '.join(sorted(files)[:12]) or 'none indexed'}. "
            f"Decisions: {decisions_text} Fixes: {'; '.join(fixes[:5]) or 'none indexed'}. "
            f"Recent: {'; '.join(recent[:5]) or 'no recent activity'}."
        )
        health = self._compute_health_and_gaps(project, items, decisions, fixes, list(files))
        llm_digest = self.llm.complete_text(
            system_prompt=("Compress project state into a factual paragraph under 120 words. "
                           "Preserve exact filenames, decisions and fixes; do not invent details."),
            user_prompt=deterministic, max_tokens=200
        )
        summary = (llm_digest or deterministic)[:max_summary_chars]
        now = _now()
        with self.store._get_conn() as conn:
            conn.execute("UPDATE projects SET rolling_summary = ?, health_score = ?, updated_at = ? WHERE id = ?",
                         (summary, health["score"], now, project_id))
        folder = self.store.projects_dir / project["slug"]
        folder.mkdir(parents=True, exist_ok=True)
        summary_path = folder / "_project_summary.md"
        text = (
            f"# {project['name']} — Compressed Project Brain\n\n"
            f"- **Health:** {health['score']}/100 ({health['status']})\n"
            f"- **Unique captures:** {len(items)} ({occurrences} observed occurrences)\n"
            f"- **Decisions:** {len(decisions)}\n- **Last compressed:** {now}\n\n"
            f"## Rolling Memory\n{summary}\n\n## Architectural Decisions\n"
            + ("\n".join(f"- **{d['title']}**: {d['decision']} — {d['reasoning']}" for d in decisions)
               or "- None recorded.")
            + "\n\n## Known Fixes\n"
            + ("\n".join(f"- {fix}" for fix in fixes) or "- None indexed.")
            + "\n\n## Knowledge Gaps\n"
            + ("\n".join(f"- {gap}" for gap in health["gaps"]) or "- No obvious gaps.")
            + "\n"
        )
        self._atomic_write(summary_path, text)
        replay_path = self._write_work_session_replay(folder, project["name"], items)
        return {
            "project_id": project_id, "project_name": project["name"],
            "compressed_rolling_summary": summary, "estimated_summary_tokens": max(1, len(summary) // 4),
            "health_report": health, "summary_file": str(summary_path),
            "work_replay_file": str(replay_path), "items_compressed": len(items),
            "occurrences_represented": occurrences
        }

    @staticmethod
    def _atomic_write(path, text):
        tmp = path.with_suffix(path.suffix + ".tmp")
        tmp.write_text(text, encoding="utf-8")
        tmp.replace(path)

    def _compute_health_and_gaps(self, project, items, decisions, resolved_fixes, active_files):
        score, gaps = 50, []
        if items:
            score += min(20, len(items) * 2)
        else:
            gaps.append("No captures or notes recorded yet.")
        if decisions:
            score += 15
        else:
            gaps.append("No architectural decisions are documented.")
        if project.get("keywords"):
            score += 10
        else:
            gaps.append("Project keywords are not configured for auto-routing.")
        if resolved_fixes and not decisions:
            gaps.append("Fixes exist without a corresponding root-cause decision.")
        if active_files:
            score += 5
        score = min(100, score)
        return {
            "score": score,
            "status": "EXCELLENT" if score >= 85 else ("HEALTHY" if score >= 65 else "NEEDS ATTENTION"),
            "gaps": gaps
        }

    def _write_work_session_replay(self, folder: Path, project_name: str, items: List[Dict[str, Any]]) -> Path:
        """Regenerate a single replay file: consolidate exact repeats and group activity sessions."""
        path = folder / "_work_replay.md"
        ordered = sorted(items, key=lambda x: x.get("captured_at") or "", reverse=True)
        lines = [f"# {project_name} — Work Replay\n", "> Regenerated from captures; repeated exact captures are folded into occurrence counts.\n"]
        by_day = {}
        for item in ordered:
            day = (item.get("captured_at") or "")[:10] or "Unknown date"
            by_day.setdefault(day, []).append(item)
        for day, day_items in by_day.items():
            total_events = sum(max(1, int(_meta(i.get("metadata")).get("occurrence_count", 1))) for i in day_items)
            lines.append(f"## {day} · {len(day_items)} unique captures / {total_events} occurrences")
            sessions, current = [], []
            prior_dt = None
            for item in sorted(day_items, key=lambda x: x.get("captured_at") or ""):
                try:
                    stamp = datetime.fromisoformat(item.get("captured_at", ""))
                except (TypeError, ValueError):
                    stamp = None
                if current and stamp and prior_dt and (stamp - prior_dt).total_seconds() > 45 * 60:
                    sessions.append(current)
                    current = []
                current.append(item)
                if stamp:
                    prior_dt = stamp
            if current:
                sessions.append(current)
            for number, session in enumerate(sessions, 1):
                first = (session[0].get("captured_at") or "")[11:16]
                last = (session[-1].get("captured_at") or "")[11:16]
                lines.append(f"\n### Session {number} · {first}–{last}")
                for item in session:
                    meta = _meta(item.get("metadata"))
                    count = max(1, int(meta.get("occurrence_count", 1)))
                    suffix = f" ×{count}" if count > 1 else ""
                    summary = item.get("structured_summary") or ""
                    lines.append(f"- **[{item['item_type'].upper()}] {item['title']}**{suffix} — {summary}")
            lines.append("")
        self._atomic_write(path, "\n".join(lines))
        return path

    def find_cross_project_solutions(self, error_query, exclude_project_id=None):
        hits = self.store.search_vault(error_query, project_id=None, limit=20)
        reusable = []
        for hit in hits:
            if exclude_project_id and hit.get("project_id") == exclude_project_id:
                continue
            metadata = _meta(hit.get("metadata"))
            project = self.store.get_project_by_id(hit["project_id"]) if hit.get("project_id") else None
            reusable.append({
                "item_id": hit["id"], "source_project": project["name"] if project else "Inbox",
                "title": hit["title"], "summary": hit.get("structured_summary", ""),
                "suggested_fix": metadata.get("fix", ""), "captured_at": hit.get("captured_at")
            })
        return reusable

    def sync_markdown_edits_from_disk(self):
        updated, checked = 0, 0
        with self.store._get_conn() as conn:
            rows = conn.execute(
                "SELECT id, title, raw_content, file_path, structured_summary, visual_description FROM items"
            ).fetchall()
            for row in rows:
                checked += 1
                if not row["file_path"]:
                    continue
                file = Path(row["file_path"])
                if not file.exists():
                    continue
                disk = file.read_text(encoding="utf-8")
                marker = "## Content\n"
                new_raw = disk.split(marker, 1)[1].strip() if marker in disk else disk.strip()
                if new_raw and new_raw != (row["raw_content"] or "").strip():
                    conn.execute("UPDATE items SET raw_content = ? WHERE id = ?", (new_raw, row["id"]))
                    conn.execute("DELETE FROM items_fts WHERE item_id = ?", (row["id"],))
                    conn.execute(
                        "INSERT INTO items_fts (item_id, title, raw_content, structured_summary, visual_description) "
                        "VALUES (?, ?, ?, ?, ?)",
                        (row["id"], row["title"], new_raw, row["structured_summary"], row["visual_description"])
                    )
                    updated += 1
        return {"files_checked": checked, "sqlite_records_updated": updated}
