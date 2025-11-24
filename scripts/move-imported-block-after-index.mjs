import fs from 'fs';
import path from 'path';

const booksTsPath = path.join('src','data','books.ts');
if (!fs.existsSync(booksTsPath)){
  console.error('Could not find', booksTsPath);
  process.exit(1);
}
let data = fs.readFileSync(booksTsPath,'utf8');

const marker = 'export const books';
const markerIndex = data.indexOf(marker);
if (markerIndex === -1) {
  console.error('Could not find books export in src/data/books.ts');
  process.exit(1);
}
// find the '[' that begins the array literal — skip type annotation brackets
const eqIndex = data.indexOf('=', markerIndex);
if (eqIndex === -1){
  console.error('Could not find = after books export');
  process.exit(1);
}
const arrayOpen = data.indexOf('[', eqIndex);
if (arrayOpen === -1){
  console.error('Could not find start of books array literal');
  process.exit(1);
}

// find matching closing bracket for the array by scanning
let depth = 0;
let arrayClose = -1;
for (let i = arrayOpen; i < data.length; i++){
  const ch = data[i];
  if (ch === '[') depth++;
  else if (ch === ']'){
    depth--;
    if (depth === 0){ arrayClose = i; break; }
  }
}
if (arrayClose === -1){
  console.error('Could not find end of books array');
  process.exit(1);
}

const arrayContent = data.slice(arrayOpen+1, arrayClose);
// Match objects (robust to CRLF and spacing)
const objRegex = /\{[\s\S]*?\},\s*/g;
const objects = arrayContent.match(objRegex) || [];
if (!objects.length){
  console.error('No book objects detected');
  process.exit(1);
}

// Find imported objects
const imported = [];
const remaining = [];
for (const obj of objects){
  if (/description:\s*"Imported"/.test(obj)) imported.push(obj);
  else remaining.push(obj);
}
if (!imported.length){
  console.log('No imported objects found (nothing to move)');
  process.exit(0);
}

console.log(`Found ${imported.length} imported objects; moving them after index 20.`);

// Normalize each imported object: change cover.svg -> cover.jpg and add 'ইতিহাস' to categories
function updateObjectText(objText){
  let t = objText;
  t = t.replace(/coverUrl:\s*"([^"]*?)cover\.svg"/g, (m, p1)=>`coverUrl: "${p1}cover.jpg"`);

  // add category if missing
  const catMatch = t.match(/categories:\s*\[([\s\S]*?)\]/);
  if (catMatch){
    const inside = catMatch[1];
    if (!/ইতিহাস/.test(inside)){
      const newInside = inside.trim().length ? inside.trim() + `, "ইতিহাস"` : `"ইতিহাস"`;
      t = t.replace(/categories:\s*\[[\s\S]*?\]/, `categories: [${newInside}]`);
    }
  } else {
    // insert categories field before ratingAvg
    t = t.replace(/ratingAvg:/, `categories: ["ইতিহাস"],\n    ratingAvg:`);
  }
  return t;
}

const updatedImported = imported.map(updateObjectText);

// Build new objects array: insert updatedImported after position 20 (0-based index 20 -> after 20 books)
const insertAt = 20; // after book number 20
const newObjects = [];
for (let i=0;i<remaining.length;i++){
  if (i===insertAt){
    for (const u of updatedImported) newObjects.push(u);
  }
  newObjects.push(remaining[i]);
}
// If insert position beyond length, append
if (insertAt >= remaining.length){
  for (const u of updatedImported) newObjects.push(u);
}

const newArrayContent = '\n' + newObjects.join('\n') + '\n';
const newData = data.slice(0, arrayOpen+1) + newArrayContent + data.slice(arrayClose);
fs.writeFileSync(booksTsPath, newData,'utf8');
console.log('Updated', booksTsPath);

// Ensure cover.jpg exists for each imported id by parsing id from object text
function parseId(objText){
  const m = objText.match(/id:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

const publicBooksDir = path.join('public','books');
for (const obj of imported){
  const id = parseId(obj);
  if (!id) continue;
  const dir = path.join(publicBooksDir, id);
  if (!fs.existsSync(dir)) continue;
  const svg = path.join(dir,'cover.svg');
  const jpg = path.join(dir,'cover.jpg');
  if (fs.existsSync(jpg)) continue;
  if (fs.existsSync(svg)){
    // copy svg content into .jpg placeholder
    const content = fs.readFileSync(svg,'utf8');
    fs.writeFileSync(jpg, content, 'utf8');
    console.log('Created placeholder', jpg);
  } else {
    // write simple svg into jpg
    const titleMatch = obj.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : id;
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900"><rect width="100%" height="100%" fill="#111827"/><text x="50%" y="50%" fill="#fff" font-size="24" text-anchor="middle">${title}</text></svg>`;
    fs.writeFileSync(jpg, svgContent,'utf8');
    console.log('Wrote placeholder', jpg);
  }
}

console.log('Done.');
process.exit(0);
