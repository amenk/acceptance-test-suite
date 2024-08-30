import type { Page, Locator } from '@playwright/test';
import type { PageObject } from '../../types/PageObject';

export class CheckoutCart implements PageObject {
    public readonly headline: Locator;
    public readonly goToCheckoutButton: Locator;
    public readonly enterDiscountInput: Locator;
    public readonly grandTotalPrice: Locator;
    public readonly emptyCartAlert: Locator;
    public readonly stockReachedAlert: Locator;
    public readonly cartLineItemImages: Locator;
    public readonly unitPriceInfo: Locator;
    public readonly cartQuantityNumber: Locator;

    constructor(public readonly page: Page) {
        this.headline = page.getByRole('heading', { name: 'Shopping cart' });
        this.goToCheckoutButton = page.getByRole('link', { name: 'Go to checkout' });
        this.enterDiscountInput = page.getByLabel('Discount code');
        this.grandTotalPrice = page.locator('dt:has-text("Grand total") + dd:visible');
        this.emptyCartAlert = page.getByText('Your shopping cart is empty.');
        this.stockReachedAlert = page.getByText('only available 1 times');
        this.cartLineItemImages = page.locator('.line-item-img-link');
        this.unitPriceInfo = page.locator('.line-item-unit-price-value');
        this.cartQuantityNumber = page.getByLabel('Quantity', { exact: true });
    }

    url() {
        return 'checkout/cart';
    }
}
