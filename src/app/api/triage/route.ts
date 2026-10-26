// v2.1 (port of brain_api.py POST /triage) — move an inbox item into a project space.
// The vault .md file physically moves from ProjectBrainVault/Inbox/ into the project's
// notes/ or captures/ folder; SQLite + the semantic vector sidecar are re-pointed.

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { resolveProjectId, triageItem } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const gate = await apiGuard(req, { mutation: true });
    if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
    await ensureSeedDataOnce();
    const body = await req.json().catch(() => ({}));
    const itemId = String(body.item_id ?? body.itemId ?? "");
    const projectRef = String(body.project_id ?? body.projectId ?? "");
    if (!itemId || !projectRef) {
      return NextResponse.json({ error: "item_id and project_id are required" }, { status: 400 });
    }
    // Accept raw id, slug, or display name (MCP resolve_project_id parity)
    const projectId = await resolveProjectId(projectRef);
    if (!projectId) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const result = await triageItem(itemId, projectId);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Triage failed" },
      { status: 500 }
    );
  }
}
