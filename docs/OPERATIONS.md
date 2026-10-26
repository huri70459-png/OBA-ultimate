# Project Brain OS — Monitoring, Telemetry & Feedback Operations

Blueprint source: "Final Stages: Deployment, Monitoring, and Iteration" §2–3
(Monitoring & Alerting, Iteration & Feedback Loop), adapted to a self-hosted
appliance — **no external SaaS has access to the machine**.

## 1. What is monitored where

| Blueprint item | Self-hosted implementation | Where to look |
|---|---|---|
| Uptime monitoring | `GET /api/health` — status, engine version, `uptime_seconds`, `memory_rss_bytes` | point Pingdom/UptimeRobot (or cron+curl) at it; this endpoint IS the probe |
| Error tracking | Global `window.onerror` + `unhandledrejection` → ring buffer → `logs/client.log` (JSONL, 512 KB rotation) | `logs/client.log`, `/api/client-log` |
| APM / Core Web Vitals | `useReportWebVitals` → `POST /api/metrics` (`web_vital` records: LCP, INP/FID, CLS, TTFB, FCP) | `logs/metrics.jsonl` |
| API response times | `api-client` reports every call >400 ms or failing as `api_timing {route, ms, status}` | `logs/metrics.jsonl` |
| Product analytics / event tracking | `trackEvent()` from `src/lib/telemetry.ts` (`capture_saved`, `chat_answer`, `feedback_submitted`, `ui.theme_toggled`) | `logs/metrics.jsonl` |
| Custom dashboards | `GET /api/metrics` aggregates the last 5 000 samples (vital averages/max/poor counts, top events, slowest routes with p95 + errors) + **Settings → Ops & Telemetry panel** | Settings dialog |
| Distributed tracing / RUM | Deferred — single-process appliance; the `api_timing` channel is the seam where a tracer would attach if the app is ever split | — |

All channels are append-only JSONL under `logs/` with 512 KB rotation
(`<file>.old`), implemented once in `src/lib/jsonl.ts` and shared by
client-log, metrics and feedback.

## 2. Feature flags & kill switches (self-hosted LaunchDarkly)

- Registry: `src/lib/feature-flags.ts` — code-defined defaults, persisted
  overrides in the SQLite `Setting` table (`flag.<id>` rows), env escape hatch
  `BRAIN_FLAG_<ID>=on|off`.
- Deterministic %-rollout (stable hash bucketing) is built in for staged
  rollouts and future A/B assignment.
- UI: **Settings → Feature Flags** — owner can toggle/reset; flags apply on the
  next request with no redeploy.
- Current flags:

| Flag | Effect | Default |
|---|---|---|
| `ops.telemetry_ingest` | **Server-side kill switch** for `POST /api/metrics` — silences the telemetry channel instantly | ON |
| `ui.bento_stagger` | Dashboard entrance animations (framer-motion) | ON |
| `vault.cross_project_fixes` | Cross-Project Fixes mode in the search dialog | ON |

Kill-switch drill: Settings → Feature Flags → `ops.telemetry_ingest` OFF →
`POST /api/metrics` answers `{ok:false, disabled:true}` and writes nothing →
flip back ON (or `BRAIN_FLAG_OPS_TELEMETRY_INGEST=off` at the process level).

## 3. Feedback loop (blueprint "User Feedback Collection")

- In-app: Header **MessageSquarePlus** button → category (bug/feature/general)
  + message → `POST /api/feedback` → `logs/feedback.jsonl` (viewer-writable —
  low-friction funnel for every role).
- Review: `GET /api/feedback` (owner-only in enforced mode) returns the newest
  200 entries; the file is plain JSONL for scripting triage.
- Triage cadence: review weekly alongside `logs/client.log` error clusters;
  recurring themes become roadmap items (blueprint "Bug Triage" +
  "Roadmapping").
- `trackEvent("feedback_submitted")` lands in metrics, so feedback volume is
  visible on the same Ops & Telemetry panel.

## 4. Event catalog (analytics contract)

| Event | Props | Emitted when |
|---|---|---|
| `capture_saved` | `status` (saved/duplicate_merged), `item_type` | Zero-Save capture completes |
| `chat_answer` | `mode` (ask/synthesize), `llm_used`, `grounded` | grounded chat answer finishes |
| `feedback_submitted` | `category` | feedback dialog submit |
| `ui.theme_toggled` | `to` (light/dark) | header theme toggle |

Adding a new event: call `trackEvent(name, props)` at the site, and add the row
here — the metrics endpoint aggregates arbitrary names automatically.

## 5. Documentation & knowledge base

- `docs/DEPLOYMENT.md` — branching, pipeline, environments, rollback.
- `docs/OPERATIONS.md` — this runbook.
- API contract: every endpoint is exercised by the 7-suite regression board in
  `scripts/verify-*.mjs` (the board doubles as executable API documentation).
