"use client";

// Global error boundary — last-resort shell for errors that escape the root
// layout itself. Must render its own <html>/<body> per App Router contract.

import { useEffect } from "react";
import { logger } from "@/lib/logger";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    logger.error(error.message, error, "app/global-error.tsx boundary");
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          background: "#0b0a12",
          color: "#ececf1",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>Project Brain OS — critical error</h1>
          <p style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.6 }}>
            The application failed to boot. The error was written to the client log.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 16,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid rgba(139,124,255,0.5)",
              background: "rgba(139,124,255,0.15)",
              color: "#ececf1",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
