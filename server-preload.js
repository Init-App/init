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
  });
}

/**
 * Polyfill DOMParser for react-intl
 * Otherwise react-intl spews errors related to formatting
 * messages with <xml>in them</xml>
 */
function setUpDOMParser() {
  const xmldom = require('xmldom');
  global['DOMParser'] = xmldom.DOMParser;
}

setUpDatadogTracing();
setUpDOMParser();
require('next-logger');
