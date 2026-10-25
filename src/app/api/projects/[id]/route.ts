import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import {
  computeHealthAndGaps,
  getProjectDetails,
  syncMarkdownEditsFromDisk,
  toItem,
} from "@/lib/brain/store";
import { db } from "@/lib/db";
import type { BrainProject } from "@/lib/brain/types";

export const dynamic = "force-dynamic";

const INBOX_PROJECT: BrainProject = {
  id: "inbox",
  name: "Inbox",
  slug: "inbox",
  rootPath: "",
  keywords: [],
  gitRemotes: [],
  rollingSummary: "Unsorted captures that did not match any project fingerprint.",
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureSeedDataOnce();
  const { id } = await params;

  // v2 wiring (brain_api.py get_project_details parity): sync any manual .md edits
  // made on disk (Obsidian / VS Code) into SQLite before serving project details.
  await syncMarkdownEditsFromDisk();

  // Pseudo-project: captures routed below confidence threshold
  if (id === "inbox") {
    const rows = await db.item.findMany({
      where: { projectId: null },
      orderBy: { capturedAt: "desc" },
      take: 50,
    });
    const items = rows.map(toItem);
    const { score, gaps } = computeHealthAndGaps(INBOX_PROJECT, items, []);
    return NextResponse.json({
      project: INBOX_PROJECT,
      healthScore: score,
      healthGaps: gaps,
      lastCompressedAt: null,
      items,
      decisions: [],
      graphEdges: [],
    });
  }

  const details = await getProjectDetails(id);
  if ("error" in details) {
    return NextResponse.json(details, { status: 404 });
  }
  return NextResponse.json(details);
}
