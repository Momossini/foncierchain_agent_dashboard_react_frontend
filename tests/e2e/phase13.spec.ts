import { test, expect } from '@playwright/test';

test.describe('Phase 13: Design & Styling Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the current user as an AGENT
    await page.addInitScript(() => {
      window.localStorage.setItem('token', 'mock-agent-token');
    });

    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'agent-id',
            firstname: 'John',
            lastname: 'Agent',
            email: 'agent@example.com',
            role: 'AGENT',
            isActive: true,
          },
        }),
      });
    });

    await page.route('**/api/parcels', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              id: 'parcel-1',
              uid: 'PARCEL-001',
              commune: 'Paris',
              section: 'A',
              number: '123',
              surface: 500,
              owner: 'Alice Smith',
              status: 'ACTIVE',
            }
          ],
        }),
      });
    });

    await page.goto('/dashboard');
  });

  test('Desktop Layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Sidebar should be visible
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // Hamburger should be hidden
    const hamburger = page.locator('button:has(svg.lucide-menu)');
    await expect(hamburger).not.toBeVisible();

    await page.screenshot({ path: 'verification/phase13_desktop.png' });
  });

  test('Mobile Layout & Navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const sidebar = page.locator('aside');
    // Wait for the side bar to be in its initial mobile state (hidden)
    // We can't easily check x < 0 without bounding box, but we can check the class
    await expect(sidebar).toHaveClass(/ -translate-x-full/);

    // Hamburger should be visible
    const hamburger = page.locator('button:has(svg.lucide-menu)');
    await expect(hamburger).toBeVisible();

    // Click hamburger
    await hamburger.click();

    // Sidebar should have translate-x-0 class
    await expect(sidebar).toHaveClass(/ translate-x-0/);

    await page.screenshot({ path: 'verification/phase13_mobile_open.png' });

    // Click close button
    const closeBtn = page.locator('button:has(svg.lucide-x)');
    await closeBtn.click();

    // Sidebar should be hidden again
    await expect(sidebar).toHaveClass(/ -translate-x-full/);
  });

  test('UI Styling: Brand Colors and Cards', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Check card style on dashboard
    const card = page.locator('.card').first();
    await expect(card).toBeVisible();

    // Check primary button style on parcels list
    await page.goto('/parcels');
    const createBtn = page.locator('a:has-text("Nouvelle parcelle")');
    await expect(createBtn).toBeVisible();

    // Verify it has brand color (computed value)
    const bgColor = await createBtn.evaluate(el => window.getComputedStyle(el).backgroundColor);
    // rgb(37, 99, 235) is #2563eb
    expect(bgColor).toBe('rgb(37, 99, 235)');

    await page.screenshot({ path: 'verification/phase13_styles.png' });
  });
});
