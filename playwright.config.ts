import { defineConfig } from '@playwright/test'

export default defineConfig({
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
  use: {
    baseURL: 'https://petstore.swagger.io',
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  projects: [
    {
      name: 'api-tests',
      use: {},
    },
  ],
})
