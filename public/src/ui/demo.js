/**
 * demo.js - Demo UI wiring and application logic
 */

import md2html from '../index.js';
import { FileDrop } from './components/FileDrop.js';
import { ThemeSelector } from './components/ThemeSelector.js';
import { ThemeEditor } from './components/ThemeEditor.js';

class DemoApp {
  constructor() {
    this.currentMarkdown = '';
    this.currentFilename = '';
    this.currentTheme = md2html.themes.light;
    this.currentThemeName = 'light';
    this.customTheme = md2html.cloneTheme(md2html.themes.light);
    
    this.init();
  }
  
  init() {
    this.initializeComponents();
    this.attachEventListeners();
    this.loadSampleContent();
  }
  
  initializeComponents() {
    // File drop
    const fileDropContainer = document.getElementById('fileDropContainer');
    this.fileDrop = new FileDrop(fileDropContainer, (content, filename) => {
      this.handleMarkdownLoad(content, filename);
    });
    
    // Theme selector
    const themeSelectorContainer = document.getElementById('themeSelectorContainer');
    this.themeSelector = new ThemeSelector(
      themeSelectorContainer,
      md2html.themes,
      (themeName) => this.handleThemeChange(themeName)
    );
    
    // Theme editor (initially hidden)
    const themeEditorContainer = document.getElementById('themeEditorContainer');
    this.themeEditor = new ThemeEditor(
      themeEditorContainer,
      this.customTheme,
      (theme) => this.handleCustomThemeUpdate(theme)
    );
    
    this.updateThemeEditorVisibility();
  }
  
  attachEventListeners() {
    // Paste markdown
    const pasteBtn = document.getElementById('pasteBtn');
    pasteBtn?.addEventListener('click', () => this.handlePasteMarkdown());
    
    // Download HTML
    const downloadBtn = document.getElementById('downloadHtmlBtn');
    downloadBtn?.addEventListener('click', () => this.handleDownloadHtml());
    
    // Download ZIP
    const downloadZipBtn = document.getElementById('downloadZipBtn');
    downloadZipBtn?.addEventListener('click', () => this.handleDownloadZip());
    
    // Clear
    const clearBtn = document.getElementById('clearBtn');
    clearBtn?.addEventListener('click', () => this.handleClear());
    
    // Mobile sidebar toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.querySelector('.sidebar');
    mobileToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
    });
  }
  
  async handleMarkdownLoad(markdown, filename) {
    this.currentMarkdown = markdown;
    this.currentFilename = filename;
    await this.updatePreview();
  }
  
  async handlePasteMarkdown() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        this.handleMarkdownLoad(text, 'pasted.md');
      }
    } catch (error) {
      // Fallback: show a prompt
      const text = prompt('Paste your Markdown here:');
      if (text) {
        this.handleMarkdownLoad(text, 'pasted.md');
      }
    }
  }
  
  handleThemeChange(themeName) {
    this.currentThemeName = themeName;
    
    if (themeName === 'custom') {
      this.currentTheme = this.customTheme;
    } else {
      this.currentTheme = md2html.themes[themeName];
    }
    
    this.updateThemeEditorVisibility();
    this.applyTheme();
  }
  
  handleCustomThemeUpdate(theme) {
    this.customTheme = theme;
    if (this.currentThemeName === 'custom') {
      this.currentTheme = theme;
      this.applyTheme();
    }
  }
  
  updateThemeEditorVisibility() {
    const editorContainer = document.getElementById('themeEditorContainer');
    if (this.currentThemeName === 'custom') {
      editorContainer.style.display = 'block';
    } else {
      editorContainer.style.display = 'none';
    }
  }
  
  async updatePreview() {
    const previewContainer = document.getElementById('previewContainer');
    
    if (!this.currentMarkdown) {
      const zebraClass = this.currentTheme.tables.zebra ? '' : 'no-zebra';
      previewContainer.innerHTML = `<div class="md-preview theme-${this.currentTheme.name} ${zebraClass}"><p style="text-align: center; color: var(--ui-text-muted);">Load a Markdown file to see the preview</p></div>`;
      this.applyThemeStyles();
      return;
    }
    
    try {
      const result = await md2html.parse(this.currentMarkdown);
      const zebraClass = this.currentTheme.tables.zebra ? '' : 'no-zebra';
      previewContainer.innerHTML = `<div class="md-preview theme-${this.currentTheme.name} ${zebraClass}">${result.html}</div>`;
      this.applyThemeStyles();
    } catch (error) {
      const zebraClass = this.currentTheme.tables.zebra ? '' : 'no-zebra';
      previewContainer.innerHTML = `<div class="md-preview theme-${this.currentTheme.name} ${zebraClass}"><p style="color: var(--ui-danger);">Error parsing Markdown: ${error.message}</p></div>`;
      this.applyThemeStyles();
    }
  }
  
  applyThemeStyles() {
    // Apply CSS variables without triggering preview update
    md2html.applyTheme(this.currentTheme);
  }
  
  applyTheme() {
    // Apply theme and update preview
    md2html.applyTheme(this.currentTheme);
    this.updatePreview();
  }
  
  async handleDownloadHtml() {
    if (!this.currentMarkdown) {
      alert('Please load a Markdown file first');
      return;
    }
    
    try {
      const result = await md2html.parse(this.currentMarkdown);
      const fullHtml = md2html.toFullHtml(
        result.html,
        this.currentTheme,
        {
          title: this.currentFilename.replace('.md', ''),
          metadata: result.metadata
        }
      );
      
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.currentFilename.replace('.md', '.html');
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Error generating HTML: ${error.message}`);
    }
  }
  
  async handleDownloadZip() {
    alert('ZIP download feature requires a zip library. For now, use single HTML download which includes all styles inline.');
  }
  
  handleClear() {
    this.currentMarkdown = '';
    this.currentFilename = '';
    this.fileDrop.reset();
    this.updatePreview();
  }
  
  async loadSampleContent() {
    const sample = `# Welcome to md2html

A lightweight, browser-based Markdown to HTML converter with beautiful themes.

## Features

- **GitHub Flavored Markdown** support
- **Three built-in themes**: Light, Dark, and Custom
- **Live preview** with instant updates
- **Theme customization** with full control
- **Safe HTML output** with XSS protection

## Quick Start

1. Drop a \`.md\` file into the sidebar
2. Choose a theme
3. Customize colors and typography (Custom theme)
4. Download your themed HTML

### Code Example

\`\`\`javascript
const md = '# Hello World';
const result = await md2html.parse(md);
console.log(result.html);
\`\`\`

## Lists

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Task List

- [x] Markdown parsing
- [x] Theme system
- [x] Live preview
- [ ] PDF export (coming soon)

## Table Example

| Feature | Status | Priority |
|---------|--------|----------|
| Parsing | ✅ Done | High |
| Themes | ✅ Done | High |
| Export | ✅ Done | Medium |

> **Note**: This is a blockquote. It can contain multiple paragraphs and other Markdown elements.

---

**Try it out!** Load your own Markdown file or paste content using the buttons above.
`;
    
    await this.handleMarkdownLoad(sample, 'welcome.md');
  }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new DemoApp());
} else {
  new DemoApp();
}

export default DemoApp;
