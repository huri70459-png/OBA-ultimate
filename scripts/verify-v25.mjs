/**
 * Project Brain OS — v2.5 Verification (Privacy Guard + Vision OCR + Closed-Loop
 * Fixes + Two-Way Editing + MCP Server + Vault Hardening)
 *
 *   A. Artifacts & schema: 3 new Prisma models live in SQLite; 4 new lib modules;
 *      items PATCH route; MCP + desktop agent scripts; store hardening patterns
 *   B. Privacy Guard (live): sensitive window blocked (422); sk-/ghp-/env secrets
 *      redacted in the STORED content; deterministic content_hash returned
 *   C. Vault hardening: two same-title captures in the same second -> two distinct
 *      files; unique filenames carry the item short-id suffix; no .tmp leftovers
 *   D. PATCH /api/items/[id]: in-place edit + revision + vault rewrite; 409
 *      CONFLICT_DETECTED on stale expected_hash; 404 unknown; 400 bad fix_status
 *   E. Closed-loop lifecycle: fix verification -> Action row + VERIFIED_BY graph
 *      edge + health gap "Unverified fix suggestions" appears/disappears
 *   F. Vision OCR ingest: image_base64 screenshot -> vault asset persisted on disk,
 *      local-asset-store fallback provider, visual description populated
 *   G. MCP server: JSON-RPC handshake, tools/list (6 tools), live tools/call
 *      roundtrip, ping, -32601 on unknown method
 *   H. Desktop agent: py_compile clean; --check handshake against the live server
 *   I. CaptureJob idempotent ledger + forced_project_id routing + engine v2.5
 */
import { spawn } from "child_process";
import { execFile } from "child_process";
import { readdirSync, existsSync, readFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL = process.env.DATABASE_URL || "file:/home/z/my-project/db/custom.db";
const prisma = new PrismaClient({ log: [] });

const BASE = "http://localhost:3000";
const ROOT = "/home/z/my-project";
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
const post = (pathname, body) =>
  jfetch(pathname, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const patch = (pathname, body) =>
  jfetch(pathname, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const PNG_1PX =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

/** Drives the MCP stdio server with a batch of JSON-RPC lines. */
function mcpRoundtrip(lines) {
  return new Promise((resolve, reject) => {
    const proc = spawn("node", ["scripts/mcp_server.mjs"], {
      cwd: ROOT,
      env: { ...process.env, BRAIN_API_URL: BASE },
    });
    let out = "";
    const timer = setTimeout(() => {
      proc.kill();
      reject(new Error("MCP server timeout"));
    }, 20000);
    proc.stdout.on("data", (d) => (out += d.toString()));
    proc.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    proc.on("close", () => {
      clearTimeout(timer);
      const responses = out
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => JSON.parse(l));
      resolve(responses);
    });
    for (const line of lines) proc.stdin.write(`${line}\n`);
    proc.stdin.end();
  });
}

function runPython(args) {
  return new Promise((resolve) => {
    execFile("python3", args, { cwd: ROOT, timeout: 30000 }, (err, stdout, stderr) =>
      resolve({ ok: !err, stdout: String(stdout || ""), stderr: String(stderr || "") })
    );
  });
}

(async () => {
  const nonce = Date.now();

  // ================= A. Artifacts & schema =================
  const schema = readFileSync(path.join(ROOT, "prisma/schema.prisma"), "utf-8");
  check(
    "A1 schema declares the 3 new models",
    /model Action\b/.test(schema) && /model CaptureJob\b/.test(schema) && /model ItemRevision\b/.test(schema),
    "Action / CaptureJob / ItemRevision present in prisma/schema.prisma"
  );

  const tables = await prisma.$queryRawUnsafe(
    "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('Action','CaptureJob','ItemRevision')"
  );
  check(
    "A2 new tables exist in SQLite",
    Array.isArray(tables) && tables.length === 3,
    `sqlite_master rows: ${tables.map((t) => t.name).join(", ")}`
  );

  const libFiles = ["privacy-redactor.ts", "vision-ocr.ts", "action-verifier.ts", "ingest.ts"].map((f) =>
    path.join(ROOT, "src/lib/brain", f)
  );
  check(
    "A3 v2.5 lib modules exist",
    libFiles.every((f) => existsSync(f)),
    libFiles.map((f) => path.basename(f)).join(", ")
  );

  check(
    "A4 PATCH route + scripts shipped",
    existsSync(path.join(ROOT, "src/app/api/items/[id]/route.ts")) &&
      existsSync(path.join(ROOT, "scripts/mcp_server.mjs")) &&
      existsSync(path.join(ROOT, "scripts/desktop_agent.py")),
    "items/[id]/route.ts, mcp_server.mjs, desktop_agent.py"
  );

  const storeSrc = readFileSync(path.join(ROOT, "src/lib/brain/store.ts"), "utf-8");
  check(
    "A5 vault writes hardened (unique filename + atomic tmp/rename)",
    /_\$\{shortId\}\.md/.test(storeSrc) && /const tmp = `\$\{abs\}\.tmp`/.test(storeSrc) && /rename\(tmp, abs\)/.test(storeSrc),
    "filename carries item shortId; writeVaultFile is .tmp+rename atomic"
  );

  const wsStore = readFileSync(path.join(ROOT, "src/components/brain/workspace-store.ts"), "utf-8");
  check(
    "A6 loadDetails race guard present",
    /latestDetailsRequestId/.test(wsStore) && /requestId !== latestDetailsRequestId/.test(wsStore),
    "stale project-details responses can no longer overwrite the selection"
  );

  const health = await jfetch("/api/health");
  check(
    "A7 engine reports v2.5",
    health.status === 200 && String(health.data?.version) === "2.5",
    `engine="${health.data?.engine}"`
  );

  // ================= B. Privacy Guard (live) =================
  const blocked = await post("/api/capture", {
    raw_content: `nonce ${nonce} secret window probe`,
    item_type: "note",
    window_title: "1Password — Vault",
    source_app: "PrivacyProbe",
  });
  check(
    "B1 sensitive window blocked with 422",
    blocked.status === 422 && blocked.data?.status === "blocked" && /Privacy Guard/i.test(String(blocked.data?.reason)),
    `HTTP ${blocked.status} — ${blocked.data?.reason}`
  );

  const skCapture = await post("/api/capture", {
    raw_content: `deploy probe ${nonce}\nOPENAI_KEY=sk-proj-abcdefghij0123456789abcdefghij\nGITHUB=ghp_1234567890abcdefghijklmnop\nDATABASE_PASSWORD=hunter2secret`,
    item_type: "note",
    window_title: "privacy-probe",
    source_app: "PrivacyProbe",
  });
  const skItem = skCapture.data?.item
    ? await prisma.item.findUnique({ where: { id: skCapture.data.item.id } })
    : null;
  check(
    "B2 sk- key redacted in stored content",
    skCapture.status === 200 &&
      skItem !== null &&
      skItem.rawContent.includes("[REDACTED_OPENAI_KEY]") &&
      !skItem.rawContent.includes("sk-proj-"),
    `redaction_count=${skCapture.data?.privacy?.redaction_count} stored="${(skItem?.rawContent || "").slice(0, 90)}…"`
  );

  check(
    "B3 github token + env secret redacted",
    skItem.rawContent.includes("[REDACTED_GITHUB_TOKEN]") && skItem.rawContent.includes("[REDACTED_ENV_VALUE]"),
    "ghp_ and *_PASSWORD= both masked in SQLite"
  );

  check(
    "B4 deterministic content_hash returned",
    typeof skCapture.data?.content_hash === "string" && /^[0-9a-f]{16}$/.test(skCapture.data.content_hash),
    `content_hash=${skCapture.data?.content_hash}`
  );

  const agentBlocked = await post("/api/agent/capture", {
    raw_content: `agent privacy probe ${nonce}`,
    item_type: "note",
    window_title: "Bitwarden — My Vault",
    source_app: "DesktopAgent",
  });
  check(
    "B5 agent route enforces the same guard",
    agentBlocked.status === 422 && agentBlocked.data?.status === "blocked",
    `HTTP ${agentBlocked.status} — agent cannot bypass the privacy layer`
  );

  // ================= C. Vault hardening =================
  const twinA = await post("/api/capture", {
    raw_content: `twin probe A ${nonce} — unique body alpha`,
    item_type: "note",
    window_title: "collision-probe",
    source_app: "VaultProbe",
  });
  const twinB = await post("/api/capture", {
    raw_content: `twin probe B ${nonce} — unique body beta`,
    item_type: "note",
    window_title: "collision-probe",
    source_app: "VaultProbe",
  });
  const twinArow = twinA.data?.item ? await prisma.item.findUnique({ where: { id: twinA.data.item.id } }) : null;
  const twinBrow = twinB.data?.item ? await prisma.item.findUnique({ where: { id: twinB.data.item.id } }) : null;
  check(
    "C1 same-second same-title captures -> two distinct vault files",
    twinArow && twinBrow &&
      twinArow.filePath !== twinBrow.filePath &&
      existsSync(path.join(ROOT, twinArow.filePath)) &&
      existsSync(path.join(ROOT, twinBrow.filePath)),
    `${path.basename(twinArow?.filePath || "?")} vs ${path.basename(twinBrow?.filePath || "?")}`
  );

  check(
    "C2 filename carries the unique item short-id suffix",
    /_[a-zA-Z0-9]{6}\.md$/.test(twinArow?.filePath || "") && /_[a-zA-Z0-9]{6}\.md$/.test(twinBrow?.filePath || ""),
    "both filenames end in _<shortId>.md"
  );

  const tmpFiles = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".tmp")) tmpFiles.push(full);
    }
  };
  walk(path.join(ROOT, "ProjectBrainVault"));
  check(
    "C3 no .tmp leftovers in the vault",
    tmpFiles.length === 0,
    tmpFiles.length === 0 ? "vault clean" : `leftovers: ${tmpFiles.slice(0, 3).join(", ")}`
  );

  // ================= D. PATCH /api/items/[id] =================
  const editSeed = await post("/api/capture", {
    raw_content: `editable note ${nonce}\nfirst version body`,
    item_type: "note",
    window_title: "edit-probe",
    source_app: "EditProbe",
  });
  const editId = editSeed.data?.item?.id;

  const edit1 = await patch(`/api/items/${editId}`, {
    raw_content: `editable note ${nonce}\nsecond version body (edited in place)`,
    title: `Edited note ${nonce}`,
  });
  check(
    "D1 in-place edit succeeds",
    edit1.status === 200 && edit1.data?.status === "updated" && edit1.data?.revision_created === true,
    `item=${editId} vault_sync=${edit1.data?.vault_sync_status}`
  );

  const editRow = await prisma.item.findUnique({ where: { id: editId } });
  const editRevision = await prisma.itemRevision.findFirst({ where: { itemId: editId } });
  check(
    "D2 content updated + revision snapshot + vault file rewritten",
    editRow.rawContent.includes("second version body") &&
      editRevision !== null &&
      editRevision.source === "editor" &&
      editRevision.rawContent.includes("first version body") &&
      existsSync(path.join(ROOT, editRow.filePath)) &&
      readFileSync(path.join(ROOT, editRow.filePath), "utf-8").includes("second version body"),
    `revision=${editRevision?.id} (previous content preserved)`
  );

  const conflict = await patch(`/api/items/${editId}`, {
    raw_content: "should not land",
    expected_hash: "0000000000000000",
  });
  check(
    "D3 stale expected_hash -> 409 CONFLICT_DETECTED",
    conflict.status === 409 && conflict.data?.error === "CONFLICT_DETECTED" &&
      typeof conflict.data?.server_content === "string",
    "server content returned for reconciliation"
  );

  const edit2 = await patch(`/api/items/${editId}`, {
    raw_content: `editable note ${nonce}\nthird version via expected_hash`,
    expected_hash: edit1.data?.content_hash,
  });
  check(
    "D4 correct expected_hash passes the concurrency gate",
    edit2.status === 200 && edit2.data?.status === "updated",
    `hash=${edit1.data?.content_hash} accepted`
  );

  const notFound = await patch("/api/items/item_doesnotexist999", { raw_content: "x" });
  check("D5 unknown item -> 404", notFound.status === 404, `HTTP ${notFound.status}`);

  const badStatus = await patch(`/api/items/${editId}`, { fix_status: "yolo" });
  check("D6 invalid fix_status -> 400", badStatus.status === 400, `HTTP ${badStatus.status}`);

  // ================= E. Closed-loop fix lifecycle =================
  const errSeed = await post("/api/capture", {
    raw_content: `Error: Cannot find module 'leftpad-${nonce}'\n    at require (internal/modules/cjs/loader.js)`,
    item_type: "terminal",
    window_title: "fix-probe",
    source_app: "FixProbe",
  });
  const errId = errSeed.data?.item?.id;
  const errRow0 = errId ? await prisma.item.findUnique({ where: { id: errId } }) : null;
  check(
    "E1 error capture carries a suggested fix",
    errRow0 !== null && typeof JSON.parse(errRow0.metadata).fix === "string",
    `fix="${JSON.parse(errRow0?.metadata || "{}").fix}"`
  );

  const verify = await patch(`/api/items/${errId}`, {
    fix_status: "verified",
    verification_note: `suite verification ${nonce}`,
  });
  const actionRow = await prisma.action.findFirst({ where: { sourceItemId: errId } });
  const verifiedEdge = await prisma.graphEdge.findFirst({
    where: { projectId: errRow0?.projectId ?? null, relationType: "VERIFIED_BY" },
  });
  check(
    "E2 verified fix -> Action row + VERIFIED_BY edge",
    verify.status === 200 &&
      verify.data?.fix_status === "verified" &&
      actionRow !== null &&
      actionRow.status === "verified" &&
      verifiedEdge !== null,
    `action=${actionRow?.id} edge=${verifiedEdge?.sourceNode} -[VERIFIED_BY]-> ${verifiedEdge?.targetNode}`
  );

  // Health gap lifecycle on an isolated project
  const gapProject = await post("/api/projects", { name: `Gap Probe ${nonce}` });
  const gapPid = gapProject.data?.id;
  for (let i = 1; i <= 3; i++) {
    await post("/api/capture", {
      raw_content: `Error: Cannot find module 'gapmod${i}-${nonce}' at require`,
      item_type: "terminal",
      window_title: "gap-probe",
      source_app: "GapProbe",
      forced_project_id: gapPid,
    });
  }
  const details1 = await jfetch(`/api/projects/${gapPid}`);
  const hasGap = (details1.data?.healthGaps || []).some((g) => g.gap === "Unverified fix suggestions");
  check(
    "E3 health flags unverified fix suggestions",
    hasGap === true,
    `gaps=${(details1.data?.healthGaps || []).map((g) => g.gap).join(" | ")}`
  );

  const gapItems = await prisma.item.findMany({ where: { projectId: gapPid }, take: 3 });
  for (const gi of gapItems) {
    await patch(`/api/items/${gi.id}`, { fix_status: "verified" });
  }
  const details2 = await jfetch(`/api/projects/${gapPid}`);
  const stillHasGap = (details2.data?.healthGaps || []).some((g) => g.gap === "Unverified fix suggestions");
  check(
    "E4 verifying the fixes clears the gap",
    stillHasGap === false,
    `verified all 3 — gap removed (health ${details1.data?.healthScore} -> ${details2.data?.healthScore})`
  );

  // ================= F. Vision OCR / screenshot ingest =================
  const shot = await post("/api/capture", {
    raw_content: `screenshot probe ${nonce} — fallback text`,
    item_type: "screenshot",
    window_title: "shot-probe",
    source_app: "VisionProbe",
    image_base64: PNG_1PX,
    forced_project_id: gapPid,
  });
  const shotRow = shot.data?.item ? await prisma.item.findUnique({ where: { id: shot.data.item.id } }) : null;
  check(
    "F1 screenshot persisted with vault asset on disk",
    shot.status === 200 &&
      shotRow !== null &&
      shotRow.assetPath.includes("/assets/") &&
      existsSync(path.join(ROOT, shotRow.assetPath)),
    `asset=${shotRow?.assetPath}`
  );

  check(
    "F2 offline provider = local-asset-store, visual description populated",
    shot.data?.ocr?.provider === "local-asset-store" && shotRow.visualDescription.length > 0,
    `provider=${shot.data?.ocr?.provider} visual="${shotRow?.visualDescription?.slice(0, 60)}"`
  );

  check(
    "F3 forced_project_id routed the screenshot deterministically",
    shotRow?.projectId === gapPid && shot.data?.projectMatch?.confidence === 1,
    `project=${shot.data?.projectMatch?.projectName} confidence=${shot.data?.projectMatch?.confidence}`
  );

  // ================= G. MCP server (stdio JSON-RPC) =================
  const mcpLines = [
    JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18" } }),
    JSON.stringify({ jsonrpc: "2.0", id: 2, method: "ping" }),
    JSON.stringify({ jsonrpc: "2.0", id: 3, method: "tools/list" }),
    JSON.stringify({ jsonrpc: "2.0", id: 4, method: "bogus/method" }),
    JSON.stringify({ jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "list_projects", arguments: {} } }),
  ];
  const mcpResponses = await mcpRoundtrip(mcpLines);
  const byId = Object.fromEntries(mcpResponses.map((r) => [r.id, r]));
  check(
    "G1 MCP initialize handshake",
    byId[1]?.result?.serverInfo?.name === "project-brain-os-mcp" && Boolean(byId[1]?.result?.capabilities?.tools),
    `serverInfo=${byId[1]?.result?.serverInfo?.name} protocol=${byId[1]?.result?.protocolVersion}`
  );

  check("G2 MCP ping answers empty result", byId[2]?.result && Object.keys(byId[2].result).length === 0, "ping ok");

  const toolNames = (byId[3]?.result?.tools || []).map((t) => t.name);
  check(
    "G3 tools/list exposes all 6 tools",
    ["list_projects", "get_project_context", "search_project_brain", "zero_save_capture", "log_decision", "verify_fix_outcome"]
      .every((t) => toolNames.includes(t)),
    `tools=${toolNames.join(", ")}`
  );

  check(
    "G4 unknown method -> JSON-RPC -32601",
    byId[4]?.error?.code === -32601,
    `code=${byId[4]?.error?.code} "${byId[4]?.error?.message}"`
  );

  let liveProjects = null;
  try {
    liveProjects = JSON.parse(byId[5]?.result?.content?.[0]?.text || "null");
  } catch {}
  check(
    "G5 tools/call list_projects roundtrips against the live server",
    Array.isArray(liveProjects?.projects) && liveProjects.projects.length > 0,
    `${liveProjects?.projects?.length} projects relayed over MCP`
  );

  // ================= H. Desktop agent =================
  const pyCompile = await runPython(["-m", "py_compile", "scripts/desktop_agent.py"]);
  check("H1 desktop_agent.py compiles cleanly", pyCompile.ok, pyCompile.ok ? "py_compile OK" : pyCompile.stderr.slice(0, 120));

  const pyCheck = await runPython(["scripts/desktop_agent.py", "--check"]);
  check(
    "H2 --check handshake against the live workspace",
    pyCheck.ok && /handshake OK/.test(pyCheck.stdout) && /token_required=False/i.test(pyCheck.stdout),
    pyCheck.stdout.trim().slice(0, 120)
  );

  const agentSrc = readFileSync(path.join(ROOT, "scripts/desktop_agent.py"), "utf-8");
  check(
    "H3 agent ships privacy guard + spool + screenshot capture",
    /EXCLUDED_WINDOW_PATTERNS/.test(agentSrc) && /project-brain-spool\.jsonl/.test(agentSrc) && /capture_screenshot_base64/.test(agentSrc),
    "guardrails present client-side (defense in depth with the server)"
  );

  // ================= I. CaptureJob ledger + final state =================
  const job = shot.data?.capture_job;
  check(
    "I1 capture recorded in the idempotent ledger",
    job && job.status === "completed" && typeof job.id === "string",
    `job=${job?.id} status=${job?.status}`
  );

  const jobCount = await prisma.captureJob.count();
  const repeat = await post("/api/capture", {
    raw_content: `screenshot probe ${nonce} — fallback text`,
    item_type: "screenshot",
    window_title: "shot-probe",
    source_app: "VisionProbe",
    image_base64: PNG_1PX,
    forced_project_id: gapPid,
  });
  check(
    "I2 identical payload -> same ledger row, attempts incremented",
    jobCount > 0 && repeat.status === 200 && repeat.data?.status === "duplicate_merged" &&
      repeat.data?.capture_job?.id === job?.id && (repeat.data?.capture_job?.attempts ?? 0) >= 2,
    `attempts=${repeat.data?.capture_job?.attempts} on job ${repeat.data?.capture_job?.id}`
  );

  const finalHealth = await jfetch("/api/health");
  check(
    "I3 final state — engine healthy, v2.5",
    finalHealth.status === 200 && String(finalHealth.data?.version) === "2.5",
    `${results.length} checks, engine ${finalHealth.data?.version}`
  );

  await prisma.$disconnect();
  console.log(`\n===== verify-v25: ${results.length - failures}/${results.length} checks passed =====`);
  if (failures > 0) {
    console.error("FAILURES:");
    results.filter((r) => r.status === "FAIL").forEach((r) => console.error(`  ✗ ${r.name} — ${r.detail}`));
    process.exit(1);
  }
})().catch(async (e) => {
  console.error("verify-v25 crashed:", e);
  await prisma.$disconnect().catch(() => {});
  process.exit(1);
});
