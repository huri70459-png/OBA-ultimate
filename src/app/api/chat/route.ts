// v2.3 chat persistence (blueprint "Message Persistence & History").
//   GET    /api/chat?project_id=...  -> { messages: ChatRecord[] } (asc order)
//   DELETE /api/chat?project_id=...  -> clear the thread ("Clear" button)
// project_id empty = the global Inbox thread (projectId null in SQLite).

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { resolveProjectId } from "@/lib/brain/store";
import { db } from "@/lib/db";
import type { ChatRecord, GroundedSource } from "@/lib/brain/types";

export const dynamic = "force-dynamic";

export function toChatRecord(row: {
  id: string;
  projectId: string | null;
  role: string;
  content: string;
  mode: string;
  llmUsed: boolean;
  grounded: boolean;
  sourcesJson: string;
  createdAt: Date;
}): ChatRecord {
  let sources: GroundedSource[] = [];
  try {
    const parsed = JSON.parse(row.sourcesJson || "[]");
    if (Array.isArray(parsed)) sources = parsed as GroundedSource[];
  } catch {
    sources = [];
  }
  return {
    id: row.id,
    project_id: row.projectId,
    role: row.role === "user" ? "user" : "assistant",
    content: row.content,
    mode: row.mode,
    llm_used: row.llmUsed,
    grounded: row.grounded,
    sources,
    created_at: row.createdAt.toISOString(),
  };
}

export async function GET(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: false });
  if (!gate.ok) return NextResponse.json({ error: gate.error, messages: [] }, { status: gate.status });
  await ensureSeedDataOnce();

  const projectRef = req.nextUrl.searchParams.get("project_id") ?? "";
  const projectId = projectRef ? await resolveProjectId(projectRef) : null;
  if (projectRef && !projectId) {
    return NextResponse.json({ messages: [] });
  }
  const rows = await db.chatMessage.findMany({
    where: { projectId },
    orderBy: { createdAt: "asc" },
    take: 200,
  });
  return NextResponse.json({ messages: rows.map(toChatRecord) });
}

export async function DELETE(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: true });
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
  await ensureSeedDataOnce();

  const projectRef = req.nextUrl.searchParams.get("project_id") ?? "";
  const projectId = projectRef ? await resolveProjectId(projectRef) : null;
  await db.chatMessage.deleteMany({ where: { projectId } });
  return NextResponse.json({ ok: true });
}
