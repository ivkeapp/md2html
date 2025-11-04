# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-04

### ⭐ Added
- **NEW:** `applyThemeWithStyles(theme, container, options)` function
  - Automatically injects complete CSS styles into `<head>`
  - No manual CSS required for users
  - Adds `.md-content` class to container automatically
  - Replaces previous injected styles when called multiple times
  - Configurable options for class names and style IDs

### 📚 Improved
- Updated README.md with new `applyThemeWithStyles` examples
- Updated docs/USAGE.md with comprehensive theme application guide
- Updated docs/API.md with detailed documentation for new function
- Added comparison between legacy and new theme application methods

### 🔧 Technical
- Enhanced theme.js with `generateMarkdownCSS()` internal function
- Complete CSS styles now generated programmatically
- Backwards compatible - legacy `applyTheme()` still works
- Bundle size increased by ~5KB for complete CSS inclusion

### 💡 Migration Guide
```javascript
// OLD (still works, but requires manual CSS):
md2html.applyTheme(theme, container);

// NEW (recommended, automatic CSS):
md2html.applyThemeWithStyles(theme, container);
```

## [1.0.2] - 2025-11-03

### 🐛 Fixed
- Fixed theme CSS variable application
- Improved CDN bundle compatibility
- Better error handling for missing DOM elements

### 📚 Documentation
- Added comprehensive installation guide
- Added manual test cases documentation
- Improved API reference examples

## [1.0.1] - 2025-11-02

### 🐛 Fixed
- Fixed NPM package exports
- Corrected TypeScript definitions
- Fixed CDN UMD bundle

## [1.0.0] - 2025-11-01

### 🎉 Initial Release
- Markdown to HTML parsing with GitHub Flavored Markdown support
- Three built-in themes (light, dark, custom)
- XSS protection with DOMPurify
- Theme customization and export/import
- CDN and NPM distribution
- Complete documentation suite
- Unit and E2E test coverage