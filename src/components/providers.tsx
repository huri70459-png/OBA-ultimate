"use client";

// Providers — client-side app shell: theme (next-themes, Tier-1 dual-mode
// light/dark), TanStack Query (server state), framer-motion MotionConfig
// (global prefers-reduced-motion respect), i18n context, and the blueprint's
// global error handlers (window.onerror + unhandledrejection -> logger ->
// /api/client-log).

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { useReportWebVitals } from "next/web-vitals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { I18nProvider } from "@/lib/i18n";
import { installGlobalHandlers } from "@/lib/logger";
import { trackWebVital } from "@/lib/telemetry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // Created once per mount; module-level singleton lives in lib/query-client.
  const [client] = useState(() => queryClient);

  // v2.4 (blueprint "APM / Core Web Vitals", self-hosted): every vital sample
  // lands in logs/metrics.jsonl via /api/metrics — no external APM needed.
  useReportWebVitals(trackWebVital);

  useEffect(() => {
    installGlobalHandlers();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <QueryClientProvider client={client}>
          <I18nProvider>{children}</I18nProvider>
        </QueryClientProvider>
      </MotionConfig>
    </ThemeProvider>
  );
};

export default Providers;
