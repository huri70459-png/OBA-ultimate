import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { buildContextInjectionPayload, buildStructuredPrompt } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await ensureSeedDataOnce();
  const projectId = req.nextUrl.searchParams.get("project_id") ?? "";
  const query = req.nextUrl.searchParams.get("q") ?? "";
  const goal = req.nextUrl.searchParams.get("goal") ?? "";

  const payload = await buildContextInjectionPayload(projectId, query);
  if ("error" in payload) {
    return NextResponse.json(payload, { status: 404 });
  }

  // Build anti-drift structured prompt wrapper
  const structuredPrompt = buildStructuredPrompt(payload, goal);
  return NextResponse.json({ ...payload, structured_prompt_markdown: structuredPrompt });
}
