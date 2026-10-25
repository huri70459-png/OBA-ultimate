"use client";

// GraphViewer — data-agnostic, interactive knowledge-graph visualization.
//
// Design-system blueprint ("Deep Intelligence"):
//   - dark minimalist canvas, nodes sized by importance, brand violet for
//     active/central nodes, muted neutrals for peripheral elements;
//   - thin subtle edges that become prominent on hover or selection;
//   - zoom/pan controls, node search handled by the parent, legend by parent.
//
// Engineering blueprint:
//   - data-agnostic: normalized { nodes, links } props, no domain knowledge;
//   - highly configurable: visuals + behavior via props and CSS variables;
//   - performance: O(n²) repulsion is fine at vault scale (≤ few hundred
//     nodes); the simulation runs outside React and publishes position
//     snapshots for a ref-free render path;
//   - extensible: node kinds carry ring colors; pass any kind you like.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Maximize, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { truncate } from "./ui-shared";

export type GraphNodeKind = "error" | "fix" | "decision" | "file" | "capture" | "concept";

export interface GraphViewerNode {
  id: string;
  label: string;
  kind?: GraphNodeKind;
}

export interface GraphViewerLink {
  id?: string;
  source: string;
  target: string;
  relation?: string;
}

interface GraphViewerProps {
  nodes: GraphViewerNode[];
  links: GraphViewerLink[];
  onNodeClick?: (node: GraphViewerNode) => void;
  selectedId?: string | null;
  height?: number;
  className?: string;
  ariaLabel?: string;
}

interface Sim {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
}

interface Transform {
  x: number;
  y: number;
  k: number;
}

/** Everything the module-scope simulation loop needs — refs stay stable, data is read fresh each frame. */
interface SimContext {
  propsRef: { current: { nodes: GraphViewerNode[]; links: GraphViewerLink[] } };
  sims: Map<string, Sim>;
  alphaRef: { current: number };
  rafRef: { current: number | null };
  setPositions: (snapshot: Record<string, { x: number; y: number }>) => void;
}

const MIN_ALPHA = 0.008;
const ALPHA_DECAY = 0.984;
const DAMPING = 0.86;
const REPULSION = 2400;
const LINK_REST = 150;
const LINK_STRENGTH = 0.055;
const GRAVITY = 0.014;
const MIN_GAP = 64;
const LABEL_MAX = 24;

const KIND_COLOR: Record<string, string> = {
  error: "var(--destructive)",
  fix: "var(--rel-fixed-by)",
  decision: "var(--rel-decided-on)",
  file: "var(--info)",
  capture: "var(--rel-related-to)",
  concept: "var(--graph-node-stroke)",
};

const RELATIONS = ["FIXED_BY", "DECIDED_ON", "MENTIONED_IN", "RELATED_TO"];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * One animation frame of the force layout: pairwise repulsion (+soft collision),
 * link springs, gravity toward the origin, then damped integration. Reads node
 * data fresh from propsRef every frame so data edits apply mid-animation.
 */
function runSimulation(ctx: SimContext) {
  const { nodes, links } = ctx.propsRef.current;
  const sims = ctx.sims;
  const list: Array<{ id: string; s: Sim }> = [];
  for (const n of nodes) {
    const s = sims.get(n.id);
    if (s) list.push({ id: n.id, s });
  }

  // node repulsion (pairwise)
  for (let i = 0; i < list.length; i++) {
    const a = list[i].s;
    for (let j = i + 1; j < list.length; j++) {
      const b = list[j].s;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d2 = dx * dx + dy * dy + 0.01;
      const d = Math.sqrt(d2);
      let f = REPULSION / d2;
      if (d < MIN_GAP) f += (MIN_GAP - d) * 0.06; // soft collision
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    }
  }

  // link springs
  for (const l of links) {
    const a = sims.get(l.source);
    const b = sims.get(l.target);
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || 1;
    const f = (d - LINK_REST) * LINK_STRENGTH;
    const fx = (dx / d) * f;
    const fy = (dy / d) * f;
    a.vx += fx;
    a.vy += fy;
    b.vx -= fx;
    b.vy -= fy;
  }

  // gravity + integrate
  for (const { s } of list) {
    s.vx += -s.x * GRAVITY;
    s.vy += -s.y * GRAVITY;
    if (s.fx !== null && s.fy !== null) {
      s.x = s.fx;
      s.y = s.fy;
      s.vx = 0;
      s.vy = 0;
    } else {
      s.vx *= DAMPING;
      s.vy *= DAMPING;
      s.x += s.vx;
      s.y += s.vy;
    }
  }

  // Publish a fresh render snapshot (keeps the React render path ref-free)
  const snapshot: Record<string, { x: number; y: number }> = {};
  for (const { id, s } of list) {
    snapshot[id] = { x: s.x, y: s.y };
  }
  ctx.setPositions(snapshot);
  ctx.alphaRef.current *= ALPHA_DECAY;
  ctx.rafRef.current =
    ctx.alphaRef.current > MIN_ALPHA ? requestAnimationFrame(() => runSimulation(ctx)) : null;
}

export const GraphViewer = ({
  nodes,
  links,
  onNodeClick,
  selectedId = null,
  height = 460,
  className = "",
  ariaLabel = "Interactive knowledge graph",
}: GraphViewerProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // ---- simulation state (refs: mutated by the rAF loop; painted via state) ----
  const simRef = useRef<Map<string, Sim>>(new Map());
  const alphaRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const propsRef = useRef({ nodes, links });
  // Sync latest graph data outside of render (react-hooks/refs-compliant)
  useEffect(() => {
    propsRef.current = { nodes, links };
  }, [nodes, links]);

  // Render-side mirror of the live simulation — the loop publishes a fresh
  // snapshot each frame, keeping the render path ref-free (react-hooks/refs).
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  const [transform, setTransform] = useState<Transform>({ x: 460, y: 230, k: 1 });
  const [hoverId, setHoverId] = useState<string | null>(null);
  const dragRef = useRef<{ id: string; dx: number; dy: number; moved: boolean } | null>(null);
  const panRef = useRef<{ px: number; py: number; tx: number; ty: number; moved: boolean } | null>(null);

  // ---- degree + radius (memoized) ----
  const degree = useMemo(() => {
    const d = new Map<string, number>();
    for (const l of links) {
      d.set(l.source, (d.get(l.source) ?? 0) + 1);
      d.set(l.target, (d.get(l.target) ?? 0) + 1);
    }
    return d;
  }, [links]);

  const radiusOf = (id: string) => {
    const deg = degree.get(id) ?? 0;
    return 9 + Math.min(9, deg * 1.7);
  };

  // ---- adjacency for hover highlighting ----
  const neighbors = useMemo(() => {
    const m = new Map<string, Set<string>>();
    const add = (a: string, b: string) => {
      if (!m.has(a)) m.set(a, new Set());
      m.get(a)!.add(b);
    };
    for (const l of links) {
      add(l.source, l.target);
      add(l.target, l.source);
    }
    return m;
  }, [links]);

  // ---- deterministic initial layout (golden-angle spiral; pure render-safe) ----
  const ensureSims = useCallback(() => {
    const sims = simRef.current;
    propsRef.current.nodes.forEach((n, i) => {
      if (sims.has(n.id)) return;
      const angle = i * 2.399963; // golden angle
      const r = 60 + Math.sqrt(i + 1) * 46;
      sims.set(n.id, {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null,
      });
    });
    for (const id of [...sims.keys()]) {
      if (!propsRef.current.nodes.some((n) => n.id === id)) sims.delete(id);
    }
  }, []);

  // ---- force tick (module-scope loop; self-recursion lives outside React) ----
  const tick = useCallback(() => {
    runSimulation({ propsRef, sims: simRef.current, alphaRef, rafRef, setPositions });
  }, [setPositions]);

  const reheat = useCallback(
    (alpha: number) => {
      alphaRef.current = Math.max(alphaRef.current, alpha);
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    },
    [tick],
  );

  // (re)initialize on data change
  useEffect(() => {
    ensureSims();
    reheat(1);
  }, [nodes, links, ensureSims, reheat]);

  // Stop the loop on unmount. rafRef MUST be reset to null: React StrictMode
  // runs effect -> cleanup -> effect in dev, and a stale non-null id would make
  // reheat() believe a frame is still pending, permanently killing the layout.
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // ---- zoom (non-passive wheel listener for preventDefault) ----
  const zoomAt = useCallback((clientX: number, clientY: number, factor: number) => {
    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    setTransform((t) => {
      const k = clamp(t.k * factor, 0.2, 3.2);
      return { k, x: px - ((px - t.x) / t.k) * k, y: py - ((py - t.y) / t.k) * k };
    });
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0016));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const fitView = useCallback(() => {
    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sims = [...simRef.current.values()];
    if (sims.length === 0 || rect.width === 0) return;
    const minX = Math.min(...sims.map((s) => s.x));
    const maxX = Math.max(...sims.map((s) => s.x));
    const minY = Math.min(...sims.map((s) => s.y));
    const maxY = Math.max(...sims.map((s) => s.y));
    const bw = Math.max(maxX - minX, 80);
    const bh = Math.max(maxY - minY, 80);
    const k = clamp(Math.min(rect.width / bw, rect.height / bh) * 0.82, 0.25, 1.8);
    setTransform({
      k,
      x: rect.width / 2 - ((minX + maxX) / 2) * k,
      y: rect.height / 2 - ((minY + maxY) / 2) * k,
    });
  }, []);

  const zoomBy = (factor: number) => {
    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
  };

  // ---- pointer interactions ----
  const toGraph = (clientX: number, clientY: number) => {
    const el = svgRef.current;
    const rect = el!.getBoundingClientRect();
    return {
      gx: (clientX - rect.left - transform.x) / transform.k,
      gy: (clientY - rect.top - transform.y) / transform.k,
    };
  };

  const capturePointer = (e: React.PointerEvent, el: Element) => {
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // Synthetic pointers (tests, some touch stacks) have no active pointer id —
      // capture is an optimization here, not a requirement.
    }
  };

  const onPointerDownNode = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    capturePointer(e, e.currentTarget as Element);
    const { gx, gy } = toGraph(e.clientX, e.clientY);
    const s = simRef.current.get(id);
    if (!s) return;
    dragRef.current = { id, dx: gx - s.x, dy: gy - s.y, moved: false };
    s.fx = gx - dragRef.current.dx;
    s.fy = gy - dragRef.current.dy;
    reheat(0.45);
  };

  const onPointerDownBg = (e: React.PointerEvent) => {
    capturePointer(e, e.currentTarget as Element);
    panRef.current = { px: e.clientX, py: e.clientY, tx: transform.x, ty: transform.y, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragRef.current) {
      const { gx, gy } = toGraph(e.clientX, e.clientY);
      const s = simRef.current.get(dragRef.current.id);
      if (s) {
        s.fx = gx - dragRef.current.dx;
        s.fy = gy - dragRef.current.dy;
        dragRef.current.moved = true;
        reheat(0.4);
      }
      return;
    }
    if (panRef.current) {
      const dx = e.clientX - panRef.current.px;
      const dy = e.clientY - panRef.current.py;
      if (Math.abs(dx) + Math.abs(dy) > 3) panRef.current.moved = true;
      setTransform((t) => ({ ...t, x: panRef.current!.tx + dx, y: panRef.current!.ty + dy }));
    }
  };

  const onPointerUp = () => {
    if (dragRef.current) {
      const { id, moved } = dragRef.current;
      const s = simRef.current.get(id);
      if (s) {
        s.fx = null;
        s.fy = null;
      }
      if (!moved && onNodeClick) {
        const node = propsRef.current.nodes.find((n) => n.id === id);
        if (node) onNodeClick(node);
      }
      dragRef.current = null;
    }
    panRef.current = null;
  };

  // ---- rendering ----
  const isDimmed = (id: string) =>
    hoverId !== null && id !== hoverId && !(neighbors.get(hoverId)?.has(id) ?? false);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border bg-[var(--graph-canvas)] ${className}`}>
      <svg
        ref={svgRef}
        role="application"
        aria-label={ariaLabel}
        style={{ height, touchAction: "none" }}
        className="w-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDownBg}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <defs>
          <pattern id="graph-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--graph-grid)" />
          </pattern>
          {RELATIONS.map((rel) => (
            <marker
              key={rel}
              id={`gv-arrow-${rel}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={relationColor(rel)} />
            </marker>
          ))}
          <marker id="gv-arrow-default" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--graph-edge)" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#graph-grid)" opacity={0.5} />

        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {/* edges */}
          {links.map((l, i) => {
            const a = positions[l.source];
            const b = positions[l.target];
            if (!a || !b) return null;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.hypot(dx, dy) || 1;
            const ox = (-dy / len) * len * 0.1;
            const oy = (dx / len) * len * 0.1;
            const cx = (a.x + b.x) / 2 + ox;
            const cy = (a.y + b.y) / 2 + oy;
            // pull the end back so the arrowhead meets the node ring
            const ex = cx - b.x;
            const ey = cy - b.y;
            const el = Math.hypot(ex, ey) || 1;
            const r2 = radiusOf(l.target);
            const endX = b.x + (ex / el) * (r2 + 5);
            const endY = b.y + (ey / el) * (r2 + 5);
            const rel = l.relation ?? "";
            const highlighted = hoverId !== null && (l.source === hoverId || l.target === hoverId);
            const relatedToSelection =
              selectedId !== null && (l.source === selectedId || l.target === selectedId);
            return (
              <path
                key={l.id ?? `${l.source}->${l.target}-${i}`}
                d={`M ${a.x} ${a.y} Q ${cx} ${cy} ${endX} ${endY}`}
                fill="none"
                stroke={rel && RELATIONS.includes(rel) ? relationColor(rel) : "var(--graph-edge)"}
                strokeWidth={highlighted || relatedToSelection ? 2 : 1.2}
                strokeOpacity={highlighted || relatedToSelection ? 0.95 : 0.45}
                markerEnd={rel && RELATIONS.includes(rel) ? `url(#gv-arrow-${rel})` : "url(#gv-arrow-default)"}
              />
            );
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const p = positions[n.id];
            if (!p) return null;
            const r = radiusOf(n.id);
            const kindColor = KIND_COLOR[n.kind ?? "concept"] ?? KIND_COLOR.concept;
            const dim = isDimmed(n.id);
            const selected = selectedId === n.id;
            return (
              <g
                key={n.id}
                opacity={dim ? 0.22 : 1}
                onPointerDown={(e) => onPointerDownNode(e, n.id)}
                onPointerEnter={() => !dragRef.current && !panRef.current && setHoverId(n.id)}
                onPointerLeave={() => setHoverId((h) => (h === n.id ? null : h))}
                style={{ cursor: "pointer" }}
              >
                {selected && (
                  <circle cx={p.x} cy={p.y} r={r + 5} fill="none" stroke="var(--primary)" strokeWidth={1.4} strokeOpacity={0.9} />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="var(--graph-node-fill)"
                  stroke={kindColor}
                  strokeWidth={selected || hoverId === n.id ? 2.4 : 1.6}
                />
                <circle cx={p.x} cy={p.y} r={r - 3.5} fill={kindColor} fillOpacity={0.18} />
                <text
                  x={p.x}
                  y={p.y + r + 12}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="var(--font-geist-mono), monospace"
                  fill="var(--graph-node-text)"
                  opacity={0.92}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {truncate(n.label || n.id, LABEL_MAX)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* controls */}
      <div className="absolute right-2.5 top-2.5 flex flex-col gap-1">
        <ControlButton label="Zoom in" onClick={() => zoomBy(1.25)}>
          <ZoomIn className="h-3.5 w-3.5" />
        </ControlButton>
        <ControlButton label="Zoom out" onClick={() => zoomBy(0.8)}>
          <ZoomOut className="h-3.5 w-3.5" />
        </ControlButton>
        <ControlButton label="Fit view" onClick={fitView}>
          <Maximize className="h-3.5 w-3.5" />
        </ControlButton>
        <ControlButton label="Re-run layout" onClick={() => reheat(1)}>
          <RefreshCw className="h-3.5 w-3.5" />
        </ControlButton>
      </div>
      <div className="pointer-events-none absolute bottom-2 left-3 text-[10px] text-muted-foreground/70">
        drag nodes · scroll to zoom · drag canvas to pan · click a node to inspect
      </div>
    </div>
  );
};

const ControlButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card/90 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
  >
    {children}
  </button>
);

function relationColor(rel: string): string {
  const map: Record<string, string> = {
    FIXED_BY: "var(--rel-fixed-by)",
    DECIDED_ON: "var(--rel-decided-on)",
    MENTIONED_IN: "var(--rel-mentioned-in)",
    RELATED_TO: "var(--rel-related-to)",
  };
  return map[rel] ?? "var(--graph-edge)";
}
