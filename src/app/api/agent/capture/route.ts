// Project Brain OS — v2.2 Desktop Agent Parity Endpoint (Part B)
//
// Speaks the exact brain_api.py wire format so the existing desktop_agent.py
// (clipboard watcher / hotkey snips / --snip CLI) can point at this workspace
// instead of — or in addition to — a local Python daemon:
//
//   POST /api/agent/capture
//     body:   { raw_content, item_type, window_title, source_app, visual_hint }
//     (camelCase aliases accepted)
//     auth:   Authorization: Bearer <token>  OR  X-Brain-Token: <token>
//             (required only when an agent_ingest_token is configured)
//     resp:   { status, toast_notification, item_id, item_title, project,
//               routed_model, decision_logged, duplicate, memory_compression }
//
//   GET  /api/agent/capture -> handshake info (token_required, expected payload),
//                              used by `desktop_agent.py --check`.
//
// Auth mirrors brain_api.py v2.1's loopback-only stance: with no token configured the
// endpoint is open in trusted mode; with a token configured (DB setting or
// BRAIN_INGEST_TOKEN env) every mutating call must present it.

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { capture } from "@/lib/brain/pipeline";
import { compressProjectMemory } from "@/lib/brain/compressor";
import { checkAgentToken } from "@/lib/brain/settings";
import { enrichCaptureInput, recordCaptureJob } from "@/lib/brain/ingest";
import { recordAuditEvent } from "@/lib/brain/audit";
import { linkAssetToItem } from "@/lib/brain/assets";
import { gateCaptureRequest } from "@/lib/brain/capture-schema";

export const dynamic = "force-dynamic";

function extractToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (auth && /^bearer\s+/i.test(auth)) return auth.replace(/^bearer\s+/i, "").trim();
  const header = req.headers.get("x-brain-token");
  return header ? header.trim() : null;
}

export async function GET(req: NextRequest) {
  try {
    await ensureSeedDataOnce();
    const auth = await checkAgentToken(extractToken(req));
    return NextResponse.json({
      endpoint: "/api/agent/capture",
      method: "POST",
      token_required: auth.required,
      token_valid: auth.ok,
      payload: {
        raw_content: "string (required)",
        item_type: "note | screenshot | terminal | clip (default: note)",
        window_title: "string (optional) — feeds project auto-detection",
        source_app: "string (optional) — e.g. DesktopAgent",
        visual_hint: "string (optional) — screen context for visual captures",
      },
      response: {
        status: "captured_zero_save | duplicate_merged",
        toast_notification: "string — ready-made HUD toast (brain_api.py parity)",
        item_id: "string",
        project: "{ id, name, slug, confidence } | null",
        duplicate: "{ occurrence_count, last_seen_at } | null",
      },
      example: 'python desktop_agent.py --clipboard  (BRAIN_API_URL=http://<host>/api/agent/capture)',
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Agent handshake failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSeedDataOnce();

    // 1. Ingest auth — three acceptable credentials, in order:
    //    a) configured agent ingest token (desktop agents, works even when enforced)
    //    b) a valid user session cookie (enforced mode, editor+ role)
    //    c) open mode (no token configured, no accounts) — trusted loopback parity
    const auth = await checkAgentToken(extractToken(req));
    if (auth.required && !auth.ok) {
      return NextResponse.json(
        {
          error: "Invalid or missing agent ingest token",
          hint: "Send 'Authorization: Bearer <token>' or 'X-Brain-Token: <token>'",
        },
        { status: 401 }
      );
    }
    if (!auth.required) {
      const gate = await apiGuard(req, { mutation: true });
      if (!gate.ok) {
        return NextResponse.json(
          { error: gate.error, hint: "Sign in to the workspace, or configure an agent ingest token in Settings" },
          { status: gate.status }
        );
      }
    }

    // 2. brain_api.py-shaped payload (snake_case first, camelCase aliases accepted)
    //    v2.6 boundary gate — body-size (headers, before read) + zod field caps;
    //    identical gate to /api/capture so the agent can never bypass it either.
    const rawBody: unknown = await req.json().catch(() => ({}));
    const boundary = gateCaptureRequest(req, rawBody);
    if (!boundary.ok) return NextResponse.json(boundary.body, { status: boundary.status });
    const body = (rawBody ?? {}) as Record<string, unknown>;
    const rawContent = String(body.raw_content ?? body.rawContent ?? "");
    if (!rawContent.trim() && !body.image_base64) {
      return NextResponse.json({ error: "raw_content is required" }, { status: 400 });
    }

    // 2.5 v2.5 ingest layer — same Privacy Guard + screenshot OCR as /api/capture
    //     (an agent must never be the bypass around the privacy layer).
    const enriched = await enrichCaptureInput({
      rawContent,
      itemType: String(body.item_type ?? body.itemType ?? "note"),
      windowTitle: String(body.window_title ?? body.windowTitle ?? ""),
      sourceApp: String(body.source_app ?? body.sourceApp ?? "DesktopAgent"),
      activeFilePath: String(body.active_file_path ?? body.activeFilePath ?? ""),
      sourceUrl: String(body.source_url ?? body.sourceUrl ?? ""),
      assetPath: String(body.asset_path ?? body.assetPath ?? ""),
      visualHint: String(body.visual_hint ?? body.visualHint ?? ""),
      imageBase64: body.image_base64 ? String(body.image_base64) : "",
      forcedProjectId: String(body.forced_project_id ?? body.forcedProjectId ?? ""),
    });
    if (enriched.blocked) {
      return NextResponse.json({ status: "blocked", reason: enriched.reason }, { status: 422 });
    }
    if (!enriched.rawContent.trim()) {
      return NextResponse.json({ error: "raw_content is required" }, { status: 400 });
    }

    // 3. Same pipeline as the workspace UI: route -> analyze -> save -> graph
    const result = await capture({
      rawContent: enriched.rawContent,
      itemType: String(body.item_type ?? body.itemType ?? "note"),
      windowTitle: String(body.window_title ?? body.windowTitle ?? ""),
      sourceApp: String(body.source_app ?? body.sourceApp ?? "DesktopAgent"),
      visualHint: enriched.visualHint,
      activeFilePath: String(body.active_file_path ?? body.activeFilePath ?? ""),
      sourceUrl: String(body.source_url ?? body.sourceUrl ?? ""),
      assetPath: enriched.assetPath,
      forcedProjectId: String(body.forced_project_id ?? body.forcedProjectId ?? ""),
      extraMetadata: {
        content_hash: enriched.contentHash,
        privacy_redactions: enriched.redactionCount,
        ...(enriched.ocr.used ? { ocr_provider: enriched.ocr.provider } : {}),
      },
    });

    // 3.5 v2.5: idempotent capture audit ledger
    const job = await recordCaptureJob({
      idempotencyKey: enriched.contentHash,
      payload: {
        raw_content: enriched.rawContent,
        item_type: result.item.itemType,
        window_title: String(body.window_title ?? body.windowTitle ?? ""),
        source_app: result.item.sourceApp,
      },
      resultItemId: result.item.id,
    }).catch(() => null);

    // v2.6 trust plane — agent path gets the same append-only audit trail (the
    // desktop agent must never be a silent writer) + asset ledger back-link.
    await recordAuditEvent({
      projectId: result.item.projectId ?? result.projectMatch?.projectId ?? null,
      actorType: auth.required ? "agent" : "user",
      eventType: "capture.created",
      entityType: "Item",
      entityId: result.item.id,
      details: {
        status: result.status,
        content_hash: enriched.contentHash,
        redactions: enriched.redactionCount,
        ocr_provider: enriched.ocr.used ? enriched.ocr.provider : null,
        asset_reused: enriched.assetReused,
        source_app: result.item.sourceApp,
        via: "agent_endpoint",
      },
    });
    if (enriched.assetSha256 && enriched.assetPath) {
      await linkAssetToItem(enriched.assetPath, result.item.id);
    }

    // 4. v2 wiring parity with /api/capture: auto re-compress matched project
    //    (skipped on duplicate merges — content did not change, only the counter).
    let memoryCompression: unknown = { skipped: true, reason: "duplicate_merged" };
    if (result.status !== "duplicate_merged") {
      const pid = result.projectMatch?.projectId;
      memoryCompression = pid ? await compressProjectMemory(pid) : { skipped: true };
    }

    // 5. Response in brain_api.py wire format (toast_notification key parity)
    return NextResponse.json({
      status: result.status,
      toast_notification: result.toastNotification,
      item_id: result.item.id,
      item_title: result.item.title,
      project: result.projectMatch.projectId
        ? {
            id: result.projectMatch.projectId,
            name: result.projectMatch.projectName,
            slug: result.projectMatch.projectSlug,
            confidence: result.projectMatch.confidence,
          }
        : null,
      routed_model: result.modelRoute.targetModel,
      decision_logged: Boolean(result.decisionLogged),
      duplicate:
        result.status === "duplicate_merged"
          ? {
              occurrence_count: Number(result.item.metadata?.occurrence_count ?? 1),
              last_seen_at: String(result.item.metadata?.last_seen_at ?? result.item.capturedAt),
            }
          : null,
      memory_compression: memoryCompression,
      // v2.5 ingest-layer reporting (parity with /api/capture)
      content_hash: enriched.contentHash,
      asset_reused: enriched.assetReused,
      privacy: { redaction_count: enriched.redactionCount },
      ...(enriched.ocr.used ? { ocr: { provider: enriched.ocr.provider } } : {}),
      ...(job ? { capture_job: job } : {}),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Agent capture failed" },
      { status: 500 }
    );
  }
}
