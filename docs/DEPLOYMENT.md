# Project Brain OS — Deployment & Release Operations

Blueprint source: "Final Stages: Deployment, Monitoring, and Iteration" §1
(CI/CD Pipeline), adapted to a self-hosted, local-first appliance.

## 1. Source of truth & branching

- The Git repository is the single source of truth. `main` is always deployable;
  `develop` (optional) integrates feature work.
- Branching model: **GitHub Flow** — short-lived feature branches
  (`feat/…`, `fix/…`) opened as pull requests into `main`; hotfixes branch from
  `main` and merge back immediately. The heavier GitFlow model was considered and
  rejected: with a single deployable artifact (the Docker image) and a fully
  automated pipeline, the extra `release/*` ceremony adds friction without value.
- Every PR runs the full pipeline (below); no merge with a red pipeline.

## 2. Continuous Integration (`.github/workflows/ci.yml`)

Triggered on every push to `main`/`develop` and every PR. Stages, in order —
any failure halts the pipeline:

| Stage | Command | Notes |
|---|---|---|
| Install | `npm ci` | frozen lockfile |
| Lint | `npm run lint` | strict guardrails scoped to `src/**` |
| Type check | `npm run type-check` | `tsc --noEmit`, `strict: true` |
| Prisma client | `npx prisma generate` | required before `next build` |
| Build | `npm run build` | Next.js standalone output |
| DB | `npx prisma db push` | fresh SQLite for the test stage |
| Boot | `node .next/standalone/server.js` | production server under test |
| **Verify** | `npm run test:regression` | **the full ~168-check board, 7 suites**, run live against the booted server |
| Artifact | `docker/build-push-action` | builds the deployable image (push activates with registry secrets) |

Failed runs upload `logs/`, `dev.log` and `server.log` as pipeline artifacts
(7-day retention) so failures are debuggable from the Actions tab.

Local equivalents before opening a PR:

```bash
npm run ci               # lint + type-check + build
npm run test:regression  # full board against a running server
```

## 3. Continuous Deployment & environments

- **Development** — your workstation: `npm run dev`, SQLite at `db/custom.db`,
  vault at `ProjectBrainVault/`.
- **Staging** — any disposable host running the CI image against mounted volumes:
  `docker run -p 3000:3000 -v brainos-db:/app/db -v brainos-vault:/app/ProjectBrainVault brain-os:ci-<sha>`.
- **Production** — same image, tagged from `main` after verification
  (`brain-os:<version>`), run under a process supervisor (systemd / compose).
  The blueprint's manual-approval gate maps to: tag & ship from `main` only after
  the green pipeline on a release commit.
- Rollback strategy: images are immutable and tagged per commit
  (`ci-<sha>`) and per release (`<version>`) — rollback is re-running the
  previous tag. SQLite + the vault live in volumes, so data survives rolls.
- The blueprint's Vercel workflow was deliberately not adopted: the appliance's
  local-first contract (SQLite on disk, Obsidian vault writes, desktop-agent
  ingest over loopback) requires a host with a persistent filesystem. The
  conceptual Vercel YAML remains in the blueprint document as a reference if a
  static/hosted variant of Brain OS is ever built.

## 4. Runtime configuration & releases

- Runtime settings (LLM keys, dedup window, agent token, auth mode, feature
  flags) live in the SQLite `Setting` table and are edited live from the
  Settings dialog — **no redeploy needed for operational changes** (blueprint
  "decouple deployment from release").
- Version scheme: semver in `package.json` + the engine version echoed by
  `GET /api/health` (`version`, `uptime_seconds`, `memory_rss_bytes`).
