import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { getAllProjects, upsertProject } from "@/lib/brain/store";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeedDataOnce();
  const projects = await getAllProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json({ error: "Field 'name' is required" }, { status: 400 });
    }
    const project = await upsertProject({
      name: body.name,
      rootPath: body.root_path ?? body.rootPath ?? "",
      keywords: Array.isArray(body.keywords) ? body.keywords.map(String) : [],
      gitRemotes: Array.isArray(body.git_remotes) ? body.git_remotes.map(String) : [],
      rollingSummary: body.rolling_summary ?? body.rollingSummary ?? "",
    });
    return NextResponse.json(project);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create project" },
      { status: 500 }
    );
  }
}
