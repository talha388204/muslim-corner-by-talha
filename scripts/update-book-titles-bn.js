import fs from 'fs';
import path from 'path';

const filePath = path.join('src','data','books.ts');
if (!fs.existsSync(filePath)) {
  console.error('books.ts not found');
  process.exit(1);
}
let content = fs.readFileSync(filePath,'utf8');

// mapping known slugs to Bengali titles
const mapping = {
  "adhar-rater-musafir-nasim-hejaji": "আধার রাতের মুসাফির",
  "ahban-adhunik-monone-mizanur-rahman-azhari": "আহবান আধুনিক মননে",
  "bela-furabar-age": "বেলা ফুরাবার আগে",
  "jibon-jekhane-jemon": "জীবন যেখানে যেমন",
  "maa-o-baba-arif-azad": "মা ও বাবা",
  "paradoxical-sajid-1": "প্যারাডক্সিক্যাল সাজিদ - ১",
  "paradoxical-sajid-2": "প্যারাডক্সিক্যাল সাজিদ - ২",
  "prottyaborton-arif-azad": "প্রত্যাবর্তন"
};

// add saimum series mapping
for (let i = 1; i <= 56; i++) {
  const num = String(i).padStart(2,'0');
  mapping[`saimum-${num}`] = `সাইমুম সিরিজ ${i}`;
}

// regex to find id and title within object blocks
const idTitleRegex = /\{([\s\S]*?)\}/g;

let changed = 0;
content = content.replace(/\{[\s\S]*?\}/g, (match) => {
  // find id
  const idMatch = match.match(/id:\s*"([^"]+)"/);
  if (!idMatch) return match;
  const id = idMatch[1];
  if (!mapping[id]) return match;
  // replace title: "..."
  const newTitle = mapping[id];
  if (/title:\s*"[^"]+"/.test(match)) {
    const replaced = match.replace(/title:\s*"[^"]+"/, `title: "${newTitle}"`);
    if (replaced !== match) changed++;
    return replaced;
  }
  return match;
});

if (changed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${changed} title(s) in src/data/books.ts`);
} else {
  console.log('No titles updated (no matching ids found)');
}
