// Project Brain OS — v2.4 Self-Hosted Feature Flags
//
// The blueprint ("Feature Flags", "A/B Testing") asked for LaunchDarkly/ConfigCat.
// No external SaaS in this deployment, so flags live in the SAME Setting table the
// v2.2 runtime config uses (key prefix "flag."), with identical semantics:
//
//   - code-defined registry  : id, description, default, rollout %, owner of effect
//   - persisted override     : Setting row `flag.<id>` = {"enabled":bool,"rollout":n}
//   - env override           : BRAIN_FLAG_<ID> = "on"|"off" (ops escape hatch)
//   - deterministic rollout  : % rollout hashes (subject + flagId) — a given subject
//                              always lands in the same bucket (stable A/B assignment)
//   - kill switches          : ops.telemetry_ingest gates /api/metrics POST SERVER-SIDE,
//                              so a noisy telemetry channel can be silenced from the
//                              UI without a redeploy (blueprint "Kill Switches").
//
// Flags default to CURRENT behavior, so enabling/disabling never changes the
// regression board's contract — they gate enhancement surfaces only.

import { createHash } from "node:crypto";
import { db } from "@/lib/db";

export interface FlagDef {
  id: string;
  description: string;
  defaultEnabled: boolean;
  /** Percentage of subjects this flag applies to (100 = full on when enabled). */
  rollout: number;
  /** Where the flag takes effect — surfaced in the Settings panel. */
  surface: string;
}

export const FLAG_DEFS: FlagDef[] = [
  {
    id: "ops.telemetry_ingest",
    description: "Accept telemetry ingests (web vitals, events, API timings) via POST /api/metrics",
    defaultEnabled: true,
    rollout: 100,
    surface: "Server — /api/metrics ingest (kill switch)",
  },
  {
    id: "ui.bento_stagger",
    description: "Staggered entrance animation for the Bento dashboard cards (framer-motion)",
    defaultEnabled: true,
    rollout: 100,
    surface: "Dashboard view",
  },
  {
    id: "vault.cross_project_fixes",
    description: "Cross-Project Fixes mode in the search dialog (reusable fixes from other projects)",
    defaultEnabled: true,
    rollout: 100,
    surface: "Search dialog",
  },
];

export interface FlagView {
  id: string;
  description: string;
  surface: string;
  enabled: boolean;
  rollout: number;
  /** Where the current value came from. */
  source: "stored" | "env" | "default";
}

interface FlagOverride {
  enabled?: boolean;
  rollout?: number;
}

const FLAG_PREFIX = "flag.";

function envOverride(id: string): "on" | "off" | null {
  const raw = process.env[`BRAIN_FLAG_${id.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}`];
  if (raw === "on" || raw === "true" || raw === "1") return "on";
  if (raw === "off" || raw === "false" || raw === "0") return "off";
  return null;
}

function defFor(id: string): FlagDef | null {
  return FLAG_DEFS.find((f) => f.id === id) ?? null;
}

/** Effective view of every flag (registry order, defaults unless overridden). */
export async function getFlags(): Promise<FlagView[]> {
  const rows = await db.setting
    .findMany({ where: { key: { startsWith: FLAG_PREFIX } } })
    .catch(() => []);
  const stored = new Map<string, FlagOverride>();
  for (const row of rows) {
    try {
      stored.set(row.key.slice(FLAG_PREFIX.length), JSON.parse(row.value) as FlagOverride);
    } catch {
      // Corrupt row -> ignore, fall back to default.
    }
  }
  return FLAG_DEFS.map((def) => {
    const env = envOverride(def.id);
    const over = stored.get(def.id);
    if (over && typeof over.enabled === "boolean") {
      return {
        ...def,
        enabled: over.enabled,
        rollout: clampRollout(over.rollout ?? def.rollout),
        source: "stored" as const,
      };
    }
    if (env) {
      return { ...def, enabled: env === "on", rollout: def.rollout, source: "env" as const };
    }
    return { ...def, enabled: def.defaultEnabled, rollout: def.rollout, source: "default" as const };
  });
}

export async function isFlagEnabled(id: string, subject?: string): Promise<boolean> {
  const view = (await getFlags()).find((f) => f.id === id);
  if (!view || !view.enabled) return false;
  if (view.rollout >= 100) return true;
  if (view.rollout <= 0) return false;
  return bucketFor(id, subject ?? "anonymous") < view.rollout;
}

/** Deterministic 0..99 bucket for a (flag, subject) pair — stable A/B assignment. */
export function bucketFor(flagId: string, subject: string): number {
  const h = createHash("sha256").update(`${flagId}::${subject}`).digest();
  return h[0] % 100;
}

export async function writeFlag(
  id: string,
  patch: { enabled?: boolean; rollout?: number }
): Promise<FlagView | null> {
  const def = defFor(id);
  if (!def) return null;
  const current = (await getFlags()).find((f) => f.id === id) ?? {
    enabled: def.defaultEnabled,
    rollout: def.rollout,
  };
  const next: Required<FlagOverride> = {
    enabled: typeof patch.enabled === "boolean" ? patch.enabled : current.enabled,
    rollout: patch.rollout !== undefined ? clampRollout(patch.rollout) : current.rollout,
  };
  await db.setting.upsert({
    where: { key: `${FLAG_PREFIX}${id}` },
    create: { key: `${FLAG_PREFIX}${id}`, value: JSON.stringify(next) },
    update: { value: JSON.stringify(next) },
  });
  return { ...def, ...next, source: "stored" };
}

export async function clearFlag(id: string): Promise<boolean> {
  const def = defFor(id);
  if (!def) return false;
  await db.setting.deleteMany({ where: { key: `${FLAG_PREFIX}${id}` } });
  return true;
}

function clampRollout(n: unknown): number {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return 100;
  return Math.max(0, Math.min(100, v));
}
