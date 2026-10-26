import { NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { maybeAutoCompress } from "@/lib/brain/compressor";
import { llmBridge } from "@/lib/brain/llm-bridge";
import { getDedupWindowHours } from "@/lib/brain/dedup";
import { effectiveSetting } from "@/lib/brain/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSeedDataOnce();
    // Idle daemon: fire-and-forget compression cycle if the 6h cadence elapsed
    maybeAutoCompress();
    const llmBackend = await llmBridge.detectActiveBackend();
    return NextResponse.json({
      status: "online",
      engine: "Project Brain OS v2.5 (Privacy Guard + Vision OCR + Closed-Loop Fixes + Two-Way Editing + MCP)",
      version: "2.5",
      llm_backend: llmBackend,
      // v2.2: runtime-tunable configuration echoed for the UI + verify suites
      config: {
        dedup_window_hours: await getDedupWindowHours(),
        provider_setting: (await effectiveSetting("llm_provider")) || "auto",
        agent_ingest_protected: Boolean(await effectiveSetting("agent_ingest_token")),
      },
      // v2.4 (blueprint "Uptime Monitoring"): probe payload for external uptime
      // checkers (Pingdom/UptimeRobot pattern) — this endpoint IS the probe target.
      uptime_seconds: Math.round(process.uptime()),
      memory_rss_bytes: process.memoryUsage().rss,
    });
  } catch (e) {
    return NextResponse.json(
      { status: "degraded", error: e instanceof Error ? e.message : "seed failed" },
      { status: 500 }
    );
  }
}
