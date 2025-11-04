---
title: Complete Markdown Feature Demonstration
author: md2html Test Suite
description: A comprehensive article demonstrating all supported Markdown features
date: 2025-11-04
---

# Complete Markdown Feature Demonstration

This document demonstrates all the Markdown features supported by md2html, including headings, emphasis, lists, links, images, tables, code blocks, and more.

## Headings

Headings from H1 to H4 are fully supported with automatic ID generation for anchor linking.

### Level 3 Heading

This is a level 3 heading with some body text explaining the feature.

#### Level 4 Heading

Even level 4 headings render correctly with appropriate sizing and spacing.

## Text Formatting

### Basic Emphasis

You can make text **bold** using double asterisks or __double underscores__.

You can make text *italic* using single asterisks or _single underscores_.

You can combine ***bold and italic*** for extra emphasis.

You can also use ~~strikethrough~~ to mark deleted or outdated text.

### Inline Elements

Here's an inline `code snippet` that stands out from regular text.

You can also create [links to external sites](https://example.com) or [links with titles](https://example.com "Example Site Title").

## Lists

### Unordered Lists

- First item in the list
- Second item in the list
- Third item with sub-items:
  - Nested item 1
  - Nested item 2
    - Deeply nested item
    - Another deeply nested item
  - Back to second level
- Fourth item at root level

### Ordered Lists

1. First step in the process
2. Second step in the process
3. Third step with sub-steps:
   1. Sub-step A
   2. Sub-step B
   3. Sub-step C
4. Fourth and final step

### Mixed Lists

1. First ordered item
2. Second ordered item with bullets:
   - Bullet point A
   - Bullet point B
     1. Nested ordered item
     2. Another nested ordered item
   - Bullet point C
3. Back to ordered list

### Task Lists

- [x] Completed task
- [x] Another completed task
- [ ] Pending task
- [ ] Another pending task with sub-tasks:
  - [x] Completed sub-task
  - [ ] Pending sub-task

## Blockquotes

> This is a blockquote. It's used for highlighting important text or quoting other sources.
> 
> Blockquotes can span multiple paragraphs.

> You can also nest blockquotes:
> 
> > This is a nested blockquote.
> > It has its own indentation level.
> 
> Back to the outer blockquote.

## Code Blocks

### JavaScript Example

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

const message = greet('World');
console.log(message);
```

### Python Example

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(fibonacci(i))
```

### HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

### Shell Commands

```bash
npm install
npm run build
npm test
```

### Code Without Language

```
Plain text code block
No syntax highlighting
Just monospace font
```

## Tables

### Basic Table

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |
| Row 3, Col 1 | Row 3, Col 2 | Row 3, Col 3 |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |
| 123 | 456 | 789 |

### Table with Various Content

| Feature | Status | Priority | Notes |
|---------|:------:|---------:|-------|
| Markdown parsing | ✅ Done | High | Fully implemented |
| Theme system | ✅ Done | High | Light, dark, custom |
| Export HTML | ✅ Done | Medium | Single file export |
| Export PDF | ⏳ Planned | Low | Future enhancement |

## Horizontal Rules

You can create horizontal rules to separate sections:

---

Above and below this line are horizontal rules.

---

They create visual separation between content blocks.

## Links and Images

### Links

Visit the [md2html documentation](https://github.com) for more information.

You can also use [reference-style links][ref-link] that are defined elsewhere.

[ref-link]: https://example.com "Reference Link Title"

### Images

![Sample Image](https://via.placeholder.com/600x300 "A sample placeholder image")

Images support alt text and titles for accessibility.

## Advanced Features

### Nested Structures

Here's a complex nested structure:

1. Top-level ordered item
   - Nested unordered item
     > Nested blockquote
     > 
     > With multiple lines
   - Another nested item with `inline code`
2. Second top-level item

### Long Content

This paragraph contains a very long line of text to test how the renderer handles text wrapping and line breaks. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Special Characters

Testing special characters: © ™ ® ¶ § † ‡ • ∑ ∏ √ ∞ ≈ ≠ ≤ ≥

Testing emoji: 🎉 🚀 ✨ 💡 📝 🔥 ⚡ 🎨

## Conclusion

This document demonstrates all major Markdown features supported by md2html. Each feature should render correctly with the selected theme applied.

---

**Generated by md2html** - A lightweight Markdown to HTML converter
