import { test, expect } from '@playwright/test';

const baseURL = 'https://coffee-cart.app/'

test('valid placing an order', async ({ page }) => {
  const cartButton = page.getByRole('link', { name: 'Cart page' })
  const selectEspresso = page.locator('[data-test="Espresso"]')
  const selectCappucchino = page.locator('[data-test="Cappuccino"]')
  const totalSumButton = page.locator('[data-test="checkout"]')
  const paymentTitle = page.getByRole('heading', { name: 'Payment details' })
  const nameInput = page.getByRole('textbox', { name: 'Name' })
  const emailInput = page.getByRole('textbox', { name: 'Email' })
  const submitButton = page.getByRole('button', { name: 'Submit' })
  const successfulPurchaseTitle = page.getByRole('button', { name: 'Thanks for your purchase.' })

  await page.goto(baseURL);
  
  await selectEspresso.click();
  await expect(cartButton).toContainText('cart (1)');
  await selectCappucchino.click();
  await expect(cartButton).toContainText('cart (2)');
  await totalSumButton.click();

  await expect(paymentTitle).toBeVisible();
  await expect(nameInput).toBeVisible();
  await nameInput.fill('test');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('test@email.com');
  await submitButton.click();
  await expect(successfulPurchaseTitle).toBeVisible();
});

test('validate errors on payment form', async ({ page }) => {
  const selectEspresso = page.locator('[data-test="Espresso"]')
  const totalSumButton = page.locator('[data-test="checkout"]')
  const paymentTitle = page.getByRole('heading', { name: 'Payment details' })
  const nameInput = page.getByRole('textbox', { name: 'Name' })
  const emailInput = page.getByRole('textbox', { name: 'Email' })
  const submitButton = page.getByRole('button', { name: 'Submit' })
  const promotionMessage = page.getByLabel('Promotion message')

  await page.goto(baseURL);
  await selectEspresso.click();
  await totalSumButton.click();

  await expect(paymentTitle).toBeVisible();
  await nameInput.fill('test');
  await emailInput.fill('test.com');
  await submitButton.click();
  await expect(promotionMessage).toBeVisible();
});

test('validate promo after selecting 3 cup', async ({ page }) => {
  const selectEspresso = page.locator('[data-test="Espresso"]')
  const selectEspressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]')
  const cartButton = page.getByRole('link', { name: 'Cart page' })
  const selectCappucchino = page.locator('[data-test="Cappuccino"]')
  const promotionMessage = page.getByText('It\'s your lucky day! Get an')
  const yesButton = page.getByRole('button', { name: 'Yes, of course!' })

  await page.goto(baseURL);
  await selectEspresso.click();
  await selectEspressoMacchiato.click();
  await expect(cartButton).toContainText('cart (2)');
  await selectCappucchino.click();
  await expect(promotionMessage).toBeVisible();
  await yesButton.click();
  await expect(cartButton).toContainText('cart (4)');
});

test('validate cart functionality', async ({ page }) => {
  const cartButton = page.getByRole('link', { name: 'Cart page' })
  const selectCappucchino = page.locator('[data-test="Cappuccino"]')
  const addMoreCappucchino = page.getByRole('button', { name: 'Add one Cappuccino' })
  const removeAllCoffee = page.getByRole('button', { name: 'Remove all Cappuccino' })
  const emptyStateMessageCart = page.getByText('No coffee, go add some.')

  await page.goto(baseURL);

  await expect(cartButton).toContainText('cart (0)');
  await selectCappucchino.click();
  await expect(cartButton).toContainText('cart (1)');

  await cartButton.click();
  await addMoreCappucchino.click();
  await expect(cartButton).toContainText('cart (2)');

  await removeAllCoffee.click();
  await expect(emptyStateMessageCart).toBeVisible();
});

test('add more coffee by fast menu', async ({ page }) => {
  const selectCafeBreve = page.locator('[data-test="Cafe_Breve"]')
  const totalSumButton = page.locator('[data-test="checkout"]')
  const cartPreviewItem = page.getByRole('button', { name: 'Add one Cafe Breve' })
  const cartButton = page.getByRole('link', { name: 'Cart page' })

  await page.goto(baseURL);

  await expect(selectCafeBreve).toBeVisible();
  await selectCafeBreve.click();

  await expect(totalSumButton).toBeVisible();
  await totalSumButton.hover();

  await expect(page.getByText('Cafe Breve x 1+-')).toBeVisible();
  await page.getByText('Cafe Breve x 1+-').click();
  await expect(cartPreviewItem).toBeVisible();
  await cartPreviewItem.click();

  await expect(cartButton).toBeVisible();
});
