"use client";

// TAB 1 — Vault & Markdown Editor with live Snip→Action detection
// v2.1: inbox triage/resolution controls, duplicate-folding ×N badges, and the
// grounded Ask / Synthesize panel (now the ChatWidget conversational surface).
// Captured content is rendered as escaped React text (never
// dangerouslySetInnerHTML) so pasted markup can't create XSS risk.

import { useEffect, useState } from "react";
import { Copy, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeCapture } from "@/lib/brain/analyzer";
import { routeAiModel } from "@/lib/brain/model-routing";
import type { AnalysisResult, BrainItem, ModelRoute } from "@/lib/brain/types";
import { useWorkspace } from "./workspace-store";
import { OccurrenceBadge, itemTypeStyle, shortTime, truncate } from "./ui-shared";
import { ChatWidget } from "./chat-widget";

const ITEM_TYPES = [
  { value: "note", label: "📝 Markdown Note" },
  { value: "screenshot", label: "📸 Screenshot / OCR" },
  { value: "terminal", label: "💻 Terminal Log" },
  { value: "clip", label: "📋 Web Clip" },
  { value: "session", label: "🧩 Work Session" },
];

export const VaultView = () => {
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

  return (
    <section className="flex h-full overflow-hidden" aria-label="Vault and Markdown editor">
      {/* Item stream */}
      <div className="hidden w-72 shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar/40 lg:flex">
        <div className="flex items-center justify-between border-b border-border/70 p-3">
          <span className="text-xs font-semibold text-foreground/90">Captured Project Memory</span>
          <span className="rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            {details?.items.length ?? 0}
          </span>
        </div>
        <div className="brain-scroll min-h-0 flex-1 divide-y divide-border/50 overflow-y-auto">
          {loading && <div className="p-4 text-xs text-muted-foreground">Loading vault…</div>}
          {!loading && details && details.items.length === 0 && (
            <div className="p-4 text-xs text-muted-foreground">
              No captures yet. Paste an error or note on the right — routing is automatic.
            </div>
          )}
          {details?.items.map((item) => {
            const style = itemTypeStyle(item.itemType);
            const Icon = style.icon;
            const status = typeof item.metadata.triage_status === "string" ? item.metadata.triage_status : "open";
            return (
              <div key={item.id} className="group px-3 py-2.5 transition-colors hover:bg-accent/40">
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground/95">
                    {item.title}
                  </span>
                  <OccurrenceBadge metadata={item.metadata} />
                  <span className="shrink-0 text-[10px] text-muted-foreground/70">
                    {shortTime(item.capturedAt)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 pl-5 text-[11px] leading-relaxed text-muted-foreground">
                  {item.structuredSummary || truncate(item.rawContent, 120)}
                </p>
                {typeof item.metadata.fix === "string" && (
                  <div className="ml-5 mt-1.5 inline-flex items-center gap-1 rounded border border-warning/30 bg-warning/10 px-1.5 py-0.5">
                    <Sparkles className="h-3 w-3 text-warning" />
                    <code className="text-[10px] text-warning">{truncate(item.metadata.fix, 30)}</code>
                  </div>
                )}

                {/* v2.1 inbox triage & resolution controls */}
                {isInbox && (
                  <div className="ml-5 mt-2 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={triageTarget[item.id] ?? ""}
                        onChange={(e) => setTriageTarget((m) => ({ ...m, [item.id]: e.target.value }))}
                        aria-label={`Triage target for ${item.title}`}
                        className="min-w-0 flex-1 rounded border border-input bg-muted px-1.5 py-1 text-[10px] text-foreground focus:outline-none"
                      >
                        <option value="">Triage to…</option>
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => triage(item)}
                        disabled={triagingId === item.id}
                        className="rounded bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50"
                      >
                        {triagingId === item.id ? "…" : "Triage"}
                      </button>
                      <button
                        onClick={() => setResolveId(resolveId === item.id ? null : item.id)}
                        className={`rounded border px-2 py-1 text-[10px] font-semibold transition-colors ${
                          status === "resolved"
                            ? "border-success/40 bg-success/10 text-success"
                            : "border-border bg-muted text-muted-foreground hover:text-foreground"
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
                          className="min-w-0 flex-1 rounded border border-input bg-background/70 px-2 py-1 text-[10px] text-foreground placeholder-muted-foreground/50 focus:border-success focus:outline-none"
                        />
                        <button
                          onClick={() => resolve(item)}
                          className="rounded bg-success px-2 py-1 text-[10px] font-semibold text-success-foreground transition-colors hover:bg-success/80"
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

      {/* Editor column */}
      <div className="brain-scroll flex min-w-0 flex-1 flex-col gap-3 overflow-y-auto p-4 select-text md:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note or capture title (optional — auto-extracted if empty)"
            aria-label="Capture title"
            className="w-full border-b border-transparent bg-transparent pb-1 text-lg font-bold text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none sm:w-2/3"
          />
          <div className="flex shrink-0 items-center gap-2">
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              aria-label="Item type"
              className="rounded border border-input bg-muted px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
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
              className="flex items-center gap-1.5 rounded bg-success px-3 py-1.5 text-xs font-medium text-success-foreground transition-colors hover:bg-success/80 disabled:opacity-50"
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
          className="rounded-lg border border-border bg-background/60 px-3 py-2 text-xs text-foreground/90 placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
        />

        {/* Live Snip → Action box */}
        {live?.analysis.actionMetadata.fix && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3">
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase text-warning">
                Snip → Action Detected {live.analysis.actionMetadata.rootCause ? `· ${live.analysis.actionMetadata.rootCause}` : ""}
              </span>
              <code className="font-mono text-xs text-warning">{live.analysis.actionMetadata.fix}</code>
            </div>
            <button
              onClick={() => copyFix(live.analysis.actionMetadata.fix!)}
              className="flex items-center gap-1 rounded bg-warning/20 px-2.5 py-1 text-xs text-warning transition-colors hover:bg-warning/30"
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
          className="min-h-[240px] w-full flex-1 resize-none rounded-xl border border-border bg-background/70 p-4 font-mono text-xs leading-relaxed text-foreground/95 placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span className="font-mono">
            Vault Path: {details ? `ProjectBrainVault/Projects/${details.project.slug}/…` : "Inbox"} ·
            auto-routed on save
          </span>
          {live && (
            <span className="font-mono text-muted-foreground/90">
              Model Route: <span className="text-primary-300">{live.route.targetModel}</span> ·{" "}
              {live.route.reason}
            </span>
          )}
        </div>

        {/* Live markdown-ish preview of extracted summary */}
        {live && (
          <div className="rounded-xl border border-border bg-card/50 p-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Extracted Intelligence Preview
            </div>
            <div className="space-y-1.5 text-xs text-foreground/90">
              <p>
                <span className="text-muted-foreground">Title:</span>{" "}
                <span className="text-foreground">{live.analysis.title}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Summary:</span> {live.analysis.summary}
              </p>
              {live.analysis.decision && (
                <p>
                  <span className="text-success">Decision detected:</span>{" "}
                  {live.analysis.decision.reasoning}
                  {live.analysis.decision.alternatives.length > 0 && (
                    <span className="text-muted-foreground">
                      {" "}
                      · alternatives: {live.analysis.decision.alternatives.join(", ")}
                    </span>
                  )}
                </p>
              )}
              {live.analysis.graphEdges.length > 0 && (
                <p>
                  <span className="text-muted-foreground">Graph edges:</span>{" "}
                  <span className="font-mono text-[11px] text-primary-300">
                    {live.analysis.graphEdges
                      .map((e) => `${truncate(e.source, 24)} -[${e.relation}]-> ${truncate(e.target, 24)}`)
                      .join("  ·  ")}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Grounded chat — evidence-first Q&A over this project's vault */}
        <ChatWidget
          key={isInbox ? "inbox" : details?.project.id ?? "inbox"}
          projectId={isInbox ? "" : details?.project.id ?? ""}
          className="h-[460px] min-h-[320px] shrink-0"
        />

        <div className="pb-2">
          <button
            onClick={() => setTab("timeline")}
            className="text-[11px] text-primary-300 transition-colors hover:text-primary-200"
          >
            View everything in the Universal Timeline →
          </button>
        </div>
      </div>
    </section>
  );
};
