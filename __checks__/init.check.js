/**
 * This is a Playwright script Checkly generated for you based on your Vercel project.
 * To learn more about Browser checks and Playwright visit: https://www.checklyhq.com/docs/browser-checks
 */

// Create a Chromium browser
const { chromium } = require('playwright');

// Checkly supports top level await, but we wrap your code in an async function so you can run it locally too.
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // If available, we set the target URL to a preview deployment URL provided by the ENVIRONMENT_URL created by Vercel.
  // Otherwise, we use the Production URL.
  const targetUrl = process.env.ENVIRONMENT_URL || 'https://www.init.ist';

  // We visit the page. This waits for the "load" event by default.
  const response = await page.goto(targetUrl);

  // If the page doesn't return a successful response code, we fail the check
  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`);
  }

  await page.setViewport({ width: 1728, height: 968 });

  await navigationPromise;

  await page.waitForSelector('div > div > .form > .form-group:nth-child(5) > .link');
  await page.click('div > div > .form > .form-group:nth-child(5) > .link');

  await page.waitForSelector('div > div > .form > .helper-text > .link');
  await page.click('div > div > .form > .helper-text > .link');

  await page.waitForSelector('div > div > .form > .form-group > .link');
  await page.click('div > div > .form > .form-group > .link');

  await page.waitForSelector('#email');
  await page.click('#email');

  await page.waitForSelector('#password');
  await page.click('#password');

  await page.waitForSelector('div > div > .form > .form-group > .button');
  await page.click('div > div > .form > .form-group > .button');

  // We snap a screenshot.
  await page.screenshot({ path: 'screenshot.jpg' });

  // We close the page and browser. This is needed for collecting accurate web vitals.
  await page.close();
  await browser.close();
}

run();
