'use client';

import * as Sentry from '@sentry/browser';
import '@sentry/tracing';
import { BrowserTracing } from '@sentry/tracing';

export const createSentry = () => {
  Sentry.init({
    debug: true,
    dsn:
      process.env.NEXT_PUBLIC_SENTRY_DSN ||
      'https://f37b9ffd71ce439a9db1a9cd6de17369@o4504091157135360.ingest.sentry.io/4504091159101440',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? 'development',
    // enabled: ['staging', 'production'].includes(process.env.NEXT_PUBLIC_SENTRY_ENV ?? ''),
    attachStacktrace: true,

    integrations: [
      new BrowserTracing({
        tracingOrigins: [/^.*(init|localhost).*$/],
        shouldCreateSpanForRequest: () => true,
      }),
    ],
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? 'unknown',
  });
};
