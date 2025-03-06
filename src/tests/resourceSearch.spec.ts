import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ResourceSearchPage } from '../pages/ResourceSearchPage';
import { SEARCH_RESOURCE } from './config/app.config';
import Logger from '../utils/WinstonLogger';

test.describe('Bright Horizons Resource Search', () => {
  let homePage: HomePage;
  let resourceSearchPage: ResourceSearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    resourceSearchPage = new ResourceSearchPage(page);
  });

  test('Verify resource search and title', async ({ page }) => {
    // Navigate to homepage
    Logger.info('Navigating to home page. Test Begins.');
    await homePage.navigateToHomePage();

    // Click search icon to find resource
    Logger.info('Clicking on search icon to open search field.');
    await homePage.clickFindResource();

    // Verify Search field is visible and editable
    await expect(homePage.searchField).toBeVisible();
    Logger.info('The resource search field is visible.');
    await expect(homePage.searchField).toBeEditable();
    Logger.info('The resource search field is editable.');

    // Type Resource name in Find Resource field
    Logger.info('Searching for the specified resource.');
    await homePage.searchResource(SEARCH_RESOURCE);

    // Verify first search result is exact match to the search string
    const firstResourceTitle = await resourceSearchPage.getFirstResourceDetails();
    expect(firstResourceTitle).toBe(SEARCH_RESOURCE);
    Logger.info(
      'The first resource title in searched list is exactly same as what was typed in search textbox. '
    );
  });
});
