# Project Brain OS User Guide

## 1. What this app is

Project Brain OS is a local-first knowledge workspace for capturing what you see, decide, and build. It organizes notes, terminal errors, screenshots, decisions, project files, and work sessions into searchable project memory.

The core loop is:

1. Select a project.
2. Capture information or scan safe project files.
3. Review and edit the resulting Markdown evidence.
4. Record decisions and verify fixes.
5. Compress the session into project memory.
6. Ask grounded questions or inject context into another AI workflow.

## 2. Features and benefits

- Dashboard: workspace health, counts, recent activity, and quick actions.
- Project Spaces: isolate knowledge by repository or workstream.
- Zero-Save Capture: quickly submit notes, errors, terminal output, or screenshots.
- Scan Project Files: explicitly index supported text/code files from a project root.
- Automatic indexing: optional per-project rescans every 30 seconds while the app is open.
- Vault & Markdown Editor: inspect and edit durable notes.
- Timeline: understand what happened and when.
- Decision Graph: connect evidence, decisions, fixes, and projects.
- Context Injector: build structured, evidence-backed prompts.
- Grounded Chat: answer from indexed evidence and expose the evidence boundary.
- Memory Compression: summarize work sessions and identify knowledge gaps.
- Privacy Guard: block or redact sensitive content before persistence.
- Self-Test: run the built-in workflow diagnostics.

## 3. Detailed daily workflow

### Start a project

Select an existing project in the left sidebar or choose `New`. Set the project name and root path. For a repository, use its absolute local path.

### Import an existing repository

1. Select the project.
2. Choose `Scan Project Files` on the Dashboard.
3. Review the imported, unchanged, skipped, and error counts.
4. Open the Vault to inspect the imported evidence.
5. Enable automatic rescanning only if the repository is safe to index continuously.

The scanner supports common Markdown, text, TypeScript, JavaScript, Python, JSON, YAML, SQL, shell, CSS, and HTML files. It skips secrets, `.git`, `node_modules`, build/cache folders, binaries, archives, databases, and files over 512 KB.

### Capture a note or error

Choose `Zero-Save Capture` or press `Alt+S`. Paste the content, choose a type, and submit. The router uses the active path, title, content, project keywords, and Git remotes to choose a project. Low-confidence captures go to Inbox.

### Record a decision

Choose `Log Decision`. State the decision, reason, alternatives, and expected outcome. Decisions become graph nodes and are included in context injection.

### Review and close the loop

Open `Vault & Markdown Editor`, inspect the item, edit if needed, and use triage/resolve/verify controls for fixes. A suggested fix is not considered verified until you explicitly mark its outcome.

### Compress memory

Run `Compress Memory` after a meaningful work session. It creates a rolling summary, work-session replay, and knowledge-gap report. Compression is not a replacement for recording important decisions explicitly.

### Ask grounded questions

Use Grounded Chat from the Dashboard. Ask questions about captured evidence. In offline mode, the app returns the closest evidence list rather than pretending to have a generated answer.

## 4. Customization

- Theme: use the sun/moon control.
- Language: choose EN or 中文.
- AI backend: open the backend badge/settings control and configure Offline, Ollama, or a compatible cloud provider.
- Deduplication: tune the duplicate window in Settings.
- Agent capture: create/configure an ingest token, then use the desktop agent or MCP server.
- Project routing: add project keywords and Git remotes when creating or editing a project.
- Automatic indexing: enable it per project from the Dashboard; it remains disabled by default.

## 5. Privacy and data boundaries

The app writes to SQLite and the local `ProjectBrainVault` directory. Captures pass through privacy validation and redaction. Do not enable automatic indexing for folders containing secrets or personal files. The scanner never edits or deletes source files.

## 6. Troubleshooting

- App not loading: check `http://127.0.0.1:3001/api/health` or the port used by your launch command.
- Project empty: verify its root path and run `Scan Project Files`.
- Scan skips files: inspect the skipped-file reasons; unsupported, secret-looking, ignored, and oversized files are intentional.
- Chat has no answer: capture or scan supporting evidence first.
- Data looks stale: reload the project or run a scan; disk sync only applies to Brain OS vault Markdown records.
- Run `Self-Test` before reporting a product regression.

