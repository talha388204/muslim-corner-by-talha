import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const booksTsPath = path.join(repoRoot, 'src', 'data', 'books.ts');
const publicBooksDir = path.join(repoRoot, 'public', 'books');

if (!fs.existsSync(booksTsPath)) {
  console.error('books.ts not found');
  process.exit(1);
}

const content = fs.readFileSync(booksTsPath, 'utf8');

// Find book objects that reference 'boimate' in id, title, or pdfUrl
const regex = /\{[\s\S]*?id:\s*"([^"]*boimate[^"]*)"[\s\S]*?\}/gi;
const matches = [...content.matchAll(regex)];
if (!matches.length) {
  console.log('No boimate entries found in books.ts');
  process.exit(0);
}

function stripSourceTags(title) {
  // remove bracketed source like [boimate.com] or [boimate-com] or [boimate com]
  let t = title.replace(/\[.*?boimate.*?\]/gi, '');
  // remove stray 'pdf' tokens at end
  t = t.replace(/\bpdf\b/gi, '');
  // collapse spaces and trim
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function makeSlug(title) {
  // simple slug: replace non-alphanum (except Bengali) with hyphen, collapse hyphens
  return title.toLowerCase()
    .replace(/[^\u0980-\u09FFa-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-+/g, '-');
}

let newContent = content;
let changed = 0;

for (const m of matches) {
  const fullMatch = m[0];
  // extract fields from object
  const idMatch = fullMatch.match(/id:\s*"([^"]+)"/);
  const titleMatch = fullMatch.match(/title:\s*"([^"]+)"/);
  const coverMatch = fullMatch.match(/coverUrl:\s*"([^"]+)"/);
  const pdfMatch = fullMatch.match(/pdfUrl:\s*"([^"]+)"/);

  const oldId = idMatch ? idMatch[1] : null;
  const oldTitle = titleMatch ? titleMatch[1] : null;
  const oldCover = coverMatch ? coverMatch[1] : null;
  const oldPdf = pdfMatch ? pdfMatch[1] : null;

  if (!oldId || !oldTitle) continue;

  const cleanedTitle = stripSourceTags(oldTitle);
  if (cleanedTitle === oldTitle) continue; // nothing to do

  const newSlug = makeSlug(cleanedTitle) || makeSlug(oldId);

  // rename public folder if exists
  const oldFolder = path.join(publicBooksDir, oldId);
  const newFolder = path.join(publicBooksDir, newSlug);
  try {
    if (fs.existsSync(oldFolder) && !fs.existsSync(newFolder)) {
      fs.renameSync(oldFolder, newFolder);
      console.log(`Renamed folder: ${oldId} -> ${newSlug}`);
    } else if (fs.existsSync(oldFolder) && fs.existsSync(newFolder)) {
      // merge contents: move files from old to new
      const files = fs.readdirSync(oldFolder);
      for (const f of files) {
        const src = path.join(oldFolder, f);
        const dst = path.join(newFolder, f);
        if (!fs.existsSync(dst)) fs.renameSync(src, dst);
      }
      // remove oldFolder if empty
      try { fs.rmdirSync(oldFolder); } catch (e) {}
      console.log(`Merged folder: ${oldId} -> ${newSlug}`);
    }
  } catch (err) {
    console.error('Could not rename/merge folder', oldFolder, err.message);
  }

  // Ensure pdf filename matches new slug
  if (fs.existsSync(newFolder)) {
    const pdfFiles = fs.readdirSync(newFolder).filter(f => /\.pdf$/i.test(f));
    if (pdfFiles.length) {
      const currentPdf = pdfFiles[0];
      const desired = `${newSlug}.pdf`;
      const currentPath = path.join(newFolder, currentPdf);
      const desiredPath = path.join(newFolder, desired);
      try {
        if (currentPdf !== desired) {
          if (fs.existsSync(desiredPath)) fs.unlinkSync(desiredPath);
          fs.renameSync(currentPath, desiredPath);
          console.log(`Renamed pdf ${currentPdf} -> ${desired}`);
        }
      } catch (err) {
        console.error('Could not rename pdf file:', err.message);
      }
    }
  }

  // Update the book object in books.ts
  const newId = newSlug;
  const newTitle = cleanedTitle.replace(/"/g, '\\"');
  const newCover = `/books/${newSlug}/cover.svg`;
  const newPdf = `/books/${newSlug}/${newSlug}.pdf`;

  let updatedObj = fullMatch;
  updatedObj = updatedObj.replace(/id:\s*"[^"]+"/, `id: "${newId}"`);
  updatedObj = updatedObj.replace(/title:\s*"[^"]+"/, `title: "${newTitle}"`);
  if (oldCover) updatedObj = updatedObj.replace(/coverUrl:\s*"[^"]+"/, `coverUrl: "${newCover}"`);
  if (oldPdf) updatedObj = updatedObj.replace(/pdfUrl:\s*"[^"]+"/, `pdfUrl: "${newPdf}"`);

  newContent = newContent.replace(fullMatch, updatedObj);
  changed++;
  console.log(`Updated entry: ${oldId} -> ${newId}`);
}

if (changed > 0) {
  fs.writeFileSync(booksTsPath, newContent, 'utf8');
  console.log(`\nPatched ${changed} book(s) in src/data/books.ts`);
} else {
  console.log('No entries required cleaning.');
}

process.exit(0);
