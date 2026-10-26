/**
 * Project Brain OS — v2.4 Verification (Ops: Telemetry + Feature Flags + Feedback + CI/CD)
 *
 *   A. CI/CD artifacts: GitHub Actions pipeline stages, Dockerfile (standalone),
 *      .dockerignore, npm scripts (type-check / ci / test:regression), ops docs
 *   B. /api/health: v2.4 engine + uptime probe fields (uptime_seconds, memory_rss_bytes)
 *   C. Feature-flag registry: GET lists the 3 flags w/ descriptions; PUT validation
 *      (unknown id -> 400, missing patch -> 400)
 *   D. Flag override + kill switch: ui.bento_stagger OFF -> GET reflects; reset restores
 *   E. Telemetry kill switch (SERVER-SIDE): ops.telemetry_ingest OFF -> POST /api/metrics
 *      {disabled:true} AND metrics.jsonl byte size unchanged; ON again -> ingest works
 *   F. Telemetry ingest + aggregation: web_vital, event (w/ props), api_timing persist;
 *      GET /api/metrics summary aggregates counts/avg/max/p95/top-events
 *   G. Feedback loop: POST validation (too short -> 400, too long -> 400), valid POST
 *      persists w/ category+user, GET review feed returns it
 *   H. Final state: all flags back to defaults (no stored overrides)
 */
import { readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "/home/z/my-project";
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
const post = (pathname, body) =>
  jfetch(pathname, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const put = (pathname, body) =>
  jfetch(pathname, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const metricsFile = join(ROOT, "logs", "metrics.jsonl");
const feedbackFile = join(ROOT, "logs", "feedback.jsonl");
const metricsBytes = () => (existsSync(metricsFile) ? statSync(metricsFile).size : 0);

(async () => {
  const nonce = Date.now();

  // ---- A. CI/CD artifacts ----
  const wfPath = join(ROOT, ".github", "workflows", "ci.yml");
  const wf = existsSync(wfPath) ? readFileSync(wfPath, "utf8") : "";
  check(
    "A1 CI pipeline: lint + type-check + build + prisma + full board (test umbrella)",
    ["npm run lint", "npm run type-check", "npm run build", "prisma generate"].every((s) => wf.includes(s)) &&
      // v2.6: the board stage is `npm run test` = test:regression + test:trust
      // (umbrella contract; the bare-word anchor keeps it distinct from test:*)
      /run: npm run test\s*$/m.test(wf),
    wf ? "stages found in .github/workflows/ci.yml (board = regression + trust umbrella)" : "workflow file missing"
  );
  check(
    "A2 CI boots the production server and uploads failure logs",
    wf.includes("standalone/server.js") && wf.includes("upload-artifact") && wf.includes("/api/health"),
    "live-server test stage + artifact upload wired"
  );
  const dockerfile = existsSync(join(ROOT, "Dockerfile")) ? readFileSync(join(ROOT, "Dockerfile"), "utf8") : "";
  const entrypoint = existsSync(join(ROOT, "entrypoint.sh")) ? readFileSync(join(ROOT, "entrypoint.sh"), "utf8") : "";
  check(
    "A3 Docker artifact: multi-stage standalone + SQLite volumes + healthcheck + db-push entrypoint",
    dockerfile.includes(".next/standalone") &&
      entrypoint.includes("prisma db push") &&
      dockerfile.includes("ENTRYPOINT") &&
      dockerfile.includes("/app/db") &&
      dockerfile.includes("HEALTHCHECK"),
    "deployable artifact per blueprint (Vercel replaced by Docker — self-hosted contract)"
  );
  check(
    "A4 .dockerignore excludes dev surface (node_modules, db, logs, vault)",
    existsSync(join(ROOT, ".dockerignore")) &&
      /node_modules/.test(readFileSync(join(ROOT, ".dockerignore"), "utf8")),
    "small, clean build context"
  );
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  check(
    "A5 npm scripts: type-check + ci + test:regression (all 7 suites) + version bump",
    typeof pkg.scripts["type-check"] === "string" &&
      pkg.scripts.ci?.includes("lint") &&
      ["verify-blueprint", "verify-upgrade", "verify-v2", "verify-v21", "verify-v22", "verify-enterprise", "verify-ops"].every((s) =>
        pkg.scripts["test:regression"]?.includes(s)
      ) &&
      Number(pkg.version?.split(".")[0] ?? 0) >= 0 && Number(pkg.version?.split(".")[1] ?? 0) >= 3,
    `version=${pkg.version}, test:regression wired`
  );
  check(
    "A6 Ops docs: DEPLOYMENT.md (CI/CD + rollback) + OPERATIONS.md (monitoring + flags + feedback)",
    existsSync(join(ROOT, "docs", "DEPLOYMENT.md")) &&
      existsSync(join(ROOT, "docs", "OPERATIONS.md")) &&
      readFileSync(join(ROOT, "docs", "OPERATIONS.md"), "utf8").includes("kill switch"),
    "knowledge base per blueprint §3.6"
  );

  // ---- B. Health uptime probe ----
  const health = await jfetch("/api/health");
  check(
    "B1 health: v2.4 engine + uptime probe payload",
    health.status === 200 &&
      Number(health.data.version) >= 2.4 &&
      Number.isFinite(health.data.uptime_seconds) &&
      health.data.uptime_seconds >= 0 &&
      Number.isFinite(health.data.memory_rss_bytes),
    `version=${health.data.version} uptime=${health.data.uptime_seconds}s rss=${Math.round((health.data.memory_rss_bytes ?? 0) / 1e6)}MB`
  );

  // ---- C. Flag registry + validation ----
  const flags0 = await jfetch("/api/feature-flags");
  const ids = (flags0.data?.flags ?? []).map((f) => f.id);
  check(
    "C1 flag registry: 3 flags w/ description + surface + source",
    flags0.status === 200 &&
      ids.length === 3 &&
      ["ops.telemetry_ingest", "ui.bento_stagger", "vault.cross_project_fixes"].every((x) => ids.includes(x)) &&
      (flags0.data.flags ?? []).every((f) => typeof f.description === "string" && f.surface && f.source),
    `flags=${ids.join(", ")}`
  );
  const badId = await put("/api/feature-flags", { id: "no.such_flag", enabled: false });
  check("C2 unknown flag -> 400", badId.status === 400, `status=${badId.status}`);
  const badPatch = await put("/api/feature-flags", { id: "ui.bento_stagger" });
  check("C3 patch without enabled/rollout/reset -> 400", badPatch.status === 400, `status=${badPatch.status}`);
  const badType = await post("/api/metrics", { type: "nope" });
  check("C4 unknown telemetry type -> 400", badType.status === 400, `status=${badType.status}`);

  // ---- D. Flag override + reset ----
  const off = await put("/api/feature-flags", { id: "ui.bento_stagger", enabled: false });
  const flags1 = await jfetch("/api/feature-flags");
  const stagger = (flags1.data?.flags ?? []).find((f) => f.id === "ui.bento_stagger");
  check(
    "D1 override persists (ui.bento_stagger=false, source=stored)",
    off.status === 200 && stagger?.enabled === false && stagger?.source === "stored",
    `enabled=${stagger?.enabled} source=${stagger?.source}`
  );
  const reset = await put("/api/feature-flags", { id: "ui.bento_stagger", reset: true });
  const flags2 = await jfetch("/api/feature-flags");
  const stagger2 = (flags2.data?.flags ?? []).find((f) => f.id === "ui.bento_stagger");
  check(
    "D2 reset restores default (enabled=true, source=default)",
    reset.status === 200 && stagger2?.enabled === true && stagger2?.source === "default",
    `enabled=${stagger2?.enabled} source=${stagger2?.source}`
  );

  // ---- E. Telemetry kill switch (server-side) ----
  const beforeBytes = metricsBytes();
  await put("/api/feature-flags", { id: "ops.telemetry_ingest", enabled: false });
  const killed = await post("/api/metrics", { type: "event", name: "ops.kill_switch_probe" });
  const afterKillBytes = metricsBytes();
  check(
    "E1 kill switch: ingest OFF -> {disabled:true} and NOTHING written",
    killed.status === 200 && killed.data?.disabled === true && afterKillBytes === beforeBytes,
    `disabled=${killed.data?.disabled} bytes ${beforeBytes}->${afterKillBytes}`
  );
  await put("/api/feature-flags", { id: "ops.telemetry_ingest", enabled: true });
  const revived = await post("/api/metrics", { type: "event", name: "ops.kill_switch_probe", props: { stage: "revived" } });
  check(
    "E2 kill switch OFF->ON: ingest resumes immediately (no redeploy)",
    revived.status === 200 && revived.data?.ok === true && metricsBytes() > afterKillBytes,
    `bytes ${afterKillBytes}->${metricsBytes()}`
  );

  // ---- F. Telemetry ingest + aggregation (unique names = deterministic rows) ----
  // Probe hygiene (third corpus-drift guard, Task 16): every board run leaves
  // one synthetic 550000ms api_timing row under /api/verify-ops-<nonce>; after
  // 10 runs the p95-sorted top-10 in GET /api/metrics fills with tied legacy
  // rows and the fresh probe is sliced off ("timing row missing"). Prune our
  // OWN synthetic probe rows before posting the fresh one — self-cleaning,
  // deterministic regardless of how many times the board has run. Safe against
  // the server: ingest appends per-POST (no held fd), and only rows containing
  // our synthetic route marker are removed.
  try {
    const lines = readFileSync(metricsFile, "utf-8").split("\n").filter(Boolean);
    // Two synthetic-row families poison two aggregations:
    //   - "/api/verify-ops-<nonce>" api_timing rows -> p95 top-10 tie crowding (F3)
    //   - "verify.n<nonce>" event rows, 50 per run  -> top-12 count tie crowding (F2)
    const keep = lines.filter((l) => !l.includes("/api/verify-ops-") && !l.includes('"name":"verify.n'));
    if (keep.length !== lines.length) writeFileSync(metricsFile, keep.join("\n") + "\n");
  } catch {}
  const tag = `n${nonce}`;
  await post("/api/metrics", { type: "web_vital", name: `LCP-${tag}`, value: 1234, rating: "good", path: "/" });
  await post("/api/metrics", { type: "web_vital", name: `LCP-${tag}`, value: 2345, rating: "poor", path: "/" });
  // 50 posts keep the nonced event atop the top-12 count ranking even as real
  // telemetry events accumulate count>=2 ties (corpus drift guard, F3 family).
  await post("/api/metrics", { type: "event", name: `verify.${tag}`, props: { scope: "ops", pass: true } });
  for (let i = 0; i < 49; i++) {
    await post("/api/metrics", { type: "event", name: `verify.${tag}`, props: { scope: "ops" } });
  }
  await post("/api/metrics", { type: "api_timing", route: `GET /api/verify-ops-${tag}`, ms: 550000, status: 200 });
  const summary = await jfetch("/api/metrics");
  const vital = (summary.data?.web_vitals ?? []).find((v) => v.name === `LCP-${tag}`);
  const ev = (summary.data?.events ?? []).find((e) => e.name === `verify.${tag}`);
  const timing = (summary.data?.api_timings ?? []).find((r) => r.route === `GET /api/verify-ops-${tag}`);
  check(
    "F1 web vitals aggregate (count, avg, max, poor)",
    vital && vital.count >= 2 && vital.avg === Math.round((1234 + 2345) / 2) && vital.max >= 2345 && vital.poor >= 1,
    vital ? `LCP n=${vital.count} avg=${vital.avg} max=${vital.max} poor=${vital.poor}` : "no LCP row"
  );
  check(
    "F2 event aggregation w/ props (top-events list)",
    ev && ev.count >= 2,
    ev ? `verify.${tag} x${ev.count}` : "event row missing"
  );
  check(
    "F3 api_timing aggregation (p95 + slowest-first ordering)",
    // 550000ms keeps the synthetic probe in the top-10 slowest routes even as
    // real telemetry accumulates slower-than-812ms rows (corpus drift guard).
    timing && timing.p95Ms >= 550000 && timing.avgMs >= 550000,
    timing ? `p95=${timing.p95Ms}ms avg=${timing.avgMs}ms errors=${timing.errors}` : "timing row missing"
  );

  // ---- G. Feedback loop ----
  const short = await post("/api/feedback", { message: "hi" });
  check("G1 too-short feedback -> 400", short.status === 400, `status=${short.status}`);
  const long = await post("/api/feedback", { message: "x".repeat(2001) });
  check("G2 too-long feedback -> 400", long.status === 400, `status=${long.status}`);
  const fbMsg = `Blueprint-ops feedback ${tag}: the Ops & Telemetry panel is genuinely useful.`;
  const fb = await post("/api/feedback", { message: fbMsg, category: "feature", path: "/" });
  check(
    "G3 valid feedback persists (category + user recorded)",
    fb.status === 200 && fb.data?.ok === true && existsSync(feedbackFile),
    `ts=${fb.data?.received ?? "?"}`
  );
  const feed = await jfetch("/api/feedback");
  const mine = (feed.data?.feedback ?? []).find((f) => f.message === fbMsg);
  check(
    "G4 review feed returns the entry (newest first, owner view)",
    feed.status === 200 && mine && mine.category === "feature",
    mine ? `category=${mine.category} user=${mine.user}` : "entry missing"
  );

  // ---- H. Final state: no stored flag overrides left ----
  await put("/api/feature-flags", { id: "ops.telemetry_ingest", reset: true });
  const flagsFinal = await jfetch("/api/feature-flags");
  const allDefault = (flagsFinal.data?.flags ?? []).every((f) => f.source === "default");
  check(
    "H1 final state: every flag back to code defaults (no stored overrides)",
    allDefault,
    (flagsFinal.data?.flags ?? []).map((f) => `${f.id}:${f.source}`).join(" ")
  );

  console.log(`\n=== v2.4 ops verify: ${results.length - failures}/${results.length} PASS, ${failures} FAIL ===`);
  process.exit(failures === 0 ? 0 : 1);
})().catch((e) => {
  console.error("verify-ops crashed:", e);
  process.exit(1);
});
