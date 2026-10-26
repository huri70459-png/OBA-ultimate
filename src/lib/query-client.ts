"use client";

// Module-level TanStack Query client (blueprint: "Centralized State Management —
// TanStack Query for server state"). Living at module scope lets NON-React code
// (the zustand workspace store, chat helpers) invalidate caches after mutations:

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/** Invalidate every query under a key prefix (call after mutations). */
export function invalidate(prefix: readonly unknown[]): void {
  void queryClient.invalidateQueries({ queryKey: prefix });
}
