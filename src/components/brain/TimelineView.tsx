"use client";

// TAB 2 — Universal Chronological Timeline across all projects

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import type { TimelineEntry } from "@/lib/brain/types";
import { itemTypeStyle, shortTime } from "./ui-shared";

export const TimelineView = () => {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (datePrefix?: string) => {
    setLoading(true);
    try {
      const url = datePrefix
        ? `/api/timeline?date=${encodeURIComponent(datePrefix)}&limit=60`
        : "/api/timeline?limit=60";
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setEntries(data.timeline ?? []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section
      className="brain-scroll h-full select-text overflow-y-auto p-4 md:p-6"
      aria-label="Universal timeline"
    >
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">Universal Chronological Timeline</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Humans remember by time, not folders. Every screenshot, error, and note across all
              projects — newest first.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                void load(e.target.value || undefined);
              }}
              aria-label="Filter timeline by date"
              className="rounded-lg border border-input bg-background/70 px-3 py-1.5 text-xs text-foreground [color-scheme:dark] focus:outline-none"
            />
            <button
              onClick={() => {
                setDate("");
                void load();
              }}
              className="flex items-center gap-1 rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs text-foreground/90 transition-colors hover:bg-accent"
              aria-label="Refresh timeline"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        <div className="relative space-y-3 border-l border-border pl-5 pt-2">
          {loading && <div className="text-xs text-muted-foreground">Loading timeline…</div>}
          {!loading && entries.length === 0 && (
            <div className="text-xs text-muted-foreground">
              No captures{date ? ` on ${date}` : " yet"}. Anything you capture lands here instantly.
            </div>
          )}
          {entries.map((e) => {
            const style = itemTypeStyle(e.itemType);
            const Icon = style.icon;
            return (
              <div key={e.id} className="relative">
                <span
                  className={`absolute -left-[26px] top-3 h-2.5 w-2.5 rounded-full ring-4 ring-background ${style.dot}`}
                />
                <div className="rounded-xl border border-border bg-card/50 p-3.5 transition-colors hover:border-primary/40 hover:bg-card/80">
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-semibold text-foreground">{e.title}</span>
                    <span
                      className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${style.badge}`}
                    >
                      {style.label}
                    </span>
                    {e.projectName && (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary-300">
                        {e.projectName}
                      </span>
                    )}
                    <span className="ml-auto text-[10px] text-muted-foreground/70">
                      {shortTime(e.capturedAt)} · {e.sourceApp || "unknown source"}
                    </span>
                  </div>
                  {e.structuredSummary && (
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                      {e.structuredSummary}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
