"use client";

// apiClient — centralized API client (blueprint: "API Integration and Data Layer",
// adapted from axios interceptors to a typed fetch wrapper so no new dependency
// is introduced — same guarantees, smaller bundle):
//
//   - request interceptor  : JSON headers + same-origin credentials on every call
//   - response interceptor : on 401, attempt ONE /api/auth/refresh then replay the
//                            original request (refresh-token flow, cookie-based)
//   - error normalization  : every failure throws BrainApiError { status, message }
//   - auth expiry event    : final 401 dispatches "brain:auth-expired" so the
//                            AuthGate can show the login card (no circular imports)
//   - API timing telemetry : v2.4 — slow (>400ms) or failing calls report an
//                            api_timing sample to /api/metrics (blueprint
//                            "component rendering performance / API response
//                            times"), never for /api/metrics itself

export class BrainApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "BrainApiError";
    this.status = status;
  }
}

export const AUTH_EXPIRED_EVENT = "brain:auth-expired";

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Retries after a successful token refresh (internal; do not set manually). */
  _retried?: boolean;
}

let refreshInFlight: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch("/api/auth/refresh", { method: "POST", credentials: "same-origin" })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        // Clear on next microtask so concurrent 401s share one refresh call.
        setTimeout(() => {
          refreshInFlight = null;
        }, 0);
      });
  }
  return refreshInFlight;
}

/** Fire-and-forget api_timing sample (slow or failing calls only). */
function reportTiming(url: string, method: string, ms: number, status: number): void {
  if (url.startsWith("/api/metrics")) return; // never recurse
  try {
    void fetch("/api/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "api_timing", route: `${method} ${url}`, ms, status }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Telemetry must never throw.
  }
}

export async function apiFetch<T>(url: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = "GET", body, _retried = false } = options;
  const startedAt = typeof performance !== "undefined" ? performance.now() : 0;
  const res = await fetch(url, {
    method,
    credentials: "same-origin",
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (res.status === 401 && _retried === false && !url.startsWith("/api/auth/")) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      return apiFetch<T>(url, { ...options, _retried: true });
    }
    // Refresh failed: the session is genuinely over — surface it to the gate.
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
    }
  }

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON body — fall through to the status check below.
  }

  if (!res.ok) {
    let message = `${url} -> ${res.status}`;
    if (data && typeof data === "object" && "error" in data) {
      const errText = String((data as { error: unknown }).error);
      if (errText) message = errText;
    }
    if (startedAt) reportTiming(url, method, performance.now() - startedAt, res.status);
    throw new BrainApiError(res.status, message);
  }
  if (startedAt) {
    const ms = performance.now() - startedAt;
    if (ms > 400) reportTiming(url, method, ms, res.status); // slow-call observability
  }
  return data as T;
}

/** Convenience verbs mirroring the blueprint's apiClient surface. */
export const apiGet = <T,>(url: string) => apiFetch<T>(url);
export const apiPost = <T,>(url: string, body?: unknown) => apiFetch<T>(url, { method: "POST", body });
export const apiPut = <T,>(url: string, body?: unknown) => apiFetch<T>(url, { method: "PUT", body });
export const apiPatch = <T,>(url: string, body?: unknown) => apiFetch<T>(url, { method: "PATCH", body });
export const apiDelete = <T,>(url: string) => apiFetch<T>(url, { method: "DELETE" });
