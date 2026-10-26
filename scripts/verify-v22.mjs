/**
 * Project Brain OS — v2.2 Verification (Runtime LLM Config + Desktop Agent Parity + Tunable Dedup)
 *
 *   A. /api/health reports the v2.2 engine + runtime config echo
 *   B. GET /api/llm-backend: masked config shape (secrets never plaintext)
 *   C. POST /api/llm-backend validation (provider whitelist, window bounds, URL scheme)
 *   D. Tunable dedup window: window=2h -> 3h-old capture NOT folded; window=36h -> folded
 *      (direct Prisma backdate, mirrors verify-v21 section D)
 *   E. Honest offline mode under forced deterministic-offline (llm_used=false, garbage
 *      query admits no evidence)
 *   F. LIVE LLM synthesis via mock OpenAI server (base-URL override): /api/ask upgrades
 *      from excerpts to a generated answer (llm_used=true, marker present) + probe OK
 *   G. LIVE LLM synthesis via mock Anthropic server (v2.2 Messages API path wired)
 *   H. Desktop-agent parity: handshake, wire format (toast_notification), duplicate
 *      fold, token auth (401 without / 200 with Bearer + X-Brain-Token)
 *   I. /api/self-test: all 10 scenarios still PASS after config resets
 *   J. Final state: provider=auto, dedup window=36, no tokens left behind
 */
import http from "http";
import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL = process.env.DATABASE_URL || "file:/home/z/my-project/db/custom.db";
const prisma = new PrismaClient({ log: [] });

const BASE = "http://localhost:3000";
const results = [];
let failures = 0;

function check(name, cond, detail) {
  const status = cond ? "PASS" : "FAIL";
  if (!cond) failures++;
  results.push({ name, status, detail });
  console.log(`[${status}] ${name} — ${detail}`);
}

async function jfetch(pathname, opts = {}) {
  const res = await fetch(BASE + pathname, opts);
  let data = null;
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}
const post = (pathname, body, headers = {}) =>
  jfetch(pathname, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

/** Minimal stand-in cloud provider: handles the exact routes llm-bridge.ts calls. */
function startMockLlm(kind) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        res.setHeader("Content-Type", "application/json");
        if (kind === "openai") {
          if (req.method === "GET" && req.url.includes("/models")) {
            res.end(JSON.stringify({ data: [{ id: "gpt-4o-mini" }, { id: "gpt-4o" }] }));
            return;
          }
          res.end(JSON.stringify({
            choices: [{ message: { content: "MOCK-OPENAI-SYNTHESIS [1] The vault evidence directly answers the question; live synthesis path works." } }],
          }));
        } else {
          if (req.method === "GET" && req.url.includes("/models")) {
            res.end(JSON.stringify({ data: [{ id: "claude-3-5-sonnet-mock" }] }));
            return;
          }
          res.end(JSON.stringify({
            content: [{ type: "text", text: "MOCK-ANTHROPIC-SYNTHESIS [1] Anthropic Messages API path is wired and answers from evidence." }],
          }));
        }
      });
    });
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function configure(patch) {
  return post("/api/llm-backend", { probe: false, ...patch });
}

(async () => {
  const nonce = Date.now();

  // ---- A. Health v2.2+ (2.3 enterprise / 2.4 ops ship on top; config echo is v2.2) ----
  const health = await jfetch("/api/health");
  check(
    "A1 v2.2 engine online with config echo",
    health.status === 200 &&
      Number(health.data.version) >= 2.2 &&
      Number.isFinite(health.data.config?.dedup_window_hours) &&
      typeof health.data.config?.agent_ingest_protected === "boolean",
    `engine="${health.data.engine}" window=${health.data.config?.dedup_window_hours}`
  );

  // ---- B. Masked config shape ----
  const cfg0 = await jfetch("/api/llm-backend");
  const c0 = cfg0.data.config ?? {};
  check(
    "B1 config echo: masked secrets + base URLs + effective backend",
    cfg0.status === 200 &&
      typeof c0.openai_api_key?.configured === "boolean" &&
      (c0.openai_api_key?.masked ?? "").length <= 12 &&
      /^https?:/.test(c0.openai_base_url ?? "") &&
      /^https?:/.test(c0.anthropic_base_url ?? "") &&
      /^https?:/.test(c0.gemini_base_url ?? "") &&
      Boolean(cfg0.data.effective_backend?.provider),
    `keys=${c0.openai_api_key?.source}/${c0.anthropic_api_key?.source}/${c0.gemini_api_key?.source} backend=${cfg0.data.effective_backend?.provider}`
  );

  // ---- C. Validation ----
  const bad1 = await post("/api/llm-backend", { provider: "skynet" });
  const bad2 = await post("/api/llm-backend", { dedup_window_hours: 9999 });
  const bad3 = await post("/api/llm-backend", { openai_base_url: "notaurl" });
  check(
    "C1 settings validation rejects bad provider/window/url",
    bad1.status === 400 && bad2.status === 400 && bad3.status === 400,
    `400x3 (provider=${bad1.status}, window=${bad2.status}, url=${bad3.status})`
  );

  // ---- D. Tunable dedup window ----
  const winContent = `Error: Cannot find module 'window-probe-${nonce}'\n  at tunable.mjs:7:3`;
  const winPayload = { raw_content: winContent, item_type: "terminal", window_title: "Terminal - three-musketeers", source_app: "V22VerifySuite" };
  await configure({ dedup_window_hours: 2 });
  const winCap = await post("/api/capture", winPayload);
  const winId = winCap.data.item?.id;
  await prisma.item.update({ where: { id: winId }, data: { capturedAt: new Date(Date.now() - 3 * 3600 * 1000) } }); // 3h old > 2h window
  const winRepeat = await post("/api/capture", winPayload);
  check(
    "D1 window=2h: 3h-old capture is NOT folded (new item created)",
    winRepeat.status === 200 && winRepeat.data.status === "captured_zero_save" && winRepeat.data.item?.id !== winId,
    `repeat status=${winRepeat.data.status} new_item=${winRepeat.data.item?.id !== winId}`
  );
  await configure({ dedup_window_hours: 36 });
  const winFold = await post("/api/capture", winPayload);
  check(
    "D2 window=36h: same capture now folds (occurrence_count grows)",
    winFold.status === 200 && winFold.data.status === "duplicate_merged" && Number(winFold.data.item?.metadata?.occurrence_count ?? 0) >= 2,
    `status=${winFold.data.status} count=${winFold.data.item?.metadata?.occurrence_count}`
  );

  // ---- E. Honest offline mode (forced offline provider) ----
  await configure({ provider: "deterministic-offline" });
  const evContent = `v22-evidence-${nonce}: deployment fix — pnpm add dotenv then redeploy gateway.mjs on Render`;
  await post("/api/capture", { raw_content: evContent, item_type: "note", window_title: "deploy notes", source_app: "V22VerifySuite" });
  const offAsk = await post("/api/ask", { query: `v22-evidence-${nonce} dotenv gateway deployment fix` });
  check(
    "E1 forced-offline ask returns excerpts honestly (llm_used=false)",
    offAsk.status === 200 && offAsk.data.grounded === true && offAsk.data.llm_used === false && (offAsk.data.sources || []).length >= 1,
    `sources=${offAsk.data.sources?.length} llm_used=${offAsk.data.llm_used}`
  );
  const offMiss = await post("/api/ask", { query: `zzq7x-${nonce}-qxn88k` });
  check(
    "E2 garbage query still admits no evidence (never fabricates)",
    offMiss.status === 200 && offMiss.data.grounded === false && (offMiss.data.sources || []).length === 0,
    (offMiss.data.answer || "").slice(0, 80)
  );

  // ---- F. Mock OpenAI live synthesis ----
  const openaiMock = await startMockLlm("openai");
  const openaiBase = `http://127.0.0.1:${openaiMock.port}/v1`;
  const openaiCfg = await configure({ provider: "openai", openai_api_key: "v22-mock-openai-key", openai_base_url: openaiBase, probe: true });
  check(
    "F1 probe against mock OpenAI gateway OK",
    openaiCfg.status === 200 && openaiCfg.data.probe?.ok === true && /models/i.test(openaiCfg.data.probe?.detail ?? ""),
    `probe=${openaiCfg.data.probe?.ok} detail="${(openaiCfg.data.probe?.detail ?? "").slice(0, 80)}"`
  );
  const openaiAsk = await post("/api/ask", { query: `v22-evidence-${nonce} dotenv gateway deployment fix` });
  check(
    "F2 grounded ask upgraded to LIVE synthesis (llm_used=true, mock answer, sources cited)",
    openaiAsk.status === 200 &&
      openaiAsk.data.llm_used === true &&
      /MOCK-OPENAI-SYNTHESIS/.test(openaiAsk.data.answer ?? "") &&
      (openaiAsk.data.sources || []).length >= 1,
    `answer="${(openaiAsk.data.answer ?? "").slice(0, 60)}…" sources=${openaiAsk.data.sources?.length}`
  );

  // ---- G. Mock Anthropic live synthesis (v2.2 Messages API path) ----
  const anthropicMock = await startMockLlm("anthropic");
  const anthropicBase = `http://127.0.0.1:${anthropicMock.port}`;
  const anthropicCfg = await configure({ provider: "anthropic", anthropic_api_key: "v22-mock-ant-key", anthropic_base_url: anthropicBase, probe: true });
  check(
    "G1 probe against mock Anthropic gateway OK",
    anthropicCfg.status === 200 && anthropicCfg.data.probe?.ok === true,
    `probe=${anthropicCfg.data.probe?.ok} detail="${(anthropicCfg.data.probe?.detail ?? "").slice(0, 80)}"`
  );
  const anthropicAsk = await post("/api/ask", { query: `v22-evidence-${nonce} dotenv gateway deployment fix` });
  check(
    "G2 Anthropic completion path wired (llm_used=true via Messages API)",
    anthropicAsk.status === 200 && anthropicAsk.data.llm_used === true && /MOCK-ANTHROPIC-SYNTHESIS/.test(anthropicAsk.data.answer ?? ""),
    `answer="${(anthropicAsk.data.answer ?? "").slice(0, 60)}…"`
  );
  openaiMock.server.close();
  anthropicMock.server.close();

  // Cleanup: clear mock keys + base URLs so later sections run on a clean slate
  await configure({
    openai_api_key: "__clear__",
    anthropic_api_key: "__clear__",
    openai_base_url: "__clear__",
    anthropic_base_url: "__clear__",
    provider: "auto",
  });

  // ---- H. Desktop agent parity ----
  const handshake0 = await jfetch("/api/agent/capture");
  check(
    "H1 agent handshake: open trusted mode (token_required=false)",
    handshake0.status === 200 && handshake0.data.token_required === false && Boolean(handshake0.data.payload?.raw_content),
    `token_required=${handshake0.data.token_required}`
  );
  const agentContent = `Decision: use SQLite sidecar for vectors in agent-probe-${nonce}\nReason: keeps Brain OS dependency-light`;
  const agentPayload = { raw_content: agentContent, item_type: "note", window_title: "architecture.md - Project Brain OS", source_app: "DesktopAgent" };
  const agentCap = await post("/api/agent/capture", agentPayload);
  check(
    "H2 agent capture speaks brain_api.py wire format",
    agentCap.status === 200 && agentCap.data.status === "captured_zero_save" && typeof agentCap.data.toast_notification === "string" && Boolean(agentCap.data.item_id) && "decision_logged" in agentCap.data,
    `toast="${(agentCap.data.toast_notification ?? "").slice(0, 60)}…" decision_logged=${agentCap.data.decision_logged}`
  );
  const agentRepeat = await post("/api/agent/capture", agentPayload);
  check(
    "H3 agent duplicate folds with occurrence count (dedup through agent wire)",
    agentRepeat.data.status === "duplicate_merged" && agentRepeat.data.duplicate?.occurrence_count === 2,
    `duplicate=${JSON.stringify(agentRepeat.data.duplicate)}`
  );

  // token auth
  await configure({ agent_ingest_token: "v22-agent-secret-token-123" });
  const handshake1 = await jfetch("/api/agent/capture");
  const noTok = await post("/api/agent/capture", agentPayload);
  const badTok = await post("/api/agent/capture", agentPayload, { Authorization: "Bearer wrong-token" });
  const okTok = await post("/api/agent/capture", agentPayload, { Authorization: "Bearer v22-agent-secret-token-123" });
  const altTok = await post("/api/agent/capture", agentPayload, { "X-Brain-Token": "v22-agent-secret-token-123" });
  check(
    "H4 token-protected mode: handshake flags, 401 without, Bearer + X-Brain-Token accepted",
    handshake1.data.token_required === true &&
      noTok.status === 401 &&
      badTok.status === 401 &&
      okTok.status === 200 &&
      altTok.status === 200,
    `handshake=${handshake1.data.token_required} no=${noTok.status} bad=${badTok.status} bearer=${okTok.status} xbrain=${altTok.status}`
  );
  await configure({ agent_ingest_token: "__clear__" });
  const afterClear = await post("/api/agent/capture", agentPayload);
  check(
    "H5 clearing token returns to trusted mode",
    afterClear.status === 200,
    `status=${afterClear.status}`
  );

  // ---- I. Self-test regression (10 scenarios) ----
  const st = await jfetch("/api/self-test");
  const checks = st.data?.checks ?? [];
  const allPass = st.status === 200 && st.data?.ok === true && st.data?.passedCount === 10 && checks.every((c) => c.status === "PASS");
  check(
    "I1 self-test 10/10 scenarios PASS after config churn",
    allPass,
    `${checks.filter((c) => c.status === "PASS").length}/10 ${checks.filter((c) => c.status !== "PASS").map((c) => `${c.name}:${c.status}`).join(",")}`
  );

  // ---- J. Final state clean ----
  const finalCfg = await jfetch("/api/llm-backend");
  const fc = finalCfg.data.config ?? {};
  check(
    "J1 final state: provider=auto, window=36, no tokens/keys left",
    fc.provider === "auto" &&
      fc.dedup_window_hours === 36 &&
      fc.openai_api_key?.configured === false &&
      fc.anthropic_api_key?.configured === false &&
      fc.gemini_api_key?.configured === false &&
      fc.agent_ingest_token?.configured === false,
    `provider=${fc.provider} window=${fc.dedup_window_hours} keys=${fc.openai_api_key?.configured}/${fc.anthropic_api_key?.configured}/${fc.gemini_api_key?.configured} token=${fc.agent_ingest_token?.configured}`
  );
  const finalHealth = await jfetch("/api/health");
  check(
    "J2 health: auto chain -> deterministic-offline (no keys configured)",
    finalHealth.data.llm_backend?.provider === "deterministic-offline" && finalHealth.data.config?.provider_setting === "auto",
    `backend=${finalHealth.data.llm_backend?.provider} setting=${finalHealth.data.config?.provider_setting}`
  );

  console.log(`\n=== v2.2 verify: ${results.length - failures}/${results.length} PASS, ${failures} FAIL ===`);
  await prisma.$disconnect();
  process.exit(failures ? 1 : 0);
})().catch(async (e) => {
  console.error("verify-v22 crashed:", e);
  await prisma.$disconnect();
  process.exit(1);
});
