import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Function to wait for a specific element.
   * @param locator - The element for which we need to wait.
   * @param timeout - The timeout value for the wait.
   */
  async waitForElement(locator: Locator, timeout = 30000): Promise<void> {
    await locator.waitFor({ timeout });
  }

  /**
   * Function to click a specific element.
   * @param locator - The element which we need to click.
   */
  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * Function to type some text in a specific element.
   * @param locator - The element where we need to type.
   * @param text - The text to type.
   */
  async typeText(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  /**
   * Function to get text from a specific element.
   * @param locator - The element from where we need to fetch text.
   * Here we're also removing the leading or trailing blanks before returning text.
   */
  async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return ((await locator.textContent()) || '').trim();
  }
}
