// Project Brain OS — v2.5 Multimodal Screenshot OCR + Asset Persistence
//
// Ingest path for real screenshots (desktop_agent.py --screenshot sends
// image_base64 as a data URL):
//   1. The image is PERSISTED into the project vault at
//      ProjectBrainVault/Projects/<slug>/assets/<timestamp>_<itemId>.<ext>
//      (or Inbox/assets) so visual evidence is never lost, even offline.
//   2. When an OpenAI backend is configured (Settings DB -> env), the image
//      is run through a multimodal vision call that returns clean Markdown
//      text, a visualSemanticDescription for semantic screenshot search, and
//      an optional structured { error, rootCause, suggestedFix } diagnosis.
//   3. Without a backend the module degrades cleanly to local asset storage —
//      the capture still lands with its fallback text and asset path.
//
// Adapted from the review bundle's vision-ocr module: vault resolution and
// key/base-url handling now flow through the shipped settings store instead
// of raw env access, and asset paths stay RELATIVE (vault convention).

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { effectiveSetting } from "./settings";

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

const OCR_TIMEOUT_MS = 20_000;

/** Parses "data:image/png;base64,..." (bare base64 accepted, defaults to png). */
function splitImageUri(imageBase64: string): { ext: string; raw: string } {
  const match = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
  if (match) {
    const ext = match[1] === "jpeg" ? "jpg" : match[1];
    return { ext, raw: match[2] };
  }
  return { ext: "png", raw: imageBase64 };
}

/**
 * Persists a base64 screenshot into the vault's assets folder and runs
 * multimodal Vision OCR when a backend is configured.
 */
export async function processScreenshotAndOcr(params: {
  imageBase64: string;
  projectSlug: string;
  itemId: string;
  windowTitle?: string;
  fallbackText?: string;
}): Promise<VisionOcrResult> {
  const { ext, raw } = splitImageUri(params.imageBase64);

  // 1. Persist the raw asset (relative vault path, same convention as filePath)
  const relativeDir = params.projectSlug
    ? `ProjectBrainVault/Projects/${params.projectSlug}/assets`
    : `ProjectBrainVault/Inbox/assets`;
  const absDir = path.join(process.cwd(), ...relativeDir.split("/"));
  await mkdir(absDir, { recursive: true });
  const safeItemId = params.itemId.replace(/[^a-zA-Z0-9]/g, "").slice(-12) || "cap";
  const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}_${safeItemId}.${ext}`;
  await writeFile(path.join(absDir, filename), Buffer.from(raw, "base64"));
  const savedAssetPath = `${relativeDir}/${filename}`;

  // 2. Multimodal OCR — only when an OpenAI-compatible backend is configured
  const openAiKey = await effectiveSetting("openai_api_key");
  if (openAiKey) {
    const base = (await effectiveSetting("openai_base_url")) || "https://api.openai.com/v1";
    const model = process.env.BRAIN_VISION_MODEL || "gpt-4o-mini";
    try {
      const resp = await fetch(`${base.replace(/\/+$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model,
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
                { type: "image_url", image_url: { url: `data:image/${ext};base64,${raw}` } },
              ],
            },
          ],
        }),
        signal: AbortSignal.timeout(OCR_TIMEOUT_MS),
      });

      if (resp.ok) {
        const json = (await resp.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const parsed = JSON.parse(json.choices?.[0]?.message?.content || "{}") as {
          extractedText?: string;
          visualSemanticDescription?: string;
          detectedError?: { error?: string; rootCause?: string; suggestedFix?: string };
        };
        const detected = parsed.detectedError;
        return {
          extractedText: parsed.extractedText || params.fallbackText || "",
          visualSemanticDescription:
            parsed.visualSemanticDescription || `Screenshot from ${params.windowTitle || "workspace"}`,
          detectedError:
            detected && detected.error
              ? {
                  error: detected.error,
                  rootCause: detected.rootCause ?? "",
                  suggestedFix: detected.suggestedFix ?? "",
                }
              : undefined,
          savedAssetPath,
          providerUsed: "openai-vision",
        };
      }
    } catch {
      // Network/timeout/parse failure — fall through to deterministic fallback
    }
  }

  // 3. Offline fallback: asset stored, text falls back to the capture text
  return {
    extractedText: params.fallbackText || `Screenshot captured from ${params.windowTitle || "Desktop"}`,
    visualSemanticDescription: `Visual capture of ${params.windowTitle || "application window"}`,
    savedAssetPath,
    providerUsed: "local-asset-store",
  };
}
