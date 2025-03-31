import { sendReport } from './src/utils/EMailReports';

async function globalTeardown() {
  console.log('Sending Playwright test report...');

  const reportPath = './playwright-report/index.html'; // Path to your report
  const recipient = 'manish.jain1610@gmail.com';
  const subject = `Playwright Test Execution Report from ${process.env.TEST_ENV}`;

  await sendReport(recipient, subject, reportPath);
}

export default globalTeardown;
