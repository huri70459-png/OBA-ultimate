// jsonl — shared append-only JSONL store with size-capped rotation.
//
// The blueprint's "Centralized Logging / Custom Metrics" asked for Grafana/ELK;
// in this self-hosted appliance the equivalent contract is structured JSON lines
// on local disk, one file per channel, rotated at a byte cap so nothing grows
// unbounded. Consumers: /api/client-log (errors), /api/metrics (telemetry),
// /api/feedback (user feedback loop).

import { appendFileSync, existsSync, mkdirSync, readFileSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";

const LOG_DIR = join(process.cwd(), "logs");
export const MAX_BYTES = 512 * 1024; // rotate to <file>.old at 512 KB

function ensureDir(): void {
  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
}

/** Appends one JSON line to <name> under logs/, rotating to <name>.old at the cap. */
export function appendJsonl(name: string, obj: unknown): void {
  try {
    ensureDir();
    const file = join(LOG_DIR, name);
    if (existsSync(file) && statSync(file).size > MAX_BYTES) {
      renameSync(file, `${file}.old`);
    }
    appendFileSync(file, JSON.stringify(obj) + "\n", "utf8");
  } catch {
    // Telemetry must never fail a request — best-effort filesystem.
  }
}

/** Reads the last `max` lines of a JSONL file (newest last); [] when missing. */
export function readJsonlTail(name: string, max = 5000): Array<Record<string, unknown>> {
  try {
    const file = join(LOG_DIR, name);
    if (!existsSync(file)) return [];
    const lines = readFileSync(file, "utf8").split("\n").filter((l) => l.trim());
    const tail = lines.slice(-max);
    const out: Array<Record<string, unknown>> = [];
    for (const line of tail) {
      try {
        out.push(JSON.parse(line) as Record<string, unknown>);
      } catch {
        // Skip a torn line (process killed mid-write) — telemetry is lossy by design.
      }
    }
    return out;
  } catch {
    return [];
  }
}

/** Current size in bytes of a channel file (0 when missing). */
export function jsonlBytes(name: string): number {
  try {
    const file = join(LOG_DIR, name);
    return existsSync(file) ? statSync(file).size : 0;
  } catch {
    return 0;
  }
}
