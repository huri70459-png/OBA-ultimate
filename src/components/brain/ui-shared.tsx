"use client";

// Shared UI atoms for the Brain workspace.
// Every style routes through the Deep Intelligence semantic tokens
// (globals.css) — raw palette values never appear in components.

import { Brain, Camera, Clipboard, FileText, Layers, Terminal } from "lucide-react";

export const ITEM_TYPE_STYLE: Record<
  string,
  { label: string; icon: typeof Brain; badge: string; dot: string }
> = {
  note: {
    label: "Note",
    icon: FileText,
    badge: "bg-primary/10 text-primary-300 border-primary/30",
    dot: "bg-primary-400",
  },
  screenshot: {
    label: "Screenshot / OCR",
    icon: Camera,
    badge: "bg-info/10 text-info border-info/30",
    dot: "bg-info",
  },
  terminal: {
    label: "Terminal Log",
    icon: Terminal,
    badge: "bg-destructive/10 text-destructive border-destructive/30",
    dot: "bg-destructive",
  },
  clip: {
    label: "Web Clip",
    icon: Clipboard,
    badge: "bg-warning/10 text-warning border-warning/30",
    dot: "bg-warning",
  },
  session: {
    label: "Work Session (Compressed)",
    icon: Layers,
    badge: "bg-success/10 text-success border-success/30",
    dot: "bg-success",
  },
};

export function itemTypeStyle(type: string) {
  return ITEM_TYPE_STYLE[type] ?? ITEM_TYPE_STYLE.note;
}

/** v2.1: how many times this exact capture was observed (duplicate folding counter). */
export function occurrenceOf(metadata: Record<string, unknown> | undefined | null): number {
  return Math.max(1, Number(metadata?.occurrence_count ?? 1));
}

/** ×N chip shown when duplicate captures were folded into an item (v2.1). */
export const OccurrenceBadge = ({ metadata }: { metadata?: Record<string, unknown> | null }) => {
  const n = occurrenceOf(metadata);
  if (n <= 1) return null;
  return (
    <span
      title={`Exact duplicate folding: this capture was observed ${n} times (last: ${
        typeof metadata?.last_seen_at === "string" ? metadata.last_seen_at.slice(0, 16).replace("T", " ") : "—"
      })`}
      className="shrink-0 rounded border border-info/30 bg-info/10 px-1.5 py-0.5 text-[10px] font-bold text-info"
    >
      ×{n}
    </span>
  );
};

/**
 * Relation palette — stroke values are CSS variables (globals.css) so the SVG
 * graph renders in the Deep Intelligence world without hardcoding hex colors.
 */
export const RELATION_STYLE: Record<string, { stroke: string; chip: string }> = {
  FIXED_BY: { stroke: "var(--rel-fixed-by)", chip: "text-warning border-warning/30 bg-warning/10" },
  DECIDED_ON: { stroke: "var(--rel-decided-on)", chip: "text-success border-success/30 bg-success/10" },
  MENTIONED_IN: { stroke: "var(--rel-mentioned-in)", chip: "text-muted-foreground border-border bg-muted/40" },
  RELATED_TO: { stroke: "var(--rel-related-to)", chip: "text-primary-300 border-primary/30 bg-primary/10" },
};

export function relationStyle(rel: string) {
  return RELATION_STYLE[rel] ?? RELATION_STYLE.RELATED_TO;
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function shortTime(iso: string): string {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
