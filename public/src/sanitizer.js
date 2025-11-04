/**
 * sanitizer.js - HTML sanitization to prevent XSS attacks
 * 
 * Uses DOMPurify to sanitize HTML output, removing dangerous tags,
 * attributes, and protocols that could execute scripts.
 */

import DOMPurify from 'dompurify';

/**
 * Default sanitization configuration
 */
const DEFAULT_CONFIG = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'strong', 'em', 'del', 'ins', 'mark', 'code', 'pre',
    'blockquote',
    'ul', 'ol', 'li',
    'a',
    'img',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'div', 'span',
    'input' // For task list checkboxes
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'alt', 'src',
    'class', 'id',
    'type', 'checked', 'disabled', // For checkboxes
    'align', 'colspan', 'rowspan' // For tables
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  KEEP_CONTENT: true,
  RETURN_TRUSTED_TYPE: false
};

/**
 * Sanitize HTML content to prevent XSS
 * @param {string} html - Raw HTML string
 * @param {object} config - Custom DOMPurify configuration
 * @returns {string} - Sanitized HTML
 */
export function sanitizeHtml(html, config = {}) {
  const sanitizerConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Create a sanitizer instance
  const clean = DOMPurify.sanitize(html, sanitizerConfig);
  
  return clean;
}

/**
 * Check if HTML contains potentially dangerous content
 * @param {string} html - HTML to check
 * @returns {boolean} - True if dangerous content was found
 */
export function hasDangerousContent(html) {
  const dangerous = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /on\w+\s*=/gi, // Event handlers like onclick, onload, etc.
    /javascript:/gi,
    /data:text\/html/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi
  ];
  
  return dangerous.some(pattern => pattern.test(html));
}

/**
 * Remove all potentially dangerous content and return a report
 * @param {string} html - HTML to sanitize
 * @returns {{ html: string, removed: string[] }}
 */
export function sanitizeWithReport(html) {
  const removed = [];
  
  // Check for dangerous patterns before sanitization
  if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(html)) {
    removed.push('script tags');
  }
  if (/on\w+\s*=/gi.test(html)) {
    removed.push('event handlers');
  }
  if (/javascript:/gi.test(html)) {
    removed.push('javascript: protocols');
  }
  if (/<iframe/gi.test(html)) {
    removed.push('iframe elements');
  }
  
  const sanitized = sanitizeHtml(html);
  
  return { html: sanitized, removed };
}

/**
 * Configure DOMPurify hooks (for advanced use cases)
 * @param {Function} hook - Hook function
 * @param {string} hookName - Name of the hook (e.g., 'afterSanitizeAttributes')
 */
export function addSanitizationHook(hookName, hook) {
  DOMPurify.addHook(hookName, hook);
}
