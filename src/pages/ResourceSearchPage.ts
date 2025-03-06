import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResourceSearchPage extends BasePage {
  private readonly resourceList: Locator;
  private readonly resourceTitle: Locator;
  constructor(page: Page) {
    super(page);
    this.resourceList = page.locator('div.results.container');
    this.resourceTitle = page.locator('.title');
  }

  /** Function to return the title of first resource in Search results list
   */
  async getFirstResourceDetails(): Promise<string> {
    const resTitle = await this.getText(this.resourceList.locator(this.resourceTitle).first());
    return resTitle;
  }
}
