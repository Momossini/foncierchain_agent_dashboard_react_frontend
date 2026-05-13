import { test, expect } from '@playwright/test';

test.describe('Phase 14: Demo Scenario', () => {
  test('Complete Business Workflow', async ({ page }) => {
    // 1. Login Agent
    await page.goto('/login');

    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { token: 'demo-token', user: { id: 'agent-1', role: 'AGENT', firstname: 'Demo' } }
        }),
      });
    });

    await page.route('**/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { id: 'agent-1', firstname: 'Demo', lastname: 'Agent', role: 'AGENT', isActive: true }
        }),
      });
    });

    await page.fill('input[name="email"]', 'agent@demo.fr');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');

    // 2. Creation Parcelle
    await page.click('text=Créer une parcelle');
    await expect(page).toHaveURL('/parcels/new');

    await page.fill('input[name="parcelUid"]', 'DEMO-123');
    await page.fill('input[name="address"]', '123 Demo St');
    await page.fill('input[name="city"]', 'DemoCity');
    await page.fill('input[name="district"]', 'DemoDistrict');
    await page.fill('input[name="currentOwnerName"]', 'Original Owner');

    await page.route('**/api/parcels', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
                id: 'p-123',
                parcelUid: 'DEMO-123',
                status: 'ACTIVE',
                currentOwnerName: 'Original Owner',
                address: '123 Demo St',
                city: 'DemoCity',
                district: 'DemoDistrict',
                txHash: '0x123...abc',
                createdAt: new Date().toISOString()
            }
          }),
        });
      }
    });

    await page.click('button[type="submit"]');

    // 3. Confirmation + Preuve Numérique
    await page.route('**/api/parcels/p-123', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
                id: 'p-123',
                parcelUid: 'DEMO-123',
                status: 'ACTIVE',
                currentOwnerName: 'Original Owner',
                address: '123 Demo St',
                city: 'DemoCity',
                district: 'DemoDistrict',
                txHash: '0x123...abc',
                createdAt: new Date().toISOString()
            }
          }),
        });
      });

    await expect(page).toHaveURL(/\/parcels\/p-123/);
    await expect(page.getByText('Preuve numérique')).toBeVisible();
    await expect(page.getByText('0x123...abc')).toBeVisible();

    // 4. Tentative de doublon
    await page.goto('/parcels/new');
    await page.fill('input[name="parcelUid"]', 'DEMO-123');

    await page.route('**/api/parcels', async (route) => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({
              success: false,
              error: { code: 'PARCEL_ALREADY_EXISTS', message: 'Cette parcelle existe déjà' }
            }),
          });
        }
      });

    await page.fill('input[name="address"]', '123 Demo St');
    await page.fill('input[name="city"]', 'DemoCity');
    await page.fill('input[name="district"]', 'DemoDistrict');
    await page.fill('input[name="currentOwnerName"]', 'Duplicate Owner');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Cette parcelle est déjà enregistrée dans le système')).toBeVisible();

    // 5. Transfert de propriété
    await page.goto('/parcels/p-123');
    await page.click('text=Transférer');
    await expect(page).toHaveURL('/parcels/p-123/transfer');

    await page.fill('input[name="newOwnerName"]', 'New Owner');
    await page.fill('input[name="newOwnerIdentifier"]', 'ID-999');

    await page.route('**/api/parcels/p-123/transfer', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
                id: 'p-123',
                parcelUid: 'DEMO-123',
                status: 'TRANSFERRED',
                currentOwnerName: 'New Owner',
                txHash: '0xabc...456'
            }
          }),
        });
      });

    await page.click('button[type="submit"]');

    // 6. Confirmation transfert
    await page.route('**/api/parcels/p-123', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: {
                id: 'p-123',
                parcelUid: 'DEMO-123',
                status: 'TRANSFERRED',
                currentOwnerName: 'New Owner',
                address: '123 Demo St',
                city: 'DemoCity',
                district: 'DemoDistrict',
                txHash: '0xabc...456',
                createdAt: new Date().toISOString()
            }
          }),
        });
      });

    await expect(page).toHaveURL(/\/parcels\/p-123/);
    await expect(page.getByText('Transfert réussi')).toBeVisible();
    await expect(page.getByText('New Owner')).toBeVisible();

    // 7. Vérification historique
    await page.click('text=Historique');
    await expect(page).toHaveURL('/parcels/p-123/history');

    await page.route('**/api/parcels/p-123/history', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: [
                { id: 'h2', actionType: 'TRANSFER', newOwner: 'New Owner', previousOwner: 'Original Owner', createdAt: new Date().toISOString() },
                { id: 'h1', actionType: 'CREATION', newOwner: 'Original Owner', createdAt: new Date().toISOString() }
            ]
          }),
        });
      });

    await expect(page.getByText('TRANSFER')).toBeVisible();
    await expect(page.getByText('CREATION')).toBeVisible();
  });
});
