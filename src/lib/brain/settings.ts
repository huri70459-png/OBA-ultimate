// Project Brain OS — v2.2 Runtime Settings Store
//
// A tiny key/value configuration layer persisted in SQLite (Prisma Setting model) so
// the AI backend, dedup window, and agent ingest token can be tuned at runtime from
// the UI — no server restart or redeploy required.
//
// Precedence rules used across the engine:
//   - Secrets/URLs:  DB setting (non-empty)  ->  environment variable  ->  built-in default
//   - dedup window:  DEDUP_WINDOW_HOURS env  ->  DB setting         ->  36 (v2.1 default)
//   - provider:      DB setting llm_provider ->  auto-detect chain (env-key based)
//
// Secrets are never returned in plaintext by the API — `maskSecret()` renders a
// "sk-…abcd" preview plus a `configured` flag instead.

import { db } from "@/lib/db";

export const SETTING_KEYS = [
  "llm_provider",
  "ollama_url",
  "ollama_model",
  "openai_api_key",
  "anthropic_api_key",
  "gemini_api_key",
  "openai_base_url",
  "anthropic_base_url",
  "gemini_base_url",
  "llm_timeout_seconds",
  "dedup_window_hours",
  "agent_ingest_token",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];
export type SettingMap = Partial<Record<SettingKey, string>>;

/** Sentinel accepted by writeSettings to clear a stored value from the UI. */
export const CLEAR_SENTINEL = "__clear__";

/**
 * Reads every stored setting (the table holds ~a dozen rows, so a fresh findMany is
 * sub-millisecond). Deliberately NOT memoized: route bundles hold separate module
 * instances in dev, and a cross-instance cache made a just-saved API key invisible
 * to other routes for up to TTL milliseconds — unacceptable for auth + LLM wiring.
 * If read volume ever matters, re-introduce a request-scoped cache instead.
 */
export async function readSettings(): Promise<SettingMap> {
  const rows = await db.setting.findMany();
  const map: SettingMap = {};
  for (const row of rows) {
    if (SETTING_KEYS.includes(row.key as SettingKey) && row.value !== "") {
      map[row.key as SettingKey] = row.value;
    }
  }
  return map;
}

/** Reads a single setting; empty string when unset. */
export async function readSetting(key: SettingKey): Promise<string> {
  const map = await readSettings();
  return map[key] ?? "";
}

/** Upserts settings. Callers own downstream invalidation (e.g.
 *  llmBridge.invalidateRuntimeConfig()) so this module stays import-cycle free. */
export async function writeSettings(patch: SettingMap): Promise<string[]> {
  const written: string[] = [];
  for (const [key, value] of Object.entries(patch)) {
    if (!SETTING_KEYS.includes(key as SettingKey)) continue;
    const finalValue = value === CLEAR_SENTINEL ? "" : (value ?? "");
    await db.setting.upsert({
      where: { key },
      create: { key, value: finalValue },
      update: { value: finalValue },
    });
    written.push(key);
  }
  return written;
}

/** "sk-proj-1234567890abcd" -> "sk-…abcd"; empty values stay empty. */
export function maskSecret(value: string | undefined | null): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  if (v.length <= 8) return `${v.slice(0, 2)}…`;
  return `${v.slice(0, 3)}…${v.slice(-4)}`;
}

/** Environment fallback for a setting (used by the bridge + config readback). */
export function envFallback(key: SettingKey): string {
  switch (key) {
    case "openai_api_key":
      return process.env.OPENAI_API_KEY || "";
    case "anthropic_api_key":
      return process.env.ANTHROPIC_API_KEY || "";
    case "gemini_api_key":
      return process.env.GEMINI_API_KEY || "";
    case "openai_base_url":
      return process.env.OPENAI_BASE_URL || "";
    case "anthropic_base_url":
      return process.env.ANTHROPIC_BASE_URL || "";
    case "gemini_base_url":
      return process.env.GEMINI_BASE_URL || "";
    case "ollama_url":
      return process.env.OLLAMA_URL || "";
    case "agent_ingest_token":
      return process.env.BRAIN_INGEST_TOKEN || "";
    default:
      return "";
  }
}

/** Effective value = stored setting, else its environment fallback. */
export async function effectiveSetting(key: SettingKey): Promise<string> {
  const stored = await readSetting(key);
  if (stored) return stored;
  return envFallback(key);
}

/**
 * v2.2 desktop-agent ingest auth: when a token is configured (DB setting or
 * BRAIN_INGEST_TOKEN env), agents MUST present it via `Authorization: Bearer <t>`
 * or `X-Brain-Token: <t>`. With no token configured the endpoint stays open in
 * trusted mode (mirrors brain_api.py's loopback-only stance for local daemons).
 *
 * Security-critical path: reads the Setting table DIRECTLY (bypasses the 3s read
 * memo) so a token written moments ago is enforced on the very next request —
 * route bundles may hold separate module instances in dev, and a stale cache here
 * would silently downgrade a protected endpoint to trusted mode.
 */
export async function checkAgentToken(provided: string | null): Promise<{ required: boolean; ok: boolean }> {
  const row = await db.setting.findUnique({ where: { key: "agent_ingest_token" } }).catch(() => null);
  const expected = (row?.value || process.env.BRAIN_INGEST_TOKEN || "").trim();
  if (!expected) return { required: false, ok: true };
  return { required: true, ok: (provided ?? "").trim() === expected };
}
