"use client";

// logger — blueprint "Error Handling and Logging", adapted to a self-hosted
// appliance: instead of shipping to Sentry/Datadog (no external SaaS in this
// deployment), errors land in a bounded in-memory ring buffer AND are POSTed to
// /api/client-log, which appends JSON lines to logs/client.log on the server.
//
// installGlobalHandlers() wires window.onerror + window.onunhandledrejection
// (blueprint "Global Error Handling"). Call once from <Providers>.

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  ts: string;
  level: LogLevel;
  message: string;
  stack?: string;
  source?: string;
}

const MAX_BUFFER = 200;
const buffer: LogEntry[] = [];
let installed = false;

function push(entry: LogEntry) {
  buffer.push(entry);
  if (buffer.length > MAX_BUFFER) buffer.shift();
  if (entry.level === "error") void report([entry]);
}

export function getRecentLogs(): readonly LogEntry[] {
  return buffer;
}

/** Fire-and-forget delivery to /api/client-log (keepalive so unload survives). */
export async function report(entries: LogEntry[]): Promise<void> {
  if (typeof window === "undefined" || entries.length === 0) return;
  try {
    await fetch("/api/client-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries: entries.slice(-25) }),
      keepalive: true,
    });
  } catch {
    // Logging must never throw — swallow network failures silently.
  }
}

export const logger = {
  debug(message: string) {
    push({ ts: new Date().toISOString(), level: "debug", message });
  },
  info(message: string) {
    push({ ts: new Date().toISOString(), level: "info", message });
  },
  warn(message: string) {
    push({ ts: new Date().toISOString(), level: "warn", message });
  },
  error(message: string, err?: unknown, source?: string) {
    push({
      ts: new Date().toISOString(),
      level: "error",
      message,
      stack: err instanceof Error ? err.stack : err ? String(err) : undefined,
      source,
    });
  },
};

export function installGlobalHandlers(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    logger.error(event.message || "Uncaught error", event.error, "window.onerror");
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    logger.error(
      `Unhandled promise rejection: ${reason instanceof Error ? reason.message : String(reason)}`,
      reason,
      "window.onunhandledrejection",
    );
  });

  logger.info("Global error handlers installed");
}
