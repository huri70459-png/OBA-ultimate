// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): provenance primitives.
//
// Derived artifacts (summaries, claims, suggested edges, RAG answers) must be
// able to answer "which items supported this?". These are the serializable
// source-reference primitives every generator will embed starting Phase 3 —
// shipped now so the shape is stable before any consumer exists.

export interface SourceSpan {
  start: number;
  end: number;
}

export interface SourceRef {
  itemId: string;
  span?: SourceSpan;
  note?: string;
}

const MAX_REFS = 64;

function isValidItemId(id: unknown): id is string {
  return typeof id === "string" && id.length >= 3 && id.length <= 128;
}

/** Build a deduplicated, order-preserving source-ref list from item ids. */
export function makeSourceRefs(itemIds: Array<string | null | undefined>): SourceRef[] {
  const seen = new Set<string>();
  const refs: SourceRef[] = [];
  for (const id of itemIds) {
    if (!isValidItemId(id) || seen.has(id)) continue;
    seen.add(id);
    refs.push({ itemId: id });
    if (refs.length >= MAX_REFS) break;
  }
  return refs;
}

/** Compact JSON serialization for metadata/ledger columns. */
export function serializeSourceRefs(refs: SourceRef[]): string {
  return JSON.stringify(refs.slice(0, MAX_REFS));
}

/** Tolerant parser: garbage in -> empty list out (never throws). */
export function parseSourceRefs(json: string | null | undefined): SourceRef[] {
  if (!json) return [];
  try {
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    const refs: SourceRef[] = [];
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const itemId = (entry as { itemId?: unknown }).itemId;
      if (!isValidItemId(itemId)) continue;
      const span = (entry as { span?: unknown }).span;
      refs.push({
        itemId,
        ...(span && typeof span === "object" &&
        typeof (span as SourceSpan).start === "number" &&
        typeof (span as SourceSpan).end === "number"
          ? { span: span as SourceSpan }
          : {}),
      });
      if (refs.length >= MAX_REFS) break;
    }
    return refs;
  } catch {
    return [];
  }
}

/**
 * Provenance gate: a derived artifact may only be persisted when it can name
 * at least one source item. Returns the refs when valid, null when not.
 */
export function assertHasProvenance(json: string | null | undefined): SourceRef[] | null {
  const refs = parseSourceRefs(json);
  return refs.length > 0 ? refs : null;
}

/** Distinct item ids backing a serialized ref list. */
export function provenanceItemIds(json: string | null | undefined): string[] {
  return [...new Set(parseSourceRefs(json).map((r) => r.itemId))];
}
