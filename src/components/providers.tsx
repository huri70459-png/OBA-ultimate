"use client";

// Providers — client-side app shell: TanStack Query (server state), i18n
// context, and the blueprint's global error handlers (window.onerror +
// unhandledrejection -> logger -> /api/client-log).

import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { I18nProvider } from "@/lib/i18n";
import { installGlobalHandlers } from "@/lib/logger";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // Created once per mount; module-level singleton lives in lib/query-client.
  const [client] = useState(() => queryClient);

  useEffect(() => {
    installGlobalHandlers();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <I18nProvider>{children}</I18nProvider>
    </QueryClientProvider>
  );
};

export default Providers;
