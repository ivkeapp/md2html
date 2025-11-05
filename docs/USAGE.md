# Usage Guide

## Prerequisites

Before using md2html-themes, make sure you understand:

1. **ES Modules** - This package uses modern JavaScript `import`/`export` syntax
2. **Development Server** - You need a local server (like Vite) to develop with ES modules
3. **Browser Support** - Requires modern browsers with ES module support

See [INSTALLATION.md](./INSTALLATION.md) for complete setup instructions.

## Installation

```bash
npm install md2html-themes
npm install --save-dev vite  # Required for development
```

**Why Vite?** Modern browsers require ES modules to be served over HTTP (not `file://`). Vite provides instant server startup, Hot Module Replacement (HMR), and zero configuration for ES modules.

## Complete Working Example

This is a **production-ready example** that you can copy and use immediately:

### Project Structure

```
my-project/
├── package.json
├── index.html
└── index.js
```

### package.json

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

**Important fields:**
- `"type": "module"` - Enables ES module support
- `"dev": "vite"` - Starts development server with HMR
- `vite` in devDependencies - Only needed during development, not in production

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>md2html Package Test</title>
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
    
    <!-- CRITICAL: Must use type="module" for ES modules -->
    <script type="module" src="index.js"></script>
</body>
</html>
```

### index.js

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
        // NEW in v1.1.1: Automatic CSS injection
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
        // NEW in v1.1.1: Automatic CSS injection
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

### Run the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

**What you'll see:**
- Markdown content automatically converted to HTML
- Light theme applied by default
- Click buttons to test theme switching
- Any code changes trigger instant HMR updates

## Quick Start Examples

### Browser with Vite (Recommended for Development)

```javascript
import md2html from 'md2html-themes';

// Parse markdown
const result = await md2html.parse('# Hello World\n\nThis is **bold** text.');
console.log(result.html);

// Apply theme with automatic CSS injection (NEW in v1.1.1!)
const container = document.getElementById('preview');
container.innerHTML = result.html;
md2html.applyThemeWithStyles(md2html.themes.dark, container);
```

### Browser CDN (No Build Step)

For quick prototyping without any build tools:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>md2html CDN Demo</title>
</head>
<body>
  <div id="preview"></div>
  
  <!-- Load from CDN (UMD bundle) -->
  <script src="https://unpkg.com/md2html-themes@latest/dist/md2html.min.js"></script>
  
  <script>
    // md2html is available as a global variable
    (async () => {
      const result = await md2html.parse('# Hello World\n\n**Markdown** is easy!');
      const preview = document.getElementById('preview');
      preview.innerHTML = result.html;
      
      // NEW in v1.1.1: CSS styles automatically included!
      md2html.applyThemeWithStyles(md2html.themes.light, preview);
    })();
  </script>
</body>
</html>
```

**CDN Benefits:**
- ✅ No npm install needed
- ✅ No build step required
- ✅ Works immediately in any HTML file
- ✅ Can open directly in browser (no CORS issues)

**CDN Limitations:**
- ❌ No tree-shaking (larger bundle size)
- ❌ No module imports in your code
- ❌ Harder to integrate with modern frameworks

## Theme Application Methods

### Method 1: Automatic CSS Injection (Recommended) ⭐

**NEW in v1.1.0** - CSS styles are automatically injected into the page:

```javascript
// No manual CSS required! Everything is handled automatically.
md2html.applyThemeWithStyles(theme, container, options);
```

**Complete Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Auto CSS Example</title>
</head>
<body>
  <div id="output"></div>
  
  <script src="https://unpkg.com/md2html-themes@latest/dist/md2html.min.js"></script>
  <script>
    (async () => {
      const markdown = '# Hello World\n\nThis **works** without manual CSS!';
      const result = await md2html.parse(markdown);
      const output = document.getElementById('output');
      output.innerHTML = result.html;
      
      // Magic! No CSS files or manual styling needed
      md2html.applyThemeWithStyles(md2html.themes.dark, output);
    })();
  </script>
</body>
</html>
```

**Options:**
```javascript
md2html.applyThemeWithStyles(theme, container, {
  addClassName: true,    // Add .md-content class to container
  styleId: 'my-styles'   // Custom ID for the injected <style> tag
});
```

### Method 2: Manual CSS Variables (Legacy)

**For advanced users** who want full control over styling:

```javascript
// Sets CSS variables - you provide the CSS that uses them
md2html.applyTheme(theme, container);
```

You must provide CSS that uses the variables:
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

## Development Setup (Contributing)

If you want to develop or contribute to md2html:

1. Clone the repository:
```bash
git clone https://github.com/ivkeapp/md2html.git
cd md2html
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run start
```

4. Open http://localhost:3000 to see the demo app.

## Library Usage Examples

### Basic Example

```html
<script src="dist/md2html.min.js"></script>
<script>
  const md = '# Hello world\n\nThis is a test.';
  const fragment = md2html.parse(md);
  const full = md2html.toFullHtml(fragment.html, md2html.themes.light);
  
  // Insert fragment into a container
  document.getElementById('preview').innerHTML = fragment.html;
</script>
```

### Parse and Render Markdown

```javascript
import md2html from 'md2html-themes';

async function processMarkdown() {
  // Parse markdown
  const result = await md2html.parse('# Hello World\n\nThis is a paragraph.');
  
  // result.html contains the parsed HTML
  console.log(result.html);
  // Output: <h1 id="hello-world">Hello World</h1>\n<p>This is a paragraph.</p>
  
  // result.metadata contains frontmatter (if any)
  console.log(result.metadata);
  // Output: null (or object if frontmatter present)
  
  // Display in DOM
  const preview = document.getElementById('preview');
  preview.innerHTML = result.html;
  
  // Apply theme with automatic CSS
  md2html.applyThemeWithStyles(md2html.themes.light, preview);
}

processMarkdown();
```

### With Frontmatter

```javascript
const markdown = `---
title: My Document
author: John Doe
---

# Content here
`;

const result = await md2html.parse(markdown);
console.log(result.metadata);
// { title: 'My Document', author: 'John Doe' }
```

### Applying Themes

```javascript
// Use a built-in theme
md2html.applyTheme(md2html.themes.dark);

// Create custom theme
const customTheme = md2html.cloneTheme(md2html.themes.light);
customTheme.colors.background = '#f0f0f0';
customTheme.colors.text = '#333333';

md2html.applyTheme(customTheme);
```

### Generating Full HTML Documents

```javascript
const result = await md2html.parse(markdownContent);
const htmlDoc = md2html.toFullHtml(
  result.html,
  md2html.themes.dark,
  {
    title: 'My Document',
    inlineStyles: true, // Include CSS inline
    metadata: result.metadata
  }
);

// Save or display the HTML
const blob = new Blob([htmlDoc], { type: 'text/html' });
const url = URL.createObjectURL(blob);
window.open(url);
```

### Theme Export/Import

```javascript
// Export theme as JSON
const themeJson = md2html.exportTheme(md2html.themes.dark);
localStorage.setItem('myTheme', themeJson);

// Import theme from JSON
const savedTheme = localStorage.getItem('myTheme');
const theme = md2html.importTheme(savedTheme);
md2html.applyTheme(theme);
```

### Sanitization

```javascript
// Sanitization is enabled by default
const result = await md2html.parse(markdown);

// Disable sanitization (not recommended)
const unsafeResult = await md2html.parse(markdown, { sanitize: false });

// Check for dangerous content
if (md2html.hasDangerousContent(html)) {
  console.warn('Content contains potentially dangerous HTML');
}

// Sanitize with report
const { html, removed } = md2html.sanitizeWithReport(unsafeHtml);
console.log('Removed:', removed); // ['script tags', 'event handlers']
```

## Building for Production

```bash
npm run build
```

This creates:
- `dist/md2html.min.js` - Minified library bundle
- `dist/index.html` - Production demo page

## Integration Examples

### React Component

```jsx
import { useEffect, useRef } from 'react';
import md2html from 'md2html';

function MarkdownPreview({ markdown, theme = 'light' }) {
  const previewRef = useRef(null);
  
  useEffect(() => {
    async function render() {
      const result = await md2html.parse(markdown);
      if (previewRef.current) {
        previewRef.current.innerHTML = result.html;
        md2html.applyTheme(md2html.themes[theme], previewRef.current);
      }
    }
    render();
  }, [markdown, theme]);
  
  return <div ref={previewRef} className="md-preview" />;
}
```

### Vue Component

```vue
<template>
  <div ref="preview" class="md-preview"></div>
</template>

<script>
import md2html from 'md2html';

export default {
  props: ['markdown', 'theme'],
  mounted() {
    this.render();
  },
  watch: {
    markdown() { this.render(); },
    theme() { this.applyTheme(); }
  },
  methods: {
    async render() {
      const result = await md2html.parse(this.markdown);
      this.$refs.preview.innerHTML = result.html;
      this.applyTheme();
    },
    applyTheme() {
      md2html.applyTheme(
        md2html.themes[this.theme], 
        this.$refs.preview
      );
    }
  }
}
</script>
```

See `API.md` for complete API documentation.
