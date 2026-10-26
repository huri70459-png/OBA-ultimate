// v2.4 (blueprint "Iteration and Feedback Loop / User Feedback Collection",
// self-hosted) — in-app feedback channel.
//
//   POST { message, category? , path? } -> logs/feedback.jsonl
//   GET  -> owner's feedback review feed (newest first)
//
// Deliberately viewer-writable: viewers are users too, and the blueprint's
// point is a low-friction bug/suggestion funnel straight to the operator.

import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { appendJsonl, readJsonlTail } from "@/lib/jsonl";

export const dynamic = "force-dynamic";

const FEEDBACK_FILE = "feedback.jsonl";
const CATEGORIES = ["bug", "feature", "general"] as const;
type Category = (typeof CATEGORIES)[number];

export async function POST(req: NextRequest) {
  // Feedback is telemetry-like (append-only, non-domain): every signed-in
  // session — including viewers — may submit. Open mode: same.
  const guard = await apiGuard(req, { mutation: false });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  const body = (await req.json().catch(() => ({}))) as {
    message?: string;
    category?: string;
    path?: string;
  };
  const message = String(body.message ?? "").trim();
  if (message.length < 4) {
    return NextResponse.json({ error: "Feedback message is too short" }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "Feedback message is too long (2000 char max)" }, { status: 400 });
  }
  const category = (CATEGORIES as readonly string[]).includes(String(body.category))
    ? (String(body.category) as Category)
    : "general";

  const entry = {
    ts: new Date().toISOString(),
    message: message.slice(0, 2000),
    category,
    path: String(body.path ?? "").slice(0, 200),
    user: guard.user ? `${guard.user.name} <${guard.user.email}>` : "anonymous",
  };
  appendJsonl(FEEDBACK_FILE, entry);
  return NextResponse.json({ ok: true, received: entry.ts });
}

export async function GET(req: NextRequest) {
  const guard = await apiGuard(req, { mutation: false });
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });
  // Review feed is owner-only in enforced mode.
  if (guard.user && guard.user.role !== "owner") {
    return NextResponse.json({ error: "Only the owner can review feedback" }, { status: 403 });
  }
  const rows = readJsonlTail(FEEDBACK_FILE, 200);
  return NextResponse.json({
    count: rows.length,
    feedback: rows.reverse(), // newest first
  });
}
