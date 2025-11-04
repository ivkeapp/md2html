# Code Block Test Cases

This document tests various code block scenarios with different languages and edge cases.

## JavaScript

```javascript
// Basic function
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function
const add = (a, b) => a + b;

// Class definition
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    console.log(`I'm ${this.name}, ${this.age} years old.`);
  }
}

// Async/await
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Template literals
const html = `
  <div class="container">
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
`;
```

## Python

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# Class definition
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"I'm {self.name}, {self.age} years old.")

# List comprehension
squares = [x**2 for x in range(10)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}

# Context manager
with open('file.txt', 'r') as f:
    content = f.read()
    print(content)

# Decorator
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Took {end - start} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(2)
```

## HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <h1>Welcome to My Website</h1>
    <p>This is a sample paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
    
    <div class="card">
      <img src="image.jpg" alt="Sample image">
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
    </div>
  </main>
  
  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>
```

## CSS

```css
/* CSS Variables */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #333;
  --background: #fff;
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Flexbox Layout */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Media Queries */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

## JSON

```json
{
  "name": "md2html",
  "version": "1.0.0",
  "description": "Markdown to HTML converter",
  "main": "dist/md2html.min.js",
  "scripts": {
    "start": "vite public --open",
    "build": "vite build && npm run bundle",
    "test": "vitest"
  },
  "keywords": ["markdown", "html", "converter"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "marked": "^11.1.0",
    "dompurify": "^3.0.7"
  },
  "devDependencies": {
    "vite": "^5.0.8",
    "vitest": "^1.1.0",
    "@playwright/test": "^1.40.0"
  }
}
```

## Bash/Shell

```bash
#!/bin/bash

# Variables
PROJECT_NAME="md2html"
BUILD_DIR="dist"

# Functions
build() {
  echo "Building project..."
  npm run build
  echo "Build complete!"
}

clean() {
  echo "Cleaning build directory..."
  rm -rf $BUILD_DIR
  echo "Clean complete!"
}

# Main script
if [ "$1" = "build" ]; then
  build
elif [ "$1" = "clean" ]; then
  clean
elif [ "$1" = "rebuild" ]; then
  clean
  build
else
  echo "Usage: $0 {build|clean|rebuild}"
  exit 1
fi

# Exit with success
exit 0
```

## TypeScript

```typescript
// Interfaces
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Type aliases
type UserRole = 'admin' | 'user' | 'guest';

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Class with generics
class DataStore<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  getAll(): T[] {
    return this.items;
  }
  
  findById(id: number): T | undefined {
    return this.items.find(item => (item as any).id === id);
  }
}

// Async function with types
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data as User;
}

// Union types
function processInput(input: string | number): void {
  if (typeof input === 'string') {
    console.log(input.toUpperCase());
  } else {
    console.log(input * 2);
  }
}
```

## SQL

```sql
-- Create table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com'),
  ('Charlie', 'charlie@example.com');

-- Select with JOIN
SELECT u.name, o.order_date, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
ORDER BY o.order_date DESC
LIMIT 10;

-- Update
UPDATE users
SET name = 'Alice Smith'
WHERE email = 'alice@example.com';

-- Delete
DELETE FROM users
WHERE created_at < DATE('now', '-1 year');
```

## Rust

```rust
// Struct and implementation
struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: String, age: u32) -> Person {
        Person { name, age }
    }
    
    fn introduce(&self) {
        println!("I'm {}, {} years old.", self.name, self.age);
    }
}

// Enum
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

// Pattern matching
fn process_message(msg: Message) {
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to ({}, {})", x, y),
        Message::Write(text) => println!("Write: {}", text),
    }
}

// Main function
fn main() {
    let person = Person::new(String::from("Alice"), 30);
    person.introduce();
}
```

## Long Single Line

```javascript
const veryLongFunctionCall = someFunction(argument1, argument2, argument3, argument4, argument5, argument6, argument7, argument8, argument9, argument10, argument11, argument12);
```

## Code with No Language Specified

```
This is a plain text code block
No syntax highlighting
Just monospace font
Useful for:
- Output examples
- Plain text files
- ASCII art
```

## Inline Code Examples

Here are some inline code examples: `const x = 10;` and `function test() {}` and `npm install`.

You can also have `very long inline code that might wrap to the next line depending on the container width and font size settings` in the middle of text.

## Code with Special Characters

```javascript
// Special characters in strings
const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/\\";
const unicode = "© ™ ® ¶ § † ‡ • ∑ ∏ √ ∞";
const emoji = "🎉 🚀 ✨ 💡 📝 🔥 ⚡ 🎨";

// Regular expressions
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /\d{3}-\d{3}-\d{4}/;

// Template literals with backticks
const template = `
  This is a template
  with multiple lines
  and ${variable} interpolation
`;
```

## Code with HTML/Markdown Inside

```html
<!-- Markdown inside HTML comment -->
<div class="markdown-content">
  <!-- This should be syntax highlighted as HTML, not parsed as Markdown -->
  # This is not a heading
  **This is not bold**
  [This is not a link](http://example.com)
</div>
```

## Very Long Code Block

```python
def very_long_function_with_many_parameters(
    parameter1,
    parameter2,
    parameter3,
    parameter4,
    parameter5,
    parameter6,
    parameter7,
    parameter8,
    parameter9,
    parameter10
):
    """
    This is a very long function with extensive documentation
    that demonstrates how long code blocks should be handled.
    
    Args:
        parameter1: First parameter description that is quite long
        parameter2: Second parameter description that is quite long
        parameter3: Third parameter description that is quite long
        parameter4: Fourth parameter description that is quite long
        parameter5: Fifth parameter description that is quite long
        parameter6: Sixth parameter description that is quite long
        parameter7: Seventh parameter description that is quite long
        parameter8: Eighth parameter description that is quite long
        parameter9: Ninth parameter description that is quite long
        parameter10: Tenth parameter description that is quite long
    
    Returns:
        A complex result object containing processed data
    """
    result = {
        'data': [],
        'metadata': {},
        'status': 'success'
    }
    
    # Process each parameter with extensive logic
    for i, param in enumerate([parameter1, parameter2, parameter3, parameter4, parameter5,
                               parameter6, parameter7, parameter8, parameter9, parameter10]):
        processed_value = perform_complex_processing(param)
        result['data'].append(processed_value)
        result['metadata'][f'param_{i+1}'] = get_metadata(param)
    
    return result
```

## Conclusion

These test cases cover:
- Multiple programming languages
- Inline code vs block code
- Long lines and content
- Special characters
- Empty/plain code blocks
- Proper escaping
- Syntax highlighting (if implemented)
