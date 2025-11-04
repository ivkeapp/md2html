import { describe, it, expect } from 'vitest';
import { parseMarkdown, extractFrontmatter } from '../../src/parser.js';

describe('Parser', () => {
  describe('parseMarkdown', () => {
    it('should parse headings correctly', async () => {
      const result = await parseMarkdown('# Hello World');
      expect(result.html).toContain('<h1');
      expect(result.html).toContain('Hello World');
      expect(result.html).toContain('id="hello-world"');
    });

    it('should parse multiple heading levels', async () => {
      const markdown = `# H1\n## H2\n### H3\n#### H4`;
      const result = await parseMarkdown(markdown);
      expect(result.html).toContain('<h1');
      expect(result.html).toContain('<h2');
      expect(result.html).toContain('<h3');
      expect(result.html).toContain('<h4');
    });

    it('should parse paragraphs', async () => {
      const result = await parseMarkdown('This is a paragraph.');
      expect(result.html).toContain('<p>');
      expect(result.html).toContain('This is a paragraph.');
    });

    it('should parse bold text', async () => {
      const result = await parseMarkdown('**bold text**');
      expect(result.html).toContain('<strong>');
      expect(result.html).toContain('bold text');
    });

    it('should parse italic text', async () => {
      const result = await parseMarkdown('*italic text*');
      expect(result.html).toContain('<em>');
      expect(result.html).toContain('italic text');
    });

    it('should parse strikethrough', async () => {
      const result = await parseMarkdown('~~strikethrough~~');
      expect(result.html).toContain('<del>');
      expect(result.html).toContain('strikethrough');
    });

    it('should parse links', async () => {
      const result = await parseMarkdown('[Link](https://example.com)');
      expect(result.html).toContain('<a href="https://example.com"');
      expect(result.html).toContain('Link');
    });

    it('should parse images', async () => {
      const result = await parseMarkdown('![Alt text](image.jpg)');
      expect(result.html).toContain('<img');
      expect(result.html).toContain('src="image.jpg"');
      expect(result.html).toContain('alt="Alt text"');
    });

    it('should parse unordered lists', async () => {
      const markdown = `- Item 1\n- Item 2\n- Item 3`;
      const result = await parseMarkdown(markdown);
      expect(result.html).toContain('<ul>');
      expect(result.html).toContain('<li>');
      expect(result.html).toContain('Item 1');
    });

    it('should parse ordered lists', async () => {
      const markdown = `1. First\n2. Second\n3. Third`;
      const result = await parseMarkdown(markdown);
      expect(result.html).toContain('<ol>');
      expect(result.html).toContain('<li>');
      expect(result.html).toContain('First');
    });

    it('should parse nested lists', async () => {
      const markdown = `- Item 1\n  - Nested 1\n  - Nested 2\n- Item 2`;
      const result = await parseMarkdown(markdown);
      expect(result.html).toContain('<ul>');
      expect(result.html).toContain('Item 1');
      expect(result.html).toContain('Nested 1');
    });

    it('should parse task lists', async () => {
      const markdown = `- [x] Completed\n- [ ] Pending`;
      const result = await parseMarkdown(markdown);
      expect(result.html).toContain('type="checkbox"');
      expect(result.html).toContain('checked');
    });

    it('should parse tables', async () => {
      const markdown = `| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |`;
      const result = await parseMarkdown(markdown);
      expect(result.html).toContain('<table>');
      expect(result.html).toContain('<thead>');
      expect(result.html).toContain('<tbody>');
      expect(result.html).toContain('<th>');
      expect(result.html).toContain('<td>');
    });

    it('should parse code blocks', async () => {
      const markdown = '```javascript\nconst x = 10;\n```';
      const result = await parseMarkdown(markdown);
      expect(result.html).toContain('<pre>');
      expect(result.html).toContain('<code');
      expect(result.html).toContain('const x = 10;');
    });

    it('should parse inline code', async () => {
      const result = await parseMarkdown('`inline code`');
      expect(result.html).toContain('<code>');
      expect(result.html).toContain('inline code');
    });

    it('should parse blockquotes', async () => {
      const result = await parseMarkdown('> This is a quote');
      expect(result.html).toContain('<blockquote>');
      expect(result.html).toContain('This is a quote');
    });

    it('should parse horizontal rules', async () => {
      const result = await parseMarkdown('---');
      expect(result.html).toContain('<hr');
    });

    it('should extract frontmatter', async () => {
      const markdown = `---\ntitle: Test\nauthor: John\n---\n\n# Content`;
      const result = await parseMarkdown(markdown, { extractMetadata: true });
      expect(result.metadata).toEqual({ title: 'Test', author: 'John' });
      expect(result.html).toContain('Content');
      expect(result.html).not.toContain('title: Test');
    });

    it('should handle empty input', async () => {
      const result = await parseMarkdown('');
      expect(result.html).toBe('');
      expect(result.metadata).toBeNull();
    });

    it('should handle markdown with no frontmatter', async () => {
      const result = await parseMarkdown('# Just a heading');
      expect(result.metadata).toBeNull();
    });
  });

  describe('extractFrontmatter', () => {
    it('should extract valid frontmatter', () => {
      const markdown = `---\ntitle: Test\nauthor: John\n---\n\nContent`;
      const result = extractFrontmatter(markdown);
      expect(result.metadata).toEqual({ title: 'Test', author: 'John' });
      expect(result.content).toBe('Content');
    });

    it('should handle markdown without frontmatter', () => {
      const markdown = 'Just content';
      const result = extractFrontmatter(markdown);
      expect(result.metadata).toBeNull();
      expect(result.content).toBe('Just content');
    });

    it('should handle empty frontmatter', () => {
      const markdown = `---\n---\n\nContent`;
      const result = extractFrontmatter(markdown);
      expect(result.metadata).toBeNull();
      expect(result.content).toBe('Content');
    });
  });
});
