# Extending to `.md → .pdf` (Future Plan)

## Overview

Converting Markdown to PDF is a natural extension of md2html. This document outlines the recommended approaches, architecture considerations, and implementation plan.

## Recommended Approaches

### Option 1: Client-Side (Browser)

**Library: html2pdf.js**

Pros:
- Runs entirely in browser
- No server required
- Good for simple documents
- Easy to integrate

Cons:
- Limited CSS support
- May rasterize text instead of keeping it selectable
- File size can be large
- Complex layouts may not render correctly

**Implementation:**

```javascript
import html2pdf from 'html2pdf.js';

export async function exportToPdf(markdown, theme, options = {}) {
  // Generate HTML
  const result = await md2html.parse(markdown);
  const html = md2html.toFullHtml(result.html, theme);
  
  // Convert to PDF
  const element = document.createElement('div');
  element.innerHTML = html;
  document.body.appendChild(element);
  
  const opt = {
    margin: 1,
    filename: options.filename || 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  await html2pdf().set(opt).from(element).save();
  document.body.removeChild(element);
}
```

### Option 2: Server-Side (Best Quality)

**Library: Puppeteer**

Pros:
- Excellent CSS fidelity
- True PDF generation (not rasterized)
- Fine-grained control
- Professional output quality
- Supports complex layouts

Cons:
- Requires Node.js server
- Heavier infrastructure
- Chrome/Chromium dependency

**Implementation:**

```javascript
// server.js
import puppeteer from 'puppeteer';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/convert-to-pdf', async (req, res) => {
  const { html, options = {} } = req.body;
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const pdf = await page.pdf({
    format: options.format || 'A4',
    margin: options.margin || {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    },
    printBackground: true,
    preferCSSPageSize: true
  });
  
  await browser.close();
  
  res.contentType('application/pdf');
  res.send(pdf);
});

app.listen(3001);
```

**Client integration:**

```javascript
export async function exportToPdfServer(markdown, theme, options = {}) {
  const result = await md2html.parse(markdown);
  const html = md2html.toFullHtml(result.html, theme);
  
  const response = await fetch('/api/convert-to-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html, options })
  });
  
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = options.filename || 'document.pdf';
  a.click();
  
  URL.revokeObjectURL(url);
}
```

### Option 3: Hybrid Approach

**Serverless Function (AWS Lambda, Vercel, Netlify)**

Pros:
- No persistent server needed
- Scales automatically
- Cost-effective
- Professional quality output

Cons:
- Cold start latency
- Function timeout limits
- Slightly more complex setup

**Implementation (Vercel):**

```javascript
// api/pdf.js
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { html, options = {} } = req.body;
  
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  
  const page = await browser.newPage();
  await page.setContent(html);
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
  });
  
  await browser.close();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
  res.send(pdf);
}
```

## Architecture Integration

### Extension Points in Current Code

1. **Export Menu**
   - Add "Download PDF" button next to "Download HTML"
   - Hook into existing export handler

2. **API Surface**
   ```javascript
   // New public method
   export async function toPdf(markdown, theme, options) {
     // Implementation based on chosen approach
   }
   ```

3. **Worker Support**
   - Offload PDF generation to Web Worker
   - Keep UI responsive during conversion

### PDF-Specific Options

```javascript
const pdfOptions = {
  format: 'A4' | 'Letter' | 'Legal',
  orientation: 'portrait' | 'landscape',
  margin: {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm'
  },
  includeTableOfContents: boolean,
  pageNumbers: boolean,
  headerTemplate: '<div>Custom header</div>',
  footerTemplate: '<div>Page <span class="pageNumber"></span></div>'
};
```

## CSS Considerations

### Print-Specific Styles

Add print media queries to themes:

```css
@media print {
  .md-preview {
    max-width: 100%;
    padding: 0;
  }
  
  h1, h2, h3 {
    page-break-after: avoid;
  }
  
  pre, table, img {
    page-break-inside: avoid;
  }
  
  a[href]:after {
    content: " (" attr(href) ")";
  }
}
```

### Page Breaks

```css
.page-break {
  page-break-after: always;
}

.page-break-before {
  page-break-before: always;
}
```

## Implementation Roadmap

### Phase 1: Research & Proof of Concept
- [ ] Test html2pdf.js with sample documents
- [ ] Test Puppeteer quality vs. html2pdf.js
- [ ] Benchmark performance and file sizes
- [ ] Evaluate serverless options

### Phase 2: Basic Implementation
- [ ] Add PDF export button to UI
- [ ] Implement chosen approach
- [ ] Add basic error handling
- [ ] Test with sample documents

### Phase 3: Advanced Features
- [ ] Custom headers/footers
- [ ] Page numbers
- [ ] Table of contents generation
- [ ] PDF metadata (author, title, keywords)
- [ ] Bookmarks for headings

### Phase 4: Optimization
- [ ] Optimize file size
- [ ] Improve performance
- [ ] Add progress indicators
- [ ] Handle large documents (> 50 pages)

### Phase 5: Polish
- [ ] Comprehensive testing
- [ ] Documentation
- [ ] Error messages
- [ ] User feedback during conversion

## Code Example (Future API)

```javascript
// In demo.js
async handleDownloadPdf() {
  if (!this.currentMarkdown) {
    alert('Please load a Markdown file first');
    return;
  }
  
  try {
    // Show loading state
    this.showPdfGenerating();
    
    // Generate PDF
    await md2html.toPdf(
      this.currentMarkdown,
      this.currentTheme,
      {
        filename: this.currentFilename.replace('.md', '.pdf'),
        format: 'A4',
        includeTableOfContents: true,
        pageNumbers: true
      }
    );
    
    this.hidePdfGenerating();
  } catch (error) {
    alert(`Error generating PDF: ${error.message}`);
    this.hidePdfGenerating();
  }
}
```

## Testing Strategy

### Unit Tests
- PDF options validation
- HTML preprocessing for PDF
- Error handling

### Integration Tests
- End-to-end PDF generation
- File size checks
- Output quality validation

### Manual Tests
- Visual inspection of output
- Cross-platform PDF reader compatibility
- Print quality from PDF

## Dependencies

### Client-Side Approach
```json
{
  "dependencies": {
    "html2pdf.js": "^0.10.1"
  }
}
```

### Server-Side Approach
```json
{
  "dependencies": {
    "puppeteer": "^21.0.0",
    "express": "^4.18.0"
  }
}
```

### Serverless Approach
```json
{
  "dependencies": {
    "puppeteer-core": "^21.0.0",
    "@sparticuz/chromium": "^119.0.0"
  }
}
```

## Recommendation

**Start with Option 2 (Puppeteer) or Option 3 (Serverless)**

Reasons:
1. Professional output quality
2. Full CSS support
3. Scalable architecture
4. Future-proof for advanced features
5. Industry standard approach

**Quick Win:** Implement Option 1 (html2pdf.js) as a temporary solution while building the server-side version. This gives users basic PDF export immediately while you develop the better solution.

## Resources

- [Puppeteer Documentation](https://pptr.dev/)
- [html2pdf.js GitHub](https://github.com/eKoopmans/html2pdf.js)
- [CSS Paged Media](https://www.w3.org/TR/css-page-3/)
- [Prince XML](https://www.princexml.com/) - Commercial alternative
- [WeasyPrint](https://weasyprint.org/) - Python-based alternative
