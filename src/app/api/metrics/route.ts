// v2.4 (blueprint "Monitoring / Custom Metrics + Event Tracking", self-hosted) —
// telemetry ingest + aggregation.
//
//   POST  { type: "web_vital" | "event" | "api_timing", ... }  -> logs/metrics.jsonl
//   GET   aggregated summary (counts, vital averages, top events, slow routes)
//
// The ingest is gated by the `ops.telemetry_ingest` feature flag — a real,
// server-side kill switch: flipping it in Settings silences the channel on the
// very next request with no redeploy.

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { appendJsonl, jsonlBytes, readJsonlTail } from "@/lib/jsonl";
import { isFlagEnabled } from "@/lib/feature-flags";

export const dynamic = "force-dynamic";

const METRICS_FILE = "metrics.jsonl";
const MAX_LINE_BYTES = 4096;

type MetricRecord =
  | { type: "web_vital"; name: string; value: number; rating?: string; path?: string }
  | { type: "event"; name: string; props?: Record<string, string | number | boolean> }
  | { type: "api_timing"; route: string; ms: number; status: number };

const str = (v: unknown, cap: number): string => String(v ?? "").slice(0, cap);

function sanitize(body: Record<string, unknown>): MetricRecord | null {
  const type = str(body.type, 20);
  if (type === "web_vital") {
    const value = Number(body.value);
    if (!Number.isFinite(value)) return null;
    return {
      type,
      name: str(body.name, 20),
      value: Math.max(0, Math.min(600_000, Math.round(value))),
      rating: str(body.rating, 12),
      path: str(body.path, 200),
    };
  }
  if (type === "event") {
    const name = str(body.name, 60).trim();
    if (!name) return null;
    const props: Record<string, string | number | boolean> = {};
    const raw = body.props;
    if (raw && typeof raw === "object") {
      for (const [k, v] of Object.entries(raw as Record<string, unknown>).slice(0, 8)) {
        const key = str(k, 40);
        if (!key) continue;
        if (typeof v === "number" && Number.isFinite(v)) props[key] = v;
        else if (typeof v === "boolean") props[key] = v;
        else if (typeof v === "string") props[key] = v.slice(0, 120);
      }
    }
    return { type, name, props };
  }
  if (type === "api_timing") {
    const ms = Number(body.ms);
    if (!Number.isFinite(ms)) return null;
    return {
      type,
      route: str(body.route, 200),
      ms: Math.max(0, Math.min(600_000, Math.round(ms))),
      status: Number(body.status) | 0,
    };
  }
  return null;
}

export async function POST(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: false }); // telemetry: every session may report
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  if (!(await isFlagEnabled("ops.telemetry_ingest"))) {
    // Kill switch engaged — acknowledge silently so fire-and-forget clients stay quiet.
    return NextResponse.json({ ok: false, disabled: true });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const record = sanitize(body);
  if (!record) return NextResponse.json({ error: "Invalid telemetry record" }, { status: 400 });

  const line: Record<string, unknown> = { ts: new Date().toISOString(), ...record };
  if (guard.user) line.user = guard.user.email.slice(0, 120);
  if (JSON.stringify(line).length > MAX_LINE_BYTES) {
    return NextResponse.json({ error: "Telemetry payload too large" }, { status: 413 });
  }
  appendJsonl(METRICS_FILE, line);
  return NextResponse.json({ ok: true });
}

interface VitalAgg {
  name: string;
  count: number;
  avg: number;
  max: number;
  poor: number;
}
interface EventAgg {
  name: string;
  count: number;
  lastAt: string;
}
interface RouteAgg {
  route: string;
  count: number;
  avgMs: number;
  maxMs: number;
  p95Ms: number;
  errors: number;
}

export async function GET(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: false });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  const rows = readJsonlTail(METRICS_FILE, 5000);
  const byType: Record<string, number> = { web_vital: 0, event: 0, api_timing: 0 };

  const vitals = new Map<string, { sum: number; max: number; n: number; poor: number }>();
  const events = new Map<string, { count: number; lastAt: string }>();
  const routes = new Map<string, { sum: number; max: number; n: number; errors: number; samples: number[] }>();

  for (const row of rows) {
    byType[String(row.type)] = (byType[String(row.type)] ?? 0) + 1;
    if (row.type === "web_vital") {
      const name = str(row.name, 20) || "?";
      const value = Number(row.value) || 0;
      const agg = vitals.get(name) ?? { sum: 0, max: 0, n: 0, poor: 0 };
      agg.sum += value;
      agg.n += 1;
      agg.max = Math.max(agg.max, value);
      if (String(row.rating) === "poor") agg.poor += 1;
      vitals.set(name, agg);
    } else if (row.type === "event") {
      const name = str(row.name, 60) || "?";
      const agg = events.get(name) ?? { count: 0, lastAt: "" };
      agg.count += 1;
      agg.lastAt = str(row.ts, 30);
      events.set(name, agg);
    } else if (row.type === "api_timing") {
      const route = str(row.route, 200) || "?";
      const ms = Number(row.ms) || 0;
      const agg = routes.get(route) ?? { sum: 0, max: 0, n: 0, errors: 0, samples: [] as number[] };
      agg.sum += ms;
      agg.n += 1;
      agg.max = Math.max(agg.max, ms);
      if (Number(row.status) >= 400) agg.errors += 1;
      agg.samples.push(ms);
      routes.set(route, agg);
    }
  }

  const webVitals: VitalAgg[] = [...vitals.entries()]
    .map(([name, a]) => ({ name, count: a.n, avg: Math.round(a.sum / a.n), max: a.max, poor: a.poor }))
    .sort((a, b) => b.count - a.count);
  const eventList: EventAgg[] = [...events.entries()]
    .map(([name, a]) => ({ name, count: a.count, lastAt: a.lastAt }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
  const apiTimings: RouteAgg[] = [...routes.entries()]
    .map(([route, a]) => {
      const sorted = [...a.samples].sort((x, y) => x - y);
      const p95 = sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] : 0;
      return { route, count: a.n, avgMs: Math.round(a.sum / a.n), maxMs: a.max, p95Ms: p95, errors: a.errors };
    })
    .sort((a, b) => b.p95Ms - a.p95Ms)
    .slice(0, 10);

  return NextResponse.json({
    total: rows.length,
    by_type: byType,
    file_bytes: jsonlBytes(METRICS_FILE),
    web_vitals: webVitals,
    events: eventList,
    api_timings: apiTimings,
  });
}
