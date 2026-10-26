"use client";

// DashboardView — Bento Grid landing tab (blueprint "Integrating into the Main
// Page with a Bento Grid Layout", wired to LIVE data):
//   row 1: Welcome + workspace stats (8 cols) | Quick Actions (4 cols)
//   row 2: Brain OS Graph (8 cols)            | Grounded Chat (4 cols)
//   row 3: Recent Activity (8 cols)           | Knowledge Health (4 cols)
// Server state via TanStack Query (GET /api/dashboard), client state via the
// workspace store — exactly the blueprint's Zustand + React Query split.

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  DatabaseZap,
  GitBranch,
  Inbox,
  Layers,
  MessageSquare,
  Scale,
  Stethoscope,
  Zap,
  ArrowRight,
  FolderPlus,
} from "lucide-react";
import { apiGet } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n";
import { useFlag } from "@/lib/feature-flags-client";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth-store";
import { useWorkspace } from "./workspace-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraphViewer } from "./graph-viewer";
import { ChatWidget } from "./chat-widget";
import { inferGraph } from "./GraphView";
import { shortTime } from "./ui-shared";

const STATUS_TONE: Record<string, string> = {
  Healthy: "border-success/30 bg-success/10 text-success",
  Fair: "border-warning/30 bg-warning/10 text-warning",
  "Needs attention": "border-destructive/30 bg-destructive/10 text-destructive",
  "Not scored yet": "border-border bg-muted text-muted-foreground",
};

/**
 * Bento card reveal (Tier-1 "subtle animations", framer-motion).
 * Grid cell wrapper so col-span classes stay on the animated element;
 * MotionConfig reducedMotion="user" handles vestibular safety, and the
 * ui.bento_stagger feature flag is the ops-level kill switch (blueprint
 * "Feature Flags / Kill Switches") — flipping it in Settings re-renders
 * the dashboard statically on the next visit.
 */
const BentoReveal = ({
  delay,
  className,
  disabled = false,
  children,
}: {
  delay: number;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  if (disabled) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const DashboardView = () => {
  const { t, fmtNumber } = useI18n();
  const { toast } = useToast();
  const canEdit = useAuthStore((s) => s.user?.role !== "viewer");
  const staggerEnabled = useFlag("ui.bento_stagger");

  const openDialog = useWorkspace((s) => s.openDialog);
  const setTab = useWorkspace((s) => s.setTab);
  const compressMemory = useWorkspace((s) => s.compressMemory);
  const selectedId = useWorkspace((s) => s.selectedId);
  const details = useWorkspace((s) => s.details);
  const loadingDetails = useWorkspace((s) => s.loadingDetails);

  const dashboard = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apiGet<import("@/lib/brain/types").DashboardSummary>("/api/dashboard"),
    staleTime: 15_000,
  });

  const graph = inferGraph(details?.graphEdges ?? []);
  const chatProjectId = selectedId && selectedId !== "inbox" ? selectedId : "";

  const compress = async () => {
    const report = await compressMemory();
    if (!report) {
      toast({ title: t("dash.quick.compress"), description: "Compression failed", variant: "destructive" });
      return;
    }
    void dashboard.refetch();
    toast({
      title: "🧠 Memory compression complete",
      description: `${report.sessionsCreated} session rollup(s) · ${report.summariesUpdated.length} summaries synthesized`,
    });
  };

  const stats: Array<{ icon: typeof Layers; key: "projects" | "captures" | "decisions" | "edges" | "inbox"; value: number }> = [
    { icon: Layers, key: "projects", value: dashboard.data?.projects ?? 0 },
    { icon: DatabaseZap, key: "captures", value: dashboard.data?.captures ?? 0 },
    { icon: Scale, key: "decisions", value: dashboard.data?.decisions ?? 0 },
    { icon: GitBranch, key: "edges", value: dashboard.data?.edges ?? 0 },
    { icon: Inbox, key: "inbox", value: dashboard.data?.inbox ?? 0 },
  ];

  const quickActions: Array<{
    label: string;
    icon: typeof Zap;
    onClick: () => void;
    tone: string;
    disabled?: boolean;
  }> = [
    {
      label: t("dash.quick.capture"),
      icon: Zap,
      onClick: () => openDialog("captureOpen"),
      tone: "border-primary/40 bg-primary/10 text-primary-300 hover:bg-primary/20",
      disabled: !canEdit,
    },
    {
      label: t("dash.quick.decision"),
      icon: Scale,
      onClick: () => openDialog("decisionOpen"),
      tone: "border-success/30 bg-success/10 text-success hover:bg-success/20",
      disabled: !canEdit,
    },
    {
      label: t("dash.quick.project"),
      icon: FolderPlus,
      onClick: () => openDialog("newProjectOpen"),
      tone: "border-info/30 bg-info/10 text-info hover:bg-info/20",
      disabled: !canEdit,
    },
    {
      label: t("dash.quick.compress"),
      icon: DatabaseZap,
      onClick: () => void compress(),
      tone: "border-border bg-muted text-foreground/90 hover:bg-accent",
      disabled: !canEdit,
    },
    {
      label: t("dash.quick.selftest"),
      icon: Stethoscope,
      onClick: () => openDialog("selfTestOpen"),
      tone: "border-border bg-muted text-foreground/90 hover:bg-accent",
    },
  ];

  return (
    <section className="brain-scroll h-full select-text overflow-y-auto p-4 md:p-6" aria-label="Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* Welcome + stats */}
        <BentoReveal delay={0} disabled={!staggerEnabled} className="md:col-span-8">
          <Card variant="primary" interactive className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 text-xl">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-lg shadow-lg shadow-primary/30">
                🧠
              </span>
              {t("dash.welcome.title")}
            </CardTitle>
            <CardDescription>{t("dash.welcome.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
              {t("dash.welcome.body")}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {stats.map(({ icon: Icon, key, value }) => (
                <div key={key} className="rounded-lg border border-border/80 bg-background/50 p-2.5">
                  <Icon className="h-3.5 w-3.5 text-primary-300" aria-hidden />
                  <p className="mt-1 text-lg font-bold leading-none text-foreground">
                    {fmtNumber(value)}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {t(`dash.stat.${key}`)}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setTab("vault")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-400"
            >
              {t("dash.welcome.get_started")} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </CardContent>
        </Card>
        </BentoReveal>

        {/* Quick Actions */}
        <BentoReveal delay={0.05} disabled={!staggerEnabled} className="md:col-span-4">
          <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-warning" /> {t("dash.quick_actions")}
            </CardTitle>
            <CardDescription className="text-xs">{t("dash.quick_actions.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map(({ label, icon: Icon, onClick, tone, disabled }) => (
              <button
                key={label}
                onClick={onClick}
                disabled={disabled}
                className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${tone}`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {label}
              </button>
            ))}
          </CardContent>
        </Card>
        </BentoReveal>

        {/* Live graph */}
        <BentoReveal delay={0.1} disabled={!staggerEnabled} className="overflow-hidden md:col-span-8">
          <Card className="h-full overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BrainCircuit className="h-4 w-4 text-primary-400" /> {t("dash.graph.title")}
            </CardTitle>
            <CardDescription className="text-xs">
              {details?.project.name ?? "—"} · {t("dash.graph.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2 pr-2">
            {graph.nodes.length === 0 ? (
              <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                No graph edges yet — capture an error or log a decision to grow the graph.
              </div>
            ) : (
              <GraphViewer
                nodes={graph.nodes}
                links={graph.links}
                height={300}
                loading={loadingDetails}
                ariaLabel="Dashboard knowledge graph"
              />
            )}
          </CardContent>
        </Card>
        </BentoReveal>

        {/* Live chat */}
        <BentoReveal delay={0.15} disabled={!staggerEnabled} className="overflow-hidden md:col-span-4">
          <Card className="h-full overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4 text-primary-300" /> {t("dash.chat.title")}
            </CardTitle>
            <CardDescription className="text-xs">{t("dash.chat.desc")}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2 pr-2">
            <ChatWidget projectId={chatProjectId} className="h-[300px]" />
          </CardContent>
        </Card>
        </BentoReveal>

        {/* Recent activity */}
        <BentoReveal delay={0.2} disabled={!staggerEnabled} className="md:col-span-8">
          <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-info" /> {t("dash.activity.title")}
            </CardTitle>
            <CardDescription className="text-xs">{t("dash.activity.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {(dashboard.data?.recent ?? []).length === 0 ? (
              <p className="rounded-lg border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
                {t("dash.activity.empty")}
              </p>
            ) : (
              <ul className="space-y-1.5">
                {(dashboard.data?.recent ?? []).map((entry) => (
                  <li key={entry.id}>
                    <button
                      onClick={() => setTab("timeline")}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-transparent px-2 py-1.5 text-left transition-colors hover:border-border hover:bg-accent/40"
                    >
                      <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-[9px] uppercase text-muted-foreground">
                        {entry.itemType}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-xs text-foreground/90">
                        {entry.title}
                      </span>
                      {entry.projectName && (
                        <span className="hidden shrink-0 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[9px] text-primary-300 sm:inline">
                          {entry.projectName}
                        </span>
                      )}
                      <span className="shrink-0 text-[10px] text-muted-foreground/70">
                        {shortTime(entry.capturedAt)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        </BentoReveal>

        {/* Knowledge health */}
        <BentoReveal delay={0.25} disabled={!staggerEnabled} className="md:col-span-4">
          <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <BrainCircuit className="h-4 w-4 text-success" /> {t("dash.health.title")}
              {dashboard.data?.avg_health !== null && dashboard.data?.avg_health !== undefined && (
                <span className="ml-auto rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                  {fmtNumber(dashboard.data.avg_health)}
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-xs">
              Memory Compression Daemon · per-project scores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {(dashboard.data?.health ?? []).map((p) => (
              <div key={p.id} className="rounded-lg border border-border/70 bg-background/40 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-semibold text-foreground/90">{p.name}</p>
                  <span
                    className={`shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-semibold ${
                      STATUS_TONE[p.status] ?? STATUS_TONE["Not scored yet"]
                    }`}
                  >
                    {fmtNumber(p.score)} · {p.status}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${
                      p.score >= 80 ? "bg-success" : p.score >= 55 ? "bg-warning" : "bg-destructive"
                    }`}
                    style={{ width: `${Math.max(4, Math.min(100, p.score))}%` }}
                  />
                </div>
              </div>
            ))}
            {(dashboard.data?.health ?? []).length === 0 && (
              <p className="text-xs text-muted-foreground">No projects scored yet.</p>
            )}
          </CardContent>
        </Card>
        </BentoReveal>
      </div>
    </section>
  );
};

export { DashboardView };
