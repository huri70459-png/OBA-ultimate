"use client";

// TAB 4 — 3-Tier Context Injector & Anti-Drift Prompt Structurer

import { useState } from "react";
import { ClipboardCopy, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ContextPayload } from "@/lib/brain/types";
import { useWorkspace } from "./workspace-store";
import { itemTypeStyle, shortTime } from "./ui-shared";

export function ContextView() {
  const details = useWorkspace((s) => s.details);
  const selectedId = useWorkspace((s) => s.selectedId);
  const { toast } = useToast();

  const [query, setQuery] = useState("");
  const [goal, setGoal] = useState("");
  const [payload, setPayload] = useState<ContextPayload | null>(null);
  const [loading, setLoading] = useState(false);

  const synth = async () => {
    if (!selectedId) {
      toast({ title: "Select a project first", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({ project_id: selectedId, q: query, goal });
      const res = await fetch(`/api/context?${params.toString()}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to build payload");
      setPayload(data as ContextPayload);
      toast({
        title: "3-Tier Context synthesized",
        description: `${data.token_budget_status ?? "spec ready"} · backend: ${data.backend_used?.provider ?? "unknown"} · ready to paste into any LLM`,
      });
    } catch (e) {
      toast({
        title: "Synthesis failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `${what} copied`, description: "Paste it into Cursor, Claude, or any LLM." });
    } catch {
      toast({ title: "Clipboard unavailable", variant: "destructive" });
    }
  };

  const projectIdForApi = details?.project.id ?? selectedId ?? "";

  return (
    <section className="h-full overflow-y-auto brain-scroll p-4 md:p-6 select-text" aria-label="Context injector">
      <div className="mx-auto max-w-4xl space-y-5">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-white">
            <Rocket className="h-4 w-4 text-indigo-400" /> Context Injector &amp; Prompt Structurer
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Rewrites any raw, unclear thought into a strict 5-Section Engineering Spec anchored to
            Rolling Memory (Tier 1) + Active Decisions (Tier 2) + Vault Evidence (Tier 3) — under a
            2,500-token budget, with zero context drift.
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label htmlFor="ctx-query" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Active query / bug keyword
              </label>
              <input
                id="ctx-query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. deployment error gateway"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="ctx-goal" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Current task (optional — gets rewritten into an execution spec)
              </label>
              <input
                id="ctx-goal"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. fix the Render deployment and add dotenv"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500">
              Target: {details?.project.name ?? "Inbox"} ({projectIdForApi || "no project"})
            </span>
            <button
              onClick={synth}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
            >
              <Rocket className="h-3.5 w-3.5" />
              {loading ? "Synthesizing…" : "Synthesize 3-Tier Context + Rewrite Prompt"}
            </button>
          </div>
        </div>

        {payload && (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              {/* Tier 1 */}
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Tier 1</span>
                  <span className="text-[10px] text-slate-500">Rolling Memory</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-200">{payload.tier_1_rolling_memory}</p>
              </div>

              {/* Tier 2 */}
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Tier 2</span>
                  <span className="text-[10px] text-slate-500">{payload.tier_2_decision_graph.length} Decisions</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto brain-scroll">
                  {payload.tier_2_decision_graph.length === 0 && (
                    <p className="text-xs text-slate-500">No active decisions.</p>
                  )}
                  {payload.tier_2_decision_graph.map((d) => (
                    <p key={d.decidedAt + d.title} className="text-[11px] leading-relaxed text-slate-300">
                      <span className="font-semibold text-amber-300">{truncateLocal(d.title, 40)}</span>{" "}
                      — {truncateLocal(d.decision, 80)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tier 3 */}
              <div className="rounded-xl border border-violet-500/25 bg-violet-500/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Tier 3</span>
                  <span className="text-[10px] text-slate-500">{payload.tier_3_recent_and_relevant_evidence.length} Evidence</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto brain-scroll">
                  {payload.tier_3_recent_and_relevant_evidence.map((ev) => {
                    const style = itemTypeStyle(ev.type);
                    return (
                      <p key={ev.title + ev.captured_at} className="text-[11px] leading-relaxed text-slate-300">
                        <span className={`mr-1 rounded border px-1 text-[9px] uppercase ${style.badge}`}>{ev.type}</span>
                        {truncateLocal(ev.title, 48)}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Structured prompt output */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Structured Execution Spec (anti-drift)</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      (payload.token_budget_status ?? "").startsWith("OPTIMAL")
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {payload.token_budget_status ?? `≈${Math.round((payload.structured_prompt_markdown?.length ?? 0) / 4)} tokens`}
                  </span>
                  {payload.backend_used && (
                    <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-300">
                      backend: {payload.backend_used.provider}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copy(payload.structured_prompt_markdown ?? "", "Structured prompt")}
                    className="flex items-center gap-1.5 rounded bg-indigo-600 px-2.5 py-1 text-xs text-white transition-colors hover:bg-indigo-500"
                  >
                    <ClipboardCopy className="h-3.5 w-3.5" /> Copy Prompt
                  </button>
                  <button
                    onClick={() => copy(JSON.stringify(payload, null, 2), "JSON payload")}
                    className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-700"
                  >
                    Copy JSON
                  </button>
                </div>
              </div>
              {(payload.refined_objective || (payload.known_fixes_referenced?.length ?? 0) > 0) && (
                <div className="space-y-1.5 border-b border-slate-800 bg-slate-900/40 p-3">
                  {payload.refined_objective && (
                    <p className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-300">
                      <span className="font-semibold text-emerald-400">Clarified objective:</span>{" "}
                      {payload.refined_objective}
                    </p>
                  )}
                  {(payload.known_fixes_referenced?.length ?? 0) > 0 && (
                    <p className="text-[11px] text-slate-400">
                      <span className="font-semibold text-amber-400">Known fixes referenced:</span>{" "}
                      {payload.known_fixes_referenced!.join(" · ")}
                    </p>
                  )}
                </div>
              )}
              <pre className="brain-scroll max-h-96 overflow-auto whitespace-pre-wrap p-4 font-mono text-[11px] leading-relaxed text-slate-300">
                {payload.structured_prompt_markdown}
              </pre>
            </div>

            {/* Evidence detail */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Evidence used (Tier 3)
              </div>
              <div className="space-y-2">
                {payload.tier_3_recent_and_relevant_evidence.map((ev) => (
                  <div key={ev.title + ev.captured_at} className="text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-200">{ev.title}</span>{" "}
                    <span className="text-slate-600">· {shortTime(ev.captured_at)}</span>
                    <p className="mt-0.5 leading-relaxed">{ev.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!payload && (
          <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500">
            Type a task above and hit <span className="text-indigo-300">Synthesize</span> — your
            project&apos;s memory becomes a structured, constraint-carrying prompt.
          </div>
        )}
      </div>
    </section>
  );
}

function truncateLocal(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
