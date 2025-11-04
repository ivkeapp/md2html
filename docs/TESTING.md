# Testing

## Overview

md2html uses a multi-layered testing strategy:

1. **Unit tests** - Test individual functions and modules
2. **Integration tests** - Test component interactions
3. **E2E tests** - Test complete user workflows
4. **Manual tests** - Verify visual and UX aspects

## Unit Tests

### Test Runner

We use **Vitest** for unit testing. Vitest is fast, has Jest-compatible API, and works seamlessly with ES modules.

### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run with watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test parser.test.js
```

### Test Structure

Unit tests are located in `tests/unit/` and follow this naming convention:
- `[module-name].test.js`

Example test file structure:

```javascript
import { describe, it, expect } from 'vitest';
import { parseMarkdown } from '../../src/parser.js';

describe('parseMarkdown', () => {
  it('should parse headings correctly', async () => {
    const result = await parseMarkdown('# Hello World');
    expect(result.html).toContain('<h1');
    expect(result.html).toContain('Hello World');
  });
  
  it('should extract frontmatter', async () => {
    const md = `---
title: Test
---
Content`;
    const result = await parseMarkdown(md);
    expect(result.metadata).toEqual({ title: 'Test' });
  });
});
```

### Test Coverage Goals

- Parser: 90%+ coverage
- Sanitizer: 95%+ coverage (security critical)
- Theme engine: 85%+ coverage
- Public API: 90%+ coverage

### What to Test

#### Parser Tests
- Headings (h1-h4)
- Paragraphs and line breaks
- Emphasis (bold, italic, strikethrough)
- Links and images
- Lists (ordered, unordered, nested)
- Task lists
- Tables (alignment, missing cells)
- Code blocks (fenced, inline)
- Blockquotes
- Horizontal rules
- Frontmatter extraction

#### Sanitizer Tests
- Script tag removal
- Event handler stripping (`onclick`, etc.)
- JavaScript protocol removal
- Iframe/object/embed blocking
- Allowed tags preservation
- Attribute whitelisting

#### Theme Tests
- Theme cloning (deep copy)
- Theme merging
- CSS variable generation
- Theme validation
- Export/import round-trip

## Integration Tests

Integration tests verify that components work together correctly.

### Example Integration Test

```javascript
describe('Markdown to HTML workflow', () => {
  it('should parse, sanitize, and theme HTML', async () => {
    const markdown = '# Test\n\n<script>alert(1)</script>';
    
    // Parse with sanitization
    const result = await md2html.parse(markdown);
    
    // Verify script was removed
    expect(result.html).not.toContain('script');
    expect(result.html).toContain('<h1');
    
    // Generate full HTML with theme
    const fullHtml = md2html.toFullHtml(
      result.html,
      md2html.themes.dark
    );
    
    expect(fullHtml).toContain('<!DOCTYPE html>');
    expect(fullHtml).toContain('color-background');
  });
});
```

## E2E Tests

### Test Runner

We use **Playwright** for end-to-end testing. Playwright provides reliable cross-browser testing with excellent debugging tools.

### Running E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run in specific browser
npm run test:e2e -- --project=chromium

# Debug mode
npm run test:e2e -- --debug
```

### E2E Test Structure

E2E tests are in `tests/e2e/` and test complete user workflows:

```javascript
import { test, expect } from '@playwright/test';

test('load markdown file and change theme', async ({ page }) => {
  // Navigate to app
  await page.goto('/');
  
  // Wait for app to load
  await expect(page.locator('.app-container')).toBeVisible();
  
  // Load sample markdown
  const markdown = '# Test Heading\n\nThis is a paragraph.';
  await page.evaluate((md) => {
    // Simulate file load via internal API
    window.testAPI.loadMarkdown(md);
  }, markdown);
  
  // Verify preview renders
  await expect(page.locator('.md-preview h1')).toHaveText('Test Heading');
  
  // Change theme to dark
  await page.click('input[value="dark"]');
  
  // Verify theme applied
  const bgColor = await page.locator('.preview-container')
    .evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bgColor).toBe('rgb(15, 23, 42)'); // dark background
  
  // Download HTML
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#downloadHtmlBtn')
  ]);
  
  expect(download.suggestedFilename()).toMatch(/\.html$/);
});
```

### E2E Test Scenarios

1. **File Upload Flow**
   - Drag and drop .md file
   - Click to upload
   - Verify preview renders

2. **Theme Switching**
   - Switch between light/dark
   - Edit custom theme
   - Verify live updates

3. **Export Functionality**
   - Download HTML
   - Verify file contents
   - Check inline styles

4. **XSS Protection**
   - Load file with malicious content
   - Verify scripts don't execute
   - Check sanitized output

5. **Responsive Layout**
   - Test mobile viewport
   - Verify sidebar toggle
   - Check touch interactions

## Manual Test Cases

See `MANUAL_TEST_CASES.md` for comprehensive manual testing checklist.

## Continuous Integration

### GitHub Actions Workflow

`.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run unit tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Test Data

Sample markdown files for testing are in `samples/`:
- `sample-article.md` - Complete article with all features
- `sample-tables.md` - Complex table scenarios
- `sample-code.md` - Code blocks with various languages
- `sample-xss.md` - XSS attack vectors

## Writing Good Tests

### Unit Test Best Practices

1. **One assertion per test** (when possible)
2. **Use descriptive test names**: `it('should parse nested lists correctly')`
3. **Test edge cases**: empty input, very long input, special characters
4. **Mock external dependencies**: file system, network calls
5. **Keep tests fast**: < 100ms per unit test

### E2E Test Best Practices

1. **Test user workflows, not implementation**
2. **Use data-testid attributes** for stable selectors
3. **Wait for async operations** properly
4. **Take screenshots on failure**
5. **Test critical paths first**

## Debugging Tests

### Vitest Debugging

```bash
# Run single test
npm test -- -t "should parse headings"

# Run in watch mode with UI
npm test -- --ui

# Show console output
npm test -- --reporter=verbose
```

### Playwright Debugging

```bash
# Debug mode (pauses execution)
npm run test:e2e -- --debug

# Headed mode (see browser)
npm run test:e2e -- --headed

# Trace viewer
npx playwright show-trace trace.zip
```

## Performance Testing

While not automated, consider testing:
- Parse time for large documents (> 10MB)
- Theme switching performance
- Memory usage with multiple previews
- Bundle size impact of dependencies

## Accessibility Testing

Use tools to verify:
- Keyboard navigation works
- Screen reader compatibility
- Color contrast ratios (WCAG AA)
- Focus indicators visible
- ARIA labels present

Recommended tools:
- axe DevTools
- Lighthouse
- NVDA/JAWS screen readers
