# Project File Indexing Design

## Intent

Allow users to index existing project files into Project Brain OS without silently importing sensitive or irrelevant data. Support both a user-triggered scan and optional background rescans for changed files.

## Goals

- Add a manual `Scan Project Files` action for the selected project.
- Add configurable automatic indexing for file changes.
- Index supported text/code files into the existing capture, search, and graph pipeline.
- Skip secrets, ignored directories, unsupported files, and oversized files.
- Deduplicate by canonical project-relative path and content hash.
- Return imported, skipped, unchanged, and error counts with file-level reasons.

## Non-goals

- Import binary documents, images, databases, or archives in this slice.
- Watch arbitrary folders outside the registered project root.
- Send project files to a live LLM automatically.
- Delete or modify source project files.

## Approaches

- Manual scan only: safest but requires repeated user action.
- Background watcher only: convenient but harder to control and more likely to surprise users.
- Combined explicit scan plus opt-in background indexing: selected because it provides maximum customization while keeping automatic behavior disabled unless the user enables it.

## Proposed behavior

- Default automatic indexing is off.
- Manual scans run only for the selected project and its configured root path.
- Automatic indexing can be enabled per project and uses the same filters and pipeline as manual scans.
- Defaults include Markdown, text, TypeScript/JavaScript, Python, JSON, YAML, SQL, shell, and configuration files.
- Defaults exclude `.git`, `node_modules`, build/cache folders, secret files, environment files, and files over the configured size limit.
- Imported records retain source path, content hash, timestamps, and provenance.
- Existing Brain OS captures remain unchanged; rescans update the corresponding indexed file record rather than creating duplicates.

## Verification

- Unit tests cover filters, path containment, secret exclusion, size limits, and deduplication.
- API/UI tests cover manual scan results and automatic-indexing configuration.
- Runtime verification scans the Cortex repository, confirms counts, searches imported content, and confirms the app health endpoint.
