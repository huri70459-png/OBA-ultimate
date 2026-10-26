// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): sha256-deduplicated
// asset ledger.
//
// The binary already lives in the vault (vision-ocr writes assets/ at capture
// time); this ledger adds the queryable DB half:
//   - sha256 identity: the same screenshot posted twice REUSES the stored file
//     instead of writing a second copy (closes the disk-fill vector)
//   - OCR provider + text travel WITH the asset, so a deduplicated re-capture
//     reports byte-identical semantics to the original (board-stable)
//   - rows are append-only evidence with deliberately NO FK on Item/Project:
//     deleting an item never destroys the visual evidence trail (blueprint
//     Phase 1 rule: OCR/extraction failures must never delete original captures)

import { createHash, randomUUID } from "crypto";
import { db } from "@/lib/db";

/** Strips an optional data-URL prefix and hashes the decoded bytes. */
export function sha256OfBase64(imageBase64: string): string {
  const raw = imageBase64.includes(",")
    ? imageBase64.slice(imageBase64.indexOf(",") + 1)
    : imageBase64;
  return createHash("sha256").update(Buffer.from(raw, "base64")).digest("hex");
}

/** Decoded byte size without allocating the buffer twice. */
export function byteSizeOfBase64(imageBase64: string): number {
  const raw = imageBase64.includes(",")
    ? imageBase64.slice(imageBase64.indexOf(",") + 1)
    : imageBase64;
  return Math.max(Math.floor((raw.length * 3) / 4) - (raw.endsWith("==") ? 2 : raw.endsWith("=") ? 1 : 0), 0);
}

export async function findAssetBySha256(sha256: string) {
  return db.brainAsset.findUnique({ where: { sha256 } });
}

/**
 * Ledger write keyed by content identity (sha256). Idempotent: a concurrent or
 * repeated registration of the same bytes returns the existing row instead of
 * violating the unique index.
 */
export async function recordAssetLedger(params: {
  storagePath: string;
  sha256: string;
  mimeType?: string;
  bytes?: number;
  provider?: string;
  ocrText?: string;
  processing?: "pending" | "completed" | "failed";
  errorMessage?: string;
  projectId?: string | null;
}) {
  const existing = await db.brainAsset.findUnique({ where: { sha256: params.sha256 } });
  if (existing) return { asset: existing, deduped: true };
  try {
    const asset = await db.brainAsset.create({
      data: {
        id: `ast_${randomUUID().replace(/-/g, "").slice(0, 16)}`,
        storagePath: params.storagePath,
        sha256: params.sha256,
        mimeType: params.mimeType ?? "image/png",
        bytes: params.bytes ?? 0,
        provider: params.provider ?? "local-asset-store",
        ocrText: (params.ocrText ?? "").slice(0, 20000),
        processing: params.processing ?? "completed",
        errorMessage: params.errorMessage ?? null,
        projectId: params.projectId ?? null,
      },
    });
    return { asset, deduped: false };
  } catch (err) {
    // Lost a create race on the unique sha256 — treat as dedup hit.
    const raced = await db.brainAsset.findUnique({ where: { sha256: params.sha256 } });
    if (raced) return { asset: raced, deduped: true };
    throw err;
  }
}

/** Back-links a ledger row to the item that consumed it (best-effort). */
export async function linkAssetToItem(storagePath: string, itemId: string): Promise<void> {
  try {
    await db.brainAsset.updateMany({ where: { storagePath }, data: { itemId } });
  } catch {
    // linking is an optimization, never a requirement
  }
}

export async function assetStats(): Promise<{ assets: number; bytes: number; dedupedReuses: number }> {
  const [count, agg] = await Promise.all([
    db.brainAsset.count(),
    db.brainAsset.aggregate({ _sum: { bytes: true } }),
  ]);
  return { assets: count, bytes: agg._sum.bytes ?? 0, dedupedReuses: 0 };
}
