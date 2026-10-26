"use client";

// v2.4 Ops panels for the Settings dialog —
//
//   FeatureFlagsSection : self-hosted flag registry readback + owner-only
//                         overrides (blueprint "Feature Flags / Kill Switches")
//   TelemetrySection    : aggregated view of logs/metrics.jsonl (blueprint
//                         "Custom Metrics and Dashboards", self-hosted)

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Activity, Flag, RotateCcw } from "lucide-react";
import { apiGet, apiPut } from "@/lib/api-client";
import { useFlags, type FlagView } from "@/lib/feature-flags-client";
import { useAuthStore } from "@/stores/auth-store";
import { useToast } from "@/hooks/use-toast";

const SectionCard = ({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border/80 bg-background/40 p-3">
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/90">{title}</p>
    </div>
    <p className="mt-0.5 text-[10px] text-muted-foreground">{desc}</p>
    <div className="mt-2 space-y-1.5">{children}</div>
  </div>
);

export const FeatureFlagsSection = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  // Open/bootstrap mode (user null) is writable like every other mutation.
  const canManage = !user || user.role === "owner";
  const flags = useFlags();

  const setFlag = async (id: string, patch: { enabled?: boolean; reset?: boolean }) => {
    try {
      await apiPut(`/api/feature-flags`, { id, ...patch });
      await queryClient.invalidateQueries({ queryKey: ["feature-flags"] });
      toast({ title: patch.reset ? `Flag ${id} reset to default` : `Flag ${id} updated` });
    } catch (e) {
      toast({
        title: "Flag update failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <SectionCard
      icon={<Flag className="h-3.5 w-3.5 text-info" />}
      title="Feature Flags"
      desc="Self-hosted progressive rollouts and kill switches — effective immediately, no redeploy."
    >
      {(flags.data?.flags ?? []).map((f: FlagView) => (
        <div key={f.id} className="flex items-center gap-2 rounded border border-border/60 bg-card/50 px-2.5 py-1.5">
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[11px] font-semibold text-foreground/90">{f.id}</p>
            <p className="truncate text-[10px] text-muted-foreground" title={f.description}>
              {f.description}
            </p>
            <p className="text-[9px] text-muted-foreground/70">
              {f.surface} · rollout {f.rollout}% · {f.source}
            </p>
          </div>
          {canManage ? (
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => void setFlag(f.id, { enabled: !f.enabled })}
                aria-label={`Toggle ${f.id}`}
                className={`rounded px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                  f.enabled
                    ? "bg-success/15 text-success hover:bg-success/25"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {f.enabled ? "ON" : "OFF"}
              </button>
              {f.source === "stored" && (
                <button
                  type="button"
                  onClick={() => void setFlag(f.id, { reset: true })}
                  title="Reset to default"
                  aria-label={`Reset ${f.id}`}
                  className="rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              )}
            </div>
          ) : (
            <span className={`shrink-0 text-[10px] font-semibold ${f.enabled ? "text-success" : "text-muted-foreground"}`}>
              {f.enabled ? "ON" : "OFF"}
            </span>
          )}
        </div>
      ))}
      {flags.isLoading && <p className="text-[10px] text-muted-foreground">Loading flags…</p>}
    </SectionCard>
  );
};

interface MetricsSummary {
  total: number;
  by_type: Record<string, number>;
  file_bytes: number;
  web_vitals: Array<{ name: string; count: number; avg: number; max: number; poor: number }>;
  events: Array<{ name: string; count: number; lastAt: string }>;
  api_timings: Array<{ route: string; count: number; avgMs: number; maxMs: number; p95Ms: number; errors: number }>;
}

export const TelemetrySection = ({ open }: { open: boolean }) => {
  const summary = useQuery({
    queryKey: ["metrics-summary"],
    queryFn: () => apiGet<MetricsSummary>("/api/metrics"),
    enabled: open,
    staleTime: 5_000,
  });
  const data = summary.data;

  return (
    <SectionCard
      icon={<Activity className="h-3.5 w-3.5 text-primary-300" />}
      title="Ops & Telemetry"
      desc="Self-hosted APM: Core Web Vitals, product events, and slow API routes from logs/metrics.jsonl."
    >
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-foreground/90">
          {data ? `${data.total} samples` : "…"}
        </span>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] text-primary-300">
          vitals {data?.by_type?.web_vital ?? 0}
        </span>
        <span className="rounded-full border border-info/25 bg-info/10 px-2 py-0.5 text-[10px] text-info">
          events {data?.by_type?.event ?? 0}
        </span>
        <span className="rounded-full border border-warning/25 bg-warning/10 px-2 py-0.5 text-[10px] text-warning">
          api timings {data?.by_type?.api_timing ?? 0}
        </span>
      </div>
      {(data?.web_vitals ?? []).length > 0 && (
        <div className="space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">Core Web Vitals</p>
          {data?.web_vitals.slice(0, 5).map((v) => (
            <div key={v.name} className="flex items-center justify-between gap-2 text-[10px]">
              <span className="font-mono font-semibold text-foreground/90">{v.name}</span>
              <span className="text-muted-foreground">
                avg {v.avg}ms · max {v.max}ms{v.poor > 0 ? ` · ${v.poor} poor` : ""}
              </span>
            </div>
          ))}
        </div>
      )}
      {(data?.events ?? []).length > 0 && (
        <div className="space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">Top events</p>
          {data?.events.slice(0, 5).map((ev) => (
            <div key={ev.name} className="flex items-center justify-between gap-2 text-[10px]">
              <span className="truncate font-mono text-foreground/90">{ev.name}</span>
              <span className="shrink-0 text-muted-foreground">×{ev.count}</span>
            </div>
          ))}
        </div>
      )}
      {(data?.api_timings ?? []).length > 0 && (
        <div className="space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">Slowest routes</p>
          {data?.api_timings.slice(0, 4).map((r) => (
            <div key={r.route} className="flex items-center justify-between gap-2 text-[10px]">
              <span className="truncate font-mono text-foreground/90">{r.route}</span>
              <span className="shrink-0 text-muted-foreground">
                p95 {r.p95Ms}ms{r.errors > 0 ? ` · ${r.errors} err` : ""}
              </span>
            </div>
          ))}
        </div>
      )}
      {data && data.total === 0 && (
        <p className="text-[10px] text-muted-foreground">
          No samples yet — browse the workspace and they will appear here.
        </p>
      )}
    </SectionCard>
  );
};
