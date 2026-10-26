#!/usr/bin/env node
// verify-enterprise.mjs — v2.3 enterprise-phase verification suite
//
// Covers: bootstrap-open semantics, i18n dictionary parity, credential auth
// (setup/session/login/refresh/logout), API enforcement + RBAC (owner/editor/
// viewer), agent-token path under enforcement, NDJSON grounded chat stream +
// persistence + clear, bento dashboard summary, and the client error log.
//
// Self-cleaning: every account, auth setting, and chat message created here is
// deleted at the end, restoring open mode for the other regression suites.
//
// Usage: node scripts/verify-enterprise.mjs [baseUrl]

const BASE = process.argv[2] || "http://localhost:3000";
let pass = 0;
let fail = 0;
const results = [];

function check(name, ok, detail = "") {
  if (ok) {
    pass++;
    results.push(`PASS  ${name}${detail ? ` — ${detail}` : ""}`);
  } else {
    fail++;
    results.push(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function nonce() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function req(method, path, { body, cookie } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  const setCookies =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : res.headers.get("set-cookie")
        ? [res.headers.get("set-cookie")]
        : [];
  return { status: res.status, json, setCookies };
}

function sessionCookieFrom(setCookies) {
  for (const c of setCookies) {
    const m = c.match(/brain_session=([^;]+)/);
    if (m) return `brain_session=${m[1]}`;
  }
  return null;
}

// ---------- A. bootstrap open mode ----------
{
  const s = await req("GET", "/api/auth/session");
  check("session: bootstrap mode is open", s.status === 200 && s.json.mode === "open");

  const p = await req("GET", "/api/projects");
  check("open mode: projects readable without auth", p.status === 200 && Array.isArray(p.json.projects));

  const cap = await req("POST", "/api/capture", {
    body: { raw_content: `verify-enterprise open-mode capture ${nonce()}`, item_type: "note" },
  });
  check("open mode: capture works without auth", cap.status === 200 && Boolean(cap.json.item));
}

// ---------- B. i18n dictionary parity ----------
{
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(new URL("../src/lib/i18n/dictionaries.ts", import.meta.url), "utf8");
  const zhIdx = src.indexOf("const zh:");
  const enBlock = zhIdx > 0 ? src.slice(0, zhIdx) : src;
  const zhBlock = zhIdx > 0 ? src.slice(zhIdx) : "";
  const keysIn = (block) => {
    const keys = new Set();
    for (const m of block.matchAll(/"([a-z]+\.[a-z0-9_.]+)":/g)) keys.add(m[1]);
    return keys;
  };
  const enKeys = keysIn(enBlock);
  const zhKeys = keysIn(zhBlock);
  const missingInZh = [...enKeys].filter((k) => !zhKeys.has(k));
  const missingInEn = [...zhKeys].filter((k) => !enKeys.has(k));
  check(
    "i18n: en/zh dictionary key parity",
    missingInZh.length === 0 && missingInEn.length === 0 && enKeys.size > 30,
    `${enKeys.size} keys${missingInZh.length ? `; missing in zh: ${missingInZh.join(",")}` : ""}${missingInEn.length ? `; extra in zh: ${missingInEn.join(",")}` : ""}`,
  );
}

// ---------- C. credential auth bootstrap ----------
const OWNER = { email: `owner-${nonce()}@brainos.test`, password: "brain-os-owner-1", name: "Vault Owner" };
const VIEWER = { email: `viewer-${nonce()}@brainos.test`, password: "brain-os-viewer-1", name: "Read Only", role: "viewer" };
let ownerCookie = null;

{
  const setup = await req("POST", "/api/auth/setup", { body: OWNER });
  ownerCookie = sessionCookieFrom(setup.setCookies);
  check(
    "auth: bootstrap owner account created",
    setup.status === 200 && setup.json.ok && setup.json.user?.role === "owner" && Boolean(ownerCookie),
  );

  const sess = await req("GET", "/api/auth/session", { cookie: ownerCookie });
  check(
    "auth: session resolves the owner cookie",
    sess.json.mode === "enforced" && sess.json.authenticated === true && sess.json.user?.role === "owner",
  );

  const anon = await req("GET", "/api/auth/session");
  check(
    "auth: anonymous session reports enforced + unauthenticated",
    anon.json.mode === "enforced" && anon.json.authenticated === false,
  );
}

// ---------- D. API enforcement ----------
{
  const p = await req("GET", "/api/projects");
  check("enforced: /api/projects requires a session", p.status === 401);

  const cap = await req("POST", "/api/capture", { body: { raw_content: "should not land" } });
  check("enforced: /api/capture requires a session", cap.status === 401);

  const tl = await req("GET", "/api/timeline");
  check("enforced: /api/timeline requires a session", tl.status === 401);

  const cfg = await req("GET", "/api/llm-backend");
  check("enforced: /api/llm-backend config echo requires a session", cfg.status === 401);

  const okProjects = await req("GET", "/api/projects", { cookie: ownerCookie });
  check("enforced: owner session reads projects", okProjects.status === 200);

  const health = await req("GET", "/api/health");
  check("enforced: /api/health stays open for infrastructure", health.status === 200);
}

// ---------- E. RBAC ----------
let viewerCookie = null;
{
  const invite = await req("POST", "/api/auth/setup", { body: VIEWER, cookie: ownerCookie });
  check("rbac: owner invites a viewer account", invite.status === 200 && invite.json.invited === true && invite.json.user?.role === "viewer");

  const forbidInvite = await req("POST", "/api/auth/setup", { body: { email: `x-${nonce()}@b.test`, password: "longenough1" } });
  check("rbac: unauthenticated invite is rejected", forbidInvite.status === 401);

  const login = await req("POST", "/api/auth/login", { body: { email: VIEWER.email, password: VIEWER.password } });
  viewerCookie = sessionCookieFrom(login.setCookies);
  check("rbac: viewer can sign in", login.status === 200 && login.json.user?.role === "viewer" && Boolean(viewerCookie));

  const read = await req("GET", "/api/projects", { cookie: viewerCookie });
  check("rbac: viewer may read", read.status === 200);

  const write = await req("POST", "/api/capture", { body: { raw_content: "viewer write attempt" }, cookie: viewerCookie });
  check("rbac: viewer mutation rejected with 403", write.status === 403);

  const ask = await req("POST", "/api/ask", { body: { query: "deployment error fix" }, cookie: viewerCookie });
  check("rbac: viewer may run grounded queries", ask.status === 200 && typeof ask.json.answer === "string");
}

// ---------- F. refresh / login / logout ----------
{
  const refreshed = await req("POST", "/api/auth/refresh", { cookie: ownerCookie });
  const newCookie = sessionCookieFrom(refreshed.setCookies);
  check("auth: sliding refresh re-issues a valid session", refreshed.status === 200 && refreshed.json.ok && Boolean(newCookie));

  const afterRefresh = await req("GET", "/api/projects", { cookie: newCookie ?? ownerCookie });
  check("auth: refreshed cookie works", afterRefresh.status === 200);

  const anonRefresh = await req("POST", "/api/auth/refresh");
  check("auth: refresh without a session is 401", anonRefresh.status === 401);

  const badLogin = await req("POST", "/api/auth/login", { body: { email: OWNER.email, password: "wrong-password" } });
  check("auth: wrong password rejected", badLogin.status === 401);

  const logout = await req("POST", "/api/auth/logout", { cookie: newCookie ?? ownerCookie });
  check("auth: logout clears the session", logout.status === 200 && logout.json.ok);
}

// ---------- G. agent ingest token still works when enforced ----------
{
  const noToken = await req("POST", "/api/agent/capture", {
    body: { raw_content: `agent unauthenticated ${nonce()}` },
  });
  check("agent: enforced mode rejects unauthenticated agent capture", noToken.status === 401);

  const gen = await req("POST", "/api/llm-backend", {
    body: { agent_ingest_token: "__generate__" },
    cookie: ownerCookie,
  });
  const agentToken = gen.json?.generated_token;
  check("agent: owner generates an ingest token", gen.status === 200 && typeof agentToken === "string" && agentToken.length >= 16);

  const res = await fetch(`${BASE}/api/agent/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Brain-Token": agentToken ?? "" },
    body: JSON.stringify({ raw_content: `agent token capture ${nonce()}`, item_type: "note" }),
  });
  const agentJson = await res.json().catch(() => null);
  check(
    "agent: token-authenticated capture works under enforcement",
    res.status === 200 && (agentJson?.status === "captured_zero_save" || agentJson?.status === "duplicate_merged"),
    `status=${res.status} wire=${agentJson?.status ?? "none"}`,
  );

  await req("POST", "/api/llm-backend", { body: { agent_ingest_token: "__clear__" }, cookie: ownerCookie });
}

// ---------- H. grounded chat stream + persistence ----------
const CHAT_Q = "How was the deployment error fixed?";
{
  const stream = await fetch(`${BASE}/api/ask/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: ownerCookie },
    body: JSON.stringify({ query: CHAT_Q, mode: "ask" }),
  });
  const text = await stream.text();
  const events = text
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  const types = new Set(events.map((e) => e.type));
  const done = events.find((e) => e.type === "done");
  const saved = events.find((e) => e.type === "saved");
  check(
    "chat: NDJSON stream emits status->done->saved",
    stream.status === 200 && types.has("status") && types.has("done") && types.has("saved"),
    `events=[${[...types].join(",")}]`,
  );
  check(
    "chat: honest offline answer (excerpts, llm_used=false)",
    done && done.answer && done.answer.length > 0 && done.llm_used === false,
    done ? `"${done.answer.slice(0, 60)}…"` : "",
  );

  const history = await req("GET", "/api/chat", { cookie: ownerCookie });
  const msgs = history.json.messages ?? [];
  const last = msgs[msgs.length - 1];
  check(
    "chat: both sides persisted to the project thread",
    history.status === 200 && msgs.length >= 2 && msgs.some((m) => m.role === "user" && m.content === CHAT_Q) && last?.role === "assistant",
    `${msgs.length} message(s)`,
  );

  const cleared = await req("DELETE", "/api/chat", { cookie: ownerCookie });
  const afterClear = await req("GET", "/api/chat", { cookie: ownerCookie });
  check(
    "chat: thread clears",
    cleared.status === 200 && (afterClear.json.messages ?? []).length === 0,
  );
}

// ---------- I. dashboard summary ----------
{
  const d = await req("GET", "/api/dashboard", { cookie: ownerCookie });
  check(
    "dashboard: live bento summary",
    d.status === 200 &&
      d.json.projects >= 3 &&
      d.json.captures > 0 &&
      Array.isArray(d.json.recent) &&
      d.json.recent.length > 0 &&
      Array.isArray(d.json.health) &&
      d.json.health.length >= 3,
    `projects=${d.json.projects} captures=${d.json.captures} recent=${d.json.recent?.length}`,
  );
}

// ---------- J. client error log ----------
{
  const marker = `verify-enterprise marker ${nonce()}`;
  const post = await fetch(`${BASE}/api/client-log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entries: [{ ts: new Date().toISOString(), level: "error", message: marker, source: "verify-enterprise" }] }),
  });
  const postJson = await post.json().catch(() => null);
  const { readFileSync, existsSync } = await import("node:fs");
  const { join } = await import("node:path");
  const logPath = join(process.cwd(), "logs", "client.log");
  const exists = existsSync(logPath);
  const content = exists ? readFileSync(logPath, "utf8") : "";
  check(
    "client-log: browser errors land on disk",
    post.status === 200 && postJson?.ok === true && content.includes(marker),
    logPath,
  );
}

// ---------- K. cleanup: restore open mode ----------
{
  await fetch(`${BASE}/api/auth/logout`, { method: "POST", headers: { Cookie: ownerCookie } });
  // Direct SQLite cleanup (the suite owns every row it created).
  const { execSync } = await import("node:child_process");
  execSync("node scripts/enterprise-cleanup.cjs", { cwd: process.cwd(), stdio: "pipe" });

  const anon = await req("GET", "/api/auth/session");
  const p = await req("GET", "/api/projects");
  check(
    "cleanup: open bootstrap mode restored",
    anon.json.mode === "open" && p.status === 200,
  );
}

// ---------- report ----------
console.log("\n=== verify-enterprise ===");
for (const line of results) console.log(line);
console.log(`\n${pass} PASS / ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
