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
import type { BrainItem, CaptureResult, SelfTestCheck } from "@/lib/brain/types";
import { useWorkspace } from "./workspace-store";
import { itemTypeStyle, shortTime } from "./ui-shared";

// ==========================================
// ZERO-SAVE CAPTURE
// ==========================================
export function CaptureDialog() {
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
      toast({ title: "Captured — Zero-Save", description: data.toastNotification });
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
      <DialogContent className="border-slate-800 bg-[#0d1220] text-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">⚡ Zero-Save Capture</DialogTitle>
          <DialogDescription className="text-slate-400">
            Paste anything. Project routing, model selection, fix extraction, and graph linking are
            automatic.
          </DialogDescription>
        </DialogHeader>

        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste a stack trace, terminal error, decision note, or any knowledge…"
          className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950/80 p-3 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
          aria-label="Capture content"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Item type"
            className="rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
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
            className="rounded border border-slate-700 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            aria-label="Window title"
          />
        </div>

        <DialogFooter>
          <button
            onClick={submit}
            disabled={busy || !content.trim()}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            {busy ? "Capturing…" : "Capture (Zero-Save)"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==========================================
// NEW PROJECT
// ==========================================
export function NewProjectDialog() {
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

  const field =
    "w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("newProjectOpen")}>
      <DialogContent className="border-slate-800 bg-[#0d1220] text-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">＋ New Project Space</DialogTitle>
          <DialogDescription className="text-slate-400">
            Register fingerprints (root path, keywords, git remotes) so captures auto-route here.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5">
          <input className={field} placeholder="Project name *" value={name} onChange={(e) => setName(e.target.value)} aria-label="Project name" />
          <input className={field} placeholder="Root path (e.g. C:/dev/my-app)" value={rootPath} onChange={(e) => setRootPath(e.target.value)} aria-label="Root path" />
          <input className={field} placeholder="Keywords, comma separated (e.g. gateway.mjs, render)" value={keywords} onChange={(e) => setKeywords(e.target.value)} aria-label="Keywords" />
          <input className={field} placeholder="Git remotes, comma separated (e.g. github.com/you/repo)" value={gitRemotes} onChange={(e) => setGitRemotes(e.target.value)} aria-label="Git remotes" />
          <textarea className={`${field} resize-none`} rows={3} placeholder="Rolling summary — compressed project memory injected as Tier 1 context" value={summary} onChange={(e) => setSummary(e.target.value)} aria-label="Rolling summary" />
        </div>
        <DialogFooter>
          <button
            onClick={submit}
            disabled={busy || !name.trim()}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            {busy ? "Creating…" : "Create Project Space"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==========================================
// LOG DECISION (manual)
// ==========================================
export function DecisionDialog() {
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

  const field =
    "w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("decisionOpen")}>
      <DialogContent className="border-slate-800 bg-[#0d1220] text-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">⚖️ Log Architectural Decision</DialogTitle>
          <DialogDescription className="text-slate-400">
            Project: <span className="text-indigo-300">{details?.project.name ?? "—"}</span> · recorded
            into Tier 2 of every future context payload.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5">
          <input className={field} placeholder="Decision title *" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Decision title" />
          <input className={field} placeholder="Chosen approach *" value={decision} onChange={(e) => setDecision(e.target.value)} aria-label="Chosen approach" />
          <textarea className={`${field} resize-none`} rows={3} placeholder="Reasoning *" value={reasoning} onChange={(e) => setReasoning(e.target.value)} aria-label="Reasoning" />
          <input className={field} placeholder="Alternatives rejected, comma separated" value={alternatives} onChange={(e) => setAlternatives(e.target.value)} aria-label="Alternatives" />
        </div>
        <DialogFooter>
          <button
            onClick={submit}
            disabled={busy || !title.trim() || !decision.trim() || !reasoning.trim()}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
          >
            {busy ? "Logging…" : "Log Decision"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==========================================
// UNIVERSAL SEARCH RESULTS
// ==========================================
export function SearchDialog() {
  const open = useWorkspace((s) => s.searchOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const seed = useWorkspace((s) => s.searchSeed);
  const { toast } = useToast();

  const [query, setQuery] = useState(seed);
  const [results, setResults] = useState<BrainItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);

  const run = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setRan(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
      toast({ title: "Search failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (open && seed) {
      setQuery(seed);
      void run(seed);
    }
    if (!open) {
      setRan(false);
      setResults([]);
    }
  }, [open, seed]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("searchOpen")}>
      <DialogContent className="border-slate-800 bg-[#0d1220] text-slate-200 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Search className="h-4 w-4 text-indigo-400" /> Universal Vault Search
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Full-text search across titles, content, AI summaries, and visual descriptions of every
            capture.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run(query)}
            placeholder="Search the entire brain…"
            className="flex-1 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            aria-label="Search query"
            autoFocus
          />
          <button
            onClick={() => run(query)}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Search
          </button>
        </div>

        <ScrollArea className="max-h-[50vh] pr-2">
          <div className="space-y-2">
            {loading && <p className="p-4 text-center text-xs text-slate-500">Searching…</p>}
            {!loading && ran && results.length === 0 && (
              <p className="p-4 text-center text-xs text-slate-500">No matches in the vault.</p>
            )}
            {results.map((r) => {
              const style = itemTypeStyle(r.itemType);
              const Icon = style.icon;
              return (
                <div key={r.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-100">{r.title}</span>
                    <span className={`rounded border px-1.5 py-0.5 text-[10px] uppercase ${style.badge}`}>
                      {style.label}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-500">{shortTime(r.capturedAt)}</span>
                  </div>
                  {r.structuredSummary && (
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{r.structuredSummary}</p>
                  )}
                  {r.filePath && (
                    <p className="mt-1 font-mono text-[10px] text-slate-600">{r.filePath}</p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ==========================================
// SELF-TEST DIAGNOSTICS
// ==========================================
export function SelfTestDialog() {
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

  useEffect(() => {
    if (open && checks === null && !running) void runTest();
  }, [open]);

  const iconFor = (status: string) =>
    status === "PASS" ? (
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
    ) : status === "WARN" ? (
      <AlertTriangle className="h-4 w-4 text-amber-400" />
    ) : (
      <XCircle className="h-4 w-4 text-rose-400" />
    );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("selfTestOpen")}>
      <DialogContent className="border-slate-800 bg-[#0d1220] text-slate-200 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">🩺 End-to-End Self-Test</DialogTitle>
          <DialogDescription className="text-slate-400">
            Runs a live capture, verifies fix extraction, search, and 3-tier context injection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {running && <p className="p-4 text-center text-xs text-slate-500">Running diagnostics…</p>}
          {checks?.map((c) => (
            <div key={c.name} className="flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
              <span className="mt-0.5">{iconFor(c.status)}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-100">{c.name}</p>
                <p className="mt-0.5 break-words text-[11px] text-slate-400">{c.detail}</p>
              </div>
            </div>
          ))}
          {checks && (
            <p className={`pt-1 text-center text-xs font-semibold ${ok ? "text-emerald-400" : "text-amber-400"}`}>
              {ok ? "All systems operational — Brain is ready." : "Some checks need attention."}
            </p>
          )}
        </div>

        <DialogFooter>
          <button
            onClick={runTest}
            disabled={running}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-50"
          >
            {running ? "Running…" : "Run Again"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
