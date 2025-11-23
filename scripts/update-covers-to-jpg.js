const fs = require('fs');
const path = require('path');

console.log('🔄 Updating all cover URLs from .svg to .jpg...\n');

const booksFilePath = path.join(__dirname, '../src/data/books.ts');

// Read the file
let content = fs.readFileSync(booksFilePath, 'utf-8');

// Count occurrences before replacement
const svgCount = (content.match(/\/cover\.svg/g) || []).length;

// Replace all cover.svg with cover.jpg
content = content.replace(/\/cover\.svg/g, '/cover.jpg');

// Write back
fs.writeFileSync(booksFilePath, content, 'utf-8');

console.log(`✅ Successfully updated ${svgCount} cover URLs`);
console.log(`📄 File: src/data/books.ts`);
console.log(`\n✨ All books now reference cover.jpg instead of cover.svg`);
