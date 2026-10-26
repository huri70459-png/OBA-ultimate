"use client";

// Dialogs — Zero-Save Capture, New Project, Log Decision, Search Results, Self-Test

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Search, XCircle, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import type { BrainItem, CaptureResult, CrossProjectSolution, SelfTestCheck } from "@/lib/brain/types";
import { trackEvent } from "@/lib/telemetry";
import { useWorkspace } from "./workspace-store";
import { itemTypeStyle, shortTime } from "./ui-shared";

const FIELD_CLS =
  "w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none";

// ==========================================
// ZERO-SAVE CAPTURE
// ==========================================
export const CaptureDialog = () => {
  const open = useWorkspace((s) => s.captureOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const refreshAll = useWorkspace((s) => s.refreshAll);
  const { toast } = useToast();

  const [content, setContent] = useState("");
  const [type, setType] = useState("terminal");
  const [windowTitle, setWindowTitle] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!content.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raw_content: content,
          item_type: type,
          window_title: windowTitle || "Quick Capture",
          source_app: "Workspace UI",
        }),
      });
      const data: CaptureResult = await res.json();
      if (!res.ok) throw new Error((data as unknown as { error: string }).error);
      if (data.status === "duplicate_merged") {
        // v2.1: exact duplicate folding — the repeat capture merged into the existing item
        toast({ title: "Duplicate folded — no new item", description: data.toastNotification });
      } else {
        toast({ title: "Captured — Zero-Save", description: data.toastNotification });
      }
      trackEvent("capture_saved", { status: data.status, item_type: type });
      setContent("");
      setWindowTitle("");
      close("captureOpen");
      await refreshAll();
    } catch (e) {
      toast({
        title: "Capture failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("captureOpen")}>
      <DialogContent className="border-border bg-card text-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">⚡ Zero-Save Capture</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Paste anything. Project routing, model selection, fix extraction, and graph linking are
            automatic.
          </DialogDescription>
        </DialogHeader>

        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste a stack trace, terminal error, decision note, or any knowledge…"
          className="w-full resize-none rounded-lg border border-border bg-background/80 p-3 font-mono text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
          aria-label="Capture content"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Item type"
            className="rounded border border-input bg-muted px-2 py-1.5 text-xs text-foreground focus:outline-none"
          >
            <option value="note">📝 Note</option>
            <option value="screenshot">📸 Screenshot</option>
            <option value="terminal">💻 Terminal</option>
            <option value="clip">📋 Web Clip</option>
          </select>
          <input
            type="text"
            value={windowTitle}
            onChange={(e) => setWindowTitle(e.target.value)}
            placeholder="Window title (optional)"
            className="rounded border border-input bg-background/70 px-2.5 py-1.5 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
            aria-label="Window title"
          />
        </div>

        <DialogFooter>
          <button
            onClick={submit}
            disabled={busy || !content.trim()}
            className="w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50"
          >
            {busy ? "Capturing…" : "Capture (Zero-Save)"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ==========================================
// NEW PROJECT
// ==========================================
export const NewProjectDialog = () => {
  const open = useWorkspace((s) => s.newProjectOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const refreshAll = useWorkspace((s) => s.refreshAll);
  const selectProject = useWorkspace((s) => s.selectProject);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [rootPath, setRootPath] = useState("");
  const [keywords, setKeywords] = useState("");
  const [gitRemotes, setGitRemotes] = useState("");
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          root_path: rootPath,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          git_remotes: gitRemotes.split(",").map((k) => k.trim()).filter(Boolean),
          rolling_summary: summary,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast({ title: "Project space created", description: `${data.name} is ready to receive captures.` });
      setName("");
      setRootPath("");
      setKeywords("");
      setGitRemotes("");
      setSummary("");
      close("newProjectOpen");
      await refreshAll();
      if (data.id) selectProject(data.id);
    } catch (e) {
      toast({
        title: "Could not create project",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("newProjectOpen")}>
      <DialogContent className="border-border bg-card text-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">＋ New Project Space</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Register fingerprints (root path, keywords, git remotes) so captures auto-route here.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5">
          <input className={FIELD_CLS} placeholder="Project name *" value={name} onChange={(e) => setName(e.target.value)} aria-label="Project name" />
          <input className={FIELD_CLS} placeholder="Root path (e.g. C:/dev/my-app)" value={rootPath} onChange={(e) => setRootPath(e.target.value)} aria-label="Root path" />
          <input className={FIELD_CLS} placeholder="Keywords, comma separated (e.g. gateway.mjs, render)" value={keywords} onChange={(e) => setKeywords(e.target.value)} aria-label="Keywords" />
          <input className={FIELD_CLS} placeholder="Git remotes, comma separated (e.g. github.com/you/repo)" value={gitRemotes} onChange={(e) => setGitRemotes(e.target.value)} aria-label="Git remotes" />
          <textarea className={`${FIELD_CLS} resize-none`} rows={3} placeholder="Rolling summary — compressed project memory injected as Tier 1 context" value={summary} onChange={(e) => setSummary(e.target.value)} aria-label="Rolling summary" />
        </div>
        <DialogFooter>
          <button
            onClick={submit}
            disabled={busy || !name.trim()}
            className="w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50"
          >
            {busy ? "Creating…" : "Create Project Space"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ==========================================
// LOG DECISION (manual)
// ==========================================
export const DecisionDialog = () => {
  const open = useWorkspace((s) => s.decisionOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const selectedId = useWorkspace((s) => s.selectedId);
  const details = useWorkspace((s) => s.details);
  const refreshAll = useWorkspace((s) => s.refreshAll);
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [decision, setDecision] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [alternatives, setAlternatives] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!title.trim() || !decision.trim() || !reasoning.trim() || !selectedId) return;
    setBusy(true);
    try {
      const res = await fetch("/api/decisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: selectedId,
          title,
          decision,
          reasoning,
          alternatives: alternatives.split(",").map((a) => a.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast({ title: "Decision logged", description: "Future AI sessions must respect it (Tier 2)." });
      setTitle("");
      setDecision("");
      setReasoning("");
      setAlternatives("");
      close("decisionOpen");
      await refreshAll();
    } catch (e) {
      toast({
        title: "Could not log decision",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("decisionOpen")}>
      <DialogContent className="border-border bg-card text-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">⚖️ Log Architectural Decision</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Project: <span className="text-primary-300">{details?.project.name ?? "—"}</span> · recorded
            into Tier 2 of every future context payload.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5">
          <input className={FIELD_CLS} placeholder="Decision title *" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Decision title" />
          <input className={FIELD_CLS} placeholder="Chosen approach *" value={decision} onChange={(e) => setDecision(e.target.value)} aria-label="Chosen approach" />
          <textarea className={`${FIELD_CLS} resize-none`} rows={3} placeholder="Reasoning *" value={reasoning} onChange={(e) => setReasoning(e.target.value)} aria-label="Reasoning" />
          <input className={FIELD_CLS} placeholder="Alternatives rejected, comma separated" value={alternatives} onChange={(e) => setAlternatives(e.target.value)} aria-label="Alternatives" />
        </div>
        <DialogFooter>
          <button
            onClick={submit}
            disabled={busy || !title.trim() || !decision.trim() || !reasoning.trim()}
            className="w-full rounded-lg bg-success px-4 py-2 text-xs font-semibold text-success-foreground transition-colors hover:bg-success/80 disabled:opacity-50"
          >
            {busy ? "Logging…" : "Log Decision"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ==========================================
// UNIVERSAL SEARCH RESULTS (+ v2 Cross-Project Bug Reuse)
// ==========================================
export const SearchDialog = () => {
  const open = useWorkspace((s) => s.searchOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const seed = useWorkspace((s) => s.searchSeed);
  const details = useWorkspace((s) => s.details);
  const { toast } = useToast();

  const [query, setQuery] = useState(seed);
  const [results, setResults] = useState<BrainItem[]>([]);
  const [solutions, setSolutions] = useState<CrossProjectSolution[]>([]);
  const [mode, setMode] = useState<"vault" | "cross">("vault");
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  const run = useCallback(
    async (q: string, m: "vault" | "cross" = "vault") => {
      if (!q.trim()) return;
      setLoading(true);
      setRan(true);
      try {
        if (m === "cross") {
          // v2: search OTHER projects for a fix that already solved this bug
          const params = new URLSearchParams({ q });
          if (details?.project.id) params.set("exclude_project_id", details.project.id);
          const res = await fetch(`/api/cross-project?${params.toString()}`, { cache: "no-store" });
          const data = await res.json();
          setSolutions(data.solutions ?? []);
          setResults([]);
        } else {
          const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
          const data = await res.json();
          setResults(data.results ?? []);
          setSolutions([]);
        }
      } catch {
        setResults([]);
        setSolutions([]);
        toast({ title: "Search failed", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    },
    [toast, details],
  );

  useEffect(() => {
    if (open && seed) {
      setQuery(seed);
      void run(seed, mode);
    }
    if (!open) {
      setRan(false);
      setResults([]);
      setSolutions([]);
    }
  }, [open, seed, mode, run]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("searchOpen")}>
      <DialogContent className="border-border bg-card text-foreground sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Search className="h-4 w-4 text-primary-300" /> Universal Vault Search
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Full-text + semantic search across every capture — or switch to
            <span className="text-success"> Cross-Project</span> to find fixes already solved in
            your other projects.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-1.5" role="tablist" aria-label="Search mode">
          <button
            role="tab"
            aria-selected={mode === "vault"}
            onClick={() => {
              setMode("vault");
              if (ran && query.trim()) void run(query, "vault");
            }}
            className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              mode === "vault"
                ? "border-primary/50 bg-primary/15 text-primary-300"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            This vault
          </button>
          <button
            role="tab"
            aria-selected={mode === "cross"}
            onClick={() => {
              setMode("cross");
              if (ran && query.trim()) void run(query, "cross");
            }}
            className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              mode === "cross"
                ? "border-success/50 bg-success/15 text-success"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
            title="Cross-Project Learning: find the fix that already worked in another project"
          >
            Cross-Project Fixes
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run(query, mode)}
            placeholder="Search the entire brain…"
            className="flex-1 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
            aria-label="Search query"
            autoFocus
          />
          <button
            onClick={() => run(query, mode)}
            className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-400"
          >
            Search
          </button>
        </div>

        <ScrollArea className="max-h-[50vh] pr-2">
          <div className="space-y-2">
            {loading && <p className="p-4 text-center text-xs text-muted-foreground">Searching…</p>}
            {!loading && ran && mode === "vault" && results.length === 0 && (
              <p className="p-4 text-center text-xs text-muted-foreground">No matches in the vault.</p>
            )}
            {!loading && ran && mode === "cross" && solutions.length === 0 && (
              <p className="p-4 text-center text-xs text-muted-foreground">
                No reusable fixes found in your other projects — you are breaking new ground here.
              </p>
            )}
            {mode === "cross" &&
              solutions.map((s) => (
                <div key={s.item_id} className="rounded-lg border border-success/25 bg-success/5 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-success">
                      {s.source_project}
                    </span>
                    <span className="text-xs font-semibold text-foreground">{s.title}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground/70">{shortTime(s.captured_at)}</span>
                  </div>
                  {s.summary && <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{s.summary}</p>}
                  {s.suggested_fix && (
                    <p className="mt-1.5 font-mono text-[11px] text-success">
                      Reusable fix: <span className="rounded bg-background/80 px-1.5 py-0.5">{s.suggested_fix}</span>
                    </p>
                  )}
                </div>
              ))}
            {mode === "vault" &&
              results.map((r) => {
                const style = itemTypeStyle(r.itemType);
                const Icon = style.icon;
                return (
                  <div key={r.id} className="rounded-lg border border-border bg-card/50 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold text-foreground">{r.title}</span>
                      <span className={`rounded border px-1.5 py-0.5 text-[10px] uppercase ${style.badge}`}>
                        {style.label}
                      </span>
                      <span className="ml-auto text-[10px] text-muted-foreground/70">{shortTime(r.capturedAt)}</span>
                    </div>
                    {r.structuredSummary && (
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{r.structuredSummary}</p>
                    )}
                    {r.filePath && (
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">{r.filePath}</p>
                    )}
                  </div>
                );
              })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// ==========================================
// SELF-TEST DIAGNOSTICS
// ==========================================
export const SelfTestDialog = () => {
  const open = useWorkspace((s) => s.selfTestOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const refreshAll = useWorkspace((s) => s.refreshAll);

  const [checks, setChecks] = useState<SelfTestCheck[] | null>(null);
  const [running, setRunning] = useState(false);
  const [ok, setOk] = useState(true);

  const runTest = useCallback(async () => {
    setRunning(true);
    setChecks(null);
    try {
      const res = await fetch("/api/self-test", { cache: "no-store" });
      const data = await res.json();
      setChecks(data.checks ?? []);
      setOk(Boolean(data.ok));
      void refreshAll();
    } catch {
      setChecks([{ name: "Network", status: "FAIL", detail: "Could not reach /api/self-test" }]);
      setOk(false);
    } finally {
      setRunning(false);
    }
  }, [refreshAll]);

  // Re-run the harness every time the dialog opens (runTest is stable via useCallback)
  useEffect(() => {
    if (open) void runTest();
  }, [open, runTest]);

  const iconFor = (status: string) =>
    status === "PASS" ? (
      <CheckCircle2 className="h-4 w-4 text-success" />
    ) : status === "WARN" ? (
      <AlertTriangle className="h-4 w-4 text-warning" />
    ) : (
      <XCircle className="h-4 w-4 text-destructive" />
    );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("selfTestOpen")}>
      <DialogContent className="border-border bg-card text-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">🩺 Guided Scenario &amp; Chaos Test</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Runs 10 real-world scenarios against the live engine: vault init, zero-save capture,
            ambiguous multi-project chaos, two-way disk sync, memory compression &amp; session
            replay, anti-drift prompt budget, cross-project reuse, MCP resilience, v2.1 exact
            duplicate folding, and v2.1 inbox triage + grounded ask — with plain-English fix
            pointers if anything ever breaks.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {running && <p className="p-4 text-center text-xs text-muted-foreground">Running diagnostics…</p>}
          {checks?.map((c) => (
            <div key={c.name} className="flex items-start gap-2.5 rounded-lg border border-border bg-card/50 p-3">
              <span className="mt-0.5">{iconFor(c.status)}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">{c.name}</p>
                <p className="mt-0.5 break-words text-[11px] text-muted-foreground">{c.detail}</p>
              </div>
            </div>
          ))}
          {checks && (
            <p className={`pt-1 text-center text-xs font-semibold ${ok ? "text-success" : "text-warning"}`}>
              {ok
                ? `🎉 ALL ${checks.length}/${checks.length} SCENARIOS PASSED! Your Project Brain OS is 100% verified.`
                : "Some scenarios need attention — check the fix hints above."}
            </p>
          )}
        </div>

        <DialogFooter>
          <button
            onClick={runTest}
            disabled={running}
            className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground/90 transition-colors hover:bg-accent disabled:opacity-50"
          >
            {running ? "Running…" : "Run Again"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ==========================================
// FEEDBACK (v2.4 — blueprint "User Feedback Collection")
// Low-friction bug/suggestion funnel: every session can submit; the owner
// reviews the feed later. Nothing leaves the machine (logs/feedback.jsonl).
// ==========================================
export const FeedbackDialog = () => {
  const open = useWorkspace((s) => s.feedbackOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<"bug" | "feature" | "general">("general");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (message.trim().length < 4) {
      toast({ title: "Tell us a bit more", description: "At least 4 characters, please.", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, category, path: window.location.pathname }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? `Feedback -> ${res.status}`);
      }
      trackEvent("feedback_submitted", { category });
      toast({ title: "Feedback received", description: "Thank you — it's on the operator's review feed." });
      setMessage("");
      close("feedbackOpen");
    } catch (e) {
      toast({
        title: "Could not send feedback",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("feedbackOpen")}>
      <DialogContent className="border-border bg-card text-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Send Feedback</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Report a bug, suggest a feature, or just say what works. Goes straight to the
            operator&apos;s review feed — no external service involved.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex gap-1.5" role="group" aria-label="Feedback category">
            {(["bug", "feature", "general"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize transition-colors ${
                  category === c
                    ? c === "bug"
                      ? "border-destructive/40 bg-destructive/10 text-destructive"
                      : c === "feature"
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-primary/40 bg-primary/10 text-primary-300"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What happened, or what would make Brain OS better?"
            aria-label="Feedback message"
            className="w-full resize-none rounded-lg border border-border bg-background/80 p-3 text-xs text-foreground placeholder-muted-foreground/50 focus:border-primary focus:outline-none"
          />
        </div>

        <DialogFooter>
          <button
            onClick={() => void submit()}
            disabled={busy || message.trim().length < 4}
            className="w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50"
          >
            {busy ? "Sending…" : "Send Feedback"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
