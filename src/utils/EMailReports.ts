import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

/**
 * Sends Playwright test report via email
 * @param recipient - Email address of the recipient
 * @param subject - Email subject
 * @param reportPath - Path to the HTML report
 */
export async function sendReport(
  recipient: string,
  subject: string,
  reportPath: string
): Promise<void> {
  if (!fs.existsSync(reportPath)) {
    console.error(`Report not found at: ${reportPath}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.in',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: subject,
    text: `Please find the attached Playwright test report from the test environment ${process.env.TEST_ENV}.`,
    attachments: [
      {
        filename: path.basename(reportPath),
        path: reportPath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.response}`);
  } catch (error) {
    console.error(`❌ Failed to send email: ${error}`);
  }
}
