'use server';

import * as Sentry from '@sentry/node';
import '@sentry/tracing';

export const createServerSentryClient = () => {
  Sentry.init({
    dsn:
      process.env.NEXT_PUBLIC_SENTRY_DSN ||
      'https://f37b9ffd71ce439a9db1a9cd6de17369@o4504091157135360.ingest.sentry.io/4504091159101440',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? 'development',
    // enabled: ['staging', 'production'].includes(process.env.NEXT_PUBLIC_SENTRY_ENV ?? ''),
    integrations: [
      new Sentry.Integrations.Http({ tracing: true, breadcrumbs: true }),
      new Sentry.Integrations.RequestData(),
    ],
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? 'unknown',
  });
};
