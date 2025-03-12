import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BackupCarePage extends BasePage {
  readonly benefitsEquity: Locator;
  readonly managedRisk: Locator;
  readonly bestInClass: Locator;
  readonly benefitsEquityTitle: Locator;
  readonly managedRiskTitle: Locator;
  readonly bestInClassTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.benefitsEquity = page.getByRole('listitem').filter({ hasText: 'Benefits equity' });
    this.managedRisk = page.getByRole('listitem').filter({ hasText: 'Managed risk' });
    this.bestInClass = page.getByRole('listitem').filter({ hasText: 'Best-in-class' });
    this.benefitsEquityTitle = page.getByRole('heading', { name: 'Benefits equity' });
    this.managedRiskTitle = page.getByRole('heading', { name: 'Managed risk' });
    this.bestInClassTitle = page.getByRole('heading', { name: 'Best-in-class' });
  }
}
