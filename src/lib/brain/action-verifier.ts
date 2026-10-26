// Project Brain OS — v2.5 Closed-Loop Action & Fix Verification
//
// Separates SUGGESTED fixes from VERIFIED resolutions:
//   detected -> suggested -> attempted -> verified | failed
//
// The lifecycle state lives in the item's JSON metadata (backward compatible —
// items captured before v2.5 simply have no fix_status and default to
// "suggested" when a fix exists). An Action row is materialized on the first
// verification PATCH (see /api/items/[id]) so the project database can answer
// "which fixes are actually proven?" independently of raw capture counts.
//
// Health integration: computeHealthAndGaps() consumes classifyFixVerification
// so unverified regex suggestions no longer count as resolved errors.

export type FixVerificationStatus = "detected" | "suggested" | "attempted" | "verified" | "failed";

export const FIX_VERIFICATION_STATUSES: FixVerificationStatus[] = [
  "detected",
  "suggested",
  "attempted",
  "verified",
  "failed",
];

export function isFixVerificationStatus(value: unknown): value is FixVerificationStatus {
  return typeof value === "string" && (FIX_VERIFICATION_STATUSES as string[]).includes(value);
}

export interface ActionVerificationMetadata {
  error?: string;
  rootCause?: string;
  fix?: string;
  fix_status?: FixVerificationStatus;
  verification_note?: string;
  verified_at?: string;
}

export interface FixVerificationCounts {
  /** Error items whose fix is proven (fix_status === "verified"). */
  verifiedFixes: number;
  /** Error items with a suggested/attempted fix that was never verified. */
  suggestedUnverifiedFixes: number;
  /** Error items whose fix was attempted and FAILED — the error is reopened. */
  failedFixes: number;
  /** Error items with no fix at all. */
  unresolvedErrors: number;
}

/** Classifies items by their closed-loop fix status (pure — no I/O). */
export function classifyFixVerification(
  items: Array<{ metadata?: Record<string, unknown> }>
): FixVerificationCounts {
  const counts: FixVerificationCounts = {
    verifiedFixes: 0,
    suggestedUnverifiedFixes: 0,
    failedFixes: 0,
    unresolvedErrors: 0,
  };

  for (const item of items) {
    const meta = (item.metadata ?? {}) as ActionVerificationMetadata;
    if (!meta.error) continue; // only error diagnoses participate in the loop

    if (!meta.fix) {
      counts.unresolvedErrors += 1;
      continue;
    }

    const status = isFixVerificationStatus(meta.fix_status)
      ? meta.fix_status
      : "suggested"; // pre-v2.5 items with a fix default to "suggested"

    if (status === "verified") counts.verifiedFixes += 1;
    else if (status === "failed") counts.failedFixes += 1;
    else counts.suggestedUnverifiedFixes += 1; // detected | suggested | attempted
  }

  return counts;
}

/**
 * Explainable Project Health breakdown where unverified suggestions do NOT
 * count as resolved errors. Exposed for diagnostics and the ops panels; the
 * persisted project health score continues to flow through
 * computeHealthAndGaps() (which uses the same classification).
 */
export function computeVerifiedHealthBreakdown(
  items: Array<{ metadata?: Record<string, unknown> }>
): FixVerificationCounts & { score: number; explanation: string } {
  const counts = classifyFixVerification(items);
  const rawScore =
    100 -
    (counts.unresolvedErrors + counts.failedFixes) * 12 -
    counts.suggestedUnverifiedFixes * 5 +
    Math.min(counts.verifiedFixes * 4, 20);
  const score = Math.max(15, Math.min(100, rawScore));
  return {
    ...counts,
    score,
    explanation:
      `${counts.unresolvedErrors + counts.failedFixes} unresolved error(s), ` +
      `${counts.suggestedUnverifiedFixes} unverified fix suggestion(s), ` +
      `${counts.verifiedFixes} verified resolution(s).`,
  };
}
