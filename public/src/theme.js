/**
 * theme.js - Theme engine with built-in themes and custom theme support
 * 
 * Provides light, dark, and custom themes with full runtime editing capability.
 * Themes are applied via CSS variables for easy switching.
 */

/**
 * Built-in light theme
 */
export const lightTheme = {
  name: 'light',
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    baseFontSize: '16px',
    lineHeight: 1.6,
    h1: { size: '2rem', weight: 700 },
    h2: { size: '1.5rem', weight: 600 },
    h3: { size: '1.25rem', weight: 600 },
    h4: { size: '1rem', weight: 600 }
  },
  colors: {
    background: '#ffffff',
    surface: '#f8f9fb',
    text: '#111827',
    headings: '#0f172a',
    links: '#1d4ed8',
    linksHover: '#1e40af',
    codeBackground: '#0b1220',
    codeText: '#e6edf3',
    inlineCodeBg: '#e5e7eb',
    inlineCodeText: '#374151',
    tableHeader: '#eef2ff',
    tableRow: '#ffffff',
    tableRowAlt: '#f9fafb',
    border: '#e5e7eb',
    blockquoteBorder: '#d1d5db',
    blockquoteBg: '#f9fafb'
  },
  spacing: {
    paragraphSpacing: '1rem',
    listSpacing: '0.5rem',
    blockSpacing: '1.5rem'
  },
  tables: {
    borderStyle: 'solid',
    borderWidth: '1px',
    zebra: true,
    cellPadding: '0.75rem'
  },
  code: {
    fontFamily: "Menlo, Monaco, 'Courier New', monospace",
    fontSize: '0.95rem',
    lineHeight: 1.5,
    blockPadding: '1rem',
    borderRadius: '0.375rem'
  },
  lists: {
    bulletStyle: 'disc',
    orderedStyle: 'decimal',
    nestedIndent: '1.5rem'
  }
};

/**
 * Built-in dark theme
 */
export const darkTheme = {
  name: 'dark',
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    baseFontSize: '16px',
    lineHeight: 1.6,
    h1: { size: '2rem', weight: 700 },
    h2: { size: '1.5rem', weight: 600 },
    h3: { size: '1.25rem', weight: 600 },
    h4: { size: '1rem', weight: 600 }
  },
  colors: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#e2e8f0',
    headings: '#f1f5f9',
    links: '#60a5fa',
    linksHover: '#93c5fd',
    codeBackground: '#020617',
    codeText: '#e2e8f0',
    inlineCodeBg: '#334155',
    inlineCodeText: '#e2e8f0',
    tableHeader: '#1e293b',
    tableRow: '#0f172a',
    tableRowAlt: '#1e293b',
    border: '#334155',
    blockquoteBorder: '#475569',
    blockquoteBg: '#1e293b'
  },
  spacing: {
    paragraphSpacing: '1rem',
    listSpacing: '0.5rem',
    blockSpacing: '1.5rem'
  },
  tables: {
    borderStyle: 'solid',
    borderWidth: '1px',
    zebra: true,
    cellPadding: '0.75rem'
  },
  code: {
    fontFamily: "Menlo, Monaco, 'Courier New', monospace",
    fontSize: '0.95rem',
    lineHeight: 1.5,
    blockPadding: '1rem',
    borderRadius: '0.375rem'
  },
  lists: {
    bulletStyle: 'disc',
    orderedStyle: 'decimal',
    nestedIndent: '1.5rem'
  }
};

/**
 * Default custom theme (matches light theme initially)
 */
export const customTheme = { ...lightTheme, name: 'custom' };

/**
 * All available themes
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  custom: customTheme
};

/**
 * Convert theme object to CSS variables
 * @param {object} theme - Theme object
 * @returns {string} - CSS variables as a string
 */
export function themeToCssVariables(theme) {
  return `
    --font-family: ${theme.typography.fontFamily};
    --font-size-base: ${theme.typography.baseFontSize};
    --line-height: ${theme.typography.lineHeight};
    --h1-size: ${theme.typography.h1.size};
    --h1-weight: ${theme.typography.h1.weight};
    --h2-size: ${theme.typography.h2.size};
    --h2-weight: ${theme.typography.h2.weight};
    --h3-size: ${theme.typography.h3.size};
    --h3-weight: ${theme.typography.h3.weight};
    --h4-size: ${theme.typography.h4.size};
    --h4-weight: ${theme.typography.h4.weight};
    
    --color-background: ${theme.colors.background};
    --color-surface: ${theme.colors.surface};
    --color-text: ${theme.colors.text};
    --color-headings: ${theme.colors.headings};
    --color-links: ${theme.colors.links};
    --color-links-hover: ${theme.colors.linksHover};
    --color-code-bg: ${theme.colors.codeBackground};
    --color-code-text: ${theme.colors.codeText};
    --color-inline-code-bg: ${theme.colors.inlineCodeBg};
    --color-inline-code-text: ${theme.colors.inlineCodeText};
    --color-table-header: ${theme.colors.tableHeader};
    --color-table-row: ${theme.colors.tableRow};
    --color-table-row-alt: ${theme.colors.tableRowAlt};
    --color-border: ${theme.colors.border};
    --color-blockquote-border: ${theme.colors.blockquoteBorder};
    --color-blockquote-bg: ${theme.colors.blockquoteBg};
    
    --spacing-paragraph: ${theme.spacing.paragraphSpacing};
    --spacing-list: ${theme.spacing.listSpacing};
    --spacing-block: ${theme.spacing.blockSpacing};
    
    --table-border-style: ${theme.tables.borderStyle};
    --table-border-width: ${theme.tables.borderWidth};
    --table-cell-padding: ${theme.tables.cellPadding};
    
    --code-font-family: ${theme.code.fontFamily};
    --code-font-size: ${theme.code.fontSize};
    --code-line-height: ${theme.code.lineHeight};
    --code-block-padding: ${theme.code.blockPadding};
    --code-border-radius: ${theme.code.borderRadius};
    
    --list-bullet-style: ${theme.lists.bulletStyle};
    --list-ordered-style: ${theme.lists.orderedStyle};
    --list-nested-indent: ${theme.lists.nestedIndent};
  `.trim();
}

/**
 * Generate complete CSS styles for markdown content with theme variables
 * @param {object} theme - Theme object
 * @returns {string} - Complete CSS styles
 */
function generateMarkdownCSS(theme) {
  const cssVariables = themeToCssVariables(theme);
  
  return `
    :root {
      ${cssVariables}
    }
    
    .md-content {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      line-height: var(--line-height);
      color: var(--color-text);
      background: var(--color-surface);
      padding: 1.5rem;
      border-radius: 0.5rem;
    }
    
    .md-content h1 {
      font-size: var(--h1-size);
      font-weight: var(--h1-weight);
      color: var(--color-headings);
      margin-bottom: var(--spacing-block);
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-border);
    }
    
    .md-content h2 {
      font-size: var(--h2-size);
      font-weight: var(--h2-weight);
      color: var(--color-headings);
      margin-top: var(--spacing-block);
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-content h3 {
      font-size: var(--h3-size);
      font-weight: var(--h3-weight);
      color: var(--color-headings);
      margin-top: var(--spacing-block);
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-content h4 {
      font-size: var(--h4-size);
      font-weight: var(--h4-weight);
      color: var(--color-headings);
      margin-top: var(--spacing-paragraph);
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-content p {
      margin-bottom: var(--spacing-paragraph);
    }
    
    .md-content a {
      color: var(--color-links);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.2s;
    }
    
    .md-content a:hover {
      color: var(--color-links-hover);
      border-bottom-color: var(--color-links-hover);
    }
    
    .md-content strong {
      font-weight: 600;
    }
    
    .md-content em {
      font-style: italic;
    }
    
    .md-content del {
      text-decoration: line-through;
      opacity: 0.7;
    }
    
    .md-content code {
      font-family: var(--code-font-family);
      font-size: var(--code-font-size);
      background: var(--color-inline-code-bg);
      color: var(--color-inline-code-text);
      padding: 0.2em 0.4em;
      border-radius: 0.25rem;
    }
    
    .md-content pre {
      background: var(--color-code-bg);
      color: var(--color-code-text);
      padding: var(--code-block-padding);
      border-radius: var(--code-border-radius);
      overflow-x: auto;
      margin-bottom: var(--spacing-block);
      line-height: var(--code-line-height);
    }
    
    .md-content pre code {
      background: none;
      color: inherit;
      padding: 0;
      font-size: var(--code-font-size);
    }
    
    .md-content blockquote {
      border-left: 4px solid var(--color-blockquote-border);
      background: var(--color-blockquote-bg);
      padding: 1rem 1.5rem;
      margin: var(--spacing-block) 0;
      font-style: italic;
    }
    
    .md-content ul, .md-content ol {
      margin-bottom: var(--spacing-block);
      padding-left: var(--list-nested-indent);
    }
    
    .md-content ul {
      list-style-type: var(--list-bullet-style);
    }
    
    .md-content ol {
      list-style-type: var(--list-ordered-style);
    }
    
    .md-content li {
      margin-bottom: var(--spacing-list);
    }
    
    .md-content li > ul,
    .md-content li > ol {
      margin-top: var(--spacing-list);
      margin-bottom: 0;
    }
    
    .md-content table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: var(--spacing-block);
    }
    
    .md-content thead {
      background: var(--color-table-header);
    }
    
    .md-content th,
    .md-content td {
      padding: var(--table-cell-padding);
      border: var(--table-border-width) var(--table-border-style) var(--color-border);
      text-align: left;
    }
    
    .md-content th {
      font-weight: 600;
    }
    
    .md-content tbody tr:nth-child(even) {
      background: var(--color-table-row-alt);
    }
    
    .md-content tbody tr:nth-child(odd) {
      background: var(--color-table-row);
    }
    
    .md-content img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: var(--spacing-block) 0;
      border-radius: 0.375rem;
    }
    
    .md-content hr {
      border: none;
      border-top: 2px solid var(--color-border);
      margin: var(--spacing-block) 0;
    }
    
    .md-content input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  `.trim();
}

/**
 * Apply theme to a container element via CSS variables (legacy)
 * @param {object} theme - Theme object
 * @param {HTMLElement} container - Container element (defaults to document.documentElement)
 */
export function applyTheme(theme, container = document.documentElement) {
  const cssVars = themeToCssVariables(theme);
  const lines = cssVars.split('\n');
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const prop = trimmed.slice(0, colonIndex).trim();
      const value = trimmed.slice(colonIndex + 1).trim().replace(/;$/, '');
      container.style.setProperty(prop, value);
    }
  });
}

/**
 * Apply theme with complete CSS styles automatically injected
 * @param {object} theme - Theme object
 * @param {HTMLElement} container - Container element
 * @param {object} options - Options for styling
 */
export function applyThemeWithStyles(theme, container, options = {}) {
  const { 
    addClassName = true,
    styleId = 'md2html-theme-styles'
  } = options;
  
  // Add CSS class to container for styling
  if (addClassName && !container.classList.contains('md-content')) {
    container.classList.add('md-content');
  }
  
  // Remove existing style tag if it exists
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Create and inject new style tag
  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  styleTag.textContent = generateMarkdownCSS(theme);
  document.head.appendChild(styleTag);
}

/**
 * Export theme as JSON string
 * @param {object} theme - Theme object
 * @returns {string} - JSON representation of theme
 */
export function exportTheme(theme) {
  return JSON.stringify(theme, null, 2);
}

/**
 * Import theme from JSON string
 * @param {string} json - JSON string
 * @returns {object} - Theme object
 */
export function importTheme(json) {
  try {
    const theme = JSON.parse(json);
    // Validate theme has required structure
    if (!theme.typography || !theme.colors || !theme.spacing) {
      throw new Error('Invalid theme structure');
    }
    return theme;
  } catch (error) {
    throw new Error(`Failed to import theme: ${error.message}`);
  }
}

/**
 * Clone a theme object (deep copy)
 * @param {object} theme - Theme to clone
 * @returns {object} - Cloned theme
 */
export function cloneTheme(theme) {
  return JSON.parse(JSON.stringify(theme));
}

/**
 * Merge theme overrides into a base theme
 * @param {object} baseTheme - Base theme
 * @param {object} overrides - Override values
 * @returns {object} - Merged theme
 */
export function mergeTheme(baseTheme, overrides) {
  const merged = cloneTheme(baseTheme);
  
  // Deep merge
  for (const key in overrides) {
    if (typeof overrides[key] === 'object' && !Array.isArray(overrides[key])) {
      merged[key] = { ...merged[key], ...overrides[key] };
    } else {
      merged[key] = overrides[key];
    }
  }
  
  return merged;
}
