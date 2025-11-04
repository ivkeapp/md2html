# Project: Markdown → Themed HTML Transliterater (vanilla JS library)

## 1 — Agent prompt (give this to an AI agent that will implement the project)

You are an autonomous development agent. Your task: create a small, production-quality, **vanilla JavaScript** library and demo web UI that converts Markdown files to themed HTML in-browser. The library must be modular and ready to be wrapped by React later. It must include automatic tests, manual-test files, build scripts, and comprehensive documentation in `.md` files. Follow the project plan and requirements below exactly.

### Primary goals

1. Build a lightweight, dependency-minimal JS library `md2html` that:

   * Converts GitHub-flavored Markdown (GFM) to semantic HTML.
   * Produces CSS/HTML output that is themeable with three built-in themes: `light`, `dark`, and `custom`.
   * Exposes a theme API allowing runtime theme switching and fully user-customizable `custom` theme options (fonts, header sizes, colors, table styling, code block styles, background, paragraph styles, list decorations, spacing, etc.).
   * Works fully in the browser (no server required) and supports loading `.md` files via drag-and-drop, file input, and copy-paste.
2. Provide a polished, accessible, responsive UI demo page that showcases the library and theme editor.
3. Include a test suite (unit + integration) and E2E test scaffolding for later CI integration.
4. Produce a clear directory structure and README-style docs (multiple `.md` files) that explain usage, customization, theme schema, testing and extension to `md → pdf` in the future.

### Requirements & implementation details

**Markdown rules & supported features**

* Support standard Markdown elements: headings (# ... ####), paragraphs, blockquotes, ordered/unordered lists (including nested lists), code blocks (fenced with language), inline code, emphasis (bold/italic/strikethrough), links, images, tables, horizontal rules, task lists, and math blocks (optional; implement only if low cost to include).
* Honor GFM specifics (tables, task lists, autolinks).

**Themes**

* Provide three theme modes: `light`, `dark`, `custom`.
* `light` and `dark` are fully designed CSS themes. `custom` is a runtime-editable theme object exposing granular options:

  * Typography: global font family, base font size, h1..h4 font sizes, heading weights.
  * Colors: background, surface (card/panel), global text color, headings color, link color, code background & foreground, table header & row colors, border colors.
  * Spacing: global line-height, paragraph spacing, list spacing.
  * Tables: border style, zebra rows toggle, cell padding, header style.
  * Code snippets: font-family (monospace by default), font-size, line-height, syntax theme base (light/dark) and custom overrides for tokens (if feasible).
  * Lists: bullet styles, ordered list counter style, nested list indentation.

**UI / UX**

* Responsive layout: left sidebar with file + navigation + theme controls on desktop; mobile uses a top navigation or sheet (no permanent sidebar). Provide accessible keyboard navigation for the demo.
* Live preview pane that renders the converted HTML with selected theme.
* Theme editor panel that updates preview live and can export/import theme JSON.
* Downloads: allow user to download produced HTML (single-file with inline CSS) and ZIP containing `index.html`, `styles.css`, and `content.html`. Leave hooks for future `md → pdf` export (plan in docs, don't implement now).

**Library API** (`md2html`) — public surface

* `md2html.parse(markdown: string, options?: ParseOptions) => { html: string, metadata?: object }` — converts markdown to HTML fragment (no full page wrapper) and optionally extracts frontmatter.
* `md2html.toFullHtml(htmlFragment: string, theme: ThemeObject) => string` — wraps fragment into a full HTML document with theme CSS inlined or linked.
* `md2html.applyTheme(theme: ThemeObject)` — apply theme to a preview container in DOM.
* `md2html.exportTheme(theme: ThemeObject) => string` — returns theme JSON.

**Safety & sanitization**

* Sanitize HTML output to avoid XSS (strip or encode `<script>` tags and dangerous `on*` attributes). The output should be safe for public use in demo.

**Performance & footprint**

* Keep the runtime small and dependency-minimal. If you include a Markdown parser, prefer a modern single-file small parser or a well-known bundlable UMD module (for example: `marked` or `markdown-it`) — justify the choice in docs.

**Testing**

* Unit tests: parser behavior (headings, lists, tables, inline formatting), theme application, sanitization.
* Integration tests: file input → parse → preview → download HTML.
* E2E tests: simulate user flows in Playwright (open demo, load .md, change theme, export HTML).
* Use a lightweight test runner suitable for vanilla JS (Jest + jsdom or Vitest). Provide example test files.

**Build & dev tooling**

* Provide `package.json` with scripts: `start` (dev server), `build`, `test`, `test:e2e`, `lint`.
* Use a simple bundler or zero-config tool (esbuild or rollup). Keep config minimal.

**Compatibility**

* Modern evergreen browsers. Provide notes on polyfills if any APIs used require them.

**Deliverables**

* Complete source code for library and demo UI.
* `index.html` demo page showing features and README.
* `docs/` folder with `.md` files explaining theme schema, API, extension points, manual testing plan, and `md → pdf` future plan.
* `tests/` with unit and E2E tests.
* Sample `.md` documents for manual testing (covering edge-cases like nested lists, complex tables, long code blocks, images, frontmatter).

### Acceptance criteria (automatically checked by the agent)

* All unit tests pass.
* E2E test skeleton exists and at least one E2E test passes in headless mode.
* `npm run build` produces a distributable artifact (single `dist/` folder with `md2html.min.js` and demo `index.html`).
* Demo UI loads local `.md` files and shows live preview.
* Theme editor exports JSON and preview updates reflect changes.
* Sanitization prevents a sample XSS payload from executing in the preview.

### Files & directory structure to create (exact)

```
md2html/
├── package.json
├── README.md
├── LICENSE
├── src/
│   ├── index.js            # public entry (exports md2html)
│   ├── parser.js           # markdown parsing wrapper
│   ├── sanitizer.js        # sanitize output
│   ├── theme.js            # theme engine + default themes
│   ├── ui/
│   │   ├── demo.js        # demo wiring (file load, preview, theme editor)
│   │   └── components/    # small UI components (FileDrop, ThemeEditor...)
│   └── styles/
│       ├── base.css
│       ├── theme-light.css
│       └── theme-dark.css
├── public/
│   └── index.html         # demo page
├── dist/                  # created by build
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
│   ├── INTRODUCTION.md
│   ├── USAGE.md
│   ├── THEME_SCHEMA.md
│   ├── API.md
│   ├── TESTING.md
│   ├── EXTENDING_TO_PDF.md
│   └── MANUAL_TEST_CASES.md
└── samples/
    ├── sample-article.md
    ├── sample-tables.md
    └── sample-code.md
```

### Extra instructions for the agent

* Write clean, commented code and keep functions small and well-named.
* Add JSDoc comments to public functions.
* Provide a `CONTRIBUTING.md` with instructions for adding themes and tests.
* Write unit tests that can run quickly (< 2s) in CI.
* Where you add third-party libraries, include a short justification in `README.md`.
* Add an accessibility checklist in the docs (contrast, keyboard navigation, ARIA where helpful).

---

## 2 — Documentation files (create these files in `/docs` exactly as shown)

Below follow the contents for the `.md` documentation files I want you to create. Each file should be saved into the `docs/` directory in the project root. Do not include icons or inline images — plain Markdown only.

---

### `INTRODUCTION.md`

# Introduction

`md2html` is a small, dependency-minimal JavaScript library and demo for converting Markdown files into themed HTML directly in the browser. It focuses on excellent UI/UX, accessibility, and flexible theming (light/dark/custom) that users can edit live.

This project ships as a standalone library that can be used in vanilla JS and wrapped by frameworks such as React, Vue, or Svelte in the future.

---

### `USAGE.md`

# Usage

## Quick start

1. Install (development):

```bash
npm install
npm run start
```

2. Open `public/index.html` (dev server will serve it).

3. Drag-and-drop a `.md` file or paste Markdown into the editor. The preview updates live.

## Library usage (vanilla JS)

```html
<script src="dist/md2html.min.js"></script>
<script>
  const md = '# Hello world\n\nThis is a test.';
  const fragment = md2html.parse(md);
  const full = md2html.toFullHtml(fragment.html, md2html.themes.light);
  // insert fragment into a container
  document.getElementById('preview').innerHTML = fragment.html;
</script>
```

See `API.md` for full API surface.

---

### `THEME_SCHEMA.md`

# Theme schema

The custom theme is a JSON object. Below is the full schema and defaults:

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
    "codeBackground": "#0b1220",
    "codeText": "#e6edf3",
    "tableHeader": "#eef2ff",
    "tableRow": "#ffffff",
    "border": "#e5e7eb"
  },
  "tables": { "borderStyle": "solid", "zebra": true, "cellPadding": "0.5rem" },
  "code": { "fontFamily": "Menlo, Monaco, 'Courier New', monospace", "fontSize": "0.95rem" },
  "lists": { "bulletStyle": "disc", "orderedStyle": "decimal" }
}
```

The theme editor in the demo exposes these fields and live-updates the preview.

---

### `API.md`

# API

## `md2html.parse(markdown: string, options?: object) => { html, metadata }`

* `markdown`: raw markdown string.
* `options`: optional parse-time options (e.g., enable math: true).
* Returns an object with `html` (string) and `metadata` (object) if frontmatter exists.

## `md2html.toFullHtml(htmlFragment: string, theme: ThemeObject, options?: object) => string`

Wraps fragment into a full HTML document. `options.inlineStyles` toggles whether theme CSS is inlined.

## `md2html.applyTheme(theme: ThemeObject, container?: HTMLElement)`

Applies CSS variables to the `container` (defaults to `document.documentElement`) to preview the theme without a full page reload.

## `md2html.exportTheme(theme: ThemeObject) => string`

Returns a JSON string suitable for importing later.

---

### `TESTING.md`

# Testing

## Unit tests

* Runner: Vitest (or Jest if you prefer). Unit tests live in `tests/unit/`.
* Run: `npm test`.

Write tests for: parsing headings, nested lists, tables row/column correctness, code fences language detection, and sanitizer rejecting malicious attributes.

## E2E tests

* Runner: Playwright.
* Run: `npm run test:e2e`.

E2E flows: open `public/index.html`, load `samples/sample-article.md`, change theme to `dark`, export HTML, confirm saved HTML contains chosen theme color.

## Manual test cases (`MANUAL_TEST_CASES.md`)

List included in `docs/MANUAL_TEST_CASES.md`.

---

### `EXTENDING_TO_PDF.md`

# Extending to `.md → .pdf` (future plan)

Recommended approaches (pick depending on server vs client capabilities):

* **Client-side**: Use `html2pdf.js` (which wraps `jsPDF` + `html2canvas`) for simple PDFs. Pros: runs in browser, no server. Cons: less accurate for complex CSS, may rasterize text.

* **Server-side (best quality)**: Use **Puppeteer** (headless Chrome) to render the produced HTML to PDF. Highly customizable, excellent CSS fidelity. Ideal if you can run code server-side or in a cloud function.

* **Node library**: `md-to-pdf` (npm) — convenient wrapper, supports Puppeteer under the hood.

**Plan**: Leave extension points in code where `toFullHtml()` produces the HTML; a future worker or server route can call Puppeteer to save a PDF. Document these hooks and sample Puppeteer script.

---

### `MANUAL_TEST_CASES.md`

# Manual test cases

1. **Headings** — file with `#` to `####` check sizes and anchors.
2. **Lists** — nested ordered & unordered mixing.
3. **Tables** — wide tables, missing cells, alignment markers, and long text cells.
4. **Code** — long code blocks with language highlighting; check wrapping and horizontal scroll.
5. **Images** — relative and absolute paths; large images scaled down.
6. **XSS** — a file containing `<script>alert(1)</script>` and `![img](javascript:alert(1))`; ensure nothing executes.
7. **Theme export/import** — customize theme heavily (fonts, colors) and import back.
8. **Mobile layout** — open demo on narrow widths and ensure sidebar collapses.

---

### `CONTRIBUTING.md`

# Contributing

* Run `npm install` and `npm run start` to develop.
* Add unit tests for new parser behavior.
* Add a new theme by adding an entry to `src/theme.js` and a matching CSS file in `src/styles/`.

---

## 3 — Manual testing sample `.md` files (place in `samples/`)

Create at least three sample `.md` files with content covering headings, tables, nested lists, task lists, images, frontmatter, fenced code blocks with languages, and an intentional XSS snippet as described in `MANUAL_TEST_CASES.md`.

## 4 — Testing & CI suggestions

* Provide GitHub Actions workflow example `/.github/workflows/ci.yml` that installs deps, runs `npm test` and `npm run build`.
* Include `test:e2e` job that runs Playwright tests inside the workflow on a matrix of node LTS versions.

## 5 — What I expect you to deliver as the agent

* The full project skeleton and files listed above.
* Example unit tests and at least one working Playwright E2E test.
* The final `README.md` in project root explaining how to run, build, and contribute.

---

# End of prompt for agent

---

# 3 — Short developer notes for whoever implements the code

* Prefer `markdown-it` or `marked` as the base parser. `markdown-it` is pluggable and has many extensions (tables, task-lists). `marked` is smaller and fast. Give a short note in `README.md` why you picked one.
* Use CSS variables for theming and expose an internal function that maps ThemeObject → CSS variables for easy runtime application.
* Keep all CSS that affects preview inside a namespaced container (e.g., `.md-preview`) so the library is safe to embed.

---

# 4 — Deliverable in this document

This document contains the AI agent prompt (Section 1), full text for documentation files (Section 2), manual test plan and sample requirements. Use it as the single source of truth when the agent creates the project.

---

# Appendix: sample `package.json` script block (suggested)

```json
"scripts": {
  "start": "vite public --open",
  "build": "vite build && npm run bundle",
  "bundle": "rollup -c",
  "test": "vitest",
  "test:e2e": "playwright test",
  "lint": "eslint ."
}
```
