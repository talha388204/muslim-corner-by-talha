/**
 * PDF থেকে Thumbnail Generate করার Script
 * 
 * ব্যবহার:
 * node scripts/generate-thumbnail.js <pdf-path> <output-path>
 * 
 * উদাহরণ:
 * node scripts/generate-thumbnail.js public/books/book-001/book.pdf public/books/book-001/cover.png
 */

import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

// PDF.js worker setup
const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

async function generateThumbnail(pdfPath, outputPath) {
  try {
    console.log('📖 PDF লোড হচ্ছে...');
    
    // PDF লোড করুন
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = getDocument({ data });
    const pdf = await loadingTask.promise;
    
    console.log('📄 প্রথম পেজ রেন্ডার হচ্ছে...');
    
    // প্রথম পেজ নিন
    const page = await pdf.getPage(1);
    
    // স্কেল সেট করুন (উচ্চ মানের জন্য)
    const scale = 2.0;
    const viewport = page.getViewport({ scale });
    
    // Canvas তৈরি করুন
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');
    
    // পেজ রেন্ডার করুন
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    console.log('💾 Thumbnail সেভ হচ্ছে...');
    
    // আউটপুট ডিরেক্টরি তৈরি করুন (যদি না থাকে)
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // PNG হিসেবে সেভ করুন
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log('✅ Thumbnail সফলভাবে তৈরি হয়েছে:', outputPath);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('ব্যবহার: node scripts/generate-thumbnail.js <pdf-path> <output-path>');
  console.log('উদাহরণ: node scripts/generate-thumbnail.js public/books/book-001/book.pdf public/books/book-001/cover.png');
  process.exit(1);
}

const [pdfPath, outputPath] = args;

// Check if PDF exists
if (!fs.existsSync(pdfPath)) {
  console.error('❌ PDF ফাইল পাওয়া যায়নি:', pdfPath);
  process.exit(1);
}

generateThumbnail(pdfPath, outputPath);
