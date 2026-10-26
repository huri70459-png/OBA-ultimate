import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { buildContextInjectionPayload, resolveProjectId } from "@/lib/brain/store";
import { compressProjectMemory } from "@/lib/brain/compressor";
import { llmBridge } from "@/lib/brain/llm-bridge";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: false, allowAgentToken: true });
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
  await ensureSeedDataOnce();
  // Accepts proj_xxx id, slug, or display name (MCP resolve_project_id parity)
  const identifier = req.nextUrl.searchParams.get("project_id") ?? "";
  const query = req.nextUrl.searchParams.get("q") ?? "";
  const goal = req.nextUrl.searchParams.get("goal") ?? "";

  const projectId = await resolveProjectId(identifier);
  if (!projectId) {
    return NextResponse.json({ error: `Project '${identifier}' not found` }, { status: 404 });
  }

  // v2 wiring (brain_api.py parity): compress memory on-the-fly so Tier 1 is
  // always fresh and token-bounded before the payload is assembled.
  await compressProjectMemory(projectId);

  const payload = await buildContextInjectionPayload(projectId, query);
  if ("error" in payload) {
    return NextResponse.json(payload, { status: 404 });
  }

  // v2 Anti-Drift Prompt Pre-Structurer (llm_bridge.rewrite_raw_prompt parity)
  const rewritten = await llmBridge.rewriteRawPrompt(
    goal || query || "Continue development on current project tasks.",
    payload
  );

  return NextResponse.json({
    ...payload,
    structured_prompt_markdown: rewritten.structured_prompt_markdown,
    token_estimate: rewritten.estimated_tokens,
    token_budget_status: rewritten.token_budget_status,
    backend_used: rewritten.backend_used,
    refined_objective: rewritten.refined_objective,
    known_fixes_referenced: rewritten.known_fixes_referenced,
  });
}
