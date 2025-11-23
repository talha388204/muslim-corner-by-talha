import * as fs from 'fs';
import * as path from 'path';

/**
 * This script updates all coverUrl references in src/data/books.ts
 * from cover.svg to cover.jpg
 */

function updateBooksCoverUrls() {
  const booksFilePath = path.join(process.cwd(), 'src', 'data', 'books.ts');
  
  // Read the file
  let content = fs.readFileSync(booksFilePath, 'utf-8');
  
  // Replace all cover.svg with cover.jpg
  const originalContent = content;
  content = content.replace(/\/cover\.svg/g, '/cover.jpg');
  
  // Count replacements
  const replacementCount = (originalContent.match(/\/cover\.svg/g) || []).length;
  
  // Write back
  fs.writeFileSync(booksFilePath, content, 'utf-8');
  
  console.log(`✅ Updated ${replacementCount} cover URLs from .svg to .jpg`);
  console.log(`📄 File: src/data/books.ts`);
}

updateBooksCoverUrls();
