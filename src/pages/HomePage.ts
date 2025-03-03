import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { APPLICATION_URL } from '../tests/config/app.config';

export class HomePage extends BasePage {
  private readonly findCenterLink: Locator;
  private readonly manageCookiesAcceptAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.findCenterLink = page.getByRole('link', { name: 'Find a Center' }).nth(1);
    this.manageCookiesAcceptAllButton = page.getByRole('button', { name: 'Accept All' });
  }

  /** Function to navigate to home page.
   * Here, the APPLICATION_URL value is being fetched from resources->env->testdata.json file.
   * We're keeping the home page URL there as prod and non-prod environments usually have different URLs.
   * Then, if there is a dialog box asking user to manage cookies, we're accepting all cookies.
   */
  async navigateToHomePage(): Promise<void> {
    await this.page.goto(APPLICATION_URL);
    if (await this.manageCookiesAcceptAllButton.isVisible()) {
      this.manageCookiesAcceptAllButton.click();
    }
  }

  /** Function to find the center as provided by Test.
   */
  async clickFindCenter(): Promise<void> {
    await this.clickElement(this.findCenterLink);
  }
}
