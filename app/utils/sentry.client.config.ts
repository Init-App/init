'use client';

import { init } from '@sentry/browser';
import '@sentry/tracing';
import { BrowserTracing } from '@sentry/tracing';

init({
  debug: true,
  dsn:
    process.env.SENTRY_DSN ||
    'https://f37b9ffd71ce439a9db1a9cd6de17369@o4504091157135360.ingest.sentry.io/4504091159101440',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  environment: process.env.SENTRY_ENV ?? 'development',
  // enabled: ['staging', 'production'].includes(process.env.SENTRY_ENV ?? ''),
  integrations: [
    new BrowserTracing({
      tracingOrigins: [/^.*(init|localhost).*$/],
    }),
  ],
});
