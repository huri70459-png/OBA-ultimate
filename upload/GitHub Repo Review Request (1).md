I have generated the **four ready-to-use implementation files** for your repository (`schema.prisma`, `mcp_server.mjs`, `desktop_agent.py`, and `brain_missing_modules_bundle.ts`) and outlined the complete codebase integration blueprint below so you can drop them straight into `Raydevstu/PROJECT-BRAIN-OS`.

---

## 1. File Placement Map (What to Add & Where)

| Generated File | Target Path in `PROJECT-BRAIN-OS` | What Gap It Closes |
| :--- | :--- | :--- |
| **`schema.prisma`** | `prisma/schema.prisma` | Restores the missing Prisma schema required by `package.json` (`db:push`, `db:generate`) and adds tables for **Capture Jobs (`BrainCaptureJob`)**, **Closed-Loop Action Verification (`BrainAction`)**, and **Note Revisions (`BrainItemRevision`)**. |
| **`mcp_server.mjs`** | `scripts/mcp_server.mjs` | Implements a **spec-compliant JSON-RPC 2.0 stdio MCP server** (`initialize` negotiation, `tools/list`, `tools/call`) with 6 tools (`list_projects`, `get_project_context`, `search_project_brain`, `zero_save_capture`, `log_decision`, `verify_fix_outcome`) for Cursor, Claude Code, and Windsurf. |
| **`desktop_agent.py`** | `scripts/desktop_agent.py` | Implements **cross-platform OS window detection**, **real screen capture to Base64**, **Privacy Guard exclusions** (1Password, Bitwarden, Incognito, `.env`), **secret redaction**, and **offline JSONL spooling** (`~/.project-brain-spool.jsonl`). |
| **`brain_missing_modules_bundle.ts`** | Split into 4 Next.js files (see Section 2) | Adds **Privacy & Secret Scrubbing**, **Multimodal Screenshot OCR + Asset Persistence**, **Verified Fix Lifecycle (`detected → suggested → attempted → verified`)**, and **Two-Way Vault Note Editing (`PATCH /api/items/[id]`)** with conflict checks and atomic file writes. |

---

## 2. Splitting `brain_missing_modules_bundle.ts` Into Your Next.js Repo

Copy the four clearly marked sections inside `brain_missing_modules_bundle.ts` into these paths in your repository:

1. **`src/lib/brain/privacy-redactor.ts`**
   - Blocks captures from sensitive windows (`1Password`, `Bitwarden`, `KeePass`, `Incognito`, `.env`).
   - Scrubs OpenAI (`sk-...`), Anthropic (`sk-ant-...`), Google (`AIza...`), GitHub (`ghp_...`), Bearer tokens, and PEM private keys before storing in SQLite or writing Markdown to disk.
   - Generates a deterministic 64-bit `contentHash` for idempotency and optimistic concurrency control.

2. **`src/lib/brain/vision-ocr.ts`**
   - Decodes incoming `image_base64` screenshots and saves the image into `ProjectBrainVault/Projects/<slug>/assets/<timestamp>_<itemId>.png`.
   - Calls multimodal Vision OCR (when `OPENAI_API_KEY` is configured) to extract clean Markdown text, a `visualSemanticDescription` for semantic screenshot search, and structured `{ error, rootCause, suggestedFix }` metadata—falling back cleanly to local asset storage when offline.

3. **`src/lib/brain/action-verifier.ts`**
   - Separates **suggested fixes** from **verified resolutions** (`detected` → `suggested` → `attempted` → `verified` / `failed`).
   - Computes an explainable Project Health breakdown so unverified regex suggestions do not artificially inflate project health scores.

4. **`src/app/api/items/[id]/route.ts`**
   - Enables **editing existing Vault notes** in-place instead of always creating a new capture.
   - Performs optimistic concurrency checks (`expected_hash` vs. `content_hash`, returning `409 CONFLICT_DETECTED` if edited externally on disk).
   - Writes Markdown updates atomically via `.tmp` + `fs.renameSync` and upgrades graph edges from `FIXED_BY` to `VERIFIED_BY` when a fix is marked `verified`.

---

## 3. Exact Drop-In Patches for Your Existing Files

To wire these new modules into your existing Next.js codebase and fix the race conditions and file collisions identified in the review, apply these three targeted patches:

### Patch A: Prevent Vault Filename Collisions & Track Sync Status in `src/lib/brain/store.ts`

In `src/lib/brain/store.ts`, update `writeCaptureMarkdown` so two captures in the same second never overwrite each other and writes are atomic:

```typescript
// Inside src/lib/brain/store.ts — replace writeCaptureMarkdown filename & write logic:
const safeSlug = slugify(params.title || "capture").slice(0, 50);
const shortId = params.itemId.replace(/[^a-zA-Z0-9]/g, "").slice(-6);
const filename = `${ts}_${safeSlug}_${shortId}.md`;
const filePath = path.join(folderPath, filename);

try {
  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, md, "utf-8");
  fs.renameSync(tmpPath, filePath);
  return filePath;
} catch (err) {
  console.error("[BrainStore] Disk sync failed:", err);
  return null;
}
```

### Patch B: Wire Privacy Redaction & Real Screenshot OCR into `src/app/api/capture/route.ts`

Update `src/app/api/capture/route.ts` to run `sanitizeAndValidateCapture` and `processScreenshotAndOcr` before invoking `capture()`:

```typescript
// Inside src/app/api/capture/route.ts (top of POST handler):
import { sanitizeAndValidateCapture } from "@/lib/brain/privacy-redactor";
import { processScreenshotAndOcr } from "@/lib/brain/vision-ocr";

const body = await req.json();
const privacyCheck = sanitizeAndValidateCapture({
  rawContent: String(body.raw_content || ""),
  windowTitle: String(body.window_title || ""),
  sourceApp: String(body.source_app || ""),
});

if (!privacyCheck.allowed) {
  return NextResponse.json(
    { status: "blocked", reason: privacyCheck.blockedReason },
    { status: 422 }
  );
}

let enrichedContent = privacyCheck.sanitizedContent;
let visualHint = String(body.visual_hint || "");
let assetPath = String(body.asset_path || "");

if (body.image_base64) {
  const ocr = await processScreenshotAndOcr({
    imageBase64: String(body.image_base64),
    projectSlug: String(body.forced_project_id || "inbox"),
    itemId: `cap_${Date.now().toString(36)}`,
    windowTitle: String(body.window_title || ""),
    fallbackText: enrichedContent,
  });
  enrichedContent = ocr.extractedText || enrichedContent;
  visualHint = ocr.visualSemanticDescription || visualHint;
  assetPath = ocr.savedAssetPath;
}
```

### Patch C: Fix Project-Switching Race Condition in `src/components/brain/workspace-store.ts`

In `src/components/brain/workspace-store.ts`, guard `loadDetails` against out-of-order responses when switching projects rapidly:

```typescript
// Inside src/components/brain/workspace-store.ts:
let latestDetailsRequestId = 0;

// Inside loadDetails(projectId?: string):
const targetId = projectId ?? get().selectedProjectId;
if (!targetId) return;

const requestId = ++latestDetailsRequestId;
set({ loadingDetails: true });

try {
  const res = await fetch(`/api/project-details?project_id=${encodeURIComponent(targetId)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // Ignore stale responses if the user already switched to another project
  if (requestId !== latestDetailsRequestId || get().selectedProjectId !== targetId) {
    return;
  }
  set({ details: data, loadingDetails: false });
} catch (err) {
  if (requestId === latestDetailsRequestId) {
    console.error("[WorkspaceStore] Failed to load project details:", err);
    set({ loadingDetails: false });
  }
}
```

---

## 4. Step-by-Step Verification Checklist

Once you place the files into your repository:

1. **Initialize Database & Prisma Client:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
2. **Start the Next.js Workspace Server:**
   ```bash
   npm run dev
   ```
3. **Test the MCP Server Handshake in Terminal:**
   ```bash
   echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18"}}' | node scripts/mcp_server.mjs
   ```
4. **Run the Cross-Platform Desktop Agent (Clipboard + Screenshot OCR + Privacy Guard):**
   ```bash
   # Single capture with screenshot:
   python3 scripts/desktop_agent.py --screenshot

   # Continuous background watcher:
   python3 scripts/desktop_agent.py --watch
   ```