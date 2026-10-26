"use client";

// AuthGate — route protection for the single-route workspace (blueprint "Route
// Protection", adapted: this deployment exposes ONE visible route, so instead of
// a /login page the gate renders a login/setup card IN PLACE of the workspace).
//
//   checking       → boot spinner
//   open           → workspace (bootstrap semantics: no accounts, regression
//                    suites + desktop agents keep working unchanged)
//   setup          → optional owner-account bootstrap card (skippable)
//   locked         → credential login card (enforced mode)
//   authenticated  → workspace
//
// The store listens for the api-client's "brain:auth-expired" event so a session
// dying mid-use swaps the workspace for the login card immediately.

import { useEffect, useState } from "react";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { apiGet, AUTH_EXPIRED_EVENT } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

interface SessionResponse {
  mode: "open" | "enforced";
  authenticated: boolean;
  needs_setup: boolean;
  user: { id: string; email: string; name: string; role: "owner" | "editor" | "viewer" } | null;
}

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const status = useAuthStore((s) => s.status);
  const busy = useAuthStore((s) => s.busy);
  const error = useAuthStore((s) => s.error);
  const setSession = useAuthStore((s) => s.setSession);
  const setup = useAuthStore((s) => s.setup);
  const login = useAuthStore((s) => s.login);

  const [skipped, setSkipped] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const check = async () => {
      try {
        const data = await apiGet<SessionResponse>("/api/auth/session");
        setSession(data);
      } catch {
        // If the session endpoint itself is unreachable, stay open (pre-auth parity)
        setSession({ mode: "open", authenticated: false, needs_setup: false, user: null });
      }
    };
    void check();

    const onExpired = () => {
      useAuthStore.setState({ status: "locked", user: null, error: null });
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
  }, [setSession]);

  if (status === "open" || status === "authenticated" || (status === "setup" && skipped)) {
    return <>{children}</>;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok =
      status === "setup"
        ? await setup({ name: form.name, email: form.email, password: form.password })
        : await login({ email: form.email, password: form.password });
    if (ok) window.location.reload(); // clean slate: re-boot the workspace authenticated
  };

  return (
    <div className="brain-workspace flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-primary/25 bg-card/70 p-6 shadow-2xl shadow-primary/10 backdrop-blur">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-xl shadow-lg shadow-primary/30">
            🧠
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-foreground">
              PROJECT BRAIN OS
              <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
            </p>
            <p className="text-[11px] text-muted-foreground">
              {status === "setup" ? "First-run protection" : "Authentication required"}
            </p>
          </div>
        </div>

        <h1 className="text-base font-bold text-foreground">
          {status === "setup" ? "Protect your Brain" : "Sign in to Project Brain OS"}
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {status === "setup"
            ? "Create the owner account to require sign-in. You can skip this and stay in trusted local mode."
            : "This workspace is protected — enter your credentials to continue."}
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          {status === "setup" && (
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-muted-foreground">
                Display name
              </span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                autoComplete="name"
                className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium text-muted-foreground">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              autoComplete="email"
              className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium text-muted-foreground">
              Password {status === "setup" && "(min 8 chars)"}
            </span>
            <input
              type="password"
              required
              minLength={status === "setup" ? 8 : undefined}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              autoComplete={status === "setup" ? "new-password" : "current-password"}
              className="w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[11px] text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary-400 disabled:opacity-50"
          >
            {busy ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Working…
              </>
            ) : (
              <>
                <LogIn className="h-3.5 w-3.5" />
                {status === "setup" ? "Create owner account" : "Sign in"}
              </>
            )}
          </button>
        </form>

        {status === "setup" && (
          <button
            onClick={() => setSkipped(true)}
            className="mt-3 w-full text-center text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Continue without protection
          </button>
        )}
      </div>
    </div>
  );
};

export { AuthGate };
