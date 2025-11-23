import * as fs from 'fs';
import * as path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas, Image } from 'canvas';

// Configure PDF.js worker
const pdfjsLib = { getDocument };

// Provide Image implementation for pdfjs in Node environment
(globalThis as any).Image = Image;
interface BookFolder {
  folderPath: string;
  pdfFile: string;
  coverExists: boolean;
}

async function scanBooksFolder(): Promise<BookFolder[]> {
  const booksDir = path.join(process.cwd(), 'public', 'books');
  const folders = fs.readdirSync(booksDir, { withFileTypes: true });
  const bookFolders: BookFolder[] = [];

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    
    const folderPath = path.join(booksDir, folder.name);
    const files = fs.readdirSync(folderPath);
    
    // Find PDF file
    const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));
    if (!pdfFile) {
      console.log(`⚠️  No PDF found in: ${folder.name}`);
      continue;
    }

    // Check if cover.jpg exists
    const coverExists = fs.existsSync(path.join(folderPath, 'cover.jpg'));

    bookFolders.push({
      folderPath,
      pdfFile,
      coverExists
    });
  }

  return bookFolders;
}

async function extractFirstPageAsCover(pdfPath: string, outputPath: string): Promise<void> {
  try {
    // Load PDF
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({
      data,
      useSystemFonts: true,
      standardFontDataUrl: undefined
    });
    
    const pdfDoc = await loadingTask.promise;
    const page = await pdfDoc.getPage(1);

    // Get viewport with scale for high quality
    const viewport = page.getViewport({ scale: 2.0 });
    
    // Create canvas
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    // Render page to canvas
    await page.render({
      canvasContext: context as any,
      viewport: viewport
    }).promise;

    // Save as JPG
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync(outputPath, buffer);

    // Clean up
    await pdfDoc.destroy();
    
    console.log(`✅ Generated: ${path.basename(path.dirname(outputPath))}/cover.jpg`);
  } catch (error) {
    console.error(`❌ Failed to process ${path.basename(pdfPath)}:`, error);
    throw error;
  }
}

async function removeSvgCovers(folderPath: string): Promise<void> {
  const svgPath = path.join(folderPath, 'cover.svg');
  if (fs.existsSync(svgPath)) {
    fs.unlinkSync(svgPath);
    console.log(`🗑️  Removed: ${path.basename(folderPath)}/cover.svg`);
  }
}

async function main() {
  console.log('🚀 Starting cover generation from PDF first pages...\n');

  const bookFolders = await scanBooksFolder();
  console.log(`📚 Found ${bookFolders.length} books with PDFs\n`);

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const book of bookFolders) {
    const pdfPath = path.join(book.folderPath, book.pdfFile);
    const coverPath = path.join(book.folderPath, 'cover.jpg');
    
    // Check if we should skip (cover already exists and force flag not set)
    const forceRegenerate = process.argv.includes('--force');
    
    if (book.coverExists && !forceRegenerate) {
      console.log(`⏭️  Skipped (already exists): ${path.basename(book.folderPath)}`);
      skipped++;
      continue;
    }

    try {
      // Extract first page
      await extractFirstPageAsCover(pdfPath, coverPath);
      
      // Remove old SVG cover
      await removeSvgCovers(book.folderPath);
      
      processed++;
    } catch (error) {
      failed++;
      console.error(`❌ Failed: ${path.basename(book.folderPath)}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Processed: ${processed}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`\n💡 Tip: Use --force flag to regenerate all covers`);
}

main().catch(console.error);
