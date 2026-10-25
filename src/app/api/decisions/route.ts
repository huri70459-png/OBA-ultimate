import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { logDecision } from "@/lib/brain/store";

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
    const decision = await logDecision({
      projectId: body.project_id,
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
