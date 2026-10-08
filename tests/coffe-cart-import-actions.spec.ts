import { test, expect } from '@playwright/test';
import { addCoffee, chechOutAction, fillPaymentForm, addMoreCappucchino, removeAllCoffee } from './page-actions.spec'

test('valid placing an order', async ({ page }) => {
  const espresso = 'Espresso'
  const cappuccino = 'Cappuccino'
  const name = 'test'
  const email = 'test@email.com'

  await page.goto('https://coffee-cart.app/');

  await addCoffee(page, espresso);
  await addCoffee(page, cappuccino);
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (2)');
  await chechOutAction(page);

  await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
  await fillPaymentForm(page, name, email)
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});

test('validate cart functionality', async ({ page }) => {
  const coffee = 'Cappuccino'

  await page.goto('https://coffee-cart.app/');

  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (0)');
  await addCoffee(page, coffee)
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (1)');

  await addMoreCappucchino(page);
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (2)');

  await removeAllCoffee(page, coffee)
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});
