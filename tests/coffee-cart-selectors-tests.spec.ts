import { test, expect } from '@playwright/test';

test('valid placing an order', async ({ page }) => {
  await page.goto('/');
  
  await page.locator('[aria-label="Espresso"]').click();
  await expect(page.locator('[href="/cart"]')).toContainText('cart (1)');
  await page.getByLabel('Cappuccino').click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (2)');
  await page.locator('[data-test="checkout"]').click();

  await expect(page.getByText('Payment details')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  await page.getByLabel('Name').fill('test');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByLabel('Email').fill('test@email.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});

test('validate errors on payment form', async ({ page }) => {
  await page.goto('/');
  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Proceed to checkout"]').click();

  await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByLabel('Name').fill('test');

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByLabel('Email').fill('test.com');
  await page.locator('[id="submit-payment"]').click();
  await expect(page.getByLabel('Promotion message')).toBeVisible();
});

test('validate promo after selecting 3 cup', async ({ page }) => {
  await page.goto('/');
  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Espresso Macchiato"]').click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (2)');
  await page.locator('[aria-label="Cappuccino"]').click();
  
  await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.')).toBeVisible();
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (4)');
});

test('validate cart functionality', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (0)');
  await page.locator('[data-cy="Cappuccino"]').click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (1)');

  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (2)');

  await page.locator('[aria-label="Remove all Cappuccino"]').click();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});

test('add more coffee by fast menu', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-test="Cafe_Breve"]')).toBeVisible();
  await page.locator('[data-test="Cafe_Breve"]').click();

  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').hover();

  await expect(page.locator('.cart-preview')).toBeVisible();
  await page.getByText('Cafe Breve x 1+-').click();
  await expect(page.getByRole('button', { name: 'Add one Cafe Breve' })).toBeVisible();
  await page.getByRole('button', { name: 'Add one Cafe Breve' }).click();

  await expect(page.getByRole('link', { name: 'Cart page' })).toBeVisible();
});
