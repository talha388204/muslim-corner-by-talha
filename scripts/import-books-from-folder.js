#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const srcBase = path.resolve(process.argv[2] || 'C:/Users/user/OneDrive/Documents/all app/New folder/alqurannativeandrd/github2(mainquranpwa)/al-quran-22267/public/books');
const dstBase = path.resolve(process.argv[3] || 'public/books');

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function getPages(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjsLib.getDocument({ data });
  const doc = await loadingTask.promise;
  const pages = doc.numPages;
  await doc.destroy();
  return pages;
}

async function main() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.pdf$/i.test(entry.name)) files.push(p);
    }
  }
  if (!fs.existsSync(srcBase)) {
    console.error('Source folder not found:', srcBase);
    process.exit(1);
  }
  walk(srcBase);

  const books = [];

  for (const f of files) {
    const rel = path.relative(srcBase, f);
    const filename = path.basename(f);
    const nameNoExt = filename.replace(/\.pdf$/i, '');
    const slug = slugify(nameNoExt);
    const destDir = path.join(dstBase, slug);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const destFile = path.join(destDir, filename);
    fs.copyFileSync(f, destFile);

    let pages = 0;
    try { pages = await getPages(f); } catch (err) { /* leave 0 */ }

    const category = rel.split(path.sep)[0].toLowerCase() === 'saimum' ? 'ইসলামিক সিরিজ' : 'ইসলামিক সাহিত্য';

    const book = {
      id: slug,
      title: nameNoExt,
      author: '',
      description: 'Short description',
      coverUrl: `/books/${slug}/cover.png`,
      pdfUrl: `/books/${slug}/${filename}`,
      pages,
      categories: [category],
      ratingAvg: 4.0,
      ratingsCount: 10,
      badge: '',
      featured: false
    };

    books.push(book);
  }

  // Output JSON for applying into src/data/books.ts
  const out = JSON.stringify(books, null, 2);
  console.log(out);
}

main().catch(err => { console.error(err); process.exit(1); });
