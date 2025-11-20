import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const booksTsPath = path.join(repoRoot, 'src', 'data', 'books.ts');
const publicBooksDir = path.join(repoRoot, 'public', 'books');

function escapeForRegex(s) {
  return s.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&');
}

if (!fs.existsSync(booksTsPath)) {
  console.error('Could not find src/data/books.ts');
  process.exit(1);
}

const booksContent = fs.readFileSync(booksTsPath, 'utf-8');

const folders = fs.existsSync(publicBooksDir) ? fs.readdirSync(publicBooksDir) : [];

let updated = 0;
let newContent = booksContent;

for (const folder of folders) {
  const folderPath = path.join(publicBooksDir, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;

  const pdfs = fs.readdirSync(folderPath).filter(f => f.toLowerCase().endsWith('.pdf'));
  if (!pdfs.length) continue;

  const pdfFile = pdfs[0];
  const id = folder;
  const pdfUrl = `/books/${id}/${pdfFile}`;

  // Find the book object by id and update its pdfUrl value
  const idMarker = `id: "${id}"`;
  const idx = newContent.indexOf(idMarker);
  if (idx === -1) continue;

  // Look ahead a reasonable number of characters to find pdfUrl within the same object
  const lookahead = newContent.slice(idx, idx + 2000);
  const pdfKeyIndex = lookahead.indexOf('pdfUrl:');
  if (pdfKeyIndex === -1) continue;

  // Locate the quote-delimited value after pdfUrl:
  const startIdxInLookahead = pdfKeyIndex + lookahead.slice(pdfKeyIndex).indexOf('"');
  if (startIdxInLookahead === -1) continue;

  const valueStart = idx + startIdxInLookahead + 1; // position of first char inside quotes
  const rest = newContent.slice(valueStart);
  const quoteEnd = rest.indexOf('"');
  if (quoteEnd === -1) continue;

  const valueEnd = valueStart + quoteEnd;
  // Replace the value between valueStart and valueEnd with pdfUrl
  newContent = newContent.slice(0, valueStart) + pdfUrl + newContent.slice(valueEnd);
  updated++;
  console.log(`Updated pdfUrl for ${id} -> ${pdfUrl}`);
}

if (updated > 0) {
  fs.writeFileSync(booksTsPath, newContent, 'utf-8');
  console.log(`\nPatched ${updated} book(s) in src/data/books.ts`);
} else {
  console.log('No pdfUrl entries updated (no matching ids or no pdf files found).');
}

process.exit(0);
