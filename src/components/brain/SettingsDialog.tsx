"use client";

// AI Backend & Runtime Settings dialog (v2.2)
// - Wire a live LLM backend (Ollama / OpenAI / Anthropic / Gemini) at runtime — no
//   redeploy: grounded Q&A upgrades from evidence excerpts to real synthesis the
//   moment a backend answers.
// - Tune the duplicate-folding window (DEDUP_WINDOW_HOURS semantics, 1-8760h).
// - Configure the desktop-agent ingest token + copy a ready-to-run agent command.

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, XCircle, Copy, RefreshCw, KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import type { LlmBackend } from "@/lib/brain/types";
import { useWorkspace } from "./workspace-store";

interface SecretShape {
  configured: boolean;
  masked: string;
  source: string;
}

interface BackendConfig {
  provider: string;
  ollama_url: string;
  ollama_model: string;
  openai_api_key: SecretShape;
  anthropic_api_key: SecretShape;
  gemini_api_key: SecretShape;
  openai_base_url: string;
  anthropic_base_url: string;
  gemini_base_url: string;
  llm_timeout_seconds: string;
  dedup_window_hours: number;
  agent_ingest_token: SecretShape;
}

interface ProbeResult {
  provider: string;
  ok: boolean;
  detail: string;
  latency_ms: number;
}

const PROVIDER_OPTIONS: { value: string; label: string }[] = [
  { value: "auto", label: "Auto-detect (Ollama → keys → Offline)" },
  { value: "ollama", label: "Ollama (local)" },
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "gemini", label: "Gemini" },
  { value: "deterministic-offline", label: "Deterministic Offline (no network)" },
];

const inputCls =
  "w-full rounded border border-slate-700 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between text-[11px] font-medium text-slate-300">
        {label}
        {hint ? <span className="ml-2 font-normal text-slate-500">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 flex items-center gap-1.5 border-b border-slate-800/80 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
      {children}
    </p>
  );
}

export function SettingsDialog() {
  const open = useWorkspace((s) => s.settingsOpen);
  const close = useWorkspace((s) => s.closeDialog);
  const llmBackend = useWorkspace((s) => s.llmBackend);
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cfg, setCfg] = useState<BackendConfig | null>(null);
  const [effective, setEffective] = useState<LlmBackend | null>(null);

  // form state (keys start blank = "leave unchanged")
  const [provider, setProvider] = useState("auto");
  const [ollamaUrl, setOllamaUrl] = useState("");
  const [ollamaModel, setOllamaModel] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [openaiBase, setOpenaiBase] = useState("");
  const [anthropicBase, setAnthropicBase] = useState("");
  const [geminiBase, setGeminiBase] = useState("");
  const [timeoutSec, setTimeoutSec] = useState("");
  const [dedupHours, setDedupHours] = useState(36);
  const [agentToken, setAgentToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [agentTokenVisible, setAgentTokenVisible] = useState(""); // generated token shown once
  const [probe, setProbe] = useState<ProbeResult | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/llm-backend", { cache: "no-store" });
      const data = (await res.json()) as { effective_backend: LlmBackend; config: BackendConfig };
      setEffective(data.effective_backend);
      setCfg(data.config);
      setProvider(data.config.provider);
      setOllamaUrl(data.config.ollama_url);
      setOllamaModel(data.config.ollama_model);
      setOpenaiBase(data.config.openai_base_url);
      setAnthropicBase(data.config.anthropic_base_url);
      setGeminiBase(data.config.gemini_base_url);
      setTimeoutSec(data.config.llm_timeout_seconds);
      setDedupHours(data.config.dedup_window_hours);
    } catch {
      toast({ title: "Failed to load runtime settings", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (open) {
      setProbe(null);
      setAgentTokenVisible("");
      void load();
    }
  }, [open, load]);

  const save = async () => {
    setSaving(true);
    setProbe(null);
    try {
      const body: Record<string, unknown> = {
        provider,
        ollama_url: ollamaUrl,
        ollama_model: ollamaModel,
        openai_base_url: openaiBase,
        anthropic_base_url: anthropicBase,
        gemini_base_url: geminiBase,
        dedup_window_hours: dedupHours,
        probe: true,
      };
      if (timeoutSec.trim() !== String(cfg?.llm_timeout_seconds ?? "")) body.llm_timeout_seconds = timeoutSec.trim();
      if (openaiKey.trim()) body.openai_api_key = openaiKey.trim();
      if (anthropicKey.trim()) body.anthropic_api_key = anthropicKey.trim();
      if (geminiKey.trim()) body.gemini_api_key = geminiKey.trim();
      if (agentToken === "__clear__") body.agent_ingest_token = "__clear__";
      else if (agentToken.trim()) body.agent_ingest_token = agentToken.trim();

      const res = await fetch("/api/llm-backend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as {
        error?: string;
        probe?: ProbeResult | null;
        effective_backend: LlmBackend;
        generated_token?: string;
        dedup_window_hours?: number;
      };
      if (!res.ok) throw new Error(data.error || "Save failed");

      setEffective(data.effective_backend);
      setProbe(data.probe ?? null);
      if (data.generated_token) {
        setAgentTokenVisible(data.generated_token);
        setAgentToken(""); // stored — clear the edit field
      }
      if (agentToken === "__clear__") {
        setAgentToken("");
        setAgentTokenVisible("");
      }
      toast({
        title: "Runtime settings saved",
        description: data.probe
          ? `${data.probe.ok ? "Probe OK" : "Probe failed"} — backend: ${data.effective_backend.provider}`
          : `Backend: ${data.effective_backend.provider}`,
        variant: data.probe && !data.probe.ok ? "destructive" : "default",
      });
      await load();
    } catch (e) {
      toast({
        title: "Save failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const backendLabel = (b: LlmBackend | null) =>
    b ? `${b.provider === "deterministic-offline" ? "Offline Synthesizer" : b.provider} · ${b.model}` : "…";

  const agentCommand = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const url = `${origin}/api/agent/capture`;
    const tok = agentTokenVisible || (cfg?.agent_ingest_token.configured ? "<configured-token>" : "");
    return tok
      ? `BRAIN_API_URL=${url} BRAIN_INGEST_TOKEN=${tok} python desktop_agent.py --watch`
      : `BRAIN_API_URL=${url} python desktop_agent.py --watch`;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close("settingsOpen")}>
      <DialogContent className="border-slate-800 bg-[#0d1220] text-slate-200 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <KeyRound className="h-4 w-4 text-violet-300" /> AI Backend &amp; Runtime Settings
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Live config — no restart needed. Paste an API key to upgrade grounded answers from evidence
            excerpts to real LLM synthesis.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-2 brain-scroll">
          {loading && !cfg ? (
            <p className="py-8 text-center text-xs text-slate-500">Loading configuration…</p>
          ) : (
            <div className="space-y-4 pb-1">
              {/* Effective backend */}
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
                <span className="text-[11px] text-slate-400">Effective backend:</span>
                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-300">
                  {backendLabel(effective ?? llmBackend)}
                </span>
                {probe && (
                  <span
                    className={`ml-auto flex items-center gap-1 text-[11px] ${probe.ok ? "text-emerald-300" : "text-rose-300"}`}
                  >
                    {probe.ok ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    Probe {probe.ok ? "OK" : "failed"} · {probe.latency_ms}ms
                  </span>
                )}
              </div>
              {probe && (
                <p className="rounded border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 font-mono text-[10px] leading-relaxed text-slate-400">
                  {probe.detail}
                </p>
              )}

              {/* Provider + Ollama */}
              <div className="space-y-2">
                <SectionTitle>LLM Provider</SectionTitle>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  aria-label="LLM provider"
                  className={inputCls}
                >
                  {PROVIDER_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Ollama URL">
                    <input value={ollamaUrl} onChange={(e) => setOllamaUrl(e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Ollama model">
                    <input value={ollamaModel} onChange={(e) => setOllamaModel(e.target.value)} className={inputCls} />
                  </Field>
                </div>
              </div>

              {/* Cloud keys */}
              <div className="space-y-2">
                <SectionTitle>Cloud API Keys (leave blank to keep current)</SectionTitle>
                <Field
                  label="OpenAI key"
                  hint={cfg?.openai_api_key.configured ? `configured: ${cfg.openai_api_key.masked}` : "not set"}
                >
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    placeholder={cfg?.openai_api_key.configured ? "•••••••• (unchanged)" : "sk-…"}
                    className={inputCls}
                  />
                </Field>
                <Field label="Anthropic key" hint={cfg?.anthropic_api_key.configured ? `configured: ${cfg.anthropic_api_key.masked}` : "not set"}>
                  <input
                    type="password"
                    value={anthropicKey}
                    onChange={(e) => setAnthropicKey(e.target.value)}
                    placeholder={cfg?.anthropic_api_key.configured ? "•••••••• (unchanged)" : "sk-ant-…"}
                    className={inputCls}
                  />
                </Field>
                <Field label="Gemini key" hint={cfg?.gemini_api_key.configured ? `configured: ${cfg.gemini_api_key.masked}` : "not set"}>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder={cfg?.gemini_api_key.configured ? "•••••••• (unchanged)" : "AIza…"}
                    className={inputCls}
                  />
                </Field>
                <details className="rounded border border-slate-800/80 bg-slate-950/40 px-2.5 py-1.5">
                  <summary className="cursor-pointer text-[11px] text-slate-400">Advanced: API base URLs &amp; timeout</summary>
                  <div className="mt-2 space-y-2">
                    <Field label="OpenAI base URL" hint="OpenAI-compatible gateways welcome">
                      <input value={openaiBase} onChange={(e) => setOpenaiBase(e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Anthropic base URL">
                      <input value={anthropicBase} onChange={(e) => setAnthropicBase(e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Gemini base URL">
                      <input value={geminiBase} onChange={(e) => setGeminiBase(e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Timeout (seconds)" hint="3-120 · default: 8 local / 25 cloud">
                      <input value={timeoutSec} onChange={(e) => setTimeoutSec(e.target.value)} placeholder="auto" className={inputCls} />
                    </Field>
                  </div>
                </details>
              </div>

              {/* Dedup + agent */}
              <div className="space-y-2">
                <SectionTitle>Duplicate Folding &amp; Desktop Agent</SectionTitle>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Dedup window (hours)" hint="1-8760 · default 36">
                    <input
                      type="number"
                      min={1}
                      max={8760}
                      value={dedupHours}
                      onChange={(e) => setDedupHours(Math.max(1, Math.min(8760, Number(e.target.value) || 36)))}
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Agent ingest token"
                    hint={cfg?.agent_ingest_token.configured ? `configured: ${cfg.agent_ingest_token.masked}` : "trusted mode"}
                  >
                    <div className="flex gap-1.5">
                      <input
                        type={showToken ? "text" : "password"}
                        value={agentToken}
                        onChange={(e) => setAgentToken(e.target.value)}
                        placeholder="leave blank = unchanged"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken((v) => !v)}
                        className="rounded border border-slate-700 bg-slate-800 px-2 text-[10px] text-slate-300 hover:bg-slate-700"
                        aria-label="Toggle token visibility"
                      >
                        {showToken ? "Hide" : "Show"}
                      </button>
                    </div>
                  </Field>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setAgentToken("__generate__")}
                    className="rounded border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-300 hover:bg-indigo-500/20"
                  >
                    Generate token
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgentToken("__clear__")}
                    className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-slate-700"
                  >
                    Clear token (trusted mode)
                  </button>
                </div>
                {agentTokenVisible && (
                  <p className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 font-mono text-[10px] break-all text-emerald-300">
                    New token (copy now — stored masked): {agentTokenVisible}
                  </p>
                )}
                <div className="rounded border border-slate-800/80 bg-slate-950/40 px-2.5 py-2">
                  <p className="mb-1 text-[11px] text-slate-400">
                    Desktop agent ingest (clipboard watcher / hotkey snips → this workspace):
                  </p>
                  <code className="block break-all font-mono text-[10px] text-slate-300">{agentCommand()}</code>
                  <button
                    type="button"
                    onClick={() => void navigator.clipboard.writeText(agentCommand())}
                    className="mt-1.5 flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-slate-700"
                  >
                    <Copy className="h-3 w-3" /> Copy command
                  </button>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <button
            onClick={save}
            disabled={saving || loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${saving ? "animate-spin" : ""}`} />
            {saving ? "Saving & probing…" : "Save & Test Connection"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
