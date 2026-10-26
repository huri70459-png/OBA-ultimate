"use client";

// Route-level error boundary (blueprint "Centralized Error Boundary").
// App Router renders this when a page segment throws during render — the user
// sees a friendly recovery card, and the error lands in the client log.

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { logger } from "@/lib/logger";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    logger.error(error.message, error, "app/error.tsx boundary");
  }, [error]);

  return (
    <div className="brain-workspace flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15">
          <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden />
        </div>
        <h2 className="text-sm font-bold text-foreground">Something went wrong</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          The view crashed while rendering. The error was logged to the client log
          {error.digest ? ` (digest ${error.digest})` : ""}.
        </p>
        <button
          onClick={reset}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-400"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
