# Installation Guide

## NPM Package

The easiest way to use md2html in your project is via NPM:

```bash
npm install md2html-themes
```

Or with yarn:

```bash
yarn add md2html-themes
```

Or with pnpm:

```bash
pnpm add md2html-themes
```

## Package Information

- **Package Name:** `md2html-themes`
- **NPM Registry:** https://www.npmjs.com/package/md2html-themes
- **Version:** Check NPM for latest version
- **License:** GNU General Public License
- **Repository:** https://github.com/ivkeapp/md2html

## Requirements

- **Node.js:** 14.x or higher
- **Browser:** Modern browsers with ES Module support
  - Chrome/Edge 90+
  - Firefox 88+
  - Safari 14+
  - Modern mobile browsers

## Installation Methods

### 1. NPM (Recommended)

For Node.js projects or bundlers (Webpack, Vite, Rollup, etc.):

```bash
npm install md2html-themes
```

### 2. CDN

For quick prototyping or simple HTML pages (no build step required):

#### Using unpkg:
```html
<!DOCTYPE html>
<html>
<head>
  <title>md2html Example</title>
</head>
<body>
  <div id="output"></div>
  
  <!-- Load from CDN -->
  <script src="https://unpkg.com/md2html-themes@latest/dist/md2html.min.js"></script>
  
  <script>
    // md2html is available as a global variable
    (async () => {
      const result = await md2html.parse('# Hello World');
      document.getElementById('output').innerHTML = result.html;
      md2html.applyTheme(md2html.themes.light);
    })();
  </script>
</body>
</html>
```

#### Using jsDelivr:
```html
<script src="https://cdn.jsdelivr.net/npm/md2html-themes@latest/dist/md2html.min.js"></script>
```

### 3. Download and Self-Host

1. Download the latest release from [GitHub Releases](https://github.com/ivkeapp/md2html/releases)
2. Extract the files
3. Copy the `dist` folder to your project
4. Import from your local path:

```html
<script type="module">
  import md2html from './dist/md2html.min.js';
</script>
```

## Verify Installation

After installation, verify it works:

### Node.js/Bundler:
```javascript
import md2html from 'md2html-themes';

console.log('md2html loaded:', typeof md2html.parse);
// Should output: md2html loaded: function
```

### Browser Console (with CDN):
```javascript
// After loading the script tag, md2html is available globally
console.log('md2html loaded:', typeof md2html.parse);
// Should output: md2html loaded: function
```

## Dependencies

md2html-themes has minimal runtime dependencies:

- **marked** (^11.1.0) - Markdown parsing engine
- **marked-gfm-heading-id** (^3.1.3) - GitHub Flavored Markdown heading IDs
- **dompurify** (^3.0.7) - XSS sanitization

These are automatically installed with the package.

## Bundle Size

- **Minified:** ~79 KB
- **Gzipped:** ~31 KB
- **Dependencies included:** ~95 KB total

Optimized for performance with tree-shaking support in modern bundlers.

## TypeScript Support

Type definitions are included in the package:

```typescript
import md2html from 'md2html-themes';

// TypeScript will provide autocompletion and type checking
const result = await md2html.parse('# Hello World');
```

Type definitions location: `dist/index.d.ts` (automatically resolved by TypeScript)

## Next Steps

- See [USAGE.md](./USAGE.md) for usage examples
- Check [API.md](./API.md) for complete API reference
- Explore [THEME_SCHEMA.md](./THEME_SCHEMA.md) for theme customization

## Troubleshooting

### Import Errors

**Problem:** `Cannot find module 'md2html-themes'`

**Solution:** Make sure the package is installed:
```bash
npm list md2html-themes
```

If not found, reinstall:
```bash
npm install md2html-themes
```

### Browser Module Errors

**Problem:** `Uncaught SyntaxError: Cannot use import statement outside a module`

**Solution:** Make sure your script tag has `type="module"`:
```html
<script type="module">
  import md2html from 'md2html-themes';
</script>
```

### Version Conflicts

**Problem:** Multiple versions installed

**Solution:** Check and dedupe:
```bash
npm ls md2html-themes
npm dedupe
```

### Build Tool Configuration

#### Vite
No special configuration needed. Vite handles ES modules natively.

#### Webpack
Make sure you have `resolve.extensions` configured:
```javascript
module.exports = {
  resolve: {
    extensions: ['.js', '.json']
  }
};
```

#### Rollup
Add node-resolve plugin:
```javascript
import resolve from '@rollup/plugin-node-resolve';

export default {
  plugins: [resolve()]
};
```

## Support

If you encounter installation issues:

1. Check [GitHub Issues](https://github.com/ivkeapp/md2html/issues)
2. Review [NPM package page](https://www.npmjs.com/package/md2html-themes)
3. Open a new issue with:
   - Node.js version (`node --version`)
   - NPM version (`npm --version`)
   - Operating system
   - Error messages
