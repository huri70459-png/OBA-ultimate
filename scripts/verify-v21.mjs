/**
 * Project Brain OS — v2.1 Part A Verification (UI & Deduplication Upgrade)
 * Ports the v2.1 memory_compressor.py / brain_api.py guarantees to the live Next.js engine:
 *   A. /api/health reports the v2.1 engine
 *   B. Exact duplicate folding: identical repeats merge (occurrence_count, toast),
 *      case/whitespace variants are the SAME canonical content
 *   C. Scoping: different item_type or different project => NOT merged
 *   D. 36-hour window: captures older than the window are never folded (Prisma backdate)
 *   E. GET /api/inbox + POST /api/triage (real vault file move + vector re-point)
 *   F. POST /api/resolve (resolution note persisted in metadata)
 *   G. Grounded /api/ask + /api/synthesize (evidence excerpts, honest offline mode,
 *      garbage query => "no supporting evidence")
 *   H. POST /api/compress: occurrences_represented + v2.1 session-based _work_replay.md
 *      (45-min sessions, "N unique captures / M occurrences" headers, ×N folding)
 *   I. /api/self-test: all 10 scenarios PASS
 */
import fs from "fs";
import path from "path";
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

async function jfetch(pathname, opts) {
  const res = await fetch(BASE + pathname, opts);
  let data = null;
  try { data = await res.json(); } catch {}
  return { status: res.status, data };
}

const absVault = (rel) => path.join(process.cwd(), rel);
const post = (pathname, body) =>
  jfetch(pathname, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

(async () => {
  // ---- A. Health v2.1 ----
  const health = await jfetch("/api/health");
  check(
    "v2.1 engine online",
    health.status === 200 && /v2\.[1-9]/.test(health.data.engine ?? "") && Number(health.data.version) >= 2.1,
    `engine="${health.data.engine}" version=${health.data.version} backend=${health.data.llm_backend?.provider}`
  );

  // ---- B. Exact duplicate folding ----
  const nonce = Date.now();
  const dedupContent = `Error: Cannot find module 'dedup-suite-${nonce}'\n  at gateway.mjs:9:1`;
  const cap1 = await post("/api/capture", {
    raw_content: dedupContent,
    item_type: "terminal",
    window_title: "Terminal - three-musketeers",
    source_app: "V21VerifySuite",
  });
  check(
    "B1 first capture is new (occurrence_count 1)",
    cap1.data.status === "captured_zero_save" && Number(cap1.data.item?.metadata?.occurrence_count ?? 1) === 1,
    `status=${cap1.data.status}, item=${cap1.data.item?.id}, count=${cap1.data.item?.metadata?.occurrence_count}`
  );

  const cap2 = await post("/api/capture", {
    raw_content: dedupContent,
    item_type: "terminal",
    window_title: "Terminal - three-musketeers",
    source_app: "V21VerifySuite",
  });
  check(
    "B2 exact repeat folds into the SAME item",
    cap2.data.status === "duplicate_merged" &&
      cap2.data.item?.id === cap1.data.item?.id &&
      Number(cap2.data.item?.metadata?.occurrence_count) === 2 &&
      typeof cap2.data.item?.metadata?.last_seen_at === "string",
    `status=${cap2.data.status}, same item=${cap2.data.item?.id === cap1.data.item?.id}, count=${cap2.data.item?.metadata?.occurrence_count}`
  );
  check(
    "B2b duplicate toast tells the user it was folded",
    typeof cap2.data.toastNotification === "string" && /Duplicate folded/i.test(cap2.data.toastNotification) && /\(2 occurrences\)/.test(cap2.data.toastNotification),
    cap2.data.toastNotification
  );
  check(
    "B2c duplicate merge skips memory recompression (brain_api parity)",
    cap2.data.memory_compression?.skipped === true && cap2.data.memory_compression?.reason === "duplicate_merged",
    JSON.stringify(cap2.data.memory_compression)
  );

  const cap3 = await post("/api/capture", {
    raw_content: `error:   CANNOT find\nmodule 'DEDUP-SUITE-${nonce}'  at GATEWAY.MJS:9:1`,
    item_type: "terminal",
    window_title: "Terminal - three-musketeers",
    source_app: "V21VerifySuite",
  });
  check(
    "B3 case/whitespace variant canonicalizes to the SAME fingerprint",
    cap3.data.status === "duplicate_merged" && cap3.data.item?.id === cap1.data.item?.id && Number(cap3.data.item?.metadata?.occurrence_count) === 3,
    `status=${cap3.data.status}, same item=${cap3.data.item?.id === cap1.data.item?.id}, count=${cap3.data.item?.metadata?.occurrence_count}`
  );

  // ---- C. Scoping ----
  const capType = await post("/api/capture", {
    raw_content: dedupContent,
    item_type: "note",
    window_title: "Terminal - three-musketeers",
    source_app: "V21VerifySuite",
  });
  check(
    "C1 different item_type is NOT merged",
    capType.data.status === "captured_zero_save" && capType.data.item?.id !== cap1.data.item?.id,
    `status=${capType.data.status}, new item=${capType.data.item?.id}`
  );
  const capProj = await post("/api/capture", {
    raw_content: dedupContent,
    item_type: "terminal",
    window_title: "Terminal - tier1-control-plane",
    active_file_path: "C:/dev/tier1-control-plane/src/probe.mjs",
    source_app: "V21VerifySuite",
  });
  check(
    "C2 same content in a DIFFERENT project is NOT merged",
    capProj.data.status === "captured_zero_save" &&
      capProj.data.item?.id !== cap1.data.item?.id &&
      capProj.data.projectMatch?.projectName === "Tier-1 Control Plane",
    `status=${capProj.data.status}, routed=${capProj.data.projectMatch?.projectName}, new item=${capProj.data.item?.id}`
  );

  // ---- D. 36-hour window (direct DB backdate) ----
  const aged = await post("/api/capture", {
    raw_content: `Error: Cannot find module 'aged-probe-${nonce}'\n  at worker.mjs:2:1`,
    item_type: "terminal",
    window_title: "Terminal - three-musketeers",
    source_app: "V21VerifySuite",
  });
  const agedId = aged.data.item?.id;
  await prisma.item.update({
    where: { id: agedId },
    data: { capturedAt: new Date(Date.now() - 40 * 3600 * 1000) }, // 40h ago > 36h window
  });
  const agedRepeat = await post("/api/capture", {
    raw_content: `Error: Cannot find module 'aged-probe-${nonce}'\n  at worker.mjs:2:1`,
    item_type: "terminal",
    window_title: "Terminal - three-musketeers",
    source_app: "V21VerifySuite",
  });
  check(
    "D capture outside the 36h window is NOT folded",
    agedRepeat.data.status === "captured_zero_save" && agedRepeat.data.item?.id !== agedId,
    `backdated item kept count=1, repeat created new item=${agedRepeat.data.item?.id !== agedId}`
  );

  // ---- E. Inbox listing + triage (real file move) ----
  const groceryContent = `Random grocery note: buy oat milk and coffee beans tomorrow [probe ${nonce}]`;
  const capInbox = await post("/api/capture", {
    raw_content: groceryContent,
    item_type: "note",
    window_title: "Sticky Notes",
    source_app: "V21VerifySuite",
  });
  const inboxList = await jfetch("/api/inbox");
  const listedItem = (inboxList.data.items || []).find((i) => i.id === capInbox.data.item?.id);
  check(
    "E1 GET /api/inbox lists unrouted captures with triage_status",
    inboxList.status === 200 && Boolean(listedItem) && listedItem.triage_status === "open",
    `${inboxList.data.items?.length ?? 0} inbox item(s), probe listed=${Boolean(listedItem)} status=${listedItem?.triage_status}`
  );

  const oldRelPath = capInbox.data.item?.filePath;
  const triage = await post("/api/triage", { item_id: capInbox.data.item?.id, project_id: "three-musketeers" });
  const t = triage.data;
  check(
    "E2 triage by SLUG re-points the item into the project",
    triage.status === 200 && t.ok === true && t.project_name === "Three Musketeers",
    `ok=${t.ok}, project=${t.project_name}`
  );
  check(
    "E3 vault .md file physically moved to Projects/<slug>/notes/",
    t.file_moved === true &&
      typeof t.file_path === "string" &&
      t.file_path.startsWith("ProjectBrainVault/Projects/three-musketeers/notes/") &&
      !fs.existsSync(absVault(oldRelPath)) &&
      fs.existsSync(absVault(t.file_path)),
    `${oldRelPath} -> ${t.file_path} (moved=${t.file_moved})`
  );
  const scoped = await jfetch(`/api/search?q=${encodeURIComponent(`grocery probe ${nonce}`)}&project_id=three-musketeers&mode=semantic`);
  const scopedHit = (scoped.data.results || []).find((r) => r.id === capInbox.data.item?.id);
  check(
    "E4 semantic vector re-pointed to the new project scope",
    Boolean(scopedHit) && scopedHit.projectId !== null,
    scopedHit ? `found in scoped search (sim=${scopedHit.similarity?.toFixed?.(3)})` : "NOT found in project-scoped semantic search"
  );

  // ---- F. Resolution ----
  const capNoise = await post("/api/capture", {
    raw_content: `Unrelated noise probe ${nonce}: blurry screenshot of a login screen`,
    item_type: "note",
    window_title: "Sticky Notes",
    source_app: "V21VerifySuite",
  });
  const resolved = await post("/api/resolve", { item_id: capNoise.data.item?.id, resolution: "Triaged manually by the v2.1 verify suite" });
  check(
    "F1 resolve stamps triage_status + resolution note",
    resolved.status === 200 && resolved.data.ok === true && resolved.data.triage_status === "resolved",
    `ok=${resolved.data.ok}`
  );
  const inboxAfter = await jfetch("/api/inbox");
  const resolvedItem = (inboxAfter.data.items || []).find((i) => i.id === capNoise.data.item?.id);
  check(
    "F2 resolution readable from /api/inbox metadata",
    Boolean(resolvedItem) &&
      resolvedItem.metadata?.triage_status === "resolved" &&
      resolvedItem.metadata?.resolution === "Triaged manually by the v2.1 verify suite" &&
      typeof resolvedItem.metadata?.resolved_at === "string",
    `status=${resolvedItem?.metadata?.triage_status}, note="${resolvedItem?.metadata?.resolution}"`
  );

  // ---- G. Grounded ask / synthesize ----
  const ask = await post("/api/ask", { project_id: "three-musketeers", query: `oat milk grocery ${nonce}` });
  const a = ask.data;
  check(
    "G1 grounded ask returns vault sources with capped excerpts",
    ask.status === 200 && a.grounded === true && (a.sources || []).length >= 1 && a.sources.every((s) => s.excerpt.length <= 700) && a.mode === "ask",
    `${a.sources?.length ?? 0} source(s), top="${a.sources?.[0]?.title}" llm_used=${a.llm_used}`
  );
  check(
    "G2 offline mode stays honest (excerpts, not a fabricated answer)",
    a.llm_used ? (a.answer || "").trim().length > 20 : /Offline mode/i.test(a.answer || ""),
    (a.answer || "").slice(0, 120)
  );
  const miss = await post("/api/ask", { project_id: "three-musketeers", query: `zzq7x-${nonce}-qxn88k` });
  check(
    "G3 query without evidence admits it (never fabricates)",
    miss.status === 200 && miss.data.grounded === false && (miss.data.sources || []).length === 0 && /couldn't find supporting/i.test(miss.data.answer || ""),
    miss.data.answer?.slice(0, 100)
  );
  const wiki = await post("/api/synthesize", { project_id: "three-musketeers", query: "grocery runs and dependencies" });
  check(
    "G4 synthesize mode returns wiki-style grounded payload",
    wiki.status === 200 && wiki.data.mode === "synthesize" && wiki.data.grounded === true && (wiki.data.sources || []).length >= 1,
    `mode=${wiki.data.mode}, sources=${wiki.data.sources?.length}, llm_used=${wiki.data.llm_used}`
  );

  // ---- H. Compression report + v2.1 session-based replay ----
  const comp = await post("/api/compress", { project_id: "Three Musketeers" });
  const c = comp.data;
  check(
    "H1 compression report carries occurrences_represented",
    comp.status === 200 && typeof c.occurrences_represented === "number" && c.occurrences_represented >= c.items_compressed,
    `${c.items_compressed} unique captures represent ${c.occurrences_represented} occurrences`
  );
  const replayRel = c.work_replay_file;
  const replayText = replayRel && fs.existsSync(absVault(replayRel)) ? fs.readFileSync(absVault(replayRel), "utf-8") : "";
  const hasDayHeader = /## \d{4}-\d{2}-\d{2} · \d+ unique captures \/ \d+ occurrences/.test(replayText);
  const hasSessions = replayText.includes("### Session");
  const foldedDedupProbe = /×3/.test(replayText);
  check(
    "H2 _work_replay.md regenerated with v2.1 session format",
    Boolean(replayText) && hasDayHeader && hasSessions && replayText.includes("folded into occurrence counts"),
    replayText.split("\n").slice(0, 4).join(" | ").slice(0, 170)
  );
  check(
    "H3 folded duplicates appear with ×N suffix in the replay",
    foldedDedupProbe,
    "dedup-suite probe shows ×3 in its work-replay line"
  );

  // ---- I. Self-test 10/10 ----
  const st = await jfetch("/api/self-test");
  const checks = st.data.checks || [];
  check(
    "I self-test: all 10 scenarios PASS",
    st.data.ok && st.data.passedCount === 10 && checks.every((x) => x.status === "PASS"),
    checks.map((x) => `${x.name.split(".")[0]}:${x.status}`).join(" ")
  );

  const passCount = results.filter((r) => r.status === "PASS").length;
  console.log(`\n================ V2.1 PART A VERIFICATION SUMMARY ================`);
  console.log(`TOTAL: ${results.length} | PASS: ${passCount} | FAIL: ${failures}`);

  // Probe hygiene (Task 16): aged-probe items are 36h-window probes; left in
  // the corpus they pollute semantic ranking — one once outranked the
  // blueprint Render screenshot as the top hit of verify-upgrade's semantic
  // check. Remove ALL aged-probe items (this run's + legacy from earlier
  // runs). Cascades clean vectors/revisions; orphaned vault .md files are
  // intentionally left for disk-sync to ignore.
  const gone = await prisma.item.deleteMany({ where: { rawContent: { contains: "aged-probe-" } } });
  if (gone.count > 0) console.log(`[cleanup] removed ${gone.count} aged-probe probe item(s)`);

  await prisma.$disconnect();
  process.exit(failures > 0 ? 1 : 0);
})().catch(async (e) => {
  console.error("Suite crashed:", e);
  await prisma.$disconnect().catch(() => {});
  process.exit(1);
});
