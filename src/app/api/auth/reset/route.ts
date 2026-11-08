// POST /api/auth/reset — explicit local owner recovery.
// Disabled unless AUTH_RECOVERY_CODE is configured by the operator.
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { hashPassword, issueSessionToken, type Role } from "@/lib/auth";

export const dynamic = "force-dynamic";

function matchesRecoveryCode(candidate: string, configured: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(configured);
  return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
}

function isBrowserForm(req: NextRequest): boolean {
  return req.headers.get("content-type")?.includes("application/x-www-form-urlencoded") ?? false;
}

function formRedirect(req: NextRequest, outcome: "success" | "invalid" | "disabled" | "failed") {
  return new NextResponse(null, { status: 303, headers: { Location: `/recover?${outcome}=1` } });
}

export async function POST(req: NextRequest) {
  const browserForm = isBrowserForm(req);
  const configured = process.env.AUTH_RECOVERY_CODE?.trim() ?? "";
  if (!configured) {
    return browserForm
      ? formRedirect(req, "disabled")
      : NextResponse.json({ error: "Recovery is not enabled on this workspace" }, { status: 404 });
  }
  try {
    const body = browserForm ? Object.fromEntries(await req.formData()) : await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();
    const recoveryCode = String(body.recoveryCode ?? "");
    const newPassword = String(body.newPassword ?? "");
    if (!email || !recoveryCode || newPassword.length < 8) {
      return browserForm
        ? formRedirect(req, "invalid")
        : NextResponse.json({ error: "Email, recovery code, and a password of at least 8 characters are required" }, { status: 400 });
    }
    if (!matchesRecoveryCode(recoveryCode, configured)) {
      return browserForm ? formRedirect(req, "invalid") : NextResponse.json({ error: "Invalid recovery details" }, { status: 401 });
    }
    const account = await db.userAccount.findUnique({ where: { email } });
    if (!account) {
      return browserForm ? formRedirect(req, "invalid") : NextResponse.json({ error: "Invalid recovery details" }, { status: 401 });
    }
    const updated = await db.userAccount.update({ where: { id: account.id }, data: { passwordHash: hashPassword(newPassword) } });
    const { token, exp } = await issueSessionToken({ id: updated.id, email: updated.email, name: updated.name, role: updated.role as Role });
    const res = browserForm
      ? new NextResponse(null, { status: 303, headers: { Location: "/?password-reset=1" } })
      : NextResponse.json({ ok: true, expires_at: exp });
    res.cookies.set("brain_session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 7 * 24 * 3600 });
    return res;
  } catch (error) {
    console.error("Owner password recovery failed", error instanceof Error ? error.message : "unknown error");
    return browserForm ? formRedirect(req, "failed") : NextResponse.json({ error: "Password reset failed" }, { status: 500 });
  }
}
