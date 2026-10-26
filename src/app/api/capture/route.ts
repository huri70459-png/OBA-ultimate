import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { capture } from "@/lib/brain/pipeline";
import { compressProjectMemory } from "@/lib/brain/compressor";
import { enrichCaptureInput, recordCaptureJob } from "@/lib/brain/ingest";
import { recordAuditEvent } from "@/lib/brain/audit";
import { linkAssetToItem } from "@/lib/brain/assets";
import { gateCaptureRequest } from "@/lib/brain/capture-schema";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Enterprise guard: session required when auth is enforced; the desktop-agent
    // ingest token is also accepted so the capture pipeline never breaks.
    const gate = await apiGuard(req, { mutation: true, allowAgentToken: true });
    if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
    await ensureSeedDataOnce();

    // v2.6 boundary gate — body-size (headers, before read) + zod field caps.
    // The desktop-agent token path is equally bounded: the gate lives BEFORE
    // any pipeline work in both capture routes.
    const rawBody: unknown = await req.json().catch(() => ({}));
    const boundary = gateCaptureRequest(req, rawBody);
    if (!boundary.ok) return NextResponse.json(boundary.body, { status: boundary.status });
    const body = (rawBody ?? {}) as Record<string, unknown>;

    // v2.5 ingest layer — Privacy Guard (sensitive windows blocked, secrets
    // scrubbed) + optional screenshot OCR + deterministic content hash.
    const enriched = await enrichCaptureInput({
      rawContent: String(body.raw_content ?? body.rawContent ?? ""),
      itemType: String(body.item_type ?? body.itemType ?? "note"),
      windowTitle: String(body.window_title ?? body.windowTitle ?? ""),
      sourceApp: String(body.source_app ?? body.sourceApp ?? "Workspace UI"),
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

    const result = await capture({
      rawContent: enriched.rawContent,
      itemType: String(body.item_type ?? body.itemType ?? "note"),
      windowTitle: String(body.window_title ?? body.windowTitle ?? ""),
      activeFilePath: String(body.active_file_path ?? body.activeFilePath ?? ""),
      sourceApp: String(body.source_app ?? body.sourceApp ?? "Workspace UI"),
      sourceUrl: String(body.source_url ?? body.sourceUrl ?? ""),
      assetPath: enriched.assetPath,
      visualHint: enriched.visualHint,
      forcedProjectId: String(body.forced_project_id ?? body.forcedProjectId ?? ""),
      extraMetadata: {
        content_hash: enriched.contentHash,
        privacy_redactions: enriched.redactionCount,
        ...(enriched.ocr.used ? { ocr_provider: enriched.ocr.provider } : {}),
      },
    });

    // v2.5: idempotent capture audit ledger (identical payload -> attempts + 1)
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

    // v2.6 trust plane — append-only audit trail (never throws into the capture
    // path) + asset ledger back-link so visual evidence is queryable per item.
    await recordAuditEvent({
      projectId: result.item.projectId ?? result.projectMatch?.projectId ?? null,
      actorType: gate.viaAgent ? "agent" : "user",
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
      },
    });
    if (enriched.assetSha256 && enriched.assetPath) {
      await linkAssetToItem(enriched.assetPath, result.item.id);
    }

    // v2 wiring (brain_api.py parity): automatically re-compress project memory
    // whenever a NEW capture lands so Tier-1 rolling memory is always fresh.
    // v2.1: duplicate merges return early like brain_api.py — the item content did
    // not change (only its occurrence counter), so no recompression is needed.
    if (result.status === "duplicate_merged") {
      return NextResponse.json({
        ...result,
        memory_compression: { skipped: true, reason: "duplicate_merged" },
        content_hash: enriched.contentHash,
        asset_reused: enriched.assetReused,
        privacy: { redaction_count: enriched.redactionCount },
        ...(enriched.ocr.used ? { ocr: { provider: enriched.ocr.provider } } : {}),
        ...(job ? { capture_job: job } : {}),
      });
    }
    const matchedPid = result.projectMatch?.projectId;
    if (matchedPid) {
      const compression = await compressProjectMemory(matchedPid);
      return NextResponse.json({
        ...result,
        memory_compression: compression,
        content_hash: enriched.contentHash,
        asset_reused: enriched.assetReused,
        privacy: { redaction_count: enriched.redactionCount },
        ...(enriched.ocr.used ? { ocr: { provider: enriched.ocr.provider } } : {}),
        ...(job ? { capture_job: job } : {}),
      });
    }
    return NextResponse.json({
      ...result,
      memory_compression: { skipped: true },
      content_hash: enriched.contentHash,
      asset_reused: enriched.assetReused,
      privacy: { redaction_count: enriched.redactionCount },
      ...(enriched.ocr.used ? { ocr: { provider: enriched.ocr.provider } } : {}),
      ...(job ? { capture_job: job } : {}),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Capture failed" },
      { status: 500 }
    );
  }
}
