import fs from 'fs';
import path from 'path';

const file = path.join('src','data','books.ts');
const text = fs.readFileSync(file,'utf8');

// crude split: extract top-level objects
const arrStart = text.indexOf('export const books');
const eq = text.indexOf('=', arrStart);
const open = text.indexOf('[', eq);
let depth = 0, close = -1;
for (let i=open;i<text.length;i++){
  const ch = text[i];
  if (ch==='[') depth++;
  else if (ch===']'){ depth--; if (depth===0){ close=i; break; } }
}
const inner = text.slice(open+1, close);

function extractObjects(s){
  const objs = [];
  let level=0, start=-1;
  for (let i=0;i<s.length;i++){
    const ch = s[i];
    if (ch==='{'){
      if (level===0) start=i;
      level++;
    } else if (ch==='}'){
      level--;
      if (level===0 && start!==-1){ objs.push(s.slice(start, i+1)); start=-1; }
    }
  }
  return objs;
}

const objs = extractObjects(inner);
const cat = process.argv[2] || 'ইসলামিক সাহিত্য';
const results = [];
for (const o of objs){
  if (o.includes(`\"${cat}\"`) || o.includes(`"${cat}"`) || o.includes(cat)){
    const idm = o.match(/id\s*:\s*"([^"]+)"/);
    const titm = o.match(/title\s*:\s*"([^"]+)"/);
    const pdfm = o.match(/pdfUrl\s*:\s*"([^"]+)"/);
    const coverm = o.match(/coverUrl\s*:\s*"([^"]+)"/);
    results.push({id: idm?idm[1]:'-', title: titm?titm[1]:'-', pdf: pdfm?pdfm[1]:'-', cover: coverm?coverm[1]:'-'});
  }
}

if (!results.length){
  console.log('No books found for category', cat);
  process.exit(0);
}

for (const r of results){
  console.log('-'.repeat(60));
  console.log('ID:   ', r.id);
  console.log('Title:', r.title);
  console.log('PDF:  ', r.pdf);
  console.log('Cover:', r.cover);
}
console.log('-'.repeat(60));
console.log(`Found ${results.length} books in category ${cat}`);
