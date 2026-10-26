"use client";

// Client access to the self-hosted feature flags (blueprint "Feature Flags" +
// "Progressive Rollouts"). Server state through TanStack Query; a flag that
// fails to load evaluates to TRUE so gating never regresses existing behavior.

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api-client";

export interface FlagView {
  id: string;
  description: string;
  surface: string;
  enabled: boolean;
  rollout: number;
  source: "stored" | "env" | "default";
}

const useFlagsQuery = () =>
  useQuery({
    queryKey: ["feature-flags"],
    queryFn: () => apiGet<{ flags: FlagView[] }>("/api/feature-flags"),
    staleTime: 15_000,
  });

/** All flags with their current effective state. */
export const useFlags = useFlagsQuery;

/** Enabled-state of one flag; defaults to true while loading or on error. */
export const useFlag = (id: string): boolean =>
  useFlagsQuery().data?.flags.find((f) => f.id === id)?.enabled ?? true;
