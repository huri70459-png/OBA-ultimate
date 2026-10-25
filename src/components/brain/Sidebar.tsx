"use client";

// Left rail — Project Spaces, Knowledge Health, bridge status

import { Inbox, Plus } from "lucide-react";
import { useWorkspace } from "./workspace-store";
import { truncate } from "./ui-shared";

export const Sidebar = () => {
  const projects = useWorkspace((s) => s.projects);
  const selectedId = useWorkspace((s) => s.selectedId);
  const details = useWorkspace((s) => s.details);
  const selectProject = useWorkspace((s) => s.selectProject);
  const openDialog = useWorkspace((s) => s.openDialog);

  const health = details?.healthScore ?? 0;
  const healthColor =
    health >= 80 ? "bg-success" : health >= 60 ? "bg-warning" : "bg-destructive";
  const healthText =
    health >= 80 ? "text-success" : health >= 60 ? "text-warning" : "text-destructive";
  const gaps = details?.healthGaps ?? [];
  const severityStyle: Record<string, string> = {
    high: "text-destructive border-destructive/30 bg-destructive/10",
    medium: "text-warning border-warning/30 bg-warning/10",
    low: "text-muted-foreground border-border bg-muted/40",
  };

  return (
    <aside className="hidden w-60 shrink-0 overflow-hidden border-r border-border bg-sidebar/60 p-3 md:flex md:flex-col md:justify-between">
      <div className="brain-scroll min-h-0 space-y-4 overflow-y-auto">
        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Project Spaces
            </span>
            <button
              onClick={() => openDialog("newProjectOpen")}
              className="text-xs text-primary-300 transition-colors hover:text-primary-200"
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
                      ? "border-primary/60 bg-primary/15 text-foreground"
                      : "border-transparent text-foreground/80 hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        active ? "bg-primary-400" : "bg-muted-foreground/50"
                      }`}
                    />
                    <span className="truncate text-xs font-medium">{p.name}</span>
                  </div>
                  <p className="mt-0.5 pl-3.5 font-mono text-[10px] text-muted-foreground/80 truncate">
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
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground/90"
              }`}
            >
              <div className="flex items-center gap-2">
                <Inbox className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">Inbox</span>
              </div>
              <p className="mt-0.5 pl-5 text-[10px] text-muted-foreground/80">Unrouted captures</p>
            </button>
          </div>
        </div>

        {/* Knowledge Health Score */}
        <div className="space-y-2 rounded-xl border border-border bg-card/70 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Knowledge Health</span>
            <span className={`text-xs font-bold ${healthText}`}>{health}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-500 ${healthColor}`}
              style={{ width: `${health}%` }}
            />
          </div>
          <p className="truncate font-mono text-[10px] text-muted-foreground/80">
            {details?.project.rootPath || details?.project.slug || "select a project"}
          </p>
          <div className="grid grid-cols-3 gap-1 pt-1 text-center">
            <div className="rounded bg-muted/60 py-1">
              <div className="text-xs font-bold text-foreground/95">{details?.items.length ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wide text-muted-foreground/80">Items</div>
            </div>
            <div className="rounded bg-muted/60 py-1">
              <div className="text-xs font-bold text-foreground/95">{details?.decisions.length ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wide text-muted-foreground/80">Decisions</div>
            </div>
            <div className="rounded bg-muted/60 py-1">
              <div className="text-xs font-bold text-foreground/95">{details?.graphEdges.length ?? 0}</div>
              <div className="text-[9px] uppercase tracking-wide text-muted-foreground/80">Edges</div>
            </div>
          </div>

          {/* Knowledge gap flags (Memory Compression Daemon) */}
          {gaps.length > 0 && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/80">
                  Knowledge Gaps
                </span>
                <span className="text-[9px] text-muted-foreground/60">daemon-flagged</span>
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
                <p className="text-[9px] text-muted-foreground">+{gaps.length - 3} more…</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bridge status footer */}
      <div className="mt-3 space-y-1 rounded-lg border border-border/80 bg-card/50 p-2.5 text-[11px] text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>MCP Bridge</span>
          <span className="font-mono text-success">5 tools ready</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Hotkey Agent</span>
          <span className="font-mono text-primary-300">Alt + S</span>
        </div>
      </div>
    </aside>
  );
};
