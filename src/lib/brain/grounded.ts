// Project Brain OS — v2.1 Grounded Q&A & Wiki Synthesis
// Port of brain_api.py v2.1 grounded_answer() (/ask and /synthesize).
//
// Evidence-first contract: every answer is grounded in vault sources retrieved by
// search. When no LLM backend is available, the endpoint returns the closest indexed
// evidence excerpts with an explicit offline notice — it never presents excerpts as
// a generated answer (README v2.1: "avoids pretending a generated answer exists").

import { llmBridge } from "./llm-bridge";
import { db } from "@/lib/db";
import { searchVaultHybrid } from "./store";
import type { GroundedAnswer, GroundedSource } from "./types";

const EXCERPT_CHARS = 700;
const MAX_SOURCES = 8;

const ASK_INSTRUCTION =
  "Answer using only the supplied evidence. If it is insufficient, say so. " +
  "Cite evidence inline with [1], [2], etc.";
const SYNTHESIZE_INSTRUCTION =
  "Synthesize a concise project wiki note from only the evidence. " +
  "Mark uncertainty and do not invent facts.";
const NO_EVIDENCE_ANSWER =
  "I couldn't find supporting project evidence in the local vault. " +
  "Capture or add relevant notes first.";
const OFFLINE_ANSWER =
  "Offline mode: no live LLM response is available. These are the closest indexed " +
  "evidence excerpts; use the source list below to inspect them.";

export async function groundedAnswer(input: {
  projectId?: string | null;
  query: string;
  mode?: "ask" | "synthesize";
}): Promise<GroundedAnswer> {
  const { projectId = null, mode = "ask" } = input;
  const query = (input.query ?? "").trim();
  if (!query) {
    return {
      answer: "A non-empty query is required",
      sources: [],
      grounded: false,
      mode,
      llm_used: false,
      error: "A non-empty query is required",
    };
  }

  // Evidence retrieval: hybrid semantic + FTS keeps recall high for paraphrased questions.
  // A relevance gate keeps the "no evidence" contract honest: hybrid mode always ranks
  // *something*, so require a real token match (any FTS hit) or a STRONG cosine match
  // (>= 0.45) before treating an item as evidence. Measured on brain-hash-v1: junk
  // single-token queries top out at ~0.34 cosine, weak paraphrases ~0.34-0.42, strong
  // on-topic matches 0.48+; FTS covers everything sharing vocabulary (Python parity:
  // search_vault returns [] for garbage queries, so grounded Q&A admits "no evidence").
  const ranked = await searchVaultHybrid(query, {
    projectId: projectId ?? undefined,
    limit: MAX_SOURCES * 3,
  });
  const hits = ranked
    .filter((h) => h.modes.includes("fts") || (h.similarity ?? 0) >= 0.45)
    .slice(0, MAX_SOURCES);

  if (hits.length === 0) {
    return {
      answer: NO_EVIDENCE_ANSWER,
      sources: [],
      grounded: false,
      mode,
      llm_used: false,
    };
  }

  const sources: GroundedSource[] = hits.map((h) => ({
    id: h.id,
    title: h.title,
    project_id: h.projectId,
    captured_at: h.capturedAt,
    excerpt: (h.structuredSummary || h.rawContent || "").slice(0, EXCERPT_CHARS),
  }));

  const project = projectId
    ? await db.project.findUnique({ where: { id: projectId }, select: { name: true } })
    : null;
  const evidence = sources
    .map((s, i) => `[${i + 1}] ${s.title} (${s.captured_at})\n${s.excerpt}`)
    .join("\n\n");

  const generated = await llmBridge.completeText(
    mode === "synthesize" ? SYNTHESIZE_INSTRUCTION : ASK_INSTRUCTION,
    `Project: ${project?.name ?? "All projects"}\nQuestion/task: ${query}\n\nEvidence:\n${evidence}`,
    700
  );

  return {
    // Honest fallback: excerpts notice, never a fabricated generated answer
    answer: generated || OFFLINE_ANSWER,
    sources,
    grounded: true,
    mode,
    llm_used: Boolean(generated),
  };
}
