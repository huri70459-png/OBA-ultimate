import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { resolveProjectId, searchVault } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await ensureSeedDataOnce();
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const rawId = req.nextUrl.searchParams.get("project_id");
  // Optional filter accepts id, slug, or name (MCP resolve_project_id parity)
  const projectId = rawId ? await resolveProjectId(rawId) : null;
  const results = await searchVault(q, projectId, 20);
  return NextResponse.json({ results });
}
