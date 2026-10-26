"use client";

// Top command bar — brand, universal search, Zero-Save Capture, Memory Compressor,
// Self-Test, language switcher (i18n), theme toggle (Tier-1 dual-mode), and the
// session user menu (auth).

import { useState } from "react";
import { LogOut, Search, ShieldCheck, Zap, Stethoscope, DatabaseZap, Cpu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/i18n/dictionaries";
import { useAuthStore } from "@/stores/auth-store";
import { useWorkspace } from "./workspace-store";

export const Header = () => {
  const openDialog = useWorkspace((s) => s.openDialog);
  const openSearch = useWorkspace((s) => s.openSearch);
  const compressMemory = useWorkspace((s) => s.compressMemory);
  const compressing = useWorkspace((s) => s.compressing);
  const llmBackend = useWorkspace((s) => s.llmBackend);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { t, locale, setLocale } = useI18n();
  const { toast } = useToast();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");

  const roleLabel = user
    ? user.role === "owner"
      ? t("user.role.owner")
      : user.role === "editor"
        ? t("user.role.editor")
        : t("user.role.viewer")
    : null;

  const backendLabel = llmBackend
    ? llmBackend.provider === "deterministic-offline"
      ? "Offline Synthesizer"
      : llmBackend.provider === "ollama"
        ? `Ollama · ${llmBackend.model}`
        : llmBackend.model
    : "…";

  const submit = () => {
    if (query.trim()) openSearch(query.trim());
  };

  const compress = async () => {
    const report = await compressMemory();
    if (!report) {
      toast({ title: "Compression failed", variant: "destructive" });
      return;
    }
    const gaps = Object.values(report.gapReport || {}).reduce((n, g) => n + g.length, 0);
    toast({
      title: "🧠 Memory compression complete",
      description: `${report.sessionsCreated} session rollup(s) · ${report.summariesUpdated.length} summaries synthesized · ${gaps} gap(s) flagged · ${report.durationMs}ms`,
    });
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-3 backdrop-blur md:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary/30">
          <span aria-hidden className="text-base">🧠</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-bold tracking-tight text-foreground">
              PROJECT BRAIN OS
            </span>
            <span className="hidden shrink-0 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-success sm:inline">
              SQLite · Local-First
            </span>
            <button
              type="button"
              onClick={() => openDialog("settingsOpen")}
              className="hidden shrink-0 cursor-pointer rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary-300 transition-colors hover:bg-primary/20 lg:inline"
              title={`AI backend: ${llmBackend?.provider ?? "…"} (${llmBackend?.mode ?? "…"}) — click to configure a live LLM, dedup window, or agent token`}
            >
              <Cpu className="mr-1 inline h-3 w-3" aria-hidden />
              {backendLabel}
            </button>
          </div>
          <p className="hidden truncate text-[11px] text-muted-foreground lg:block">
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
            className="w-full rounded-lg border border-input bg-background/80 py-1.5 pl-9 pr-20 text-xs text-foreground placeholder-muted-foreground/60 focus:border-primary focus:outline-none"
          />
          <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <button
            onClick={submit}
            className="absolute right-1.5 top-1 rounded bg-muted px-2.5 py-0.5 text-[11px] text-foreground/90 transition-colors hover:bg-accent"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {/* Open mode: affordance to bootstrap owner protection (blueprint "Route Protection") */}
        {!user && (
          <button
            onClick={() => useAuthStore.setState({ status: "setup", error: null })}
            title="Protect this workspace — create the owner account"
            aria-label="Protect this workspace"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-success/40 hover:text-success"
          >
            <ShieldCheck className="h-4 w-4" />
          </button>
        )}
        {/* Theme toggle (Tier-1: light + dark mode support). Icons are picked
            by CSS via the .dark class next-themes sets pre-paint — no client
            state, so SSR markup and hydration always agree. */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          title="Toggle light / dark mode"
          aria-label="Toggle light / dark mode"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary-300"
        >
          <Sun className="hidden h-4 w-4 dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </button>
        {/* Language switcher (blueprint i18n: dynamic switching) */}
        <div
          className="flex overflow-hidden rounded-lg border border-border"
          role="group"
          aria-label="Language"
        >
          {LOCALES.map((l: Locale) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={`px-2 py-1.5 text-[10px] font-semibold transition-colors ${
                locale === l
                  ? "bg-primary/15 text-primary-300"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l === "en" ? "EN" : "中文"}
            </button>
          ))}
        </div>
        <button
          onClick={() => openDialog("captureOpen")}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-400"
        >
          <Zap className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Zero-Save Capture</span>
          <span className="sm:hidden">Capture</span>
          <kbd className="hidden rounded bg-primary-600 px-1.5 py-0.5 text-[10px] lg:inline">Alt+S</kbd>
        </button>
        <button
          onClick={compress}
          disabled={compressing}
          className="flex items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/20 disabled:opacity-50"
          title="Memory Compression Daemon: roll up work sessions, re-synthesize project summaries, flag knowledge gaps"
        >
          <DatabaseZap className={`h-3.5 w-3.5 ${compressing ? "animate-pulse" : ""}`} />
          <span className="hidden lg:inline">{compressing ? "Compressing…" : "Compress Memory"}</span>
          <span className="lg:hidden">Compress</span>
        </button>
        <button
          onClick={() => openDialog("selfTestOpen")}
          className="hidden items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:bg-accent sm:flex"
        >
          <Stethoscope className="h-3.5 w-3.5" />
          Self-Test
        </button>

        {/* Session user menu (rendered only when an account is signed in) */}
        {user && (
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted py-1 pl-1.5 pr-1">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-[10px] font-bold text-white"
              aria-hidden
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden leading-tight lg:block">
              <p className="max-w-[110px] truncate text-[10px] font-semibold text-foreground">
                {user.name}
              </p>
              <p className="text-[9px] text-muted-foreground">{roleLabel}</p>
            </div>
            <button
              onClick={() => {
                void logout().then(() => window.location.reload());
              }}
              title={t("user.sign_out")}
              aria-label={t("user.sign_out")}
              className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive"
            >
              <LogOut className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
