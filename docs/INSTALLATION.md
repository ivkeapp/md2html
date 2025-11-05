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

## Understanding ES Modules and Development Setup

### Why You Need a Development Server

**md2html-themes** uses ES modules (`import`/`export` syntax) for modern JavaScript development. When using ES modules in the browser, you **cannot** simply open HTML files directly (`file://` protocol) due to browser security restrictions (CORS policy).

**You must run a local development server** that serves files over HTTP (`http://localhost`).

### Why We Recommend Vite

**Vite** is the modern, fast build tool that provides:

1. **Instant Server Start** - No bundling in development
2. **Lightning Fast HMR** - Hot Module Replacement (changes update instantly)
3. **Native ES Modules** - Works with `import` statements without configuration
4. **Built-in Optimizations** - Production builds are automatically optimized
5. **Zero Config** - Works out of the box with ES modules

**Alternative Options:**
- `http-server` - Simple static file server (no HMR)
- `serve` - Basic Node.js server (no HMR)
- Python's built-in server - Cross-platform but slower
- VS Code Live Server extension - Good for simple projects

**Vite is recommended** because it's specifically designed for modern ES module projects and provides the best development experience.

## Quick Start After Installation

### Complete Working Example

Here's a **complete, ready-to-use setup** that you can copy and run:

#### 1. Create Project Structure

```bash
mkdir my-md2html-project
cd my-md2html-project
npm init -y
npm install md2html-themes
npm install --save-dev vite
```

#### 2. Update package.json

**package.json:**
```json
{
  "name": "my-md2html-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "md2html-themes": "^1.1.1"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**Key points:**
- `"type": "module"` - Enables ES module support in Node.js
- `"dev": "vite"` - Runs development server with HMR
- `"build": "vite build"` - Creates optimized production bundle
- `vite` is a **devDependency** - Only needed during development

#### 3. Create HTML File

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>md2html Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        #output {
            border: 1px solid #ccc;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        button {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <h1>md2html Package Test</h1>
    
    <button id="convert">Convert Markdown</button>
    <button id="theme-light">Light Theme</button>
    <button id="theme-dark">Dark Theme</button>
    
    <div id="output"></div>
    
    <!-- IMPORTANT: Use type="module" for ES modules -->
    <script type="module" src="index.js"></script>
</body>
</html>
```

#### 4. Create JavaScript File

**index.js:**
```javascript
// Import the package
import md2html from 'md2html-themes';

console.log('md2html package loaded:', md2html);

// Test markdown content
const testMarkdown = `# Hello World

This is a **test** of the *md2html-themes* package.

## Features:
- Markdown parsing
- Theme support
- Easy to use

\`\`\`javascript
console.log('Hello from md2html!');
\`\`\`

> This is a blockquote

| Feature | Status |
|---------|--------|
| Working | ✅ |
`;

// Convert button
document.getElementById('convert').addEventListener('click', async () => {
    try {
        console.log('Converting markdown...');
        const result = await md2html.parse(testMarkdown);
        const output = document.getElementById('output');
        output.innerHTML = result.html;
        console.log('Conversion successful!', result);
    } catch (error) {
        console.error('Conversion failed:', error);
    }
});

// Light theme button
document.getElementById('theme-light').addEventListener('click', () => {
    try {
        const output = document.getElementById('output');
        // Use the new applyThemeWithStyles for automatic CSS injection
        md2html.applyThemeWithStyles(md2html.themes.light, output);
        console.log('Light theme applied with CSS');
    } catch (error) {
        console.error('Theme application failed:', error);
    }
});

// Dark theme button
document.getElementById('theme-dark').addEventListener('click', () => {
    try {
        const output = document.getElementById('output');
        // Use the new applyThemeWithStyles for automatic CSS injection
        md2html.applyThemeWithStyles(md2html.themes.dark, output);
        console.log('Dark theme applied with CSS');
    } catch (error) {
        console.error('Theme application failed:', error);
    }
});

// Auto-convert on page load
window.addEventListener('load', () => {
    console.log('Page loaded, auto-converting...');
    document.getElementById('convert').click();
    
    setTimeout(() => {
        document.getElementById('theme-light').click();
    }, 500);
});
```

#### 5. Run Development Server

```bash
npm run dev
```

**What happens:**
1. Vite starts a development server (usually at `http://localhost:5173`)
2. Browser opens automatically
3. Any code changes trigger instant updates (HMR)
4. Console shows logs and errors

#### 6. Open in Browser

Vite will show the URL in the terminal:
```
VITE v5.x.x  ready in 300 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open `http://localhost:5173` in your browser.

### Production Build

When ready to deploy:

```bash
npm run build
```

This creates an optimized `dist/` folder with:
- Minified JavaScript
- Optimized assets
- Production-ready HTML

Deploy the `dist/` folder to any static hosting (Netlify, Vercel, GitHub Pages, etc.)

## Troubleshooting

### CORS Errors

**Problem:** `Access to script at 'file://...' blocked by CORS policy`

**Solution:** You must run a local development server. Cannot open HTML files directly in the browser when using ES modules.

```bash
npx vite
```

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
