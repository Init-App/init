'use server';

import { init, Integrations } from '@sentry/node';
import '@sentry/tracing';

init({
  dsn:
    process.env.SENTRY_DSN ||
    'https://f37b9ffd71ce439a9db1a9cd6de17369@o4504091157135360.ingest.sentry.io/4504091159101440',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  environment: process.env.SENTRY_ENV,
  enabled: ['staging', 'production'].includes(process.env.SENTRY_ENV ?? ''),
  integrations: [new Integrations.Http({ tracing: true, breadcrumbs: true })],
});
