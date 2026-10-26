// v2.1 (port of brain_api.py POST /ask) — grounded Q&A over the vault. Sources are
// returned with excerpts; without an LLM backend the offline notice is returned
// instead of a generated answer (never fake a synthesis).

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { groundedAnswer } from "@/lib/brain/grounded";
import { resolveProjectId } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Grounded queries read vault evidence — any authenticated role may ask.
    const gate = await apiGuard(req, { mutation: false });
    if (!gate.ok) return NextResponse.json({ error: gate.error, sources: [] }, { status: gate.status });
    await ensureSeedDataOnce();
    const body = await req.json().catch(() => ({}));
    const query = String(body.query ?? "");
    const projectRef = String(body.project_id ?? body.projectId ?? "");
    if (!query.trim()) {
      return NextResponse.json({ error: "A non-empty query is required", sources: [] }, { status: 400 });
    }
    // Accept raw id, slug, or display name; empty means "all projects + inbox"
    const projectId = projectRef ? await resolveProjectId(projectRef) : null;
    if (projectRef && !projectId) {
      return NextResponse.json({ error: "Project not found", sources: [] }, { status: 404 });
    }
    const result = await groundedAnswer({ projectId, query, mode: "ask" });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Grounded query failed", sources: [] },
      { status: 500 }
    );
  }
}
