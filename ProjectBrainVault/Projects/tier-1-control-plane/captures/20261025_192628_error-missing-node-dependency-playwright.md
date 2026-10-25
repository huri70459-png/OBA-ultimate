---
id: item_67cfc67122e7
type: screenshot
project: Tier-1 Control Plane
source_app: BlueprintVerifySuite
source_url: 
captured_at: 2026-10-25T19:26:28.740Z
---

# Error: Missing Node dependency 'playwright'

> **AI Summary:** [codex-agent] Diagnosed ModuleNotFound -> Suggested Fix: `pnpm add playwright`

> **Visual Context:** Red terminal error during browser-repair workflow

### Suggested Fix
```bash
pnpm add playwright
```

## Content
Error: Cannot find module 'playwright'
    at runBrowserRepair (browser-repair.mjs:31:7)
