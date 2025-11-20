import fs from 'fs';
import path from 'path';

const p = path.join('src','data','books.ts');
if (!fs.existsSync(p)) { console.error('books.ts not found'); process.exit(1); }
let s = fs.readFileSync(p,'utf8');

const booksExport = 'export const books';
const categoriesExport = 'export const categories';

const bi = s.indexOf(booksExport);
if (bi === -1) { console.error('books export not found'); process.exit(1); }
const arrStart = s.indexOf('[', bi);
if (arrStart === -1) { console.error('books array start not found'); process.exit(1); }
// find matching closing bracket for this array
let depth = 0;
let endArrIndex = -1;
for (let i = arrStart; i < s.length; i++) {
  const ch = s[i];
  if (ch === '[') depth++;
  else if (ch === ']') {
    depth--;
    if (depth === 0) { endArrIndex = i; break; }
  }
}
if (endArrIndex === -1) { console.error('could not find end of books array'); process.exit(1); }
// find the position of the '];' that closes assignment
const booksClosePos = s.indexOf('];', endArrIndex);
if (booksClosePos === -1) { console.error('could not find books closing ];'); process.exit(1); }

// now find categories export
const ci = s.indexOf(categoriesExport);
if (ci === -1) { console.error('categories export not found'); process.exit(1); }
// find first object-like occurrence after categories export
const firstObj = s.indexOf('\n  {', ci);
if (firstObj === -1) { console.log('No stray objects found after categories'); process.exit(0); }

// Extract stray portion from firstObj up to before next export or end of file
// We'll take until end of file or until a line that looks like export const something
let endStray = s.length;
const nextExport = s.indexOf('\nexport ', firstObj+1);
if (nextExport !== -1) endStray = nextExport;

const stray = s.slice(firstObj, endStray);
// Remove stray from content
s = s.slice(0, firstObj) + s.slice(endStray);

// Insert stray before booksClosePos (booksClosePos may have shifted if firstObj < booksClosePos)
// Recompute booksClosePos in updated string
const newBooksArrStart = s.indexOf(booksExport);
const newArrStart = s.indexOf('[', newBooksArrStart);
let newDepth = 0;
let newEndArrIndex = -1;
for (let i = newArrStart; i < s.length; i++) {
  const ch = s[i];
  if (ch === '[') newDepth++;
  else if (ch === ']') { newDepth--; if (newDepth === 0) { newEndArrIndex = i; break; } }
}
const newBooksClosePos = s.indexOf('];', newEndArrIndex);
if (newBooksClosePos === -1) { console.error('could not find books closing in updated content'); process.exit(1); }

// Insert stray just before newBooksClosePos
const before = s.slice(0, newBooksClosePos);
const after = s.slice(newBooksClosePos);
// Ensure there's a newline and that before ends with a comma after last object; if not, add comma
let insert = stray;
// If stray doesn't begin with a comma and space, ensure previous object ends with a comma
// We'll just insert stray as-is (it already contains leading newline and object start)
const fixed = before + insert + after;
fs.writeFileSync(p, fixed, 'utf8');
console.log('Moved stray objects into books array.');
