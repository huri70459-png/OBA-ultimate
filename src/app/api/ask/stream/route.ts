// v2.3 (blueprint "Real-time Chat Integration") — NDJSON streaming grounded Q&A.
//
// POST /api/ask/stream
//   body: { query, project_id?, mode?: "ask" | "synthesize" }
//   resp: application/x-ndjson — one JSON event per line:
//     { type:"status", stage, detail }   search / no_evidence / synthesize
//     { type:"sources", sources [...] }  evidence cards as soon as retrieval ends
//     { type:"delta", text }             incremental answer text (token-level for
//                                        Ollama/OpenAI, one buffered chunk otherwise)
//     { type:"saved", message_id, user_message_id }
//     { type:"done", answer, grounded, mode, llm_used }
//     { type:"error", error }
//
// Honesty contract unchanged: with no live LLM the final answer is the offline
// notice and llm_used=false — excerpts are shown, never presented as synthesis.
// Both sides of the exchange are persisted to the per-project ChatMessage thread.

import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { groundedAnswerStream } from "@/lib/brain/grounded";
import { resolveProjectId } from "@/lib/brain/store";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const KEEP_PER_THREAD = 120;

async function pruneThread(projectId: string | null): Promise<void> {
  const total = await db.chatMessage.count({ where: { projectId } });
  if (total <= KEEP_PER_THREAD) return;
  const stale = await db.chatMessage.findMany({
    where: { projectId },
    orderBy: { createdAt: "asc" },
    take: total - KEEP_PER_THREAD,
    select: { id: true },
  });
  if (stale.length > 0) {
    await db.chatMessage.deleteMany({ where: { id: { in: stale.map((r) => r.id) } } });
  }
}

export async function POST(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: false });
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
  await ensureSeedDataOnce();

  const body = await req.json().catch(() => ({}));
  const query = String(body.query ?? "");
  const projectRef = String(body.project_id ?? body.projectId ?? "");
  const mode = body.mode === "synthesize" ? "synthesize" : "ask";
  if (!query.trim()) {
    return NextResponse.json({ error: "A non-empty query is required" }, { status: 400 });
  }
  const projectId = projectRef ? await resolveProjectId(projectRef) : null;
  if (projectRef && !projectId) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: unknown) => {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
        } catch {
          // client disconnected mid-stream — remaining sends become no-ops
        }
      };
      try {
        const userMessageId = randomUUID();
        await db.chatMessage.create({
          data: { id: userMessageId, projectId, role: "user", content: query, mode },
        });
        const result = await groundedAnswerStream({ projectId, query, mode }, send);
        const assistantMessageId = randomUUID();
        await db.chatMessage.create({
          data: {
            id: assistantMessageId,
            projectId,
            role: "assistant",
            content: result.answer,
            mode,
            llmUsed: result.llm_used,
            grounded: result.grounded,
            sourcesJson: JSON.stringify(result.sources ?? []),
          },
        });
        await pruneThread(projectId);
        send({ type: "saved", message_id: assistantMessageId, user_message_id: userMessageId });
      } catch (e) {
        send({ type: "error", error: e instanceof Error ? e.message : "Grounded stream failed" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
