const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'books.ts');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of literal \n with actual newlines
content = content.replace(/},\\n  {/g, '},\n  {');
content = content.replace(/},\\n\n/g, '},\n\n');
content = content.replace(/] = \[/g, '];

export const tempBooks = [');

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed books.ts syntax errors');
