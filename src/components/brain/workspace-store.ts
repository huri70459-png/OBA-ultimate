"use client";

// Workspace state — zustand store for Project Brain OS UI

import { create } from "zustand";
import type { BrainProject, CompressionReport, ProjectDetails } from "@/lib/brain/types";

export type WorkspaceTab = "vault" | "timeline" | "graph" | "context";

interface DialogState {
  captureOpen: boolean;
  newProjectOpen: boolean;
  decisionOpen: boolean;
  searchOpen: boolean;
  selfTestOpen: boolean;
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

async function jsonFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json() as Promise<T>;
}

export const useWorkspace = create<WorkspaceState>((set, get) => ({
  booted: false,
  bootError: null,
  projects: [],
  selectedId: null,
  details: null,
  loadingDetails: false,
  compressing: false,
  tab: "vault",
  searchSeed: "",
  captureOpen: false,
  newProjectOpen: false,
  decisionOpen: false,
  searchOpen: false,
  selfTestOpen: false,

  bootstrap: async () => {
    try {
      // GET /health triggers first-boot seeding (3 projects + demo captures)
      await jsonFetch("/api/health");
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
      const data = await jsonFetch<{ projects: BrainProject[] }>("/api/projects");
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
    set({ loadingDetails: true });
    try {
      const data = await jsonFetch<ProjectDetails>(`/api/projects/${target}`);
      set({ details: data, loadingDetails: false });
    } catch {
      set({ details: null, loadingDetails: false });
    }
  },

  refreshAll: async () => {
    await get().loadProjects();
    await get().loadDetails();
  },

  compressMemory: async () => {
    if (get().compressing) return null;
    set({ compressing: true });
    try {
      const res = await fetch("/api/daemon", { method: "POST" });
      if (!res.ok) throw new Error(`daemon -> ${res.status}`);
      const report = (await res.json()) as CompressionReport;
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
