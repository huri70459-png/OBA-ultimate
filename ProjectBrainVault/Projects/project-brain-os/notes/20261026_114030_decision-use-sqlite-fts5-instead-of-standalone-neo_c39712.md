---
id: item_412989c39712
type: note
project: Project Brain OS
source_app: Workspace Editor
source_url: 
captured_at: 2026-10-26T11:40:30.472Z
---

# Decision: Use SQLite + FTS5 instead of standalone Neo4j server

> **AI Summary:** [reasoning-architect] Decision: Use SQLite + FTS5 instead of standalone Neo4j server Alternatives: Neo4j Desktop, Docker Postgres

> **Visual Context:** Visual capture from 'architecture.md - Project Brain OS'

## Content
Decision: Use SQLite + FTS5 instead of standalone Neo4j server
Alternatives: Neo4j Desktop, Docker Postgres
Reason: Keeps Project Brain OS dependency-light and portable with zero external DB daemons.
