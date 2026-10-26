/**
 * Project Brain OS — v2.6 Trust Plane Verification (blueprint Phase 0 + Phase 1)
 *
 *   A. Repo gate:        no tracked runtime files (vault/db/logs/tool-results),
 *                        .gitignore coverage, README/docs, npm script contract,
 *                        migrations, CI runs the full board
 *   B. Schema & tables:  BrainAsset + BrainAuditEvent live in schema AND SQLite;
 *                        CaptureJob carries the generic-queue columns
 *   C. Modules & wiring: audit (never-throw), jobs (lease+backoff+dead-letter),
 *                        worker (registered handlers), capture/audit/asset wiring
 *   D. Live audit trail: capture/edit/agent actions produce queryable events
 *   E. Live asset ledger: sha256 identity, dedup reuse, stable provider, disk truth
 *   F. Live job queue:   idempotent enqueue, drain, real handler completion,
 *                        failure backoff (visible, retryable), kind allowlist
 *
 * Run against a live dev server (http://localhost:3000), same harness contract
 * as the other nine suites.
 */
import { execSync } from "child_process";
import { createHash } from "crypto";
import { existsSync, readFileSync } from "fs";
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

function gitTrackedFiles() {
  try {
    return execSync("git ls-files", { cwd: ROOT, encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 })
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

(async () => {
  const nonce = Date.now();

  // ================= A. Repo gate (blueprint Phase 0) =================
  const tracked = gitTrackedFiles();
  const runtimeLeaks = tracked.filter((f) =>
    /^(ProjectBrainVault\/|db\/|logs\/|tool-results\/)|^\.env$|\.pyc$/.test(f)
  );
  check(
    "A1 no tracked runtime files (vault/db/logs/tool-results/.env/pyc)",
    tracked.length > 0 && runtimeLeaks.length === 0,
    runtimeLeaks.length === 0
      ? `${tracked.length} tracked files, zero runtime leaks`
      : `leaks: ${runtimeLeaks.slice(0, 5).join(", ")}`
  );

  const gitignore = readFileSync(path.join(ROOT, ".gitignore"), "utf-8");
  check(
    "A2 .gitignore covers runtime dirs + database",
    /\/db\//.test(gitignore) &&
      /\/ProjectBrainVault\//.test(gitignore) &&
      /\/logs\//.test(gitignore) &&
      /\/tool-results\//.test(gitignore) &&
      /\.db\b|\.db-journal/.test(gitignore),
    "db/, ProjectBrainVault/, logs/, tool-results/, *.db all ignored"
  );

  const readme = readFileSync(path.join(ROOT, "README.md"), "utf-8");
  check(
    "A3 README documents the trust plane + trust suite",
    /Trust & Control Plane|trust plane/i.test(readme) && /verify-trust/.test(readme),
    "trust-plane section + suite in the board table"
  );

  const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf-8"));
  check(
    "A4 npm script contract (test umbrella, test:trust, test:core, ci generates client)",
    typeof pkg.scripts.test === "string" &&
      /test:regression/.test(pkg.scripts.test) &&
      /test:trust/.test(pkg.scripts.test) &&
      pkg.scripts["test:trust"] === "node scripts/verify-trust.mjs" &&
      /verify-blueprint\.mjs/.test(pkg.scripts["test:core"]) &&
      /db:generate/.test(pkg.scripts.ci),
    `test="${pkg.scripts.test}"`
  );

  const migrationsOk =
    existsSync(path.join(ROOT, "prisma/migrations/migration_lock.toml")) &&
    existsSync(path.join(ROOT, "prisma/migrations/20251026000000_init/migration.sql"));
  check(
    "A5 migrations baseline committed (fresh-clone reproducibility)",
    migrationsOk,
    "prisma/migrations/{migration_lock.toml,20251026000000_init/migration.sql}"
  );

  const ciYml = readFileSync(path.join(ROOT, ".github/workflows/ci.yml"), "utf-8");
  check(
    "A6 CI boots the server and runs the FULL board via npm run test",
    /Run Full Regression Board/.test(ciYml) && /run: npm run test\s*$/m.test(ciYml),
    "workflow runs test:regression + test:trust umbrella against the booted server"
  );

  // ================= B. Schema & tables =================
  const schema = readFileSync(path.join(ROOT, "prisma/schema.prisma"), "utf-8");
  check(
    "B1 schema declares BrainAsset + BrainAuditEvent",
    /model BrainAsset\b/.test(schema) && /model BrainAuditEvent\b/.test(schema),
    "asset ledger + audit trail models present"
  );
  check(
    "B2 CaptureJob carries the generic-queue columns",
    /kind\s+String\s+@default\("CAPTURE"\)/.test(schema) &&
      /runAfter\s+DateTime/.test(schema) &&
      /lockedAt\s+DateTime\?/.test(schema) &&
      /lockedBy\s+String\?/.test(schema) &&
      /maxAttempts\s+Int/.test(schema),
    "kind / runAfter / lockedAt / lockedBy / maxAttempts all declared"
  );

  const tables = await prisma.$queryRawUnsafe(
    "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('BrainAsset','BrainAuditEvent')"
  );
  check(
    "B3 BrainAsset + BrainAuditEvent tables exist in SQLite",
    Array.isArray(tables) && tables.length === 2,
    tables.map((t) => t.name).join(", ")
  );

  const jobCols = await prisma.$queryRawUnsafe("PRAGMA table_info(CaptureJob)");
  const colNames = Array.isArray(jobCols) ? jobCols.map((c) => c.name) : [];
  check(
    "B4 CaptureJob table has the queue columns (live migration applied)",
    ["kind", "runAfter", "lockedAt", "lockedBy", "maxAttempts"].every((c) => colNames.includes(c)),
    `cols=${colNames.join(", ")}`
  );

  // ================= C. Modules & wiring =================
  const modExists = (p) => existsSync(path.join(ROOT, "src/lib/brain", p));
  check(
    "C1 five trust modules shipped",
    modExists("audit.ts") && modExists("assets.ts") && modExists("jobs.ts") &&
      modExists("job-worker.ts") && modExists("provenance.ts"),
    "audit / assets / jobs / job-worker / provenance"
  );

  const auditSrc = readFileSync(path.join(ROOT, "src/lib/brain/audit.ts"), "utf-8");
  check(
    "C2 recordAuditEvent is a never-throw (try/catch around the write)",
    /export async function recordAuditEvent/.test(auditSrc) &&
      /try \{/.test(auditSrc) &&
      /\[audit\] event write failed/.test(auditSrc),
    "auditing can never break the operation it observes"
  );

  const jobsSrc = readFileSync(path.join(ROOT, "src/lib/brain/jobs.ts"), "utf-8");
  check(
    "C3 queue mechanics: lease claim, stale reclaim, exponential backoff, dead-letter",
    /export async function claimJob/.test(jobsSrc) &&
      /LEASE_STALE_MS/.test(jobsSrc) &&
      /requeueStaleJobs/.test(jobsSrc) &&
      /Math\.pow\(2/.test(jobsSrc) &&
      /status: "dead"/.test(jobsSrc) &&
      /export async function failJob/.test(jobsSrc),
    "crashed-worker leases reclaimed; retries back off; failures stay visible"
  );

  const workerSrc = readFileSync(path.join(ROOT, "src/lib/brain/job-worker.ts"), "utf-8");
  check(
    "C4 worker registers REAL built-in handlers (vault reconcile + project compress)",
    /registerJobHandler\("RECONCILE_VAULT"/.test(workerSrc) &&
      /registerJobHandler\("PROJECT_COMPRESS"/.test(workerSrc) &&
      /syncMarkdownEditsFromDisk/.test(workerSrc) &&
      /compressProjectMemory/.test(workerSrc),
    "the drain loop does real engine work from day one"
  );

  const capSrc = readFileSync(path.join(ROOT, "src/app/api/capture/route.ts"), "utf-8");
  const agentCapSrc = readFileSync(path.join(ROOT, "src/app/api/agent/capture/route.ts"), "utf-8");
  const itemsSrc = readFileSync(path.join(ROOT, "src/app/api/items/[id]/route.ts"), "utf-8");
  check(
    "C5 audit wired into every mutation path (capture x2 + items PATCH)",
    capSrc.includes("recordAuditEvent") &&
      agentCapSrc.includes("recordAuditEvent") &&
      itemsSrc.includes("recordAuditEvent") &&
      /capture\.created/.test(capSrc) &&
      /item\.updated/.test(itemsSrc),
    "captures, edits and fix verifications are auditable"
  );

  const ingestSrc = readFileSync(path.join(ROOT, "src/lib/brain/ingest.ts"), "utf-8");
  check(
    "C6 ingest dedups assets by sha256 BEFORE writing/OCR",
    ingestSrc.includes("findAssetBySha256") &&
      ingestSrc.includes("sha256OfBase64") &&
      ingestSrc.indexOf("findAssetBySha256") < ingestSrc.indexOf("processScreenshotAndOcr", ingestSrc.indexOf("sha256OfBase64")),
    "identical bytes reuse the stored asset (disk-fill vector closed)"
  );

  // ================= D. Live audit trail =================
  const auditCapture = await post("/api/capture", {
    raw_content: `trust audit probe ${nonce} — capture.created expected`,
    item_type: "note",
    source_app: "TrustProbe",
  });
  const auditItemId = auditCapture.data?.item?.id ?? null;
  const auditRes = await jfetch(`/api/audit?limit=25&event_type=capture.created`);
  const myEvent = (auditRes.data?.events || []).find(
    (e) => e.entityId === auditItemId && e.eventType === "capture.created"
  );
  check(
    "D1 capture lands a queryable capture.created audit event",
    auditCapture.status === 200 && Boolean(myEvent) && auditRes.data?.stats !== undefined,
    myEvent ? `event=${myEvent.id} actor=${myEvent.actorType}` : `item=${auditItemId}`
  );

  check(
    "D2 audit details carry the forensic payload (content_hash + redactions)",
    Boolean(myEvent) &&
      typeof myEvent.details?.content_hash === "string" &&
      typeof myEvent.details?.redactions === "number",
    `hash=${String(myEvent?.details?.content_hash).slice(0, 12)}… redactions=${myEvent?.details?.redactions}`
  );

  const agentCapture = await post("/api/agent/capture", {
    raw_content: `trust agent probe ${nonce} — via agent endpoint`,
    item_type: "note",
    source_app: "TrustProbeAgent",
  });
  const agentEvent = await jfetch(`/api/audit?limit=25&event_type=capture.created`);
  const myAgentEvent = (agentEvent.data?.events || []).find(
    (e) => e.entityId === (agentCapture.data?.item_id ?? agentCapture.data?.item?.id)
  );
  check(
    "D3 agent-endpoint captures are audited with the agent marker",
    agentCapture.status === 200 &&
      Boolean(myAgentEvent) &&
      myAgentEvent.details?.via === "agent_endpoint" &&
      ["agent", "user"].includes(myAgentEvent.actorType),
    `actor=${myAgentEvent?.actorType} via=${myAgentEvent?.details?.via}`
  );

  let d4Item = auditItemId;
  if (!d4Item) {
    const seedItem = await prisma.item.findFirst({ orderBy: { capturedAt: "desc" } });
    d4Item = seedItem?.id ?? null;
  }
  const editRes = d4Item ? await patch(`/api/items/${d4Item}`, { title: `trust edit ${nonce}` }) : { status: 0, data: null };
  const editAudit = await jfetch(`/api/audit?limit=25&event_type=item.updated`);
  const editEvent = (editAudit.data?.events || []).find((e) => e.entityId === d4Item);
  check(
    "D4 item edits land item.updated audit events",
    editRes.status === 200 && Boolean(editEvent) && editEvent.details?.vault_sync_status !== undefined,
    editEvent ? `event=${editEvent.id} sync=${editEvent.details?.vault_sync_status}` : `patch=${editRes.status}`
  );

  // ================= E. Live asset ledger (sha256 identity) =================
  const shotBody = {
    raw_content: `trust asset probe ${nonce} — fallback text`,
    item_type: "screenshot",
    window_title: "trust-asset-probe",
    source_app: "TrustProbe",
    image_base64: PNG_1PX,
  };
  const shot1 = await post("/api/capture", shotBody);
  const sha256 = createHash("sha256")
    .update(Buffer.from(PNG_1PX.replace(/^data:image\/png;base64,/, ""), "base64"))
    .digest("hex");
  const assetRow1 = await prisma.brainAsset.findUnique({ where: { sha256 } });
  check(
    "E1 screenshot capture registers a BrainAsset ledger row",
    shot1.status === 200 &&
      assetRow1 !== null &&
      assetRow1.bytes > 0 &&
      assetRow1.processing === "completed" &&
      assetRow1.storagePath.includes("/assets/"),
    assetRow1 ? `asset=${assetRow1.id} bytes=${assetRow1.bytes} path=${assetRow1.storagePath.slice(-40)}` : `sha=${sha256.slice(0, 12)}`
  );

  const shot2 = await post("/api/capture", {
    ...shotBody,
    raw_content: `trust asset probe ${nonce} — second post, same bytes`,
  });
  const assetCount = await prisma.brainAsset.count({ where: { sha256 } });
  check(
    "E2 identical bytes dedup: ONE ledger row, response reports the reuse",
    shot2.status === 200 &&
      shot2.data?.asset_reused === true &&
      assetCount === 1 &&
      typeof shot2.data?.ocr?.provider === "string",
    `asset_reused=${shot2.data?.asset_reused} rows_for_sha=${assetCount} provider=${shot2.data?.ocr?.provider}`
  );

  check(
    "E3 asset file exists on disk at the ledger path",
    Boolean(assetRow1) && existsSync(path.join(ROOT, assetRow1.storagePath)),
    assetRow1 ? assetRow1.storagePath : "no row"
  );

  // ================= F. Live job queue =================
  const idemKey = `trust_reconcile_${nonce}`;
  const enq1 = await post("/api/jobs", {
    action: "enqueue",
    kind: "RECONCILE_VAULT",
    idempotency_key: idemKey,
    payload: {},
  });
  const jobsList = await jfetch("/api/jobs");
  check(
    "F1 enqueue RECONCILE_VAULT -> pending + visible in the queue API",
    enq1.status === 200 && enq1.data?.deduped === false && enq1.data?.job?.status === "pending" &&
      Array.isArray(jobsList.data?.recent) &&
      jobsList.data.recent.some((j) => j.id === enq1.data.job.id) &&
      (jobsList.data.registered || []).includes("RECONCILE_VAULT"),
    `job=${enq1.data?.job?.id} status=${enq1.data?.job?.status}`
  );

  const enq2 = await post("/api/jobs", {
    action: "enqueue",
    kind: "RECONCILE_VAULT",
    idempotency_key: idemKey,
    payload: {},
  });
  check(
    "F2 same idempotency key folds into the SAME job (deduped)",
    enq2.status === 200 && enq2.data?.deduped === true && enq2.data?.job?.id === enq1.data?.job?.id,
    `same id=${enq2.data?.job?.id === enq1.data?.job?.id}`
  );

  const drain1 = await post("/api/jobs", { action: "drain", max: 10 });
  const reconcileRow = enq1.data?.job?.id
    ? await prisma.captureJob.findUnique({ where: { id: enq1.data.job.id } })
    : null;
  check(
    "F3 drain runs the REAL handler: RECONCILE_VAULT completes",
    drain1.status === 200 &&
      drain1.data?.claimed >= 1 &&
      reconcileRow?.status === "completed" &&
      reconcileRow?.lockedAt === null,
    `claimed=${drain1.data?.claimed} completed=${drain1.data?.completed} reconcile=${reconcileRow?.status}`
  );

  const badKey = `trust_compress_${nonce}`;
  await post("/api/jobs", {
    action: "enqueue",
    kind: "PROJECT_COMPRESS",
    idempotency_key: badKey,
    payload: { projectId: `proj_does_not_exist_${nonce}` },
  });
  const drain2 = await post("/api/jobs", { action: "drain", max: 10 });
  const failedRow = await prisma.captureJob.findUnique({ where: { idempotencyKey: badKey } });
  const runAfterFuture =
    failedRow && new Date(failedRow.runAfter).getTime() > Date.now() + 20_000;
  check(
    "F4 failure path: backoff scheduled, error visible, NOT dead on attempt 1",
    drain2.status === 200 &&
      failedRow !== null &&
      failedRow.status === "pending" &&
      failedRow.attempts === 1 &&
      runAfterFuture &&
      failedRow.lastError.length > 0,
    `status=${failedRow?.status} attempts=${failedRow?.attempts} err="${String(failedRow?.lastError).slice(0, 40)}"`
  );

  const badKind = await post("/api/jobs", { action: "enqueue", kind: "NOT_A_KIND" });
  const statsShape = jobsList.data?.stats || {};
  check(
    "F5 unknown kind rejected with allowlist; stats shape valid",
    badKind.status === 400 && Array.isArray(badKind.data?.allowed) &&
      typeof statsShape.counts === "object" &&
      typeof statsShape.pendingRunnable === "number",
    `badKind=${badKind.status} pendingRunnable=${statsShape.pendingRunnable}`
  );

  // ================= Summary =================
  const health = await jfetch("/api/health");
  console.log(
    `\n===== verify-trust: ${results.length - failures}/${results.length} checks passed =====` +
      ` (engine ${health.data?.version}, audit stats: ${JSON.stringify((await jfetch("/api/audit?limit=1")).data?.stats ?? {})})`
  );
  process.exit(failures === 0 ? 0 : 1);
})().catch((err) => {
  console.error("verify-trust crashed:", err);
  process.exit(1);
});
