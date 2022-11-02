import tracer from 'dd-trace';

tracer.init({
  runtimeMetrics: true,
  logInjection: true,
  profiling: true,
  env: process.env.VERCEL_ENV,
  service: 'initist',
  version: process.env.VERCEL_GIT_COMMIT_SHA,
});
