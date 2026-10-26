// v2.5 — Two-Way Vault Note Editing + Closed-Loop Fix Verification
//
//   PATCH /api/items/[id]
//     body: {
//       raw_content?: string      // edit the note in-place (vs. always capturing)
//       title?: string
//       expected_hash?: string    // optimistic concurrency token (content_hash)
//       fix_status?: "detected" | "suggested" | "attempted" | "verified" | "failed"
//       verification_note?: string
//     }
//
//   Behavior:
//     - Content edits re-redact secrets, snapshot the PREVIOUS content into an
//       ItemRevision row (source: "editor"), re-embed the vector sidecar, and
//       atomically rewrite the vault .md file on disk.
//     - expected_hash mismatch -> 409 CONFLICT_DETECTED with the server content
//       (the note was edited on disk / in another tab since it was loaded).
//     - fix_status transitions materialize an Action row and, on "verified",
//       add a VERIFIED_BY knowledge-graph edge mirroring the FIXED_BY convention.
//
//   Auth: session (editor+) in enforced mode, or the configured agent ingest
//   token — same contract as /api/capture so MCP's verify_fix_outcome works.

import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { addGraphEdge, buildItemMarkdown, getProjectById, toItem, writeVaultFile } from "@/lib/brain/store";
import { embedForStorage, newVectorId } from "@/lib/brain/embeddings";
import { contentHashOf, redactSecretsInText } from "@/lib/brain/privacy-redactor";
import { isFixVerificationStatus } from "@/lib/brain/action-verifier";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const gate = await apiGuard(req, { mutation: true, allowAgentToken: true });
    if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
    await ensureSeedDataOnce();

    const { id } = await context.params;
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const row = await db.item.findUnique({ where: { id } });
    if (!row) {
      return NextResponse.json({ error: `Item ${id} not found` }, { status: 404 });
    }
    const item = toItem({ ...row, metadata: row.metadata });
    const meta: Record<string, unknown> = { ...item.metadata };

    // ---- 1. Optimistic concurrency check ----------------------------------
    if (
      body.expected_hash !== undefined &&
      meta.content_hash &&
      String(body.expected_hash) !== String(meta.content_hash)
    ) {
      return NextResponse.json(
        {
          error: "CONFLICT_DETECTED",
          message: "This note was modified on disk or in another tab since you loaded it.",
          server_content: item.rawContent,
          server_hash: String(meta.content_hash),
        },
        { status: 409 }
      );
    }

    // ---- 2. Fix lifecycle validation --------------------------------------
    if (body.fix_status !== undefined && !isFixVerificationStatus(body.fix_status)) {
      return NextResponse.json(
        {
          error: "Invalid fix_status",
          allowed: ["detected", "suggested", "attempted", "verified", "failed"],
        },
        { status: 400 }
      );
    }

    // ---- 3. Content edit (in-place, secret-redacted) -----------------------
    const incomingContent = typeof body.raw_content === "string" ? body.raw_content : item.rawContent;
    const redaction = redactSecretsInText(incomingContent.slice(0, 150_000));
    const finalContent = redaction.text;
    const contentChanged = finalContent !== item.rawContent;
    const finalTitle =
      typeof body.title === "string" && body.title.trim() ? body.title.trim().slice(0, 200) : item.title;
    const nowIso = new Date().toISOString();
    const newHash = contentChanged ? contentHashOf(finalContent) : String(meta.content_hash ?? contentHashOf(finalContent));

    // ---- 4. Revision snapshot of the PREVIOUS content ----------------------
    if (contentChanged) {
      await db.itemRevision.create({
        data: {
          id: `rev_${randomUUID().replace(/-/g, "").slice(0, 12)}`,
          itemId: id,
          contentHash: String(meta.content_hash ?? contentHashOf(item.rawContent)),
          rawContent: item.rawContent.slice(0, 100_000),
          source: "editor",
        },
      });
    }

    // ---- 5. Metadata transitions -------------------------------------------
    const updatedMeta: Record<string, unknown> = {
      ...meta,
      ...(contentChanged ? { content_hash: newHash, last_edited_at: nowIso } : {}),
      ...(body.fix_status !== undefined
        ? {
            fix_status: body.fix_status,
            ...(body.verification_note !== undefined
              ? { verification_note: String(body.verification_note).slice(0, 2000) }
              : {}),
            ...(body.fix_status === "verified" ? { verified_at: nowIso } : {}),
          }
        : {}),
    };

    const updated = await db.item.update({
      where: { id },
      data: {
        ...(finalTitle !== item.title ? { title: finalTitle } : {}),
        ...(contentChanged ? { rawContent: finalContent } : {}),
        metadata: JSON.stringify(updatedMeta),
      },
    });

    // ---- 6. Re-embed the vector sidecar so semantic search stays truthful ---
    if (contentChanged) {
      const embedding = embedForStorage(
        `${updated.title}\n${updated.rawContent}\n${updated.structuredSummary}\n${updated.visualDescription}`
      );
      await db.itemVector
        .upsert({
          where: { itemId: id },
          update: { ...embedding, indexedAt: new Date() },
          create: {
            id: newVectorId(),
            itemId: id,
            projectId: updated.projectId,
            ...embedding,
          },
        })
        .catch(() => null); // index lag must never fail the edit
    }

    // ---- 7. Atomic vault .md rewrite (two-way sync: app -> disk) -----------
    let vaultSyncStatus = "skipped";
    if (updated.filePath) {
      const project = updated.projectId ? await getProjectById(updated.projectId) : null;
      const written = await writeVaultFile(
        updated.filePath,
        buildItemMarkdown({
          id: updated.id,
          itemType: updated.itemType,
          projectName: project?.name ?? "Inbox",
          sourceApp: updated.sourceApp,
          sourceUrl: updated.sourceUrl,
          capturedAt: updated.capturedAt.toISOString(),
          title: updated.title,
          structuredSummary: updated.structuredSummary,
          visualDescription: updated.visualDescription,
          suggestedFix: typeof updatedMeta.fix === "string" ? updatedMeta.fix : undefined,
          rawContent: updated.rawContent,
        })
      );
      vaultSyncStatus = written ? "synced" : "failed";
      const metaWithSync = { ...updatedMeta, vault_sync_status: vaultSyncStatus };
      await db.item.update({
        where: { id },
        data: { metadata: JSON.stringify(metaWithSync) },
      });
      Object.assign(updatedMeta, metaWithSync);
    }

    // ---- 8. Closed-loop Action lifecycle ------------------------------------
    if (body.fix_status !== undefined) {
      const actionData = {
        projectId: updated.projectId, // nullable — inbox fixes are verified too
        sourceItemId: updated.id,
        errorSignature: String(updatedMeta.error ?? ""),
        suggestedCommand: String(updatedMeta.fix ?? ""),
        status: String(body.fix_status),
        verificationNote: String(body.verification_note ?? "").slice(0, 2000),
        ...(body.fix_status === "verified" ? { verifiedAt: new Date() } : {}),
      };
      const existingAction = await db.action.findFirst({
        where: { sourceItemId: updated.id },
        orderBy: { createdAt: "desc" },
      });
      if (existingAction) {
        await db.action.update({ where: { id: existingAction.id }, data: actionData });
      } else {
        await db.action.create({
          data: { id: `act_${randomUUID().replace(/-/g, "").slice(0, 12)}`, ...actionData },
        });
      }

      // Verified fix -> VERIFIED_BY knowledge-graph edge (mirrors FIXED_BY
      // convention: error node -> fix node).
      if (body.fix_status === "verified" && typeof updatedMeta.fix === "string") {
        await addGraphEdge(updated.projectId, updated.title, updatedMeta.fix, "VERIFIED_BY");
      }
    }

    return NextResponse.json({
      status: "updated",
      item_id: updated.id,
      title: updated.title,
      content_hash: newHash,
      revision_created: contentChanged,
      vault_sync_status: vaultSyncStatus,
      ...(body.fix_status !== undefined
        ? { fix_status: String(body.fix_status), verification_recorded: true }
        : {}),
      ...(redaction.count > 0 ? { privacy: { redaction_count: redaction.count } } : {}),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update item" },
      { status: 500 }
    );
  }
}
