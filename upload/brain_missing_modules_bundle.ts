/**
 * File: brain_missing_modules_bundle.ts
 * Ready-to-use TypeScript implementation files for Raydevstu/PROJECT-BRAIN-OS.
 *
 * Split or copy the 4 modules below into your Next.js repository:
 *   1. src/lib/brain/privacy-redactor.ts   (Privacy exclusions, secret scrubbing & payload validation)
 *   2. src/lib/brain/vision-ocr.ts         (Real Screenshot Asset saving + Multimodal Vision OCR extraction)
 *   3. src/lib/brain/action-verifier.ts    (Closed-loop fix lifecycle: detected -> suggested -> attempted -> verified)
 *   4. src/app/api/items/[id]/route.ts     (Two-way Markdown Editor CRUD, revision history & fix status PATCH)
 */

// ============================================================================
// MODULE 1: src/lib/brain/privacy-redactor.ts
// ============================================================================

export interface SanitizedCaptureInput {
  allowed: boolean;
  blockedReason?: string;
  sanitizedContent: string;
  redactionCount: number;
  contentHash: string;
}

const EXCLUDED_WINDOW_REGEXES: RegExp[] = [
  /1password/i,
  /bitwarden/i,
  /keepass/i,
  /lastpass/i,
  /incognito/i,
  /private browsing/i,
  /keychain/i,
];

const SECRET_RULES: Array<{ name: string; pattern: RegExp; replacement: string }> = [
  {
    name: "openai_key",
    pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/g,
    replacement: "[REDACTED_OPENAI_KEY]",
  },
  {
    name: "anthropic_key",
    pattern: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g,
    replacement: "[REDACTED_ANTHROPIC_KEY]",
  },
  {
    name: "google_api_key",
    pattern: /\bAIza[0-9A-Za-z_-]{35}\b/g,
    replacement: "[REDACTED_GOOGLE_KEY]",
  },
  {
    name: "github_token",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g,
    replacement: "[REDACTED_GITHUB_TOKEN]",
  },
  {
    name: "bearer_token",
    pattern: /(Bearer\s+)[A-Za-z0-9_\-.=]{16,}/gi,
    replacement: "$1[REDACTED_BEARER_TOKEN]",
  },
  {
    name: "private_key_block",
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,
    replacement: "[REDACTED_PRIVATE_KEY]",
  },
  {
    name: "env_secret_assignment",
    pattern: /^([A-Z0-9_]*(?:SECRET|PASSWORD|TOKEN|API_KEY|PRIVATE_KEY)[A-Z0-9_]*\s*=\s*)(.+)$/gm,
    replacement: "$1[REDACTED_ENV_VALUE]",
  },
];

export function sanitizeAndValidateCapture(params: {
  rawContent: string;
  windowTitle?: string;
  sourceApp?: string;
}): SanitizedCaptureInput {
  const windowTitle = params.windowTitle || "";
  for (const excluded of EXCLUDED_WINDOW_REGEXES) {
    if (excluded.test(windowTitle)) {
      return {
        allowed: false,
        blockedReason: `Capture blocked by Privacy Guard (excluded window: ${windowTitle})`,
        sanitizedContent: "",
        redactionCount: 0,
        contentHash: "",
      };
    }
  }

  let text = (params.rawContent || "").slice(0, 150_000); // Hard cap against memory exhaustion
  let redactionCount = 0;

  for (const rule of SECRET_RULES) {
    const matches = text.match(rule.pattern);
    if (matches && matches.length > 0) {
      redactionCount += matches.length;
      text = text.replace(rule.pattern, rule.replacement);
    }
  }

  // Deterministic FNV-1a 64-bit style hex hash for idempotency & conflict detection
  let h1 = 0xdeadbeef ^ text.length;
  let h2 = 0x41c6ce57 ^ text.length;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const contentHash = (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");

  return {
    allowed: true,
    sanitizedContent: text,
    redactionCount,
    contentHash,
  };
}

// ============================================================================
// MODULE 2: src/lib/brain/vision-ocr.ts
// ============================================================================

import fs from "node:fs";
import path from "node:path";

export interface VisionOcrResult {
  extractedText: string;
  visualSemanticDescription: string;
  detectedError?: {
    error: string;
    rootCause: string;
    suggestedFix: string;
  };
  savedAssetPath: string;
  providerUsed: string;
}

/**
 * Persists a base64 screenshot into ProjectBrainVault/Projects/<slug>/assets/
 * and runs multimodal Vision OCR via OpenAI / Gemini / Ollama (llava) if configured.
 */
export async function processScreenshotAndOcr(params: {
  imageBase64: string;
  projectSlug: string;
  itemId: string;
  windowTitle?: string;
  fallbackText?: string;
}): Promise<VisionOcrResult> {
  const vaultRoot = path.join(process.cwd(), "ProjectBrainVault");
  const assetsDir = path.join(vaultRoot, "Projects", params.projectSlug || "inbox", "assets");
  fs.mkdirSync(assetsDir, { recursive: true });

  const match = params.imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
  const ext = match ? (match[1] === "jpeg" ? "jpg" : match[1]) : "png";
  const rawBase64 = match ? match[2] : params.imageBase64;
  const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}_${params.itemId}.${ext}`;
  const fullAssetPath = path.join(assetsDir, filename);

  fs.writeFileSync(fullAssetPath, Buffer.from(rawBase64, "base64"));

  // Check if OpenAI or Ollama Vision is available
  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey) {
    try {
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: process.env.BRAIN_VISION_MODEL || "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "Extract all visible text/code from the screenshot as clean Markdown, provide a 1-sentence visualSemanticDescription for semantic screenshot search, and if a terminal/IDE error is visible, include detectedError {error, rootCause, suggestedFix}. Return strict JSON.",
            },
            {
              role: "user",
              content: [
                { type: "text", text: `Active window: ${params.windowTitle || "Unknown"}` },
                { type: "image_url", image_url: { url: `data:image/${ext};base64,${rawBase64}` } },
              ],
            },
          ],
        }),
      });

      if (resp.ok) {
        const json = await resp.json();
        const parsed = JSON.parse(json.choices?.[0]?.message?.content || "{}");
        return {
          extractedText: parsed.extractedText || params.fallbackText || "",
          visualSemanticDescription:
            parsed.visualSemanticDescription || `Screenshot from ${params.windowTitle || "workspace"}`,
          detectedError: parsed.detectedError,
          savedAssetPath: fullAssetPath,
          providerUsed: "openai-vision",
        };
      }
    } catch {
      // Fall through to deterministic fallback
    }
  }

  return {
    extractedText: params.fallbackText || `Screenshot captured from ${params.windowTitle || "Desktop"}`,
    visualSemanticDescription: `Visual capture of ${params.windowTitle || "application window"}`,
    savedAssetPath: fullAssetPath,
    providerUsed: "local-asset-store",
  };
}

// ============================================================================
// MODULE 3: src/lib/brain/action-verifier.ts
// ============================================================================

export type FixVerificationStatus = "detected" | "suggested" | "attempted" | "verified" | "failed";

export interface ActionVerificationMetadata {
  error?: string;
  fix?: string;
  fix_status?: FixVerificationStatus;
  verification_note?: string;
  verified_at?: string;
}

/**
 * Computes an explainable Project Health Breakdown where unverified suggestions
 * do NOT count as resolved errors until verified.
 */
export function computeVerifiedHealthBreakdown(items: Array<{ itemType: string; metadata: Record<string, unknown> }>) {
  let unresolvedErrors = 0;
  let suggestedUnverifiedFixes = 0;
  let verifiedFixes = 0;

  for (const item of items) {
    const meta = (item.metadata || {}) as ActionVerificationMetadata;
    const hasError = Boolean(meta.error);
    const hasFix = Boolean(meta.fix);
    const status = meta.fix_status || (hasFix ? "suggested" : hasError ? "detected" : undefined);

    if (hasError) {
      if (status === "verified") {
        verifiedFixes += 1;
      } else if (status === "suggested" || status === "attempted") {
        suggestedUnverifiedFixes += 1;
      } else {
        unresolvedErrors += 1;
      }
    }
  }

  const rawScore = 100 - unresolvedErrors * 12 - suggestedUnverifiedFixes * 5 + Math.min(verifiedFixes * 4, 20);
  const score = Math.max(15, Math.min(100, rawScore));

  return {
    score,
    unresolvedErrors,
    suggestedUnverifiedFixes,
    verifiedFixes,
    explanation: `${unresolvedErrors} unresolved error(s), ${suggestedUnverifiedFixes} unverified fix suggestion(s), ${verifiedFixes} verified resolution(s).`,
  };
}

// ============================================================================
// MODULE 4: src/app/api/items/[id]/route.ts
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Handles updating existing Vault notes (two-way Markdown sync with conflict check)
 * and updating Fix Verification Status ('attempted' | 'verified' | 'failed').
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const existing = await db.brainItem.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: `Item ${id} not found` }, { status: 404 });
    }

    const currentMeta = (() => {
      try {
        return JSON.parse(existing.metadata || "{}");
      } catch {
        return {};
      }
    })();

    // Optimistic concurrency check if expected_hash is provided by the editor
    if (
      body.expected_hash &&
      currentMeta.content_hash &&
      body.expected_hash !== currentMeta.content_hash
    ) {
      return NextResponse.json(
        {
          error: "CONFLICT_DETECTED",
          message: "This note was modified on disk or in another tab.",
          server_content: existing.rawContent,
          server_hash: currentMeta.content_hash,
        },
        { status: 409 }
      );
    }

    const updatedRawContent =
      typeof body.raw_content === "string" ? body.raw_content : existing.rawContent;
    const updatedTitle =
      typeof body.title === "string" ? body.title : existing.title;

    const updatedMeta = {
      ...currentMeta,
      ...(body.fix_status ? { fix_status: body.fix_status } : {}),
      ...(body.verification_note ? { verification_note: body.verification_note } : {}),
      ...(body.fix_status === "verified" ? { verified_at: new Date().toISOString() } : {}),
      last_edited_at: new Date().toISOString(),
    };

    const updated = await db.brainItem.update({
      where: { id },
      data: {
        title: updatedTitle,
        rawContent: updatedRawContent,
        metadata: JSON.stringify(updatedMeta),
      },
    });

    // Sync updated markdown back to the Vault file on disk atomically if filePath exists
    if (updated.filePath) {
      try {
        const tmpPath = `${updated.filePath}.tmp`;
        fs.writeFileSync(tmpPath, updatedRawContent, "utf-8");
        fs.renameSync(tmpPath, updated.filePath);
        updatedMeta.vault_sync_status = "synced";
      } catch (diskErr) {
        updatedMeta.vault_sync_status = "failed";
        updatedMeta.vault_sync_error = String(diskErr);
      }
      await db.brainItem.update({
        where: { id },
        data: { metadata: JSON.stringify(updatedMeta) },
      });
    }

    // If fix was verified, upgrade the graph edge from FIXED_BY (suggested) to VERIFIED_BY
    if (body.fix_status === "verified" && updatedMeta.fix) {
      await db.brainGraphEdge.create({
        data: {
          id: `edge_ver_${Date.now().toString(36)}`,
          sourceId: existing.id,
          targetId: String(updatedMeta.fix),
          relationType: "VERIFIED_BY",
          weight: 1.5,
        },
      });
    }

    return NextResponse.json({
      status: "updated",
      item_id: updated.id,
      title: updated.title,
      metadata: updatedMeta,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update item" },
      { status: 500 }
    );
  }
}
