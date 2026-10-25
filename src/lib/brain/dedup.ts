// Project Brain OS — v2.1 Exact Duplicate Folding Engine
// Port of memory_compressor.py v2.1 (find_recent_duplicate / record_duplicate_occurrence).
//
// Deduplication is EXACT-content, project-scoped and time-bounded (default 36h window):
// similar-but-not-identical content is intentionally NOT merged to avoid accidental
// data loss. Folded duplicates never delete the original capture — the item keeps a
// `dedup_fingerprint`, `occurrence_count` and `last_seen_at` in its JSON metadata.
//
// v2.2: the window is tunable at runtime — precedence:
//   DEDUP_WINDOW_HOURS env var  ->  `dedup_window_hours` DB setting  ->  36h default.

import { createHash } from "crypto";
import { db } from "@/lib/db";
import { toItem } from "./store";
import { effectiveSetting } from "./settings";
import type { BrainItem, DuplicateLookupResult, DuplicateMergeResult } from "./types";

export const DEDUP_WINDOW_HOURS_DEFAULT = 36;
const DEDUP_WINDOW_MIN = 1;
const DEDUP_WINDOW_MAX = 24 * 365; // one year is the sane upper bound

/**
 * Resolves the active dedup window in hours at call time (never cached across
 * settings writes): env override wins, then the runtime setting, then 36h.
 * Invalid values fall back to the default instead of throwing.
 */
export async function getDedupWindowHours(): Promise<number> {
  const envRaw = (process.env.DEDUP_WINDOW_HOURS ?? "").trim();
  if (envRaw) return clampWindow(Number(envRaw));
  const settingRaw = (await effectiveSetting("dedup_window_hours")).trim();
  if (settingRaw) return clampWindow(Number(settingRaw));
  return DEDUP_WINDOW_HOURS_DEFAULT;
}

function clampWindow(value: number): number {
  if (!Number.isFinite(value)) return DEDUP_WINDOW_HOURS_DEFAULT;
  return Math.min(DEDUP_WINDOW_MAX, Math.max(DEDUP_WINDOW_MIN, Math.round(value)));
}

/** Normalizes text for exact comparison: CRLF -> LF, trim, lowercase, collapse whitespace. */
export function canonicalizeText(text: string | null | undefined): string {
  const normalized = (text ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim()
    .toLowerCase();
  return normalized.replace(/\s+/g, " ");
}

/**
 * Stable content fingerprint: sha256("<item_type>\0<canonical content>").
 * The item type is part of the canonical form so the same text captured as a note
 * and as a terminal log are NOT duplicates.
 */
export function contentFingerprint(
  rawContent: string | null | undefined,
  itemType: string | null | undefined
): string {
  const canonical = `${(itemType ?? "note").trim().toLowerCase()}\0${canonicalizeText(rawContent)}`;
  return createHash("sha256").update(canonical, "utf-8").digest("hex");
}

function parseMetadata(value: unknown): Record<string, unknown> {
  if (typeof value !== "string") {
    return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  }
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/**
 * Finds the most recent item in the SAME project (or in the Inbox when projectId is
 * null) whose canonical content + item type fingerprint matches, within the time
 * window (default 36 hours). Fingerprints missing from older metadata are computed
 * on the fly so pre-v2.1 items still fold correctly.
 */
export async function findRecentDuplicate(input: {
  rawContent: string;
  itemType?: string;
  projectId?: string | null;
  hours?: number;
}): Promise<DuplicateLookupResult> {
  const { rawContent, itemType = "note", projectId = null } = input;
  // v2.2: fall back to the tunable window (env -> setting -> 36h) when no explicit
  // hours are passed — call sites below now resolve it so the semantics are testable.
  const hours = Math.max(1, input.hours ?? (await getDedupWindowHours()));
  const fingerprint = contentFingerprint(rawContent, itemType);
  const cutoff = new Date(Date.now() - hours * 3600 * 1000);

  const rows = await db.item.findMany({
    where: { projectId: projectId ?? null, capturedAt: { gte: cutoff } },
    orderBy: { capturedAt: "desc" },
    take: 250,
  });

  for (const row of rows) {
    const metadata = parseMetadata(row.metadata);
    const prior = typeof metadata.dedup_fingerprint === "string"
      ? metadata.dedup_fingerprint
      : contentFingerprint(row.rawContent, row.itemType);
    if (prior === fingerprint) {
      return { item: toItem({ ...row, metadata: row.metadata }), fingerprint };
    }
  }
  return { item: null, fingerprint };
}

/**
 * Folds a duplicate capture into the existing item: occurrence_count + 1 and a fresh
 * last_seen_at, without touching the original raw content or captured_at.
 */
export async function recordDuplicateOccurrence(itemId: string): Promise<DuplicateMergeResult> {
  const row = await db.item.findUnique({ where: { id: itemId } });
  if (!row) throw new Error(`Item '${itemId}' not found`);

  const metadata = parseMetadata(row.metadata);
  if (typeof metadata.dedup_fingerprint !== "string") {
    metadata.dedup_fingerprint = contentFingerprint(row.rawContent, row.itemType);
  }
  const nextCount = Math.max(1, Number(metadata.occurrence_count ?? 1)) + 1;
  const lastSeenAt = new Date().toISOString();
  metadata.occurrence_count = nextCount;
  metadata.last_seen_at = lastSeenAt;

  const updated = await db.item.update({
    where: { id: itemId },
    data: { metadata: JSON.stringify(metadata) },
  });

  return {
    item: toItem({ ...updated, metadata: updated.metadata }),
    occurrence_count: nextCount,
    last_seen_at: lastSeenAt,
  };
}

/** Read-side helper for badges: how many times this exact capture was observed. */
export function occurrenceCount(item: BrainItem): number {
  return Math.max(1, Number(item.metadata?.occurrence_count ?? 1));
}
