import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { searchVault } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await ensureSeedDataOnce();
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const projectId = req.nextUrl.searchParams.get("project_id");
  const results = await searchVault(q, projectId, 20);
  return NextResponse.json({ results });
}
