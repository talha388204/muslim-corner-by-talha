import fs from 'fs';
import path from 'path';

const file = path.join('src','data','books.ts');
const text = fs.readFileSync(file,'utf8');
const fixed = text.replace(/cover\.png/g, 'cover.svg');
if (text === fixed) {
  console.log('No changes needed');
  process.exit(0);
}
fs.writeFileSync(file, fixed, 'utf8');
console.log('Rewrote', file);
