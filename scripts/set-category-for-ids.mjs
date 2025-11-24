import fs from 'fs';
import path from 'path';

const booksFile = path.join('src','data','books.ts');
if (!fs.existsSync(booksFile)){
  console.error('books.ts not found'); process.exit(1);
}

let text = fs.readFileSync(booksFile,'utf8');
const ids = [
  'চোখের_হেফাযত_ও_জবানের_হেফাযত',
  'নারীরা ভুল করে কোথায়',
  'পাশ্চাত্য_নারীসমাজ_ও_ইসলাম_',
  'ফিমেল মাইন্ড short pdf',
  'ভুমিকম্পের_কারণ_ও_আমাদের_করণীয়',
  'মহিলা_সাহাবীগণের_জীবনাদর্শ_',
  "সংসার_সুখের_হয়_দু'জনের_গুণে"
];

const newCategory = 'ইসলামিক সাহিত্য';
let changed = 0;

for (const id of ids){
  const idx = text.indexOf(`id: "${id}"`);
  if (idx === -1){
    console.warn('id not found in file:', id); continue;
  }
  // search for categories: [...] after idx
  const sub = text.slice(idx, idx + 800); // look ahead
  const m = sub.match(/categories\s*:\s*\[[^\]]*\]/);
  if (!m){
    console.warn('categories not found for id:', id); continue;
  }
  const old = m[0];
  const replacement = `categories: ["${newCategory}"]`;
  text = text.slice(0, idx) + text.slice(idx).replace(old, replacement);
  changed++;
}

fs.writeFileSync(booksFile, text, 'utf8');
console.log(`Updated ${changed} items in ${booksFile}`);
