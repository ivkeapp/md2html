import { describe, it, expect } from 'vitest';
import { sanitizeHtml, hasDangerousContent, sanitizeWithReport } from '../../public/src/sanitizer.js';

describe('Sanitizer', () => {
  describe('sanitizeHtml', () => {
    it('should remove script tags', () => {
      const input = '<p>Safe</p><script>alert("xss")</script>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<script>');
      expect(result).toContain('<p>Safe</p>');
    });

    it('should remove event handlers', () => {
      const input = '<div onclick="alert(\'xss\')">Click me</div>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('onclick');
      expect(result).toContain('Click me');
    });

    it('should remove javascript: protocol', () => {
      const input = '<a href="javascript:alert(\'xss\')">Click</a>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('javascript:');
    });

    it('should remove iframe tags', () => {
      const input = '<iframe src="evil.com"></iframe>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<iframe');
    });

    it('should remove object tags', () => {
      const input = '<object data="evil.com"></object>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<object');
    });

    it('should remove embed tags', () => {
      const input = '<embed src="evil.com">';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<embed');
    });

    it('should preserve safe HTML', () => {
      const input = '<h1>Title</h1><p><strong>Bold</strong> and <em>italic</em></p>';
      const result = sanitizeHtml(input);
      expect(result).toContain('<h1>Title</h1>');
      expect(result).toContain('<strong>Bold</strong>');
      expect(result).toContain('<em>italic</em>');
    });

    it('should preserve links with safe URLs', () => {
      const input = '<a href="https://example.com">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('Link');
    });

    it('should preserve images', () => {
      const input = '<img src="image.jpg" alt="Test">';
      const result = sanitizeHtml(input);
      expect(result).toContain('src="image.jpg"');
      expect(result).toContain('alt="Test"');
    });

    it('should preserve tables', () => {
      const input = '<table><tr><th>Header</th></tr><tr><td>Data</td></tr></table>';
      const result = sanitizeHtml(input);
      expect(result).toContain('<table>');
      expect(result).toContain('<th>Header</th>');
      expect(result).toContain('<td>Data</td>');
    });

    it('should handle task list checkboxes', () => {
      const input = '<input type="checkbox" checked disabled>';
      const result = sanitizeHtml(input);
      expect(result).toContain('type="checkbox"');
      expect(result).toContain('checked');
    });

    it('should handle empty input', () => {
      const result = sanitizeHtml('');
      expect(result).toBe('');
    });

    it('should handle plain text', () => {
      const input = 'Just plain text';
      const result = sanitizeHtml(input);
      expect(result).toBe('Just plain text');
    });
  });

  describe('hasDangerousContent', () => {
    it('should detect script tags', () => {
      expect(hasDangerousContent('<script>alert("xss")</script>')).toBe(true);
    });

    it('should detect event handlers', () => {
      expect(hasDangerousContent('<div onclick="evil()">Test</div>')).toBe(true);
      expect(hasDangerousContent('<img src=x onerror="evil()">')).toBe(true);
    });

    it('should detect javascript: protocol', () => {
      expect(hasDangerousContent('<a href="javascript:alert()">Link</a>')).toBe(true);
    });

    it('should detect data:text/html', () => {
      expect(hasDangerousContent('<a href="data:text/html,<script>alert()</script>">Link</a>')).toBe(true);
    });

    it('should detect iframe tags', () => {
      expect(hasDangerousContent('<iframe src="evil.com"></iframe>')).toBe(true);
    });

    it('should detect object tags', () => {
      expect(hasDangerousContent('<object data="evil.com"></object>')).toBe(true);
    });

    it('should detect embed tags', () => {
      expect(hasDangerousContent('<embed src="evil.com">')).toBe(true);
    });

    it('should return false for safe content', () => {
      expect(hasDangerousContent('<p>Safe paragraph</p>')).toBe(false);
      expect(hasDangerousContent('<a href="https://example.com">Safe link</a>')).toBe(false);
      expect(hasDangerousContent('<img src="image.jpg" alt="Safe image">')).toBe(false);
    });
  });

  describe('sanitizeWithReport', () => {
    it('should report removed script tags', () => {
      const input = '<script>alert("xss")</script><p>Safe</p>';
      const result = sanitizeWithReport(input);
      expect(result.html).not.toContain('<script>');
      expect(result.removed).toContain('script tags');
    });

    it('should report removed event handlers', () => {
      const input = '<div onclick="evil()">Test</div>';
      const result = sanitizeWithReport(input);
      expect(result.removed).toContain('event handlers');
    });

    it('should report removed javascript: protocols', () => {
      const input = '<a href="javascript:alert()">Link</a>';
      const result = sanitizeWithReport(input);
      expect(result.removed).toContain('javascript: protocols');
    });

    it('should report removed iframes', () => {
      const input = '<iframe src="evil.com"></iframe>';
      const result = sanitizeWithReport(input);
      expect(result.removed).toContain('iframe elements');
    });

    it('should report multiple issues', () => {
      const input = '<script>alert()</script><div onclick="evil()">Test</div>';
      const result = sanitizeWithReport(input);
      expect(result.removed.length).toBeGreaterThan(0);
      expect(result.removed).toContain('script tags');
      expect(result.removed).toContain('event handlers');
    });

    it('should return empty array for safe content', () => {
      const input = '<p>Safe content</p>';
      const result = sanitizeWithReport(input);
      expect(result.removed).toEqual([]);
    });
  });
});
