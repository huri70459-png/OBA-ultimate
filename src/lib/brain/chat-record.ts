import type { ChatRecord, GroundedSource } from "@/lib/brain/types";

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
