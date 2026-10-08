import type { Page } from '@playwright/test';

export async function addCoffee(page: Page, coffeeName: string) {
    await page.locator(`[data-test="${coffeeName}"]`).click();
}

export async function chechOutAction (page: Page) {
    await page.locator('[data-test="checkout"]').click();
}

export async function fillPaymentForm (
    page: Page, 
    name: string, 
    email: string,
) {
    await page.getByRole('textbox', { name: 'Name' }).fill(name);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('button', { name: 'Submit' }).click();
}

export async function addMoreCappucchino (page: Page) {
    await page.getByRole('link', { name: 'Cart page' }).click();
    await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
}

export async function removeAllCoffee (page: Page, coffee: string) {
    await page.getByRole('button', { name: `Remove all ${coffee}` }).click();
}
