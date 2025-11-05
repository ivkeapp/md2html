# md2html

A lightweight, dependency-minimal JavaScript library for converting Markdown to themed HTML directly in the browser.

[![NPM Version](https://img.shields.io/npm/v/md2html-themes.svg)](https://www.npmjs.com/package/md2html-themes)
[![NPM Downloads](https://img.shields.io/npm/dm/md2html-themes.svg)](https://www.npmjs.com/package/md2html-themes)
[![CI](https://github.com/ivkeapp/md2html/actions/workflows/publish.yml/badge.svg)](https://github.com/ivkeapp/md2html/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- **GitHub Flavored Markdown** - Full GFM support including tables, task lists, and strikethrough
- **Three Built-in Themes** - Light, dark, and fully customizable themes
- **XSS Protection** - Built-in HTML sanitization with DOMPurify
- **Zero Server Required** - Runs entirely in the browser
- **Lightweight** - Minimal dependencies, optimized bundle size
- **Accessible** - WCAG-compliant UI with keyboard navigation
- **Responsive** - Mobile-friendly interface
- **Fast** - Instant live preview with theme switching

## Quick Start

### Installation

**NPM (Recommended):**
```bash
npm install md2html-themes
npm install --save-dev vite  # Development server (required)
```

**Yarn:**
```bash
yarn add md2html-themes
yarn add --dev vite
```

**CDN (No build tools required):**
```html
<script src="https://unpkg.com/md2html-themes@latest/dist/md2html.min.js"></script>
```

📦 **NPM Package:** [md2html-themes](https://www.npmjs.com/package/md2html-themes)

### Why You Need Vite

This package uses **ES modules** (`import`/`export`). Modern browsers require ES modules to be served over HTTP, not opened directly as files (`file://` protocol).

**Vite provides:**
- ⚡ Instant server start (no bundling in dev)
- 🔥 Hot Module Replacement (instant updates)
- 📦 Zero configuration
- 🚀 Optimized production builds

**Alternative servers:** `http-server`, `serve`, Python's `http.server`, or VS Code Live Server extension will also work, but Vite provides the best developer experience.

### Complete Working Example

This example is **production-ready** and can be copied directly:

#### 1. Setup Project

```bash
mkdir my-md2html-app
cd my-md2html-app
npm init -y
npm install md2html-themes
npm install --save-dev vite
```

#### 2. Create package.json

**package.json:**
```json
{
  "name": "my-md2html-app",
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

**Important:** `"type": "module"` enables ES module support.

#### 3. Create HTML File

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>md2html Example</title>
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
    <h1>md2html Converter</h1>
    
    <button id="convert">Convert Markdown</button>
    <button id="theme-light">Light Theme</button>
    <button id="theme-dark">Dark Theme</button>
    
    <div id="output"></div>
    
    <!-- CRITICAL: Must use type="module" for ES modules -->
    <script type="module" src="index.js"></script>
</body>
</html>
```

#### 4. Create JavaScript File

**index.js:**
```javascript
// Import the package
import md2html from 'md2html-themes';

console.log('md2html loaded successfully!');

// Sample markdown
const markdown = `# Hello World

This is a **test** of the *md2html-themes* package.

## Features:
- ✅ Markdown parsing
- ✅ Theme support
- ✅ Live preview

\`\`\`javascript
console.log('Code blocks work too!');
\`\`\`

> This is a blockquote

| Feature | Status |
|---------|--------|
| Working | ✅ |
`;

// Convert button
document.getElementById('convert').addEventListener('click', async () => {
    try {
        const result = await md2html.parse(markdown);
        const output = document.getElementById('output');
        output.innerHTML = result.html;
        console.log('Conversion successful!');
    } catch (error) {
        console.error('Conversion failed:', error);
    }
});

// Light theme button
document.getElementById('theme-light').addEventListener('click', () => {
    const output = document.getElementById('output');
    // NEW in v1.1.1: Automatic CSS injection - no manual CSS needed!
    md2html.applyThemeWithStyles(md2html.themes.light, output);
    console.log('Light theme applied');
});

// Dark theme button
document.getElementById('theme-dark').addEventListener('click', () => {
    const output = document.getElementById('output');
    // NEW in v1.1.1: Automatic CSS injection
    md2html.applyThemeWithStyles(md2html.themes.dark, output);
    console.log('Dark theme applied');
});

// Auto-convert on page load
window.addEventListener('load', () => {
    document.getElementById('convert').click();
    setTimeout(() => document.getElementById('theme-light').click(), 500);
});
```

#### 5. Run Development Server

```bash
npm run dev
```

**Output:**
```
VITE v5.x.x  ready in 250 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

#### 6. Open in Browser

Open `http://localhost:5173` in your browser. You'll see:
- Markdown automatically converted to HTML
- Light theme applied by default
- Clickable buttons to switch themes
- Any code changes trigger instant HMR updates

> **⚠️ Important:** Cannot open `index.html` directly (`file://` protocol). Must use a development server due to ES module CORS restrictions.

### Basic Usage (NPM with Vite)

```javascript
import md2html from 'md2html-themes';

// Parse markdown
const result = await md2html.parse('# Hello World\n\nThis is **bold** text.');

// Display in your web page
const preview = document.getElementById('preview');
preview.innerHTML = result.html;

// NEW in v1.1.1: Apply theme with automatic CSS injection (recommended)
md2html.applyThemeWithStyles(md2html.themes.dark, preview);

// Or use legacy method (requires manual CSS - not recommended)
md2html.applyTheme(md2html.themes.dark);

// Or generate a complete standalone HTML document
const fullHtml = md2html.toFullHtml(
  result.html,
  md2html.themes.dark,
  { title: 'My Document', inlineStyles: true }
);
```

### Browser Usage (CDN - No Build Step)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>md2html Demo</title>
</head>
<body>
  <div id="preview"></div>
  
  <!-- Load from CDN -->
  <script src="https://unpkg.com/md2html-themes@latest/dist/md2html.min.js"></script>
  
  <script>
    // md2html is now available as a global variable
    (async () => {
      const result = await md2html.parse('# Hello from CDN!\n\n**No build step required!**');
      const preview = document.getElementById('preview');
      preview.innerHTML = result.html;
      
      // NEW in v1.1.0: Automatic CSS injection - no manual CSS needed!
      md2html.applyThemeWithStyles(md2html.themes.light, preview);
    })();
  </script>
</body>
</html>
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Installation Guide](docs/INSTALLATION.md) - **📦 NPM, CDN, and installation methods**
- [Usage Guide](docs/USAGE.md) - **🚀 Detailed usage examples and code snippets**
- [API Reference](docs/API.md) - Complete API documentation
- [Introduction](docs/INTRODUCTION.md) - Overview and features
- [Theme Schema](docs/THEME_SCHEMA.md) - Theme customization guide
- [Testing](docs/TESTING.md) - Testing strategy and guidelines
- [Extending to PDF](docs/EXTENDING_TO_PDF.md) - Future PDF export plans
- [Manual Test Cases](docs/MANUAL_TEST_CASES.md) - QA checklist

## Project Structure

```
md2html/
├── src/
│   ├── index.js           # Public API
│   ├── parser.js          # Markdown parsing
│   ├── sanitizer.js       # XSS protection
│   ├── theme.js           # Theme engine
│   ├── ui/
│   │   ├── demo.js       # Demo application
│   │   └── components/   # UI components
│   └── styles/           # CSS themes
├── public/
│   └── index.html        # Demo page
├── tests/
│   ├── unit/            # Unit tests
│   └── e2e/             # E2E tests
├── docs/                # Documentation
├── samples/             # Sample markdown files
└── dist/                # Built files

```

## Development

### Commands

```bash
# Start development server
npm run start

# Build for production
npm run build

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run linter
npm run lint
```

### Dependencies

**Runtime:**
- [marked](https://marked.js.org/) - Markdown parser (chosen for lightweight footprint and GFM support)
- [DOMPurify](https://github.com/cure53/DOMPurify) - XSS sanitization

**Development:**
- [Vite](https://vitejs.dev/) - Dev server and build tool
- [Vitest](https://vitest.dev/) - Unit testing
- [Playwright](https://playwright.dev/) - E2E testing
- [Rollup](https://rollupjs.org/) - Library bundling

### Why These Dependencies?

**marked**: Lightweight (~50KB), fast, well-maintained, excellent GFM support, and highly extensible.

**DOMPurify**: Industry standard for HTML sanitization, actively maintained, comprehensive XSS protection.

## Supported Markdown Features

- Headings (H1-H4)
- Paragraphs and line breaks
- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com) and images
- Ordered and unordered lists
- Nested lists
- Task lists (- [ ] Todo)
- Tables with alignment
- Code blocks with language tags
- Inline `code`
- Blockquotes
- Horizontal rules
- Frontmatter (YAML)

## Themes

### Built-in Themes

- **Light** - Clean, professional light theme
- **Dark** - Eye-friendly dark theme
- **Custom** - Fully editable theme with live preview

### Theme Application (Two Methods)

#### Method 1: Automatic CSS Injection (NEW in v1.1.0) 

**Recommended for most users** - CSS styles are automatically injected:

```javascript
// No manual CSS required! Everything is handled automatically.
md2html.applyThemeWithStyles(md2html.themes.dark, container);
```

```html
<!DOCTYPE html>
<html>
<body>
  <div id="output"></div>
  
  <script src="https://unpkg.com/md2html-themes@latest/dist/md2html.min.js"></script>
  <script>
    (async () => {
      const result = await md2html.parse('# Hello World\n\nThis is **bold** text.');
      const output = document.getElementById('output');
      output.innerHTML = result.html;
      
      // Magic! CSS styles are automatically included - no manual CSS needed!
      md2html.applyThemeWithStyles(md2html.themes.light, output);
    })();
  </script>
</body>
</html>
```

#### Method 2: Manual CSS Variables (Legacy)

**For advanced users** who want full control over styling:

```javascript
// Sets CSS variables - you provide the CSS that uses them
md2html.applyTheme(md2html.themes.dark, container);
```

```html
<style>
  .my-markdown {
    color: var(--color-text);
    background: var(--color-surface);
    font-family: var(--font-family);
    /* ... more CSS using the variables ... */
  }
</style>
```

### Theme Customization

```javascript
// Clone and customize
const myTheme = md2html.cloneTheme(md2html.themes.light);
myTheme.colors.background = '#fef3c7';
myTheme.colors.text = '#78350f';
myTheme.typography.baseFontSize = '18px';

// Apply with automatic CSS (recommended)
md2html.applyThemeWithStyles(myTheme, container);

// Or apply with manual CSS variables
md2html.applyTheme(myTheme);

// Export and import
const json = md2html.exportTheme(myTheme);
localStorage.setItem('myTheme', json);

const savedTheme = md2html.importTheme(json);
md2html.applyThemeWithStyles(savedTheme, container);
```

See [Theme Schema](docs/THEME_SCHEMA.md) for complete customization options.

## Security

md2html includes built-in XSS protection via DOMPurify. All HTML output is sanitized by default to prevent script injection and other attacks.

```javascript
// Sanitization is enabled by default
const result = await md2html.parse(markdown);

// Check for dangerous content
if (md2html.hasDangerousContent(html)) {
  console.warn('Content contains potentially dangerous HTML');
}
```

See `samples/sample-xss.md` for tested attack vectors.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Uses modern JavaScript features:
- ES Modules
- Async/await
- CSS Custom Properties
- Fetch API

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run tests (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e

# Run in watch mode
npm test -- --watch
```

See [Testing Documentation](docs/TESTING.md) for details.

## License

MIT © 2025

See [LICENSE](LICENSE) for details.

## Roadmap

- [ ] PDF export (Puppeteer-based)
- [ ] Syntax highlighting for code blocks
- [ ] Math rendering (KaTeX)
- [ ] Mermaid diagram support
- [ ] Custom renderer hooks
- [ ] React/Vue wrapper components
- [ ] VS Code extension
- [ ] CLI tool

## Acknowledgments

- [marked](https://marked.js.org/) - Markdown parsing
- [DOMPurify](https://github.com/cure53/DOMPurify) - XSS sanitization
- [Vite](https://vitejs.dev/) - Build tooling

## Support

- [Documentation](docs/)
- [Issue Tracker](https://github.com/ivkeapp/md2html/issues)
- [Discussions](https://github.com/ivkeapp/md2html/discussions)

---

**Built with ❤️ using vanilla JavaScript**
