import fs from 'fs';
import path from 'path';

// Generates SVG covers with category-aware themes (v2)
// Usage: node scripts/generate-svg-covers-v2.js

const mapping = {
  "adhar-rater-musafir-nasim-hejaji": { title: "আধার রাতের মুসাফির", author: "নাসিম হেজাজী" },
  "ahban-adhunik-monone-mizanur-rahman-azhari": { title: "আহবান আধুনিক মননে", author: "মিজানুর রহমান" },
  "bela-furabar-age": { title: "বেলা ফুরাবার আগে", author: "আরিফ আজাদ" },
  "jibon-jekhane-jemon": { title: "জীবন যেখানে যেমন", author: "আরিফ আজাদ" },
  "maa-o-baba-arif-azad": { title: "মা ও বাবা", author: "আরিফ আজাদ" },
  "paradoxical-sajid-1": { title: "প্যারাডক্সিক্যাল সাজিদ - ১", author: "" },
  "paradoxical-sajid-2": { title: "প্যারাডক্সিক্যাল সাজিদ - ২", author: "" },
  "prottyaborton-arif-azad": { title: "প্রত্যাবর্তন", author: "আরিফ আজাদ" }
};

for (let i = 1; i <= 56; i++) {
  const num = String(i).padStart(2, '0');
  mapping[`saimum-${num}`] = { title: `সাইমুম সিরিজ ${i}`, author: "" };
}

function escapeXml(s) {
  return (s||"").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function wrapLines(text, maxCharsPerLine = 16, maxLines = 4) {
  const words = (text||"").split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length <= maxCharsPerLine) {
      current = (current + ' ' + w).trim();
    } else {
      if (lines.length + 1 === maxLines) {
        current = (current + ' ' + w).trim();
        lines.push(current);
        current = '';
        break;
      }
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function makeSVG(title, author, category) {
  const w = 600;
  const h = 900;
  const titleEsc = escapeXml(title);
  const authorEsc = escapeXml(author);

  const lines = wrapLines(titleEsc, 16, 4);
  const lineTSpans = lines.map((ln, idx) => `        <tspan x="300" dy="${idx===0?0:56}" font-size="${idx===0?40:34}" font-weight="700">${ln}</tspan>`).join('\n');

  const catNorm = (category || '').replace(/\s+/g, '').toLowerCase();
  const isSeries = catNorm.includes('সিরিজ') || catNorm.includes('series');
  const isIslamicLit = catNorm.includes('ইসলামিকসাহিত্য') || (catNorm.includes('ইসলামিক') && catNorm.includes('সাহিত্য')) || catNorm.includes('islamic');
  const isQuran = catNorm.includes('কুরআন') || catNorm.includes('quran');
  const isHadith = catNorm.includes('হাদিস') || catNorm.includes('hadith');
  const isCorner = catNorm.includes('ইসলামিককর্নার') || catNorm.includes('islamiccorner') || catNorm.includes('islamiccorner');

  const titleFill = isIslamicLit || isQuran || isHadith || isCorner ? '#2b1f12' : '#ffffff';
  const authorFill = isIslamicLit || isQuran || isHadith || isCorner ? '#6b4f3a' : '#f3e7e7';

  const bgGrad = isSeries
    ? ` <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0%" stop-color="#061616"/>\n      <stop offset="100%" stop-color="#071b19"/>\n    </linearGradient>`
    : isQuran
    ? ` <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0%" stop-color="#f3fbff"/>\n      <stop offset="100%" stop-color="#e6f3fb"/>\n    </linearGradient>`
    : isHadith
    ? ` <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0%" stop-color="#fbf8f2"/>\n      <stop offset="100%" stop-color="#f4efe4"/>\n    </linearGradient>`
    : isCorner
    ? ` <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0%" stop-color="#f5fbf7"/>\n      <stop offset="100%" stop-color="#eef7ef"/>\n    </linearGradient>`
    : isIslamicLit
    ? ` <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0%" stop-color="#fbf7f0"/>\n      <stop offset="100%" stop-color="#f6e6d0"/>\n    </linearGradient>`
    : ` <linearGradient id="g" x1="0" x2="1">\n      <stop offset="0%" stop-color="#0f172a"/>\n      <stop offset="100%" stop-color="#0b1220"/>\n    </linearGradient>`;

  const coverGradDef = isSeries
    ? ` <linearGradient id="coverGrad" x1="0" x2="1">\n      <stop offset="0%" stop-color="#0f6b5f"/>\n      <stop offset="50%" stop-color="#0b8f75"/>\n      <stop offset="100%" stop-color="#04604c"/>\n    </linearGradient>`
    : isQuran
    ? ` <linearGradient id="coverGrad" x1="0" x2="1">\n      <stop offset="0%" stop-color="#e6fbf4"/>\n      <stop offset="50%" stop-color="#cfeef0"/>\n      <stop offset="100%" stop-color="#aee7dd"/>\n    </linearGradient>`
    : isHadith
    ? ` <linearGradient id="coverGrad" x1="0" x2="1">\n      <stop offset="0%" stop-color="#fff7ec"/>\n      <stop offset="50%" stop-color="#fde6c8"/>\n      <stop offset="100%" stop-color="#f6d9a8"/>\n    </linearGradient>`
    : isCorner
    ? ` <linearGradient id="coverGrad" x1="0" x2="1">\n      <stop offset="0%" stop-color="#eefaf0"/>\n      <stop offset="50%" stop-color="#dff4e2"/>\n      <stop offset="100%" stop-color="#c6ebca"/>\n    </linearGradient>`
    : isIslamicLit
    ? ` <linearGradient id="coverGrad" x1="0" x2="1">\n      <stop offset="0%" stop-color="#fff6ec"/>\n      <stop offset="50%" stop-color="#fde8c7"/>\n      <stop offset="100%" stop-color="#f7dfb2"/>\n    </linearGradient>`
    : ` <linearGradient id="coverGrad" x1="0" x2="1">\n      <stop offset="0%" stop-color="#b71c1c"/>\n      <stop offset="50%" stop-color="#d18b54"/>\n      <stop offset="100%" stop-color="#8a2b2b"/>\n    </linearGradient>`;

  const accent = isSeries
    ? `<rect x="36" y="36" width="488" height="712" rx="12" fill="none" stroke="#d4b24a" stroke-width="6" opacity="0.95"/>\n      <path d="M300 48 C340 20 380 20 420 48" fill="none" stroke="#d4b24a" stroke-width="6" opacity="0.95"/>\n      <rect x="40" y="700" width="480" height="32" fill="#c79b2a" opacity="0.9"/>`
    : isIslamicLit
    ? `<!-- soft ornamental band + subtle pattern -->\n      <defs>\n        <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">\n          <circle cx="1" cy="1" r="0.8" fill="rgba(0,0,0,0.02)" />\n        </pattern>\n      </defs>\n      <rect x="36" y="36" width="488" height="712" rx="12" fill="url(#dots)" opacity="0.35"/>\n      <rect x="40" y="640" width="480" height="104" rx="8" fill="rgba(255,255,255,0.06)"/>\n      <g fill="#d8b370" opacity="0.95">\n        <circle cx="120" cy="120" r="18" />\n        <circle cx="160" cy="150" r="10" />\n      </g>`
    : '';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n  <defs>\n    ${bgGrad}\n    ${coverGradDef}\n    <filter id="ds" x="-20%" y="-20%" width="140%" height="140%">\n      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000" flood-opacity="0.6"/>\n    </filter>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#g)"/>\n\n  <!-- centered cover card -->\n  <g transform="translate(40,80)">\n    <rect x="20" y="20" width="520" height="760" rx="18" fill="#071026" opacity="0.55"/>\n    <rect x="40" y="40" width="480" height="720" rx="12" fill="url(#coverGrad)" filter="url(#ds)"/>\n    ${accent}\n    <!-- subtle top highlight -->\n    <rect x="40" y="40" width="480" height="80" rx="12" fill="rgba(255,255,255,0.06)"/>\n\n    <!-- title -->\n    <text x="300" y="300" text-anchor="middle" fill="${titleFill}" font-family="Noto Sans, Arial, sans-serif" style="font-weight:700;">\n${lineTSpans}\n    </text>\n    ${authorEsc?`<text x="300" y="520" text-anchor="middle" fill="${authorFill}" font-size="20" font-family="Noto Sans, Arial, sans-serif">${authorEsc}</text>`:""}\n  </g>\n</svg>`;

  return svg;
}

async function main() {
  const booksTs = fs.existsSync(path.join('src','data','books.ts')) ? fs.readFileSync(path.join('src','data','books.ts'),'utf8') : '';
  function getCategory(slug) {
    const needle = `id: "${slug}"`;
    const idPos = booksTs.indexOf(needle);
    if (idPos === -1) return '';
    const after = booksTs.slice(idPos);
    const catPos = after.indexOf('categories:');
    if (catPos === -1) return '';
    const start = after.indexOf('[', catPos);
    const end = after.indexOf(']', start);
    if (start === -1 || end === -1) return '';
    const list = after.slice(start+1, end);
    const items = list.split(',').map(x => x.replace(/['"\s]/g,'')).filter(Boolean);
    return items.join(',');
  }

  for (const [slug, info] of Object.entries(mapping)) {
    const dir = path.join('public','books', slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const category = getCategory(slug);
    const svg = makeSVG(info.title, info.author, category);
    const outPath = path.join(dir, 'cover.svg');
    fs.writeFileSync(outPath, svg, 'utf8');
    console.log('Written', outPath, 'category=', category || '(none)');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
