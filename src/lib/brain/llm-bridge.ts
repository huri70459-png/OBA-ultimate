// Project Brain OS — Hybrid Local/Cloud LLM Router & Anti-Drift Prompt Pre-Structurer
// Faithful port of llm_bridge.py (Option 1 upgrade). Zero external dependencies:
// uses global fetch (Node 18+) and never throws — every failure degrades to the
// built-in Deterministic Offline Synthesizer so the app never blocks on API keys.
//
//  1. detectActiveBackend()  — Ollama (http://127.0.0.1:11434) -> OPENAI_API_KEY ->
//     ANTHROPIC_API_KEY -> GEMINI_API_KEY -> deterministic-offline.
//  2. completeText()         — live completion via Ollama / OpenAI; "" on any failure
//     so callers fall back to deterministic synthesis seamlessly.
//  3. rewriteRawPrompt()     — rewrites a raw, unclear thought into a strict 5-section
//     engineering spec anchored to Tier-1 Rolling Memory, Tier-2 Decision Graph, and
//     Tier-3 Vault Evidence, with a ~2,500 token budget estimator.

import type { ContextPayload, LlmBackend, PromptRewriteResult } from "./types";

export const TOKEN_BUDGET = 2500;

interface BridgeOptions {
  preferLocalOllama?: boolean;
  ollamaUrl?: string;
  ollamaModel?: string;
  timeoutSeconds?: number;
}

export class HybridLLMBridge {
  private preferLocalOllama: boolean;
  private ollamaUrl: string;
  private ollamaModel: string;
  private timeoutMs: number;
  private openaiKey: string;
  private anthropicKey: string;
  private geminiKey: string;

  // Small memo so capture-time enrichment does not re-probe Ollama on every call
  private backendMemo: { backend: LlmBackend; expiresAt: number } | null = null;

  constructor(opts: BridgeOptions = {}) {
    this.preferLocalOllama = opts.preferLocalOllama ?? true;
    this.ollamaUrl = (opts.ollamaUrl ?? "http://127.0.0.1:11434").replace(/\/+$/, "");
    this.ollamaModel = process.env.OLLAMA_MODEL || opts.ollamaModel || "llama3.2";
    this.timeoutMs = (opts.timeoutSeconds ?? 8) * 1000;
    this.openaiKey = process.env.OPENAI_API_KEY || "";
    this.anthropicKey = process.env.ANTHROPIC_API_KEY || "";
    this.geminiKey = process.env.GEMINI_API_KEY || "";
  }

  // =========================================================================
  // 1. BACKEND DETECTION (never throws)
  // =========================================================================
  async detectActiveBackend(): Promise<LlmBackend> {
    const now = Date.now();
    if (this.backendMemo && this.backendMemo.expiresAt > now) return this.backendMemo.backend;

    let backend: LlmBackend;
    if (this.preferLocalOllama && (await this.isOllamaAlive())) {
      backend = { provider: "ollama", model: this.ollamaModel, mode: "local_llm" };
    } else if (this.openaiKey) {
      backend = { provider: "openai", model: "gpt-4o-mini", mode: "cloud_llm" };
    } else if (this.anthropicKey) {
      backend = { provider: "anthropic", model: "claude-3-5-sonnet-latest", mode: "cloud_llm" };
    } else if (this.geminiKey) {
      backend = { provider: "gemini", model: "gemini-2.5-flash", mode: "cloud_llm" };
    } else {
      backend = { provider: "deterministic-offline", model: "rule-synthesizer-v2", mode: "offline_fallback" };
    }

    this.backendMemo = { backend, expiresAt: now + 30_000 }; // 30s probe memo
    return backend;
  }

  private async isOllamaAlive(): Promise<boolean> {
    try {
      const res = await fetch(`${this.ollamaUrl}/api/tags`, {
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
  async completeText(systemPrompt: string, userPrompt: string, maxTokens = 600): Promise<string> {
    const backend = await this.detectActiveBackend();
    try {
      if (backend.provider === "ollama") {
        const res = await fetch(`${this.ollamaUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: this.ollamaModel,
            prompt: `System: ${systemPrompt}\n\nUser: ${userPrompt}`,
            stream: false,
          }),
          signal: AbortSignal.timeout(this.timeoutMs),
        });
        if (!res.ok) return "";
        const body = (await res.json()) as { response?: string };
        return (body.response ?? "").trim();
      }

      if (backend.provider === "openai") {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.openaiKey}`,
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
          signal: AbortSignal.timeout(this.timeoutMs),
        });
        if (!res.ok) return "";
        const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
        return (body.choices?.[0]?.message?.content ?? "").trim();
      }
    } catch {
      // Fall through cleanly to offline synthesis
      return "";
    }
    // anthropic/gemini keys are detected but completion parity with llm_bridge.py v2
    // routes them to deterministic synthesis until their providers are wired.
    return "";
  }

  // =========================================================================
  // 3. RAW UNCLEAR PROMPT -> STRUCTURED ANTI-DRIFT SPEC (rewrite_raw_prompt)
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

    // Optional live LLM polish of the raw goal
    let refinedObjective = await this.completeText(
      "Rewrite the user's raw software request into 2-3 crystal-clear technical bullet points. " +
        "Do not invent libraries that violate the project context.",
      `Project: ${project_name}\nContext: ${rollingMemory}\nRaw Request: ${rawUserPrompt}`,
      160
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

/** Shared singleton (pipelne + API routes import this). */
export const llmBridge = new HybridLLMBridge();
