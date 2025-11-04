# Manual Test Cases

This document provides a comprehensive checklist for manually testing md2html. Use this before releases and when making significant changes.

## 1. Markdown Parsing

### Headings
- [ ] H1 through H4 render with correct sizes
- [ ] Heading IDs are generated (for anchor links)
- [ ] Headings respect theme colors
- [ ] Very long headings wrap properly
- [ ] Headings with special characters (#, *, etc.) work

**Test file:** `samples/sample-article.md`

### Paragraphs
- [ ] Paragraphs have correct spacing
- [ ] Line breaks within paragraphs work correctly
- [ ] Empty paragraphs don't create extra space
- [ ] Very long paragraphs wrap properly

### Emphasis
- [ ] **Bold** text renders correctly
- [ ] *Italic* text renders correctly
- [ ] ~~Strikethrough~~ works
- [ ] Combined formatting (***bold italic***) works
- [ ] Emphasis within words works (mid**bold**word)

### Links
- [ ] External links open in new tab
- [ ] Link colors match theme
- [ ] Link hover states work
- [ ] Links with special characters in URL work
- [ ] Relative links preserve paths
- [ ] Email links (mailto:) work

### Images
- [ ] Images load and display
- [ ] Alt text is present
- [ ] Large images scale down to fit container
- [ ] Broken image links show alt text
- [ ] Images in dark theme are visible
- [ ] Image titles (hover tooltips) work

## 2. Lists

### Unordered Lists
- [ ] Basic bullet lists render
- [ ] Nested lists indent properly
- [ ] Mixed nesting (ul > ol > ul) works
- [ ] List items with multiple paragraphs work
- [ ] Bullet style matches theme

**Test file:** `samples/sample-article.md`

### Ordered Lists
- [ ] Numbers render correctly
- [ ] Numbering continues correctly in nested lists
- [ ] Custom start numbers work (3. item)
- [ ] Ordered style matches theme

### Task Lists
- [ ] Unchecked tasks show checkbox
- [ ] Checked tasks show checked checkbox
- [ ] Checkboxes are disabled (not interactive in preview)
- [ ] Task list items have proper spacing

## 3. Tables

**Test file:** `samples/sample-tables.md`

- [ ] Basic tables render correctly
- [ ] Table headers have distinct styling
- [ ] Zebra striping works (alternate row colors)
- [ ] Cell padding matches theme
- [ ] Table borders are visible
- [ ] Alignment (left, center, right) works
- [ ] Tables with missing cells render
- [ ] Very wide tables scroll horizontally
- [ ] Tables in mobile view are usable
- [ ] Empty cells render properly
- [ ] Tables with long content wrap/scroll

### Edge Cases
- [ ] Single column table
- [ ] Single row table (header only)
- [ ] Table with many columns (>10)
- [ ] Table with very long cell content
- [ ] Nested content in cells (code, links, etc.)

## 4. Code

**Test file:** `samples/sample-code.md`

### Inline Code
- [ ] `Inline code` has distinct background
- [ ] Inline code uses monospace font
- [ ] Inline code respects theme colors
- [ ] Inline code in headings works

### Code Blocks
- [ ] Fenced code blocks render
- [ ] Code block background matches theme
- [ ] Monospace font is used
- [ ] Line numbers are NOT shown (unless implemented)
- [ ] Long lines scroll horizontally
- [ ] Code blocks preserve indentation
- [ ] Code blocks preserve whitespace
- [ ] Language tags (```javascript) are respected
- [ ] Code blocks with no language specified work

### Languages to Test
- [ ] JavaScript
- [ ] Python
- [ ] HTML
- [ ] CSS
- [ ] Bash/Shell
- [ ] JSON
- [ ] Markdown (meta!)

## 5. Blockquotes

- [ ] Blockquotes have left border
- [ ] Blockquote background matches theme
- [ ] Nested blockquotes indent properly
- [ ] Blockquotes with multiple paragraphs work
- [ ] Blockquotes can contain other elements (lists, code, etc.)
- [ ] Very long blockquotes scroll/wrap properly

## 6. Horizontal Rules

- [ ] HR renders as a line
- [ ] HR color matches theme
- [ ] HR has proper spacing above/below
- [ ] Multiple consecutive HRs render correctly

## 7. Themes

### Light Theme
- [ ] Background is light
- [ ] Text is dark and readable
- [ ] Links are visible and distinct
- [ ] Code blocks have sufficient contrast
- [ ] Tables are clearly structured
- [ ] All elements are legible

### Dark Theme
- [ ] Background is dark
- [ ] Text is light and readable
- [ ] Links are visible in dark mode
- [ ] Code blocks have sufficient contrast
- [ ] Images are visible on dark background
- [ ] All elements maintain accessibility

### Custom Theme
- [ ] Theme editor appears when "Custom" is selected
- [ ] Changes to typography reflect immediately
- [ ] Changes to colors reflect immediately
- [ ] Changes to spacing reflect immediately
- [ ] Export theme downloads JSON file
- [ ] Import theme loads correctly
- [ ] Invalid theme JSON shows error

### Theme Switching
- [ ] Switching themes updates preview immediately
- [ ] No flash of unstyled content
- [ ] All elements update to new theme
- [ ] Theme persists between file loads

## 8. File Operations

### Loading Files
- [ ] Drag and drop .md file works
- [ ] Click to upload works
- [ ] File input accepts .md and .markdown
- [ ] File input rejects other file types
- [ ] Large files (>1MB) load successfully
- [ ] Files with special characters in name work
- [ ] UTF-8 encoded files work
- [ ] Files with emojis render correctly

### Paste Functionality
- [ ] Paste button triggers clipboard request
- [ ] Pasted markdown renders immediately
- [ ] Formatting is preserved
- [ ] Large pastes work (>50KB)

### Clear Function
- [ ] Clear button resets preview
- [ ] Clear button resets file input
- [ ] Clear button doesn't affect theme settings

## 9. Export

### Download HTML
- [ ] Download button generates file
- [ ] Filename matches source .md file
- [ ] Downloaded HTML is valid
- [ ] Downloaded HTML includes inline styles
- [ ] Downloaded HTML matches preview
- [ ] Theme is embedded correctly
- [ ] Metadata is included if present
- [ ] Opening downloaded HTML shows correct rendering

### Download ZIP (Future)
- [ ] ZIP contains index.html
- [ ] ZIP contains styles.css
- [ ] ZIP contains content.html
- [ ] All files in ZIP are valid

## 10. XSS Protection

**Test file:** `samples/sample-xss.md`

- [ ] `<script>alert('XSS')</script>` is stripped
- [ ] `<img src=x onerror=alert('XSS')>` is sanitized
- [ ] `<a href="javascript:alert('XSS')">` is blocked
- [ ] `<iframe src="...">` is removed
- [ ] `onclick="..."` attributes are removed
- [ ] Safe HTML tags are preserved
- [ ] No console errors from blocked scripts
- [ ] Sanitization report shows removed content

### Attack Vectors to Test
```markdown
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<a href="javascript:alert('XSS')">Click me</a>
<iframe src="https://evil.com"></iframe>
<object data="https://evil.com"></object>
<embed src="https://evil.com">
<link rel="import" href="https://evil.com">
<svg onload=alert('XSS')>
<body onload=alert('XSS')>
<input onfocus=alert('XSS') autofocus>
<details open ontoggle=alert('XSS')>
```

All should be sanitized without executing.

## 11. Responsive Layout

### Desktop (>768px)
- [ ] Sidebar is visible
- [ ] Preview takes remaining space
- [ ] Toolbar is accessible
- [ ] All controls are reachable

### Tablet (768px - 1024px)
- [ ] Layout adapts appropriately
- [ ] Sidebar can be toggled
- [ ] Content remains readable
- [ ] No horizontal scrolling (except tables/code)

### Mobile (<768px)
- [ ] Sidebar collapses
- [ ] Mobile toggle button appears
- [ ] Sidebar slides in when toggled
- [ ] Preview is full-width
- [ ] Text size is readable
- [ ] Buttons are touch-friendly (min 44x44px)
- [ ] Forms are usable
- [ ] Scrolling is smooth

### Orientation Change
- [ ] Layout adapts when rotating device
- [ ] No content loss on orientation change

## 12. Accessibility

### Keyboard Navigation
- [ ] Tab key navigates through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] File input can be opened via keyboard
- [ ] Theme selector works with keyboard
- [ ] Form fields can be filled via keyboard
- [ ] No keyboard traps
- [ ] Focus indicators are visible

### Screen Readers
- [ ] Page structure makes sense when read linearly
- [ ] Buttons have descriptive labels
- [ ] Form fields have associated labels
- [ ] Images have alt text
- [ ] ARIA labels are present where needed
- [ ] Live regions announce updates (preview changes)

### Color Contrast
- [ ] Text meets WCAG AA contrast ratio (4.5:1)
- [ ] Interactive elements are distinguishable
- [ ] Focus indicators are visible
- [ ] Link text is distinguishable from body text

### Visual Indicators
- [ ] Hover states are visible
- [ ] Active states are visible
- [ ] Disabled states are clear
- [ ] Loading states are communicated

## 13. Performance

### Large Documents
- [ ] Files >100KB load quickly (<2s)
- [ ] Files >1MB load without freezing
- [ ] Rendering stays smooth with long documents
- [ ] Theme switching is instant even with large docs

### Theme Changes
- [ ] Theme changes apply in <100ms
- [ ] No visible flash or reflow
- [ ] Smooth transition between themes

### Memory
- [ ] Multiple file loads don't cause memory leaks
- [ ] Clearing content frees memory
- [ ] No memory leaks from theme switching

## 14. Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Features to Verify Per Browser
- [ ] File drag-and-drop works
- [ ] Clipboard API works (paste)
- [ ] Download functionality works
- [ ] CSS custom properties apply
- [ ] All layouts render correctly

## 15. Edge Cases

### Empty Content
- [ ] Empty markdown shows placeholder
- [ ] Empty file loads without error
- [ ] Whitespace-only file handles gracefully

### Special Characters
- [ ] Unicode characters render (中文, العربية, 🎉)
- [ ] Emoji render correctly
- [ ] Mathematical symbols work (∑, ∫, π)
- [ ] Special punctuation works (—, …, ")

### Malformed Markdown
- [ ] Unclosed code blocks degrade gracefully
- [ ] Malformed tables don't break page
- [ ] Invalid frontmatter is handled
- [ ] Mixed line endings work (CRLF, LF)

### Stress Tests
- [ ] 1000+ line document
- [ ] 100+ heading document
- [ ] Very wide tables (20+ columns)
- [ ] Document with 100+ images
- [ ] Deeply nested lists (10+ levels)

## Checklist Summary

Before release, ensure:
- [ ] All markdown features work
- [ ] All themes apply correctly
- [ ] XSS protection is solid
- [ ] Export functionality works
- [ ] Responsive on all screen sizes
- [ ] Accessible to keyboard and screen readers
- [ ] Performance is acceptable
- [ ] Works in all target browsers
- [ ] No console errors
- [ ] Documentation is accurate

## Reporting Issues

When filing issues from manual tests, include:
1. Test case that failed
2. Expected behavior
3. Actual behavior
4. Browser/OS
5. Screenshot or video if visual issue
6. Console errors if applicable
7. Steps to reproduce
