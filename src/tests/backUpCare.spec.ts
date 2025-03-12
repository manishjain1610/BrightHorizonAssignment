import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BackupCarePage } from '../pages/BackupCarePage';
import Logger from '../utils/WinstonLogger';

test.describe('Bright Horizons Back up care title match', () => {
  let homePage: HomePage;
  let backupCarePage: BackupCarePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    backupCarePage = new BackupCarePage(page);
    // Navigate to homepage
    await homePage.navigateToHomePage();
  });

  test('Verify back up care titles', async () => {
    // Navigate to Back up care page
    Logger.info('Navigating to Back up care page. Test Begins.');
    await homePage.navigateToBackupCarePage();
    // First check - Benefits equity title
    await backupCarePage.clickElement(backupCarePage.benefitsEquity);
    expect((await backupCarePage.benefitsEquity.innerText()).toUpperCase()).toEqual(
      await backupCarePage.benefitsEquityTitle.innerText()
    );
    Logger.info('The Benefits Equity title matches.');

    // Second check - Managed Risk title
    await backupCarePage.clickElement(backupCarePage.managedRisk);
    expect((await backupCarePage.managedRisk.innerText()).toUpperCase()).toEqual(
      await backupCarePage.managedRiskTitle.innerText()
    );
    Logger.info('The managed Risk title matches.');

    // Third check - Best in class title
    await backupCarePage.clickElement(backupCarePage.bestInClass);
    expect((await backupCarePage.bestInClass.innerText()).toUpperCase()).toEqual(
      await backupCarePage.bestInClassTitle.innerText()
    );
    Logger.info('The Best In Class title matches.');
  });
});
