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
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const rawContent = String(body.raw_content ?? body.rawContent ?? "");
    if (!rawContent.trim()) {
      return NextResponse.json({ error: "raw_content is required" }, { status: 400 });
    }

    // 3. Same pipeline as the workspace UI: route -> analyze -> save -> graph
    const result = await capture({
      rawContent,
      itemType: String(body.item_type ?? body.itemType ?? "note"),
      windowTitle: String(body.window_title ?? body.windowTitle ?? ""),
      sourceApp: String(body.source_app ?? body.sourceApp ?? "DesktopAgent"),
      visualHint: String(body.visual_hint ?? body.visualHint ?? ""),
      activeFilePath: String(body.active_file_path ?? body.activeFilePath ?? ""),
      sourceUrl: String(body.source_url ?? body.sourceUrl ?? ""),
      assetPath: String(body.asset_path ?? body.assetPath ?? ""),
    });

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
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Agent capture failed" },
      { status: 500 }
    );
  }
}
