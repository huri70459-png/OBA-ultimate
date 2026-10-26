// v2.4 (blueprint "Feature Flags / Progressive Rollouts / Kill Switches",
// self-hosted) — registry readback + owner-only overrides.
//
//   GET  -> every flag with its effective value + source (stored | env | default)
//   PUT  { id, enabled?, rollout? } -> persist an override (owner in enforced
//          mode; open/bootstrap mode stays writable exactly like every other
//          mutation so harnesses and first-boot setup need no credentials)

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { clearFlag, getFlags, writeFlag } from "@/lib/feature-flags";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: false });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });
  return NextResponse.json({ flags: await getFlags() });
}

interface FlagPutBody {
  id?: string;
  enabled?: boolean;
  rollout?: number;
  reset?: boolean;
}

export async function PUT(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: true });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });
  // Owner-only in enforced mode (editors/viewers may not flip kill switches).
  if (guard.user && guard.user.role !== "owner") {
    return NextResponse.json({ error: "Only the owner can change feature flags" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as FlagPutBody;
  const id = String(body.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "Flag id is required" }, { status: 400 });

  if (body.reset === true) {
    const ok = await clearFlag(id);
    if (!ok) return NextResponse.json({ error: `Unknown flag: ${id}` }, { status: 400 });
    const flags = await getFlags();
    return NextResponse.json({ ok: true, flag: flags.find((f) => f.id === id) ?? null });
  }

  if (typeof body.enabled !== "boolean" && body.rollout === undefined) {
    return NextResponse.json(
      { error: "Provide enabled (boolean), rollout (number), or reset (true)" },
      { status: 400 },
    );
  }
  const flag = await writeFlag(id, { enabled: body.enabled, rollout: body.rollout });
  if (!flag) return NextResponse.json({ error: `Unknown flag: ${id}` }, { status: 400 });
  return NextResponse.json({ ok: true, flag });
}
