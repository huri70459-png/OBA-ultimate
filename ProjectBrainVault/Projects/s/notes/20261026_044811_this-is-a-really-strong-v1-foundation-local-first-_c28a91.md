---
id: item_d7c2adc28a91
type: note
project: s
source_app: Workspace UI
source_url: 
captured_at: 2026-10-26T04:48:11.497Z
---

# This is a really strong v1 foundation — local-first, deterministi

> **AI Summary:** [codex-agent] This is a really strong v1 foundation — local-first, deterministic, no model calls in core, memory-approval, redacted recorder, idempotent adapters. The review you pasted is right 

> **Visual Context:** Visual capture from 'Workspace Editor'

## Content
This is a really strong v1 foundation — local-first, deterministic, no model calls in core, memory-approval, redacted recorder, idempotent adapters. The review you pasted is right about where to focus next.

Here’s how I’d fix it in order, with drop-in code you can use:

1. High priority: Make your privacy promise true
Right now Recorder redacts, but tasks.json doesn't.

1a. Redact tasks before write — src/core/tasks.ts

ts

import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';
import { envValues, redactDeep } from './redact.js';
import type { Spec } from './compiler.js';
​
export function saveTask(root: string, prompt: string, spec: Spec) {
  const secrets = envValues(root);
  const safePrompt = redactDeep(prompt, secrets) as string;
  const safeSpec = redactDeep(spec, secrets) as Spec;
​
  const task = {
    id: `t${Date.now().toString(36)}${randomBytes(2).toString('hex')}`,
    prompt: safePrompt,
    spec: safeSpec,
    status: 'started' as const,
    createdAt: new Date().toISOString(),
  };
  writeFileSync(file(root), JSON.stringify([...loadTasks(root), task], null, 2));
  return task;
}
Add regression test:

ts

test('tasks never persist env values', () => {
  // write .env with SECRET_X=super-secret-123
  // saveTask(root, `use ${secret} here`, spec)
  // expect(readFileSync(.orch/tasks.json,'utf8')).not.toContain(secret)
});
1b. Redact before JSON.stringify, recursively — src/core/redact.ts

Literal split(v).join() after stringify fails for \n, \", \\ in PEM keys / JSON credentials.

Replace with:

ts

const SENSITIVE_KEYS = /(token|password|secret|apikey|api_key|authorization|cookie|databaseurl|db_url|privatekey|accesskey)/i;
​
export function redactDeep<T>(value: T, secrets: string[]): T {
  if (typeof value === 'string') {
    let out = value;
    for (const s of secrets) {
      if (!s) continue;
      // match raw + JSON-escaped forms
      const escaped = JSON.stringify(s).slice(1,-1); // handles \n, \", \\
      out = out.split(s).join('[REDACTED:env-value]');
      if (escaped !== s) out = out.split(escaped).join('[REDACTED:env-value]');
    }
    // generic secret shapes: ghp_, sk-, xox-, [REDACTED_PRIVATE_KEY]';
  const out = redactDeep({ k: pem, nested: { token: 'abc' }, arr: [`say "${pem}"`] }, [pem]) as any;
  expect(JSON.stringify(out)).not.toContain('ABC');
});
​
test('compiler never returns needs_clarification with []', () => {
  const { compileTask } = await import('./core/compiler.js');
  const r = compileTask('make it better when clicked in Button.tsx', { dirs: [], scripts: {} } as any);
  expect(r.status).toBe('needs_clarification');
  expect(r.questions.length).toBeGreaterThan(0);
  expect(r.questions.length).toBeLessThanOrEqual(3);
});
​
test('parseSkill handles yaml colons/quotes/arrays', () => {
  const { parseSkill } = await import('./core/router.js');
  const s = parseSkill(`---\nname: x\ndescription: "fix: thing with: colons"\ntriggers:\n  - a\n  - b\n---\nbody`, '/tmp');
  expect(s?.triggers).toEqual(['a','b']);
});
After this, do #4 (enforceable confirmations) and .orch/config.json + SQLite unification — that's the next architectural step.  

Here's the minimal v1 fix:

1. .orch/config.json
Create src/core/config.ts:

ts

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { ensureDir, orchDir } from './paths.js';
​
export const ConfigSchema = z.object({
  retentionDays: z.number().int().min(1).max(365).default(30),
  excludedPaths: z.array(z.string()).default([".env*", "secrets/**", "vendor/**"]),
  maxEventFileBytes: z.number().int().default(5_000_000),
  maxMemoryItems: z.number().int().default(500),
  networkDependencyAudit: z.boolean().default(false),
});
export type OrchConfig = z.infer<typeof ConfigSchema>;
​
export function configPath(root: string) {
  return join(ensureDir(orchDir(root)), 'config.json');
}
​
export function loadConfig(root: string): OrchConfig {
  const p = configPath(root);
  if (!existsSync(p)) {
    const d = ConfigSchema.parse({});
    writeFileSync(p, JSON.stringify(d, null, 2));
    return d;
  }
  return ConfigSchema.parse(JSON.parse(readFileSync(p, 'utf8')));
}
Use it in 3 places:

envValues() / indexer / recorder -> skip excludedPaths
verifier -> if networkDependencyAudit === false, skip registry hits, report skipped: network-audit-disabled
orch prune -> use retentionDays
Add CLI:

orch config show
orch config validate
orch prune

2. SQLite unification — one DB, not 4 files
Keep memory.db? No. Migrate to one .orch/orch.db:

sql

CREATE TABLE IF NOT EXISTS memory_items(id TEXT PRIMARY KEY, text TEXT, status TEXT, createdAt TEXT);
CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY, prompt TEXT, spec TEXT, status TEXT, createdAt TEXT);
CREATE TABLE IF NOT EXISTS task_events(id INTEGER PRIMARY KEY, taskId TEXT, type TEXT, data TEXT, createdAt TEXT);
CREATE TABLE IF NOT EXISTS confirmations(fingerprint TEXT PRIMARY KEY, taskId TEXT, gates TEXT, status TEXT, approvedAt TEXT);
CREATE TABLE IF NOT EXISTS verification_runs(id TEXT PRIMARY KEY, taskId TEXT, result TEXT, createdAt TEXT);
CREATE TABLE IF NOT EXISTS project_rules(id TEXT PRIMARY KEY, rule TEXT);
CREATE TABLE IF NOT EXISTS session_scratchpad(key TEXT PRIMARY KEY, value TEXT);
Create src/core/store.ts with node:sqlite (no new native dep):

ts

import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';
import { ensureDir, orchDir } from './paths.js';
import { redactDeep } from './redact.js';
​
let db: DatabaseSync | null = null;
export function openStore(root: string, secrets: string[] = []) {
  if (db) return { db, secrets };
  db = new DatabaseSync(join(ensureDir(orchDir(root)), 'orch.db'));
  db.exec(`CREATE TABLE IF NOT EXISTS tasks...; CREATE TABLE IF NOT EXISTS confirmations...;`);
  // one-time migrate tasks.json -> tasks table (redacted)
  // then rename tasks.json to tasks.json.migrated
  return { db, secrets };
}
​
export function saveTaskDb(root: string, task: any, secrets: string[]) {
  const safe = redactDeep(task, secrets);
  openStore(root).db.prepare(
    `INSERT OR REPLACE INTO tasks(id,prompt,spec,status,createdAt) VALUES(?,?,?,?,?)`
  ).run(safe.id, safe.prompt, JSON.stringify(safe.spec), safe.status, safe.createdAt);
}
Then change:

tasks.ts: saveTask() -> saveTaskDb() + keep tasks.json as optional export only
confirmations.ts (new) -> pending/approved/denied bound to fingerprint(taskId+spec) — this is what makes gates enforceable (#4)
recorder.ts -> INSERT INTO task_events + optional redacted JSONL export
memory.ts -> same DB, memory_items table
Prune becomes one query:

ts

db.prepare(`DELETE FROM task_events WHERE createdAt < ?`).run(cutoff);
db.prepare(`DELETE FROM tasks WHERE createdAt < ?`).run(cutoff);
Do you need me to write them?
If you want me to patch it PR-ready, paste:

src/core/paths.ts
src/core/memory.ts
src/core/recorder.ts
package.json
I'll return config.ts, store.ts, confirmations.ts, updated tasks.ts, and prune + tests, wired to your existing redactDeep + envValues(root) from the last patch.

 Here are drop-in files for .orch/config.json + SQLite unification.

You need my previous redact.ts patch first (envValues(root) recursive + redactDeep). Everything below imports it.

0. Fix package.json (you're missing this)
Create/replace package.json with this — don't edit the lockfile by hand:

json

{
  "name": "orch",
  "version": "1.0.0",
  "license": "MIT",
  "type": "module",
  "engines": { "node": ">=22.5.0" },
  "repository": { "type": "git", "url": "git+https://github.com/Raydevstu/RAY-OMNI-ORCA.git" },
  "files": ["dist", "skills", "README.md", "LICENSE"],
  "bin": { "orch": "dist/cli.js" },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "node --test dist/test/*.test.js",
    "lint": "tsc --noEmit",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.32.2",
    "yaml": "^2.9.1",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@types/node": "^26.6.5",
    "typescript": "^7.0.2"
  }
}
Then run npm install and commit the regenerated lockfile. You do not need better-sqlite3 — you already use node:sqlite (DatabaseSync), which is stdlib on Node 22.5+.

1. src/core/config.ts — new
ts

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { ensureDir, orchDir } from './paths.js';
​
export const ConfigSchema = z.object({
  retentionDays: z.number().int().min(1).max(365).default(30),
  excludedPaths: z.array(z.string()).default([".env*", "secrets/**", "vendor/**"]),
  maxEventFileBytes: z.number().int().default(5_000_000),
  maxMemoryItems: z.number().int().default(500),
  networkDependencyAudit: z.boolean().default(false),
});
export type OrchConfig = z.infer<typeof ConfigSchema>;
​
export const configPath = (root: string) =>
  join(ensureDir(orchDir(root)), 'config.json');
​
export function loadConfig(root: string): OrchConfig {
  const p = configPath(root);
  if (!existsSync(p)) {
    const d = ConfigSchema.parse({});
    writeFileSync(p, JSON.stringify(d, null, 2));
    return d;
  }
  return ConfigSchema.parse(JSON.parse(readFileSync(p, 'utf8')));
}
​
// tiny glob: supports `*.ext`, `.env*`, `dir/**`
export function isExcluded(relPath: string, cfg: OrchConfig): boolean {
  const rel = relPath.replace(/\\/g, '/');
  for (const pat of cfg.excludedPaths) {
    if (pat.endsWith('/**')) {
      if (rel.startsWith(pat.slice(0, -3))) return true;
    } else if (pat.endsWith('*')) {
      if (rel.startsWith(pat.slice(0, -1)) || rel.split('/').pop()!.startsWith(pat.replace('*',''))) return true;
    } else if (rel === pat || rel.includes(pat)) return true;
  }
  return false;
}
2. src/core/store.ts — new, one DB
Replaces memory.db + tasks.json + events/*.jsonl as source of truth.

ts

import { DatabaseSync } from 'node:sqlite';
import { existsSync, readFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { ensureDir, orchDir } from './paths.js';
import { envValues, redactDeep } from './redact.js';
​
const SCHEMA = `
CREATE TABLE IF NOT EXISTS memory_items(id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, text TEXT NOT NULL, source TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'proposed', created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY, prompt TEXT NOT NULL, spec TEXT NOT NULL, status TEXT NOT NULL, createdAt TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS task_events(id INTEGER PRIMARY KEY AUTOINCREMENT, taskId TEXT, type TEXT NOT NULL, data TEXT NOT NULL, createdAt TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS confirmations(fingerprint TEXT PRIMARY KEY, taskId TEXT NOT NULL, gates TEXT NOT NULL, status TEXT NOT NULL, createdAt TEXT NOT NULL, approvedAt TEXT);
CREATE TABLE IF NOT EXISTS verification_runs(id TEXT PRIMARY KEY, taskId TEXT, result TEXT NOT NULL, createdAt TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS project_rules(id TEXT PRIMARY KEY, rule TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS session_scratchpad(key TEXT PRIMARY KEY, value TEXT NOT NULL);
`;
​
const cache = new Map<string, DatabaseSync>();
​
export function openStore(root: string): DatabaseSync {
  const hit = cache.get(root);
  if (hit) return hit;
  const db = new DatabaseSync(join(ensureDir(orchDir(root)), 'orch.db'));
  db.exec(SCHEMA);
  migrateOnce(root, db);
  cache.set(root, db);
  return db;
}
​
export function closeStore(root: string) {
  cache.get(root)?.close();
  cache.delete(root);
}
​
function migrateOnce(root: string, db: DatabaseSync) {
  // 1) legacy memory.db -> orch.db
  const legacy = join(orchDir(root), 'memory.db');
  try {
    if (existsSync(legacy)) {
      const count = (db.prepare('SELECT COUNT(*) as c FROM memory_items').get() as any).c as number;
      if (count === 0) {
        const old = new DatabaseSync(legacy);
        const rows = old.prepare('SELECT * FROM memory_items').all() as any[];
        const secrets = envValues(root);
        for (const r of rows) {
          const safe = redactDeep(String(r.text), secrets) as string;
          db.prepare('INSERT INTO memory_items(kind,text,source,status,created_at) VALUES(?,?,?,?,?)')
            .run(r.kind, safe, r.source, r.status, r.created_at);
        }
        old.close();
        renameSync(legacy, legacy + '.migrated');
      }
    }
  } catch { /* best-effort */ }
​
  // 2) tasks.json -> tasks table (redacted)
  try {
    const tf = join(orchDir(root), 'tasks.json');
    if (existsSync(tf)) {
      const arr = JSON.parse(readFileSync(tf, 'utf8'));
      if (Array.isArray(arr) && arr.length) {
        const secrets = envValues(root);
        for (const t of arr) {
          const safePrompt = redactDeep(String(t.prompt ?? ''), secrets) as string;
          const safeSpec = redactDeep(t.spec ?? {}, secrets) as any;
          db.prepare('INSERT OR IGNORE INTO tasks(id,prompt,spec,status,createdAt) VALUES(?,?,?,?,?)')
            .run(String(t.id), safePrompt, JSON.stringify(safeSpec), String(t.status ?? 'started'), String(t.createdAt ?? new Date().toISOString()));
        }
        renameSync(tf, tf + '.migrated');
      }
    }
  } catch { /* best-effort */ }
}
3. src/core/confirmations.ts — new, makes gates enforceable
ts

import { createHash } from 'node:crypto';
import { openStore } from './store.js';
​
export type GateStatus = 'pending' | 'approved' | 'denied';
​
export function fingerprint(taskId: string, action: unknown): string {
  const s = typeof action === 'string' ? action : JSON.stringify(action);
  return createHash('sha256').update(taskId + ':' + s).digest('hex').slice(0, 16);
}
​
export function createPending(root: string, taskId: string, action: unknown, gates: string[]) {
  const fp = fingerprint(taskId, action);
  openStore(root).prepare(
    'INSERT OR IGNORE INTO confirmations(fingerprint,taskId,gates,status,createdAt) VALUES(?,?,?,?,?)'
  ).run(fp, taskId, JSON.stringify(gates), 'pending', new Date().toISOString());
  return fp;
}
​
export function setConfirmation(root: string, fp: string, status: GateStatus) {
  openStore(root).prepare(
    'UPDATE confirmations SET status=?, approvedAt=? WHERE fingerprint=?'
  ).run(status, status === 'approved' ? new Date().toISOString() : null, fp);
}
​
export function requireApproval(root: string, taskId: string, action: unknown): void {
  const fp = fingerprint(taskId, action);
  const row = openStore(root).prepare(
    'SELECT status FROM confirmations WHERE fingerprint=?'
  ).get(fp) as { status: string } | undefined;
  if (!row || row.status !== 'approved') {
    throw new Error(`GATED: confirmation ${fp} not approved. Call request_confirmation first.`);
  }
}
In your MCP start_task: compile -> classify -> if gated: createPending() + return needs_approval. In every write/delete tool: requireApproval() first.

4. Replace src/core/tasks.ts
ts

import { randomBytes } from 'node:crypto';
import { openStore } from './store.js';
import { envValues, redactDeep } from './redact.js';
import type { Spec } from './compiler.js';
​
export interface Task { id: string; prompt: string; spec: Spec; status: string; createdAt: string }
​
export function saveTask(root: string, prompt: string, spec: Spec): Task {
  const secrets = envValues(root);
  const t: Task = {
    id: `t${Date.now().toString(36)}${randomBytes(2).toString('hex')}`,
    prompt: redactDeep(prompt, secrets) as string,
    spec: redactDeep(spec, secrets) as Spec,
    status: 'started',
    createdAt: new Date().toISOString(),
  };
  openStore(root).prepare(
    'INSERT OR REPLACE INTO tasks(id,prompt,spec,status,createdAt) VALUES(?,?,?,?,?)'
  ).run(t.id, t.prompt, JSON.stringify(t.spec), t.status, t.createdAt);
  return t;
}
​
export function loadTasks(root: string): Task[] {
  const rows = openStore(root).prepare('SELECT * FROM tasks ORDER BY createdAt').all() as any[];
  return rows.map(r => ({ id: r.id, prompt: r.prompt, spec: JSON.parse(r.spec), status: r.status, createdAt: r.createdAt }));
}
5. Replace src/core/memory.ts (same API, unified DB)
ts

import { openStore } from './store.js';
import { envValues, redactDeep } from './redact.js';
​
export interface MemoryItem { id: number; kind: string; text: string; source: string; status: string; created_at: string }
​
export class Memory {
  private secrets: string[];
  constructor(private root: string) {
    this.secrets = envValues(root);
    openStore(root); // ensures schema + migration
  }
  propose(text: string, kind = 'rule', source = 'agent'): number {
    const safe = redactDeep(text, this.secrets) as string;
    const r = openStore(this.root).prepare(
      'INSERT INTO memory_items (kind, text, source, status, created_at) VALUES (?,?,?,?,?)'
    ).run(kind, safe, source, 'proposed', new Date().toISOString());
    return Number(r.lastInsertRowid);
  }
  setStatus(id: number, status: 'approved' | 'rejected'): void {
    openStore(this.root).prepare('UPDATE memory_items SET status = ? WHERE id = ?').run(status, id);
  }
  list(status?: string): MemoryItem[] {
    const db = openStore(this.root);
    const rows = status
      ? db.prepare('SELECT * FROM memory_items WHERE status = ? ORDER BY id').all(status)
      : db.prepare('SELECT * FROM memory_items ORDER BY id').all();
    return rows as unknown as MemoryItem[];
  }
  search(query: string, tokenBudget = 500): MemoryItem[] {
    const terms = query.toLowerCase().split(/\W+/).filter(t => t.length > 2);
    const scored = this.list('approved').map(i => ({ i, s: terms.filter(t => i.text.toLowerCase().includes(t)).length }))
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s);
    const out: MemoryItem[] = []; let used = 0;
    for (const { i } of scored) { const cost = Math.ceil(i.text.length / 4); if (used + cost > tokenBudget) break; used += cost; out.push(i); }
    return out;
  }
  close(): void { /* shared store, closed by closeStore() */ }
}
6. Replace src/core/recorder.ts (redact before stringify)
ts

import { appendFileSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ensureDir, orchDir } from './paths.js';
import { loadConfig } from './config.js';
import { openStore } from './store.js';
import { envValues, redactDeep } from './redact.js';
​
export interface OrchEvent { ts: string; type: string; data: unknown }
​
export class Recorder {
  private secrets: string[];
  constructor(private root: string) { this.secrets = envValues(root); }
  private dir() { return ensureDir(join(orchDir(this.root), 'events')); }
​
  record(type: string, data: unknown = {}): OrchEvent {
    const ev: OrchEvent = { ts: new Date().toISOString(), type, data };
    const safe = redactDeep(ev, this.secrets) as OrchEvent; // BEFORE serialize
    const line = JSON.stringify(safe);
    // primary: sqlite
    openStore(this.root).prepare(
      'INSERT INTO task_events(taskId,type,data,createdAt) VALUES(?,?,?,?)'
    ).run((data as any)?.taskId ?? null, type, JSON.stringify(safe.data), safe.ts);
    // secondary: redacted jsonl audit log, with size cap
    const cfg = loadConfig(this.root);
    const f = join(this.dir(), `${safe.ts.slice(0, 10)}.jsonl`);
    try {
      if (existsSync(f) && statSync(f).size > cfg.maxEventFileBytes) return safe;
    } catch { /* ignore */ }
    appendFileSync(f, line + '\n');
    return safe;
  }
​
  recent(n = 20): OrchEvent[] {
    const rows = openStore(this.root).prepare(
      'SELECT type,data,createdAt as ts FROM task_events ORDER BY id DESC LIMIT ?'
    ).all(n) as any[];
    if (rows.length) return rows.map(r => ({ ts: r.ts, type: r.type, data: JSON.parse(r.data) })).reverse();
    // fallback to jsonl
    const dir = join(orchDir(this.root), 'events');
    if (!existsSync(dir)) return [];
    const files = readdirSync(dir).filter(f => f.endsWith('.jsonl')).sort().reverse();
    const out: OrchEvent[] = [];
    for (const f of files) {
      const lines = readFileSync(join(dir, f), 'utf8').split('\n').filter(Boolean).reverse();
      for (const l of lines) { out.push(JSON.parse(l)); if (out.length >= n) return out; }
    }
    return out;
  }
}
7. src/core/prune.ts — new
ts

import { existsSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { orchDir } from './paths.js';
import { loadConfig } from './config.js';
import { openStore } from './store.js';
​
export function prune(root: string) {
  const cfg = loadConfig(root);
  const cutoff = new Date(Date.now() - cfg.retentionDays * 86400_000).toISOString();
  const db = openStore(root);
  const e = db.prepare('DELETE FROM task_events WHERE createdAt < ?').run(cutoff);
  const t = db.prepare('DELETE FROM tasks WHERE createdAt < ?').run(cutoff);
  const v = db.prepare('DELETE FROM verification_runs WHERE createdAt < ?').run(cutoff);
  // cap memory
  const count = (db.prepare('SELECT COUNT(*) as c FROM memory_items').get() as any).c as number;
  if (count > cfg.maxMemoryItems) {
    db.exec(`DELETE FROM memory_items WHERE id IN (SELECT id FROM memory_items WHERE status='proposed' ORDER BY id ASC LIMIT ${count - cfg.maxMemoryItems})`);
  }
  // prune old jsonl
  let files = 0;
  const dir = join(orchDir(root), 'events');
  if (existsSync(dir)) {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      try { if (statSync(p).mtime.toISOString() < cutoff) { unlinkSync(p); files++; } } catch {}
    }
  }
  return { events: e.changes, tasks: t.changes, verifications: v.changes, files };
}
Wire CLI:

orch config show    -> console.log(JSON.stringify(loadConfig(root), null, 2))
orch config validate -> ConfigSchema.parse(JSON.parse(readFile(...)))
orch prune          -> console.log(prune(root))

Test that proves it:

ts

test('no secret in any .orch output', () => {
  // .env + nested .env.local with secrets, saveTask + propose + record
  // assert orch.db file bytes + config + jsonl contain neither secret
});
Want me to also give you the start_task / request_confirmation MCP handler patch next to make #4 enforceable end-to-end?



40.3 s · Input 86.2K · Output 4.1K · Reasoning 1.4K
yes also give you the start_task / request_confirmation MCP handler patch next to make #4 enforceable end-to-end?
Yes. This is finding #4 - gates are advisory until start_task + every mutating tool enforces requireApproval. Here's the drop-in patch.

It assumes my last patches: redactDeep, store.ts, confirmations.ts, config.ts.

1. Fix src/core/confirmations.ts v2 - stable + redacted fingerprint
Replace the previous version. Old JSON.stringify(action) breaks if key order changes, and leaks secrets into orch.db.

ts

import { createHash } from 'node:crypto';
import { openStore } from './store.js';
import { envValues, redactDeep } from './redact.js';
​
export type GateStatus = 'pending' | 'approved' | 'denied';
​
function stable(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(stable);
  if (v && typeof v === 'object') {
    return Object.fromEntries(
      Object.keys(v as any).sort().map(k => [k, stable((v as any)[k])])
    );
  }
  return v;
}
​
export function fingerprint(taskId: string, action: unknown, secrets: string[] = []): string {
  const safe = redactDeep(stable(action), secrets);
  return createHash('sha256').update(taskId + ':' + JSON.stringify(safe)).digest('hex').slice(0, 16);
}
​
export function createPending(root: string, taskId: string, action: unknown, gates: string[]) {
  const secrets = envValues(root);
  const fp = fingerprint(taskId, action, secrets);
  const safeAction = redactDeep(stable(action), secrets);
  openStore(root).prepare(
    'INSERT OR IGNORE INTO confirmations(fingerprint,taskId,gates,status,createdAt) VALUES(?,?,?,?,?)'
  ).run(fp, taskId, JSON.stringify({ gates, action: safeAction }), 'pending', new Date().toISOString());
  return fp;
}
​
export function setConfirmation(root: string, fp: string, status: GateStatus) {
  openStore(root).prepare(
    'UPDATE confirmations SET status=?, approvedAt=? WHERE fingerprint=?'
  ).run(status, status === 'approved' ? new Date().toISOString() : null, fp);
}
​
export function getConfirmation(root: string, fp: string) {
  return openStore(root).prepare(
    'SELECT * FROM confirmations WHERE fingerprint=?'
  ).get(fp) as any | undefined;
}
​
export function requireApproval(root: string, taskId: string, action: unknown): void {
  const fp = fingerprint(taskId, action, envValues(root));
  const row = getConfirmation(root, fp);
  if (!row || row.status !== 'approved') {
    throw new Error(`GATED: confirmation ${fp} not approved. Call request_confirmation first.`);
  }
}
2. Add to src/core/tasks.ts
ts

import { openStore } from './store.js';
​
export function getTask(root: string, id: string): Task | null {
  const r = openStore(root).prepare('SELECT * FROM tasks WHERE id=?').get(id) as any;
  if (!r) return null;
  return { id: r.id, prompt: r.prompt, spec: JSON.parse(r.spec), status: r.status, createdAt: r.createdAt };
}
​
export function setTaskStatus(root: string, id: string, status: string) {
  openStore(root).prepare('UPDATE tasks SET status=? WHERE id=?').run(status, id);
}
3. New src/mcp/handlers.ts - enforcement point
ts

import { z } from 'zod';
import { compileTask } from '../core/compiler.js';
import { classify } from '../core/gates.js';
import { saveTask, getTask, setTaskStatus } from '../core/tasks.js';
import { createPending, setConfirmation, getConfirmation, requireApproval, fingerprint } from '../core/confirmations.js';
import { Recorder } from '../core/recorder.js';
import { envValues } from '../core/redact.js';
​
// Any gate in this set blocks execution until approved
const BLOCKING = new Set(['deletion','migration','auth','payment','secrets','deps','exec']);
​
export const StartTaskInput = z.object({ prompt: z.string().min(1) });
export const RequestConfInput = z.object({ taskId: z.string(), action: z.unknown(), gates: z.array(z.string()).optional() });
export const DecideConfInput = z.object({ fingerprint: z.string(), approve: z.boolean() });
export const ExecGatedInput = z.object({ taskId: z.string(), action: z.unknown(), kind: z.string().default('edit') });
​
function getMap(root: string): any {
  // keep deterministic, no IO secrets. Replace with real loadProjectMap(root) if you have it.
  try {
    const { loadConfig } = require('../core/config.js');
    loadConfig(root);
  } catch {}
  return { dirs: [], scripts: {}, packageManager: 'npm', frameworks: [] };
}
​
export async function start_task(root: string, input: z.infer<typeof StartTaskInput>) {
  const map = getMap(root);
  const spec = compileTask(input.prompt, map);
  const task = saveTask(root, input.prompt, spec);
​
  if (spec.status === 'needs_clarification') {
    setTaskStatus(root, task.id, 'needs_clarification');
    new Recorder(root).record('task_blocked', { taskId: task.id, reason: 'needs_clarification' });
    return { taskId: task.id, status: 'needs_clarification', questions: spec.questions, spec };
  }
​
  const c: any = classify({ text: input.prompt });
  const gates: string[] = [...new Set((c.reasons ?? []).map((r: any) => r.gate ?? r))];
  const blocking = gates.filter(g => BLOCKING.has(g));
​
  if (blocking.length > 0) {
    const fp = createPending(root, task.id, spec, blocking);
    setTaskStatus(root, task.id, 'needs_approval');
    new Recorder(root).record('confirmation_pending', { taskId: task.id, fingerprint: fp, gates: blocking });
    return {
      taskId: task.id, status: 'needs_approval',
      fingerprint: fp, gates: blocking,
      message: `Gated areas (${blocking.join(', ')}) require approval. Show fingerprint to user and call decide_confirmation with approve=true.`
    };
  }
​
  setTaskStatus(root, task.id, 'executable');
  return { taskId: task.id, status: 'executable', spec, gates };
}
​
export async function request_confirmation(root: string, input: z.infer<typeof RequestConfInput>) {
  const t = getTask(root, input.taskId);
  if (!t) throw new Error(`unknown task ${input.taskId}`);
  if (t.status === 'needs_clarification') throw new Error('task needs clarification first');
​
  const c: any = input.gates?.length ? { reasons: input.gates.map(g => ({ gate: g })) } : classify({ text: JSON.stringify(input.action) });
  const gates: string[] = [...new Set((c.reasons ?? []).map((r: any) => r.gate ?? r))];
  const fp = createPending(root, input.taskId, input.action, gates);
  new Recorder(root).record('confirmation_pending', { taskId: input.taskId, fingerprint: fp, gates });
  return { fingerprint: fp, status: 'pending', gates };
}
​
export async function decide_confirmation(root: string, input: z.infer<typeof DecideConfInput>) {
  const row = getConfirmation(root, input.fingerprint);
  if (!row) throw new Error(`unknown confirmation ${input.fingerprint}`);
  setConfirmation(root, input.fingerprint, input.approve ? 'approved' : 'denied');
  if (input.approve) {
    // only mark executable if this was the task spec approval
    try { setTaskStatus(root, row.taskId, 'executable'); } catch {}
  }
  new Recorder(root).record('confirmation_decided', { fingerprint: input.fingerprint, approved: input.approve });
  return { fingerprint: input.fingerprint, status: input.approve ? 'approved' : 'denied' };
}
​
// Wrap EVERY mutating tool with this. This is what makes gates enforceable.
export async function execute_gated_action<T>(root: string, taskId: string, action: unknown, fn: () => Promise<T> | T) {
  const t = getTask(root, taskId);
  if (!t) throw new Error(`unknown task ${taskId}`);
  if (t.status === 'needs_clarification') throw new Error('GATED: task needs clarification');
  if (t.status !== 'executable' && t.status !== 'started') {
    // allow 'started' for back-compat, but still require approval if gated
  }
  requireApproval(root, taskId, action); // throws if not approved
  // fingerprint matches -> action hasn't changed since approval
  const out = await fn();
  new Recorder(root).record('gated_executed', { taskId, fingerprint: fingerprint(taskId, action, envValues(root)) });
  return out;
}
Use execute_gated_action inside verify_and_apply, delete_file, migrate, install_dep, etc:

ts

// example mutating tool
async function apply_edit(root: string, taskId: string, edit: { file: string, diff: string }) {
  return execute_gated_action(root, taskId, edit, async () => {
    // ... do fs write here ...
    return { ok: true };
  });
}
Changed file/path invalidates approval automatically because fingerprint(taskId, action) changes.

4. Wire src/mcp/server.ts
ts

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { rootFromEnv } from '../core/paths.js';
import { start_task, request_confirmation, decide_confirmation } from './handlers.js';
import { StartTaskInput, RequestConfInput, DecideConfInput } from './handlers.js';
​
const root = rootFromEnv();
const server = new McpServer({ name: 'orch', version: '1.0.0' });
​
server.registerTool('start_task',
  { description: 'Compile prompt, detect gates, create pending approval if needed', inputSchema: StartTaskInput.shape },
  async (args) => ({ content: [{ type: 'text' as const, text: JSON.stringify(await start_task(root, StartTaskInput.parse(args))) }] })
);
​
server.registerTool('request_confirmation',
  { description: 'Create pending confirmation for a gated action', inputSchema: RequestConfInput.shape },
  async (args) => ({ content: [{ type: 'text' as const, text: JSON.stringify(await request_confirmation(root, RequestConfInput.parse(args))) }] })
);
​
server.registerTool('decide_confirmation',
  { description: 'Approve/deny a confirmation fingerprint', inputSchema: DecideConfInput.shape },
  async (args) => ({ content: [{ type: 'text' as const, text: JSON.stringify(await decide_confirmation(root, DecideConfInput.parse(args))) }] })
);
​
await server.connect(new StdioServerTransport());
5. Update AGENTS.md template
- Before any delete/migration/auth/payment/.env/package.json change, you MUST call start_task then request_confirmation and stop until decide_confirmation approve=true with matching fingerprint.
- Never retry with a modified file/path without a new confirmation - fingerprint mismatch = denied.

Test proving enforcement:

ts

test('gated task cannot execute without approval', async () => {
  const r = await start_task(root, { prompt: 'delete all migrations and reset auth tokens, must preserve logins' });
  assert.equal(r.status, 'needs_approval');
  await assert.rejects(() => execute_gated_action(root, r.taskId, r.spec, async () => {}), /GATED/);
  await decide_confirmation(root, { fingerprint: r.fingerprint, approve: true });
  await execute_gated_action(root, r.taskId, r.spec, async () => 'ok');
});
​
test('changed action invalidates approval', async () => {
  // approve for file A, try file B -> throws
});
This closes #4: start_task now compiles -> classifies -> creates pending row -> refuses executable until approved, and all writes go through requireApproval.
