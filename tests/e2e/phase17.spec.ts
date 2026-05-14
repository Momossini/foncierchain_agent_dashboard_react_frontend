import { test, expect } from '@playwright/test';

test.describe('Phase 17: UI/UX Refinement Verification', () => {
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

    await page.goto('/dashboard');
  });

  test('Sidebar Hierarchical Structure', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Check group labels
    await expect(page.getByText('OPÉRATIONS')).toBeVisible();
    await expect(page.getByText('CONTRÔLE')).toBeVisible();

    // Check Parent item
    const parentItem = page.getByRole('button', { name: 'Gestion des Titres' });
    await expect(parentItem).toBeVisible();

    // Check Children visibility after clicking parent
    await parentItem.click();
    await expect(page.getByText('Registre complet')).toBeVisible();
    await expect(page.getByText('Nouvel enregistrement')).toBeVisible();

    await page.screenshot({ path: 'verification/phase17_sidebar_expanded.png' });
  });

  test('Topbar Institutional Look', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Check Breadcrumbs
    await expect(page.locator('nav').filter({ hasText: 'Accueil' })).toBeVisible();

    // Navigate to a subpage to see breadcrumbs evolution
    await page.goto('/parcels');
    // Use first() to avoid strict mode violation if there are multiple matches
    await expect(page.getByText('Registre des parcelles').first()).toBeVisible();

    // Check Search bar
    await expect(page.getByPlaceholder('Rechercher un titre, un propriétaire...')).toBeVisible();

    // Check User Profile Area
    await expect(page.getByText('John Agent')).toBeVisible();
    await expect(page.getByText('AGENT').first()).toBeVisible();

    await page.screenshot({ path: 'verification/phase17_topbar_breadcrumbs.png' });
  });

  test('Responsive Mobile Navigation Overlay', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const sidebar = page.locator('aside');
    await expect(sidebar).toHaveClass(/ -translate-x-full/);

    const hamburger = page.locator('button[aria-label="Ouvrir le menu"]');
    await hamburger.click();

    await expect(sidebar).toHaveClass(/ translate-x-0/);

    // Check overlay
    const overlay = page.locator('.backdrop-blur-sm');
    await expect(overlay).toBeVisible();

    await page.screenshot({ path: 'verification/phase17_mobile_overlay.png' });
  });
});
