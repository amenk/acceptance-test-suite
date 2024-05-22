import { test as base, expect } from '@playwright/test';
import type { FixtureTypes } from '../../types/FixtureTypes';
import type { components } from '@shopware/api-client/admin-api-types';

export const ProductData = base.extend<FixtureTypes>({
    ProductData: async ({ IdProvider, SalesChannelBaseConfig, AdminApiContext, DefaultSalesChannel }, use) => {

        // Generate unique IDs
        const { id: productId, uuid: productUuid } = IdProvider.getIdPair();
        const productName = `Product_test_${productId}`;

        // Create product
        const productResponse = await AdminApiContext.post('./product?_response', {
            data: {
                active: true,
                stock: 10,
                taxId: SalesChannelBaseConfig.taxId,
                id: productUuid,
                name: productName,
                productNumber: 'Product-' + productId,
                price: [
                    {
                        currencyId: SalesChannelBaseConfig.eurCurrencyId,
                        gross: 10,
                        linked: false,
                        net: 8.4,
                    },
                ],
                purchasePrices: [
                    {
                        currencyId: SalesChannelBaseConfig.eurCurrencyId,
                        gross: 8,
                        linked: false,
                        net: 6.7,
                    },
                ],
            },
        });
        expect(productResponse.ok()).toBeTruthy();

        const { data: product } = (await productResponse.json()) as { data: components['schemas']['Product'] };

        // Assign product to sales channel
        const syncResp = await AdminApiContext.post('./_action/sync', {
            data: {
                'add product to sales channel': {
                    entity: 'product_visibility',
                    action: 'upsert',
                    payload: [
                        {
                            productId: product.id,
                            salesChannelId: DefaultSalesChannel.salesChannel.id,
                            visibility: 30,
                        },
                    ],
                },
                'add product to root navigation': {
                    entity: 'product_category',
                    action: 'upsert',
                    payload: [
                        {
                            productId: product.id,
                            categoryId: DefaultSalesChannel.salesChannel.navigationCategoryId,
                        },
                    ],
                },
            },
        });

        expect(syncResp.ok()).toBeTruthy();

        // Use product data in the test
        await use(product);

        // Delete product after the test is done
        const cleanupResponse = await AdminApiContext.delete(`./product/${productUuid}`);
        expect(cleanupResponse.ok()).toBeTruthy();
    },
});