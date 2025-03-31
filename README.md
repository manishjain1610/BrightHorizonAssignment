# Playwright Bright Horization Scenario Demo

[![Playwright UI Tests for Bright Horizons](https://github.com/manishjain1610/BrightHorizonAssignment/actions/workflows/playwright-ci.yml/badge.svg)](https://github.com/manishjain1610/BrightHorizonAssignment/actions/workflows/playwright-ci.yml)

This repository contains a Playwright UI test written in TypeScript and is configured to run tests in different environments such as QA and Production.

## Table of Contents

- [Installation](#installation)
  - [Install Node.js and npm](#install-nodejs-and-npm)
  - [Install Playwright](#install-playwright)
  - [Install Visual Studio Code](#install-visual-studio-code)
  - [Install Project Dependencies](#install-project-dependencies)
- [Project Structure](#project-structure)
  - [Configuration Files](#configuration)
- [Running Tests](#running-tests)
  - [Running Tests in Different Environments](#running-tests-in-different-environments)
  - [Running Headless Tests](#running-headless-tests)
  - [Running Tests Sequentially](#running-tests-sequentially)
- [Best Practices Used](#best-practices-used)
- [CI Integration](#ci-integration)
- [EMail Report](#email-report)

## Installation

### Install Node.js and npm

1. **Download and Install Node.js**: Visit [nodejs.org](https://nodejs.org/) and download the LTS version of Node.js. The npm package manager is included with Node.js.

2. **Verify Installation**: After installing Node.js, you can verify the installation by running the following commands in your terminal:

   ```bash
   node -v
   npm -v
   ```

### Install Playwright

1. **Install Playwright**: Run the following command to install Playwright and its dependencies:

   ```bash
   npm install @playwright/test
   ```

2. **Install Browsers**: Run the following command to install the required browsers:

   ```bash
   npx playwright install
   ```

### Install Visual Studio Code

1. **Download and Install VSCode**: Visit [code.visualstudio.com](https://code.visualstudio.com/) and download the latest version of Visual Studio Code.

### Install Project Dependencies

1. **Clone the Repository**: Clone this repository to your local machine:

   ```bash
   git clone https://github.com/manishjain1610/BrightHorizonAssignment.git
   ```

2. **Install Dependencies**: Navigate to the project directory and run the following command to install the project dependencies:

   ```bash
   npm install
   ```

## Project Structure

```plaintext
BrightHorizonAssignment/
├── node_modules/
├── playwright-report/
├── src/
│   ├── pages/
│   │   ├── BackupCarePage.ts
│   │   ├── BasePage.ts
│   │   ├── CenterLocatorPage.ts
│   │   ├── HomePage.ts
│   │ 	└── ResourceSearchPage.ts
│   ├── tests/
│   │   ├── config/
│   │   │   └── app.config.ts
│   │   ├── resources/
│   │   │   ├── prod/
│   │   │   │   └── testdata.json
│   │   │   └── qa/
│   │   │       └── testdata.json
│   │   ├── backUpCare.spec.ts
│   │   ├── centerSearch.spec.ts
│   │   └── resourceSearch.spec.ts
│   └── utils/
│       ├── WinstonLogger.ts
|       └──EMailReports.ts
├── test-results/
├── .gitignore
|── .eslintrc.json
|── .prettierrc
├── package-lock.json
├── package.json
├── playwright.config.ts
├── globalTeardown.ts
└── README.md
```

### Configuration

- **package.json**: Defines the scripts and dependencies for the project.
- **playwright.config.ts**: Configuration file for Playwright tests.

## Running Tests

### Running Tests in Different Environments

- **QA Environment**:

  ```bash
  npm run test-qa
  ```

- **Production Environment**:

  ```bash
  npm run test-prod
  ```

### Running Headless Tests

- **QA Environment (Headless)**:

  ```bash
  npm run headless-test-qa
  ```

- **Production Environment (Headless)**:

  ```bash
  npm run headless-test-prod
  ```
### Running Tests Sequentially

- **QA Environment**:

  ```bash
  npm run test-qa-Sequentially
  ```

## Best Practices Used

- **Page Object Model Design Pattern:** Ensures the test code is maintainable and scalable by separating page logic and test scenarios.
- **Multiple Environment Support:** Supports QA and PROD environments with separate test data.
- **Automatic Retrying Mechanism:** Increases test resilience by automatically retrying failed test cases, reducing false negatives, and ensuring more stable results.
- **CI Integration:** Implements GitHub CI workflows to automatically run tests on changes to the master branch and pull requests, ensuring code quality and early detection of issues.

## CI Integration
The project uses GitHub Actions for continuous integration. The workflow configuration is located in `.github/workflows/playwright-ci.yml`.

## EMail Report
The suite automatically emails the test report after execution but email settings need to be configured. I am using my personal email id & password from github secrets but other users may store their email settings (EMAIL_USER, EMAIL_PASS, SMTP_HOST, SMTP_PORT) in local .env file and use it. Please ensure that email service allows SMTP third-party access. I used zohomail for my own use.
