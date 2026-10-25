"use client";

// Left rail — Project Spaces, Knowledge Health, bridge status

import { useEffect } from "react";
import { Inbox, Plus } from "lucide-react";
import { useWorkspace } from "./workspace-store";
import { truncate } from "./ui-shared";

export function Sidebar() {
  const projects = useWorkspace((s) => s.projects);
  const selectedId = useWorkspace((s) => s.selectedId);
  const details = useWorkspace((s) => s.details);
  const selectProject = useWorkspace((s) => s.selectProject);
  const openDialog = useWorkspace((s) => s.openDialog);

  // Keep health card fresh when the selected project changes
  useEffect(() => {}, [selectedId, details]);

  const health = details?.healthScore ?? 0;
  const healthColor =
    health >= 80 ? "bg-emerald-500" : health >= 60 ? "bg-amber-500" : "bg-rose-500";
  const healthText =
    health >= 80 ? "text-emerald-400" : health >= 60 ? "text-amber-500" : "text-rose-400";
  const gaps = details?.healthGaps ?? [];
  const severityStyle: Record<string, string> = {
    high: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    medium: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    low: "text-slate-400 border-slate-500/30 bg-slate-500/10",
  };

  return (
    <aside className="w-60 shrink-0 border-r border-slate-800/80 bg-slate-950/60 p-3 hidden md:flex md:flex-col md:justify-between overflow-hidden">
      <div className="space-y-4 overflow-y-auto brain-scroll min-h-0">
        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Project Spaces
            </span>
            <button
              onClick={() => openDialog("newProjectOpen")}
              className="text-xs text-indigo-400 transition-colors hover:text-indigo-300"
              aria-label="Create new project space"
            >
              <Plus className="inline h-3.5 w-3.5" /> New
            </button>
          </div>

          <div className="space-y-1" role="list">
            {projects.map((p) => {
              const active = selectedId === p.id;
              return (
                <button
                  key={p.id}
                  role="listitem"
                  onClick={() => selectProject(p.id)}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition-all ${
                    active
                      ? "border-indigo-500/60 bg-indigo-500/15 text-white"
                      : "border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        active ? "bg-indigo-400" : "bg-slate-600"
                      }`}
                    />
                    <span className="truncate text-xs font-medium">{p.name}</span>
                  </div>
                  <p className="mt-0.5 pl-3.5 text-[10px] text-slate-500 font-mono truncate">
                    {truncate(p.rootPath || p.slug, 30)}
                  </p>
                </button>
              );
            })}

            {/* Inbox pseudo-space */}
            <button
              role="listitem"
              onClick={() => selectProject("inbox")}
              className={`w-full rounded-lg border px-3 py-2 text-left transition-all ${
                selectedId === "inbox"
                  ? "border-indigo-500/60 bg-indigo-500/15 text-white"
                  : "border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Inbox className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-xs font-medium">Inbox</span>
              </div>
              <p className="mt-0.5 pl-5 text-[10px] text-slate-500">Unrouted captures</p>
            </button>
          </div>
        </div>

        {/* Knowledge Health Score */}
        <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Knowledge Health</span>
            <span className={`text-xs font-bold ${healthText}`}>{health}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${healthColor}`}
              style={{ width: `${health}%` }}
            />
          </div>
          <p className="truncate font-mono text-[10px] text-slate-500">
            {details?.project.rootPath || details?.project.slug || "select a project"}
          </p>
          <div className="grid grid-cols-3 gap-1 pt-1 text-center">
            <div className="rounded bg-slate-800/60 py-1">
              <div className="text-xs font-bold text-slate-200">{details?.items.length ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wide text-slate-500">Items</div>
            </div>
            <div className="rounded bg-slate-800/60 py-1">
              <div className="text-xs font-bold text-slate-200">{details?.decisions.length ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wide text-slate-500">Decisions</div>
            </div>
            <div className="rounded bg-slate-800/60 py-1">
              <div className="text-xs font-bold text-slate-200">{details?.graphEdges.length ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wide text-slate-500">Edges</div>
            </div>
          </div>

          {/* Knowledge gap flags (Memory Compression Daemon) */}
          {gaps.length > 0 && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider text-slate-500">
                  Knowledge Gaps
                </span>
                <span className="text-[9px] text-slate-600">daemon-flagged</span>
              </div>
              {gaps.slice(0, 3).map((g) => (
                <div
                  key={g.gap}
                  title={g.detail}
                  className={`rounded border px-2 py-1 text-[10px] leading-tight ${severityStyle[g.severity] ?? severityStyle.low}`}
                >
                  <span className="font-semibold">{g.gap}</span>
                </div>
              ))}
              {gaps.length > 3 && (
                <p className="text-[9px] text-slate-500">+{gaps.length - 3} more…</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bridge status footer */}
      <div className="mt-3 space-y-1 rounded-lg border border-slate-800/80 bg-slate-900/50 p-2.5 text-[11px] text-slate-400">
        <div className="flex items-center justify-between">
          <span>MCP Bridge</span>
          <span className="font-mono text-emerald-400">5 tools ready</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Hotkey Agent</span>
          <span className="font-mono text-indigo-400">Alt + S</span>
        </div>
      </div>
    </aside>
  );
}
