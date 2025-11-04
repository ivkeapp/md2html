# Usage

## Quick start

1. Install dependencies (development):

```bash
npm install
npm run start
```

2. Open `public/index.html` (dev server will serve it at http://localhost:3000).

3. Drag-and-drop a `.md` file or paste Markdown into the editor. The preview updates live.

## Library usage (vanilla JS)

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

### ES Module Import

```javascript
import md2html from './dist/md2html.min.js';

// Parse markdown
const result = await md2html.parse('# Hello World');
console.log(result.html); // <h1>Hello World</h1>
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
