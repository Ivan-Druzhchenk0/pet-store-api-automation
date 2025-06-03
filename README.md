# Playwright TypeScript Automation Project

This repository contains automated tests using Playwright with TypeScript.

### Overview

This project demonstrates how to use Playwright for browser automation and testing with TypeScript. Playwright allows you to automate Chromium, Firefox, and WebKit with a single API.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v14 or higher)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Getting Started

### Installation

1. Clone this repository:

```
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:

```
npm install
```

### Project Setup

Initialize Playwright in your project:

```
npx playwright install
```

This command installs browser binaries for Chromium, Firefox, and WebKit.

### Writing Tests

Tests are located in the `tests` directory. Create your test files with a `.spec.ts` extension.

Example test:

```
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const title = await page.title();
    expect(title).toContain('Playwright');
});
```

### Running Tests

Run all tests:

```
npx playwright test
```

Run a specific test file:

```
npx playwright test tests/example.spec.ts
```

Run tests in UI mode:

```
npx playwright test --ui
```

Run tests in a specific browser:

```
npx playwright test --project=chromium
```

### Configuration

The project uses a `playwright.config.ts` file to configure test execution:

```
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 30000,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
},
],
};

export default config;
```

### Debugging

For debugging tests:

- Use `await page.pause()` to pause test execution
- Use headful mode with `--headed` flag
- Use trace viewer to visualize test execution

```
npx playwright test --debug
```
