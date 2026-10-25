import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { logDecision, resolveProjectId } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await ensureSeedDataOnce();
    const body = await req.json();
    if (!body.project_id || !body.title || !body.decision || !body.reasoning) {
      return NextResponse.json(
        { error: "Fields 'project_id', 'title', 'decision', 'reasoning' are required" },
        { status: 400 }
      );
    }
    // Accepts proj_xxx id, slug, or display name (MCP resolve_project_id parity)
    const projectId = await resolveProjectId(String(body.project_id));
    if (!projectId) {
      return NextResponse.json({ error: `Project '${body.project_id}' not found` }, { status: 404 });
    }
    const decision = await logDecision({
      projectId,
      title: body.title,
      decision: body.decision,
      reasoning: body.reasoning,
      alternatives: Array.isArray(body.alternatives) ? body.alternatives.map(String) : [],
      outcome: body.outcome ?? "Active",
    });
    return NextResponse.json(decision);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to log decision" },
      { status: 500 }
    );
  }
}
