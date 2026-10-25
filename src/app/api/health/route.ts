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
      engine: "Project Brain OS v2.2 (Runtime LLM Config + Desktop Agent Ingest + Tunable Dedup)",
      version: "2.2",
      llm_backend: llmBackend,
      // v2.2: runtime-tunable configuration echoed for the UI + verify suites
      config: {
        dedup_window_hours: await getDedupWindowHours(),
        provider_setting: (await effectiveSetting("llm_provider")) || "auto",
        agent_ingest_protected: Boolean(await effectiveSetting("agent_ingest_token")),
      },
    });
  } catch (e) {
    return NextResponse.json(
      { status: "degraded", error: e instanceof Error ? e.message : "seed failed" },
      { status: 500 }
    );
  }
}
