FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

COPY . .

# Set ARGs
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SENTRY_ENV
ARG NEXT_PUBLIC_VERCEL_URL
ARG NEXT_PUBLIC_LOGFLARE_API_KEY
ARG NEXT_PUBLIC_LOGFLARE_SOURCE_ID
ARG NODE_ENV
ARG NEXT_PUBLIC_LOGS_TOKEN

# Set envs from args
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV NEXT_PUBLIC_SENTRY_ENV=${NEXT_PUBLIC_SENTRY_ENV}
ENV NEXT_PUBLIC_VERCEL_URL=${NEXT_PUBLIC_VERCEL_URL}
ENV NEXT_PUBLIC_LOGFLARE_API_KEY=${NEXT_PUBLIC_LOGFLARE_API_KEY}
ENV NEXT_PUBLIC_LOGFLARE_SOURCE_ID=${NEXT_PUBLIC_LOGFLARE_SOURCE_ID}
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_LOGS_TOKEN=${NEXT_PUBLIC_LOGS_TOKEN}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SENTRY_ENV
ARG NEXT_PUBLIC_VERCEL_URL
ARG NEXT_PUBLIC_LOGFLARE_API_KEY
ARG NEXT_PUBLIC_LOGFLARE_SOURCE_ID
ARG NODE_ENV
ARG NEXT_PUBLIC_LOGS_TOKEN

# Set envs from args
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV NEXT_PUBLIC_SENTRY_ENV=${NEXT_PUBLIC_SENTRY_ENV}
ENV NEXT_PUBLIC_VERCEL_URL=${NEXT_PUBLIC_VERCEL_URL}
ENV NEXT_PUBLIC_LOGFLARE_API_KEY=${NEXT_PUBLIC_LOGFLARE_API_KEY}
ENV NEXT_PUBLIC_LOGFLARE_SOURCE_ID=${NEXT_PUBLIC_LOGFLARE_SOURCE_ID}
ARG NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_LOGS_TOKEN=${NEXT_PUBLIC_LOGS_TOKEN}

CMD node server.js
