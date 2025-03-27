import { PlaywrightTestConfig, devices } from '@playwright/test';

interface TestConfig extends PlaywrightTestConfig {
  testDataDir: string;
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const defaultConfig: PlaywrightTestConfig = {
  testDir: './src/tests/',
  timeout: 60000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI 1 time and 0 on local */
  retries: process.env.CI ? 1 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters
   We can also use Allure reports which is better, but for simplicity we will use html reports here. 
   */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    permissions: ['clipboard-read'],
  },

  /* Configure projects for major browsers.
    We can also configure firefox or safari browsers here if needed.
  */
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
};

const qaConfig: TestConfig = {
  testDataDir: './src/tests/resources/qa',
};

const prodConfig: TestConfig = {
  testDataDir: './src/tests/resources/prod',
};

// Get the environment from command line. If none, set it to qa
const environment = process.env.TEST_ENV?.trim() || 'qa';

// Config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(environment === 'prod' ? prodConfig : qaConfig),
};

export default config;
