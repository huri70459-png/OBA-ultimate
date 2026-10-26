// v2.3 (blueprint "Logging Service Integration") — client error log receiver.
// The browser logger POSTs JSON lines here (fire-and-forget, keepalive); they are
// appended to logs/client.log under the project root with a size-capped rotation.
// No external SaaS in this self-hosted deployment — errors stay on the machine.

import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-dynamic";

const LOG_DIR = join(process.cwd(), "logs");
const LOG_FILE = join(LOG_DIR, "client.log");
const MAX_BYTES = 512 * 1024; // rotate to client.log.old at 512 KB

interface ClientLogEntry {
  ts?: string;
  level?: string;
  message?: string;
  stack?: string;
  source?: string;
}

function appendLine(line: string): void {
  try {
    if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
    if (existsSync(LOG_FILE) && statSync(LOG_FILE).size > MAX_BYTES) {
      renameSync(LOG_FILE, `${LOG_FILE}.old`);
    }
    appendFileSync(LOG_FILE, line + "\n", "utf8");
  } catch {
    // The filesystem is best-effort — never fail a request over logging.
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { entries?: ClientLogEntry[] };
    const entries = Array.isArray(body.entries) ? body.entries.slice(0, 50) : [];
    for (const entry of entries) {
      const safe = {
        ts: String(entry.ts ?? new Date().toISOString()).slice(0, 40),
        level: String(entry.level ?? "error").slice(0, 10),
        message: String(entry.message ?? "").slice(0, 2000),
        stack: entry.stack ? String(entry.stack).slice(0, 4000) : undefined,
        source: entry.source ? String(entry.source).slice(0, 100) : undefined,
      };
      appendLine(JSON.stringify(safe));
    }
    return NextResponse.json({ ok: true, received: entries.length });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
