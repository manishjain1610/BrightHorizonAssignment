import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CenterLocatorPage extends BasePage {
  private readonly searchBox: Locator;
  private readonly centersList: Locator;
  private readonly totalCentersCount: Locator;
  private readonly firstCenterName: Locator;
  private readonly firstCenterAddress: Locator;
  private readonly popupDialog: Locator;
  private readonly popupDialogCenterName: Locator;
  private readonly popupDialogCenterAddress: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.locator('#addressInput');
    this.centersList = page.locator('#center-results-container > .centerResult');
    this.totalCentersCount = page.locator('#centerLocator_list > .centerDetails > .resultsNumber');
    this.firstCenterName = page.locator('.centerResult__name');
    this.firstCenterAddress = page.locator('.centerResult__address');
    this.popupDialog = page.locator('.mapTooltip');
    this.popupDialogCenterName = page.locator('.mapTooltip__headline');
    this.popupDialogCenterAddress = page.locator('.mapTooltip__address');
  }

  /** Function to search the location.
   * Here, we are first waiting for initial page to load and elements to appear.
   * After typing the Search Location, we need to wait a little before Enter can be pressed, otherwise the list does not load.
   * As per best practices, we should use waitForEvent method instead of waitForTimeout,
   * But, waitForEvent takes a long time so in this case, for performance resons we're using waitForTimeout.
   */
  async searchLocation(location: string): Promise<void> {
    const timeoutLimit = 1000;
    await this.waitForElement(this.totalCentersCount);
    await this.typeText(this.searchBox, location);
    await this.page.waitForTimeout(timeoutLimit);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(timeoutLimit);
  }

  /** Function to get the number of Found Centers.
   * We are converting it to integer before returning the number.
   */
  async getTotalCentersCount(): Promise<number> {
    const countText = await this.getText(this.totalCentersCount);
    return parseInt(countText);
  }

  /** Function to reteurn the count of centers in list after search.
   * Then, we will match the count with number of Found centers for match.
   */
  async getDisplayedCentersCount(): Promise<number> {
    return await this.centersList.count();
  }

  /** Function to get the details of first center in list.
   * We are chaining the locators to get the name and address values.
   */
  async getFirstCenterDetails(): Promise<{ name: string; address: string }> {
    const firstCenter = this.centersList.first();
    const name = await this.getText(firstCenter.locator(this.firstCenterName));
    const address = await this.getText(firstCenter.locator(this.firstCenterAddress));
    return { name, address };
  }

  /** Function to click the first center in list.
   */
  async clickFirstCenter(): Promise<void> {
    await this.clickElement(this.centersList.first());
  }

  /** Function to get the details of center from popup dialog.
   * We are chaining the locators to get the name and address values.
   */
  async getCenterPopupDetails(): Promise<{ name: string; address: string }> {
    const name = await this.getText(this.popupDialog.locator(this.popupDialogCenterName));
    const address = await this.getText(this.popupDialog.locator(this.popupDialogCenterAddress));
    return { name, address };
  }
}
