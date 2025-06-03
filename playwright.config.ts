import path from 'path'

import { devices } from '@playwright/test'

import dotenv from 'dotenv'

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') })

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  expect: { timeout: 10 * 1000 },
  timeout: 45 * 1000,
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? '50%' : '50%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://petstore.swagger.io',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
      },
    },
    {
      name: 'Firefox',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
      },
    },
    {
      name: 'Safari',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true,
        },
      },
    },
  ],
}

export default config
