"use client";

// TAB 1 — Vault & Markdown Editor with live Snip→Action detection
// v2.1: inbox triage/resolution controls, duplicate-folding ×N badges, and the
// grounded Ask / Synthesize panel. Captured content is rendered as escaped React
// text (never dangerouslySetInnerHTML) so pasted markup can't create XSS risk.

import { useEffect, useState } from "react";
import { BookOpen, Copy, Save, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeCapture } from "@/lib/brain/analyzer";
import { routeAiModel } from "@/lib/brain/model-routing";
import type { AnalysisResult, BrainItem, GroundedAnswer, ModelRoute } from "@/lib/brain/types";
import { useWorkspace } from "./workspace-store";
import { OccurrenceBadge, itemTypeStyle, shortTime, truncate } from "./ui-shared";

const ITEM_TYPES = [
  { value: "note", label: "📝 Markdown Note" },
  { value: "screenshot", label: "📸 Screenshot / OCR" },
  { value: "terminal", label: "💻 Terminal Log" },
  { value: "clip", label: "📋 Web Clip" },
  { value: "session", label: "🧩 Work Session" },
];

export function VaultView() {
  const details = useWorkspace((s) => s.details);
  const projects = useWorkspace((s) => s.projects);
  const selectedId = useWorkspace((s) => s.selectedId);
  const loading = useWorkspace((s) => s.loadingDetails);
  const refreshAll = useWorkspace((s) => s.refreshAll);
  const setTab = useWorkspace((s) => s.setTab);
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [itemType, setItemType] = useState("note");
  const [windowTitle, setWindowTitle] = useState("");
  const [saving, setSaving] = useState(false);

  // v2.1 inbox triage state
  const [triageTarget, setTriageTarget] = useState<Record<string, string>>({});
  const [triagingId, setTriagingId] = useState<string | null>(null);
  const [resolveId, setResolveId] = useState<string | null>(null);
  const [resolveNote, setResolveNote] = useState("");

  // v2.1 grounded Q&A state (ask / synthesize)
  const [question, setQuestion] = useState("");
  const [groundedBusy, setGroundedBusy] = useState(false);
  const [grounded, setGrounded] = useState<GroundedAnswer | null>(null);

  // Live local intelligence preview — route is a pure sync function; analysis is
  // async (v2 optional LLM enrichment), so it lands in state via useEffect.
  const [live, setLive] = useState<{ route: ModelRoute; analysis: AnalysisResult } | null>(null);
  useEffect(() => {
    if (!body.trim()) {
      setLive(null);
      return;
    }
    const route = routeAiModel({ itemType, rawContent: body, hasImage: itemType === "screenshot" });
    let cancelled = false;
    void analyzeCapture({
      rawContent: body,
      windowTitle: windowTitle || title,
      routedModel: route.targetModel,
    }).then((analysis) => {
      if (!cancelled) setLive({ route, analysis });
    });
    return () => {
      cancelled = true;
    };
  }, [body, itemType, windowTitle, title]);

  const save = async () => {
    if (!body.trim()) {
      toast({ title: "Nothing to capture", description: "Write or paste content first.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raw_content: body,
          item_type: itemType,
          window_title: windowTitle || title || "Workspace Editor",
          source_app: "Workspace UI",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Capture failed");
      if (data.status === "duplicate_merged") {
        // v2.1: the capture folded into an existing item — say so instead of "captured"
        toast({ title: "Duplicate folded — no new item", description: data.toastNotification });
      } else {
        toast({ title: "Captured — Zero-Save", description: data.toastNotification });
      }
      setBody("");
      setTitle("");
      setWindowTitle("");
      await refreshAll();
    } catch (e) {
      toast({
        title: "Capture failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const copyFix = async (fix: string) => {
    try {
      await navigator.clipboard.writeText(fix);
      toast({ title: "Fix copied to clipboard", description: fix });
    } catch {
      toast({ title: "Clipboard unavailable", description: fix, variant: "destructive" });
    }
  };

  // ----------------------------------
  // v2.1 inbox triage & resolution
  // ----------------------------------
  const isInbox = selectedId === "inbox" || details?.project.id === "inbox";

  const triage = async (item: BrainItem) => {
    const target = triageTarget[item.id];
    if (!target) {
      toast({ title: "Pick a project first", description: "Choose the project space this capture belongs to.", variant: "destructive" });
      return;
    }
    setTriagingId(item.id);
    try {
      const res = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: item.id, project_id: target }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Triage failed");
      toast({
        title: `Triaged into ${data.project_name}`,
        description: data.file_moved ? `Vault file moved to ${data.file_path}` : "Item re-pointed in the vault index.",
      });
      await refreshAll();
    } catch (e) {
      toast({ title: "Triage failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    } finally {
      setTriagingId(null);
    }
  };

  const resolve = async (item: BrainItem) => {
    try {
      const res = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: item.id, resolution: resolveNote }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Resolve failed");
      toast({ title: "Marked resolved", description: resolveNote.trim() ? resolveNote : "Resolved without a note." });
      setResolveId(null);
      setResolveNote("");
      await refreshAll();
    } catch (e) {
      toast({ title: "Resolve failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    }
  };

  // ----------------------------------
  // v2.1 grounded ask / synthesize
  // ----------------------------------
  const runGrounded = async (mode: "ask" | "synthesize") => {
    if (!question.trim() || groundedBusy) return;
    setGroundedBusy(true);
    setGrounded(null);
    try {
      const res = await fetch(mode === "synthesize" ? "/api/synthesize" : "/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Inbox has no project id — an empty project_id searches the whole vault
        body: JSON.stringify({
          query: question,
          project_id: isInbox ? "" : details?.project.id ?? "",
        }),
      });
      const data: GroundedAnswer = await res.json();
      if (!res.ok) throw new Error(data.error || "Grounded query failed");
      setGrounded(data);
    } catch (e) {
      toast({ title: "Grounded query failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    } finally {
      setGroundedBusy(false);
    }
  };

  return (
    <section className="flex h-full overflow-hidden" aria-label="Vault and Markdown editor">
      {/* Item stream */}
      <div className="hidden w-72 shrink-0 flex-col overflow-hidden border-r border-slate-800/80 bg-slate-950/30 lg:flex">
        <div className="flex items-center justify-between border-b border-slate-800/60 p-3">
          <span className="text-xs font-semibold text-slate-300">Captured Project Memory</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400">
            {details?.items.length ?? 0}
          </span>
        </div>
        <div className="brain-scroll min-h-0 flex-1 divide-y divide-slate-800/50 overflow-y-auto">
          {loading && (
            <div className="p-4 text-xs text-slate-500">Loading vault…</div>
          )}
          {!loading && details && details.items.length === 0 && (
            <div className="p-4 text-xs text-slate-500">
              No captures yet. Paste an error or note on the right — routing is automatic.
            </div>
          )}
          {details?.items.map((item) => {
            const style = itemTypeStyle(item.itemType);
            const Icon = style.icon;
            const status = typeof item.metadata.triage_status === "string" ? item.metadata.triage_status : "open";
            return (
              <div key={item.id} className="group px-3 py-2.5 transition-colors hover:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <Icon className={`h-3.5 w-3.5 shrink-0 text-slate-400`} />
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-200">
                    {item.title}
                  </span>
                  <OccurrenceBadge metadata={item.metadata} />
                  <span className="shrink-0 text-[10px] text-slate-500">
                    {shortTime(item.capturedAt)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 pl-5 text-[11px] leading-relaxed text-slate-500">
                  {item.structuredSummary || truncate(item.rawContent, 120)}
                </p>
                {typeof item.metadata.fix === "string" && (
                  <div className="mt-1.5 ml-5 inline-flex items-center gap-1 rounded border border-amber-500/25 bg-amber-500/10 px-1.5 py-0.5">
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    <code className="text-[10px] text-amber-200">{truncate(item.metadata.fix, 30)}</code>
                  </div>
                )}

                {/* v2.1 inbox triage & resolution controls */}
                {isInbox && (
                  <div className="mt-2 ml-5 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={triageTarget[item.id] ?? ""}
                        onChange={(e) => setTriageTarget((m) => ({ ...m, [item.id]: e.target.value }))}
                        aria-label={`Triage target for ${item.title}`}
                        className="min-w-0 flex-1 rounded border border-slate-700 bg-slate-800 px-1.5 py-1 text-[10px] text-slate-200 focus:outline-none"
                      >
                        <option value="">Triage to…</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => triage(item)}
                        disabled={triagingId === item.id}
                        className="rounded bg-indigo-600/90 px-2 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
                      >
                        {triagingId === item.id ? "…" : "Triage"}
                      </button>
                      <button
                        onClick={() => setResolveId(resolveId === item.id ? null : item.id)}
                        className={`rounded border px-2 py-1 text-[10px] font-semibold transition-colors ${
                          status === "resolved"
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                            : "border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                        }`}
                      >
                        {status === "resolved" ? "Resolved ✓" : "Resolve"}
                      </button>
                    </div>
                    {resolveId === item.id && (
                      <div className="flex items-center gap-1.5">
                        <input
                          value={resolveNote}
                          onChange={(e) => setResolveNote(e.target.value)}
                          placeholder="Resolution note (optional)"
                          aria-label="Resolution note"
                          className="min-w-0 flex-1 rounded border border-slate-700 bg-slate-950/70 px-2 py-1 text-[10px] text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                          onClick={() => resolve(item)}
                          className="rounded bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-emerald-500"
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-y-auto brain-scroll p-4 md:p-5 select-text">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note or capture title (optional — auto-extracted if empty)"
            aria-label="Capture title"
            className="w-full border-b border-transparent bg-transparent pb-1 text-lg font-bold text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none sm:w-2/3"
          />
          <div className="flex shrink-0 items-center gap-2">
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              aria-label="Item type"
              className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              {ITEM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-1.5 rounded bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? "Saving…" : "Save to Vault (Zero-Tag)"}
            </button>
          </div>
        </div>

        <input
          type="text"
          value={windowTitle}
          onChange={(e) => setWindowTitle(e.target.value)}
          placeholder="Window / file context (e.g. 'gateway.mjs - VS Code') — boosts auto-routing accuracy"
          aria-label="Window title context"
          className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
        />

        {/* Live Snip → Action box */}
        {live?.analysis.actionMetadata.fix && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase text-amber-400">
                Snip → Action Detected {live.analysis.actionMetadata.rootCause ? `· ${live.analysis.actionMetadata.rootCause}` : ""}
              </span>
              <code className="text-xs text-amber-200 font-mono">{live.analysis.actionMetadata.fix}</code>
            </div>
            <button
              onClick={() => copyFix(live.analysis.actionMetadata.fix!)}
              className="flex items-center gap-1 rounded bg-amber-500/20 px-2.5 py-1 text-xs text-amber-200 transition-colors hover:bg-amber-500/30"
            >
              <Copy className="h-3 w-3" /> Copy Fix
            </button>
          </div>
        )}

        <textarea
          rows={14}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={
            "Paste terminal error, write an architectural decision ('Decision: ... Reason: ... Alternatives: ...'), or type notes...\n\nAuto-detection: missing modules → install fix · Decision blocks → decision graph · file mentions → knowledge graph"
          }
          aria-label="Capture content"
          className="min-h-[240px] w-full flex-1 resize-none rounded-xl border border-slate-800 bg-slate-950/70 p-4 font-mono text-xs leading-relaxed text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="font-mono">
            Vault Path: {details ? `ProjectBrainVault/Projects/${details.project.slug}/…` : "Inbox"} ·
            auto-routed on save
          </span>
          {live && (
            <span className="font-mono text-slate-400">
              Model Route: <span className="text-indigo-300">{live.route.targetModel}</span> ·{" "}
              {live.route.reason}
            </span>
          )}
        </div>

        {/* Live markdown-ish preview of extracted summary */}
        {live && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Extracted Intelligence Preview
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>
                <span className="text-slate-500">Title:</span>{" "}
                <span className="text-slate-100">{live.analysis.title}</span>
              </p>
              <p>
                <span className="text-slate-500">Summary:</span> {live.analysis.summary}
              </p>
              {live.analysis.decision && (
                <p>
                  <span className="text-emerald-400">Decision detected:</span>{" "}
                  {live.analysis.decision.reasoning}
                  {live.analysis.decision.alternatives.length > 0 && (
                    <span className="text-slate-500">
                      {" "}
                      · alternatives: {live.analysis.decision.alternatives.join(", ")}
                    </span>
                  )}
                </p>
              )}
              {live.analysis.graphEdges.length > 0 && (
                <p>
                  <span className="text-slate-500">Graph edges:</span>{" "}
                  <span className="font-mono text-[11px] text-violet-300">
                    {live.analysis.graphEdges
                      .map((e) => `${truncate(e.source, 24)} -[${e.relation}]-> ${truncate(e.target, 24)}`)
                      .join("  ·  ")}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* v2.1 Grounded Ask / Synthesize — evidence-first Q&A over this project's vault */}
        <div className="rounded-xl border border-indigo-500/25 bg-indigo-500/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            <BookOpen className="h-3.5 w-3.5" />
            Grounded Ask &amp; Wiki Synthesis — answers cite vault evidence only
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runGrounded("ask")}
              placeholder="Ask this project's brain… (e.g. 'how did we fix the dotenv error?')"
              aria-label="Grounded question"
              className="min-w-0 flex-1 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            />
            <button
              onClick={() => runGrounded("ask")}
              disabled={groundedBusy || !question.trim()}
              className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
            >
              <Send className="h-3 w-3" /> Ask
            </button>
            <button
              onClick={() => runGrounded("synthesize")}
              disabled={groundedBusy || !question.trim()}
              className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-xs font-medium text-indigo-200 transition-colors hover:bg-indigo-500/20 disabled:opacity-50"
            >
              Synthesize
            </button>
          </div>

          {groundedBusy && <p className="mt-3 text-[11px] text-slate-500">Searching vault evidence…</p>}
          {grounded && !groundedBusy && (
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                    grounded.llm_used
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {grounded.llm_used
                    ? grounded.mode === "synthesize" ? "LLM wiki synthesis" : "LLM-grounded answer"
                    : "Offline · evidence excerpts only"}
                </span>
                <span className="text-[10px] text-slate-500">{grounded.sources.length} source(s)</span>
              </div>
              <p className="whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-200">
                {grounded.answer}
              </p>
              {grounded.sources.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sources</p>
                  {grounded.sources.map((s, i) => (
                    <div key={s.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-2.5">
                      <p className="text-[11px] font-semibold text-slate-200">
                        <span className="text-indigo-300">[{i + 1}]</span> {s.title}
                        <span className="ml-2 font-normal text-slate-500">{shortTime(s.captured_at)}</span>
                      </p>
                      <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-slate-400">{s.excerpt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pb-2">
          <button
            onClick={() => setTab("timeline")}
            className="text-[11px] text-indigo-400 transition-colors hover:text-indigo-300"
          >
            View everything in the Universal Timeline →
          </button>
        </div>
      </div>
    </section>
  );
}
