"use client";

// authStore — blueprint authStore (Zustand + persist), adapted to cookie
// sessions: the JWT itself lives in an httpOnly cookie (never in localStorage),
// so the store persists only the non-sensitive user PROFILE for instant UI
// paint; /api/auth/session is always re-verified on boot by the AuthGate.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiPost } from "@/lib/api-client";

export type UserRole = "owner" | "editor" | "viewer";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

/** Which card the AuthGate renders. */
export type AuthGateStatus = "checking" | "open" | "setup" | "locked" | "authenticated";

interface AuthState {
  status: AuthGateStatus;
  user: AuthUser | null;
  error: string | null;
  busy: boolean;
  setSession: (payload: {
    mode: "open" | "enforced";
    authenticated: boolean;
    needs_setup: boolean;
    user: AuthUser | null;
  }) => void;
  setup: (input: { name: string; email: string; password: string }) => Promise<boolean>;
  login: (input: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: "checking",
      user: null,
      error: null,
      busy: false,

      setSession: ({ mode, authenticated, needs_setup, user }) => {
        if (mode === "open") set({ status: "open", user: null, error: null });
        else if (authenticated && user) set({ status: "authenticated", user, error: null });
        else set({ status: needs_setup ? "setup" : "locked", user: null, error: null });
      },

      setup: async (input) => {
        set({ busy: true, error: null });
        try {
          const res = await apiPost<{ ok: boolean; user: AuthUser }>("/api/auth/setup", input);
          set({ status: "authenticated", user: res.user, busy: false });
          return true;
        } catch (e) {
          set({ busy: false, error: e instanceof Error ? e.message : "Setup failed" });
          return false;
        }
      },

      login: async (input) => {
        set({ busy: true, error: null });
        try {
          const res = await apiPost<{ ok: boolean; user: AuthUser }>("/api/auth/login", input);
          set({ status: "authenticated", user: res.user, busy: false });
          return true;
        } catch (e) {
          set({ busy: false, error: e instanceof Error ? e.message : "Login failed" });
          return false;
        }
      },

      logout: async () => {
        try {
          await apiPost("/api/auth/logout");
        } finally {
          set({ status: "locked", user: null, error: null });
        }
      },
    }),
    {
      name: "brain-os-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }) as AuthState,
    },
  ),
);

/** RBAC helpers shared by the UI. */
export const useCanEdit = () => {
  const role = useAuthStore((s) => s.user?.role);
  return role !== "viewer"; // null role = open mode = full access (pre-auth parity)
};
