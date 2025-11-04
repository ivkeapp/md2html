# md2html

A lightweight, dependency-minimal JavaScript library for converting Markdown to themed HTML directly in the browser.

[![CI](https://github.com/ivkeapp/md2html/actions)](https://github.com/ivkeapp/md2html/actions)
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

```bash
# Install from NPM
npm install @ivkeapp/md2html

# Or for development
npm install
npm run start
```

Open http://localhost:3000 to see the demo.

### Basic Usage

```html
<script src="dist/md2html.min.js"></script>
<script>
  const markdown = '# Hello World\n\nThis is **bold** text.';
  const result = await md2html.parse(markdown);
  
  document.getElementById('preview').innerHTML = result.html;
  md2html.applyTheme(md2html.themes.light);
</script>
```

### ES Module

```javascript
import md2html from '@ivkeapp/md2html';

// Parse markdown
const result = await md2html.parse('# Hello World');
console.log(result.html);

// Apply theme
md2html.applyTheme(md2html.themes.dark);

// Generate full HTML document
const fullHtml = md2html.toFullHtml(
  result.html,
  md2html.themes.dark,
  { title: 'My Document' }
);
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Introduction](docs/INTRODUCTION.md) - Overview and features
- [Usage Guide](docs/USAGE.md) - Detailed usage examples
- [API Reference](docs/API.md) - Complete API documentation
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

### Theme Customization

```javascript
// Clone and customize
const myTheme = md2html.cloneTheme(md2html.themes.light);
myTheme.colors.background = '#fef3c7';
myTheme.colors.text = '#78350f';
myTheme.typography.baseFontSize = '18px';

md2html.applyTheme(myTheme);

// Export and import
const json = md2html.exportTheme(myTheme);
localStorage.setItem('myTheme', json);

const savedTheme = md2html.importTheme(json);
md2html.applyTheme(savedTheme);
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
