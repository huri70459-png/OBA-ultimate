# Project Brain OS — production image (blueprint "Artifact Generation").
# Multi-stage: deps -> build -> slim runner running the Next.js standalone
# server against SQLite via Prisma. The vault (ProjectBrainVault/) and logs/
# are volume-mount points so captures survive container replacement.

FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# A build-time DATABASE_URL keeps Prisma's engine happy; the real DB is created at runtime.
ENV DATABASE_URL="file:/app/db/custom.db"
RUN npx prisma generate && npx next build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:/app/db/custom.db"
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd -r brainos && useradd -r -g brainos brainos

# Standalone server + static assets + public files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Prisma schema + CLI so the entrypoint can create/migrate the SQLite DB on boot
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

RUN mkdir -p /app/db /app/logs /app/ProjectBrainVault && chown -R brainos:brainos /app
USER brainos
VOLUME ["/app/db", "/app/logs", "/app/ProjectBrainVault"]

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["./entrypoint.sh"]
