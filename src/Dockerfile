FROM arm64v8/node:alpine3.17 AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/package.json package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next .next
COPY --from=builder --chown=nextjs:nodejs /app/public public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000
CMD ["npm", "run", "start"]