import { test, expect } from '@playwright/test';

test.describe('Idea Generation Flow', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1:has-text("Next Business Idea")')).toBeVisible();
  });

  test('should fill form and generate ideas', async ({ page }) => {
    await page.goto('/');

    // Fill form
    await page.fill('input[placeholder*="City"]', 'Austin');
    await page.fill('input[placeholder*="State"]', 'TX');
    await page.fill('input[placeholder*="interests"]', 'marketing, technology');
    await page.selectOption('select:nth-of-type(1)', 'MEDIUM');
    await page.fill('input[type="number"]', '20');
    await page.selectOption('select:nth-of-type(2)', 'DIGITAL');
    await page.selectOption('select:nth-of-type(3)', 'MEDIUM');

    // Click generate
    await page.click('button:has-text("Generate Ideas")');

    // Wait for ideas to load
    await expect(page.locator('text=Generated Ideas')).toBeVisible({ timeout: 5000 });

    // Verify ideas are displayed
    const ideaCards = page.locator('[class*="IdeaCard"], div:has-text("Social Media")');
    const count = await ideaCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display scoring breakdown', async ({ page }) => {
    await page.goto('/');

    // Generate ideas
    await page.fill('input[placeholder*="interests"]', 'marketing');
    await page.click('button:has-text("Generate Ideas")');
    await page.waitForSelector('text=Generated Ideas');

    // Check for score box
    const scoreBox = page.locator('text=/Overall/').first();
    await expect(scoreBox).toBeVisible();
  });
});

test.describe('Saved Ideas', () => {
  test('should load saved ideas section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Saved Ideas')).toBeVisible();
  });

  test('should have load saved ideas button', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button:has-text("Load Saved Ideas")');
    await expect(button).toBeVisible();
  });
});
