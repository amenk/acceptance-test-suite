import type { Page, Locator } from '@playwright/test';
import type { PageObject } from '../../types/PageObject';

export class Home implements PageObject {

    public readonly productImages: Locator;

    constructor(public readonly page: Page) {
        this.productImages = page.locator('.product-image-link');
    }

    async goTo() {
        await this.page.goto('./');
    }
}