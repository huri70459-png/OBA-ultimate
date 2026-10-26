// Project Brain OS — v2.6 Capture Boundary Validation
//
// Audit-2 blocker #4 residual: the capture entrypoints previously accepted
// arbitrary JSON with permissive String() coercions only. This module puts a
// real schema gate in front of the pipeline:
//   - zod payload schema (both snake_case brain_api.py wire keys AND camelCase
//     workspace keys, so no existing caller breaks)
//   - hard per-field size limits (content 150k = redactor MAX_CONTENT_CHARS,
//     screenshot base64 15MB, titles/urls/paths bounded)
//   - content-length body-size guard answered BEFORE the body is read, so an
//     oversized upload is rejected without buffering it into memory
//
// The schema is intentionally a GATE, not a transformer: routes keep their own
// `body.x ?? body.y` accessors, so behavior for every valid payload is
// byte-identical to v2.5. Unknown keys are ignored (forward compatibility with
// future agent versions).

import { z } from "zod";

/** Headroom above the 15MB base64 cap: JSON escaping + metadata fields. */
export const MAX_CAPTURE_BODY_BYTES = 24 * 1024 * 1024;

/** Mirrors privacy-redactor MAX_CONTENT_CHARS — the pipeline slices to this anyway. */
export const MAX_CONTENT_CHARS = 150_000;

/** 15MB of base64 ≈ an 11MB screenshot; matches the audit's recommended cap. */
export const MAX_IMAGE_BASE64_CHARS = 15_000_000;

const sized = (max: number) => z.string().max(max).nullish();

/**
 * Both wire dialects accepted:
 *  - snake_case  : brain_api.py desktop-agent wire format (scripts/desktop_agent.py)
 *  - camelCase   : workspace UI + MCP server (scripts/mcp_server.mjs)
 */
export const CapturePayloadSchema = z.object({
  raw_content: sized(MAX_CONTENT_CHARS),
  rawContent: sized(MAX_CONTENT_CHARS),
  image_base64: sized(MAX_IMAGE_BASE64_CHARS),
  imageBase64: sized(MAX_IMAGE_BASE64_CHARS),
  item_type: sized(40),
  itemType: sized(40),
  window_title: sized(500),
  windowTitle: sized(500),
  source_app: sized(200),
  sourceApp: sized(200),
  source_url: sized(2048),
  sourceUrl: sized(2048),
  active_file_path: sized(1024),
  activeFilePath: sized(1024),
  asset_path: sized(1024),
  assetPath: sized(1024),
  visual_hint: sized(2_000),
  visualHint: sized(2_000),
  forced_project_id: sized(120),
  forcedProjectId: sized(120),
});

export type CapturePayload = z.infer<typeof CapturePayloadSchema>;

export interface CaptureGateResult {
  ok: true;
}

export interface CaptureGateFailure {
  ok: false;
  status: 400 | 413;
  body: Record<string, unknown>;
}

/**
 * Full boundary gate for a capture request: body-size (from headers, before
 * the body is read) then zod field validation. Returns a ready-to-send error
 * response payload on failure, or ok when the pipeline may proceed.
 */
export function gateCaptureRequest(
  req: Request,
  body: unknown
): CaptureGateResult | CaptureGateFailure {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_CAPTURE_BODY_BYTES) {
    return {
      ok: false,
      status: 413,
      body: {
        error: "Capture payload too large",
        max_bytes: MAX_CAPTURE_BODY_BYTES,
        hint: "Compress or downscale the screenshot before uploading",
      },
    };
  }

  const parsed = CapturePayloadSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "Invalid capture payload",
        issues: parsed.error.issues.slice(0, 10).map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
    };
  }
  return { ok: true };
}
