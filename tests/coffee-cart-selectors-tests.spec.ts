import { test, expect } from '@playwright/test';

test('valid placing an order', async ({ page }) => {
  await page.goto('/');
  
  await page.locator('[aria-label="Espresso"]').click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (1)');
  await page.locator('[data-cy="Cappuccino"]').click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (2)');
  await page.locator('[data-test="checkout"]').click();

  await expect(page.locator('[aria-label="Payment form"]')).toBeVisible();
  await expect(page.locator('[id="name"]')).toBeVisible();
  await page.locator('[id="name"]').fill('test');
  await expect(page.locator('[id="email"]')).toBeVisible();
  await page.locator('[id="email"]').fill('test@email.com');
  await page.locator('[id="submit-payment"]').click();
  await expect(page.locator('[class="snackbar success"]')).toBeVisible();
});

test('validate errors on payment form', async ({ page }) => {
  await page.goto('/');
  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Proceed to checkout"]').click();

  await expect(page.locator('[aria-label="Payment form"]')).toBeVisible();
  await expect(page.locator('[id="name"]')).toBeVisible();
  await page.locator('[id="name"]').fill('test');
  await page.locator('[id="email"]').fill('test.com');
  await page.locator('[id="submit-payment"]').click();
});

test('validate promo after selecting 3 cup', async ({ page }) => {
  await page.goto('/');
  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Espresso Macchiato"]').click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (2)');
  await page.locator('[aria-label="Cappuccino"]').click();
  
  await expect(page.locator('[class="promo"]')).toBeVisible();
  await page.locator('[class="yes"]').click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (4)');
});

test('validate cart functionality', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[href="/cart"]')).toContainText('cart (0)');
  await page.locator('[data-cy="Cappuccino"]').click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (1)');

  await page.locator('[href="/cart"]').click();
  await page.locator(
    '//ul[not(contains(@class, "cart-preview"))]//button[@aria-label="Add one Cappuccino"]'
  ).click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (2)');

  await page.locator('[class="delete"]').click();
  await expect(page.locator('p', { hasText: 'No coffee, go add some.' })).toBeVisible();
});

test('add more coffee by fast menu', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-test="Cafe_Breve"]')).toBeVisible();
  await page.locator('[data-test="Cafe_Breve"]').click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (1)');

  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').hover();

  await expect(page.locator('[aria-label="Add one Cafe Breve"]')).toBeVisible();
  await page.locator('[aria-label="Add one Cafe Breve"]').click();

  await expect(page.locator('[href="/cart"]')).toContainText('cart (2)');
});
