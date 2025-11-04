/**
 * index.js - Public API entry point for md2html library
 * 
 * Exposes the main functions for parsing markdown, applying themes,
 * and generating full HTML documents.
 */

import { parseMarkdown } from './parser.js';
import { sanitizeHtml, sanitizeWithReport, hasDangerousContent } from './sanitizer.js';
import { 
  themes, 
  applyTheme, 
  applyThemeWithStyles,
  exportTheme, 
  importTheme, 
  cloneTheme,
  mergeTheme,
  themeToCssVariables 
} from './theme.js';

/**
 * Parse markdown to HTML
 * @param {string} markdown - Raw markdown string
 * @param {object} options - Parse options
 * @param {boolean} options.sanitize - Whether to sanitize output (default: true)
 * @param {boolean} options.extractMetadata - Whether to extract frontmatter (default: true)
 * @returns {Promise<{ html: string, metadata: object|null }>}
 */
export async function parse(markdown, options = {}) {
  const { sanitize = true, extractMetadata = true } = options;
  
  // Parse markdown
  const result = await parseMarkdown(markdown, { extractMetadata });
  
  // Sanitize if requested
  if (sanitize) {
    result.html = sanitizeHtml(result.html);
  }
  
  return result;
}

/**
 * Convert HTML fragment to a full HTML document with theme
 * @param {string} htmlFragment - HTML content (body)
 * @param {object} theme - Theme object
 * @param {object} options - Generation options
 * @param {boolean} options.inlineStyles - Inline CSS vs. linked (default: true)
 * @param {string} options.title - Document title (default: 'Markdown Document')
 * @param {object} options.metadata - Document metadata
 * @returns {string} - Complete HTML document
 */
export function toFullHtml(htmlFragment, theme, options = {}) {
  const { 
    inlineStyles = true, 
    title = 'Markdown Document',
    metadata = null 
  } = options;
  
  const cssVariables = themeToCssVariables(theme);
  
  // Generate meta tags from metadata
  let metaTags = '';
  if (metadata) {
    if (metadata.author) metaTags += `  <meta name="author" content="${metadata.author}">\n`;
    if (metadata.description) metaTags += `  <meta name="description" content="${metadata.description}">\n`;
    if (metadata.keywords) metaTags += `  <meta name="keywords" content="${metadata.keywords}">\n`;
  }
  
  // Build the full HTML document
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="md2html">
${metaTags}  <title>${title}</title>
  ${inlineStyles ? `<style>
    :root {
      ${cssVariables}
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      line-height: var(--line-height);
      color: var(--color-text);
      background-color: var(--color-background);
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .md-preview {
      background: var(--color-surface);
      padding: 2rem;
      border-radius: 0.5rem;
    }
    
    .md-preview h1 {
      font-size: var(--h1-size);
      font-weight: var(--h1-weight);
      color: var(--color-headings);
      margin-bottom: var(--spacing-block);
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-border);
    }
    
    .md-preview h2 {
      font-size: var(--h2-size);
      font-weight: var(--h2-weight);
      color: var(--color-headings);
      margin-top: var(--spacing-block);
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-preview h3 {
      font-size: var(--h3-size);
      font-weight: var(--h3-weight);
      color: var(--color-headings);
      margin-top: var(--spacing-block);
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-preview h4 {
      font-size: var(--h4-size);
      font-weight: var(--h4-weight);
      color: var(--color-headings);
      margin-top: var(--spacing-paragraph);
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-preview p {
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-preview a {
      color: var(--color-links);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.2s;
    }
    
    .md-preview a:hover {
      color: var(--color-links-hover);
      border-bottom-color: var(--color-links-hover);
    }
    
    .md-preview strong {
      font-weight: 600;
    }
    
    .md-preview em {
      font-style: italic;
    }
    
    .md-preview del {
      text-decoration: line-through;
      opacity: 0.7;
    }
    
    .md-preview code {
      font-family: var(--code-font-family);
      font-size: var(--code-font-size);
      background: var(--color-inline-code-bg);
      color: var(--color-inline-code-text);
      padding: 0.2em 0.4em;
      border-radius: 0.25rem;
    }
    
    .md-preview pre {
      background: var(--color-code-bg);
      color: var(--color-code-text);
      padding: var(--code-block-padding);
      border-radius: var(--code-border-radius);
      overflow-x: auto;
      margin-bottom: var(--spacing-block);
      line-height: var(--code-line-height);
    }
    
    .md-preview pre code {
      background: none;
      color: inherit;
      padding: 0;
      font-size: var(--code-font-size);
    }
    
    .md-preview blockquote {
      border-left: 4px solid var(--color-blockquote-border);
      background: var(--color-blockquote-bg);
      padding: 1rem 1.5rem;
      margin: var(--spacing-block) 0;
      font-style: italic;
    }
    
    .md-preview ul, .md-preview ol {
      margin-bottom: var(--spacing-block);
      padding-left: var(--list-nested-indent);
    }
    
    .md-preview ul {
      list-style-type: var(--list-bullet-style);
    }
    
    .md-preview ol {
      list-style-type: var(--list-ordered-style);
    }
    
    .md-preview li {
      margin-bottom: var(--spacing-list);
    }
    
    .md-preview li > ul,
    .md-preview li > ol {
      margin-top: var(--spacing-list);
      margin-bottom: 0;
    }
    
    .md-preview table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: var(--spacing-block);
      overflow-x: auto;
      display: block;
    }
    
    .md-preview thead {
      background: var(--color-table-header);
    }
    
    .md-preview th,
    .md-preview td {
      padding: var(--table-cell-padding);
      border: var(--table-border-width) var(--table-border-style) var(--color-border);
      text-align: left;
    }
    
    .md-preview th {
      font-weight: 600;
    }
    
    .md-preview tbody tr:nth-child(even) {
      background: var(--color-table-row-alt);
    }
    
    .md-preview tbody tr:nth-child(odd) {
      background: var(--color-table-row);
    }
    
    .md-preview img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: var(--spacing-block) 0;
      border-radius: 0.375rem;
    }
    
    .md-preview hr {
      border: none;
      border-top: 2px solid var(--color-border);
      margin: var(--spacing-block) 0;
    }
    
    .md-preview input[type="checkbox"] {
      margin-right: 0.5rem;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }
      
      .md-preview {
        padding: 1rem;
      }
    }
  </style>` : '<link rel="stylesheet" href="styles.css">'}
</head>
<body>
  <div class="md-preview">
    ${htmlFragment}
  </div>
</body>
</html>`;
  
  return html;
}

/**
 * Apply theme to preview container in DOM (legacy - requires manual CSS)
 * @param {object} theme - Theme object
 * @param {HTMLElement} container - Container element
 */
export { applyTheme };

/**
 * Apply theme with complete CSS styles automatically injected
 * @param {object} theme - Theme object
 * @param {HTMLElement} container - Container element
 * @param {object} options - Options for styling
 */
export { applyThemeWithStyles };

/**
 * Export theme as JSON
 * @param {object} theme - Theme object
 * @returns {string} - JSON string
 */
export { exportTheme };

/**
 * Import theme from JSON
 * @param {string} json - JSON string
 * @returns {object} - Theme object
 */
export { importTheme };

/**
 * Clone theme
 * @param {object} theme - Theme object
 * @returns {object} - Cloned theme
 */
export { cloneTheme };

/**
 * Merge theme with overrides
 * @param {object} baseTheme - Base theme
 * @param {object} overrides - Overrides
 * @returns {object} - Merged theme
 */
export { mergeTheme };

/**
 * Available themes
 */
export { themes };

/**
 * Sanitization utilities
 */
export { sanitizeHtml, sanitizeWithReport, hasDangerousContent };

// Default export
export default {
  parse,
  toFullHtml,
  applyTheme,
  applyThemeWithStyles,
  exportTheme,
  importTheme,
  cloneTheme,
  mergeTheme,
  themes,
  sanitizeHtml,
  sanitizeWithReport,
  hasDangerousContent
};
