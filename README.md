# E2E Tests

End-to-end tests for the [Coffee Cart](https://coffee-cart.app/) demo app, written with [Playwright](https://playwright.dev/).

## Structure

- [coffee-cart.spec.ts](coffee-cart.spec.ts) — covers the checkout flow, payment form validation, promo logic, cart management, and the "fast menu" add-to-cart flow.

## Prerequisites

Install dependencies and the Playwright browser binaries:

```bash
npm install
npx playwright install
```

## Running the tests

Run the full suite (Chromium, Firefox, and WebKit, as configured in [playwright.config.ts](../playwright.config.ts)):

```bash
npx playwright test
```

Run a single browser:

```bash
npx playwright test --project=chromium
```

Run a specific file or test by name:

```bash
npx playwright test tests/coffee-cart.spec.ts
npx playwright test -g "validate cart functionality"
```

Run with the UI mode for interactive debugging:

```bash
npx playwright test --ui
```

Run headed (visible browser):

```bash
npx playwright test --headed
```

## Viewing reports

After a run, an HTML report is generated. Open it with:

```bash
npx playwright show-report
```

## Notes

- Tests run against the live `https://coffee-cart.app/` site — no local dev server or `baseURL` is configured.
- Tests run fully in parallel locally; on CI, retries are enabled and parallelism is disabled (see [playwright.config.ts](../playwright.config.ts)).
- Traces are captured on first retry and can be inspected via `npx playwright show-trace <trace.zip>`.
