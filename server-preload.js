// @ts-check
'use strict';

/**
 * Set up datadog tracing. This should be called first, so Datadog can hook
 * all the other dependencies like `http`.
 */
function setUpDatadogTracing() {
  const { tracer: Tracer } = require('dd-trace');
  Tracer.init({
    // Your options here.
    runtimeMetrics: true,
    logInjection: true,
    profiling: true,
    env: process.env.VERCEL_ENV,
    service: 'initist',
    version: process.env.VERCEL_GIT_COMMIT_SHA,
  });
  console.debug('Datadog tracing set up');
}

/**
 * Polyfill DOMParser for react-intl
 * Otherwise react-intl spews errors related to formatting
 * messages with <xml>in them</xml>
 */
function setUpDOMParser() {
  const xmldom = require('xmldom');
  global['DOMParser'] = xmldom.DOMParser;
  console.debug('DOMParser has been patched');
}

require('next-logger');
setUpDatadogTracing();
setUpDOMParser();
