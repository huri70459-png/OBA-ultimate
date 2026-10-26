// Project Brain OS — First-Boot Seed Data (port of brain_api.py::ensure_seed_data)
// Seeds 3 projects + 2 demo captures so the workspace is populated in 5 seconds.

import { db } from "@/lib/db";
import { backfillVaultSyncStatus, getAllProjects, upsertProject } from "./store";
import { capture } from "./pipeline";

export async function ensureSeedData(): Promise<void> {
  const existing = await getAllProjects();
  if (existing.length > 0) return;

  await upsertProject({
    name: "Three Musketeers",
    rootPath: "C:/dev/three-musketeers",
    keywords: ["three-musketeers", "gateway.mjs", "render", "deployment", "dotenv"],
    gitRemotes: ["github.com/shaan/three-musketeers"],
    rollingSummary:
      "Multi-agent gateway service deployed on Render. Uses pnpm workspaces and gateway.mjs entrypoint.",
  });

  await upsertProject({
    name: "Tier-1 Control Plane",
    rootPath: "C:/dev/tier1-control-plane",
    keywords: ["tier-1", "control-plane", "browser-repair", "playwright", "mcp"],
    gitRemotes: ["github.com/shaan/tier1-control-plane"],
    rollingSummary:
      "Dependency-light Python control plane for browser-repair workflows, automated model routing, and MCP tools.",
  });

  await upsertProject({
    name: "Project Brain OS",
    rootPath: "C:/dev/project-brain-os",
    keywords: ["project-brain", "sqlite_store.py", "brain_api.py", "obsidian", "notebooklm", "zero-save"],
    gitRemotes: ["github.com/shaan/project-brain-os"],
    rollingSummary:
      "Universal Knowledge Capture, Project Memory, Decision Graph, and Context Injection OS.",
  });

  await capture({
    rawContent:
      "Error: Cannot find module 'dotenv'\n    at Function.Module._resolveFilename (gateway.mjs:14:2)",
    itemType: "screenshot",
    windowTitle: "Terminal - node gateway.mjs",
    sourceApp: "Windows Terminal",
    visualHint:
      "Red terminal deployment error logs from Render showing missing dotenv module in gateway.mjs",
  });

  await capture({
    rawContent:
      "Decision: Use SQLite + FTS5 instead of standalone Neo4j server\n" +
      "Alternatives: Neo4j Desktop, Docker Postgres\n" +
      "Reason: Keeps Project Brain OS dependency-light and portable with zero external DB daemons.",
    itemType: "note",
    windowTitle: "architecture.md - Project Brain OS",
    activeFilePath: "C:/dev/project-brain-os/docs/architecture.md",
    sourceApp: "Workspace Editor",
  });
}

/** Lazily invoked per request; memoized after first successful run. */
let seedPromise: Promise<void> | null = null;
export function ensureSeedDataOnce(): Promise<void> {
  if (!seedPromise) {
    seedPromise = ensureSeedData()
      .then(async () => {
        await backfillVaultSyncStatus(); // v2.6: settle pending vault-sync rows (runs once per boot, never throws)
      })
      .catch((err) => {
        seedPromise = null;
        throw err;
      });
  }
  return seedPromise;
}

/** Used by self-test to verify pipeline end-to-end. */
export async function countProjects(): Promise<number> {
  return db.project.count();
}
