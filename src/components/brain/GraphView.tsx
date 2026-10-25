"use client";

// TAB 3 — Decision Log inspector + Knowledge Graph (bipartite SVG layout)

import { useMemo, useState } from "react";
import { GitBranch, Plus, Scale } from "lucide-react";
import type { GraphEdge } from "@/lib/brain/types";
import { useWorkspace } from "./workspace-store";
import { relationStyle, shortTime, truncate } from "./ui-shared";

const GRAPH_W = 820;
const NODE_H = 52;
const LABEL_MAX = 26;

function GraphSVG({ edges }: { edges: GraphEdge[] }) {
  const { sources, targets, nodePos, lines } = useMemo(() => {
    const sourceNodes: string[] = [];
    const targetNodes: string[] = [];
    const seen = new Set<string>();

    for (const e of edges) {
      if (!seen.has(e.sourceNode)) {
        seen.add(e.sourceNode);
        sourceNodes.push(e.sourceNode);
      }
      if (!seen.has(e.targetNode)) {
        seen.add(e.targetNode);
        targetNodes.push(e.targetNode);
      }
    }

    const leftX = 190;
    const rightX = GRAPH_W - 190;
    const rows = Math.max(sourceNodes.length, targetNodes.length, 1);
    const height = rows * NODE_H + 40;

    const pos = new Map<string, { x: number; y: number }>();
    sourceNodes.forEach((n, i) => {
      pos.set(`L:${n}`, { x: leftX, y: 30 + i * NODE_H + NODE_H / 2 });
    });
    targetNodes.forEach((n, i) => {
      pos.set(`R:${n}`, { x: rightX, y: 30 + i * NODE_H + NODE_H / 2 });
    });

    const segs = edges.map((e, i) => ({
      id: i,
      edge: e,
      from: pos.get(`L:${e.sourceNode}`),
      to: pos.get(`R:${e.targetNode}`),
    }));

    return {
      sources: sourceNodes,
      targets: targetNodes,
      nodePos: pos,
      lines: segs.filter((s) => s.from && s.to),
      height,
    };
  }, [edges]);

  const height = Math.max(sources.length, targets.length, 1) * NODE_H + 40;

  if (edges.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500">
        No graph edges yet. Capture an error (FIXED_BY), mention a file (MENTIONED_IN), or log a
        decision (DECIDED_ON) to grow the graph.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto brain-scroll rounded-xl border border-slate-800 bg-slate-950/60">
      <svg
        viewBox={`0 0 ${GRAPH_W} ${height}`}
        className="h-auto w-full min-w-[680px]"
        role="img"
        aria-label="Knowledge graph visualization"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
          </marker>
        </defs>

        {lines.map(({ id, edge, from, to }) => {
          const style = relationStyle(edge.relationType);
          const mx = (from!.x + to!.x) / 2;
          return (
            <path
              key={id}
              d={`M ${from!.x} ${from!.y} C ${mx} ${from!.y}, ${mx} ${to!.y}, ${to!.x} ${to!.y}`}
              fill="none"
              stroke={style.stroke}
              strokeWidth={1.4}
              strokeOpacity={0.65}
              markerEnd="url(#arrow)"
            />
          );
        })}

        {sources.map((n) => {
          const p = nodePos.get(`L:${n}`)!;
          return (
            <g key={`L-${n}`}>
              <rect x={p.x - 165} y={p.y - 15} width={160} height={30} rx={8} fill="#0f172a" stroke="#334155" />
              <text x={p.x - 85} y={p.y + 4} textAnchor="middle" fontSize={11} fill="#e2e8f0" fontFamily="ui-monospace, monospace">
                {truncate(n, LABEL_MAX)}
              </text>
            </g>
          );
        })}

        {targets.map((n) => {
          const p = nodePos.get(`R:${n}`)!;
          return (
            <g key={`R-${n}`}>
              <rect x={p.x + 5} y={p.y - 15} width={160} height={30} rx={8} fill="#0f172a" stroke="#334155" />
              <text x={p.x + 85} y={p.y + 4} textAnchor="middle" fontSize={11} fill="#e2e8f0" fontFamily="ui-monospace, monospace">
                {truncate(n, LABEL_MAX)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function GraphView() {
  const details = useWorkspace((s) => s.details);
  const openDialog = useWorkspace((s) => s.openDialog);
  const [expanded, setExpanded] = useState<string | null>(null);

  const decisions = details?.decisions ?? [];
  const edges = details?.graphEdges ?? [];

  return (
    <section className="h-full overflow-y-auto brain-scroll p-4 md:p-6 select-text" aria-label="Decision and knowledge graph">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Decision Log */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold text-white">
                <Scale className="h-4 w-4 text-emerald-400" /> Decision Log
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Architectural decisions the AI must never revert. Auto-extracted from captures or
                logged manually.
              </p>
            </div>
            <button
              onClick={() => openDialog("decisionOpen")}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
            >
              <Plus className="h-3.5 w-3.5" /> Log Decision
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {decisions.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-800 p-6 text-center text-xs text-slate-500 md:col-span-2">
                No decisions recorded for this project yet. Capture a note containing
                &quot;Decision: … Reason: …&quot; or log one manually.
              </div>
            )}
            {decisions.map((d) => {
              const isOpen = expanded === d.id;
              return (
                <div
                  key={d.id}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-700"
                  onClick={() => setExpanded(isOpen ? null : d.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-100">{d.title}</span>
                    <span className="shrink-0 rounded border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-300">
                      {d.outcome}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
                    <span className="font-semibold text-emerald-400">Chosen:</span> {truncate(d.decision, isOpen ? 400 : 90)}
                  </p>
                  {isOpen && (
                    <>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                        <span className="font-semibold text-slate-300">Reasoning:</span> {d.reasoning}
                      </p>
                      {d.alternatives.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {d.alternatives.map((a) => (
                            <span key={a} className="rounded border border-rose-500/25 bg-rose-500/10 px-1.5 py-0.5 text-[10px] text-rose-300 line-through">
                              {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  <p className="mt-2 text-[10px] text-slate-500">{shortTime(d.decidedAt)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Knowledge Graph */}
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold text-white">
                <GitBranch className="h-4 w-4 text-violet-400" /> Knowledge Graph
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Auto-extracted {`FIXED_BY / MENTIONED_IN / DECIDED_ON`} edges — {edges.length} total.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(relationStyle).length > 0 &&
                ["FIXED_BY", "DECIDED_ON", "MENTIONED_IN", "RELATED_TO"].map((rel) => {
                  const style = relationStyle(rel);
                  return (
                    <span
                      key={rel}
                      className={`flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] ${style.chip}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: style.stroke }} />
                      {rel}
                    </span>
                  );
                })}
            </div>
          </div>
          <GraphSVG edges={edges} />
        </div>
      </div>
    </section>
  );
}
