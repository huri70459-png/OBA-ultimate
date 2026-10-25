import { NextResponse } from "next/server";
import { ensureSeedDataOnce } from "@/lib/brain/seed";
import { maybeAutoCompress } from "@/lib/brain/compressor";
import { llmBridge } from "@/lib/brain/llm-bridge";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSeedDataOnce();
    // Idle daemon: fire-and-forget compression cycle if the 6h cadence elapsed
    maybeAutoCompress();
    const llmBackend = await llmBridge.detectActiveBackend();
    return NextResponse.json({
      status: "online",
      engine: "Project Brain OS v2 (Hybrid LLM + Memory Compressor)",
      llm_backend: llmBackend,
    });
  } catch (e) {
    return NextResponse.json(
      { status: "degraded", error: e instanceof Error ? e.message : "seed failed" },
      { status: 500 }
    );
  }
}
