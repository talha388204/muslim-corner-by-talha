import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const booksTs = path.join(repoRoot, 'src', 'data', 'books.ts');
const publicBooks = path.join(repoRoot, 'public', 'books');

if (!fs.existsSync(booksTs)) {
  console.error('books.ts not found');
  process.exit(1);
}

const src = fs.readFileSync(booksTs, 'utf8');

// Locate the array start and end
const arrayStart = src.indexOf('export const books');
if (arrayStart === -1) {
  console.error('Could not find "export const books" in books.ts');
  process.exit(1);
}

const firstBracket = src.indexOf('[', arrayStart);
const closingBracket = src.indexOf('];', firstBracket);
if (firstBracket === -1 || closingBracket === -1) {
  console.error('Could not locate books array boundaries');
  process.exit(1);
}

const before = src.slice(0, firstBracket + 1);
const arrayContent = src.slice(firstBracket + 1, closingBracket);
const after = src.slice(closingBracket);

// Match each top-level object inside the array
const objectRegex = /\{[\s\S]*?\n\s*\}/g;
const matches = [...arrayContent.matchAll(objectRegex)].map(m => m[0]);

const seen = new Map();
let removed = 0;

for (const objText of matches) {
  const idMatch = objText.match(/id:\s*"([^"]+)"/);
  if (!idMatch) continue;
  const id = idMatch[1];

  // Extract pdfUrl value if present
  const pdfMatch = objText.match(/pdfUrl:\s*"([^"]*)"/);
  const pdfVal = pdfMatch ? pdfMatch[1] : '';

  if (!seen.has(id)) {
    seen.set(id, { obj: objText, pdf: pdfVal });
  } else {
    // Decide which to keep: prefer one with a non-empty and not 'undefined' pdfUrl
    const existing = seen.get(id);
    const existingHas = existing.pdf && existing.pdf !== 'undefined';
    const currentHas = pdfVal && pdfVal !== 'undefined';

    if (existingHas) {
      // keep existing, drop this one
      removed++;
      console.log(`Dropping duplicate (kept existing): ${id}`);
    } else if (currentHas) {
      // replace with current
      seen.set(id, { obj: objText, pdf: pdfVal });
      removed++;
      console.log(`Replacing duplicate with better pdfUrl: ${id}`);
    } else {
      // both lacking pdf, keep first
      removed++;
      console.log(`Dropping duplicate (no pdfs): ${id}`);
    }
  }
}

// Reconstruct array content preserving original ordering of first-seen items
const finalObjects = [];
for (const objText of matches) {
  const idMatch = objText.match(/id:\s*"([^"]+)"/);
  if (!idMatch) continue;
  const id = idMatch[1];
  if (seen.has(id)) {
    const entry = seen.get(id);
    // push and then remove from map to avoid duplicates
    finalObjects.push(entry.obj);
    seen.delete(id);
  }
}

const newArrayContent = '\n  ' + finalObjects.join(',\n  ') + '\n';
const newSrc = before + newArrayContent + after;

fs.writeFileSync(booksTs, newSrc, 'utf8');
console.log(`\nDedupe complete. Removed ${removed} duplicate entry(ies).`);

process.exit(0);
