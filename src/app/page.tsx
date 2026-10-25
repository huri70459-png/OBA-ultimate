"use client";

// Project Brain OS — Dark-Mode AI Workspace (single-page app)
// Port of workspace.html + brain_api.py UI surface, upgraded to Next.js 16 + Prisma.

import { useEffect } from "react";
import { FileText, GitBranch, Rocket, Clock } from "lucide-react";
import { useWorkspace, type WorkspaceTab } from "@/components/brain/workspace-store";
import { Header } from "@/components/brain/Header";
import { Sidebar } from "@/components/brain/Sidebar";
import { VaultView } from "@/components/brain/VaultView";
import { TimelineView } from "@/components/brain/TimelineView";
import { GraphView } from "@/components/brain/GraphView";
import { ContextView } from "@/components/brain/ContextView";
import {
  CaptureDialog,
  DecisionDialog,
  NewProjectDialog,
  SearchDialog,
  SelfTestDialog,
} from "@/components/brain/dialogs";

const TABS: { id: WorkspaceTab; label: string; icon: typeof FileText }[] = [
  { id: "vault", label: "Vault & Markdown Editor", icon: FileText },
  { id: "timeline", label: "Universal Timeline", icon: Clock },
  { id: "graph", label: "Decision & Knowledge Graph", icon: GitBranch },
  { id: "context", label: "Context Injector", icon: Rocket },
];

export default function BrainWorkspacePage() {
  const booted = useWorkspace((s) => s.booted);
  const bootError = useWorkspace((s) => s.bootError);
  const bootstrap = useWorkspace((s) => s.bootstrap);
  const openDialog = useWorkspace((s) => s.openDialog);
  const tab = useWorkspace((s) => s.tab);
  const setTab = useWorkspace((s) => s.setTab);
  const details = useWorkspace((s) => s.details);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  // Global hotkey: Alt+S opens Zero-Save Capture
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        openDialog("captureOpen");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDialog]);

  return (
    <div className="brain-workspace flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#0a0e19]/60">
          {/* Tab bar */}
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-950/40 px-2 md:px-4">
            <div className="flex items-center gap-1 overflow-x-auto brain-scroll" role="tablist" aria-label="Workspace views">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-indigo-500 bg-indigo-500/15 text-indigo-300"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{t.label}</span>
                    <span className="sm:hidden">{t.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
            <div className="hidden shrink-0 text-[11px] text-slate-500 lg:block">
              <span className="text-slate-300">{details?.project.name ?? "—"}</span> ·{" "}
              {details?.items.length ?? 0} items · {details?.decisions.length ?? 0} decisions ·{" "}
              {details?.graphEdges.length ?? 0} edges
            </div>
          </div>

          {/* Views */}
          <div className="min-h-0 flex-1">
            {!booted && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
                  <p className="text-xs text-slate-500">Booting Project Brain OS…</p>
                </div>
              </div>
            )}
            {booted && bootError && (
              <div className="flex h-full items-center justify-center p-6">
                <div className="max-w-md rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-center">
                  <p className="text-sm font-semibold text-rose-300">Boot failure</p>
                  <p className="mt-1 text-xs text-slate-400">{bootError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-3 rounded bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
            {booted && !bootError && (
              <>
                {tab === "vault" && <VaultView />}
                {tab === "timeline" && <TimelineView />}
                {tab === "graph" && <GraphView />}
                {tab === "context" && <ContextView />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Dialogs */}
      <CaptureDialog />
      <NewProjectDialog />
      <DecisionDialog />
      <SearchDialog />
      <SelfTestDialog />
    </div>
  );
}
