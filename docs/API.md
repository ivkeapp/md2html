# API Reference

Complete documentation of the md2html public API.

## Core Functions

### `parse(markdown, options)`

Parse markdown string to HTML.

**Parameters:**
- `markdown` (string): Raw markdown content
- `options` (object, optional):
  - `sanitize` (boolean): Enable HTML sanitization (default: `true`)
  - `extractMetadata` (boolean): Extract YAML frontmatter (default: `true`)

**Returns:** `Promise<{ html: string, metadata: object|null }>`

**Example:**
```javascript
const result = await md2html.parse('# Hello World');
console.log(result.html); // <h1 id="hello-world">Hello World</h1>
console.log(result.metadata); // null

// With frontmatter
const markdown = `---
title: My Doc
---
# Content`;

const result = await md2html.parse(markdown);
console.log(result.metadata); // { title: 'My Doc' }
```

---

### `toFullHtml(htmlFragment, theme, options)`

Convert HTML fragment to a complete HTML document.

**Parameters:**
- `htmlFragment` (string): HTML content (typically from `parse()`)
- `theme` (object): Theme object from `themes` or custom
- `options` (object, optional):
  - `inlineStyles` (boolean): Inline CSS vs linked stylesheet (default: `true`)
  - `title` (string): Document title (default: `'Markdown Document'`)
  - `metadata` (object): Additional metadata for `<meta>` tags

**Returns:** `string` - Complete HTML document

**Example:**
```javascript
const result = await md2html.parse(markdown);
const html = md2html.toFullHtml(
  result.html,
  md2html.themes.dark,
  {
    title: 'My Article',
    metadata: {
      author: 'John Doe',
      description: 'An amazing article'
    }
  }
);

// Save to file or display
const blob = new Blob([html], { type: 'text/html' });
```

---

### `applyTheme(theme, container)`

Apply theme to a DOM container via CSS variables.

**Parameters:**
- `theme` (object): Theme object
- `container` (HTMLElement, optional): Target element (default: `document.documentElement`)

**Returns:** `void`

**Example:**
```javascript
// Apply to entire page
md2html.applyTheme(md2html.themes.dark);

// Apply to specific container
const preview = document.getElementById('preview');
md2html.applyTheme(md2html.themes.light, preview);
```

---

## Theme Management

### `themes`

Built-in theme objects.

**Properties:**
- `themes.light` - Light theme
- `themes.dark` - Dark theme
- `themes.custom` - Default custom theme (clone of light)

**Example:**
```javascript
console.log(Object.keys(md2html.themes)); // ['light', 'dark', 'custom']
md2html.applyTheme(md2html.themes.dark);
```

---

### `exportTheme(theme)`

Export theme as JSON string.

**Parameters:**
- `theme` (object): Theme to export

**Returns:** `string` - JSON representation

**Example:**
```javascript
const json = md2html.exportTheme(md2html.themes.dark);
localStorage.setItem('savedTheme', json);
```

---

### `importTheme(json)`

Import theme from JSON string.

**Parameters:**
- `json` (string): JSON theme data

**Returns:** `object` - Theme object

**Throws:** Error if JSON is invalid or theme structure is incorrect

**Example:**
```javascript
const json = localStorage.getItem('savedTheme');
try {
  const theme = md2html.importTheme(json);
  md2html.applyTheme(theme);
} catch (error) {
  console.error('Invalid theme:', error.message);
}
```

---

### `cloneTheme(theme)`

Create a deep copy of a theme.

**Parameters:**
- `theme` (object): Theme to clone

**Returns:** `object` - Cloned theme

**Example:**
```javascript
const myTheme = md2html.cloneTheme(md2html.themes.light);
myTheme.colors.background = '#f0f0f0';
md2html.applyTheme(myTheme);
```

---

### `mergeTheme(baseTheme, overrides)`

Merge theme overrides into a base theme.

**Parameters:**
- `baseTheme` (object): Base theme
- `overrides` (object): Properties to override

**Returns:** `object` - Merged theme

**Example:**
```javascript
const customTheme = md2html.mergeTheme(
  md2html.themes.dark,
  {
    colors: {
      background: '#000000',
      text: '#ffffff'
    },
    typography: {
      baseFontSize: '18px'
    }
  }
);
```

---

## Sanitization

### `sanitizeHtml(html, config)`

Sanitize HTML content to prevent XSS.

**Parameters:**
- `html` (string): HTML to sanitize
- `config` (object, optional): DOMPurify configuration overrides

**Returns:** `string` - Sanitized HTML

**Example:**
```javascript
const unsafe = '<script>alert("xss")</script><p>Safe content</p>';
const safe = md2html.sanitizeHtml(unsafe);
console.log(safe); // <p>Safe content</p>
```

---

### `hasDangerousContent(html)`

Check if HTML contains potentially dangerous patterns.

**Parameters:**
- `html` (string): HTML to check

**Returns:** `boolean` - True if dangerous content detected

**Example:**
```javascript
const html = '<p>Safe</p>';
console.log(md2html.hasDangerousContent(html)); // false

const dangerous = '<script>alert(1)</script>';
console.log(md2html.hasDangerousContent(dangerous)); // true
```

---

### `sanitizeWithReport(html)`

Sanitize HTML and return a report of removed content.

**Parameters:**
- `html` (string): HTML to sanitize

**Returns:** `{ html: string, removed: string[] }`

**Example:**
```javascript
const input = '<script>alert(1)</script><p onclick="bad()">Text</p>';
const { html, removed } = md2html.sanitizeWithReport(input);
console.log(html); // <p>Text</p>
console.log(removed); // ['script tags', 'event handlers']
```

---

## Type Definitions (TypeScript)

```typescript
interface ParseOptions {
  sanitize?: boolean;
  extractMetadata?: boolean;
}

interface ParseResult {
  html: string;
  metadata: Record<string, string> | null;
}

interface ThemeTypography {
  fontFamily: string;
  baseFontSize: string;
  lineHeight: number;
  h1: { size: string; weight: number };
  h2: { size: string; weight: number };
  h3: { size: string; weight: number };
  h4: { size: string; weight: number };
}

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  headings: string;
  links: string;
  linksHover: string;
  codeBackground: string;
  codeText: string;
  inlineCodeBg: string;
  inlineCodeText: string;
  tableHeader: string;
  tableRow: string;
  tableRowAlt: string;
  border: string;
  blockquoteBorder: string;
  blockquoteBg: string;
}

interface ThemeSpacing {
  paragraphSpacing: string;
  listSpacing: string;
  blockSpacing: string;
}

interface ThemeTables {
  borderStyle: string;
  borderWidth: string;
  zebra: boolean;
  cellPadding: string;
}

interface ThemeCode {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
  blockPadding: string;
  borderRadius: string;
}

interface ThemeLists {
  bulletStyle: string;
  orderedStyle: string;
  nestedIndent: string;
}

interface Theme {
  name: string;
  typography: ThemeTypography;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  tables: ThemeTables;
  code: ThemeCode;
  lists: ThemeLists;
}

interface FullHtmlOptions {
  inlineStyles?: boolean;
  title?: string;
  metadata?: Record<string, string>;
}

// Main API
export function parse(
  markdown: string, 
  options?: ParseOptions
): Promise<ParseResult>;

export function toFullHtml(
  htmlFragment: string,
  theme: Theme,
  options?: FullHtmlOptions
): string;

export function applyTheme(
  theme: Theme,
  container?: HTMLElement
): void;

export function exportTheme(theme: Theme): string;
export function importTheme(json: string): Theme;
export function cloneTheme(theme: Theme): Theme;
export function mergeTheme(baseTheme: Theme, overrides: Partial<Theme>): Theme;

export function sanitizeHtml(html: string, config?: object): string;
export function hasDangerousContent(html: string): boolean;
export function sanitizeWithReport(html: string): { 
  html: string; 
  removed: string[] 
};

export const themes: {
  light: Theme;
  dark: Theme;
  custom: Theme;
};
```

---

## Error Handling

All async functions return promises that may reject with errors:

```javascript
try {
  const result = await md2html.parse(markdown);
} catch (error) {
  console.error('Parse error:', error.message);
}

try {
  const theme = md2html.importTheme(invalidJson);
} catch (error) {
  console.error('Import error:', error.message);
}
```

---

## Browser Support

The API uses modern JavaScript features:
- ES Modules
- Async/await
- CSS Custom Properties
- Promise API

Supported in Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.
