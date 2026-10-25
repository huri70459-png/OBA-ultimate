"use client";

// TAB 3 — Decision Log inspector + Knowledge Graph
// Two graph layouts over the same normalized edge data:
//   Force   — interactive GraphViewer (drag / zoom / pan / inspect)
//   Columns — classic bipartite source→target view (restyled)

import { useMemo, useState } from "react";
import { GitBranch, Plus, Scale } from "lucide-react";
import type { GraphEdge } from "@/lib/brain/types";
import { useWorkspace } from "./workspace-store";
import { relationStyle, shortTime, truncate } from "./ui-shared";
import {
  GraphViewer,
  type GraphNodeKind,
  type GraphViewerLink,
  type GraphViewerNode,
} from "./graph-viewer";

const GRAPH_W = 820;
const NODE_H = 52;
const LABEL_MAX = 26;

type LayoutMode = "force" | "columns";

/** Infer a visual kind for every endpoint from the relation it participates in. */
function inferGraph(edges: GraphEdge[]): {
  nodes: GraphViewerNode[];
  links: GraphViewerLink[];
} {
  const kinds = new Map<string, GraphNodeKind>();
  const kindFor = (id: string, kind: GraphNodeKind) => {
    if (!kinds.has(id)) kinds.set(id, kind);
  };
  const links: GraphViewerLink[] = edges.map((e) => ({
    id: e.id,
    source: e.sourceNode,
    target: e.targetNode,
    relation: e.relationType,
  }));

  for (const e of edges) {
    switch (e.relationType) {
      case "FIXED_BY":
        kindFor(e.sourceNode, "error");
        kindFor(e.targetNode, "fix");
        break;
      case "DECIDED_ON":
        kindFor(e.sourceNode, "capture");
        kindFor(e.targetNode, "decision");
        break;
      case "MENTIONED_IN":
        kindFor(e.sourceNode, "file");
        kindFor(e.targetNode, "capture");
        break;
      default:
        kindFor(e.sourceNode, "concept");
        kindFor(e.targetNode, "concept");
    }
  }

  const nodes: GraphViewerNode[] = [...kinds.entries()].map(([id, kind]) => ({
    id,
    label: id,
    kind,
  }));
  return { nodes, links };
}

/** Classic bipartite columns — restyled onto semantic tokens. */
const BipartiteSVG = ({ edges }: { edges: GraphEdge[] }) => {
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

  return (
    <div className="brain-scroll overflow-x-auto rounded-xl border border-border bg-card/50">
      <svg
        viewBox={`0 0 ${GRAPH_W} ${height}`}
        className="h-auto w-full min-w-[680px]"
        role="img"
        aria-label="Knowledge graph bipartite view"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--graph-edge)" />
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
              <rect
                x={p.x - 165}
                y={p.y - 15}
                width={160}
                height={30}
                rx={8}
                fill="var(--graph-node-fill)"
                stroke="var(--graph-node-stroke)"
              />
              <text
                x={p.x - 85}
                y={p.y + 4}
                textAnchor="middle"
                fontSize={11}
                fill="var(--graph-node-text)"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {truncate(n, LABEL_MAX)}
              </text>
            </g>
          );
        })}

        {targets.map((n) => {
          const p = nodePos.get(`R:${n}`)!;
          return (
            <g key={`R-${n}`}>
              <rect
                x={p.x + 5}
                y={p.y - 15}
                width={160}
                height={30}
                rx={8}
                fill="var(--graph-node-fill)"
                stroke="var(--graph-node-stroke)"
              />
              <text
                x={p.x + 85}
                y={p.y + 4}
                textAnchor="middle"
                fontSize={11}
                fill="var(--graph-node-text)"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {truncate(n, LABEL_MAX)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const GraphView = () => {
  const details = useWorkspace((s) => s.details);
  const openDialog = useWorkspace((s) => s.openDialog);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [layout, setLayout] = useState<LayoutMode>("force");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const decisions = useMemo(() => details?.decisions ?? [], [details]);
  const edges = useMemo(() => details?.graphEdges ?? [], [details]);

  const { nodes, links } = useMemo(() => inferGraph(edges), [edges]);

  const inspectorEdges = useMemo(
    () =>
      selectedNodeId
        ? edges.filter((e) => e.sourceNode === selectedNodeId || e.targetNode === selectedNodeId)
        : [],
    [edges, selectedNodeId],
  );

  return (
    <section
      className="brain-scroll h-full select-text overflow-y-auto p-4 md:p-6"
      aria-label="Decision and knowledge graph"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Decision Log */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <Scale className="h-4 w-4 text-success" /> Decision Log
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Architectural decisions the AI must never revert. Auto-extracted from captures or
                logged manually.
              </p>
            </div>
            <button
              onClick={() => openDialog("decisionOpen")}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20"
            >
              <Plus className="h-3.5 w-3.5" /> Log Decision
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {decisions.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground md:col-span-2">
                No decisions recorded for this project yet. Capture a note containing
                &quot;Decision: … Reason: …&quot; or log one manually.
              </div>
            )}
            {decisions.map((d) => {
              const isOpen = expanded === d.id;
              return (
                <div
                  key={d.id}
                  className="cursor-pointer rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40"
                  onClick={() => setExpanded(isOpen ? null : d.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground">{d.title}</span>
                    <span className="shrink-0 rounded border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] text-success">
                      {d.outcome}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-foreground/90">
                    <span className="font-semibold text-success">Chosen:</span>{" "}
                    {truncate(d.decision, isOpen ? 400 : 90)}
                  </p>
                  {isOpen && (
                    <>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-foreground/80">Reasoning:</span>{" "}
                        {d.reasoning}
                      </p>
                      {d.alternatives.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {d.alternatives.map((a) => (
                            <span
                              key={a}
                              className="rounded border border-destructive/30 bg-destructive/10 px-1.5 py-0.5 text-[10px] text-destructive line-through"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  <p className="mt-2 text-[10px] text-muted-foreground/70">{shortTime(d.decidedAt)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Knowledge Graph */}
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <GitBranch className="h-4 w-4 text-primary-400" /> Knowledge Graph
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Auto-extracted "FIXED_BY / MENTIONED_IN / DECIDED_ON" edges — {edges.length}{' '}
                total.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Layout toggle */}
              <div
                className="flex overflow-hidden rounded-lg border border-border"
                role="tablist"
                aria-label="Graph layout"
              >
                {(["force", "columns"] as LayoutMode[]).map((m) => (
                  <button
                    key={m}
                    role="tab"
                    aria-selected={layout === m}
                    onClick={() => setLayout(m)}
                    className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      layout === m
                        ? "bg-primary/15 text-primary-300"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "force" ? "Force" : "Columns"}
                  </button>
                ))}
              </div>
              {["FIXED_BY", "DECIDED_ON", "MENTIONED_IN", "RELATED_TO"].map((rel) => {
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

          {edges.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
              No graph edges yet. Capture an error (FIXED_BY), mention a file (MENTIONED_IN), or log
              a decision (DECIDED_ON) to grow the graph.
            </div>
          ) : layout === "force" ? (
            <>
              <GraphViewer
                nodes={nodes}
                links={links}
                selectedId={selectedNodeId}
                onNodeClick={(n) => setSelectedNodeId((cur) => (cur === n.id ? null : n.id))}
                height={480}
                ariaLabel="Interactive force-directed knowledge graph"
              />
              {selectedNodeId && (
                <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-mono text-xs font-semibold text-primary-300">
                      {selectedNodeId}
                    </p>
                    <button
                      onClick={() => setSelectedNodeId(null)}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Close inspector
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {inspectorEdges.map((e) => {
                      const style = relationStyle(e.relationType);
                      const other = e.sourceNode === selectedNodeId ? e.targetNode : e.sourceNode;
                      return (
                        <p key={e.id} className="text-[11px] leading-relaxed text-foreground/85">
                          <span className={`rounded border px-1 py-0.5 text-[9px] uppercase ${style.chip}`}>
                            {e.relationType}
                          </span>{" "}
                          {e.sourceNode === selectedNodeId ? "→ " : "← "}
                          <span className="font-mono">{other}</span>
                        </p>
                      );
                    })}
                    {inspectorEdges.length === 0 && (
                      <p className="text-[11px] text-muted-foreground">Isolated node.</p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <BipartiteSVG edges={edges} />
          )}
        </div>
      </div>
    </section>
  );
};
