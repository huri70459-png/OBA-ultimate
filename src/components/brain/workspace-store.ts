"use client";

// Workspace state — zustand store for Project Brain OS UI.
// Client-side/UI state lives here; SERVER state flows through TanStack Query
// (blueprint "Centralized State Management") — queries are invalidated via the
// module-level queryClient after store mutations.

import { create } from "zustand";
import { apiGet, apiPost } from "@/lib/api-client";
import { invalidate } from "@/lib/query-client";
import type { BrainProject, CompressionReport, LlmBackend, ProjectDetails } from "@/lib/brain/types";

export type WorkspaceTab = "dashboard" | "vault" | "timeline" | "graph" | "context";

/** Monotonic id for loadDetails requests — only the latest may touch state. */
let latestDetailsRequestId = 0;

interface DialogState {
  captureOpen: boolean;
  newProjectOpen: boolean;
  decisionOpen: boolean;
  searchOpen: boolean;
  selfTestOpen: boolean;
  settingsOpen: boolean;
  feedbackOpen: boolean; // v2.4: in-app feedback widget (blueprint "User Feedback Collection")
}

interface WorkspaceState extends DialogState {
  booted: boolean;
  bootError: string | null;
  projects: BrainProject[];
  selectedId: string | null; // project id or "inbox"
  details: ProjectDetails | null;
  loadingDetails: boolean;
  compressing: boolean;
  tab: WorkspaceTab;
  searchSeed: string;
  llmBackend: LlmBackend | null; // detected AI backend (v2 HybridLLMBridge)

  bootstrap: () => Promise<void>;
  loadProjects: () => Promise<void>;
  selectProject: (id: string) => void;
  loadDetails: (id?: string) => Promise<void>;
  refreshAll: () => Promise<void>;
  compressMemory: () => Promise<CompressionReport | null>;
  setTab: (t: WorkspaceTab) => void;
  openDialog: (d: keyof DialogState) => void;
  closeDialog: (d: keyof DialogState) => void;
  openSearch: (seed?: string) => void;
}

export const useWorkspace = create<WorkspaceState>((set, get) => ({
  booted: false,
  bootError: null,
  projects: [],
  selectedId: null,
  details: null,
  loadingDetails: false,
  compressing: false,
  tab: "dashboard",
  searchSeed: "",
  llmBackend: null,
  captureOpen: false,
  newProjectOpen: false,
  decisionOpen: false,
  searchOpen: false,
  selfTestOpen: false,
  settingsOpen: false,
  feedbackOpen: false,

  bootstrap: async () => {
    try {
      // GET /health triggers first-boot seeding (3 projects + demo captures)
      // and reports the detected AI backend (Ollama / Cloud / Offline Synthesizer)
      const health = await apiGet<{ status: string; llm_backend?: LlmBackend }>("/api/health");
      set({ llmBackend: health.llm_backend ?? null });
      await get().loadProjects();
      const first = get().projects[0];
      if (first) {
        set({ selectedId: first.id });
        await get().loadDetails(first.id);
      }
      set({ booted: true });
    } catch (e) {
      set({ booted: true, bootError: e instanceof Error ? e.message : "Boot failed" });
    }
  },

  loadProjects: async () => {
    try {
      const data = await apiGet<{ projects: BrainProject[] }>("/api/projects");
      set({ projects: data.projects });
    } catch {
      set({ projects: [] });
    }
  },

  selectProject: (id) => {
    set({ selectedId: id });
    void get().loadDetails(id);
  },

  loadDetails: async (id) => {
    const target = id ?? get().selectedId;
    if (!target) return;
    // v2.5: request-id guard — when the user switches projects rapidly, a slow
    // response for an OLD project must never overwrite the details of the
    // currently selected one (out-of-order fetch race).
    const requestId = ++latestDetailsRequestId;
    set({ loadingDetails: true });
    try {
      const data = await apiGet<ProjectDetails>(`/api/projects/${target}`);
      if (requestId !== latestDetailsRequestId || get().selectedId !== target) return; // stale
      set({ details: data, loadingDetails: false });
    } catch {
      if (requestId !== latestDetailsRequestId) return; // a newer request owns the state
      set({ details: null, loadingDetails: false });
    }
  },

  refreshAll: async () => {
    await get().loadProjects();
    await get().loadDetails();
    invalidate(["dashboard"]); // bento counters reflect the mutation immediately
  },

  compressMemory: async () => {
    if (get().compressing) return null;
    set({ compressing: true });
    try {
      const report = await apiPost<CompressionReport>("/api/daemon");
      await get().refreshAll();
      return report;
    } catch {
      return null;
    } finally {
      set({ compressing: false });
    }
  },

  setTab: (tab) => set({ tab }),

  openDialog: (d) => set({ [d]: true } as Partial<WorkspaceState>),
  closeDialog: (d) => set({ [d]: false } as Partial<WorkspaceState>),
  openSearch: (seed = "") => set({ searchSeed: seed, searchOpen: true }),
}));
