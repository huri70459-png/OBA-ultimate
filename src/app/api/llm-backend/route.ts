// Project Brain OS — v2.2 Runtime LLM Backend Configuration API
//
// GET  /api/llm-backend  -> effective backend + masked config echo + dedup window
// POST /api/llm-backend  -> validate + save settings, invalidate bridge memos, then
//                           probe connectivity ("wire a live backend" with immediate
//                           feedback in the Settings dialog).
//
// Secret handling: request keys with value "" are ignored (leave-blank-to-keep), the
// sentinel "__clear__" removes a stored value, and "__generate__" mints a fresh 32-hex
// agent token. Responses only ever contain masked previews — never plaintext keys.

import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import {
  CLEAR_SENTINEL,
  maskSecret,
  readSettings,
  writeSettings,
  type SettingKey,
} from "@/lib/brain/settings";
import { getDedupWindowHours } from "@/lib/brain/dedup";
import { llmBridge, PROVIDERS, type ProviderChoice } from "@/lib/brain/llm-bridge";

export const dynamic = "force-dynamic";

const SECRET_KEYS: SettingKey[] = ["openai_api_key", "anthropic_api_key", "gemini_api_key", "agent_ingest_token"];
const URL_KEYS: SettingKey[] = ["ollama_url", "openai_base_url", "anthropic_base_url", "gemini_base_url"];

function secretShape(storedValue: string, envValue: string) {
  const effective = storedValue || envValue;
  return {
    configured: Boolean(effective),
    masked: maskSecret(effective),
    source: storedValue ? "settings" : envValue ? "env" : "none",
  };
}

function envKey(k: SettingKey): string {
  switch (k) {
    case "openai_api_key": return process.env.OPENAI_API_KEY || "";
    case "anthropic_api_key": return process.env.ANTHROPIC_API_KEY || "";
    case "gemini_api_key": return process.env.GEMINI_API_KEY || "";
    case "agent_ingest_token": return process.env.BRAIN_INGEST_TOKEN || "";
    default: return "";
  }
}

export async function GET() {
  try {
    await ensureSeedDataOnce();
    const stored = await readSettings();
    const backend = await llmBridge.detectActiveBackend();
    return NextResponse.json({
      effective_backend: backend,
      config: {
        provider: stored.llm_provider || "auto",
        ollama_url: stored.ollama_url || process.env.OLLAMA_URL || "http://127.0.0.1:11434",
        ollama_model: stored.ollama_model || process.env.OLLAMA_MODEL || "llama3.2",
        openai_api_key: secretShape(stored.openai_api_key || "", envKey("openai_api_key")),
        anthropic_api_key: secretShape(stored.anthropic_api_key || "", envKey("anthropic_api_key")),
        gemini_api_key: secretShape(stored.gemini_api_key || "", envKey("gemini_api_key")),
        openai_base_url: stored.openai_base_url || process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
        anthropic_base_url: stored.anthropic_base_url || process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com",
        gemini_base_url: stored.gemini_base_url || process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com",
        llm_timeout_seconds: stored.llm_timeout_seconds || "",
        dedup_window_hours: await getDedupWindowHours(),
        agent_ingest_token: secretShape(stored.agent_ingest_token || "", envKey("agent_ingest_token")),
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to read LLM backend config" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSeedDataOnce();
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // ---- validate ----
    const errors: string[] = [];
    const patch: Partial<Record<SettingKey, string>> = {};
    let generatedToken = "";

    if (body.provider !== undefined) {
      const p = String(body.provider);
      if (!PROVIDERS.includes(p as ProviderChoice)) errors.push(`provider must be one of: ${PROVIDERS.join(", ")}`);
      else patch.llm_provider = p;
    }
    if (body.dedup_window_hours !== undefined) {
      const n = Number(body.dedup_window_hours);
      if (!Number.isInteger(n) || n < 1 || n > 8760) errors.push("dedup_window_hours must be an integer between 1 and 8760");
      else patch.dedup_window_hours = String(n);
    }
    if (body.llm_timeout_seconds !== undefined) {
      const raw = String(body.llm_timeout_seconds).trim();
      if (raw === "") patch.llm_timeout_seconds = CLEAR_SENTINEL;
      else {
        const n = Number(raw);
        if (!Number.isInteger(n) || n < 3 || n > 120) errors.push("llm_timeout_seconds must be an integer between 3 and 120");
        else patch.llm_timeout_seconds = String(n);
      }
    }
    for (const key of URL_KEYS) {
      if (body[key] === undefined) continue;
      const v = String(body[key]).trim();
      if (v === "") continue; // leave unchanged
      if (v === CLEAR_SENTINEL) { patch[key] = CLEAR_SENTINEL; continue; }
      if (!/^https?:\/\//i.test(v)) errors.push(`${key} must start with http:// or https://`);
      else patch[key] = v;
    }
    for (const key of SECRET_KEYS) {
      if (body[key] === undefined) continue;
      const v = String(body[key]);
      if (v === "") continue; // leave-blank-to-keep
      if (v === CLEAR_SENTINEL) { patch[key] = CLEAR_SENTINEL; continue; }
      if (key === "agent_ingest_token" && v === "__generate__") {
        generatedToken = randomBytes(16).toString("hex");
        patch[key] = generatedToken;
        continue;
      }
      if (key !== "agent_ingest_token" && v.trim().length < 8) {
        errors.push(`${key} looks too short to be a valid key`);
        continue;
      }
      patch[key] = v.trim();
    }

    if (errors.length) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
    }

    // ---- save + invalidate ----
    const savedKeys = await writeSettings(patch);
    llmBridge.invalidateRuntimeConfig();

    // ---- probe (unless explicitly disabled) ----
    let probe: Awaited<ReturnType<typeof llmBridge.probeBackend>> | null = null;
    if (body.probe === undefined || body.probe === true) {
      probe = await llmBridge.probeBackend();
    }
    const effective = await llmBridge.detectActiveBackend();

    return NextResponse.json({
      saved: savedKeys,
      probe,
      effective_backend: effective,
      // Shown ONCE to the Settings dialog so the user can copy it into desktop_agent.py
      generated_token: generatedToken,
      dedup_window_hours:
        patch.dedup_window_hours !== undefined ? Number(patch.dedup_window_hours) : await getDedupWindowHours(),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save LLM backend config" },
      { status: 500 }
    );
  }
}
