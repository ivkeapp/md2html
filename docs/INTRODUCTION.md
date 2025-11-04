# Introduction

`md2html` is a small, dependency-minimal JavaScript library and demo for converting Markdown files into themed HTML directly in the browser. It focuses on excellent UI/UX, accessibility, and flexible theming (light/dark/custom) that users can edit live.

This project ships as a standalone library that can be used in vanilla JS and wrapped by frameworks such as React, Vue, or Svelte in the future.

## Key Features

- **Browser-native**: No server required, runs entirely in the browser
- **GFM Support**: Full GitHub Flavored Markdown compatibility
- **Three Theme Modes**: Light, dark, and fully customizable themes
- **Live Preview**: Instant rendering with theme switching
- **XSS Protection**: Built-in sanitization for safe HTML output
- **Lightweight**: Minimal dependencies, optimized bundle size
- **Accessible**: WCAG-compliant UI with keyboard navigation
- **Export Ready**: Download as standalone HTML with inline styles

## Architecture

The library is structured into clear, modular components:

- **Parser** (`parser.js`): Markdown parsing using marked.js
- **Sanitizer** (`sanitizer.js`): XSS protection with DOMPurify
- **Theme Engine** (`theme.js`): Theme management and CSS variable generation
- **Public API** (`index.js`): Clean, documented interface
- **UI Demo** (`ui/demo.js`): Reference implementation

## Use Cases

- Documentation generation
- Blog post previews
- README rendering
- Content management systems
- Educational tools
- Note-taking applications
- Technical writing platforms

## Browser Compatibility

md2html works in all modern evergreen browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

No polyfills are required for supported browsers.

## Future Roadmap

- PDF export via Puppeteer/jsPDF
- Syntax highlighting for code blocks
- Math rendering (KaTeX/MathJax)
- Mermaid diagram support
- Custom renderer hooks
- React/Vue wrapper components
