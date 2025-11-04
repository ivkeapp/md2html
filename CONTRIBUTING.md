# Contributing to md2html

Thank you for your interest in contributing to md2html! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs. actual behavior**
- **Screenshots** (if applicable)
- **Browser and OS information**
- **Console errors** (if any)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Describe the feature** and its use case
- **Explain why it would be useful** to most users
- **Consider implementation complexity**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Make your changes** with clear, commented code
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Run tests**: `npm test`
7. **Run linter**: `npm run lint`
8. **Commit with clear messages**
9. **Push to your fork**
10. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js 18.x or 20.x
- npm 9.x or later
- Git

### Installation

```bash
# Clone your fork
git clone https://github.com/yourusername/md2html.git
cd md2html

# Install dependencies
npm install

# Start development server
npm run start
```

### Project Structure

```
src/
├── index.js          # Public API entry point
├── parser.js         # Markdown parsing logic
├── sanitizer.js      # XSS protection
├── theme.js          # Theme management
├── ui/
│   ├── demo.js      # Demo application
│   └── components/  # Reusable UI components
└── styles/          # CSS files
```

## Coding Standards

### JavaScript Style

- **ES6+ syntax** preferred
- **Async/await** over Promise chains
- **Descriptive variable names**: `markdownContent` not `mc`
- **JSDoc comments** for public functions
- **Small, focused functions** (< 50 lines)

Example:

```javascript
/**
 * Parse markdown to HTML
 * @param {string} markdown - Raw markdown string
 * @param {object} options - Parse options
 * @returns {Promise<{ html: string, metadata: object|null }>}
 */
export async function parse(markdown, options = {}) {
  // Implementation
}
```

### CSS Style

- **BEM methodology** for class names
- **CSS custom properties** for theming
- **Mobile-first** responsive design
- **Descriptive class names**: `.file-drop-zone` not `.fdz`

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add PDF export functionality
fix: resolve XSS vulnerability in code blocks
docs: update API documentation
test: add unit tests for theme merging
refactor: simplify parser logic
style: fix linting errors
chore: update dependencies
```

## Adding Features

### Adding a New Theme

1. **Define theme object** in `src/theme.js`:

```javascript
export const myTheme = {
  name: 'myTheme',
  typography: { /* ... */ },
  colors: { /* ... */ },
  // ... other properties
};
```

2. **Add CSS file** in `src/styles/theme-mytheme.css`

3. **Export theme** in `src/theme.js`:

```javascript
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  myTheme: myTheme
};
```

4. **Add tests** in `tests/unit/theme.test.js`

5. **Update documentation** in `docs/THEME_SCHEMA.md`

### Adding Markdown Features

1. **Check if marked supports it** - most features work out of the box

2. **If custom rendering needed**, extend marked renderer in `src/parser.js`:

```javascript
import { marked } from 'marked';

const renderer = new marked.Renderer();
renderer.listitem = (text) => {
  // Custom list item rendering
  return `<li class="custom-item">${text}</li>`;
};

marked.use({ renderer });
```

3. **Add sanitization rules** in `src/sanitizer.js` if needed

4. **Add tests** in `tests/unit/parser.test.js`

5. **Add sample** in `samples/` directory

6. **Update documentation**

### Adding UI Components

1. **Create component** in `src/ui/components/`:

```javascript
// MyComponent.js
export class MyComponent {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.init();
  }
  
  init() {
    this.render();
    this.attachEvents();
  }
  
  render() {
    // Render logic
  }
  
  attachEvents() {
    // Event handlers
  }
}
```

2. **Import and use** in `src/ui/demo.js`

3. **Add styles** in `src/styles/base.css`

4. **Add tests** (if complex logic)

5. **Update documentation**

## Testing

### Writing Unit Tests

Place tests in `tests/unit/[module].test.js`:

```javascript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../../src/module.js';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
  
  it('should handle edge cases', () => {
    expect(myFunction('')).toBe('');
    expect(myFunction(null)).toBeNull();
  });
});
```

### Writing E2E Tests

Place tests in `tests/e2e/[feature].spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test('feature works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Interact with page
  await page.click('#button');
  
  // Assert result
  await expect(page.locator('#result')).toHaveText('Success');
});
```

### Running Tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Documentation

### Updating Documentation

When adding features, update relevant docs:

- `README.md` - Quick start and overview
- `docs/API.md` - Public API changes
- `docs/USAGE.md` - Usage examples
- `docs/THEME_SCHEMA.md` - Theme properties
- JSDoc comments in code

### Documentation Style

- **Clear and concise** language
- **Code examples** for complex features
- **Links** to related documentation
- **Markdown formatting** for readability

## Release Process

1. **Update version** in `package.json`
2. **Update CHANGELOG.md**
3. **Run full test suite**
4. **Build**: `npm run build`
5. **Test build** manually
6. **Commit**: `git commit -m "chore: release v1.x.x"`
7. **Tag**: `git tag v1.x.x`
8. **Push**: `git push && git push --tags`

## Getting Help

- **Documentation**: Check `/docs` directory
- **Issues**: Search existing issues
- **Discussions**: Ask questions in GitHub Discussions
- **Code**: Read existing code for patterns

## Recognition

Contributors will be recognized in:
- Git commit history
- Release notes
- README contributors section (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to md2html! 🎉
