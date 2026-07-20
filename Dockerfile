# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# ---- Dependencies ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time,
# so they must be supplied as build args, not just runtime env vars.
ARG NEXT_PUBLIC_API_GATEWAY_URL
ARG NEXT_PUBLIC_FINANCE_SERVICE_URL
ARG NEXT_PUBLIC_AUTH_URL
ARG NEXT_PUBLIC_AUTHORIZATION_URL
ARG NEXT_PUBLIC_FILE_URL
ARG NEXT_PUBLIC_NOTIFICATION_URL
ENV NEXT_PUBLIC_API_GATEWAY_URL=$NEXT_PUBLIC_API_GATEWAY_URL \
    NEXT_PUBLIC_FINANCE_SERVICE_URL=$NEXT_PUBLIC_FINANCE_SERVICE_URL \
    NEXT_PUBLIC_AUTH_URL=$NEXT_PUBLIC_AUTH_URL \
    NEXT_PUBLIC_AUTHORIZATION_URL=$NEXT_PUBLIC_AUTHORIZATION_URL \
    NEXT_PUBLIC_FILE_URL=$NEXT_PUBLIC_FILE_URL \
    NEXT_PUBLIC_NOTIFICATION_URL=$NEXT_PUBLIC_NOTIFICATION_URL

RUN npm run build

# ---- Runtime ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
