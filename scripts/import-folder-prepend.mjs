import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Usage:
// node scripts/import-folder-prepend.mjs "C:\\path\\to\\folder" "ইসলামিক কর্নার"

const srcFolder = process.argv[2];
const categoryBn = process.argv[3] || 'ইসলামিক কর্নার';

if (!srcFolder) {
  console.error('Provide folder path as first arg');
  process.exit(1);
}

function slugify(name){
  return name.toLowerCase().replace(/[^	80-\u09FFa-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function detectTitle(filename){
  if (/[\u0980-\u09FF]/.test(filename)) return filename.replace(/[-_\.]+/g,' ').replace(/\.pdf$/i,'').trim();
  return filename.replace(/[-_\.]+/g,' ').replace(/\.pdf$/i,'').trim();
}

const publicBooks = path.join('public','books');
if (!fs.existsSync(publicBooks)) fs.mkdirSync(publicBooks,{recursive:true});

const files = fs.readdirSync(srcFolder).filter(f=>/\.pdf$/i.test(f));
if (!files.length) {
  console.log('No PDF files found in folder:', srcFolder);
  process.exit(0);
}

const booksTsPath = path.join('src','data','books.ts');
if (!fs.existsSync(booksTsPath)) {
  console.error('src/data/books.ts not found');
  process.exit(1);
}

const booksTs = fs.readFileSync(booksTsPath,'utf8');
const arrayStart = booksTs.indexOf('export const books');
const firstBracket = booksTs.indexOf('[', arrayStart);
if (firstBracket === -1) {
  console.error('Could not find start of books array');
  process.exit(1);
}

let toInsert = '';

for (const file of files){
  const full = path.join(srcFolder, file);
  const raw = path.basename(file, path.extname(file));
  const title = detectTitle(file);
  const slug = slugify(raw) || crypto.randomBytes(4).toString('hex');
  const destDir = path.join(publicBooks, slug);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir,{recursive:true});
  const destPdf = path.join(destDir, `${slug}.pdf`);
  fs.copyFileSync(full, destPdf);

  const coverPath = path.join(destDir,'cover.svg');
  if (!fs.existsSync(coverPath)){
    fs.writeFileSync(coverPath, `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"900\"><rect width=\"100%\" height=\"100%\" fill=\"#111827\"/></svg>`,'utf8');
  }

  const obj = `  {
    id: "${slug}",
    title: "${title}",
    author: "",
    description: "Imported",
    coverUrl: "/books/${slug}/cover.svg",
    pdfUrl: "/books/${slug}/${slug}.pdf",
    pages: 0,
    categories: ["${categoryBn}"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },\n`;

  toInsert += obj;
  console.log('Imported', file, '->', `/books/${slug}/${slug}.pdf`);
}

// Prepend: insert immediately after the '[' of the array
const before = booksTs.slice(0, firstBracket+1);
const after = booksTs.slice(firstBracket+1);
const newContent = before + '\n' + toInsert + after;
fs.writeFileSync(booksTsPath, newContent, 'utf8');
console.log(`Prepended ${files.length} book entries to ${booksTsPath}`);

process.exit(0);
