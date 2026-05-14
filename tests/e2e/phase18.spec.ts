import { test, expect } from '@playwright/test';

test.describe('Phase 18: Parcel UID and Owner ID Refactoring', () => {
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
            role: 'AGENT',
            isActive: true,
          },
        }),
      });
    });

    await page.route('**/api/parcels', async (route) => {
        if (route.request().method() === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                  success: true,
                  data: [
                    { id: '1', parcelUid: 'BZV-001-2025', city: 'Brazzaville' }
                  ],
                }),
              });
        }
    });

    await page.goto('/parcels/new');
  });

  test('Automatic UID Generation', async ({ page }) => {
    const currentYear = new Date().getFullYear();
    // Select city
    await page.selectOption('select[name="city"]', 'Brazzaville');

    // Check UID field is readonly and has correct value
    // Since mock data has BZV-001-2025, if current year is 2025, it should be 002.
    // If current year is 2026, it should be 001 because filter is by city AND year.
    const uidInput = page.locator('input[name="parcelUid"]');
    if (currentYear === 2025) {
        await expect(uidInput).toHaveValue('BZV-002-2025');
    } else {
        await expect(uidInput).toHaveValue(`BZV-001-${currentYear}`);
    }
    await expect(uidInput).toHaveAttribute('readonly', '');
  });

  test('Structured Owner ID in Creation', async ({ page }) => {
    await page.selectOption('select[name="city"]', 'Brazzaville');
    await page.fill('input[name="address"]', '123 Test St');
    await page.fill('input[name="district"]', 'Test District');
    await page.fill('input[name="currentOwnerName"]', 'John Doe');

    // Select ID Type and fill number
    await page.selectOption('select[name="ownerIdType"]', 'PSP');
    await page.fill('input[name="ownerIdNumber"]', 'PASSPORT123');

    // Intercept create request
    let capturedData: any;
    await page.route('**/api/parcels', async (route) => {
        if (route.request().method() === 'POST') {
            capturedData = route.request().postDataJSON();
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, data: { id: 'new-id' } }),
            });
        }
    });

    await page.click('button[type="submit"]');

    expect(capturedData.currentOwnerIdentifier).toBe('PSP-PASSPORT123');
  });

  test('Structured Owner ID in Transfer', async ({ page }) => {
    // Mock parcel for detail/transfer
    await page.route('**/api/parcels/p-123', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              success: true,
              data: {
                id: 'p-123',
                parcelUid: 'BZV-001-2025',
                currentOwnerName: 'Old Owner',
                currentOwnerIdentifier: 'CNI-11111',
                status: 'ACTIVE'
              },
            }),
          });
    });

    await page.goto('/parcels/p-123/transfer');

    await page.fill('input[name="newOwnerName"]', 'New Owner');
    await page.selectOption('select[name="ownerIdType"]', 'PSP');
    await page.fill('input[name="ownerIdNumber"]', 'NEW-PSP-222');

    let capturedData: any;
    await page.route('**/api/parcels/p-123/transfer', async (route) => {
        capturedData = route.request().postDataJSON();
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: true, data: { id: 'p-123' } }),
        });
    });

    await page.click('button[type="submit"]');
    expect(capturedData.newOwnerIdentifier).toBe('PSP-NEW-PSP-222');
  });
});
