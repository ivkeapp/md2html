# Usage Guide

## Installation

First, install the package from NPM:

```bash
npm install md2html-themes
```

See [INSTALLATION.md](./INSTALLATION.md) for detailed installation instructions including CDN and other methods.

## Quick Start

### Node.js / ES Modules

```javascript
import md2html from 'md2html-themes';

// Parse markdown
const result = await md2html.parse('# Hello World\n\nThis is **bold** text.');
console.log(result.html);

// Apply a theme with automatic CSS injection (NEW in v1.1.0!)
const container = document.getElementById('preview');
container.innerHTML = result.html;
md2html.applyThemeWithStyles(md2html.themes.dark, container);
```

### Browser (with bundler)

```javascript
import md2html from 'md2html-themes';

// Parse and render
async function renderMarkdown(markdown) {
  const result = await md2html.parse(markdown);
  const preview = document.getElementById('preview');
  preview.innerHTML = result.html;
  
  // NEW: Automatic CSS injection - no manual CSS needed!
  md2html.applyThemeWithStyles(md2html.themes.light, preview);
}

renderMarkdown('# Hello from Browser!');
```

### Browser (CDN - no build step)

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
    // md2html is available as a global variable
    (async () => {
      const result = await md2html.parse('# Hello World\n\n**Markdown** is easy!');
      const preview = document.getElementById('preview');
      preview.innerHTML = result.html;
      
      // NEW in v1.1.0: CSS styles automatically included!
      md2html.applyThemeWithStyles(md2html.themes.light, preview);
    })();
  </script>
</body>
</html>
```

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

### Complete Example

```javascript
import md2html from 'md2html-themes';

async function processMarkdown() {
  // Parse markdown
  const result = await md2html.parse('# Hello World\n\nThis is a paragraph.');
  
  // result.html contains the parsed HTML
  console.log(result.html);
  
  // result.metadata contains frontmatter (if any)
  console.log(result.metadata);
  
  // Display in DOM
  document.getElementById('preview').innerHTML = result.html;
  
  // Apply theme
  md2html.applyTheme(md2html.themes.light);
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
