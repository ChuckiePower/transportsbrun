# syntax=docker/dockerfile:1
# Image de production du site Transports Brun (Next.js « standalone »).
#   docker build --build-arg SITE_URL=https://transports-brun.com -t transports-brun .

ARG NODE_VERSION=22

# --- Base commune : Node LTS + pnpm via corepack -------------------------------
# (Facultatif) derrière un proxy d'entreprise qui intercepte le TLS :
#   docker build --secret id=ca,src=/chemin/vers/ca.pem ...
FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=secret,id=ca,required=false \
    if [ -f /run/secrets/ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/ca; fi; \
    corepack enable && corepack prepare pnpm@10.28.0 --activate

# --- Dépendances --------------------------------------------------------------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    --mount=type=secret,id=ca,required=false \
    if [ -f /run/secrets/ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/ca; fi; \
    pnpm install --frozen-lockfile

# --- Compilation --------------------------------------------------------------
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# URL publique : gravée dans les pages statiques (canonical, sitemap, Open Graph, JSON-LD)
ARG SITE_URL=https://transports-brun.com
# Mesure d'audience facultative (désactivée si vide), lue au moment du build
ARG ANALYTICS_PROVIDER=""
ARG ANALYTICS_SCRIPT_URL=""
ARG ANALYTICS_SITE_ID=""
ENV SITE_URL=$SITE_URL \
    ANALYTICS_PROVIDER=$ANALYTICS_PROVIDER \
    ANALYTICS_SCRIPT_URL=$ANALYTICS_SCRIPT_URL \
    ANALYTICS_SITE_ID=$ANALYTICS_SITE_ID
RUN pnpm build

# --- Exécution : image minimale, utilisateur non-root --------------------------
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs \
    && mkdir -p .next/cache && chown -R nextjs:nodejs .next

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
