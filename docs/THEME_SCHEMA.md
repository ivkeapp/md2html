# Theme Schema

The custom theme is a JSON object. Below is the full schema and defaults:

## Complete Schema

```json
{
  "name": "custom",
  "typography": {
    "fontFamily": "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    "baseFontSize": "16px",
    "lineHeight": 1.6,
    "h1": { "size": "2rem", "weight": 700 },
    "h2": { "size": "1.5rem", "weight": 600 },
    "h3": { "size": "1.25rem", "weight": 600 },
    "h4": { "size": "1rem", "weight": 600 }
  },
  "colors": {
    "background": "#ffffff",
    "surface": "#f8f9fb",
    "text": "#111827",
    "headings": "#0f172a",
    "links": "#1d4ed8",
    "linksHover": "#1e40af",
    "codeBackground": "#0b1220",
    "codeText": "#e6edf3",
    "inlineCodeBg": "#e5e7eb",
    "inlineCodeText": "#374151",
    "tableHeader": "#eef2ff",
    "tableRow": "#ffffff",
    "tableRowAlt": "#f9fafb",
    "border": "#e5e7eb",
    "blockquoteBorder": "#d1d5db",
    "blockquoteBg": "#f9fafb"
  },
  "spacing": {
    "paragraphSpacing": "1rem",
    "listSpacing": "0.5rem",
    "blockSpacing": "1.5rem"
  },
  "tables": {
    "borderStyle": "solid",
    "borderWidth": "1px",
    "zebra": true,
    "cellPadding": "0.75rem"
  },
  "code": {
    "fontFamily": "Menlo, Monaco, 'Courier New', monospace",
    "fontSize": "0.95rem",
    "lineHeight": 1.5,
    "blockPadding": "1rem",
    "borderRadius": "0.375rem"
  },
  "lists": {
    "bulletStyle": "disc",
    "orderedStyle": "decimal",
    "nestedIndent": "1.5rem"
  }
}
```

## Property Reference

### Typography

| Property | Type | Description | Example Values |
|----------|------|-------------|----------------|
| `fontFamily` | string | Base font stack | `"Arial, sans-serif"` |
| `baseFontSize` | string | Root font size | `"16px"`, `"1rem"` |
| `lineHeight` | number | Base line height | `1.5`, `1.6`, `2` |
| `h1.size` | string | H1 heading size | `"2rem"`, `"32px"` |
| `h1.weight` | number | H1 font weight | `700`, `600` |
| `h2.size` | string | H2 heading size | `"1.5rem"` |
| `h2.weight` | number | H2 font weight | `600` |
| `h3.size` | string | H3 heading size | `"1.25rem"` |
| `h3.weight` | number | H3 font weight | `600` |
| `h4.size` | string | H4 heading size | `"1rem"` |
| `h4.weight` | number | H4 font weight | `600` |

### Colors

All color properties accept any valid CSS color value (hex, rgb, hsl, named colors).

| Property | Description |
|----------|-------------|
| `background` | Page background color |
| `surface` | Content container background |
| `text` | Body text color |
| `headings` | Heading text color |
| `links` | Link color |
| `linksHover` | Link hover color |
| `codeBackground` | Code block background |
| `codeText` | Code block text color |
| `inlineCodeBg` | Inline code background |
| `inlineCodeText` | Inline code text color |
| `tableHeader` | Table header background |
| `tableRow` | Table row background (odd) |
| `tableRowAlt` | Table row background (even) |
| `border` | Border color for tables, hr |
| `blockquoteBorder` | Blockquote left border |
| `blockquoteBg` | Blockquote background |

### Spacing

| Property | Type | Description | Example Values |
|----------|------|-------------|----------------|
| `paragraphSpacing` | string | Space between paragraphs | `"1rem"`, `"16px"` |
| `listSpacing` | string | Space between list items | `"0.5rem"` |
| `blockSpacing` | string | Space around block elements | `"1.5rem"` |

### Tables

| Property | Type | Description | Options |
|----------|------|-------------|---------|
| `borderStyle` | string | Border style | `"solid"`, `"dashed"`, `"dotted"` |
| `borderWidth` | string | Border width | `"1px"`, `"2px"` |
| `zebra` | boolean | Alternate row colors | `true`, `false` |
| `cellPadding` | string | Padding inside cells | `"0.75rem"` |

### Code

| Property | Type | Description |
|----------|------|-------------|
| `fontFamily` | string | Monospace font stack |
| `fontSize` | string | Code font size |
| `lineHeight` | number | Code line height |
| `blockPadding` | string | Padding around code blocks |
| `borderRadius` | string | Border radius for code blocks |

### Lists

| Property | Type | Description | Options |
|----------|------|-------------|---------|
| `bulletStyle` | string | Unordered list marker | `"disc"`, `"circle"`, `"square"` |
| `orderedStyle` | string | Ordered list marker | `"decimal"`, `"lower-alpha"`, `"upper-roman"` |
| `nestedIndent` | string | Indentation for nested lists | `"1.5rem"` |

## Usage Examples

### Creating a Custom Theme

```javascript
import md2html from 'md2html';

// Start with a base theme
const myTheme = md2html.cloneTheme(md2html.themes.light);

// Customize colors
myTheme.colors.background = '#fef3c7';
myTheme.colors.text = '#78350f';
myTheme.colors.headings = '#92400e';
myTheme.colors.links = '#b45309';

// Customize typography
myTheme.typography.fontFamily = 'Georgia, serif';
myTheme.typography.baseFontSize = '18px';
myTheme.typography.h1.size = '2.5rem';

// Apply the theme
md2html.applyTheme(myTheme);
```

### Merging Theme Overrides

```javascript
const overrides = {
  colors: {
    background: '#000000',
    text: '#ffffff'
  },
  typography: {
    baseFontSize: '18px'
  }
};

const mergedTheme = md2html.mergeTheme(
  md2html.themes.dark,
  overrides
);
```

## Theme Editor

The demo UI includes a live theme editor that exposes these fields and updates the preview in real-time. You can:

1. Switch to "Custom" theme
2. Adjust any property
3. See changes instantly
4. Export the theme as JSON
5. Import previously saved themes

## CSS Variable Mapping

Themes are applied using CSS custom properties (variables). The theme engine automatically converts the theme object to CSS variables:

```css
:root {
  --font-family: Inter, system-ui, sans-serif;
  --font-size-base: 16px;
  --color-background: #ffffff;
  --color-text: #111827;
  /* ... etc */
}
```

This allows for instant theme switching without page reloads.

## Validation

When importing themes, md2html validates the structure:

- Required top-level keys: `typography`, `colors`, `spacing`
- Type checking for primitive values
- Graceful fallback for missing optional properties

Invalid themes will throw an error with details about what's missing or incorrect.
