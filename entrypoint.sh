#!/bin/sh
# Boot: create/migrate the SQLite schema, then hand off to the standalone server.
set -e
echo "[entrypoint] syncing SQLite schema (prisma db push)…"
npx --prefix /app prisma db push --skip-generate --accept-data-loss
echo "[entrypoint] starting Project Brain OS…"
exec node server.js
