import fs from 'fs';
import path from 'path';

const filePath = path.join('src','data','books.ts');
if (!fs.existsSync(filePath)) { console.error('books.ts not found'); process.exit(1); }
let content = fs.readFileSync(filePath,'utf8');

function toBanglaDigits(n){
  return String(n).split('').map(d => {
    if (/[0-9]/.test(d)) return '০১২৩৪৫৬৭৮৯'[d];
    return d;
  }).join('');
}

// mapping by slug fragment -> Bengali base title
const baseMap = {
  'maariful-quran': 'মাআরেফুল কুরআন',
  'mishkat': 'মিশকাত শরীফ',
  'mishkat-shorif': 'মিশকাত শরীফ',
  'imdadia-hafezi-quran': 'ইমদাদিয়া হাফেজী কুরআন',
  'tafheemul-quran': 'তাফহিমুল কুরআন',
  'tafheemul-quran-ampara': 'তাফহিমুল কুরআন',
  'quran-arabic-bangla-translation': 'কুরআন (আরবি-বাংলা অনুবাদ)',
  'seeratur-rasool': 'সীরাতুর রাসুল',
  'dhulimlin-upohar': 'ধূলিমলিন উপহার - রামাদান',
  'nobider-kahini': 'নবীদের জীবন কাহিনি',
  'hafizi-quran': 'হাফেজী কুরআন',
};

// crude parser: find each book object and update title
const re = /\{([\s\S]*?)\}/g;
let m;let count=0; const changes = [];

content = content.replace(/\{([\s\S]*?)\}/g, (full, inner) => {
  const idMatch = inner.match(/id:\s*"([^"]+)"/);
  const titleMatch = inner.match(/title:\s*"([^"]*)"/);
  if (!idMatch || !titleMatch) return full;
  const id = idMatch[1];
  let title = titleMatch[1];
  const slug = id.toLowerCase();

  // if title already contains Bangla characters, skip
  if (/[\u0980-\u09FF]/.test(title)) return full;

  // remove trailing ' pdf' or '.pdf'
  title = title.replace(/\s*pdf$/i,'').replace(/\.pdf$/i,'').trim();

  // try to map by slug fragments
  let newTitle = null;
  for (const k of Object.keys(baseMap)){
    if (slug.includes(k)){
      const base = baseMap[k];
      // detect trailing number in slug or original title
      const numMatch = slug.match(/(\d{1,2})$/) || title.match(/(\d{1,2})$/);
      if (numMatch){
        const bn = toBanglaDigits(numMatch[1]);
        newTitle = `${base} (${bn})`;
      } else {
        newTitle = base;
      }
      break;
    }
  }

  // special-case: titles like "maariful quran 01 pdf" -> map
  if (!newTitle){
    const tLower = title.toLowerCase();
    for (const k of Object.keys(baseMap)){
      if (tLower.includes(k)){
        const base = baseMap[k];
        const numMatch = tLower.match(/(\d{1,2})$/);
        if (numMatch) newTitle = `${base} (${toBanglaDigits(numMatch[1])})`;
        else newTitle = base;
        break;
      }
    }
  }

  // fallback: if title is ascii and contains numbers e.g., "maariful quran 01" try to humanize
  if (!newTitle){
    const genericNum = title.match(/(\d{1,2})$/);
    if (genericNum){
      // attempt to take words before number as base and convert number
      const base = title.replace(/(\d{1,2})$/,'').replace(/[-_\.]+/g,' ').trim();
      newTitle = base ? `${base} (${toBanglaDigits(genericNum[1])})` : null;
    }
  }

  if (newTitle){
    const replaced = inner.replace(/title:\s*"[^"]*"/, `title: "${newTitle}"`);
    changes.push({id, old: titleMatch[1], new: newTitle});
    count++;
    return '{' + replaced + '}';
  }

  // no change
  return full;
});

if (count>0){
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${count} titles.`);
  for (const c of changes.slice(0,50)) console.log(c.id, '→', c.new);
} else {
  console.log('No titles changed');
}
