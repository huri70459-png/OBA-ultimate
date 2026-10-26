"use client";

// telemetry — blueprint "Analytics and Insights / Event Tracking", self-hosted.
// Instead of GA4/Mixpanel/Amplitude, product events POST as JSON lines to
// /api/metrics and land in logs/metrics.jsonl next to the engine that produced
// them. Fire-and-forget everywhere: telemetry must never alter UX or throw.

export interface TelemetryEvent {
  type: "event";
  name: string;
  props?: Record<string, string | number | boolean>;
}

function post(payload: unknown): void {
  if (typeof window === "undefined") return;
  try {
    void fetch("/api/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Telemetry is best-effort — silently dropped on failure.
    });
  } catch {
    // Same contract: never throw from telemetry.
  }
}

/** Product event (capture saved, chat answered, feedback sent, …). */
export function trackEvent(name: string, props?: Record<string, string | number | boolean>): void {
  post({ type: "event", name, props } satisfies TelemetryEvent);
}

/** Core Web Vitals sample (wired through useReportWebVitals in Providers). */
export function trackWebVital(sample: {
  name: string;
  value: number;
  rating?: string;
}): void {
  post({
    type: "web_vital",
    name: sample.name,
    value: Math.round(sample.value),
    rating: sample.rating ?? "",
    path: typeof window !== "undefined" ? window.location.pathname : "/",
  });
}
