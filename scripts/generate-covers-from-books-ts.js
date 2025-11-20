import fs from 'fs';
import path from 'path';

// Reads src/data/books.ts and regenerates cover.svg for each book using simple themed SVGs
// Usage: node scripts/generate-covers-from-books-ts.js

const booksTsPath = path.join('src','data','books.ts');
if (!fs.existsSync(booksTsPath)) {
  console.error('books.ts not found');
  process.exit(1);
}
const content = fs.readFileSync(booksTsPath,'utf8');

function extractBooks(ts) {
  // crude parser: find each object starting with {\n    id: "...",
  const objs = [];
  const re = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]*)"[\s\S]*?(author:\s*"([^"]*)")?[\s\S]*?categories:\s*\[([^\]]*)\][\s\S]*?\}/g;
  let m;
  while ((m = re.exec(ts)) !== null) {
    const id = m[1];
    const title = m[2] || id;
    const author = m[4] || '';
    const catsRaw = m[5] || '';
    const cats = catsRaw.split(',').map(x=>x.replace(/['"\s]/g,'')).filter(Boolean);
    objs.push({id,title,author,cats});
  }
  return objs;
}

const books = extractBooks(content);
console.log('Found', books.length, 'books to generate covers for.');

function slugToClass(cat){
  const key = (cat||'').toLowerCase();
  if (!key) return 'default';
  if (key.includes('সিরিজ')||key.includes('series')) return 'series';
  if (key.includes('কুরআন')||key.includes('quran')) return 'quran';
  if (key.includes('হাদিস')||key.includes('hadith')) return 'hadith';
  if (key.includes('কর্নার')||key.includes('corner')) return 'corner';
  if (key.includes('সাহিত্য')||key.includes('sahitto')||key.includes('sahitya')) return 'sahitto';
  return 'default';
}

function makeSvgFor(book){
  const w=600,h=900;
  const titleEsc = (book.title||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const authorEsc = (book.author||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const cat = book.cats && book.cats[0] ? book.cats[0] : '';
  const kind = slugToClass(cat);

  // palettes (soft, low-contrast)
  const palettes = {
    series: {bg1:'#061616', bg2:'#071b19', cover1:'#0f6b5f', cover2:'#04604c', title:'#ffffff', author:'#f3e7e7'},
    quran: {bg1:'#f3fbff', bg2:'#e6f3fb', cover1:'#e6fbf4', cover2:'#aee7dd', title:'#2b1f12', author:'#6b4f3a'},
    hadith: {bg1:'#fbf8f2', bg2:'#f4efe4', cover1:'#fff7ec', cover2:'#f6d9a8', title:'#2b1f12', author:'#6b4f3a'},
    corner: {bg1:'#f5fbf7', bg2:'#eef7ef', cover1:'#eefaf0', cover2:'#c6ebca', title:'#2b1f12', author:'#6b4f3a'},
    sahitto: {bg1:'#fbf7f0', bg2:'#f6e6d0', cover1:'#fff6ec', cover2:'#f7dfb2', title:'#2b1f12', author:'#6b4f3a'},
    default: {bg1:'#0f172a', bg2:'#0b1220', cover1:'#b71c1c', cover2:'#8a2b2b', title:'#ffffff', author:'#f3e7e7'}
  };
  const p = palettes[kind] || palettes.default;

  // simple wrap
  function wrap(text, max=18){
    if (!text) return [''];
    return text.split(/\s+/).reduce((lines, w)=>{
      if (!lines.length) lines.push(w);
      else if ((lines[lines.length-1]+ ' ' + w).length <= max) lines[lines.length-1] += ' ' + w;
      else lines.push(w);
      return lines;
    },[]).slice(0,4);
  }
  const lines = wrap(titleEsc,16);
  const tSpans = lines.map((ln,i)=>`<tspan x="300" dy="${i===0?0:56}" font-size="${i===0?40:34}" font-weight="700">${ln}</tspan>`).join('');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${w}\" height=\"${h}\" viewBox=\"0 0 ${w} ${h}\">\n  <defs>\n    <linearGradient id=\"g\" x1=\"0\" x2=\"1\">\n      <stop offset=\"0%\" stop-color=\"${p.bg1}\"/>\n      <stop offset=\"100%\" stop-color=\"${p.bg2}\"/>\n    </linearGradient>\n    <linearGradient id=\"coverGrad\" x1=\"0\" x2=\"1\">\n      <stop offset=\"0%\" stop-color=\"${p.cover1}\"/>\n      <stop offset=\"100%\" stop-color=\"${p.cover2}\"/>\n    </linearGradient>\n    <filter id=\"ds\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n      <feDropShadow dx=\"0\" dy=\"8\" stdDeviation=\"16\" flood-color=\"#000\" flood-opacity=\"0.6\"/>\n    </filter>\n  </defs>\n  <rect width=\"100%\" height=\"100%\" fill=\"url(#g)\"/>\n  <g transform=\"translate(40,80)\">\n    <rect x=\"20\" y=\"20\" width=\"520\" height=\"760\" rx=\"18\" fill=\"#071026\" opacity=\"0.55\"/>\n    <rect x=\"40\" y=\"40\" width=\"480\" height=\"720\" rx=\"12\" fill=\"url(#coverGrad)\" filter=\"url(#ds)\"/>\n    <rect x=\"40\" y=\"40\" width=\"480\" height=\"80\" rx=\"12\" fill=\"rgba(255,255,255,0.04)\"/>\n    <text x=\"300\" y=\"300\" text-anchor=\"middle\" fill=\"${p.title}\" font-family=\"Noto Sans, Arial, sans-serif\" style=\"font-weight:700;\">\n      ${tSpans}\n    </text>\n    ${authorEsc?`<text x=\"300\" y=\"520\" text-anchor=\"middle\" fill=\"${p.author}\" font-size=\"20\" font-family=\"Noto Sans, Arial, sans-serif\">${authorEsc}</text>`:''}\n  </g>\n</svg>`;

  return svg;
}

let wrote = 0;
for (const b of books){
  const dir = path.join('public','books', b.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
  const out = path.join(dir,'cover.svg');
  const svg = makeSvgFor(b);
  fs.writeFileSync(out, svg, 'utf8');
  wrote++;
}
console.log('Wrote', wrote, 'cover.svg files.');
