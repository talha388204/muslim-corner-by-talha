/**
 * সকল PDF থেকে স্বয়ংক্রিয়ভাবে Thumbnail তৈরি করার Script
 * 
 * ব্যবহার:
 * node scripts/generate-all-thumbnails.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BOOKS_DIR = path.join(__dirname, '../public/books');

async function findAllPDFs() {
  const books = [];
  
  if (!fs.existsSync(BOOKS_DIR)) {
    console.log('📁 public/books/ ফোল্ডার পাওয়া যায়নি');
    return books;
  }
  
  const folders = fs.readdirSync(BOOKS_DIR);
  
  for (const folder of folders) {
    const folderPath = path.join(BOOKS_DIR, folder);
    const stat = fs.statSync(folderPath);
    
    if (stat.isDirectory()) {
      const pdfPath = path.join(folderPath, 'book.pdf');
      const coverPath = path.join(folderPath, 'cover.png');
      
      if (fs.existsSync(pdfPath)) {
        books.push({
          folder,
          pdfPath,
          coverPath,
          needsThumbnail: !fs.existsSync(coverPath)
        });
      }
    }
  }
  
  return books;
}

async function generateAllThumbnails() {
  console.log('🔍 PDF ফাইল খুঁজছি...\n');
  
  const books = await findAllPDFs();
  
  if (books.length === 0) {
    console.log('❌ কোনো PDF ফাইল পাওয়া যায়নি');
    return;
  }
  
  console.log(`📚 মোট ${books.length}টি বই পাওয়া গেছে\n`);
  
  const booksNeedingThumbnails = books.filter(b => b.needsThumbnail);
  
  if (booksNeedingThumbnails.length === 0) {
    console.log('✅ সব বই এর thumbnail ইতিমধ্যে আছে!');
    return;
  }
  
  console.log(`🎨 ${booksNeedingThumbnails.length}টি বই এর জন্য thumbnail তৈরি করা হবে\n`);
  
  for (let i = 0; i < booksNeedingThumbnails.length; i++) {
    const book = booksNeedingThumbnails[i];
    console.log(`[${i + 1}/${booksNeedingThumbnails.length}] ${book.folder}...`);
    
    try {
      const command = `node scripts/generate-thumbnail.js "${book.pdfPath}" "${book.coverPath}"`;
      await execAsync(command);
      console.log('');
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
    }
  }
  
  console.log('🎉 সম্পন্ন!');
}

generateAllThumbnails();
