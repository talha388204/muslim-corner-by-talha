import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Usage:
// node scripts/import-and-prepend-folder.mjs "C:\\Users\\user\\OneDrive\\Documents\\all files\\pdf book\\islamic corner"

const srcFolder = process.argv[2];
if (!srcFolder) {
  console.error('Provide source folder path as first arg');
  process.exit(1);
}

function slugify(name){
  return name.toLowerCase().replace(/[^\u0000-\u007F\u0980-\u09FFa-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function humanizeFilename(fn){
  return fn.replace(/[-_\.]+/g,' ').replace(/\.pdf$/i,'').trim();
}

const publicBooksDir = path.join('public','books');
if (!fs.existsSync(publicBooksDir)) fs.mkdirSync(publicBooksDir,{recursive:true});

const files = fs.existsSync(srcFolder) ? fs.readdirSync(srcFolder).filter(f=>/\.pdf$/i.test(f)) : [];
if (!files.length){
  console.log('No PDF files found in', srcFolder);
  process.exit(0);
}

const booksTsPath = path.join('src','data','books.ts');
if (!fs.existsSync(booksTsPath)){
  console.error('Could not find src/data/books.ts');
  process.exit(1);
}

const booksTs = fs.readFileSync(booksTsPath,'utf8');

// find the opening of the array
const marker = 'export const books';
const markerIndex = booksTs.indexOf(marker);
if (markerIndex === -1){
  console.error('Could not find books export in src/data/books.ts');
  process.exit(1);
}
const arrayOpen = booksTs.indexOf('[', markerIndex);
if (arrayOpen === -1){
  console.error('Could not find start of books array');
  process.exit(1);
}

let toInsert = '';

for (const file of files){
  const full = path.join(srcFolder, file);
  if (!fs.statSync(full).isFile()) continue;
  const raw = path.basename(file, path.extname(file));
  const title = humanizeFilename(file);
  const slug = slugify(raw) || crypto.randomBytes(4).toString('hex');

  const destDir = path.join(publicBooksDir, slug);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir,{recursive:true});
  const destPdf = path.join(destDir, `${slug}.pdf`);
  fs.copyFileSync(full, destPdf);

  const coverPath = path.join(destDir,'cover.svg');
  if (!fs.existsSync(coverPath)){
    fs.writeFileSync(coverPath, `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"900\"><rect width=\"100%\" height=\"100%\" fill=\"#111827\"/><text x=\"50%\" y=\"50%\" fill=\"#fff\" font-size=\"24\" text-anchor=\"middle\">${title}</text></svg>`,'utf8');
  }

  const id = slug;
  const coverUrl = `/books/${slug}/cover.svg`;
  const pdfUrl = `/books/${slug}/${slug}.pdf`;
  const category = 'ইসলামিক কর্নার';

  const obj = `  {\n    id: "${id}",\n    title: "${title}",\n    author: "",\n    description: "Imported",\n    coverUrl: "${coverUrl}",\n    pdfUrl: "${pdfUrl}",\n    pages: 0,\n    categories: ["${category}"],\n    ratingAvg: 4,\n    ratingsCount: 0,\n    badge: "",\n    featured: false\n  },\\n`;

  toInsert += obj;
  console.log('Imported', file, '->', destPdf);
}

// Insert at start of array (right after '[')
const newBooksTs = booksTs.slice(0, arrayOpen+1) + '\n' + toInsert + booksTs.slice(arrayOpen+1);
fs.writeFileSync(booksTsPath, newBooksTs, 'utf8');
console.log(`Prepended ${files.length} book entries to ${booksTsPath}`);

process.exit(0);
