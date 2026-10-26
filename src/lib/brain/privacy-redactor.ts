// Project Brain OS — v2.5 Privacy & Secret Redaction Layer (ingest-side)
//
// Server-side defense-in-depth companion to the desktop agent's own guardrails:
//   1. Window/App Exclusion — captures originating from password managers,
//      private browsing, or keychain windows are BLOCKED outright (422).
//   2. Secret Scrubbing — OpenAI / Anthropic / Google / GitHub credentials,
//      Bearer tokens, PEM private keys, and *.env secret assignments are
//      replaced with [REDACTED_*] markers BEFORE the content is persisted to
//      SQLite, written to the vault on disk, or embedded into the vector index.
//   3. Deterministic content hash (FNV-1a style, 64-bit hex) for idempotency
//      (CaptureJob key) and optimistic concurrency (PATCH expected_hash).
//
// Ported from the "GitHub Repo Review Request" bundle's privacy-redactor module,
// adapted to the shipped engine: extra window patterns merged from the desktop
// agent, hash exposed standalone for the two-way editing conflict check.

export interface SanitizedCaptureInput {
  allowed: boolean;
  blockedReason?: string;
  sanitizedContent: string;
  redactionCount: number;
  contentHash: string;
}

const EXCLUDED_WINDOW_REGEXES: RegExp[] = [
  /1password/i,
  /bitwarden/i,
  /keepass/i,
  /lastpass/i,
  /incognito/i,
  /inprivate/i,
  /private browsing/i,
  /keychain/i,
  /\.env/i,
];

const SECRET_RULES: Array<{ name: string; pattern: RegExp; replacement: string }> = [
  {
    name: "anthropic_key",
    // must run BEFORE openai_key — "sk-ant-..." also matches the sk- rule
    pattern: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g,
    replacement: "[REDACTED_ANTHROPIC_KEY]",
  },
  {
    name: "openai_key",
    pattern: /\bsk-(?!ant-)[A-Za-z0-9_-]{20,}\b/g,
    replacement: "[REDACTED_OPENAI_KEY]",
  },
  {
    name: "google_api_key",
    pattern: /\bAIza[0-9A-Za-z_-]{35}\b/g,
    replacement: "[REDACTED_GOOGLE_KEY]",
  },
  {
    name: "github_token",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g,
    replacement: "[REDACTED_GITHUB_TOKEN]",
  },
  {
    name: "bearer_token",
    pattern: /(Bearer\s+)[A-Za-z0-9_\-.=]{16,}/gi,
    replacement: "$1[REDACTED_BEARER_TOKEN]",
  },
  {
    name: "private_key_block",
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,
    replacement: "[REDACTED_PRIVATE_KEY]",
  },
  {
    name: "env_secret_assignment",
    pattern: /^([A-Z0-9_]*(?:SECRET|PASSWORD|TOKEN|API_KEY|PRIVATE_KEY)[A-Z0-9_]*\s*=\s*)(.+)$/gm,
    replacement: "$1[REDACTED_ENV_VALUE]",
  },
];

/** Hard cap against memory exhaustion on hostile/oversized payloads. */
const MAX_CONTENT_CHARS = 150_000;

/**
 * Full ingest gate: window exclusion -> secret scrubbing -> content hash.
 * Call at the top of every capture entrypoint (UI, agent, MCP).
 */
export function sanitizeAndValidateCapture(params: {
  rawContent: string;
  windowTitle?: string;
  sourceApp?: string;
}): SanitizedCaptureInput {
  const windowTitle = params.windowTitle || "";
  for (const excluded of EXCLUDED_WINDOW_REGEXES) {
    if (excluded.test(windowTitle)) {
      return {
        allowed: false,
        blockedReason: `Capture blocked by Privacy Guard (excluded window: ${windowTitle})`,
        sanitizedContent: "",
        redactionCount: 0,
        contentHash: "",
      };
    }
  }

  const { text, count } = redactSecretsInText((params.rawContent || "").slice(0, MAX_CONTENT_CHARS));

  return {
    allowed: true,
    sanitizedContent: text,
    redactionCount: count,
    contentHash: contentHashOf(text),
  };
}

/** Scrub-only path (no window blocking) — used when EDITING existing content. */
export function redactSecretsInText(text: string): { text: string; count: number } {
  if (!text) return { text: "", count: 0 };
  let out = text;
  let total = 0;
  for (const rule of SECRET_RULES) {
    const before = out;
    out = out.replace(rule.pattern, rule.replacement);
    // count via the match length of this rule against the pre-rule text
    const matches = before.match(rule.pattern);
    if (matches) total += matches.length;
  }
  return { text: out, count: total };
}

/** Deterministic FNV-1a-style 64-bit hex hash for idempotency & conflict detection. */
export function contentHashOf(text: string): string {
  const src = text || "";
  let h1 = 0xdeadbeef ^ src.length;
  let h2 = 0x41c6ce57 ^ src.length;
  for (let i = 0; i < src.length; i++) {
    const ch = src.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
}
