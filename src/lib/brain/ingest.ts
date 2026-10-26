// Project Brain OS — v2.5 Ingest Enrichment Layer
//
// One shared pre-processing path for EVERY capture entrypoint
// (/api/capture UI + MCP, /api/agent/capture desktop agent):
//   1. Privacy gate      — sensitive windows blocked, secrets scrubbed
//   2. Screenshot OCR     — image_base64 persisted to vault assets + vision OCR
//   3. Content hash      — deterministic idempotency + concurrency token
//   4. Capture audit     — idempotent CaptureJob ledger row per payload
//
// Keeping this out of the individual routes guarantees the desktop agent, the
// workspace UI, and MCP tools can never bypass the privacy layer.

import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { detectProject } from "./router";
import { resolveProjectId, getProjectById } from "./store";
import { contentHashOf, sanitizeAndValidateCapture } from "./privacy-redactor";
import { processScreenshotAndOcr } from "./vision-ocr";
import {
  byteSizeOfBase64,
  findAssetBySha256,
  recordAssetLedger,
  sha256OfBase64,
} from "./assets";

export interface EnrichedCaptureInput {
  rawContent: string;
  itemType: string;
  windowTitle: string;
  sourceApp: string;
  activeFilePath?: string;
  sourceUrl?: string;
  assetPath?: string;
  visualHint?: string;
  imageBase64?: string;
  forcedProjectId?: string;
}

export type EnrichedCaptureResult =
  | { blocked: true; reason: string }
  | {
      blocked: false;
      rawContent: string;
      visualHint: string;
      assetPath: string;
      contentHash: string;
      redactionCount: number;
      ocr: { used: true; provider: string } | { used: false };
      // v2.6 trust plane: sha256 asset-identity reporting (dedup + ledger)
      assetReused: boolean;
      assetSha256: string | null;
    };

/** Resolves where a screenshot asset should live (project slug or Inbox). */
async function assetSlugFor(input: EnrichedCaptureInput): Promise<string> {
  if (input.forcedProjectId) {
    const forcedId = await resolveProjectId(input.forcedProjectId);
    if (forcedId) {
      const project = await getProjectById(forcedId);
      if (project) return project.slug;
    }
    return "";
  }
  const match = await detectProject({
    rawContent: input.rawContent,
    windowTitle: input.windowTitle,
    activeFilePath: input.activeFilePath ?? "",
    sourceUrl: input.sourceUrl ?? "",
  });
  return match.projectSlug || "";
}

/**
 * Privacy + OCR enrichment for a capture request body. Returns `blocked` when
 * the Privacy Guard rejects the source window (route answers 422).
 */
export async function enrichCaptureInput(
  input: EnrichedCaptureInput
): Promise<EnrichedCaptureResult> {
  const privacy = sanitizeAndValidateCapture({
    rawContent: input.rawContent,
    windowTitle: input.windowTitle,
    sourceApp: input.sourceApp,
  });
  if (!privacy.allowed) {
    return { blocked: true, reason: privacy.blockedReason ?? "Blocked by Privacy Guard" };
  }

  let enriched = privacy.sanitizedContent;
  let visualHint = input.visualHint ?? "";
  let assetPath = input.assetPath ?? "";
  let ocr: { used: true; provider: string } | { used: false } = { used: false };
  let assetReused = false;
  let assetSha256: string | null = null;

  if (input.imageBase64) {
    // v2.6 trust plane: sha256 asset identity. The SAME screenshot posted twice
    // reuses the stored file + stored OCR result instead of writing a second
    // copy or re-running a vision call (disk-fill + cost vector closed). The
    // ledger records provider + text so a reused asset reports byte-identical
    // semantics to the original capture.
    const sha = sha256OfBase64(input.imageBase64);
    assetSha256 = sha;
    let reused: Awaited<ReturnType<typeof findAssetBySha256>> = null;
    try {
      reused = await findAssetBySha256(sha);
    } catch {
      reused = null; // ledger read failure must never fail the capture
    }

    if (reused) {
      assetPath = reused.storagePath;
      if (reused.ocrText) enriched = reused.ocrText;
      if (!visualHint) visualHint = `Visual capture (asset sha256 ${sha.slice(0, 12)} reused)`;
      ocr = { used: true, provider: reused.provider || "local-asset-store" };
      assetReused = true;
    } else {
      const slug = await assetSlugFor(input);
      const ocrResult = await processScreenshotAndOcr({
        imageBase64: input.imageBase64,
        projectSlug: slug,
        itemId: `cap_${randomUUID().replace(/-/g, "").slice(0, 10)}`,
        windowTitle: input.windowTitle,
        fallbackText: enriched,
      });
      if (ocrResult.extractedText) enriched = ocrResult.extractedText;
      if (ocrResult.visualSemanticDescription) visualHint = ocrResult.visualSemanticDescription;
      if (ocrResult.savedAssetPath) assetPath = ocrResult.savedAssetPath;
      ocr = { used: true, provider: ocrResult.providerUsed };
      // Ledger write is best-effort: an asset-bookkeeping failure must never
      // fail the capture itself (raw evidence is already safe on disk).
      await recordAssetLedger({
        storagePath: ocrResult.savedAssetPath,
        sha256: sha,
        mimeType: ocrResult.mimeType,
        bytes: byteSizeOfBase64(input.imageBase64),
        provider: ocrResult.providerUsed,
        ocrText: ocrResult.extractedText.slice(0, 20000),
        processing: "completed",
      }).catch(() => null);
    }
  }

  // Hash the FINAL stored content (post-redaction, post-OCR) — this is the
  // token the optimistic-concurrency PATCH and the CaptureJob key share.
  const contentHash = contentHashOf(enriched);

  return {
    blocked: false,
    rawContent: enriched,
    visualHint,
    assetPath,
    contentHash,
    redactionCount: privacy.redactionCount,
    ocr,
    assetReused,
    assetSha256,
  };
}

/**
 * Idempotent capture audit ledger: identical payloads fold into one job row
 * (attempts + 1); new payloads create a completed row pointing at the item.
 */
export async function recordCaptureJob(params: {
  idempotencyKey: string;
  payload: Record<string, unknown>;
  resultItemId: string;
}): Promise<{ id: string; status: string; attempts: number }> {
  const redacted = { ...params.payload };
  delete redacted.image_base64; // never persist the raw image into the ledger
  if (typeof redacted.raw_content === "string" && redacted.raw_content.length > 2000) {
    redacted.raw_content = `${redacted.raw_content.slice(0, 2000)}…[truncated]`;
  }
  const payloadJson = JSON.stringify(redacted).slice(0, 4000);

  const existing = await db.captureJob.findUnique({
    where: { idempotencyKey: params.idempotencyKey },
  });
  if (existing) {
    const updated = await db.captureJob.update({
      where: { id: existing.id },
      data: {
        attempts: { increment: 1 },
        status: "completed",
        resultItemId: existing.resultItemId ?? params.resultItemId,
        payloadJson,
      },
    });
    return { id: updated.id, status: updated.status, attempts: updated.attempts };
  }

  const created = await db.captureJob.create({
    data: {
      id: `job_${randomUUID().replace(/-/g, "").slice(0, 12)}`,
      idempotencyKey: params.idempotencyKey,
      payloadJson,
      status: "completed",
      attempts: 1,
      resultItemId: params.resultItemId,
    },
  });
  return { id: created.id, status: created.status, attempts: 1 };
}
