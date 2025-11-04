/**
 * parser.js - Markdown parsing wrapper using marked
 * 
 * Why marked? It's lightweight (~50KB minified), fast, well-maintained,
 * and supports GFM (GitHub Flavored Markdown) out of the box including
 * tables, task lists, and autolinks. It has a simple API and is highly
 * extensible if we need custom rendering later.
 */

import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

// Configure marked with GFM and heading IDs
marked.use({
  gfm: true,
  breaks: false,
  pedantic: false,
});

// Add heading IDs for anchor links
marked.use(gfmHeadingId());

/**
 * Extracts YAML frontmatter from markdown content
 * @param {string} markdown - Raw markdown with optional frontmatter
 * @returns {{ content: string, metadata: object|null }}
 */
export function extractFrontmatter(markdown) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) {
    return { content: markdown, metadata: null };
  }

  const frontmatterText = match[1];
  const content = markdown.slice(match[0].length);
  
  // Simple YAML parser (supports key: value pairs)
  const metadata = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      metadata[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
    }
  }
  
  return { content, metadata: Object.keys(metadata).length > 0 ? metadata : null };
}

/**
 * Parse markdown to HTML
 * @param {string} markdown - Raw markdown string
 * @param {object} options - Parse options
 * @param {boolean} options.extractMetadata - Whether to extract frontmatter
 * @returns {Promise<{ html: string, metadata: object|null }>}
 */
export async function parseMarkdown(markdown, options = {}) {
  const { extractMetadata = true } = options;
  
  let content = markdown;
  let metadata = null;
  
  // Extract frontmatter if requested
  if (extractMetadata) {
    const extracted = extractFrontmatter(markdown);
    content = extracted.content;
    metadata = extracted.metadata;
  }
  
  // Parse markdown to HTML
  const html = await marked.parse(content);
  
  return { html, metadata };
}

/**
 * Configure marked with custom renderer options
 * @param {object} rendererOptions - Custom renderer configuration
 */
export function configureParser(rendererOptions = {}) {
  const renderer = new marked.Renderer();
  
  // Apply custom renderer options
  Object.assign(renderer, rendererOptions);
  
  marked.use({ renderer });
}
