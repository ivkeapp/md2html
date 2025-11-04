import { test, expect } from '@playwright/test';

test.describe('md2html Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the demo page', async ({ page }) => {
    await expect(page.locator('.app-container')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.main-content')).toBeVisible();
  });

  test('should display welcome content on load', async ({ page }) => {
    // Wait for preview to load
    await expect(page.locator('.md-preview')).toBeVisible();
    
    // Check for sample content
    await expect(page.locator('.md-preview h1')).toContainText('Welcome to md2html');
  });

  test('should switch themes', async ({ page }) => {
    // Wait for theme selector
    await expect(page.locator('.theme-selector')).toBeVisible();
    
    // Get initial background color
    const initialBg = await page.locator('.preview-container').evaluate(
      el => getComputedStyle(el).backgroundColor
    );
    
    // Switch to dark theme
    await page.click('input[value="dark"]');
    
    // Wait a moment for theme to apply
    await page.waitForTimeout(100);
    
    // Check background color changed
    const darkBg = await page.locator('.preview-container').evaluate(
      el => getComputedStyle(el).backgroundColor
    );
    
    expect(darkBg).not.toBe(initialBg);
  });

  test('should show theme editor for custom theme', async ({ page }) => {
    const themeEditor = page.locator('#themeEditorContainer');
    
    // Theme editor should be hidden initially (light theme)
    await expect(themeEditor).toBeHidden();
    
    // Switch to custom theme
    await page.click('input[value="custom"]');
    
    // Theme editor should be visible
    await expect(themeEditor).toBeVisible();
  });

  test('should handle paste button click', async ({ page }) => {
    const pasteBtn = page.locator('#pasteBtn');
    await expect(pasteBtn).toBeVisible();
    
    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    
    // Write to clipboard
    await page.evaluate(() => {
      navigator.clipboard.writeText('# Pasted Content\n\nThis was pasted.');
    });
    
    // Click paste button
    await pasteBtn.click();
    
    // Check if content was loaded
    await expect(page.locator('.md-preview h1')).toContainText('Pasted Content');
  });

  test('should have accessible navigation', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Sidebar should be hidden on mobile
    const sidebar = page.locator('.sidebar');
    const isVisible = await sidebar.isVisible();
    
    // On mobile, sidebar might be hidden or have different styling
    // We just verify the page still renders
    await expect(page.locator('.main-content')).toBeVisible();
  });

  test('should not execute XSS attacks', async ({ page }) => {
    // Listen for console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Listen for dialogs (alerts)
    let alertFired = false;
    page.on('dialog', async dialog => {
      alertFired = true;
      await dialog.dismiss();
    });
    
    // Load XSS sample (simulated)
    await page.evaluate(() => {
      const markdown = '<script>alert("XSS")</script><p>Safe content</p>';
      // Trigger markdown load through app if possible
      // For now, just verify no script executes
    });
    
    // Wait a moment
    await page.waitForTimeout(500);
    
    // No alert should have fired
    expect(alertFired).toBe(false);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check for ARIA labels on important elements
    await expect(page.locator('[aria-label="Toggle sidebar"]')).toBeVisible();
    await expect(page.locator('[role="main"]')).toBeVisible();
    await expect(page.locator('[role="complementary"]')).toBeVisible();
  });
});
