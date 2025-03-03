import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CenterLocatorPage } from '../pages/CenterLocatorPage';
import { CHILD_CARE_URL, SEARCH_LOCATION } from './config/app.config';
import Logger from '../utils/WinstonLogger';

test.describe('Bright Horizons Center Search', () => {
  let homePage: HomePage;
  let centerLocatorPage: CenterLocatorPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    centerLocatorPage = new CenterLocatorPage(page);
  });

  test('Verify center search and details', async ({ page }) => {
    // Navigate to homepage
    Logger.info('Navigating to home page. Test Begins.');
    await homePage.navigateToHomePage();

    // Click Find a Center
    Logger.info('Clicking on Find A Center link.');
    await homePage.clickFindCenter();

    // Verify URL contains expected path
    Logger.info('Checking that new page has the correct URL.');
    await expect(page).toHaveURL(new RegExp(CHILD_CARE_URL));

    // Search for New York centers
    Logger.info('Searching for Location described in test.');
    await centerLocatorPage.searchLocation(SEARCH_LOCATION);

    // Verify centers count matches displayed centers
    const totalCount = await centerLocatorPage.getTotalCentersCount();
    const displayedCount = await centerLocatorPage.getDisplayedCentersCount();
    expect(totalCount).toBe(displayedCount);
    Logger.info(
      'The total centers found count ' +
        totalCount +
        ' is equal to center count ' +
        displayedCount +
        ' from the list '
    );

    // Get first center details from list
    Logger.info('Getting the details of first center from the list.');
    const listDetails = await centerLocatorPage.getFirstCenterDetails();

    // Click first center and get popup details
    Logger.info('Clicking the first center and getting the center details from popup Dialog.');
    await centerLocatorPage.clickFirstCenter();
    const popupDetails = await centerLocatorPage.getCenterPopupDetails();

    // Verify center details match
    expect(listDetails.name).toBe(popupDetails.name);
    Logger.info(
      'The center name in list is ' +
        listDetails.name +
        ' and the center name in popup dialog is ' +
        popupDetails.name
    );
    expect(listDetails.address).toBe(popupDetails.address);
    Logger.info(
      'The center address in list is ' +
        listDetails.address +
        ' and the center address in popup dialog is ' +
        popupDetails.address
    );
  });
});
