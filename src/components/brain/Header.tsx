"use client";

// Top command bar — brand, universal search, Zero-Save Capture, Self-Test

import { useState } from "react";
import { Search, Zap, Stethoscope } from "lucide-react";
import { useWorkspace } from "./workspace-store";

export function Header() {
  const openDialog = useWorkspace((s) => s.openDialog);
  const openSearch = useWorkspace((s) => s.openSearch);
  const [query, setQuery] = useState("");

  const submit = () => {
    if (query.trim()) openSearch(query.trim());
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-3 md:px-4 gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-600/30">
          <span aria-hidden className="text-base">🧠</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-bold tracking-tight text-white">
              PROJECT BRAIN OS
            </span>
            <span className="hidden shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-400 sm:inline">
              SQLite · Local-First
            </span>
          </div>
          <p className="hidden truncate text-[11px] text-slate-400 lg:block">
            Everything you see, decide, and build — searchable, linked, and ready for AI execution.
          </p>
        </div>
      </div>

      <div className="mx-2 hidden max-w-xl flex-1 md:block">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Search screenshots, terminal errors, decisions, or files..."
            aria-label="Universal vault search"
            className="w-full rounded-lg border border-slate-700/70 bg-slate-900/90 py-1.5 pl-9 pr-20 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-500" />
          <button
            onClick={submit}
            className="absolute right-1.5 top-1 rounded bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300 transition-colors hover:bg-slate-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => openDialog("captureOpen")}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
        >
          <Zap className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Zero-Save Capture</span>
          <span className="sm:hidden">Capture</span>
          <kbd className="hidden rounded bg-indigo-700 px-1.5 py-0.5 text-[10px] lg:inline">Alt+S</kbd>
        </button>
        <button
          onClick={() => openDialog("selfTestOpen")}
          className="hidden items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 sm:flex"
        >
          <Stethoscope className="h-3.5 w-3.5" />
          Self-Test
        </button>
      </div>
    </header>
  );
}
