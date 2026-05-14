import { test, expect } from '@playwright/test';

test.describe('Role Based Access Control', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the current user as a VIEWER
    await page.addInitScript(() => {
      window.localStorage.setItem('token', 'mock-viewer-token');
    });

    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'viewer-id',
            firstname: 'John',
            lastname: 'Viewer',
            email: 'viewer@example.com',
            role: 'VIEWER',
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
            data: [],
          }),
        });
      });
  });

  test('VIEWER should not see "Nouvelle parcelle" button on list page', async ({ page }) => {
    await page.goto('/parcels');
    await expect(page.getByRole('heading', { name: 'Registre des Parcelles' })).toBeVisible();
    await expect(page.getByText('Nouvelle parcelle')).not.toBeVisible();
  });

  test('VIEWER should be redirected to 403 when trying to access /parcels/new', async ({ page }) => {
    await page.goto('/parcels/new');
    // Wait for the redirect to happen. RoleGuard uses Navigate which is fast.
    await page.waitForURL('**/403');
    await expect(page.url()).toContain('/403');
    await expect(page.getByText('Accès Interdit')).toBeVisible();
  });

  test('VIEWER should not see "Créer une parcelle" shortcut on dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'Tableau de bord' })).toBeVisible();
    await expect(page.getByText('Créer une parcelle')).not.toBeVisible();
  });
});
