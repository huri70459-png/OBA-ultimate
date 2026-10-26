module.exports = [
(()=>{"use strict";return[
"[project]/src/app/api/capture/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/seed.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$pipeline$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/pipeline.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$compressor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/compressor.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$ingest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/ingest.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/audit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$assets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/assets.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$capture$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/capture-schema.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
async function POST(req) {
    try {
        // Enterprise guard: session required when auth is enforced; the desktop-agent
        // ingest token is also accepted so the capture pipeline never breaks.
        const gate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiGuard"])(req, {
            mutation: true,
            allowAgentToken: true
        });
        if (!gate.ok) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: gate.error
        }, {
            status: gate.status
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureSeedDataOnce"])();
        // v2.6 boundary gate — body-size (headers, before read) + zod field caps.
        // The desktop-agent token path is equally bounded: the gate lives BEFORE
        // any pipeline work in both capture routes.
        const rawBody = await req.json().catch(()=>({}));
        const boundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$capture$2d$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gateCaptureRequest"])(req, rawBody);
        if (!boundary.ok) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(boundary.body, {
            status: boundary.status
        });
        const body = rawBody ?? {};
        // v2.5 ingest layer — Privacy Guard (sensitive windows blocked, secrets
        // scrubbed) + optional screenshot OCR + deterministic content hash.
        const enriched = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$ingest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enrichCaptureInput"])({
            rawContent: String(body.raw_content ?? body.rawContent ?? ""),
            itemType: String(body.item_type ?? body.itemType ?? "note"),
            windowTitle: String(body.window_title ?? body.windowTitle ?? ""),
            sourceApp: String(body.source_app ?? body.sourceApp ?? "Workspace UI"),
            activeFilePath: String(body.active_file_path ?? body.activeFilePath ?? ""),
            sourceUrl: String(body.source_url ?? body.sourceUrl ?? ""),
            assetPath: String(body.asset_path ?? body.assetPath ?? ""),
            visualHint: String(body.visual_hint ?? body.visualHint ?? ""),
            imageBase64: body.image_base64 ? String(body.image_base64) : "",
            forcedProjectId: String(body.forced_project_id ?? body.forcedProjectId ?? "")
        });
        if (enriched.blocked) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: "blocked",
                reason: enriched.reason
            }, {
                status: 422
            });
        }
        if (!enriched.rawContent.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "raw_content is required"
            }, {
                status: 400
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$pipeline$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capture"])({
            rawContent: enriched.rawContent,
            itemType: String(body.item_type ?? body.itemType ?? "note"),
            windowTitle: String(body.window_title ?? body.windowTitle ?? ""),
            activeFilePath: String(body.active_file_path ?? body.activeFilePath ?? ""),
            sourceApp: String(body.source_app ?? body.sourceApp ?? "Workspace UI"),
            sourceUrl: String(body.source_url ?? body.sourceUrl ?? ""),
            assetPath: enriched.assetPath,
            visualHint: enriched.visualHint,
            forcedProjectId: String(body.forced_project_id ?? body.forcedProjectId ?? ""),
            extraMetadata: {
                content_hash: enriched.contentHash,
                privacy_redactions: enriched.redactionCount,
                ...enriched.ocr.used ? {
                    ocr_provider: enriched.ocr.provider
                } : {}
            }
        });
        // v2.5: idempotent capture audit ledger (identical payload -> attempts + 1)
        const job = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$ingest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordCaptureJob"])({
            idempotencyKey: enriched.contentHash,
            payload: {
                raw_content: enriched.rawContent,
                item_type: result.item.itemType,
                window_title: String(body.window_title ?? body.windowTitle ?? ""),
                source_app: result.item.sourceApp
            },
            resultItemId: result.item.id
        }).catch(()=>null);
        // v2.6 trust plane — append-only audit trail (never throws into the capture
        // path) + asset ledger back-link so visual evidence is queryable per item.
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordAuditEvent"])({
            projectId: result.item.projectId ?? result.projectMatch?.projectId ?? null,
            actorType: gate.viaAgent ? "agent" : "user",
            eventType: "capture.created",
            entityType: "Item",
            entityId: result.item.id,
            details: {
                status: result.status,
                content_hash: enriched.contentHash,
                redactions: enriched.redactionCount,
                ocr_provider: enriched.ocr.used ? enriched.ocr.provider : null,
                asset_reused: enriched.assetReused,
                source_app: result.item.sourceApp
            }
        });
        if (enriched.assetSha256 && enriched.assetPath) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$assets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["linkAssetToItem"])(enriched.assetPath, result.item.id);
        }
        // v2 wiring (brain_api.py parity): automatically re-compress project memory
        // whenever a NEW capture lands so Tier-1 rolling memory is always fresh.
        // v2.1: duplicate merges return early like brain_api.py — the item content did
        // not change (only its occurrence counter), so no recompression is needed.
        if (result.status === "duplicate_merged") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ...result,
                memory_compression: {
                    skipped: true,
                    reason: "duplicate_merged"
                },
                content_hash: enriched.contentHash,
                asset_reused: enriched.assetReused,
                privacy: {
                    redaction_count: enriched.redactionCount
                },
                ...enriched.ocr.used ? {
                    ocr: {
                        provider: enriched.ocr.provider
                    }
                } : {},
                ...job ? {
                    capture_job: job
                } : {}
            });
        }
        const matchedPid = result.projectMatch?.projectId;
        if (matchedPid) {
            const compression = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$compressor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compressProjectMemory"])(matchedPid);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ...result,
                memory_compression: compression,
                content_hash: enriched.contentHash,
                asset_reused: enriched.assetReused,
                privacy: {
                    redaction_count: enriched.redactionCount
                },
                ...enriched.ocr.used ? {
                    ocr: {
                        provider: enriched.ocr.provider
                    }
                } : {},
                ...job ? {
                    capture_job: job
                } : {}
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...result,
            memory_compression: {
                skipped: true
            },
            content_hash: enriched.contentHash,
            asset_reused: enriched.assetReused,
            privacy: {
                redaction_count: enriched.redactionCount
            },
            ...enriched.ocr.used ? {
                ocr: {
                    provider: enriched.ocr.provider
                }
            } : {},
            ...job ? {
                capture_job: job
            } : {}
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e instanceof Error ? e.message : "Capture failed"
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_COOKIE",
    ()=>SESSION_COOKIE,
    "SESSION_TTL_SECONDS",
    ()=>SESSION_TTL_SECONDS,
    "apiGuard",
    ()=>apiGuard,
    "getAuthState",
    ()=>getAuthState,
    "getJwtSecretForSetup",
    ()=>getJwtSecretForSetup,
    "hashPassword",
    ()=>hashPassword,
    "issueSessionToken",
    ()=>issueSessionToken,
    "readAgentToken",
    ()=>readAgentToken,
    "readSessionCookie",
    ()=>readSessionCookie,
    "sessionCookieOptions",
    ()=>sessionCookieOptions,
    "verifyPassword",
    ()=>verifyPassword,
    "verifySessionToken",
    ()=>verifySessionToken
]);
// Project Brain OS — Enterprise Auth Core (blueprint: "Authentication and
// Authorization Strategy", adapted for a self-hosted local-first appliance).
//
// Blueprint asked for OAuth2/OIDC via NextAuth with JWT session management and
// RBAC. No external identity provider is available in this deployment, so the
// strategy is adapted to a self-hosted credential model with the same guarantees:
//
//   - Passwords: scrypt (N=16384) with per-user random salt, timing-safe compare.
//   - Sessions:  HMAC-SHA256 signed compact JWT in an httpOnly SameSite=Lax
//                cookie (refresh tokens replaced by a sliding /api/auth/refresh
//                endpoint that re-issues the cookie — same XSS posture as
//                httpOnly refresh cookies, zero client-side token storage).
//   - RBAC:      role travels in the JWT (owner | editor | viewer); mutation
//                endpoints require editor+, reads require any authenticated
//                session. The desktop-agent ingest token keeps working so the
//                capture pipeline never breaks.
//   - Bootstrap-open semantics: while ZERO accounts exist (or auth_mode = "open")
//                every endpoint behaves exactly like pre-auth releases — this is
//                what keeps the 114-check regression board, the self-test harness
//                and desktop agents green without credentials.
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
const SESSION_COOKIE = "brain_session";
const SESSION_TTL_SECONDS = 7 * 24 * 3600; // 7 days, sliding via /api/auth/refresh
const SCRYPT_KEYLEN = 64;
const JWT_SECRET_KEY = "auth_jwt_secret"; // Setting-table row; deliberately NOT in SETTING_KEYS
function hashPassword(password) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(16).toString("hex");
    const hash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, SCRYPT_KEYLEN).toString("hex");
    return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const candidate = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, SCRYPT_KEYLEN);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(candidate, expected);
}
// ---------- JWT (HS256, node:crypto — no external dependency) ----------
const b64url = (buf)=>Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromB64url = (s)=>Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");
async function jwtSecret() {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].setting.findUnique({
        where: {
            key: JWT_SECRET_KEY
        }
    }).catch(()=>null);
    if (row?.value) return Buffer.from(row.value, "hex");
    // No secret yet (pre-bootstrap): derive a stable dev fallback so nothing throws.
    // It is only usable for verification of tokens nobody has been issued.
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", "brain-os-dev-secret").update("jwt").digest();
}
async function issueSessionToken(user) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const exp = issuedAt + SESSION_TTL_SECONDS;
    const header = b64url(JSON.stringify({
        alg: "HS256",
        typ: "JWT"
    }));
    const payload = {
        ...user,
        iat: issuedAt,
        exp
    };
    const body = b64url(JSON.stringify(payload));
    const secret = await jwtSecret();
    const sig = b64url((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret).update(`${header}.${body}`).digest());
    return {
        token: `${header}.${body}.${sig}`,
        exp
    };
}
async function verifySessionToken(token) {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const secret = await jwtSecret();
    const expected = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret).update(`${header}.${body}`).digest();
    const provided = fromB64url(sig);
    if (provided.length !== expected.length || !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(provided, expected)) return null;
    let payload;
    try {
        payload = JSON.parse(fromB64url(body).toString("utf8"));
    } catch  {
        return null;
    }
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (!payload.id || !payload.email || !payload.role) return null;
    return {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role
    };
}
async function getAuthState() {
    const [accountCount, modeRow] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].userAccount.count().catch(()=>0),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].setting.findUnique({
            where: {
                key: "auth_mode"
            }
        }).catch(()=>null)
    ]);
    if (accountCount === 0) return {
        mode: "open",
        accountCount
    };
    const override = (modeRow?.value ?? "").trim();
    return {
        mode: override === "open" ? "open" : "enforced",
        accountCount
    };
}
async function getJwtSecretForSetup() {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].setting.findUnique({
        where: {
            key: JWT_SECRET_KEY
        }
    }).catch(()=>null);
    if (row?.value) return row.value;
    const secret = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(32).toString("hex");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].setting.upsert({
        where: {
            key: JWT_SECRET_KEY
        },
        create: {
            key: JWT_SECRET_KEY,
            value: secret
        },
        update: {
            value: secret
        }
    });
    return secret;
}
function sessionCookieOptions(maxAgeSeconds) {
    return {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: maxAgeSeconds,
        // secure would break plain-HTTP sandbox previews; the cookie is still
        // httpOnly + SameSite=Lax, and tokens expire in 7 days.
        secure: false
    };
}
function readSessionCookie(req) {
    const header = req.headers.get("cookie");
    if (!header) return null;
    for (const part of header.split(";")){
        const [k, ...rest] = part.trim().split("=");
        if (k === SESSION_COOKIE) return rest.join("=");
    }
    return null;
}
function readAgentToken(req) {
    const auth = req.headers.get("authorization");
    if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
    return req.headers.get("x-brain-token");
}
async function apiGuard(req, opts = {}) {
    const state = await getAuthState();
    if (state.mode === "open") return {
        ok: true,
        user: null,
        mode: state.mode,
        viaAgent: false
    };
    const user = await verifySessionToken(readSessionCookie(req));
    if (user) {
        if (opts.mutation && user.role === "viewer") {
            return {
                ok: false,
                status: 403,
                error: "Your role (viewer) is read-only for this action"
            };
        }
        return {
            ok: true,
            user,
            mode: state.mode,
            viaAgent: false
        };
    }
    if (opts.allowAgentToken) {
        const { checkAgentToken } = await __turbopack_context__.A("[project]/src/lib/brain/settings.ts [app-route] (ecmascript, async loader)");
        const agent = await checkAgentToken(readAgentToken(req));
        // ONLY a configured-and-matching token counts. When no token is configured,
        // checkAgentToken answers ok:true in "trusted mode" — that must NOT bypass
        // session enforcement here, or enforced mode would be silently wide open.
        if (agent.required && agent.ok) return {
            ok: true,
            user: null,
            mode: state.mode,
            viaAgent: true
        };
    }
    return {
        ok: false,
        status: 401,
        error: "Authentication required — sign in to Project Brain OS"
    };
}
}),
"[project]/src/lib/brain/action-verifier.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Project Brain OS — v2.5 Closed-Loop Action & Fix Verification
//
// Separates SUGGESTED fixes from VERIFIED resolutions:
//   detected -> suggested -> attempted -> verified | failed
//
// The lifecycle state lives in the item's JSON metadata (backward compatible —
// items captured before v2.5 simply have no fix_status and default to
// "suggested" when a fix exists). An Action row is materialized on the first
// verification PATCH (see /api/items/[id]) so the project database can answer
// "which fixes are actually proven?" independently of raw capture counts.
//
// Health integration: computeHealthAndGaps() consumes classifyFixVerification
// so unverified regex suggestions no longer count as resolved errors.
__turbopack_context__.s([
    "FIX_VERIFICATION_STATUSES",
    ()=>FIX_VERIFICATION_STATUSES,
    "classifyFixVerification",
    ()=>classifyFixVerification,
    "computeVerifiedHealthBreakdown",
    ()=>computeVerifiedHealthBreakdown,
    "isFixVerificationStatus",
    ()=>isFixVerificationStatus
]);
const FIX_VERIFICATION_STATUSES = [
    "detected",
    "suggested",
    "attempted",
    "verified",
    "failed"
];
function isFixVerificationStatus(value) {
    return typeof value === "string" && FIX_VERIFICATION_STATUSES.includes(value);
}
function classifyFixVerification(items) {
    const counts = {
        verifiedFixes: 0,
        suggestedUnverifiedFixes: 0,
        failedFixes: 0,
        unresolvedErrors: 0
    };
    for (const item of items){
        const meta = item.metadata ?? {};
        if (!meta.error) continue; // only error diagnoses participate in the loop
        if (!meta.fix) {
            counts.unresolvedErrors += 1;
            continue;
        }
        const status = isFixVerificationStatus(meta.fix_status) ? meta.fix_status : "suggested"; // pre-v2.5 items with a fix default to "suggested"
        if (status === "verified") counts.verifiedFixes += 1;
        else if (status === "failed") counts.failedFixes += 1;
        else counts.suggestedUnverifiedFixes += 1; // detected | suggested | attempted
    }
    return counts;
}
function computeVerifiedHealthBreakdown(items) {
    const counts = classifyFixVerification(items);
    const rawScore = 100 - (counts.unresolvedErrors + counts.failedFixes) * 12 - counts.suggestedUnverifiedFixes * 5 + Math.min(counts.verifiedFixes * 4, 20);
    const score = Math.max(15, Math.min(100, rawScore));
    return {
        ...counts,
        score,
        explanation: `${counts.unresolvedErrors + counts.failedFixes} unresolved error(s), ` + `${counts.suggestedUnverifiedFixes} unverified fix suggestion(s), ` + `${counts.verifiedFixes} verified resolution(s).`
    };
}
}),
"[project]/src/lib/brain/analyzer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeCapture",
    ()=>analyzeCapture,
    "formatHudToast",
    ()=>formatHudToast
]);
// Project Brain OS — Built-in Deterministic Intelligence Analyzer (v2)
// Port of llm_bridge.py::analyze_capture_callback (upgraded Snip -> Action analyzer):
//   - Node  "Cannot find module 'x'"        -> pnpm add x
//   - Python "ModuleNotFoundError: x"       -> pip install x
//   - Locked port "EADDRINUSE ...:3000"     -> npx kill-port 3000        (v2 NEW)
//   - Runtime exceptions (SyntaxError, TypeError, ReferenceError, KeyError, ValueError) (v2 NEW)
//   - File & component mentions -> MENTIONED_IN Knowledge Graph edges
//   - Architectural decision extraction (Decision:/why we chose/we decided to/switched from)
//   - Optional live LLM 1-sentence summary enrichment when a backend is reachable (v2 NEW)
// Works fully offline with zero API keys via the deterministic fallback path.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$llm$2d$bridge$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/llm-bridge.ts [app-route] (ecmascript)");
;
async function analyzeCapture(input) {
    const { rawContent, windowTitle = "", visualHint = "", routedModel } = input;
    const lines = rawContent.split("\n").map((l)=>l.trim()).filter((l)=>l.length > 0);
    const firstLine = lines[0] ? lines[0].replace(/^#+\s*/, "") : windowTitle || "Quick Capture";
    let title = firstLine.slice(0, 65);
    const actionMetadata = {};
    const graphEdges = [];
    let decisionData = null;
    // A. Snip -> Action: extract missing dependencies / terminal errors + fix commands
    const nodeMod = rawContent.match(/Cannot find module ['"]([^'"]+)['"]/);
    const pyMod = rawContent.match(/ModuleNotFoundError: No module named ['"]([^'"]+)['"]/);
    const portErr = rawContent.match(/EADDRINUSE.*?:(\d+)/);
    const syntaxErr = rawContent.match(/(SyntaxError|TypeError|ReferenceError|KeyError|ValueError):\s*([^\n]+)/);
    if (nodeMod) {
        const pkg = nodeMod[1];
        const fixCmd = `pnpm add ${pkg}`;
        title = `Error: Missing Node dependency '${pkg}'`;
        actionMetadata.error = "ModuleNotFound";
        actionMetadata.rootCause = `Missing npm/pnpm package '${pkg}'`;
        actionMetadata.fix = fixCmd;
        graphEdges.push({
            source: title,
            target: fixCmd,
            relation: "FIXED_BY"
        });
    } else if (pyMod) {
        const pkg = pyMod[1];
        const fixCmd = `pip install ${pkg}`;
        title = `Error: Missing Python module '${pkg}'`;
        actionMetadata.error = "ModuleNotFoundError";
        actionMetadata.rootCause = `Missing Python package '${pkg}'`;
        actionMetadata.fix = fixCmd;
        graphEdges.push({
            source: title,
            target: fixCmd,
            relation: "FIXED_BY"
        });
    } else if (portErr) {
        const port = portErr[1];
        const fixCmd = `npx kill-port ${port}`;
        title = `Error: Port ${port} already in use (EADDRINUSE)`;
        actionMetadata.error = "EADDRINUSE";
        actionMetadata.rootCause = `Port ${port} locked by another process`;
        actionMetadata.fix = fixCmd;
        graphEdges.push({
            source: title,
            target: fixCmd,
            relation: "FIXED_BY"
        });
    } else if (syntaxErr) {
        const errType = syntaxErr[1];
        const errMsg = syntaxErr[2].trim();
        title = `${errType}: ${errMsg.slice(0, 45)}`;
        actionMetadata.error = errType;
        actionMetadata.rootCause = errMsg;
        actionMetadata.fix = `Inspect stack trace for ${errType}`;
    }
    // B. Extract File & Component Graph Nodes
    const fileMentions = (rawContent + " " + windowTitle).match(/\b([a-zA-Z0-9_-]+\.(?:py|ts|tsx|js|mjs|json|md|sql|html))\b/g);
    if (fileMentions) {
        for (const fm of new Set(fileMentions)){
            graphEdges.push({
                source: fm,
                target: title,
                relation: "MENTIONED_IN"
            });
        }
    }
    // C. Extract Architectural Decisions (Decision + Alternatives + Reasoning)
    const lower = rawContent.toLowerCase();
    if (lower.includes("decision:") || lower.includes("why we chose") || lower.includes("we decided to") || lower.includes("switched from")) {
        const reasonMatch = rawContent.match(/(?:reason|reasoning|because|why)[:\s]+([^\n.]+)/i);
        const altMatch = rawContent.match(/(?:alternatives|instead of|over|rejected)[:\s]+([^\n.]+)/i);
        decisionData = {
            title,
            chosen: firstLine,
            reasoning: reasonMatch ? reasonMatch[1].trim() : "Captured from architectural rationale note",
            alternatives: altMatch ? altMatch[1].split(",").map((a)=>a.trim()).filter(Boolean) : []
        };
    }
    // D. Optional live LLM summary upgrade (only when Ollama/Cloud backend is reachable)
    // v2.2: short 6s cap — capture-path UX must never wait on a slow cloud provider.
    let llmSummary = "";
    if (rawContent.length > 120) {
        llmSummary = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$llm$2d$bridge$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["llmBridge"].completeText("Summarize this developer capture in 1 concise sentence (< 25 words) focusing on technical facts.", rawContent.slice(0, 1500), 80, {
            timeoutMs: 6_000
        });
    }
    let summary;
    if (llmSummary) {
        summary = `[${routedModel}] ${llmSummary}`;
    } else if (actionMetadata.fix) {
        summary = `[${routedModel}] Diagnosed ${actionMetadata.error} -> Suggested Fix: \`${actionMetadata.fix}\``;
    } else {
        summary = `[${routedModel}] ` + lines.slice(0, 2).join(" ").slice(0, 180);
    }
    return {
        title,
        summary,
        visualDescription: visualHint || (windowTitle ? `Visual capture from '${windowTitle}'` : ""),
        actionMetadata,
        decision: decisionData,
        graphEdges
    };
}
function formatHudToast(input) {
    const { projectMatch, modelRoute, actionMetadata } = input;
    const fixStr = actionMetadata.fix ? ` | Suggested Fix: \`${actionMetadata.fix}\`` : "";
    return `✅ Zero-Save -> [${projectMatch.projectName}] (${Math.round(projectMatch.confidence * 100)}% match) ` + `| Model: ${modelRoute.targetModel}${fixStr}`;
}
}),
"[project]/src/lib/brain/assets.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assetStats",
    ()=>assetStats,
    "byteSizeOfBase64",
    ()=>byteSizeOfBase64,
    "findAssetBySha256",
    ()=>findAssetBySha256,
    "linkAssetToItem",
    ()=>linkAssetToItem,
    "recordAssetLedger",
    ()=>recordAssetLedger,
    "sha256OfBase64",
    ()=>sha256OfBase64
]);
// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): sha256-deduplicated
// asset ledger.
//
// The binary already lives in the vault (vision-ocr writes assets/ at capture
// time); this ledger adds the queryable DB half:
//   - sha256 identity: the same screenshot posted twice REUSES the stored file
//     instead of writing a second copy (closes the disk-fill vector)
//   - OCR provider + text travel WITH the asset, so a deduplicated re-capture
//     reports byte-identical semantics to the original (board-stable)
//   - rows are append-only evidence with deliberately NO FK on Item/Project:
//     deleting an item never destroys the visual evidence trail (blueprint
//     Phase 1 rule: OCR/extraction failures must never delete original captures)
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
function sha256OfBase64(imageBase64) {
    const raw = imageBase64.includes(",") ? imageBase64.slice(imageBase64.indexOf(",") + 1) : imageBase64;
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(Buffer.from(raw, "base64")).digest("hex");
}
function byteSizeOfBase64(imageBase64) {
    const raw = imageBase64.includes(",") ? imageBase64.slice(imageBase64.indexOf(",") + 1) : imageBase64;
    return Math.max(Math.floor(raw.length * 3 / 4) - (raw.endsWith("==") ? 2 : raw.endsWith("=") ? 1 : 0), 0);
}
async function findAssetBySha256(sha256) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAsset.findUnique({
        where: {
            sha256
        }
    });
}
async function recordAssetLedger(params) {
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAsset.findUnique({
        where: {
            sha256: params.sha256
        }
    });
    if (existing) return {
        asset: existing,
        deduped: true
    };
    try {
        const asset = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAsset.create({
            data: {
                id: `ast_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 16)}`,
                storagePath: params.storagePath,
                sha256: params.sha256,
                mimeType: params.mimeType ?? "image/png",
                bytes: params.bytes ?? 0,
                provider: params.provider ?? "local-asset-store",
                ocrText: (params.ocrText ?? "").slice(0, 20000),
                processing: params.processing ?? "completed",
                errorMessage: params.errorMessage ?? null,
                projectId: params.projectId ?? null
            }
        });
        return {
            asset,
            deduped: false
        };
    } catch (err) {
        // Lost a create race on the unique sha256 — treat as dedup hit.
        const raced = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAsset.findUnique({
            where: {
                sha256: params.sha256
            }
        });
        if (raced) return {
            asset: raced,
            deduped: true
        };
        throw err;
    }
}
async function linkAssetToItem(storagePath, itemId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAsset.updateMany({
            where: {
                storagePath
            },
            data: {
                itemId
            }
        });
    } catch  {
    // linking is an optimization, never a requirement
    }
}
async function assetStats() {
    const [count, agg] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAsset.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAsset.aggregate({
            _sum: {
                bytes: true
            }
        })
    ]);
    return {
        assets: count,
        bytes: agg._sum.bytes ?? 0,
        dedupedReuses: 0
    };
}
}),
"[project]/src/lib/brain/audit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auditEventStats",
    ()=>auditEventStats,
    "listAuditEvents",
    ()=>listAuditEvents,
    "recordAuditEvent",
    ()=>recordAuditEvent
]);
// Project Brain OS — v2.6 Trust Plane (blueprint Phase 1): append-only audit trail.
//
// Every state-changing action that matters (captures, edits, fix verifications,
// job failures) records who/what/when with structured details. Two hard rules:
//   1. recordAuditEvent is a NEVER-THROW: auditing must never break the
//      operation it observes (failures log a warning and are swallowed).
//   2. Rows are append-only: nothing in this module updates or deletes events.
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
async function recordAuditEvent(input) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAuditEvent.create({
            data: {
                id: `aud_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 16)}`,
                projectId: input.projectId ?? null,
                actorType: input.actorType ?? "system",
                actorId: input.actorId ?? null,
                eventType: input.eventType.slice(0, 120),
                entityType: (input.entityType || "Item").slice(0, 60),
                entityId: input.entityId ?? null,
                detailsJson: JSON.stringify(input.details ?? {}).slice(0, 8000)
            }
        });
    } catch (err) {
        console.warn("[audit] event write failed (non-fatal):", err instanceof Error ? err.message : err);
    }
}
function safeParse(json) {
    try {
        const parsed = JSON.parse(json);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch  {
        return {};
    }
}
async function listAuditEvents(opts = {}) {
    const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAuditEvent.findMany({
        where: {
            ...opts.projectId ? {
                projectId: opts.projectId
            } : {},
            ...opts.eventType ? {
                eventType: opts.eventType
            } : {},
            ...opts.entityId ? {
                entityId: opts.entityId
            } : {}
        },
        orderBy: {
            createdAt: "desc"
        },
        take: limit
    });
    return rows.map((r)=>({
            id: r.id,
            projectId: r.projectId,
            actorType: r.actorType,
            actorId: r.actorId,
            eventType: r.eventType,
            entityType: r.entityType,
            entityId: r.entityId,
            details: safeParse(r.detailsJson),
            createdAt: r.createdAt.toISOString()
        }));
}
async function auditEventStats() {
    const grouped = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].brainAuditEvent.groupBy({
        by: [
            "eventType"
        ],
        _count: {
            eventType: true
        }
    });
    const stats = {};
    for (const g of grouped)stats[g.eventType] = g._count.eventType;
    return stats;
}
}),
"[project]/src/lib/brain/capture-schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CapturePayloadSchema",
    ()=>CapturePayloadSchema,
    "MAX_CAPTURE_BODY_BYTES",
    ()=>MAX_CAPTURE_BODY_BYTES,
    "MAX_CONTENT_CHARS",
    ()=>MAX_CONTENT_CHARS,
    "MAX_IMAGE_BASE64_CHARS",
    ()=>MAX_IMAGE_BASE64_CHARS,
    "gateCaptureRequest",
    ()=>gateCaptureRequest
]);
// Project Brain OS — v2.6 Capture Boundary Validation
//
// Audit-2 blocker #4 residual: the capture entrypoints previously accepted
// arbitrary JSON with permissive String() coercions only. This module puts a
// real schema gate in front of the pipeline:
//   - zod payload schema (both snake_case brain_api.py wire keys AND camelCase
//     workspace keys, so no existing caller breaks)
//   - hard per-field size limits (content 150k = redactor MAX_CONTENT_CHARS,
//     screenshot base64 15MB, titles/urls/paths bounded)
//   - content-length body-size guard answered BEFORE the body is read, so an
//     oversized upload is rejected without buffering it into memory
//
// The schema is intentionally a GATE, not a transformer: routes keep their own
// `body.x ?? body.y` accessors, so behavior for every valid payload is
// byte-identical to v2.5. Unknown keys are ignored (forward compatibility with
// future agent versions).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
;
const MAX_CAPTURE_BODY_BYTES = 24 * 1024 * 1024;
const MAX_CONTENT_CHARS = 150_000;
const MAX_IMAGE_BASE64_CHARS = 15_000_000;
const sized = (max)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().max(max).nullish();
const CapturePayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    raw_content: sized(MAX_CONTENT_CHARS),
    rawContent: sized(MAX_CONTENT_CHARS),
    image_base64: sized(MAX_IMAGE_BASE64_CHARS),
    imageBase64: sized(MAX_IMAGE_BASE64_CHARS),
    item_type: sized(40),
    itemType: sized(40),
    window_title: sized(500),
    windowTitle: sized(500),
    source_app: sized(200),
    sourceApp: sized(200),
    source_url: sized(2048),
    sourceUrl: sized(2048),
    active_file_path: sized(1024),
    activeFilePath: sized(1024),
    asset_path: sized(1024),
    assetPath: sized(1024),
    visual_hint: sized(2_000),
    visualHint: sized(2_000),
    forced_project_id: sized(120),
    forcedProjectId: sized(120)
});
function gateCaptureRequest(req, body) {
    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_CAPTURE_BODY_BYTES) {
        return {
            ok: false,
            status: 413,
            body: {
                error: "Capture payload too large",
                max_bytes: MAX_CAPTURE_BODY_BYTES,
                hint: "Compress or downscale the screenshot before uploading"
            }
        };
    }
    const parsed = CapturePayloadSchema.safeParse(body ?? {});
    if (!parsed.success) {
        return {
            ok: false,
            status: 400,
            body: {
                error: "Invalid capture payload",
                issues: parsed.error.issues.slice(0, 10).map((issue)=>({
                        path: issue.path.join("."),
                        message: issue.message
                    }))
            }
        };
    }
    return {
        ok: true
    };
}
}),
"[project]/src/lib/brain/compressor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compressProjectMemory",
    ()=>compressProjectMemory,
    "findCrossProjectSolutions",
    ()=>findCrossProjectSolutions,
    "getDaemonStatus",
    ()=>getDaemonStatus,
    "healthStatus",
    ()=>healthStatus,
    "maybeAutoCompress",
    ()=>maybeAutoCompress,
    "runCompressionCycle",
    ()=>runCompressionCycle
]);
// Project Brain OS — Engine 3: AI Memory Compression Daemon (v2.1)
// Port of the blueprint's memory_compressor.py + the Option-1 upgrade + the v2.1
// Part A refresh:
//   1. Session Rollup      -> groups captures from one coding block (gap <= 90 min)
//                             into a "session" item (Universal Timeline / Work Replay
//                             without 24/7 recording).
//   2. Project Summary Update -> re-synthesizes rolling memory (Tier 1) per project
//                             and persists the Knowledge Health Score + gap flags.
//   3. compressProjectMemory() -> per-project compression (v2): dense < 450-token
//                             summary, _project_summary.md + _work_replay.md written to
//                             the real vault on disk, optional live-LLM digest pass.
//                             v2.1: the replay is REGENERATED session-based (45-minute
//                             work sessions) and folds exact duplicates into ×N counts.
//   4. findCrossProjectSolutions() -> Cross-Project Learning: find the fix for a bug
//                             that was already solved in ANOTHER project (v2).
// Deterministic (no LLM required), idempotent (deterministic session keys), and
// safe to run repeatedly. Triggers: manual (UI/POST), auto-idle (>= 6h since last
// run, kicked off from /api/health), after every capture/decision (v2), and self-test.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/embeddings.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$llm$2d$bridge$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/llm-bridge.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/store.ts [app-route] (ecmascript)");
;
;
;
;
const SESSION_GAP_MS = 90 * 60 * 1000; // a new session starts after a 90-minute lull
const REPLAY_SESSION_GAP_MS = 45 * 60 * 1000; // v2.1 replay: 45-minute work sessions
const MIN_SESSION_ITEMS = 2; // a block needs >= 2 captures to be worth rolling up
const AUTO_INTERVAL_MS = 6 * 60 * 60 * 1000; // auto/idle cadence: every 6 hours
const SUMMARY_WINDOW_DAYS = 14;
const MAX_SUMMARY_CHARS = 1300; // ~325 tokens — keeps Tier 1 well under the 450-token budget
function healthStatus(score) {
    return score >= 85 ? "EXCELLENT" : score >= 65 ? "HEALTHY" : "NEEDS ATTENTION";
}
/** Resolved fix commands + files actively mentioned in the Knowledge Graph. */ function extractFixesAndFiles(items, edges) {
    const resolvedFixes = [];
    const activeFiles = new Set();
    for (const it of items){
        const fix = it.metadata?.fix;
        if (typeof fix === "string" && fix) resolvedFixes.push(`${it.title} -> \`${fix}\``);
    }
    for (const e of edges){
        if (e.relationType === "MENTIONED_IN") activeFiles.add(e.sourceNode);
    }
    return {
        resolvedFixes,
        activeFiles: [
            ...activeFiles
        ]
    };
}
// ------------------------------------------
// Daemon state (per server process)
// ------------------------------------------
let lastRunAt = null;
let lastReport = null;
let inflight = null;
function getDaemonStatus() {
    return {
        lastRunAt,
        lastReport,
        autoIntervalMs: AUTO_INTERVAL_MS,
        running: Boolean(inflight)
    };
}
function maybeAutoCompress() {
    if (inflight) return;
    if (lastRunAt && Date.now() - new Date(lastRunAt).getTime() < AUTO_INTERVAL_MS) return;
    void runCompressionCycle("auto").catch(()=>{
    /* daemon errors are non-fatal by design */ });
}
/** Splits an ordered item stream into coding blocks whenever the gap exceeds 90 minutes. */ function splitIntoBlocks(rows) {
    const blocks = [];
    let current = null;
    const groups = new Map();
    for (const row of rows){
        const key = row.projectId ?? "__inbox__";
        const arr = groups.get(key) ?? [];
        arr.push(row);
        groups.set(key, arr);
    }
    for (const [key, groupRows] of groups){
        current = null;
        for (const row of groupRows){
            if (current && row.capturedAt.getTime() - current.end.getTime() <= SESSION_GAP_MS) {
                current.items.push(row);
                current.end = row.capturedAt;
            } else {
                current = {
                    projectId: key === "__inbox__" ? null : row.projectId,
                    items: [
                        row
                    ],
                    start: row.capturedAt,
                    end: row.capturedAt
                };
                blocks.push(current);
            }
        }
    }
    return blocks;
}
function fmtHM(d) {
    return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}
async function rollupSessions() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
        where: {
            itemType: {
                not: "session"
            }
        },
        orderBy: {
            capturedAt: "asc"
        },
        select: {
            id: true,
            itemType: true,
            title: true,
            structuredSummary: true,
            rawContent: true,
            projectId: true,
            capturedAt: true
        }
    });
    const blocks = splitIntoBlocks(rows).filter((b)=>b.items.length >= MIN_SESSION_ITEMS);
    const created = [];
    for (const block of blocks){
        const first = block.items[0];
        const last = block.items[block.items.length - 1];
        // Deterministic, idempotent session key — same block never rolls up twice
        const sessionKey = `sess_${block.projectId ?? "inbox"}_${first.id}_${last.id}`;
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findFirst({
            where: {
                itemType: "session",
                metadata: {
                    contains: sessionKey
                }
            },
            select: {
                id: true
            }
        });
        if (existing) continue;
        const typeCounts = {};
        for (const it of block.items){
            typeCounts[it.itemType] = (typeCounts[it.itemType] ?? 0) + 1;
        }
        const typeStr = Object.entries(typeCounts).sort((a, b)=>b[1] - a[1]).map(([t, n])=>`${n} ${t}${n > 1 ? "s" : ""}`).join(", ");
        const keywords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["topKeywords"])(block.items.map((i)=>`${i.title} ${i.rawContent}`).join(" "), 6);
        const day = block.start.toISOString().slice(0, 10);
        const projectName = block.projectId ? (await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findUnique({
            where: {
                id: block.projectId
            },
            select: {
                name: true
            }
        }))?.name ?? "Project" : "Inbox";
        const title = `Work Session ${day} · ${fmtHM(block.start)}–${fmtHM(last.capturedAt)} · ${block.items.length} captures`;
        const rawContent = `# ${title}\n\n` + `**Project:** ${projectName}\n` + `**Block:** ${block.start.toISOString()} → ${last.capturedAt.toISOString()} (gap-tolerant rollup, 90 min)\n` + `**Members:** ${block.items.length} (${typeStr})\n` + `**Top topics:** ${keywords.join(", ") || "—"}\n\n` + `## Captures in this block\n` + block.items.map((i)=>`- [${fmtHM(i.capturedAt)}] **${i.itemType}** ${i.title}${i.structuredSummary ? ` — ${i.structuredSummary.slice(0, 140)}` : ""}`).join("\n") + "\n";
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveItem"])({
            title,
            rawContent,
            itemType: "session",
            projectId: block.projectId,
            structuredSummary: `Rolled up ${block.items.length} captures (${typeStr}) · topics: ${keywords.slice(0, 4).join(", ") || "—"}`,
            sourceApp: "MemoryCompressionDaemon",
            metadata: {
                session_key: sessionKey,
                session_start: block.start.toISOString(),
                session_end: last.capturedAt.toISOString(),
                member_ids: block.items.map((i)=>i.id),
                type_counts: typeCounts,
                keywords
            }
        });
        created.push({
            projectId: block.projectId,
            projectName,
            title,
            members: block.items.length
        });
    }
    return created;
}
// ------------------------------------------
// 2. PROJECT SUMMARY RE-SYNTHESIS + HEALTH PERSISTENCE
// ------------------------------------------
function synthesizeRollingSummary(project, items, decisions, gaps, lastSessionTitle, resolvedFixes = [], activeFiles = []) {
    const typeCounts = {};
    for (const it of items)typeCounts[it.itemType] = (typeCounts[it.itemType] ?? 0) + 1;
    const typeStr = Object.entries(typeCounts).sort((a, b)=>b[1] - a[1]).map(([t, n])=>`${n} ${t}${n > 1 ? "s" : ""}`).join(", ");
    const keywords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["topKeywords"])(items.map((i)=>`${i.title} ${i.rawContent}`).join(" "), 8);
    const sessionLine = lastSessionTitle ? `\n- Latest work session: ${lastSessionTitle}` : "";
    const lines = [];
    lines.push(`Compressed memory for **${project.name}** (${items.length} captures: ${typeStr || "none"}; auto-synthesized by the Memory Compression Daemon).`);
    lines.push(``);
    lines.push(`## Current Focus`);
    lines.push(keywords.length > 0 ? `Active themes across recent captures: ${keywords.join(", ")}.` : `No recent capture activity to derive themes from.`);
    lines.push(``);
    lines.push(`## Recent Activity (last ${SUMMARY_WINDOW_DAYS} days)`);
    lines.push(`- ${items.length} captures on record.${sessionLine}`);
    lines.push(``);
    lines.push(`## Active Decisions (do not violate)`);
    if (decisions.length > 0) {
        // v2.2: de-duplicate by normalized decision text. Repeated captures of the same
        // choice log multiple Decision rows, and a degenerate 5x-same-decision list
        // floods the Tier-1 char budget, crowding out fixes/gaps (and repeating itself
        // verbatim in every injected prompt).
        const seenDecisions = new Set();
        const uniqueDecisions = [];
        for (const d of decisions){
            const key = `${d.decision.trim().toLowerCase()}|${d.title.trim().toLowerCase()}`;
            if (seenDecisions.has(key)) continue;
            seenDecisions.add(key);
            uniqueDecisions.push(d);
            if (uniqueDecisions.length >= 5) break;
        }
        for (const d of uniqueDecisions){
            lines.push(`- **${d.title.slice(0, 60)}**: ${d.decision.slice(0, 80)} (Reason: ${d.reasoning.slice(0, 60)})`);
        }
    } else {
        lines.push(`- None logged yet — capture choices with 'Decision: ... Reason: ...'`);
    }
    lines.push(``);
    lines.push(`## Resolved Fixes`);
    // v2.2: dedupe identical fix lines for the same reason as decisions above.
    const uniqueFixes = [
        ...new Set(resolvedFixes.map((f)=>f.trim()).filter(Boolean))
    ];
    if (uniqueFixes.length > 0) {
        for (const fx of uniqueFixes.slice(0, 4))lines.push(`- ${fx.slice(0, 130)}`);
    } else {
        lines.push(`- No automated bug fixes logged yet.`);
    }
    if (activeFiles.length > 0) {
        lines.push(``);
        lines.push(`## Key Files on Record`);
        lines.push(`- ${activeFiles.slice(0, 10).join(", ")}`);
    }
    if (gaps.length > 0) {
        lines.push(``);
        lines.push(`## Knowledge Gaps`);
        for (const g of gaps)lines.push(`- [${g.severity.toUpperCase()}] ${g.gap} — ${g.detail}`);
    }
    return lines.join("\n").slice(0, MAX_SUMMARY_CHARS);
}
async function updateProjectSummaries(trigger) {
    const projects = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findMany({
        orderBy: {
            updatedAt: "desc"
        }
    });
    const updated = [];
    const gapReport = {};
    for (const prow of projects){
        const [itemRows, decisionRows] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
                where: {
                    projectId: prow.id,
                    capturedAt: {
                        gte: new Date(Date.now() - SUMMARY_WINDOW_DAYS * 864e5)
                    }
                },
                orderBy: {
                    capturedAt: "desc"
                },
                take: 100
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].decision.findMany({
                where: {
                    projectId: prow.id
                },
                orderBy: {
                    decidedAt: "desc"
                },
                take: 10
            })
        ]);
        // Nothing to derive from — keep existing summary untouched
        if (itemRows.length === 0) continue;
        // Proper parsing via toItem keeps metadata a real object (fixes detection)
        const items = itemRows.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toItem"])({
                ...r,
                metadata: r.metadata
            }));
        const decisions = decisionRows.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDecision"]);
        const project = {
            id: prow.id,
            name: prow.name,
            slug: prow.slug,
            rootPath: prow.rootPath,
            keywords: JSON.parse(prow.keywords || "[]"),
            gitRemotes: JSON.parse(prow.gitRemotes || "[]"),
            rollingSummary: prow.rollingSummary,
            createdAt: prow.createdAt.toISOString(),
            updatedAt: prow.updatedAt.toISOString()
        };
        const edges = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProjectGraph"])(prow.id, 50);
        const { resolvedFixes, activeFiles } = extractFixesAndFiles(items, edges);
        const { score, gaps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeHealthAndGaps"])(project, items, decisions, resolvedFixes);
        gapReport[project.name] = gaps;
        const lastSessionRow = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findFirst({
            where: {
                projectId: prow.id,
                itemType: "session"
            },
            orderBy: {
                capturedAt: "desc"
            },
            select: {
                title: true
            }
        });
        const synthesized = synthesizeRollingSummary(project, items, decisions, gaps, lastSessionRow?.title ?? null, resolvedFixes, activeFiles);
        // Only write when content actually changed (no churn on repeated runs)
        if (synthesized !== prow.rollingSummary) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.update({
                where: {
                    id: prow.id
                },
                data: {
                    rollingSummary: synthesized,
                    healthScore: score,
                    healthGaps: JSON.stringify(gaps),
                    lastCompressedAt: new Date(),
                    updatedAt: new Date()
                }
            });
            updated.push(project.name);
        } else {
            // Persist health/lastCompressed even when summary is unchanged
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.update({
                where: {
                    id: prow.id
                },
                data: {
                    healthScore: score,
                    healthGaps: JSON.stringify(gaps),
                    lastCompressedAt: new Date()
                }
            });
        }
    }
    void trigger;
    return {
        updated,
        gapReport
    };
}
async function runCompressionCycle(trigger = "manual") {
    if (inflight) return inflight; // never run two cycles concurrently
    inflight = (async ()=>{
        const startedAt = Date.now();
        const backfill = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureVectorIndex"])();
        const sessionDetails = await rollupSessions();
        const { updated, gapReport } = await updateProjectSummaries(trigger);
        const report = {
            ranAt: new Date().toISOString(),
            durationMs: Date.now() - startedAt,
            trigger,
            sessionsCreated: sessionDetails.length,
            sessionDetails,
            summariesUpdated: updated,
            gapReport,
            vectorsBackfilled: backfill.backfilled
        };
        lastRunAt = report.ranAt;
        lastReport = report;
        return report;
    })();
    try {
        return await inflight;
    } finally{
        inflight = null;
    }
}
// ==========================================
// 3. PER-PROJECT COMPRESSION (v2, port of memory_compressor.compress_project_memory)
// Kills token exhaustion: compresses notes, screenshots, decisions and bug fixes into a
// dense summary (< 450 tokens), persists it as Tier-1 rolling memory, and writes
// _project_summary.md + _work_replay.md into the real vault on disk.
// ==========================================
async function writeWorkSessionReplay(projectSlug, projectName, items) {
    const relPath = `ProjectBrainVault/Projects/${projectSlug}/_work_replay.md`;
    // v2.1 (port of memory_compressor._write_work_session_replay): one regenerated file
    // per compression — day blocks carry "N unique captures / M occurrences" headers,
    // activity is grouped into 45-minute work sessions, and exact repeats fold into ×N.
    const grouped = new Map();
    for (const it of items){
        const day = (it.capturedAt || "").slice(0, 10) || "Unknown-Date";
        const arr = grouped.get(day) ?? [];
        arr.push(it);
        grouped.set(day, arr);
    }
    const occurrencesOf = (it)=>Math.max(1, Number(it.metadata?.occurrence_count ?? 1));
    const lines = [
        `# ${projectName} — Work Replay`,
        "",
        "> Regenerated from captures; repeated exact captures are folded into occurrence counts.",
        ""
    ];
    const days = [
        ...grouped.keys()
    ].sort((a, b)=>b.localeCompare(a));
    for (const day of days){
        const dayItems = grouped.get(day);
        const totalOccurrences = dayItems.reduce((acc, it)=>acc + occurrencesOf(it), 0);
        lines.push(`## ${day} · ${dayItems.length} unique captures / ${totalOccurrences} occurrences`);
        // Chronological split into work sessions whenever the capture gap exceeds 45 minutes
        const chrono = [
            ...dayItems
        ].sort((a, b)=>(a.capturedAt || "").localeCompare(b.capturedAt || ""));
        const sessions = [];
        let current = [];
        let priorMs = null;
        for (const it of chrono){
            const stampMs = Date.parse(it.capturedAt || "");
            if (current.length > 0 && Number.isFinite(stampMs) && priorMs !== null && stampMs - priorMs > REPLAY_SESSION_GAP_MS) {
                sessions.push(current);
                current = [];
            }
            current.push(it);
            if (Number.isFinite(stampMs)) priorMs = stampMs;
        }
        if (current.length > 0) sessions.push(current);
        sessions.forEach((session, idx)=>{
            const first = (session[0].capturedAt || "").slice(11, 16);
            const last = (session[session.length - 1].capturedAt || "").slice(11, 16);
            lines.push("", `### Session ${idx + 1} · ${first}–${last}`);
            for (const it of session){
                const count = occurrencesOf(it);
                const suffix = count > 1 ? ` ×${count}` : "";
                lines.push(`- **[${it.itemType.toUpperCase()}] ${it.title}**${suffix} — ${it.structuredSummary || ""}`);
            }
        });
        lines.push("");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeVaultFile"])(relPath, lines.join("\n"));
    return relPath;
}
async function compressProjectMemory(projectId, opts = {}) {
    const prow = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findUnique({
        where: {
            id: projectId
        }
    });
    if (!prow) return {
        error: `Project '${projectId}' not found`
    };
    const [itemRows, decisionRows] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
            where: {
                projectId
            },
            orderBy: {
                capturedAt: "desc"
            },
            take: 100
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].decision.findMany({
            where: {
                projectId
            },
            orderBy: {
                decidedAt: "desc"
            },
            take: 25
        })
    ]);
    const edges = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProjectGraph"])(projectId, 100);
    const items = itemRows.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toItem"])(r));
    const decisions = decisionRows.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDecision"]);
    const project = {
        id: prow.id,
        name: prow.name,
        slug: prow.slug,
        rootPath: prow.rootPath,
        keywords: JSON.parse(prow.keywords || "[]"),
        gitRemotes: JSON.parse(prow.gitRemotes || "[]"),
        rollingSummary: prow.rollingSummary,
        createdAt: prow.createdAt.toISOString(),
        updatedAt: prow.updatedAt.toISOString()
    };
    const notesCount = items.filter((i)=>i.itemType === "note").length;
    const shotsCount = items.filter((i)=>i.itemType === "screenshot").length;
    const termsCount = items.filter((i)=>i.itemType === "terminal").length;
    // v2.1: unique captures represent MORE observed occurrences after duplicate folding
    const occurrencesRepresented = items.reduce((acc, it)=>acc + Math.max(1, Number(it.metadata?.occurrence_count ?? 1)), 0);
    const { resolvedFixes, activeFiles } = extractFixesAndFiles(items, edges);
    const { score, gaps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeHealthAndGaps"])(project, items, decisions, resolvedFixes);
    const lastSessionRow = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findFirst({
        where: {
            projectId,
            itemType: "session"
        },
        orderBy: {
            capturedAt: "desc"
        },
        select: {
            title: true
        }
    });
    // Deterministic compressed digest (works offline, zero API keys)
    let finalSummary = synthesizeRollingSummary(project, items, decisions, gaps, lastSessionRow?.title ?? null, resolvedFixes, activeFiles);
    // Optional live-LLM compression pass (Ollama / OpenAI) — falls back seamlessly
    let llmDigestUsed = false;
    const llmDigest = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$llm$2d$bridge$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["llmBridge"].completeText("Compress the following project state into a dense, factual paragraph (< 120 words) " + "for an AI coding assistant. Preserve exact filenames, decisions, and package fixes.", finalSummary, 200);
    if (llmDigest) {
        finalSummary = llmDigest.slice(0, MAX_SUMMARY_CHARS);
        llmDigestUsed = true;
    }
    const now = new Date();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.update({
        where: {
            id: projectId
        },
        data: {
            rollingSummary: finalSummary,
            healthScore: score,
            healthGaps: JSON.stringify(gaps),
            lastCompressedAt: now,
            updatedAt: now
        }
    });
    // v2: write the enriched _project_summary.md + _work_replay.md to the real vault
    const summaryRelPath = `ProjectBrainVault/Projects/${project.slug}/_project_summary.md`;
    if (!opts.skipDiskWrites) {
        const decisionsMd = decisions.map((d)=>`- **${d.title}**: ${d.decision} *(Reason: ${d.reasoning})*`).join("\n") || "- None recorded yet.";
        const fixesMd = resolvedFixes.map((fx)=>`- ${fx}`).join("\n") || "- None recorded yet.";
        const gapsMd = gaps.map((g)=>`- ⚠️ ${g.gap} — ${g.detail}`).join("\n") || "- ✅ No knowledge gaps detected!";
        const keywords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["topKeywords"])(items.map((i)=>`${i.title} ${i.rawContent}`).join(" "), 8);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeVaultFile"])(summaryRelPath, `# ${project.name} — Compressed Project Brain\n\n` + `- **Health Score:** ${score}/100 (${healthStatus(score)})\n` + `- **Unique Captures Indexed:** ${items.length} (${occurrencesRepresented} observed occurrences after duplicate folding)\n` + `- **Composition:** ${notesCount} notes, ${shotsCount} screenshots, ${termsCount} terminal logs\n` + `- **Decisions Logged:** ${decisions.length}\n` + `- **Last Compressed:** ${now.toISOString()}\n\n` + `## 1. Compressed Rolling Memory (Tier-1 Prompt Payload)\n${finalSummary}\n\n` + `## 2. Key Architectural Decisions\n${decisionsMd}\n\n` + `## 3. Known Bug Fixes & Actionable Remedies\n${fixesMd}\n\n` + `## 4. Knowledge Gaps & Recommendations\n${gapsMd}\n` + (activeFiles.length > 0 ? `\n## 5. Key Files\n- ${activeFiles.slice(0, 10).join(", ")}\n` : "") + (keywords.length > 0 ? `\n_Topics: ${keywords.join(", ")}_\n` : ""));
    }
    const replayRelPath = opts.skipDiskWrites ? `ProjectBrainVault/Projects/${project.slug}/_work_replay.md` : await writeWorkSessionReplay(project.slug, project.name, items);
    return {
        project_id: project.id,
        project_name: project.name,
        compressed_rolling_summary: finalSummary,
        estimated_summary_tokens: Math.max(1, Math.floor(finalSummary.length / 4)),
        health: {
            score,
            status: healthStatus(score),
            gaps: gaps.map((g)=>g.gap)
        },
        summary_file: summaryRelPath,
        work_replay_file: replayRelPath,
        items_compressed: items.length,
        occurrences_represented: occurrencesRepresented,
        llm_digest_used: llmDigestUsed
    };
}
async function findCrossProjectSolutions(errorQuery, excludeProjectId = null) {
    const hits = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchVault"])(errorQuery, null, 15);
    const reusable = [];
    for (const h of hits){
        if (excludeProjectId && h.projectId === excludeProjectId) continue;
        let sourceProject = "Inbox";
        if (h.projectId) {
            const proj = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findUnique({
                where: {
                    id: h.projectId
                },
                select: {
                    name: true
                }
            });
            sourceProject = proj?.name ?? "Inbox";
        }
        reusable.push({
            item_id: h.id,
            source_project: sourceProject,
            title: h.title,
            summary: h.structuredSummary,
            suggested_fix: typeof h.metadata?.fix === "string" ? h.metadata.fix : "",
            captured_at: h.capturedAt
        });
    }
    // v2.2: stable partition — items that actually carry an extracted fix ARE the
    // reusable solutions, so they rank above fixless mentions. Order WITHIN each
    // group stays exactly as searchVault ranked it (FTS relevance): re-sorting by
    // recency here would let generic-advice captures ("Inspect stack trace for …")
    // outrank a strongly-matching real fix from another project.
    const withFix = reusable.filter((r)=>r.suggested_fix);
    const withoutFix = reusable.filter((r)=>!r.suggested_fix);
    return [
        ...withFix,
        ...withoutFix
    ];
}
}),
"[project]/src/lib/brain/dedup.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEDUP_WINDOW_HOURS_DEFAULT",
    ()=>DEDUP_WINDOW_HOURS_DEFAULT,
    "canonicalizeText",
    ()=>canonicalizeText,
    "contentFingerprint",
    ()=>contentFingerprint,
    "findRecentDuplicate",
    ()=>findRecentDuplicate,
    "getDedupWindowHours",
    ()=>getDedupWindowHours,
    "occurrenceCount",
    ()=>occurrenceCount,
    "recordDuplicateOccurrence",
    ()=>recordDuplicateOccurrence
]);
// Project Brain OS — v2.1 Exact Duplicate Folding Engine
// Port of memory_compressor.py v2.1 (find_recent_duplicate / record_duplicate_occurrence).
//
// Deduplication is EXACT-content, project-scoped and time-bounded (default 36h window):
// similar-but-not-identical content is intentionally NOT merged to avoid accidental
// data loss. Folded duplicates never delete the original capture — the item keeps a
// `dedup_fingerprint`, `occurrence_count` and `last_seen_at` in its JSON metadata.
//
// v2.2: the window is tunable at runtime — precedence:
//   DEDUP_WINDOW_HOURS env var  ->  `dedup_window_hours` DB setting  ->  36h default.
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/settings.ts [app-route] (ecmascript)");
;
;
;
;
const DEDUP_WINDOW_HOURS_DEFAULT = 36;
const DEDUP_WINDOW_MIN = 1;
const DEDUP_WINDOW_MAX = 24 * 365; // one year is the sane upper bound
async function getDedupWindowHours() {
    const envRaw = (process.env.DEDUP_WINDOW_HOURS ?? "").trim();
    if (envRaw) return clampWindow(Number(envRaw));
    const settingRaw = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["effectiveSetting"])("dedup_window_hours")).trim();
    if (settingRaw) return clampWindow(Number(settingRaw));
    return DEDUP_WINDOW_HOURS_DEFAULT;
}
function clampWindow(value) {
    if (!Number.isFinite(value)) return DEDUP_WINDOW_HOURS_DEFAULT;
    return Math.min(DEDUP_WINDOW_MAX, Math.max(DEDUP_WINDOW_MIN, Math.round(value)));
}
function canonicalizeText(text) {
    const normalized = (text ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().toLowerCase();
    return normalized.replace(/\s+/g, " ");
}
function contentFingerprint(rawContent, itemType) {
    const canonical = `${(itemType ?? "note").trim().toLowerCase()}\0${canonicalizeText(rawContent)}`;
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(canonical, "utf-8").digest("hex");
}
function parseMetadata(value) {
    if (typeof value !== "string") {
        return value && typeof value === "object" ? value : {};
    }
    try {
        const parsed = JSON.parse(value || "{}");
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch  {
        return {};
    }
}
async function findRecentDuplicate(input) {
    const { rawContent, itemType = "note", projectId = null } = input;
    // v2.2: fall back to the tunable window (env -> setting -> 36h) when no explicit
    // hours are passed — call sites below now resolve it so the semantics are testable.
    const hours = Math.max(1, input.hours ?? await getDedupWindowHours());
    const fingerprint = contentFingerprint(rawContent, itemType);
    const cutoff = new Date(Date.now() - hours * 3600 * 1000);
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
        where: {
            projectId: projectId ?? null,
            capturedAt: {
                gte: cutoff
            }
        },
        orderBy: {
            capturedAt: "desc"
        },
        take: 250
    });
    for (const row of rows){
        const metadata = parseMetadata(row.metadata);
        const prior = typeof metadata.dedup_fingerprint === "string" ? metadata.dedup_fingerprint : contentFingerprint(row.rawContent, row.itemType);
        if (prior === fingerprint) {
            return {
                item: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toItem"])({
                    ...row,
                    metadata: row.metadata
                }),
                fingerprint
            };
        }
    }
    return {
        item: null,
        fingerprint
    };
}
async function recordDuplicateOccurrence(itemId) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findUnique({
        where: {
            id: itemId
        }
    });
    if (!row) throw new Error(`Item '${itemId}' not found`);
    const metadata = parseMetadata(row.metadata);
    if (typeof metadata.dedup_fingerprint !== "string") {
        metadata.dedup_fingerprint = contentFingerprint(row.rawContent, row.itemType);
    }
    const nextCount = Math.max(1, Number(metadata.occurrence_count ?? 1)) + 1;
    const lastSeenAt = new Date().toISOString();
    metadata.occurrence_count = nextCount;
    metadata.last_seen_at = lastSeenAt;
    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.update({
        where: {
            id: itemId
        },
        data: {
            metadata: JSON.stringify(metadata)
        }
    });
    return {
        item: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toItem"])({
            ...updated,
            metadata: updated.metadata
        }),
        occurrence_count: nextCount,
        last_seen_at: lastSeenAt
    };
}
function occurrenceCount(item) {
    return Math.max(1, Number(item.metadata?.occurrence_count ?? 1));
}
}),
"[project]/src/lib/brain/embeddings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMBEDDING_DIM",
    ()=>EMBEDDING_DIM,
    "EMBEDDING_MODEL",
    ()=>EMBEDDING_MODEL,
    "cosineSimilarity",
    ()=>cosineSimilarity,
    "decodeVector",
    ()=>decodeVector,
    "embedForStorage",
    ()=>embedForStorage,
    "embedText",
    ()=>embedText,
    "encodeVector",
    ()=>encodeVector,
    "newVectorId",
    ()=>newVectorId,
    "tokenize",
    ()=>tokenize,
    "topKeywords",
    ()=>topKeywords
]);
// Project Brain OS — Local Vector Engine ("brain-hash-v1")
// sqlite-vec-pattern embeddings: hashed n-gram feature vectors stored as base64 Float32
// inside the same SQLite db (ItemVector table). Fully deterministic, offline, zero API keys.
//
// Why hashed n-grams: word unigrams capture exact topic overlap, word bigrams capture
// phrase structure ("knowledge graph"), and character trigrams give morphological
// robustness ("deploy" matches "deployment", "render" matches "rendering") — enough
// semantic lift to answer queries like "find the screenshot with red Render logs"
// without any external embedding service. Swap `embedText` for a neural embedder later;
// the storage/similarity contract (base64 Float32 + cosine) stays identical.
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const EMBEDDING_DIM = 256;
const EMBEDDING_MODEL = "brain-hash-v1";
const STOPWORDS = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "nor",
    "so",
    "yet",
    "of",
    "to",
    "in",
    "on",
    "at",
    "by",
    "for",
    "with",
    "about",
    "into",
    "from",
    "as",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "am",
    "do",
    "does",
    "did",
    "have",
    "has",
    "had",
    "will",
    "would",
    "shall",
    "should",
    "can",
    "could",
    "may",
    "might",
    "must",
    "it",
    "its",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "we",
    "they",
    "them",
    "his",
    "her",
    "my",
    "your",
    "our",
    "their",
    "me",
    "him",
    "us",
    "if",
    "then",
    "else",
    "when",
    "while",
    "because",
    "than",
    "too",
    "very",
    "just",
    "also",
    "not",
    "no",
    "yes",
    "here",
    "there",
    "what",
    "which",
    "who",
    "whom",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "only",
    "own",
    "same",
    "s",
    "t",
    "don",
    "now"
]);
/** FNV-1a 32-bit string hash — fast, deterministic, well-distributed. */ function fnv1a(str) {
    let h = 0x811c9dc5;
    for(let i = 0; i < str.length; i++){
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
}
function tokenize(text) {
    return text.toLowerCase().split(/[^a-z0-9+#._-]+/i).map((t)=>t.replace(/^[._-]+|[._-]+$/g, "")).filter((t)=>t.length > 1 && !STOPWORDS.has(t));
}
/** Character trigrams of a token (edge-padded) for morphological robustness. */ function charTrigrams(token) {
    const padded = `#${token}#`;
    const grams = [];
    for(let i = 0; i < padded.length - 2; i++)grams.push(padded.slice(i, i + 3));
    return grams;
}
/** Extract weighted n-gram features from token stream. */ function extractFeatures(tokens) {
    const features = [];
    for (const tok of tokens){
        // Word unigram — strongest signal
        features.push({
            key: `w:${tok}`,
            weight: 1.0
        });
        // Character trigrams — morphological variants ("deploy" ≈ "deployment")
        for (const g of charTrigrams(tok)){
            features.push({
                key: `c:${g}`,
                weight: 0.3
            });
        }
    }
    // Word bigrams — phrase structure ("red render", "knowledge graph")
    for(let i = 0; i < tokens.length - 1; i++){
        features.push({
            key: `b:${tokens[i]}_${tokens[i + 1]}`,
            weight: 0.7
        });
    }
    return features;
}
function embedText(text) {
    const vec = new Float32Array(EMBEDDING_DIM);
    const tokens = tokenize(text);
    if (tokens.length === 0) return vec;
    // Count raw occurrences per feature key first (for sublinear TF)
    const counts = new Map();
    const weights = new Map();
    for (const f of extractFeatures(tokens)){
        counts.set(f.key, (counts.get(f.key) ?? 0) + 1);
        weights.set(f.key, Math.max(weights.get(f.key) ?? 0, f.weight));
    }
    let norm = 0;
    for (const [key, count] of counts){
        const tf = 1 + Math.log(count); // sublinear TF dampens repetition
        const contribution = tf * (weights.get(key) ?? 1.0);
        const bucket = fnv1a(key) % EMBEDDING_DIM;
        // Alternate sign by a second hash bit to reduce collision bias
        const sign = fnv1a(`sign:${key}`) & 1 ? 1 : -1;
        vec[bucket] += sign * contribution;
    }
    for(let i = 0; i < EMBEDDING_DIM; i++)norm += vec[i] * vec[i];
    norm = Math.sqrt(norm);
    if (norm > 0) {
        for(let i = 0; i < EMBEDDING_DIM; i++)vec[i] /= norm;
    }
    return vec;
}
function cosineSimilarity(a, b) {
    const len = Math.min(a.length, b.length);
    let dot = 0;
    for(let i = 0; i < len; i++)dot += a[i] * b[i];
    return dot;
}
function encodeVector(vec) {
    return Buffer.from(vec.buffer, vec.byteOffset, vec.byteLength).toString("base64");
}
function decodeVector(b64) {
    const buf = Buffer.from(b64, "base64");
    return new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.byteLength / 4));
}
function embedForStorage(text) {
    return {
        model: EMBEDDING_MODEL,
        dim: EMBEDDING_DIM,
        vector: encodeVector(embedText(text))
    };
}
function newVectorId() {
    return `vec_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 12)}`;
}
function topKeywords(text, limit = 6) {
    const counts = new Map();
    for (const tok of tokenize(text)){
        counts.set(tok, (counts.get(tok) ?? 0) + 1);
    }
    return [
        ...counts.entries()
    ].sort((a, b)=>b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([k])=>k);
}
}),
"[project]/src/lib/brain/ingest.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enrichCaptureInput",
    ()=>enrichCaptureInput,
    "recordCaptureJob",
    ()=>recordCaptureJob
]);
// Project Brain OS — v2.5 Ingest Enrichment Layer
//
// One shared pre-processing path for EVERY capture entrypoint
// (/api/capture UI + MCP, /api/agent/capture desktop agent):
//   1. Privacy gate      — sensitive windows blocked, secrets scrubbed
//   2. Screenshot OCR     — image_base64 persisted to vault assets + vision OCR
//   3. Content hash      — deterministic idempotency + concurrency token
//   4. Capture audit     — idempotent CaptureJob ledger row per payload
//
// Keeping this out of the individual routes guarantees the desktop agent, the
// workspace UI, and MCP tools can never bypass the privacy layer.
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/brain/router.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$privacy$2d$redactor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/privacy-redactor.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$vision$2d$ocr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/vision-ocr.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$assets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/assets.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
/** Resolves where a screenshot asset should live (project slug or Inbox). */ async function assetSlugFor(input) {
    if (input.forcedProjectId) {
        const forcedId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveProjectId"])(input.forcedProjectId);
        if (forcedId) {
            const project = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProjectById"])(forcedId);
            if (project) return project.slug;
        }
        return "";
    }
    const match = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectProject"])({
        rawContent: input.rawContent,
        windowTitle: input.windowTitle,
        activeFilePath: input.activeFilePath ?? "",
        sourceUrl: input.sourceUrl ?? ""
    });
    return match.projectSlug || "";
}
async function enrichCaptureInput(input) {
    const privacy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$privacy$2d$redactor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeAndValidateCapture"])({
        rawContent: input.rawContent,
        windowTitle: input.windowTitle,
        sourceApp: input.sourceApp
    });
    if (!privacy.allowed) {
        return {
            blocked: true,
            reason: privacy.blockedReason ?? "Blocked by Privacy Guard"
        };
    }
    let enriched = privacy.sanitizedContent;
    let visualHint = input.visualHint ?? "";
    let assetPath = input.assetPath ?? "";
    let ocr = {
        used: false
    };
    let assetReused = false;
    let assetSha256 = null;
    if (input.imageBase64) {
        // v2.6 trust plane: sha256 asset identity. The SAME screenshot posted twice
        // reuses the stored file + stored OCR result instead of writing a second
        // copy or re-running a vision call (disk-fill + cost vector closed). The
        // ledger records provider + text so a reused asset reports byte-identical
        // semantics to the original capture.
        const sha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$assets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256OfBase64"])(input.imageBase64);
        assetSha256 = sha;
        let reused = null;
        try {
            reused = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$assets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findAssetBySha256"])(sha);
        } catch  {
            reused = null; // ledger read failure must never fail the capture
        }
        if (reused) {
            assetPath = reused.storagePath;
            if (reused.ocrText) enriched = reused.ocrText;
            if (!visualHint) visualHint = `Visual capture (asset sha256 ${sha.slice(0, 12)} reused)`;
            ocr = {
                used: true,
                provider: reused.provider || "local-asset-store"
            };
            assetReused = true;
        } else {
            const slug = await assetSlugFor(input);
            const ocrResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$vision$2d$ocr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processScreenshotAndOcr"])({
                imageBase64: input.imageBase64,
                projectSlug: slug,
                itemId: `cap_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 10)}`,
                windowTitle: input.windowTitle,
                fallbackText: enriched
            });
            if (ocrResult.extractedText) enriched = ocrResult.extractedText;
            if (ocrResult.visualSemanticDescription) visualHint = ocrResult.visualSemanticDescription;
            if (ocrResult.savedAssetPath) assetPath = ocrResult.savedAssetPath;
            ocr = {
                used: true,
                provider: ocrResult.providerUsed
            };
            // Ledger write is best-effort: an asset-bookkeeping failure must never
            // fail the capture itself (raw evidence is already safe on disk).
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$assets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordAssetLedger"])({
                storagePath: ocrResult.savedAssetPath,
                sha256: sha,
                mimeType: ocrResult.mimeType,
                bytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$assets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byteSizeOfBase64"])(input.imageBase64),
                provider: ocrResult.providerUsed,
                ocrText: ocrResult.extractedText.slice(0, 20000),
                processing: "completed"
            }).catch(()=>null);
        }
    }
    // Hash the FINAL stored content (post-redaction, post-OCR) — this is the
    // token the optimistic-concurrency PATCH and the CaptureJob key share.
    const contentHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$privacy$2d$redactor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["contentHashOf"])(enriched);
    return {
        blocked: false,
        rawContent: enriched,
        visualHint,
        assetPath,
        contentHash,
        redactionCount: privacy.redactionCount,
        ocr,
        assetReused,
        assetSha256
    };
}
async function recordCaptureJob(params) {
    const redacted = {
        ...params.payload
    };
    delete redacted.image_base64; // never persist the raw image into the ledger
    if (typeof redacted.raw_content === "string" && redacted.raw_content.length > 2000) {
        redacted.raw_content = `${redacted.raw_content.slice(0, 2000)}…[truncated]`;
    }
    const payloadJson = JSON.stringify(redacted).slice(0, 4000);
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].captureJob.findUnique({
        where: {
            idempotencyKey: params.idempotencyKey
        }
    });
    if (existing) {
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].captureJob.update({
            where: {
                id: existing.id
            },
            data: {
                attempts: {
                    increment: 1
                },
                status: "completed",
                resultItemId: existing.resultItemId ?? params.resultItemId,
                payloadJson
            }
        });
        return {
            id: updated.id,
            status: updated.status,
            attempts: updated.attempts
        };
    }
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].captureJob.create({
        data: {
            id: `job_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 12)}`,
            idempotencyKey: params.idempotencyKey,
            payloadJson,
            status: "completed",
            attempts: 1,
            resultItemId: params.resultItemId
        }
    });
    return {
        id: created.id,
        status: created.status,
        attempts: 1
    };
}
}),
"[project]/src/lib/brain/llm-bridge.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HybridLLMBridge",
    ()=>HybridLLMBridge,
    "PROVIDERS",
    ()=>PROVIDERS,
    "TOKEN_BUDGET",
    ()=>TOKEN_BUDGET,
    "invalidateLlmRuntimeConfig",
    ()=>invalidateLlmRuntimeConfig,
    "llmBridge",
    ()=>llmBridge
]);
// Project Brain OS — Hybrid Local/Cloud LLM Router & Anti-Drift Prompt Pre-Structurer
// Port of llm_bridge.py (Option 1 upgrade), extended to v2.2.
//
// Zero external dependencies: uses global fetch (Node 18+) and never throws — every
// failure degrades to the built-in Deterministic Offline Synthesizer so the app never
// blocks on API keys.
//
//  1. detectActiveBackend()  — provider override (runtime setting) or the auto chain:
//     Ollama (http://127.0.0.1:11434) -> OPENAI_API_KEY -> ANTHROPIC_API_KEY ->
//     GEMINI_API_KEY -> deterministic-offline.
//  2. completeText()         — LIVE completions for all four providers: Ollama,
//     OpenAI (chat/completions), Anthropic (v1/messages), Gemini (generateContent).
//     Returns "" on any failure so callers fall back to deterministic synthesis
//     seamlessly (never fabricates).
//  3. rewriteRawPrompt()     — rewrites a raw, unclear thought into a strict 5-section
//     engineering spec anchored to Tier-1 Rolling Memory, Tier-2 Decision Graph, and
//     Tier-3 Vault Evidence, with a ~2,500 token budget estimator.
//  4. probeBackend()         — real connectivity test per provider (used by the
//     Runtime Settings dialog to "wire a live backend" with immediate feedback).
//
// v2.2 runtime configuration: values come from the DB Setting store first, then env
// vars, then defaults — so a user can paste an OpenAI key in the UI and grounded
// answers upgrade from excerpts to synthesis without a restart. Base URLs are also
// overridable (OpenAI-compatible gateways, Azure-style proxies, LM Studio bridges).
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/settings.ts [app-route] (ecmascript)");
;
const TOKEN_BUDGET = 2500;
const PROVIDERS = [
    "auto",
    "ollama",
    "openai",
    "anthropic",
    "gemini",
    "deterministic-offline"
];
const DEFAULT_OPENAI_BASE = "https://api.openai.com/v1";
const DEFAULT_ANTHROPIC_BASE = "https://api.anthropic.com";
const DEFAULT_GEMINI_BASE = "https://generativelanguage.googleapis.com";
const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
function normalizeBase(url) {
    return url.replace(/\/+$/, "");
}
class HybridLLMBridge {
    // backendMemo keeps backend detection stable for 30s — but ONLY while the runtime
    // config is unchanged (see runtimeConfig(): a config change drops this memo so a
    // freshly saved key/provider takes effect on the very next call, in any route).
    backendMemo = null;
    lastConfigJson = null;
    /** v2.2: merge env vars with the runtime settings store (DB settings win).
   *  Read FRESH on every call (the Setting table is tiny) — memoizing this created
   *  cross-bundle staleness where a just-saved key was invisible to other routes. */ async runtimeConfig() {
        const s = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readSettings"])();
        const pick = (key, envVal, fallback = "")=>(s[key] || envVal || fallback).trim();
        const rawTimeout = pick("llm_timeout_seconds", process.env.LLM_TIMEOUT_SECONDS || "");
        const timeoutNum = rawTimeout ? Number(rawTimeout) : NaN;
        const config = {
            providerOverride: s.llm_provider || "auto",
            ollamaUrl: normalizeBase(pick("ollama_url", process.env.OLLAMA_URL || "", DEFAULT_OLLAMA_URL)),
            ollamaModel: pick("ollama_model", process.env.OLLAMA_MODEL || "", "llama3.2"),
            openaiKey: pick("openai_api_key", process.env.OPENAI_API_KEY || ""),
            anthropicKey: pick("anthropic_api_key", process.env.ANTHROPIC_API_KEY || ""),
            geminiKey: pick("gemini_api_key", process.env.GEMINI_API_KEY || ""),
            openaiBase: normalizeBase(pick("openai_base_url", process.env.OPENAI_BASE_URL || "", DEFAULT_OPENAI_BASE)),
            anthropicBase: normalizeBase(pick("anthropic_base_url", process.env.ANTHROPIC_BASE_URL || "", DEFAULT_ANTHROPIC_BASE)),
            geminiBase: normalizeBase(pick("gemini_base_url", process.env.GEMINI_BASE_URL || "", DEFAULT_GEMINI_BASE)),
            timeoutSeconds: Number.isFinite(timeoutNum) && timeoutNum >= 3 && timeoutNum <= 120 ? timeoutNum : null
        };
        // Config changed (settings write from this or another route bundle) -> the
        // previously detected backend is no longer trustworthy; force re-detection.
        const configJson = JSON.stringify(config);
        if (this.lastConfigJson !== null && this.lastConfigJson !== configJson) {
            this.backendMemo = null;
        }
        this.lastConfigJson = configJson;
        return config;
    }
    /** v2.2: drop memoized config + backend so new settings take effect immediately. */ invalidateRuntimeConfig() {
        this.lastConfigJson = null;
        this.backendMemo = null;
    }
    timeoutMsFor(cfg, provider, overrideMs) {
        if (overrideMs) return overrideMs;
        if (cfg.timeoutSeconds) return cfg.timeoutSeconds * 1000;
        // Ollama answers fast locally; cloud synthesis of ~700 tokens needs more headroom.
        return provider === "ollama" ? 8_000 : 25_000;
    }
    // =========================================================================
    // 1. BACKEND DETECTION (never throws)
    // =========================================================================
    async detectActiveBackend() {
        const now = Date.now();
        // Resolve config FIRST: it clears backendMemo when the config changed, so a
        // freshly saved provider/key is honored on this very call.
        const cfg = await this.runtimeConfig();
        if (this.backendMemo && this.backendMemo.expiresAt > now) return this.backendMemo.backend;
        let backend;
        if (cfg.providerOverride === "deterministic-offline") {
            backend = {
                provider: "deterministic-offline",
                model: "rule-synthesizer-v2",
                mode: "offline_fallback"
            };
        } else if (cfg.providerOverride === "openai") {
            backend = {
                provider: "openai",
                model: "gpt-4o-mini",
                mode: "cloud_llm"
            };
        } else if (cfg.providerOverride === "anthropic") {
            backend = {
                provider: "anthropic",
                model: "claude-3-5-sonnet-latest",
                mode: "cloud_llm"
            };
        } else if (cfg.providerOverride === "gemini") {
            backend = {
                provider: "gemini",
                model: "gemini-2.5-flash",
                mode: "cloud_llm"
            };
        } else if (cfg.providerOverride === "ollama") {
            // Forced local: report ollama regardless of liveness (probe surfaces health);
            // completeText degrades to "" -> offline synthesis when unreachable.
            backend = {
                provider: "ollama",
                model: cfg.ollamaModel,
                mode: "local_llm"
            };
        } else if (cfg.providerOverride === "auto" && !this.preferLocalOllamaDisabled && await this.isOllamaAlive(cfg)) {
            backend = {
                provider: "ollama",
                model: cfg.ollamaModel,
                mode: "local_llm"
            };
        } else if (cfg.openaiKey) {
            backend = {
                provider: "openai",
                model: "gpt-4o-mini",
                mode: "cloud_llm"
            };
        } else if (cfg.anthropicKey) {
            backend = {
                provider: "anthropic",
                model: "claude-3-5-sonnet-latest",
                mode: "cloud_llm"
            };
        } else if (cfg.geminiKey) {
            backend = {
                provider: "gemini",
                model: "gemini-2.5-flash",
                mode: "cloud_llm"
            };
        } else {
            backend = {
                provider: "deterministic-offline",
                model: "rule-synthesizer-v2",
                mode: "offline_fallback"
            };
        }
        this.backendMemo = {
            backend,
            expiresAt: now + 30_000
        }; // 30s probe memo
        return backend;
    }
    // Kept for backward compatibility with tests/config that toggle the auto chain.
    get preferLocalOllamaDisabled() {
        return process.env.BRAIN_DISABLE_OLLAMA_PROBE === "1";
    }
    async isOllamaAlive(cfg) {
        try {
            const url = cfg ? cfg.ollamaUrl : normalizeBase(process.env.OLLAMA_URL || DEFAULT_OLLAMA_URL);
            const res = await fetch(`${url}/api/tags`, {
                method: "GET",
                signal: AbortSignal.timeout(1500)
            });
            return res.status === 200;
        } catch  {
            return false;
        }
    }
    // =========================================================================
    // 2. LIVE COMPLETION (graceful "" fallback, like llm_bridge.complete_text)
    // =========================================================================
    async completeText(systemPrompt, userPrompt, maxTokens = 600, opts) {
        const backend = await this.detectActiveBackend();
        const cfg = await this.runtimeConfig();
        const timeoutMs = this.timeoutMsFor(cfg, backend.provider, opts?.timeoutMs);
        try {
            if (backend.provider === "ollama") {
                const res = await fetch(`${cfg.ollamaUrl}/api/generate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: cfg.ollamaModel,
                        prompt: `System: ${systemPrompt}\n\nUser: ${userPrompt}`,
                        stream: false
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.response ?? "").trim();
            }
            if (backend.provider === "openai") {
                const res = await fetch(`${cfg.openaiBase}/chat/completions`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cfg.openaiKey}`
                    },
                    body: JSON.stringify({
                        model: backend.model,
                        messages: [
                            {
                                role: "system",
                                content: systemPrompt
                            },
                            {
                                role: "user",
                                content: userPrompt
                            }
                        ],
                        max_tokens: maxTokens,
                        temperature: 0.2
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.choices?.[0]?.message?.content ?? "").trim();
            }
            if (backend.provider === "anthropic") {
                // v2.2: Anthropic Messages API parity (previously detected-but-unwired).
                const res = await fetch(`${cfg.anthropicBase}/v1/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": cfg.anthropicKey,
                        "anthropic-version": "2023-06-01"
                    },
                    body: JSON.stringify({
                        model: backend.model,
                        max_tokens: maxTokens,
                        system: systemPrompt,
                        messages: [
                            {
                                role: "user",
                                content: userPrompt
                            }
                        ]
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.content ?? []).filter((b)=>b.type === "text").map((b)=>b.text ?? "").join("").trim();
            }
            if (backend.provider === "gemini") {
                // v2.2: Gemini generateContent parity (previously detected-but-unwired).
                const url = `${cfg.geminiBase}/v1beta/models/${encodeURIComponent(backend.model)}:generateContent` + `?key=${encodeURIComponent(cfg.geminiKey)}`;
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        systemInstruction: {
                            parts: [
                                {
                                    text: systemPrompt
                                }
                            ]
                        },
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    {
                                        text: userPrompt
                                    }
                                ]
                            }
                        ],
                        generationConfig: {
                            temperature: 0.2,
                            maxOutputTokens: maxTokens
                        }
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok) return "";
                const body = await res.json();
                return (body.candidates?.[0]?.content?.parts ?? []).map((p)=>p.text ?? "").join("").trim();
            }
        } catch  {
            // Fall through cleanly to offline synthesis
            return "";
        }
        // deterministic-offline (or unknown) -> callers synthesize deterministically.
        return "";
    }
    /**
   * v2.3 real-time chat: streaming completion (blueprint "Real-time Chat").
   * TRUE token deltas for Ollama (`stream: true` NDJSON) and OpenAI (SSE);
   * Anthropic/Gemini/offline fall back to buffered completeText() and emit the
   * answer as a single delta. Returns the full text ("" = no live backend, so
   * callers keep the honest offline contract).
   */ async completeTextStream(systemPrompt, userPrompt, maxTokens, onDelta, opts) {
        const backend = await this.detectActiveBackend();
        const cfg = await this.runtimeConfig();
        const timeoutMs = this.timeoutMsFor(cfg, backend.provider, opts?.timeoutMs);
        const readLines = async (body, handle)=>{
            const reader = body.getReader();
            const decoder = new TextDecoder();
            let buf = "";
            for(;;){
                const { done, value } = await reader.read();
                if (done) break;
                buf += decoder.decode(value, {
                    stream: true
                });
                const lines = buf.split("\n");
                buf = lines.pop() ?? "";
                for (const line of lines)handle(line);
            }
            if (buf.trim()) handle(buf);
        };
        try {
            if (backend.provider === "ollama") {
                const res = await fetch(`${cfg.ollamaUrl}/api/generate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: cfg.ollamaModel,
                        prompt: `System: ${systemPrompt}\n\nUser: ${userPrompt}`,
                        stream: true
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok || !res.body) return "";
                let full = "";
                await readLines(res.body, (line)=>{
                    if (!line.trim()) return;
                    try {
                        const json = JSON.parse(line);
                        if (json.response) {
                            full += json.response;
                            onDelta(json.response);
                        }
                    } catch  {
                    // partial NDJSON line — skipped safely
                    }
                });
                return full.trim();
            }
            if (backend.provider === "openai") {
                const res = await fetch(`${cfg.openaiBase}/chat/completions`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cfg.openaiKey}`
                    },
                    body: JSON.stringify({
                        model: backend.model,
                        messages: [
                            {
                                role: "system",
                                content: systemPrompt
                            },
                            {
                                role: "user",
                                content: userPrompt
                            }
                        ],
                        max_tokens: maxTokens,
                        temperature: 0.2,
                        stream: true
                    }),
                    signal: AbortSignal.timeout(timeoutMs)
                });
                if (!res.ok || !res.body) return "";
                let full = "";
                await readLines(res.body, (line)=>{
                    const trimmed = line.trim();
                    if (!trimmed.startsWith("data:")) return;
                    const payload = trimmed.slice(5).trim();
                    if (payload === "[DONE]") return;
                    try {
                        const json = JSON.parse(payload);
                        const piece = json.choices?.[0]?.delta?.content ?? "";
                        if (piece) {
                            full += piece;
                            onDelta(piece);
                        }
                    } catch  {
                    // keep-alive comment or partial SSE — skipped safely
                    }
                });
                return full.trim();
            }
        } catch  {
            return "";
        }
        // anthropic / gemini / deterministic-offline: buffered answer, single delta
        const buffered = await this.completeText(systemPrompt, userPrompt, maxTokens, opts);
        if (buffered) onDelta(buffered);
        return buffered;
    }
    // =========================================================================
    // 3. v2.2 BACKEND PROBE (real connectivity test for the Settings dialog)
    // =========================================================================
    async probeBackend(backend) {
        const target = backend ?? await this.detectActiveBackend();
        const cfg = await this.runtimeConfig();
        const started = Date.now();
        const finish = (ok, detail)=>({
                provider: target.provider,
                ok,
                detail,
                latency_ms: Date.now() - started
            });
        try {
            if (target.provider === "deterministic-offline") {
                return finish(true, "Deterministic offline synthesizer is always available (no network).");
            }
            if (target.provider === "ollama") {
                const res = await fetch(`${cfg.ollamaUrl}/api/tags`, {
                    signal: AbortSignal.timeout(4_000)
                });
                if (!res.ok) return finish(false, `Ollama responded HTTP ${res.status}`);
                const body = await res.json();
                const models = (body.models ?? []).map((m)=>m.name ?? "").filter(Boolean);
                return finish(true, models.length ? `Ollama alive — models: ${models.slice(0, 5).join(", ")}` : "Ollama alive — no models pulled yet");
            }
            if (target.provider === "openai") {
                if (!cfg.openaiKey) return finish(false, "No OpenAI API key configured");
                const res = await fetch(`${cfg.openaiBase}/models`, {
                    headers: {
                        Authorization: `Bearer ${cfg.openaiKey}`
                    },
                    signal: AbortSignal.timeout(10_000)
                });
                if (!res.ok) return finish(false, `OpenAI HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
                const body = await res.json();
                const ids = (body.data ?? []).map((m)=>m.id ?? "").filter(Boolean);
                return finish(true, `Key valid — ${ids.length} models visible (e.g. ${ids.slice(0, 3).join(", ")})`);
            }
            if (target.provider === "anthropic") {
                if (!cfg.anthropicKey) return finish(false, "No Anthropic API key configured");
                const res = await fetch(`${cfg.anthropicBase}/v1/models`, {
                    headers: {
                        "x-api-key": cfg.anthropicKey,
                        "anthropic-version": "2023-06-01"
                    },
                    signal: AbortSignal.timeout(10_000)
                });
                if (!res.ok) return finish(false, `Anthropic HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
                const body = await res.json();
                const ids = (body.data ?? []).map((m)=>m.id ?? "").filter(Boolean);
                return finish(true, `Key valid — models: ${ids.slice(0, 4).join(", ") || "listed"}`);
            }
            if (target.provider === "gemini") {
                if (!cfg.geminiKey) return finish(false, "No Gemini API key configured");
                const res = await fetch(`${cfg.geminiBase}/v1beta/models?key=${encodeURIComponent(cfg.geminiKey)}`, {
                    signal: AbortSignal.timeout(10_000)
                });
                if (!res.ok) return finish(false, `Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`);
                const body = await res.json();
                const names = (body.models ?? []).map((m)=>m.name ?? "").filter(Boolean);
                return finish(true, `Key valid — ${names.length} models visible (e.g. ${names.slice(0, 3).join(", ")})`);
            }
            return finish(false, `Unknown provider: ${target.provider}`);
        } catch (e) {
            return finish(false, e instanceof Error ? e.message : "probe failed");
        }
    }
    // =========================================================================
    // 4. RAW UNCLEAR PROMPT -> STRUCTURED ANTI-DRIFT SPEC (rewrite_raw_prompt)
    // =========================================================================
    async rewriteRawPrompt(rawUserPrompt, contextPayload) {
        const project_name = contextPayload.project_name || "Active Project";
        const rollingMemory = contextPayload.tier_1_rolling_memory || "No summary yet.";
        const decisions = contextPayload.tier_2_decision_graph ?? [];
        const evidence = contextPayload.tier_3_recent_and_relevant_evidence ?? [];
        // Tier-2 actionable constraints (anti-drift guardrails)
        const decisionBullets = [];
        for (const d of decisions.slice(0, 5)){
            decisionBullets.push(`- **MUST RESPECT [${d.title.slice(0, 50)}]**: ${d.decision.slice(0, 70)} (Rationale: ${d.reasoning.slice(0, 50)})`);
        }
        if (decisionBullets.length === 0) {
            decisionBullets.push("- Keep implementation dependency-light and modular.");
        }
        // Tier-3 grounded evidence + past fixes
        const evidenceBullets = [];
        const knownFixes = [];
        for (const ev of evidence.slice(0, 4)){
            evidenceBullets.push(`- \`[${(ev.type || "note").toUpperCase()}]\` **${ev.title.slice(0, 60)}**: ${(ev.summary || "").slice(0, 140)}`);
        }
        if (evidenceBullets.length === 0) {
            evidenceBullets.push("- No prior conflicting captures found in vault.");
        }
        // Known fixes come from the evidence summaries produced by the analyzer ("Suggested Fix: `cmd`")
        for (const ev of evidence.slice(0, 4)){
            const m = ev.summary?.match(/`([^`]+)`/);
            if (m && /fix|install|kill-port|add /i.test(m[1])) knownFixes.push(`\`${m[1]}\` (for ${ev.title})`);
        }
        // Optional live LLM polish of the raw goal (short timeout: capture-path UX)
        let refinedObjective = await this.completeText("Rewrite the user's raw software request into 2-3 crystal-clear technical bullet points. " + "Do not invent libraries that violate the project context.", `Project: ${project_name}\nContext: ${rollingMemory}\nRaw Request: ${rawUserPrompt}`, 160, {
            timeoutMs: 6_000
        });
        if (!refinedObjective) {
            // Deterministic structuring of the raw prompt
            const sentences = rawUserPrompt.split(/[.;\n]+/).map((s)=>s.trim()).filter((s)=>s.length > 0);
            if (sentences.length === 0) {
                sentences.push("Implement the requested feature cleanly while preserving existing project architecture.");
            }
            refinedObjective = sentences.map((s, i)=>`${i + 1}. ${s}`).join("\n");
        }
        const structuredMarkdown = `# 🎯 STRUCTURED AI EXECUTION SPEC — [${project_name}]\n\n` + `## 1. Clarified Engineering Objective\n` + `*(Rewritten from raw input: "${rawUserPrompt.trim()}")*\n` + `${refinedObjective}\n\n` + `## 2. TIER 1: Compressed Project State\n` + `${rollingMemory}\n\n` + `## 3. TIER 2: Non-Negotiable Architectural Constraints (DO NOT VIOLATE — Anti-Drift Guardrails)\n` + decisionBullets.join("\n") + `\n\n## 4. TIER 3: Grounded Vault Evidence & Past Fixes\n` + evidenceBullets.join("\n") + `\n\n## 5. Strict Output & Verification Contract\n` + `- **No Context Drift:** Do NOT introduce new frameworks or databases that contradict Section 3.\n` + `- **Token Efficiency:** Output only the modified/new files with complete, runnable code (no placeholders).\n` + `- **Self-Verification Step:** Conclude with a 1-command terminal verification test so I know immediately how to test it.\n`;
        // Estimate token count (~4 chars per token)
        const estimatedTokens = Math.max(1, Math.floor(structuredMarkdown.length / 4));
        return {
            project_name,
            raw_prompt: rawUserPrompt,
            refined_objective: refinedObjective,
            known_fixes_referenced: knownFixes,
            estimated_tokens: estimatedTokens,
            token_budget_status: estimatedTokens < TOKEN_BUDGET ? "OPTIMAL (< 2,500 tokens)" : "WARNING (over 2,500 tokens)",
            backend_used: await this.detectActiveBackend(),
            structured_prompt_markdown: structuredMarkdown
        };
    }
}
const llmBridge = new HybridLLMBridge();
function invalidateLlmRuntimeConfig() {
    llmBridge.invalidateRuntimeConfig();
}
}),
"[project]/src/lib/brain/model-routing.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Pure AI-model routing logic (no DB imports) — safe for client components.
// Port of project_router.py::route_ai_model
__turbopack_context__.s([
    "routeAiModel",
    ()=>routeAiModel
]);
const CODE_ERROR_SIGNALS = [
    "traceback (most recent call last)",
    "error:",
    "exception",
    "module not found",
    "err_module_not_found",
    "syntaxerror",
    "typeerror",
    "pnpm ",
    "npm err!",
    "def ",
    "function ",
    "const ",
    "import "
];
const DECISION_SIGNALS = [
    "decision:",
    "why we chose",
    "alternatives:",
    "tradeoff",
    "architecture",
    "migrating from"
];
function routeAiModel(input) {
    const { itemType, rawContent, hasImage = false } = input;
    const contentLower = rawContent.toLowerCase();
    if (CODE_ERROR_SIGNALS.some((sig)=>contentLower.includes(sig)) || itemType === "terminal") {
        return {
            targetModel: "codex-agent",
            taskMode: "error_diagnosis_and_patch",
            reason: "Detected stack trace, terminal log, or source code snippet"
        };
    }
    if (DECISION_SIGNALS.some((sig)=>contentLower.includes(sig))) {
        return {
            targetModel: "reasoning-architect",
            taskMode: "decision_and_graph_extraction",
            reason: "Detected architectural rationale or tradeoff discussion"
        };
    }
    if (hasImage || itemType === "screenshot") {
        return {
            targetModel: "vision-ocr-extractor",
            taskMode: "visual_semantic_markdown",
            reason: "Visual screenshot capture requiring OCR + semantic indexing"
        };
    }
    return {
        targetModel: "fast-memory-structurer",
        taskMode: "summarize_and_link",
        reason: "Standard note or web clip capture"
    };
}
}),
"[project]/src/lib/brain/pipeline.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capture",
    ()=>capture,
    "newCaptureId",
    ()=>newCaptureId
]);
// Project Brain OS — Zero-Save Universal Capture Pipeline
// Port of capture_pipeline.py::ZeroSaveCapturePipeline
// v2.1: exact duplicate folding (memory_compressor.find_recent_duplicate) runs after
// project detection — a repeat capture within the dedup window in the SAME project/
// inbox folds into the existing item (occurrence_count + 1) instead of creating a row.
// v2.2: the window is runtime-tunable (DEDUP_WINDOW_HOURS env -> setting -> 36h default).
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/brain/router.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$model$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/model-routing.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$analyzer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/analyzer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$dedup$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/dedup.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/store.ts [app-route] (ecmascript)");
;
;
;
;
;
async function capture(input) {
    const { rawContent = "", itemType = "note", windowTitle = "", activeFilePath = "", sourceApp = "Workspace UI", sourceUrl = "", assetPath = "", visualHint = "", forcedProjectId = "", extraMetadata = {} } = input;
    // 1. Auto-Detect Project
    let projMatch = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectProject"])({
        rawContent,
        windowTitle,
        activeFilePath,
        sourceUrl
    });
    // v2.5: forced_project_id (MCP / desktop agent) overrides detection entirely.
    if (forcedProjectId) {
        const forcedId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveProjectId"])(forcedProjectId);
        const forcedProject = forcedId ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProjectById"])(forcedId) : null;
        if (forcedProject) {
            projMatch = {
                projectId: forcedProject.id,
                projectName: forcedProject.name,
                projectSlug: forcedProject.slug,
                confidence: 1,
                reasons: [
                    "forced_project_id override"
                ]
            };
        }
    }
    const projectId = projMatch.projectId;
    // 1.5 v2.1 Exact Duplicate Folding — same project/inbox + same type + same canonical
    // content within the 36-hour window merges into the existing capture. The toast tells
    // the user the repeat was folded with its new occurrence count (brain_api.py parity).
    const duplicate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$dedup$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findRecentDuplicate"])({
        rawContent,
        itemType,
        projectId
    });
    if (duplicate.item) {
        const merged = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$dedup$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordDuplicateOccurrence"])(duplicate.item.id);
        return {
            status: "duplicate_merged",
            toastNotification: `Duplicate folded into existing capture (${merged.occurrence_count} occurrences) — no new item created.`,
            item: merged.item,
            projectMatch: projMatch,
            modelRoute: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$model$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeAiModel"])({
                itemType,
                rawContent,
                hasImage: Boolean(assetPath) || itemType === "screenshot"
            }),
            decisionLogged: null
        };
    }
    // 2. Auto-Route to the right AI Model (Codex vs Vision vs Architect)
    const modelRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$model$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeAiModel"])({
        itemType,
        rawContent,
        hasImage: Boolean(assetPath) || itemType === "screenshot"
    });
    // 3. Extract Structured Intelligence (Error fix, Decision, Entities, Summary)
    //    v2: async — optionally enriched by the HybridLLMBridge when a backend is reachable
    const analysis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$analyzer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeCapture"])({
        rawContent,
        windowTitle,
        visualHint,
        routedModel: modelRoute.targetModel
    });
    // 4. Save Item (SQLite + FTS index + virtual Vault md path)
    const savedItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveItem"])({
        title: analysis.title,
        rawContent,
        itemType,
        projectId,
        structuredSummary: analysis.summary,
        visualDescription: analysis.visualDescription,
        assetPath,
        sourceApp,
        sourceUrl,
        metadata: {
            routed_model: modelRoute.targetModel,
            task_mode: modelRoute.taskMode,
            project_confidence: projMatch.confidence,
            routing_reasons: projMatch.reasons,
            // v2.1: seed the dedup fingerprint so future lookups skip re-hashing every candidate
            dedup_fingerprint: duplicate.fingerprint,
            occurrence_count: 1,
            // v2 (llm_bridge parity): persist the full Snip->Action diagnosis
            ...analysis.actionMetadata.error ? {
                error: analysis.actionMetadata.error,
                rootCause: analysis.actionMetadata.rootCause ?? ""
            } : {},
            ...analysis.actionMetadata.fix ? {
                fix: analysis.actionMetadata.fix
            } : {},
            // v2.5: ingest-layer stamps (privacy hash, redactions, OCR provider)
            ...extraMetadata
        }
    });
    // 5. Auto-Populate Decision Graph if a decision was detected
    let decisionLogged = null;
    if (analysis.decision && projectId) {
        decisionLogged = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDecision"])({
            projectId,
            title: analysis.decision.title,
            decision: analysis.decision.chosen,
            reasoning: analysis.decision.reasoning,
            alternatives: analysis.decision.alternatives,
            sourceItemId: savedItem.id
        });
    }
    // 6. Auto-Populate Knowledge Graph Edges
    for (const edge of analysis.graphEdges){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addGraphEdge"])(projectId, edge.source, edge.target, edge.relation);
    }
    return {
        status: "captured_zero_save",
        toastNotification: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$analyzer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatHudToast"])({
            projectMatch: projMatch,
            modelRoute,
            actionMetadata: analysis.actionMetadata
        }),
        item: savedItem,
        projectMatch: projMatch,
        modelRoute,
        decisionLogged
    };
}
function newCaptureId() {
    return `cap_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 10)}`;
}
}),
"[project]/src/lib/brain/privacy-redactor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Project Brain OS — v2.5 Privacy & Secret Redaction Layer (ingest-side)
//
// Server-side defense-in-depth companion to the desktop agent's own guardrails:
//   1. Window/App Exclusion — captures originating from password managers,
//      private browsing, or keychain windows are BLOCKED outright (422).
//   2. Secret Scrubbing — OpenAI / Anthropic / Google / GitHub credentials,
//      Bearer tokens, PEM private keys, and *.env secret assignments are
//      replaced with [REDACTED_*] markers BEFORE the content is persisted to
//      SQLite, written to the vault on disk, or embedded into the vector index.
//   3. Deterministic content hash (FNV-1a style, 64-bit hex) for idempotency
//      (CaptureJob key) and optimistic concurrency (PATCH expected_hash).
//
// Ported from the "GitHub Repo Review Request" bundle's privacy-redactor module,
// adapted to the shipped engine: extra window patterns merged from the desktop
// agent, hash exposed standalone for the two-way editing conflict check.
__turbopack_context__.s([
    "contentHashOf",
    ()=>contentHashOf,
    "redactSecretsInText",
    ()=>redactSecretsInText,
    "sanitizeAndValidateCapture",
    ()=>sanitizeAndValidateCapture
]);
const EXCLUDED_WINDOW_REGEXES = [
    /1password/i,
    /bitwarden/i,
    /keepass/i,
    /lastpass/i,
    /incognito/i,
    /inprivate/i,
    /private browsing/i,
    /keychain/i,
    /\.env/i
];
const SECRET_RULES = [
    {
        name: "anthropic_key",
        // must run BEFORE openai_key — "sk-ant-..." also matches the sk- rule
        pattern: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g,
        replacement: "[REDACTED_ANTHROPIC_KEY]"
    },
    {
        name: "openai_key",
        pattern: /\bsk-(?!ant-)[A-Za-z0-9_-]{20,}\b/g,
        replacement: "[REDACTED_OPENAI_KEY]"
    },
    {
        name: "google_api_key",
        pattern: /\bAIza[0-9A-Za-z_-]{35}\b/g,
        replacement: "[REDACTED_GOOGLE_KEY]"
    },
    {
        name: "github_token",
        pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g,
        replacement: "[REDACTED_GITHUB_TOKEN]"
    },
    {
        name: "bearer_token",
        pattern: /(Bearer\s+)[A-Za-z0-9_\-.=]{16,}/gi,
        replacement: "$1[REDACTED_BEARER_TOKEN]"
    },
    {
        name: "private_key_block",
        pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,
        replacement: "[REDACTED_PRIVATE_KEY]"
    },
    {
        name: "env_secret_assignment",
        pattern: /^([A-Z0-9_]*(?:SECRET|PASSWORD|TOKEN|API_KEY|PRIVATE_KEY)[A-Z0-9_]*\s*=\s*)(.+)$/gm,
        replacement: "$1[REDACTED_ENV_VALUE]"
    }
];
/** Hard cap against memory exhaustion on hostile/oversized payloads. */ const MAX_CONTENT_CHARS = 150_000;
function sanitizeAndValidateCapture(params) {
    const windowTitle = params.windowTitle || "";
    for (const excluded of EXCLUDED_WINDOW_REGEXES){
        if (excluded.test(windowTitle)) {
            return {
                allowed: false,
                blockedReason: `Capture blocked by Privacy Guard (excluded window: ${windowTitle})`,
                sanitizedContent: "",
                redactionCount: 0,
                contentHash: ""
            };
        }
    }
    const { text, count } = redactSecretsInText((params.rawContent || "").slice(0, MAX_CONTENT_CHARS));
    return {
        allowed: true,
        sanitizedContent: text,
        redactionCount: count,
        contentHash: contentHashOf(text)
    };
}
function redactSecretsInText(text) {
    if (!text) return {
        text: "",
        count: 0
    };
    let out = text;
    let total = 0;
    for (const rule of SECRET_RULES){
        const before = out;
        out = out.replace(rule.pattern, rule.replacement);
        // count via the match length of this rule against the pre-rule text
        const matches = before.match(rule.pattern);
        if (matches) total += matches.length;
    }
    return {
        text: out,
        count: total
    };
}
function contentHashOf(text) {
    const src = text || "";
    let h1 = 0xdeadbeef ^ src.length;
    let h2 = 0x41c6ce57 ^ src.length;
    for(let i = 0; i < src.length; i++){
        const ch = src.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
}
}),
"[project]/src/lib/brain/router.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Project Brain OS — Zero-Tagging Auto-Project Detection Router
// Faithful port of project_router.py (scoring weights & thresholds preserved)
__turbopack_context__.s([
    "detectProject",
    ()=>detectProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/store.ts [app-route] (ecmascript)");
;
;
const state = {
    lastActiveProjectId: null
};
async function detectProject(input) {
    const { rawContent = "", windowTitle = "", activeFilePath = "", sourceUrl = "", confidenceThreshold = 0.35 } = input;
    const projects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllProjects"])();
    if (projects.length === 0) {
        return {
            projectId: null,
            projectName: "Inbox",
            projectSlug: "inbox",
            confidence: 0,
            reasons: [
                "No projects registered"
            ]
        };
    }
    const combinedContext = `${windowTitle} ${activeFilePath} ${sourceUrl} ${rawContent}`.toLowerCase();
    const normFilePath = activeFilePath.replace(/\\/g, "/").toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    let bestReasons = [];
    for (const proj of projects){
        let score = 0;
        const reasons = [];
        // 1. Hard Path Match (+0.65)
        const rootPath = (proj.rootPath || "").replace(/\\/g, "/").toLowerCase();
        if (rootPath && normFilePath.includes(rootPath)) {
            score += 0.65;
            reasons.push(`File path matched project root '${rootPath}'`);
        }
        // 2. Project Name or Slug in Window Title / URL (+0.45 / +0.40)
        const slug = proj.slug.toLowerCase();
        const nameLower = proj.name.toLowerCase();
        if (windowTitle.toLowerCase().includes(slug) || windowTitle.toLowerCase().includes(nameLower)) {
            score += 0.45;
            reasons.push(`Window title contains project name/slug '${proj.name}'`);
        } else if (sourceUrl.toLowerCase().includes(slug)) {
            score += 0.4;
            reasons.push(`URL contains project slug '${slug}'`);
        }
        // 3. Git Remote Match (+0.50)
        for (const remote of proj.gitRemotes){
            if (combinedContext.includes(remote.toLowerCase())) {
                score += 0.5;
                reasons.push(`Matched git remote '${remote}'`);
            }
        }
        // 4. Keyword Fingerprint Matches (+0.18 per keyword, capped at +0.54)
        let kwHits = 0;
        for (const kw of proj.keywords){
            if (combinedContext.includes(kw.toLowerCase())) {
                kwHits += 1;
                reasons.push(`Matched keyword '${kw}'`);
            }
        }
        score += Math.min(kwHits * 0.18, 0.54);
        // 5. Session Momentum Bonus (+0.15 if this was the most recently active project)
        if (state.lastActiveProjectId && proj.id === state.lastActiveProjectId && score > 0) {
            score += 0.15;
            reasons.push("Session momentum bonus (last active project)");
        }
        if (score > bestScore) {
            bestScore = Math.min(score, 1.0);
            bestMatch = proj;
            bestReasons = reasons;
        }
    }
    if (bestMatch && bestScore >= confidenceThreshold) {
        state.lastActiveProjectId = bestMatch.id;
        return {
            projectId: bestMatch.id,
            projectName: bestMatch.name,
            projectSlug: bestMatch.slug,
            confidence: Math.round(bestScore * 100) / 100,
            reasons: bestReasons
        };
    }
    return {
        projectId: null,
        projectName: "Inbox",
        projectSlug: "inbox",
        confidence: Math.round(bestScore * 100) / 100,
        reasons: [
            "Confidence below threshold; routed to Inbox"
        ]
    };
}
}),
"[project]/src/lib/brain/seed.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "countProjects",
    ()=>countProjects,
    "ensureSeedData",
    ()=>ensureSeedData,
    "ensureSeedDataOnce",
    ()=>ensureSeedDataOnce
]);
// Project Brain OS — First-Boot Seed Data (port of brain_api.py::ensure_seed_data)
// Seeds 3 projects + 2 demo captures so the workspace is populated in 5 seconds.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$pipeline$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/pipeline.ts [app-route] (ecmascript)");
;
;
;
async function ensureSeedData() {
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllProjects"])();
    if (existing.length > 0) return;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertProject"])({
        name: "Three Musketeers",
        rootPath: "C:/dev/three-musketeers",
        keywords: [
            "three-musketeers",
            "gateway.mjs",
            "render",
            "deployment",
            "dotenv"
        ],
        gitRemotes: [
            "github.com/shaan/three-musketeers"
        ],
        rollingSummary: "Multi-agent gateway service deployed on Render. Uses pnpm workspaces and gateway.mjs entrypoint."
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertProject"])({
        name: "Tier-1 Control Plane",
        rootPath: "C:/dev/tier1-control-plane",
        keywords: [
            "tier-1",
            "control-plane",
            "browser-repair",
            "playwright",
            "mcp"
        ],
        gitRemotes: [
            "github.com/shaan/tier1-control-plane"
        ],
        rollingSummary: "Dependency-light Python control plane for browser-repair workflows, automated model routing, and MCP tools."
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertProject"])({
        name: "Project Brain OS",
        rootPath: "C:/dev/project-brain-os",
        keywords: [
            "project-brain",
            "sqlite_store.py",
            "brain_api.py",
            "obsidian",
            "notebooklm",
            "zero-save"
        ],
        gitRemotes: [
            "github.com/shaan/project-brain-os"
        ],
        rollingSummary: "Universal Knowledge Capture, Project Memory, Decision Graph, and Context Injection OS."
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$pipeline$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capture"])({
        rawContent: "Error: Cannot find module 'dotenv'\n    at Function.Module._resolveFilename (gateway.mjs:14:2)",
        itemType: "screenshot",
        windowTitle: "Terminal - node gateway.mjs",
        sourceApp: "Windows Terminal",
        visualHint: "Red terminal deployment error logs from Render showing missing dotenv module in gateway.mjs"
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$pipeline$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capture"])({
        rawContent: "Decision: Use SQLite + FTS5 instead of standalone Neo4j server\n" + "Alternatives: Neo4j Desktop, Docker Postgres\n" + "Reason: Keeps Project Brain OS dependency-light and portable with zero external DB daemons.",
        itemType: "note",
        windowTitle: "architecture.md - Project Brain OS",
        activeFilePath: "C:/dev/project-brain-os/docs/architecture.md",
        sourceApp: "Workspace Editor"
    });
}
/** Lazily invoked per request; memoized after first successful run. */ let seedPromise = null;
function ensureSeedDataOnce() {
    if (!seedPromise) {
        seedPromise = ensureSeedData().then(async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["backfillVaultSyncStatus"])(); // v2.6: settle pending vault-sync rows (runs once per boot, never throws)
        }).catch((err)=>{
            seedPromise = null;
            throw err;
        });
    }
    return seedPromise;
}
async function countProjects() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.count();
}
}),
"[project]/src/lib/brain/settings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLEAR_SENTINEL",
    ()=>CLEAR_SENTINEL,
    "SETTING_KEYS",
    ()=>SETTING_KEYS,
    "checkAgentToken",
    ()=>checkAgentToken,
    "effectiveSetting",
    ()=>effectiveSetting,
    "envFallback",
    ()=>envFallback,
    "maskSecret",
    ()=>maskSecret,
    "readSetting",
    ()=>readSetting,
    "readSettings",
    ()=>readSettings,
    "writeSettings",
    ()=>writeSettings
]);
// Project Brain OS — v2.2 Runtime Settings Store
//
// A tiny key/value configuration layer persisted in SQLite (Prisma Setting model) so
// the AI backend, dedup window, and agent ingest token can be tuned at runtime from
// the UI — no server restart or redeploy required.
//
// Precedence rules used across the engine:
//   - Secrets/URLs:  DB setting (non-empty)  ->  environment variable  ->  built-in default
//   - dedup window:  DEDUP_WINDOW_HOURS env  ->  DB setting         ->  36 (v2.1 default)
//   - provider:      DB setting llm_provider ->  auto-detect chain (env-key based)
//
// Secrets are never returned in plaintext by the API — `maskSecret()` renders a
// "sk-…abcd" preview plus a `configured` flag instead.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
const SETTING_KEYS = [
    "llm_provider",
    "ollama_url",
    "ollama_model",
    "openai_api_key",
    "anthropic_api_key",
    "gemini_api_key",
    "openai_base_url",
    "anthropic_base_url",
    "gemini_base_url",
    "llm_timeout_seconds",
    "dedup_window_hours",
    "agent_ingest_token",
    "auth_mode"
];
const CLEAR_SENTINEL = "__clear__";
async function readSettings() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].setting.findMany();
    const map = {};
    for (const row of rows){
        if (SETTING_KEYS.includes(row.key) && row.value !== "") {
            map[row.key] = row.value;
        }
    }
    return map;
}
async function readSetting(key) {
    const map = await readSettings();
    return map[key] ?? "";
}
async function writeSettings(patch) {
    const written = [];
    for (const [key, value] of Object.entries(patch)){
        if (!SETTING_KEYS.includes(key)) continue;
        const finalValue = value === CLEAR_SENTINEL ? "" : value ?? "";
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].setting.upsert({
            where: {
                key
            },
            create: {
                key,
                value: finalValue
            },
            update: {
                value: finalValue
            }
        });
        written.push(key);
    }
    return written;
}
function maskSecret(value) {
    const v = (value ?? "").trim();
    if (!v) return "";
    if (v.length <= 8) return `${v.slice(0, 2)}…`;
    return `${v.slice(0, 3)}…${v.slice(-4)}`;
}
function envFallback(key) {
    switch(key){
        case "openai_api_key":
            return process.env.OPENAI_API_KEY || "";
        case "anthropic_api_key":
            return process.env.ANTHROPIC_API_KEY || "";
        case "gemini_api_key":
            return process.env.GEMINI_API_KEY || "";
        case "openai_base_url":
            return process.env.OPENAI_BASE_URL || "";
        case "anthropic_base_url":
            return process.env.ANTHROPIC_BASE_URL || "";
        case "gemini_base_url":
            return process.env.GEMINI_BASE_URL || "";
        case "ollama_url":
            return process.env.OLLAMA_URL || "";
        case "agent_ingest_token":
            return process.env.BRAIN_INGEST_TOKEN || "";
        default:
            return "";
    }
}
async function effectiveSetting(key) {
    const stored = await readSetting(key);
    if (stored) return stored;
    return envFallback(key);
}
async function checkAgentToken(provided) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].setting.findUnique({
        where: {
            key: "agent_ingest_token"
        }
    }).catch(()=>null);
    const expected = (row?.value || process.env.BRAIN_INGEST_TOKEN || "").trim();
    if (!expected) return {
        required: false,
        ok: true
    };
    return {
        required: true,
        ok: (provided ?? "").trim() === expected
    };
}
}),
"[project]/src/lib/brain/store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addGraphEdge",
    ()=>addGraphEdge,
    "backfillVaultSyncStatus",
    ()=>backfillVaultSyncStatus,
    "buildContextInjectionPayload",
    ()=>buildContextInjectionPayload,
    "buildItemMarkdown",
    ()=>buildItemMarkdown,
    "buildStructuredPrompt",
    ()=>buildStructuredPrompt,
    "computeHealthAndGaps",
    ()=>computeHealthAndGaps,
    "ensureVectorIndex",
    ()=>ensureVectorIndex,
    "getAllProjects",
    ()=>getAllProjects,
    "getProjectById",
    ()=>getProjectById,
    "getProjectDetails",
    ()=>getProjectDetails,
    "getProjectGraph",
    ()=>getProjectGraph,
    "getUniversalTimeline",
    ()=>getUniversalTimeline,
    "isVectorIndexReady",
    ()=>isVectorIndexReady,
    "listInbox",
    ()=>listInbox,
    "logDecision",
    ()=>logDecision,
    "resolveItem",
    ()=>resolveItem,
    "resolveProjectId",
    ()=>resolveProjectId,
    "resolveVaultPath",
    ()=>resolveVaultPath,
    "saveItem",
    ()=>saveItem,
    "searchVault",
    ()=>searchVault,
    "searchVaultHybrid",
    ()=>searchVaultHybrid,
    "slugify",
    ()=>slugify,
    "syncMarkdownEditsFromDisk",
    ()=>syncMarkdownEditsFromDisk,
    "toDecision",
    ()=>toDecision,
    "toItem",
    ()=>toItem,
    "toProject",
    ()=>toProject,
    "triageItem",
    ()=>triageItem,
    "upsertProject",
    ()=>upsertProject,
    "vaultRoot",
    ()=>vaultRoot,
    "writeVaultFile",
    ()=>writeVaultFile
]);
// Project Brain OS — Store Layer (port of sqlite_store.py)
// SQLite via Prisma + BM25-like token search + vector (semantic) hybrid search
// + REAL on-disk Obsidian-style vault (v2: two-way markdown disk sync)
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/embeddings.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$action$2d$verifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/action-verifier.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$privacy$2d$redactor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/privacy-redactor.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
function vaultRoot() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "ProjectBrainVault");
}
function resolveVaultPath(filePath) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].isAbsolute(filePath) ? filePath : __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), filePath);
}
function frontmatterBlock(input) {
    return `---\n` + `id: ${input.id}\n` + `type: ${input.type}\n` + `project: ${input.projectName}\n` + `source_app: ${input.sourceApp}\n` + `source_url: ${input.sourceUrl}\n` + `captured_at: ${input.capturedAt}\n` + `---\n\n`;
}
function buildItemMarkdown(input) {
    let body = `# ${input.title}\n\n`;
    if (input.structuredSummary) body += `> **AI Summary:** ${input.structuredSummary}\n\n`;
    if (input.visualDescription) body += `> **Visual Context:** ${input.visualDescription}\n\n`;
    if (input.suggestedFix) body += `### Suggested Fix\n\`\`\`bash\n${input.suggestedFix}\n\`\`\`\n\n`;
    body += `## Content\n${input.rawContent}\n`;
    return frontmatterBlock({
        id: input.id,
        type: input.itemType,
        projectName: input.projectName,
        sourceApp: input.sourceApp,
        sourceUrl: input.sourceUrl,
        capturedAt: input.capturedAt
    }) + body;
}
async function writeVaultFile(relativePath, content) {
    const abs = resolveVaultPath(relativePath);
    const tmp = `${abs}.tmp`;
    try {
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["mkdir"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(abs), {
            recursive: true
        });
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(tmp, content, "utf-8");
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["rename"])(tmp, abs);
        return relativePath;
    } catch  {
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["unlink"])(tmp).catch(()=>{}); // best-effort cleanup of the orphan .tmp
        return null; // never let disk failures break the engine
    }
}
function slugify(text) {
    const slug = text.replace(/[^a-zA-Z0-9\s-]/g, "").trim().toLowerCase().replace(/[\s-]+/g, "-");
    return slug || "untitled";
}
function toProject(row) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        rootPath: row.rootPath ?? "",
        keywords: safeParseArray(row.keywords),
        gitRemotes: safeParseArray(row.gitRemotes),
        rollingSummary: row.rollingSummary ?? "",
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString()
    };
}
function toItem(row) {
    return {
        id: row.id,
        projectId: row.projectId ?? null,
        itemType: row.itemType,
        title: row.title,
        rawContent: row.rawContent,
        structuredSummary: row.structuredSummary ?? "",
        visualDescription: row.visualDescription ?? "",
        filePath: row.filePath ?? "",
        assetPath: row.assetPath ?? "",
        sourceApp: row.sourceApp ?? "",
        sourceUrl: row.sourceUrl ?? "",
        metadata: safeParseObject(row.metadata || "{}"),
        // v2.6 durable vault-sync state (audit-2 blocker #5 residual)
        vaultSyncStatus: row.vaultSyncStatus ?? "synced",
        vaultSyncError: row.vaultSyncError ?? null,
        capturedAt: new Date(row.capturedAt).toISOString()
    };
}
function toDecision(row) {
    return {
        id: row.id,
        projectId: row.projectId,
        title: row.title,
        decision: row.decision,
        alternatives: safeParseArray(row.alternatives),
        reasoning: row.reasoning,
        outcome: row.outcome,
        sourceItemId: row.sourceItemId,
        decidedAt: row.decidedAt.toISOString()
    };
}
function safeParseArray(json) {
    try {
        const parsed = JSON.parse(json || "[]");
        return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch  {
        return [];
    }
}
function safeParseObject(json) {
    try {
        const parsed = JSON.parse(json);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch  {
        return {};
    }
}
async function upsertProject(input) {
    const slug = slugify(input.name);
    const keywords = input.keywords ?? [];
    const gitRemotes = input.gitRemotes ?? [];
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findUnique({
        where: {
            slug
        }
    });
    let project;
    if (existing) {
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.update({
            where: {
                id: existing.id
            },
            data: {
                name: input.name,
                rootPath: input.rootPath ?? existing.rootPath,
                keywords: JSON.stringify(keywords),
                gitRemotes: JSON.stringify(gitRemotes),
                rollingSummary: input.rollingSummary || existing.rollingSummary,
                updatedAt: new Date()
            }
        });
        project = toProject(updated);
    } else {
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.create({
            data: {
                id: `proj_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 10)}`,
                name: input.name,
                slug,
                rootPath: input.rootPath ?? "",
                keywords: JSON.stringify(keywords),
                gitRemotes: JSON.stringify(gitRemotes),
                rollingSummary: input.rollingSummary ?? ""
            }
        });
        project = toProject(created);
    }
    // v2: maintain the human-readable _project_summary.md on disk (sqlite_store.py parity:
    // writes when a summary exists or the file is missing)
    const effectiveSummary = project.rollingSummary;
    const summaryRelPath = `ProjectBrainVault/Projects/${project.slug}/_project_summary.md`;
    const summaryAbs = resolveVaultPath(summaryRelPath);
    let summaryExists = true;
    try {
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(summaryAbs, "utf-8");
    } catch  {
        summaryExists = false;
    }
    if (effectiveSummary || !summaryExists) {
        const now = new Date().toISOString();
        await writeVaultFile(summaryRelPath, `# ${project.name} — Project Brain Summary\n\n` + `**Root Path:** \`${project.rootPath}\`\n` + `**Keywords:** ${project.keywords.join(", ")}\n` + `**Last Updated:** ${now}\n\n` + `## Rolling Memory\n${effectiveSummary || "No summary compressed yet."}\n`);
    }
    return project;
}
async function getProjectById(id) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findUnique({
        where: {
            id
        }
    });
    return row ? toProject(row) : null;
}
async function getAllProjects() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findMany({
        orderBy: {
            updatedAt: "desc"
        }
    });
    return rows.map(toProject);
}
async function resolveProjectId(identifier) {
    if (!identifier) return null;
    const projects = await getAllProjects();
    for (const p of projects){
        if (p.id === identifier || p.slug === identifier || p.name === identifier) return p.id;
    }
    const lower = identifier.toLowerCase();
    for (const p of projects){
        if (p.name.toLowerCase() === lower || p.slug === lower) return p.id;
    }
    return null;
}
// ==========================================
// ZERO-SAVE ITEM CAPTURE (real Vault .md file on disk, Obsidian-compatible)
// ==========================================
function vaultFilePath(project, itemType, title, now, itemId) {
    const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}_${String(now.getUTCHours()).padStart(2, "0")}${String(now.getUTCMinutes()).padStart(2, "0")}${String(now.getUTCSeconds()).padStart(2, "0")}`;
    const fileSlug = slugify(title).slice(0, 50);
    // v2.5: the item's short id makes every filename unique — two captures of
    // the same title within the same second can no longer overwrite each other.
    const shortId = itemId.replace(/[^a-zA-Z0-9]/g, "").slice(-6);
    const filename = `${stamp}_${fileSlug}_${shortId}.md`;
    if (project) {
        const subfolder = [
            "screenshot",
            "clip",
            "terminal"
        ].includes(itemType) ? "captures" : "notes";
        return `ProjectBrainVault/Projects/${project.slug}/${subfolder}/${filename}`;
    }
    return `ProjectBrainVault/Inbox/${filename}`;
}
async function saveItem(input) {
    const itemId = `item_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 12)}`;
    const now = new Date();
    const itemType = input.itemType || "note";
    const metadata = input.metadata ?? {};
    const project = input.projectId ? await getProjectById(input.projectId) : null;
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.create({
        data: {
            id: itemId,
            projectId: project?.id ?? null,
            itemType,
            title: input.title,
            rawContent: input.rawContent,
            structuredSummary: input.structuredSummary ?? "",
            visualDescription: input.visualDescription ?? "",
            filePath: vaultFilePath(project, itemType, input.title, now, itemId),
            assetPath: input.assetPath ?? "",
            sourceApp: input.sourceApp ?? "",
            sourceUrl: input.sourceUrl ?? "",
            metadata: JSON.stringify(metadata),
            capturedAt: now,
            // Vector sidecar write (sqlite-vec pattern) — every item is semantically indexed
            vector: {
                create: {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newVectorId"])(),
                    projectId: project?.id ?? null,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["embedForStorage"])(`${input.title}\n${input.rawContent}\n${input.structuredSummary ?? ""}\n${input.visualDescription ?? ""}`)
                }
            }
        },
        include: {
            vector: true
        }
    });
    if (project) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.update({
            where: {
                id: project.id
            },
            data: {
                updatedAt: now
            }
        });
    }
    // v2: write the real Obsidian-compatible .md file to disk — and v2.6: the
    // write result is stamped as DURABLE per-item vault-sync state, so a capture
    // can never present itself as fully saved while its .md is pending/failed
    // (audit-2 blocker #5: "do not present a capture as fully saved until the
    // database and vault write both succeed — or clearly label it").
    const vaultWritten = await writeVaultFile(created.filePath, buildItemMarkdown({
        id: created.id,
        itemType: created.itemType,
        projectName: project?.name ?? "Inbox",
        sourceApp: created.sourceApp,
        sourceUrl: created.sourceUrl,
        capturedAt: created.capturedAt.toISOString(),
        title: created.title,
        structuredSummary: created.structuredSummary,
        visualDescription: created.visualDescription,
        suggestedFix: typeof metadata.fix === "string" ? metadata.fix : undefined,
        rawContent: created.rawContent
    }));
    const stamped = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.update({
        where: {
            id: created.id
        },
        data: vaultWritten ? {
            vaultSyncStatus: "synced"
        } : {
            vaultSyncStatus: "failed",
            vaultSyncError: "Vault .md write failed (disk error or vault path rejected)"
        }
    }).catch(()=>created); // status stamping must never break the capture itself
    return toItem(stamped);
}
/**
 * v2.6 boot reconciliation for durable vault-sync state. Rows can only get
 * stuck in `pending` if a process died between the DB create and the sync
 * stamp (or pre-v2.6 rows that received the column default). Once per server
 * boot: check each pending item's .md on disk and settle it to synced/failed.
 * Batches until the pending set is empty (bounded: 20 rounds x 500 rows;
 * rows whose update fails are excluded and retried never — termination is
 * guaranteed). Never throws — boot must not depend on reconciliation.
 * Returns the number of rows settled to `synced`.
 */ let vaultSyncBackfilled = false;
async function backfillVaultSyncStatus() {
    if (vaultSyncBackfilled) return 0;
    vaultSyncBackfilled = true;
    try {
        const attempted = new Set();
        let synced = 0;
        for(let round = 0; round < 20; round++){
            const pending = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
                where: {
                    vaultSyncStatus: "pending",
                    filePath: {
                        not: ""
                    },
                    ...attempted.size > 0 ? {
                        id: {
                            notIn: [
                                ...attempted
                            ]
                        }
                    } : {}
                },
                select: {
                    id: true,
                    filePath: true
                },
                take: 500
            });
            if (pending.length === 0) break;
            for (const row of pending){
                attempted.add(row.id);
                let ok = false;
                try {
                    ok = (await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["stat"])(resolveVaultPath(row.filePath))).isFile();
                } catch  {
                    ok = false;
                }
                const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.update({
                    where: {
                        id: row.id
                    },
                    data: ok ? {
                        vaultSyncStatus: "synced"
                    } : {
                        vaultSyncStatus: "failed",
                        vaultSyncError: "Vault .md file not found on disk (boot reconciliation)"
                    }
                }).catch(()=>null);
                if (updated?.vaultSyncStatus === "synced") synced += 1;
            }
        }
        return synced;
    } catch  {
        return 0;
    }
}
async function listInbox(limit = 80) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
        where: {
            projectId: null
        },
        orderBy: {
            capturedAt: "desc"
        },
        take: Math.max(1, Math.min(Math.floor(limit) || 80, 200))
    });
    return rows.map((r)=>toItem({
            ...r,
            metadata: r.metadata
        }));
}
async function triageItem(itemId, projectId) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findUnique({
        where: {
            id: itemId
        }
    });
    if (!row) return {
        ok: false,
        item_id: itemId,
        project_id: projectId,
        project_name: "",
        file_moved: false,
        file_path: "",
        error: "Item not found"
    };
    const prow = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findUnique({
        where: {
            id: projectId
        }
    });
    if (!prow) return {
        ok: false,
        item_id: itemId,
        project_id: projectId,
        project_name: "",
        file_moved: false,
        file_path: "",
        error: "Project not found"
    };
    if (row.projectId === projectId) {
        return {
            ok: false,
            item_id: itemId,
            project_id: projectId,
            project_name: prow.name,
            file_moved: false,
            file_path: row.filePath,
            error: "Item already belongs to this project"
        };
    }
    const item = toItem({
        ...row,
        metadata: row.metadata
    });
    const subfolder = [
        "screenshot",
        "clip",
        "terminal"
    ].includes(item.itemType) ? "captures" : "notes";
    const destDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(vaultRoot(), "Projects", prow.slug, subfolder);
    let newPath = item.filePath; // fallback when there is no disk file to move
    let fileMoved = false;
    try {
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["mkdir"])(destDir, {
            recursive: true
        });
        const oldAbs = resolveVaultPath(item.filePath);
        let candidate = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(destDir, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(item.filePath || `${item.id}.md`));
        // Avoid clobbering an existing file with the same name (36h dedup makes this rare)
        try {
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(candidate, "utf-8");
            candidate = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(destDir, `${item.id}_${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(item.filePath || "capture.md")}`);
        } catch  {
        /* name is free */ }
        try {
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["rename"])(oldAbs, candidate);
            fileMoved = true;
            newPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(process.cwd(), candidate).split(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].sep).join("/");
        } catch  {
            fileMoved = false; // source file missing — keep path as-is
        }
    } catch  {
        fileMoved = false; // disk failure never breaks triage
    }
    const metadata = {
        ...item.metadata
    };
    metadata.triage_status = "triaged";
    metadata.triaged_at = new Date().toISOString();
    metadata.triaged_to = prow.name;
    const now = new Date();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.update({
        where: {
            id: itemId
        },
        data: {
            projectId: prow.id,
            filePath: newPath,
            metadata: JSON.stringify(metadata)
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.update({
        where: {
            id: prow.id
        },
        data: {
            updatedAt: now
        }
    });
    // The vector sidecar carries projectId for scoped semantic search — re-point it
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].itemVector.updateMany({
        where: {
            itemId
        },
        data: {
            projectId: prow.id
        }
    });
    return {
        ok: true,
        item_id: itemId,
        project_id: prow.id,
        project_name: prow.name,
        file_moved: fileMoved,
        file_path: newPath
    };
}
async function resolveItem(itemId, resolution) {
    const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findUnique({
        where: {
            id: itemId
        }
    });
    if (!row) return {
        ok: false,
        item_id: itemId,
        triage_status: "",
        error: "Item not found"
    };
    const metadata = toItem({
        ...row,
        metadata: row.metadata
    }).metadata;
    metadata.triage_status = "resolved";
    metadata.resolution = resolution.trim();
    metadata.resolved_at = new Date().toISOString();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.update({
        where: {
            id: itemId
        },
        data: {
            metadata: JSON.stringify(metadata)
        }
    });
    return {
        ok: true,
        item_id: itemId,
        triage_status: "resolved"
    };
}
async function syncMarkdownEditsFromDisk() {
    const stats = {
        files_checked: 0,
        sqlite_records_updated: 0,
        vectors_resynced: 0
    };
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
        where: {
            filePath: {
                not: ""
            }
        },
        select: {
            id: true,
            title: true,
            rawContent: true,
            filePath: true,
            structuredSummary: true,
            visualDescription: true,
            projectId: true
        },
        take: 2000,
        orderBy: {
            capturedAt: "desc"
        }
    });
    for (const r of rows){
        stats.files_checked += 1;
        let diskText;
        try {
            diskText = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(resolveVaultPath(r.filePath), "utf-8");
        } catch  {
            continue; // file missing/unreadable — skip silently
        }
        // The editable payload lives after the "## Content\n" marker
        const marker = "## Content\n";
        let newRaw;
        if (diskText.includes(marker)) {
            newRaw = diskText.split(marker, 2)[1].trim();
        } else {
            newRaw = diskText.trim();
        }
        if (newRaw && newRaw !== r.rawContent.trim()) {
            // v2.5: snapshot the previous content into the revision history before
            // the disk edit overwrites it (source: disk-sync). Best-effort — a
            // revision-logging failure must never break the sync itself.
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].itemRevision.create({
                    data: {
                        id: `rev_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 12)}`,
                        itemId: r.id,
                        contentHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$privacy$2d$redactor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["contentHashOf"])(r.rawContent),
                        rawContent: r.rawContent.slice(0, 100_000),
                        source: "disk-sync"
                    }
                });
            } catch  {
            // revision ledger is best-effort
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.update({
                where: {
                    id: r.id
                },
                data: {
                    rawContent: newRaw
                }
            });
            stats.sqlite_records_updated += 1;
            // Re-embed so FTS-equivalent fields AND semantic search stay in sync
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].itemVector.upsert({
                where: {
                    itemId: r.id
                },
                update: {
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["embedForStorage"])(`${r.title}\n${newRaw}\n${r.structuredSummary}\n${r.visualDescription}`),
                    indexedAt: new Date()
                },
                create: {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newVectorId"])(),
                    itemId: r.id,
                    projectId: r.projectId,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["embedForStorage"])(`${r.title}\n${newRaw}\n${r.structuredSummary}\n${r.visualDescription}`)
                }
            });
            stats.vectors_resynced += 1;
        }
    }
    return stats;
}
async function logDecision(input) {
    const decId = `dec_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 10)}`;
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].decision.create({
        data: {
            id: decId,
            projectId: input.projectId,
            title: input.title,
            decision: input.decision,
            alternatives: JSON.stringify(input.alternatives ?? []),
            reasoning: input.reasoning,
            outcome: input.outcome ?? "Active",
            sourceItemId: input.sourceItemId ?? null
        }
    });
    // Link decision in the Knowledge Graph (DECIDED_ON edge), as sqlite_store.log_decision does
    await addGraphEdge(input.projectId, input.title, input.decision, "DECIDED_ON");
    return toDecision(created);
}
async function addGraphEdge(projectId, sourceNode, targetNode, relationType = "RELATED_TO", weight = 1.0) {
    const edge = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].graphEdge.create({
        data: {
            id: `edge_${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])().replace(/-/g, "").slice(0, 12)}`,
            projectId,
            sourceNode: sourceNode.trim(),
            targetNode: targetNode.trim(),
            relationType: relationType.toUpperCase(),
            weight
        }
    });
    return {
        id: edge.id,
        projectId: edge.projectId,
        sourceNode: edge.sourceNode,
        targetNode: edge.targetNode,
        relationType: edge.relationType,
        weight: edge.weight,
        createdAt: edge.createdAt.toISOString()
    };
}
async function getProjectGraph(projectId, limit = 100) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].graphEdge.findMany({
        where: {
            projectId
        },
        orderBy: {
            createdAt: "desc"
        },
        take: limit
    });
    return rows.map((e)=>({
            id: e.id,
            projectId: e.projectId,
            sourceNode: e.sourceNode,
            targetNode: e.targetNode,
            relationType: e.relationType,
            weight: e.weight,
            createdAt: e.createdAt.toISOString()
        }));
}
// ==========================================
// VECTOR INDEX MAINTENANCE (backfill + invariant)
// ==========================================
let vectorIndexReady = false;
async function ensureVectorIndex() {
    if (vectorIndexReady) return {
        backfilled: 0
    };
    const missing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
        where: {
            vector: {
                is: null
            }
        },
        take: 5000,
        orderBy: {
            capturedAt: "asc"
        }
    });
    for (const row of missing){
        const item = toItem(row);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].itemVector.create({
            data: {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newVectorId"])(),
                itemId: item.id,
                projectId: item.projectId,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["embedForStorage"])(`${item.title}\n${item.rawContent}\n${item.structuredSummary}\n${item.visualDescription}`)
            }
        });
    }
    vectorIndexReady = true;
    return {
        backfilled: missing.length
    };
}
function isVectorIndexReady() {
    return vectorIndexReady;
}
async function searchVault(query, projectId = null, limit = 20) {
    const cleanTokens = query.split(/\s+/).map((w)=>w.replace(/[^a-zA-Z0-9]/g, "")).filter((t)=>t.length > 1);
    if (cleanTokens.length === 0) return [];
    // SQLite: case-insensitive contains across the FTS-indexed fields, OR-combined per token
    const tokenFilter = cleanTokens.map((t)=>({
            OR: [
                {
                    title: {
                        contains: t
                    }
                },
                {
                    rawContent: {
                        contains: t
                    }
                },
                {
                    structuredSummary: {
                        contains: t
                    }
                },
                {
                    visualDescription: {
                        contains: t
                    }
                }
            ]
        }));
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
        where: {
            AND: [
                {
                    OR: tokenFilter
                },
                ...projectId ? [
                    {
                        projectId
                    }
                ] : []
            ]
        },
        orderBy: {
            capturedAt: "desc"
        },
        take: limit * 3
    });
    // BM25-ish ranking: more token hits across fields = better rank, tiebreak by recency
    const scored = rows.map((row)=>{
        const item = toItem(row);
        const haystack = `${item.title}\n${item.rawContent}\n${item.structuredSummary}\n${item.visualDescription}`.toLowerCase();
        let hits = 0;
        for (const t of cleanTokens){
            if (haystack.includes(t.toLowerCase())) hits += 1;
        }
        const ageHours = (Date.now() - new Date(item.capturedAt).getTime()) / 36e5;
        const rank = hits * 10 + Math.max(0, 5 - ageHours / 24);
        return {
            ...item,
            rank
        };
    });
    scored.sort((a, b)=>b.rank - a.rank);
    return scored.slice(0, limit);
}
async function searchVaultHybrid(query, opts = {}) {
    const { projectId = null, limit = 20, mode = "hybrid" } = opts;
    if (!query.trim()) return [];
    if (mode === "fts") {
        const fts = await searchVault(query, projectId, limit);
        return fts.map((r)=>({
                ...r,
                modes: [
                    "fts"
                ]
            }));
    }
    await ensureVectorIndex();
    const cleanTokens = query.split(/\s+/).map((w)=>w.replace(/[^a-zA-Z0-9]/g, "")).filter((t)=>t.length > 1);
    const queryVec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["embedText"])(query);
    const [vectorRows, tokenHits] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].itemVector.findMany({
            where: projectId ? {
                projectId
            } : {},
            include: {
                item: true
            },
            take: 3000,
            orderBy: {
                indexedAt: "desc"
            }
        }),
        cleanTokens.length > 0 ? searchVault(query, projectId, limit * 3) : Promise.resolve([])
    ]);
    const tokenScore = new Map();
    if (cleanTokens.length > 0) {
        for (const hit of tokenHits){
            const haystack = `${hit.title}\n${hit.rawContent}\n${hit.structuredSummary}\n${hit.visualDescription}`.toLowerCase();
            let hits = 0;
            for (const t of cleanTokens){
                if (haystack.includes(t.toLowerCase())) hits += 1;
            }
            tokenScore.set(hit.id, hits / cleanTokens.length); // 0..1 coverage
        }
    }
    const maxAgeHours = 24 * 14;
    const scored = vectorRows.map((row)=>{
        const item = toItem(row.item);
        const sim = Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cosineSimilarity"])(queryVec, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$embeddings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeVector"])(row.vector)));
        const tScore = tokenScore.get(item.id) ?? 0;
        const ageHours = (Date.now() - new Date(item.capturedAt).getTime()) / 36e5;
        const recency = Math.max(0, 1 - ageHours / maxAgeHours);
        const rank = mode === "semantic" ? sim : 0.6 * sim + 0.25 * tScore + 0.15 * recency;
        const modes = [];
        if (sim > 0.01) modes.push("vector");
        if (tScore > 0) modes.push("fts");
        return {
            ...item,
            rank,
            similarity: sim,
            modes
        };
    });
    scored.sort((a, b)=>b.rank - a.rank);
    return scored.slice(0, limit);
}
async function getUniversalTimeline(datePrefix, limit = 50) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
        where: datePrefix ? {
            capturedAt: {
                gte: new Date(`${datePrefix}T00:00:00.000Z`),
                lt: new Date(`${datePrefix}T23:59:59.999Z`)
            }
        } : undefined,
        orderBy: {
            capturedAt: "desc"
        },
        take: limit,
        include: {
            project: {
                select: {
                    name: true
                }
            }
        }
    });
    return rows.map((r)=>({
            id: r.id,
            itemType: r.itemType,
            title: r.title,
            structuredSummary: r.structuredSummary,
            sourceApp: r.sourceApp,
            capturedAt: r.capturedAt.toISOString(),
            projectName: r.project?.name ?? null
        }));
}
function computeHealthAndGaps(project, items, decisions, resolvedFixes = []) {
    const gaps = [];
    let score = 40 + (project.rollingSummary ? 20 : 0) + (decisions.length > 0 ? 20 : 0) + Math.min(20, items.length * 5);
    // Gap 1 — unresolved error captures (blueprint: error surge without documented fix)
    // v2.5: closed-loop verification — a fix only resolves the error once it is
    // VERIFIED; a FAILED fix attempt reopens the error.
    const fixClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$action$2d$verifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyFixVerification"])(items);
    const unresolved = items.filter((it)=>{
        const isError = /error|exception|traceback|failed|cannot find|module not found/i.test(`${it.title} ${it.rawContent}`);
        if (!isError) return false;
        if (!it.metadata || !it.metadata.fix) return true;
        return it.metadata.fix_status === "failed";
    });
    if (unresolved.length >= 3) {
        gaps.push({
            gap: "Unresolved error captures piling up",
            detail: `${unresolved.length} error captures have no logged fix — log the fix or decision that resolved them`,
            severity: "high"
        });
    }
    // Gap 2 — visual-heavy, text-light memory
    const shots = items.filter((i)=>i.itemType === "screenshot").length;
    const notes = items.filter((i)=>i.itemType === "note").length;
    if (shots >= 5 && notes === 0) {
        gaps.push({
            gap: "Visual-heavy memory without notes",
            detail: `${shots} screenshots but zero written notes — screenshots are hard to recall without a summary note`,
            severity: "medium"
        });
    }
    // Gap 3 — captures without decisions
    if (items.length >= 8 && decisions.length === 0) {
        gaps.push({
            gap: "Captures without logged decisions",
            detail: `${items.length} captures yet no architectural decisions — capture choices with 'Decision: ... Reason: ...'`,
            severity: "medium"
        });
    }
    // Gap 4 — stale project memory
    if (items.length > 0) {
        const newest = Math.max(...items.map((i)=>new Date(i.capturedAt).getTime()));
        const staleDays = Math.floor((Date.now() - newest) / 864e5);
        if (staleDays > 14) {
            gaps.push({
                gap: "Stale project memory",
                detail: `No new captures in ${staleDays} days — project knowledge is going stale`,
                severity: "low"
            });
        }
    }
    // Gap 5 — no compressed memory
    if (!project.rollingSummary) {
        gaps.push({
            gap: "No compressed memory",
            detail: "Run the Memory Compressor to synthesize Tier-1 rolling memory",
            severity: "medium"
        });
    }
    // Gap 6 (v2.1) — fixes exist without a corresponding root-cause decision
    if (resolvedFixes.length > 0 && decisions.length === 0) {
        gaps.push({
            gap: "Fixes without a root-cause decision",
            detail: `${resolvedFixes.length} fix(es) logged but no architectural decision explains the root cause — capture the 'why' with 'Decision: ... Reason: ...'`,
            severity: "medium"
        });
    }
    // Gap 7 (v2.5) — closed-loop verification debt: suggested fixes never verified
    if (fixClass.suggestedUnverifiedFixes >= 3) {
        gaps.push({
            gap: "Unverified fix suggestions",
            detail: `${fixClass.suggestedUnverifiedFixes} suggested fixes were never verified — close the loop (attempted / verified / failed via the item actions or MCP verify_fix_outcome) so health reflects reality`,
            severity: "medium"
        });
    }
    const penalty = gaps.reduce((acc, g)=>acc + (g.severity === "high" ? 8 : g.severity === "medium" ? 4 : 2), 0);
    score = Math.max(0, Math.min(100, score - Math.min(20, penalty)));
    return {
        score,
        gaps
    };
}
async function getProjectDetails(projectId) {
    const raw = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].project.findUnique({
        where: {
            id: projectId
        }
    });
    if (!raw) return {
        error: "Project not found"
    };
    const project = toProject(raw);
    const [itemRows, decisionRows, edges] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
            where: {
                projectId
            },
            orderBy: {
                capturedAt: "desc"
            },
            take: 50
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].decision.findMany({
            where: {
                projectId
            },
            orderBy: {
                decidedAt: "desc"
            },
            take: 30
        }),
        getProjectGraph(projectId)
    ]);
    const items = itemRows.map(toItem);
    const decisions = decisionRows.map(toDecision);
    // v2.1: resolved fixes feed the "fixes without a root-cause decision" health gap
    const resolvedFixes = items.map((it)=>typeof it.metadata?.fix === "string" ? it.metadata.fix : "").filter(Boolean);
    const { score, gaps } = computeHealthAndGaps(project, items, decisions, resolvedFixes);
    return {
        project,
        healthScore: score,
        healthGaps: gaps,
        lastCompressedAt: raw.lastCompressedAt ? raw.lastCompressedAt.toISOString() : null,
        items,
        decisions,
        graphEdges: edges
    };
}
async function buildContextInjectionPayload(projectId, activeQuery = "") {
    const project = await getProjectById(projectId);
    if (!project) return {
        error: `Project ${projectId} not found`
    };
    const [decisionRows, recentRows, edges] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].decision.findMany({
            where: {
                projectId
            },
            orderBy: {
                decidedAt: "desc"
            },
            take: 6
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].item.findMany({
            where: {
                projectId
            },
            orderBy: {
                capturedAt: "desc"
            },
            take: 6
        }),
        getProjectGraph(projectId, 5)
    ]);
    const tier2 = decisionRows.map(toDecision).map((d)=>({
            title: d.title,
            decision: d.decision.length > 80 ? `${d.decision.slice(0, 80)}…` : d.decision,
            reasoning: d.reasoning.length > 60 ? `${d.reasoning.slice(0, 60)}…` : d.reasoning,
            outcome: d.outcome,
            decidedAt: d.decidedAt
        }));
    let tier3 = [];
    if (activeQuery) {
        const hits = await searchVault(activeQuery, projectId, 5);
        tier3 = hits.map((h)=>({
                title: h.title.slice(0, 70),
                type: h.itemType,
                summary: (h.structuredSummary || h.rawContent).slice(0, 140),
                visual_context: h.visualDescription ? h.visualDescription.slice(0, 100) : undefined,
                captured_at: h.capturedAt
            }));
    }
    if (tier3.length === 0) {
        tier3 = recentRows.map((r)=>{
            const item = toItem(r);
            return {
                title: item.title,
                type: item.itemType,
                summary: item.structuredSummary.slice(0, 180),
                captured_at: item.capturedAt
            };
        });
    }
    return {
        project_name: project.name,
        tier_1_rolling_memory: project.rollingSummary || "Active development project.",
        tier_2_decision_graph: tier2,
        tier_3_recent_and_relevant_evidence: tier3,
        // Slim edge projection keeps the JSON transport payload compact — the graph
        // itself (full edges) is served by /api/projects/[id] for the Graph view.
        knowledge_graph_edges: edges.map((e)=>({
                source_node: e.sourceNode,
                target_node: e.targetNode,
                relation_type: e.relationType
            }))
    };
}
function buildStructuredPrompt(payload, rawGoal = "") {
    let prompt = `# ROLE & GROUNDING CONSTRAINTS\n` + `You are working on project **${payload.project_name}**.\n` + `Follow the architectural decisions and evidence below strictly. Do NOT hallucinate unapproved libraries or revert past decisions.\n\n` + `## TIER 1: COMPRESSED PROJECT MEMORY\n${payload.tier_1_rolling_memory}\n\n` + `## TIER 2: ACTIVE ARCHITECTURAL DECISIONS (DO NOT VIOLATE)\n`;
    for (const d of payload.tier_2_decision_graph){
        prompt += `- **${d.title}**: ${d.decision} (Reason: ${d.reasoning})\n`;
    }
    prompt += `\n## TIER 3: RELEVANT VAULT EVIDENCE & PAST FIXES\n`;
    for (const ev of payload.tier_3_recent_and_relevant_evidence){
        prompt += `- [${ev.type.toUpperCase()}] **${ev.title}**: ${ev.summary}\n`;
    }
    if (rawGoal) {
        prompt += `\n## CURRENT TASK / REWRITTEN EXECUTION SPEC\n` + `**Objective:** ${rawGoal}\n` + `**Required Output:** Provide modular, runnable code that respects Tier 1 & Tier 2 constraints and includes a quick verification step.\n`;
    }
    return prompt;
}
}),
"[project]/src/lib/brain/vision-ocr.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "processScreenshotAndOcr",
    ()=>processScreenshotAndOcr
]);
// Project Brain OS — v2.5 Multimodal Screenshot OCR + Asset Persistence
//
// Ingest path for real screenshots (desktop_agent.py --screenshot sends
// image_base64 as a data URL):
//   1. The image is PERSISTED into the project vault at
//      ProjectBrainVault/Projects/<slug>/assets/<timestamp>_<itemId>.<ext>
//      (or Inbox/assets) so visual evidence is never lost, even offline.
//   2. When an OpenAI backend is configured (Settings DB -> env), the image
//      is run through a multimodal vision call that returns clean Markdown
//      text, a visualSemanticDescription for semantic screenshot search, and
//      an optional structured { error, rootCause, suggestedFix } diagnosis.
//   3. Without a backend the module degrades cleanly to local asset storage —
//      the capture still lands with its fallback text and asset path.
//
// Adapted from the review bundle's vision-ocr module: vault resolution and
// key/base-url handling now flow through the shipped settings store instead
// of raw env access, and asset paths stay RELATIVE (vault convention).
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/brain/settings.ts [app-route] (ecmascript)");
;
;
;
const OCR_TIMEOUT_MS = 20_000;
/** Parses "data:image/png;base64,..." (bare base64 accepted, defaults to png). */ function splitImageUri(imageBase64) {
    const match = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (match) {
        const ext = match[1] === "jpeg" ? "jpg" : match[1];
        return {
            ext,
            raw: match[2]
        };
    }
    return {
        ext: "png",
        raw: imageBase64
    };
}
async function processScreenshotAndOcr(params) {
    const { ext, raw } = splitImageUri(params.imageBase64);
    // 1. Persist the raw asset (relative vault path, same convention as filePath)
    const relativeDir = params.projectSlug ? `ProjectBrainVault/Projects/${params.projectSlug}/assets` : `ProjectBrainVault/Inbox/assets`;
    const absDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), ...relativeDir.split("/"));
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["mkdir"])(absDir, {
        recursive: true
    });
    const safeItemId = params.itemId.replace(/[^a-zA-Z0-9]/g, "").slice(-12) || "cap";
    const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}_${safeItemId}.${ext}`;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(absDir, filename), Buffer.from(raw, "base64"));
    const savedAssetPath = `${relativeDir}/${filename}`;
    // 2. Multimodal OCR — only when an OpenAI-compatible backend is configured
    const openAiKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["effectiveSetting"])("openai_api_key");
    if (openAiKey) {
        const base = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$brain$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["effectiveSetting"])("openai_base_url") || "https://api.openai.com/v1";
        const model = process.env.BRAIN_VISION_MODEL || "gpt-4o-mini";
        try {
            const resp = await fetch(`${base.replace(/\/+$/, "")}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${openAiKey}`
                },
                body: JSON.stringify({
                    model,
                    response_format: {
                        type: "json_object"
                    },
                    messages: [
                        {
                            role: "system",
                            content: "Extract all visible text/code from the screenshot as clean Markdown, provide a 1-sentence visualSemanticDescription for semantic screenshot search, and if a terminal/IDE error is visible, include detectedError {error, rootCause, suggestedFix}. Return strict JSON."
                        },
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: `Active window: ${params.windowTitle || "Unknown"}`
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: `data:image/${ext};base64,${raw}`
                                    }
                                }
                            ]
                        }
                    ]
                }),
                signal: AbortSignal.timeout(OCR_TIMEOUT_MS)
            });
            if (resp.ok) {
                const json = await resp.json();
                const parsed = JSON.parse(json.choices?.[0]?.message?.content || "{}");
                const detected = parsed.detectedError;
                return {
                    extractedText: parsed.extractedText || params.fallbackText || "",
                    visualSemanticDescription: parsed.visualSemanticDescription || `Screenshot from ${params.windowTitle || "workspace"}`,
                    detectedError: detected && detected.error ? {
                        error: detected.error,
                        rootCause: detected.rootCause ?? "",
                        suggestedFix: detected.suggestedFix ?? ""
                    } : undefined,
                    savedAssetPath,
                    mimeType: `image/${ext}`,
                    providerUsed: "openai-vision"
                };
            }
        } catch  {
        // Network/timeout/parse failure — fall through to deterministic fallback
        }
    }
    // 3. Offline fallback: asset stored, text falls back to the capture text
    return {
        extractedText: params.fallbackText || `Screenshot captured from ${params.windowTitle || "Desktop"}`,
        visualSemanticDescription: `Visual capture of ${params.windowTitle || "application window"}`,
        savedAssetPath,
        mimeType: `image/${ext}`,
        providerUsed: "local-asset-store"
    };
}
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        'query'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00gp57-506vxe._.js.map