"use client";

// Shared UI atoms for the Brain workspace

import { Brain, Camera, Clipboard, FileText, Terminal } from "lucide-react";

export const ITEM_TYPE_STYLE: Record<
  string,
  { label: string; icon: typeof Brain; badge: string; dot: string }
> = {
  note: {
    label: "Note",
    icon: FileText,
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/25",
    dot: "bg-violet-400",
  },
  screenshot: {
    label: "Screenshot / OCR",
    icon: Camera,
    badge: "bg-sky-500/10 text-sky-300 border-sky-500/25",
    dot: "bg-sky-400",
  },
  terminal: {
    label: "Terminal Log",
    icon: Terminal,
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/25",
    dot: "bg-rose-400",
  },
  clip: {
    label: "Web Clip",
    icon: Clipboard,
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    dot: "bg-amber-400",
  },
};

export function itemTypeStyle(type: string) {
  return ITEM_TYPE_STYLE[type] ?? ITEM_TYPE_STYLE.note;
}

export const RELATION_STYLE: Record<string, { stroke: string; chip: string }> = {
  FIXED_BY: { stroke: "#f59e0b", chip: "text-amber-300 border-amber-500/30 bg-amber-500/10" },
  DECIDED_ON: { stroke: "#10b981", chip: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
  MENTIONED_IN: { stroke: "#64748b", chip: "text-slate-300 border-slate-500/30 bg-slate-500/10" },
  RELATED_TO: { stroke: "#a78bfa", chip: "text-violet-300 border-violet-500/30 bg-violet-500/10" },
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
