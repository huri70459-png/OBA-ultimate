// Project Brain OS — Hybrid Local/Cloud LLM Router & Anti-Drift Prompt Pre-Structurer
// Port of llm_bridge.py (Option 1 upgrade), extended to v2.2.
//
// Zero external dependencies: uses global fetch (Node 18+) and never throws — every
// failure degrades to the built-in Deterministic Offline Synthesizer so the app never
// blocks on API keys.
//
//  1. detectActiveBackend()  — provider override (runtime setting) or the auto chain:
//     Ollama (http://127.0.0.1:11434) -> OPENAI_API_KEY -> ANTHROPIC_API_KEY ->
//     GEMINI_API_KEY -> deterministic-offline.
//  2. completeText()         — LIVE completions for all four providers: Ollama,
//     OpenAI (chat/completions), Anthropic (v1/messages), Gemini (generateContent).
//     Returns "" on any failure so callers fall back to deterministic synthesis
//     seamlessly (never fabricates).
//  3. rewriteRawPrompt()     — rewrites a raw, unclear thought into a strict 5-section
//     engineering spec anchored to Tier-1 Rolling Memory, Tier-2 Decision Graph, and
//     Tier-3 Vault Evidence, with a ~2,500 token budget estimator.
//  4. probeBackend()         — real connectivity test per provider (used by the
//     Runtime Settings dialog to "wire a live backend" with immediate feedback).
//
// v2.2 runtime configuration: values come from the DB Setting store first, then env
// vars, then defaults — so a user can paste an OpenAI key in the UI and grounded
// answers upgrade from excerpts to synthesis without a restart. Base URLs are also
// overridable (OpenAI-compatible gateways, Azure-style proxies, LM Studio bridges).

import { readSettings } from "./settings";
import type { ContextPayload, LlmBackend, PromptRewriteResult } from "./types";

export const TOKEN_BUDGET = 2500;

export const PROVIDERS = [
  "auto",
  "ollama",
  "openai",
  "anthropic",
  "gemini",
  "deterministic-offline",
] as const;
export type ProviderChoice = (typeof PROVIDERS)[number];

const DEFAULT_OPENAI_BASE = "https://api.openai.com/v1";
const DEFAULT_ANTHROPIC_BASE = "https://api.anthropic.com";
const DEFAULT_GEMINI_BASE = "https://generativelanguage.googleapis.com";
const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";

/** Resolved per-call configuration (env merged with DB settings; DB wins). */
interface RuntimeLlmConfig {
  providerOverride: ProviderChoice;
  ollamaUrl: string;
  ollamaModel: string;
  openaiKey: string;
  anthropicKey: string;
  geminiKey: string;
  openaiBase: string;
  anthropicBase: string;
  geminiBase: string;
  /** Explicit seconds from settings/env, or null to use provider defaults. */
  timeoutSeconds: number | null;
}

function normalizeBase(url: string): string {
  return url.replace(/\/+$/, "");
}

export class HybridLLMBridge {
  // backendMemo keeps backend detection stable for 30s — but ONLY while the runtime
  // config is unchanged (see runtimeConfig(): a config change drops this memo so a
  // freshly saved key/provider takes effect on the very next call, in any route).
  private backendMemo: { backend: LlmBackend; expiresAt: number } | null = null;
  private lastConfigJson: string | null = null;

  /** v2.2: merge env vars with the runtime settings store (DB settings win).
   *  Read FRESH on every call (the Setting table is tiny) — memoizing this created
   *  cross-bundle staleness where a just-saved key was invisible to other routes. */
  async runtimeConfig(): Promise<RuntimeLlmConfig> {
    const s = await readSettings();
    const pick = (key: string, envVal: string, fallback = ""): string =>
      (s[key as keyof typeof s] || envVal || fallback).trim();

    const rawTimeout = pick("llm_timeout_seconds", process.env.LLM_TIMEOUT_SECONDS || "");
    const timeoutNum = rawTimeout ? Number(rawTimeout) : NaN;

    const config: RuntimeLlmConfig = {
      providerOverride: (s.llm_provider as ProviderChoice) || "auto",
      ollamaUrl: normalizeBase(pick("ollama_url", process.env.OLLAMA_URL || "", DEFAULT_OLLAMA_URL)),
      ollamaModel: pick("ollama_model", process.env.OLLAMA_MODEL || "", "llama3.2"),
      openaiKey: pick("openai_api_key", process.env.OPENAI_API_KEY || ""),
      anthropicKey: pick("anthropic_api_key", process.env.ANTHROPIC_API_KEY || ""),
      geminiKey: pick("gemini_api_key", process.env.GEMINI_API_KEY || ""),
      openaiBase: normalizeBase(pick("openai_base_url", process.env.OPENAI_BASE_URL || "", DEFAULT_OPENAI_BASE)),
      anthropicBase: normalizeBase(pick("anthropic_base_url", process.env.ANTHROPIC_BASE_URL || "", DEFAULT_ANTHROPIC_BASE)),
      geminiBase: normalizeBase(pick("gemini_base_url", process.env.GEMINI_BASE_URL || "", DEFAULT_GEMINI_BASE)),
      timeoutSeconds: Number.isFinite(timeoutNum) && timeoutNum >= 3 && timeoutNum <= 120 ? timeoutNum : null,
    };

    // Config changed (settings write from this or another route bundle) -> the
    // previously detected backend is no longer trustworthy; force re-detection.
    const configJson = JSON.stringify(config);
    if (this.lastConfigJson !== null && this.lastConfigJson !== configJson) {
      this.backendMemo = null;
    }
    this.lastConfigJson = configJson;

    return config;
  }

  /** v2.2: drop memoized config + backend so new settings take effect immediately. */
  invalidateRuntimeConfig(): void {
    this.lastConfigJson = null;
    this.backendMemo = null;
  }

  private timeoutMsFor(cfg: RuntimeLlmConfig, provider: string, overrideMs?: number): number {
    if (overrideMs) return overrideMs;
    if (cfg.timeoutSeconds) return cfg.timeoutSeconds * 1000;
    // Ollama answers fast locally; cloud synthesis of ~700 tokens needs more headroom.
    return provider === "ollama" ? 8_000 : 25_000;
  }

  // =========================================================================
  // 1. BACKEND DETECTION (never throws)
  // =========================================================================
  async detectActiveBackend(): Promise<LlmBackend> {
    const now = Date.now();
    // Resolve config FIRST: it clears backendMemo when the config changed, so a
    // freshly saved provider/key is honored on this very call.
    const cfg = await this.runtimeConfig();
    if (this.backendMemo && this.backendMemo.expiresAt > now) return this.backendMemo.backend;
    let backend: LlmBackend;

    if (cfg.providerOverride === "deterministic-offline") {
      backend = { provider: "deterministic-offline", model: "rule-synthesizer-v2", mode: "offline_fallback" };
    } else if (cfg.providerOverride === "openai") {
      backend = { provider: "openai", model: "gpt-4o-mini", mode: "cloud_llm" };
    } else if (cfg.providerOverride === "anthropic") {
      backend = { provider: "anthropic", model: "claude-3-5-sonnet-latest", mode: "cloud_llm" };
    } else if (cfg.providerOverride === "gemini") {
      backend = { provider: "gemini", model: "gemini-2.5-flash", mode: "cloud_llm" };
    } else if (cfg.providerOverride === "ollama") {
      // Forced local: report ollama regardless of liveness (probe surfaces health);
      // completeText degrades to "" -> offline synthesis when unreachable.
      backend = { provider: "ollama", model: cfg.ollamaModel, mode: "local_llm" };
    } else if (cfg.providerOverride === "auto" && !this.preferLocalOllamaDisabled && (await this.isOllamaAlive(cfg))) {
      backend = { provider: "ollama", model: cfg.ollamaModel, mode: "local_llm" };
    } else if (cfg.openaiKey) {
      backend = { provider: "openai", model: "gpt-4o-mini", mode: "cloud_llm" };
    } else if (cfg.anthropicKey) {
      backend = { provider: "anthropic", model: "claude-3-5-sonnet-latest", mode: "cloud_llm" };
    } else if (cfg.geminiKey) {
      backend = { provider: "gemini", model: "gemini-2.5-flash", mode: "cloud_llm" };
    } else {
      backend = { provider: "deterministic-offline", model: "rule-synthesizer-v2", mode: "offline_fallback" };
    }

    this.backendMemo = { backend, expiresAt: now + 30_000 }; // 30s probe memo
    return backend;
  }

  // Kept for backward compatibility with tests/config that toggle the auto chain.
  private get preferLocalOllamaDisabled(): boolean {
    return process.env.BRAIN_DISABLE_OLLAMA_PROBE === "1";
  }

  private async isOllamaAlive(cfg?: RuntimeLlmConfig): Promise<boolean> {
    try {
      const url = cfg ? cfg.ollamaUrl : normalizeBase(process.env.OLLAMA_URL || DEFAULT_OLLAMA_URL);
      const res = await fetch(`${url}/api/tags`, {
        method: "GET",
        signal: AbortSignal.timeout(1500),
      });
      return res.status === 200;
    } catch {
      return false;
    }
  }

  // =========================================================================
  // 2. LIVE COMPLETION (graceful "" fallback, like llm_bridge.complete_text)
  // =========================================================================
  async completeText(
    systemPrompt: string,
    userPrompt: string,
    maxTokens = 600,
    opts?: { timeoutMs?: number }
  ): Promise<string> {
    const backend = await this.detectActiveBackend();
    const cfg = await this.runtimeConfig();
    const timeoutMs = this.timeoutMsFor(cfg, backend.provider, opts?.timeoutMs);
    try {
      if (backend.provider === "ollama") {
        const res = await fetch(`${cfg.ollamaUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: cfg.ollamaModel,
            prompt: `System: ${systemPrompt}\n\nUser: ${userPrompt}`,
            stream: false,
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok) return "";
        const body = (await res.json()) as { response?: string };
        return (body.response ?? "").trim();
      }

      if (backend.provider === "openai") {
        const res = await fetch(`${cfg.openaiBase}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cfg.openaiKey}`,
          },
          body: JSON.stringify({
            model: backend.model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            max_tokens: maxTokens,
            temperature: 0.2,
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok) return "";
        const body = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
        return (body.choices?.[0]?.message?.content ?? "").trim();
      }

      if (backend.provider === "anthropic") {
        // v2.2: Anthropic Messages API parity (previously detected-but-unwired).
        const res = await fetch(`${cfg.anthropicBase}/v1/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": cfg.anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: backend.model,
            max_tokens: maxTokens,
            system: systemPrompt,
            messages: [{ role: "user", content: userPrompt }],
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok) return "";
        const body = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
        return (body.content ?? [])
          .filter((b) => b.type === "text")
          .map((b) => b.text ?? "")
          .join("")
          .trim();
      }

      if (backend.provider === "gemini") {
        // v2.2: Gemini generateContent parity (previously detected-but-unwired).
        const url =
          `${cfg.geminiBase}/v1beta/models/${encodeURIComponent(backend.model)}:generateContent` +
          `?key=${encodeURIComponent(cfg.geminiKey)}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: maxTokens },
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok) return "";
        const body = (await res.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        return (body.candidates?.[0]?.content?.parts ?? [])
          .map((p) => p.text ?? "")
          .join("")
          .trim();
      }
    } catch {
      // Fall through cleanly to offline synthesis
      return "";
    }
    // deterministic-offline (or unknown) -> callers synthesize deterministically.
    return "";
  }

  /**
   * v2.3 real-time chat: streaming completion (blueprint "Real-time Chat").
   * TRUE token deltas for Ollama (`stream: true` NDJSON) and OpenAI (SSE);
   * Anthropic/Gemini/offline fall back to buffered completeText() and emit the
   * answer as a single delta. Returns the full text ("" = no live backend, so
   * callers keep the honest offline contract).
   */
  async completeTextStream(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number,
    onDelta: (chunk: string) => void,
    opts?: { timeoutMs?: number },
  ): Promise<string> {
    const backend = await this.detectActiveBackend();
    const cfg = await this.runtimeConfig();
    const timeoutMs = this.timeoutMsFor(cfg, backend.provider, opts?.timeoutMs);

    const readLines = async (
      body: ReadableStream<Uint8Array>,
      handle: (line: string) => void,
    ): Promise<void> => {
      const reader = body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) handle(line);
      }
      if (buf.trim()) handle(buf);
    };

    try {
      if (backend.provider === "ollama") {
        const res = await fetch(`${cfg.ollamaUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: cfg.ollamaModel,
            prompt: `System: ${systemPrompt}\n\nUser: ${userPrompt}`,
            stream: true,
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok || !res.body) return "";
        let full = "";
        await readLines(res.body, (line) => {
          if (!line.trim()) return;
          try {
            const json = JSON.parse(line) as { response?: string };
            if (json.response) {
              full += json.response;
              onDelta(json.response);
            }
          } catch {
            // partial NDJSON line — skipped safely
          }
        });
        return full.trim();
      }

      if (backend.provider === "openai") {
        const res = await fetch(`${cfg.openaiBase}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cfg.openaiKey}`,
          },
          body: JSON.stringify({
            model: backend.model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            max_tokens: maxTokens,
            temperature: 0.2,
            stream: true,
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok || !res.body) return "";
        let full = "";
        await readLines(res.body, (line) => {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) return;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") return;
          try {
            const json = JSON.parse(payload) as { choices?: Array<{ delta?: { content?: string } }> };
            const piece = json.choices?.[0]?.delta?.content ?? "";
            if (piece) {
              full += piece;
              onDelta(piece);
            }
          } catch {
            // keep-alive comment or partial SSE — skipped safely
          }
        });
        return full.trim();
      }
    } catch {
      return "";
    }

    // anthropic / gemini / deterministic-offline: buffered answer, single delta
    const buffered = await this.completeText(systemPrompt, userPrompt, maxTokens, opts);
    if (buffered) onDelta(buffered);
    return buffered;
  }

  // =========================================================================
  // 3. v2.2 BACKEND PROBE (real connectivity test for the Settings dialog)
  // =========================================================================
  async probeBackend(backend?: LlmBackend): Promise<{
    provider: string;
    ok: boolean;
    detail: string;
    latency_ms: number;
  }> {
    const target = backend ?? (await this.detectActiveBackend());
    const cfg = await this.runtimeConfig();
    const started = Date.now();
    const finish = (ok: boolean, detail: string) => ({
      provider: target.provider,
      ok,
      detail,
      latency_ms: Date.now() - started,
    });

    try {
      if (target.provider === "deterministic-offline") {
        return finish(true, "Deterministic offline synthesizer is always available (no network).");
      }
      if (target.provider === "ollama") {
        const res = await fetch(`${cfg.ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(4_000) });
        if (!res.ok) return finish(false, `Ollama responded HTTP ${res.status}`);
        const body = (await res.json()) as { models?: Array<{ name?: string }> };
        const models = (body.models ?? []).map((m) => m.name ?? "").filter(Boolean);
        return finish(true, models.length ? `Ollama alive — models: ${models.slice(0, 5).join(", ")}` : "Ollama alive — no models pulled yet");
      }
      if (target.provider === "openai") {
        if (!cfg.openaiKey) return finish(false, "No OpenAI API key configured");
        const res = await fetch(`${cfg.openaiBase}/models`, {
          headers: { Authorization: `Bearer ${cfg.openaiKey}` },
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) return finish(false, `OpenAI HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
        const body = (await res.json()) as { data?: Array<{ id?: string }> };
        const ids = (body.data ?? []).map((m) => m.id ?? "").filter(Boolean);
        return finish(true, `Key valid — ${ids.length} models visible (e.g. ${ids.slice(0, 3).join(", ")})`);
      }
      if (target.provider === "anthropic") {
        if (!cfg.anthropicKey) return finish(false, "No Anthropic API key configured");
        const res = await fetch(`${cfg.anthropicBase}/v1/models`, {
          headers: { "x-api-key": cfg.anthropicKey, "anthropic-version": "2023-06-01" },
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) return finish(false, `Anthropic HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
        const body = (await res.json()) as { data?: Array<{ id?: string }> };
        const ids = (body.data ?? []).map((m) => m.id ?? "").filter(Boolean);
        return finish(true, `Key valid — models: ${ids.slice(0, 4).join(", ") || "listed"}`);
      }
      if (target.provider === "gemini") {
        if (!cfg.geminiKey) return finish(false, "No Gemini API key configured");
        const res = await fetch(`${cfg.geminiBase}/v1beta/models?key=${encodeURIComponent(cfg.geminiKey)}`, {
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) return finish(false, `Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
        const body = (await res.json()) as { models?: Array<{ name?: string }> };
        const names = (body.models ?? []).map((m) => m.name ?? "").filter(Boolean);
        return finish(true, `Key valid — ${names.length} models visible (e.g. ${names.slice(0, 3).join(", ")})`);
      }
      return finish(false, `Unknown provider: ${target.provider}`);
    } catch (e) {
      return finish(false, e instanceof Error ? e.message : "probe failed");
    }
  }

  // =========================================================================
  // 4. RAW UNCLEAR PROMPT -> STRUCTURED ANTI-DRIFT SPEC (rewrite_raw_prompt)
  // =========================================================================
  async rewriteRawPrompt(
    rawUserPrompt: string,
    contextPayload: ContextPayload
  ): Promise<PromptRewriteResult> {
    const project_name = contextPayload.project_name || "Active Project";
    const rollingMemory = contextPayload.tier_1_rolling_memory || "No summary yet.";
    const decisions = contextPayload.tier_2_decision_graph ?? [];
    const evidence = contextPayload.tier_3_recent_and_relevant_evidence ?? [];

    // Tier-2 actionable constraints (anti-drift guardrails)
    const decisionBullets: string[] = [];
    for (const d of decisions.slice(0, 5)) {
      decisionBullets.push(
        `- **MUST RESPECT [${d.title.slice(0, 50)}]**: ${d.decision.slice(0, 70)} (Rationale: ${d.reasoning.slice(0, 50)})`
      );
    }
    if (decisionBullets.length === 0) {
      decisionBullets.push("- Keep implementation dependency-light and modular.");
    }

    // Tier-3 grounded evidence + past fixes
    const evidenceBullets: string[] = [];
    const knownFixes: string[] = [];
    for (const ev of evidence.slice(0, 4)) {
      evidenceBullets.push(
        `- \`[${(ev.type || "note").toUpperCase()}]\` **${ev.title.slice(0, 60)}**: ${(ev.summary || "").slice(0, 140)}`
      );
    }
    if (evidenceBullets.length === 0) {
      evidenceBullets.push("- No prior conflicting captures found in vault.");
    }
    // Known fixes come from the evidence summaries produced by the analyzer ("Suggested Fix: `cmd`")
    for (const ev of evidence.slice(0, 4)) {
      const m = ev.summary?.match(/`([^`]+)`/);
      if (m && /fix|install|kill-port|add /i.test(m[1])) knownFixes.push(`\`${m[1]}\` (for ${ev.title})`);
    }

    // Optional live LLM polish of the raw goal (short timeout: capture-path UX)
    let refinedObjective = await this.completeText(
      "Rewrite the user's raw software request into 2-3 crystal-clear technical bullet points. " +
        "Do not invent libraries that violate the project context.",
      `Project: ${project_name}\nContext: ${rollingMemory}\nRaw Request: ${rawUserPrompt}`,
      160,
      { timeoutMs: 6_000 }
    );

    if (!refinedObjective) {
      // Deterministic structuring of the raw prompt
      const sentences = rawUserPrompt
        .split(/[.;\n]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      if (sentences.length === 0) {
        sentences.push("Implement the requested feature cleanly while preserving existing project architecture.");
      }
      refinedObjective = sentences.map((s, i) => `${i + 1}. ${s}`).join("\n");
    }

    const structuredMarkdown =
      `# 🎯 STRUCTURED AI EXECUTION SPEC — [${project_name}]\n\n` +
      `## 1. Clarified Engineering Objective\n` +
      `*(Rewritten from raw input: "${rawUserPrompt.trim()}")*\n` +
      `${refinedObjective}\n\n` +
      `## 2. TIER 1: Compressed Project State\n` +
      `${rollingMemory}\n\n` +
      `## 3. TIER 2: Non-Negotiable Architectural Constraints (DO NOT VIOLATE — Anti-Drift Guardrails)\n` +
      decisionBullets.join("\n") +
      `\n\n## 4. TIER 3: Grounded Vault Evidence & Past Fixes\n` +
      evidenceBullets.join("\n") +
      `\n\n## 5. Strict Output & Verification Contract\n` +
      `- **No Context Drift:** Do NOT introduce new frameworks or databases that contradict Section 3.\n` +
      `- **Token Efficiency:** Output only the modified/new files with complete, runnable code (no placeholders).\n` +
      `- **Self-Verification Step:** Conclude with a 1-command terminal verification test so I know immediately how to test it.\n`;

    // Estimate token count (~4 chars per token)
    const estimatedTokens = Math.max(1, Math.floor(structuredMarkdown.length / 4));

    return {
      project_name,
      raw_prompt: rawUserPrompt,
      refined_objective: refinedObjective,
      known_fixes_referenced: knownFixes,
      estimated_tokens: estimatedTokens,
      token_budget_status:
        estimatedTokens < TOKEN_BUDGET ? "OPTIMAL (< 2,500 tokens)" : "WARNING (over 2,500 tokens)",
      backend_used: await this.detectActiveBackend(),
      structured_prompt_markdown: structuredMarkdown,
    };
  }
}

/** Shared singleton (pipeline + API routes import this). */
export const llmBridge = new HybridLLMBridge();

/** Re-export so the settings API can invalidate the singleton without import churn. */
export function invalidateLlmRuntimeConfig(): void {
  llmBridge.invalidateRuntimeConfig();
}
