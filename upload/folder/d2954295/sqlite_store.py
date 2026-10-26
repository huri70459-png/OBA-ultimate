"""
sqlite_store.py - Unified Local SQLite + FTS5 + Knowledge Graph + Vault Sync Engine
Zero external dependencies (uses Python standard library sqlite3, json, pathlib).
"""

import sqlite3
import json
import uuid
import re
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any, Optional


class BrainStore:
    def __init__(self, vault_dir: str = "./ProjectBrainVault"):
        self.vault_path = Path(vault_dir).resolve()
        self.brain_dir = self.vault_path / ".brain"
        self.inbox_dir = self.vault_path / "Inbox"
        self.projects_dir = self.vault_path / "Projects"

        # Ensure directory structure exists
        for d in [self.brain_dir, self.inbox_dir, self.projects_dir]:
            d.mkdir(parents=True, exist_ok=True)

        self.db_path = self.brain_dir / "brain.db"
        self._init_db()

    def _get_conn(self) -> sqlite3.Connection:
        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA foreign_keys=ON;")
        return conn

    def _init_db(self) -> None:
        with self._get_conn() as conn:
            conn.executescript("""
                -- 1. PROJECTS TABLE
                CREATE TABLE IF NOT EXISTS projects (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    slug TEXT UNIQUE NOT NULL,
                    root_path TEXT,
                    keywords TEXT DEFAULT '[]',
                    git_remotes TEXT DEFAULT '[]',
                    rolling_summary TEXT DEFAULT '',
                    health_score INTEGER DEFAULT 100,
                    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
                );

                -- 2. UNIVERSAL ITEMS TABLE
                CREATE TABLE IF NOT EXISTS items (
                    id TEXT PRIMARY KEY,
                    project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
                    item_type TEXT NOT NULL,
                    title TEXT NOT NULL,
                    raw_content TEXT NOT NULL,
                    structured_summary TEXT DEFAULT '',
                    visual_description TEXT DEFAULT '',
                    file_path TEXT,
                    asset_path TEXT,
                    source_app TEXT DEFAULT '',
                    source_url TEXT DEFAULT '',
                    metadata TEXT DEFAULT '{}',
                    captured_at TEXT DEFAULT CURRENT_TIMESTAMP
                );

                -- 3. DECISION GRAPH TABLE
                CREATE TABLE IF NOT EXISTS decisions (
                    id TEXT PRIMARY KEY,
                    project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
                    title TEXT NOT NULL,
                    decision TEXT NOT NULL,
                    alternatives TEXT DEFAULT '[]',
                    reasoning TEXT NOT NULL,
                    outcome TEXT DEFAULT 'Pending',
                    source_item_id TEXT REFERENCES items(id) ON DELETE SET NULL,
                    decided_at TEXT DEFAULT CURRENT_TIMESTAMP
                );

                -- 4. DYNAMIC KNOWLEDGE GRAPH EDGES
                CREATE TABLE IF NOT EXISTS graph_edges (
                    id TEXT PRIMARY KEY,
                    project_id TEXT,
                    source_node TEXT NOT NULL,
                    target_node TEXT NOT NULL,
                    relation_type TEXT NOT NULL,
                    weight REAL DEFAULT 1.0,
                    created_at TEXT DEFAULT CURRENT_TIMESTAMP
                );

                -- 5. FULL-TEXT SEARCH (FTS5) VIRTUAL TABLE
                CREATE VIRTUAL TABLE IF NOT EXISTS items_fts USING fts5(
                    item_id UNINDEXED,
                    title,
                    raw_content,
                    structured_summary,
                    visual_description
                );
            """)

    @staticmethod
    def _slugify(text: str) -> str:
        slug = re.sub(r"[^a-zA-Z0-9\s-]", "", text).strip().lower()
        return re.sub(r"[\s-]+", "-", slug) or "untitled"

    # ==========================================
    # PROJECT MANAGEMENT
    # ==========================================
    def upsert_project(
        self,
        name: str,
        root_path: str = "",
        keywords: Optional[List[str]] = None,
        git_remotes: Optional[List[str]] = None,
        rolling_summary: str = ""
    ) -> Dict[str, Any]:
        slug = self._slugify(name)
        keywords = keywords or []
        git_remotes = git_remotes or []
        now = datetime.utcnow().isoformat()

        # Ensure Obsidian-compatible folder structure exists
        proj_folder = self.projects_dir / slug
        for sub in ["notes", "captures", "assets"]:
            (proj_folder / sub).mkdir(parents=True, exist_ok=True)

        with self._get_conn() as conn:
            existing = conn.execute("SELECT id, rolling_summary FROM projects WHERE slug = ?", (slug,)).fetchone()
            if existing:
                proj_id = existing["id"]
                summary_to_save = rolling_summary if rolling_summary else existing["rolling_summary"]
                conn.execute("""
                    UPDATE projects
                    SET name = ?, root_path = ?, keywords = ?, git_remotes = ?, rolling_summary = ?, updated_at = ?
                    WHERE id = ?
                """, (name, root_path, json.dumps(keywords), json.dumps(git_remotes), summary_to_save, now, proj_id))
            else:
                proj_id = f"proj_{uuid.uuid4().hex[:10]}"
                conn.execute("""
                    INSERT INTO projects (id, name, slug, root_path, keywords, git_remotes, rolling_summary, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (proj_id, name, slug, root_path, json.dumps(keywords), json.dumps(git_remotes), rolling_summary, now))

        # Write human-readable _project_summary.md
        summary_md = proj_folder / "_project_summary.md"
        if rolling_summary or not summary_md.exists():
            summary_md.write_text(
                f"# {name} — Project Brain Summary\n\n"
                f"**Root Path:** `{root_path}`\n"
                f"**Keywords:** {', '.join(keywords)}\n"
                f"**Last Updated:** {now}\n\n"
                f"## Rolling Memory\n{rolling_summary or 'No summary compressed yet.'}\n",
                encoding="utf-8"
            )

        return self.get_project_by_id(proj_id)

    def get_project_by_id(self, project_id: str) -> Optional[Dict[str, Any]]:
        with self._get_conn() as conn:
            row = conn.execute("SELECT * FROM projects WHERE id = ?", (project_id,)).fetchone()
            return self._row_to_project(row) if row else None

    def get_all_projects(self) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute("SELECT * FROM projects ORDER BY updated_at DESC").fetchall()
            return [self._row_to_project(r) for r in rows]

    @staticmethod
    def _row_to_project(row: sqlite3.Row) -> Dict[str, Any]:
        d = dict(row)
        d["keywords"] = json.loads(d.get("keywords") or "[]")
        d["git_remotes"] = json.loads(d.get("git_remotes") or "[]")
        return d

    # ==========================================
    # ZERO-SAVE ITEM CAPTURE & VAULT SYNC
    # ==========================================
    def save_item(
        self,
        title: str,
        raw_content: str,
        item_type: str = "note",
        project_id: Optional[str] = None,
        structured_summary: str = "",
        visual_description: str = "",
        asset_path: str = "",
        source_app: str = "",
        source_url: str = "",
        metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        item_id = f"item_{uuid.uuid4().hex[:12]}"
        now = datetime.utcnow().isoformat()
        metadata = metadata or {}

        # Determine vault file path
        date_prefix = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        file_slug = self._slugify(title)[:50]
        filename = f"{date_prefix}_{file_slug}.md"

        project = self.get_project_by_id(project_id) if project_id else None
        if project:
            subfolder = "captures" if item_type in ("screenshot", "clip", "terminal") else "notes"
            md_path = self.projects_dir / project["slug"] / subfolder / filename
        else:
            md_path = self.inbox_dir / filename

        # Write clean Obsidian-compatible Markdown file with YAML Frontmatter
        frontmatter = (
            f"---\n"
            f"id: {item_id}\n"
            f"type: {item_type}\n"
            f"project: {project['name'] if project else 'Inbox'}\n"
            f"source_app: {source_app}\n"
            f"source_url: {source_url}\n"
            f"captured_at: {now}\n"
            f"---\n\n"
        )
        body = f"# {title}\n\n"
        if structured_summary:
            body += f"> **AI Summary:** {structured_summary}\n\n"
        if visual_description:
            body += f"> **Visual Context:** {visual_description}\n\n"
        if metadata.get("fix"):
            body += f"### Suggested Fix\n```bash\n{metadata['fix']}\n```\n\n"
        body += f"## Content\n{raw_content}\n"

        md_path.write_text(frontmatter + body, encoding="utf-8")

        with self._get_conn() as conn:
            conn.execute("""
                INSERT INTO items (
                    id, project_id, item_type, title, raw_content,
                    structured_summary, visual_description, file_path,
                    asset_path, source_app, source_url, metadata, captured_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                item_id, project_id, item_type, title, raw_content,
                structured_summary, visual_description, str(md_path),
                asset_path, source_app, source_url, json.dumps(metadata), now
            ))

            # Sync with FTS5 full-text search index
            conn.execute("""
                INSERT INTO items_fts (item_id, title, raw_content, structured_summary, visual_description)
                VALUES (?, ?, ?, ?, ?)
            """, (item_id, title, raw_content, structured_summary, visual_description))

            if project_id:
                conn.execute("UPDATE projects SET updated_at = ? WHERE id = ?", (now, project_id))

        return {
            "id": item_id,
            "project_id": project_id,
            "project_name": project["name"] if project else "Inbox",
            "title": title,
            "item_type": item_type,
            "file_path": str(md_path),
            "captured_at": now,
            "metadata": metadata
        }

    # ==========================================
    # DECISION INTELLIGENCE LOG
    # ==========================================
    def log_decision(
        self,
        project_id: str,
        title: str,
        decision: str,
        reasoning: str,
        alternatives: Optional[List[str]] = None,
        outcome: str = "Active",
        source_item_id: Optional[str] = None
    ) -> Dict[str, Any]:
        dec_id = f"dec_{uuid.uuid4().hex[:10]}"
        now = datetime.utcnow().isoformat()
        alternatives = alternatives or []

        with self._get_conn() as conn:
            conn.execute("""
                INSERT INTO decisions (
                    id, project_id, title, decision, alternatives,
                    reasoning, outcome, source_item_id, decided_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                dec_id, project_id, title, decision,
                json.dumps(alternatives), reasoning, outcome, source_item_id, now
            ))

        # Append to human-readable _decisions.md inside the project folder
        project = self.get_project_by_id(project_id)
        if project:
            dec_file = self.projects_dir / project["slug"] / "_decisions.md"
            if not dec_file.exists():
                dec_file.write_text(f"# {project['name']} — Decision Graph Log\n\n", encoding="utf-8")
            with open(dec_file, "a", encoding="utf-8") as f:
                f.write(
                    f"## [{now[:10]}] {title}\n"
                    f"- **Decision:** {decision}\n"
                    f"- **Alternatives Rejected:** {', '.join(alternatives) if alternatives else 'None listed'}\n"
                    f"- **Reasoning:** {reasoning}\n"
                    f"- **Outcome:** {outcome}\n\n"
                )

        # Link in Knowledge Graph
        self.add_graph_edge(project_id, title, decision, "DECIDED_ON")
        return {"id": dec_id, "title": title, "decision": decision, "reasoning": reasoning}

    # ==========================================
    # DYNAMIC KNOWLEDGE GRAPH
    # ==========================================
    def add_graph_edge(
        self,
        project_id: Optional[str],
        source_node: str,
        target_node: str,
        relation_type: str = "RELATED_TO",
        weight: float = 1.0
    ) -> None:
        edge_id = f"edge_{uuid.uuid4().hex[:12]}"
        with self._get_conn() as conn:
            conn.execute("""
                INSERT INTO graph_edges (id, project_id, source_node, target_node, relation_type, weight)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (edge_id, project_id, source_node.strip(), target_node.strip(), relation_type.upper(), weight))

    def get_project_graph(self, project_id: str) -> List[Dict[str, Any]]:
        with self._get_conn() as conn:
            rows = conn.execute("""
                SELECT source_node, relation_type, target_node, weight, created_at
                FROM graph_edges
                WHERE project_id = ?
                ORDER BY created_at DESC LIMIT 100
            """, (project_id,)).fetchall()
            return [dict(r) for r in rows]

    # ==========================================
    # SEARCH, TIMELINE & 3-TIER CONTEXT INJECTION
    # ==========================================
    def search_vault(self, query: str, project_id: Optional[str] = None, limit: int = 10) -> List[Dict[str, Any]]:
        clean_tokens = [re.sub(r"[^a-zA-Z0-9]", "", w) for w in query.split()]
        clean_tokens = [t for t in clean_tokens if len(t) > 1]
        if not clean_tokens:
            return []

        fts_query = " OR ".join(clean_tokens)
        with self._get_conn() as conn:
            if project_id:
                rows = conn.execute("""
                    SELECT i.*, bm25(items_fts) as rank
                    FROM items_fts f
                    JOIN items i ON f.item_id = i.id
                    WHERE items_fts MATCH ? AND i.project_id = ?
                    ORDER BY rank LIMIT ?
                """, (fts_query, project_id, limit)).fetchall()
            else:
                rows = conn.execute("""
                    SELECT i.*, bm25(items_fts) as rank
                    FROM items_fts f
                    JOIN items i ON f.item_id = i.id
                    WHERE items_fts MATCH ?
                    ORDER BY rank LIMIT ?
                """, (fts_query, limit)).fetchall()
            return [dict(r) for r in rows]

    def get_universal_timeline(self, date_prefix: Optional[str] = None, limit: int = 25) -> List[Dict[str, Any]]:
        """Returns chronological work stream across all projects or for a specific date (YYYY-MM-DD)."""
        with self._get_conn() as conn:
            if date_prefix:
                rows = conn.execute("""
                    SELECT i.id, i.item_type, i.title, i.structured_summary, i.source_app, i.captured_at, p.name as project_name
                    FROM items i
                    LEFT JOIN projects p ON i.project_id = p.id
                    WHERE i.captured_at LIKE ?
                    ORDER BY i.captured_at DESC LIMIT ?
                """, (f"{date_prefix}%", limit)).fetchall()
            else:
                rows = conn.execute("""
                    SELECT i.id, i.item_type, i.title, i.structured_summary, i.source_app, i.captured_at, p.name as project_name
                    FROM items i
                    LEFT JOIN projects p ON i.project_id = p.id
                    ORDER BY i.captured_at DESC LIMIT ?
                """, (limit,)).fetchall()
            return [dict(r) for r in rows]

    def build_context_injection_payload(self, project_id: str, active_query: str = "") -> Dict[str, Any]:
        """
        Builds a compact 3-Tier Context Payload (< 2,500 tokens) to prevent LLM context drift.
        """
        project = self.get_project_by_id(project_id)
        if not project:
            return {"error": f"Project {project_id} not found"}

        with self._get_conn() as conn:
            decisions = conn.execute("""
                SELECT title, decision, reasoning, outcome, decided_at
                FROM decisions WHERE project_id = ?
                ORDER BY decided_at DESC LIMIT 8
            """, (project_id,)).fetchall()

            recent_items = conn.execute("""
                SELECT id, item_type, title, structured_summary, visual_description, metadata, captured_at
                FROM items WHERE project_id = ?
                ORDER BY captured_at DESC LIMIT 6
            """, (project_id,)).fetchall()

        relevant_evidence = []
        if active_query:
            hits = self.search_vault(active_query, project_id=project_id, limit=5)
            for h in hits:
                relevant_evidence.append({
                    "title": h["title"],
                    "type": h["item_type"],
                    "summary": h["structured_summary"] or h["raw_content"][:300],
                    "visual_context": h["visual_description"],
                    "captured_at": h["captured_at"]
                })

        return {
            "project_name": project["name"],
            "tier_1_rolling_memory": project["rolling_summary"] or "Active development project.",
            "tier_2_decision_graph": [dict(d) for d in decisions],
            "tier_3_recent_and_relevant_evidence": relevant_evidence if relevant_evidence else [
                {
                    "title": r["title"],
                    "type": r["item_type"],
                    "summary": r["structured_summary"],
                    "metadata": json.loads(r["metadata"] or "{}"),
                    "captured_at": r["captured_at"]
                } for r in recent_items
            ],
            "knowledge_graph_edges": self.get_project_graph(project_id)[:15]
        }
