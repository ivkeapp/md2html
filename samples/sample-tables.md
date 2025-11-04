# Table Test Cases

This document contains various table scenarios to test edge cases and complex layouts.

## Basic Table

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Table with Alignment

| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |
| L3   | C3     | R3    |

## Wide Table

| Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 | Col 7 | Col 8 | Col 9 | Col 10 |
|-------|-------|-------|-------|-------|-------|-------|-------|-------|--------|
| A1    | B1    | C1    | D1    | E1    | F1    | G1    | H1    | I1    | J1     |
| A2    | B2    | C2    | D2    | E2    | F2    | G2    | H2    | I2    | J2     |
| A3    | B3    | C3    | D3    | E3    | F3    | G3    | H3    | I3    | J3     |

## Table with Long Content

| Feature | Description | Status |
|---------|-------------|--------|
| Markdown Parsing | Full GitHub Flavored Markdown support including tables, task lists, strikethrough, and autolinks | ✅ Complete |
| Theme System | Comprehensive theming with light, dark, and fully customizable themes using CSS variables | ✅ Complete |
| Sanitization | XSS protection using DOMPurify to strip dangerous HTML while preserving safe content | ✅ Complete |
| Export | Single-file HTML export with embedded CSS and support for future PDF export | ✅ Complete |

## Table with Code and Links

| Language | Example | Documentation |
|----------|---------|---------------|
| JavaScript | `const x = 10;` | [MDN](https://developer.mozilla.org) |
| Python | `x = 10` | [Python Docs](https://docs.python.org) |
| Go | `x := 10` | [Go Docs](https://golang.org/doc) |

## Table with Emphasis

| **Bold** | *Italic* | ~~Strike~~ |
|----------|----------|------------|
| **Text** | *Text*   | ~~Text~~   |
| **More** | *More*   | ~~More~~   |

## Single Column Table

| Single Column |
|---------------|
| Row 1         |
| Row 2         |
| Row 3         |

## Single Row Table

| Col 1 | Col 2 | Col 3 | Col 4 | Col 5 |
|-------|-------|-------|-------|-------|

## Empty Cells Table

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data     |          | Data     |
|          | Data     |          |
| Data     | Data     |          |

## Table with Numbers

| Product | Price | Quantity | Total |
|---------|------:|:--------:|------:|
| Widget A | $19.99 | 5 | $99.95 |
| Widget B | $29.99 | 3 | $89.97 |
| Widget C | $9.99 | 10 | $99.90 |
| **Total** | - | **18** | **$289.82** |

## Table with Special Characters

| Symbol | Unicode | Name |
|--------|---------|------|
| © | U+00A9 | Copyright |
| ™ | U+2122 | Trademark |
| ® | U+00AE | Registered |
| € | U+20AC | Euro |
| ¥ | U+00A5 | Yen |
| £ | U+00A3 | Pound |

## Nested Lists in Table

| Task | Sub-tasks | Status |
|------|-----------|--------|
| Development | - Design<br>- Code<br>- Test | In Progress |
| Documentation | - API docs<br>- User guide | Pending |
| Deployment | - Build<br>- Deploy<br>- Monitor | Not Started |

## Table with Inline HTML (should be sanitized)

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Normal text | <strong>HTML strong</strong> | More text |
| Data | <em>HTML emphasis</em> | Data |

## Very Long Cell Content

| ID | Title | Description |
|----|-------|-------------|
| 1 | Short | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. |
| 2 | Medium | Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. |
| 3 | Long | Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. |

## Table with Mixed Alignments

| Name | Age | Email | Status |
|:-----|:---:|:------|-------:|
| Alice | 25 | alice@example.com | Active |
| Bob | 30 | bob@example.com | Active |
| Charlie | 35 | charlie@example.com | Inactive |
| Diana | 28 | diana@example.com | Active |

## Minimal Table

| A | B |
|---|---|
| 1 | 2 |

## Table with Unicode and Emoji

| Language | Greeting | Flag |
|----------|----------|------|
| English | Hello | 🇬🇧 |
| Spanish | Hola | 🇪🇸 |
| French | Bonjour | 🇫🇷 |
| Japanese | こんにちは | 🇯🇵 |
| Chinese | 你好 | 🇨🇳 |
| Arabic | مرحبا | 🇸🇦 |

## Conclusion

These test cases cover various table scenarios including:
- Basic structure
- Alignment options
- Wide tables (horizontal scroll)
- Long content (text wrapping)
- Empty cells
- Single row/column
- Special characters and Unicode
- Nested content
- Mixed formatting

All tables should render correctly with proper styling from the active theme.
