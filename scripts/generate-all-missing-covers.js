import fs from 'fs';
import path from 'path';

// Generates professional SVG covers for all books missing cover images
// Usage: node scripts/generate-all-missing-covers.js

function escapeXml(s) {
  return (s || "").replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrapLines(text, maxCharsPerLine = 18, maxLines = 4) {
  const words = (text || "").split(/\s+/);
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

function getCategoryStyle(categories) {
  const catStr = (categories || []).join(' ').toLowerCase();
  
  // Islamic Series
  if (catStr.includes('সিরিজ') || catStr.includes('series')) {
    return {
      bgGradient: ['#0a3d2e', '#0d5244', '#0a3d2e'],
      coverGradient: ['#0d5c4a', '#107a5f', '#0b4d3c'],
      accentColor: '#d4b24a',
      titleColor: '#ffffff',
      authorColor: '#e8d4a0',
      pattern: 'series',
      decorativeElements: 'badge'
    };
  }
  
  // Quran
  if (catStr.includes('কুরআন') || catStr.includes('quran')) {
    return {
      bgGradient: ['#0d3d4a', '#105666', '#0d3d4a'],
      coverGradient: ['#0e6b7d', '#12a8c7', '#0c5a6b'],
      accentColor: '#ffc857',
      titleColor: '#ffffff',
      authorColor: '#ffeaa7',
      pattern: 'mosque',
      decorativeElements: 'islamic'
    };
  }
  
  // Hadith
  if (catStr.includes('হাদিস') || catStr.includes('hadith')) {
    return {
      bgGradient: ['#3d2817', '#5a3a20', '#3d2817'],
      coverGradient: ['#7d5a3a', '#a87c4f', '#6b4d31'],
      accentColor: '#d4a574',
      titleColor: '#ffffff',
      authorColor: '#f0ddc8',
      pattern: 'scroll',
      decorativeElements: 'ancient'
    };
  }
  
  // Tafsir
  if (catStr.includes('তাফসির') || catStr.includes('tafsir')) {
    return {
      bgGradient: ['#1a2634', '#253648', '#1a2634'],
      coverGradient: ['#2d4a5c', '#3d6a82', '#264558'],
      accentColor: '#70c1b3',
      titleColor: '#ffffff',
      authorColor: '#b8dfd8',
      pattern: 'geometric',
      decorativeElements: 'elegant'
    };
  }
  
  // Islamic Literature
  if (catStr.includes('সাহিত্য') || catStr.includes('literature')) {
    return {
      bgGradient: ['#2d1f3f', '#4a3259', '#2d1f3f'],
      coverGradient: ['#5a4273', '#8b5fb3', '#4d3661'],
      accentColor: '#c084fc',
      titleColor: '#ffffff',
      authorColor: '#e9d5ff',
      pattern: 'floral',
      decorativeElements: 'arabesque'
    };
  }
  
  // Islamic Corner
  if (catStr.includes('কর্নার') || catStr.includes('corner')) {
    return {
      bgGradient: ['#2d1b3d', '#4a2e5c', '#2d1b3d'],
      coverGradient: ['#6b4a8c', '#8b5fb3', '#6b4a8c'],
      accentColor: '#c084fc',
      titleColor: '#ffffff',
      authorColor: '#d8b4fe',
      pattern: 'star',
      decorativeElements: 'crescent'
    };
  }
  
  // Popular Books (জনপ্রিয় বই)
  if (catStr.includes('জনপ্রিয়') || catStr.includes('popular')) {
    return {
      bgGradient: ['#1e3a5f', '#2d5a8c', '#1e3a5f'],
      coverGradient: ['#3d6fa3', '#5596d4', '#2f5c8a'],
      accentColor: '#ffd700',
      titleColor: '#ffffff',
      authorColor: '#ffe699',
      pattern: 'modern',
      decorativeElements: 'stars'
    };
  }
  
  // Default
  return {
    bgGradient: ['#1a1a2e', '#2d2d44', '#1a1a2e'],
    coverGradient: ['#3d3d5c', '#5a5a82', '#34344f'],
    accentColor: '#a8dadc',
    titleColor: '#ffffff',
    authorColor: '#f1faee',
    pattern: 'simple',
    decorativeElements: 'minimal'
  };
}

function generatePattern(style) {
  const uniqueId = Math.random().toString(36).substring(2, 9);
  
  if (style.pattern === 'series') {
    return `
    <pattern id="pattern${uniqueId}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.5" fill="${style.accentColor}" opacity="0.1"/>
      <circle cx="80" cy="80" r="1.5" fill="${style.accentColor}" opacity="0.1"/>
      <line x1="10" y1="50" x2="30" y2="50" stroke="${style.accentColor}" stroke-width="0.5" opacity="0.08"/>
    </pattern>`;
  }
  
  if (style.pattern === 'mosque') {
    return `
    <pattern id="pattern${uniqueId}" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
      <path d="M60 40 L70 60 L50 60 Z" fill="${style.accentColor}" opacity="0.06"/>
      <circle cx="60" cy="75" r="8" fill="none" stroke="${style.accentColor}" stroke-width="1" opacity="0.05"/>
    </pattern>`;
  }
  
  if (style.pattern === 'scroll') {
    return `
    <pattern id="pattern${uniqueId}" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M10 40 Q30 30 50 40 T90 40" fill="none" stroke="${style.accentColor}" stroke-width="0.8" opacity="0.06"/>
    </pattern>`;
  }
  
  if (style.pattern === 'star') {
    return `
    <pattern id="pattern${uniqueId}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M50 25 L54 38 L68 38 L57 46 L61 59 L50 51 L39 59 L43 46 L32 38 L46 38 Z" fill="${style.accentColor}" opacity="0.08"/>
      <path d="M30 70 Q25 65 25 60 Q25 50 35 50 Q30 55 30 60 Q30 65 35 70 Z" fill="${style.accentColor}" opacity="0.1"/>
      <circle cx="38" cy="60" r="2" fill="${style.accentColor}" opacity="0.12"/>
    </pattern>`;
  }
  
  return `
    <pattern id="pattern${uniqueId}" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="${style.accentColor}" opacity="0.05"/>
    </pattern>`;
}

function generateDecorations(style, uniqueId) {
  if (style.decorativeElements === 'badge') {
    return `
    <!-- Series Badge -->
    <rect x="40" y="700" width="480" height="40" fill="${style.accentColor}" opacity="0.15" rx="0 0 12 12"/>
    <rect x="200" y="710" width="160" height="3" fill="${style.accentColor}" opacity="0.4" rx="1.5"/>`;
  }
  
  if (style.decorativeElements === 'islamic' || style.decorativeElements === 'crescent') {
    return `
    <!-- Star and Crescent -->
    <g opacity="0.75">
      <path d="M250 70 L255 88 L274 88 L259 99 L264 117 L250 106 L236 117 L241 99 L226 88 L245 88 Z" 
            fill="none" stroke="${style.accentColor}" stroke-width="2.5"/>
      <path d="M210 110 Q203 103 203 95 Q203 80 218 80 Q210 87 210 95 Q210 103 218 110 Z" 
            fill="none" stroke="${style.accentColor}" stroke-width="2.5"/>
      <circle cx="222" cy="95" r="4" fill="${style.accentColor}"/>
    </g>`;
  }
  
  if (style.decorativeElements === 'ancient' || style.decorativeElements === 'arabesque') {
    return `
    <!-- Ornamental Flourish -->
    <g opacity="0.7">
      <path d="M220 80 Q230 70 240 80 T260 80" fill="none" stroke="${style.accentColor}" stroke-width="2" opacity="0.6"/>
      <circle cx="240" cy="80" r="6" fill="none" stroke="${style.accentColor}" stroke-width="1.5"/>
    </g>`;
  }
  
  return '';
}

function makeSVG(title, author, categories) {
  const uniqueId = Math.random().toString(36).substring(2, 9);
  const style = getCategoryStyle(categories);
  const titleEsc = escapeXml(title);
  const authorEsc = escapeXml(author);
  
  const lines = wrapLines(titleEsc, 18, 4);
  const lineTSpans = lines.map((ln, idx) => 
    `      <tspan x="250" dy="${idx === 0 ? 0 : 56}" font-size="${idx === 0 ? 40 : 36}">${ln}</tspan>`
  ).join('\n');
  
  const pattern = generatePattern(style);
  const decorations = generateDecorations(style, uniqueId);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs>
    <linearGradient id="bg${uniqueId}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${style.bgGradient[0]}"/>
      <stop offset="50%" stop-color="${style.bgGradient[1]}"/>
      <stop offset="100%" stop-color="${style.bgGradient[2]}"/>
    </linearGradient>
    <linearGradient id="cover${uniqueId}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${style.coverGradient[0]}"/>
      <stop offset="50%" stop-color="${style.coverGradient[1]}"/>
      <stop offset="100%" stop-color="${style.coverGradient[2]}"/>
    </linearGradient>
    <filter id="shadow${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000" flood-opacity="0.7"/>
    </filter>
    ${pattern}
    <linearGradient id="shine${uniqueId}" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#bg${uniqueId})"/>
  <rect width="100%" height="100%" fill="url(#pattern${uniqueId})"/>

  <!-- 3D Book Container -->
  <g transform="translate(50,60)">
    <!-- Shadow for 3D effect -->
    <rect x="25" y="25" width="500" height="800" rx="16" fill="#000" opacity="0.3"/>
    <rect x="20" y="20" width="500" height="800" rx="16" fill="${style.bgGradient[0]}"/>
    
    <!-- Main Cover -->
    <rect x="0" y="0" width="500" height="800" rx="16" fill="url(#cover${uniqueId})" filter="url(#shadow${uniqueId})"/>
    
    <!-- Ornamental Borders -->
    <rect x="20" y="20" width="460" height="760" rx="12" fill="none" stroke="${style.accentColor}" stroke-width="4" opacity="0.9"/>
    <rect x="30" y="30" width="440" height="740" rx="10" fill="none" stroke="${style.accentColor}" stroke-width="2" opacity="0.6"/>
    
    <!-- Category-Specific Decorative Elements -->
    ${decorations}
    
    <!-- Ornamental Divider Top -->
    <path d="M100 180 Q150 165 200 180 T300 180 T400 180" fill="none" stroke="${style.accentColor}" stroke-width="2.5" opacity="0.7"/>
    <path d="M120 190 Q150 180 180 190" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.5"/>
    <path d="M320 190 Q350 180 380 190" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.5"/>
    
    <!-- Title Background -->
    <rect x="50" y="230" width="400" height="300" rx="8" fill="#000" opacity="0.15"/>
    
    <!-- Title Text -->
    <text x="250" y="310" text-anchor="middle" fill="${style.titleColor}" font-family="'Noto Sans Bengali', 'Noto Sans', Arial, sans-serif" font-weight="700">
${lineTSpans}
      ${authorEsc ? `<tspan x="250" dy="80" font-size="24" font-weight="400" fill="${style.authorColor}">${authorEsc}</tspan>` : ''}
    </text>
    
    <!-- Ornamental Divider Bottom -->
    <path d="M100 580 Q150 565 200 580 T300 580 T400 580" fill="none" stroke="${style.accentColor}" stroke-width="2.5" opacity="0.7"/>
    <path d="M120 590 Q150 580 180 590" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.5"/>
    <path d="M320 590 Q350 580 380 590" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.5"/>
    
    <!-- Bottom Decorative Band -->
    <rect x="0" y="750" width="500" height="50" fill="${style.accentColor}" opacity="0.15" rx="0 0 16 16"/>
    <rect x="150" y="765" width="200" height="3" fill="${style.accentColor}" opacity="0.3" rx="1.5"/>
    
    <!-- Shine Effect for 3D look -->
    <rect x="0" y="0" width="180" height="800" rx="16" fill="url(#shine${uniqueId})"/>
    
    <!-- Corner Decorations -->
    <circle cx="60" cy="60" r="8" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.4"/>
    <circle cx="440" cy="60" r="8" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.4"/>
    <circle cx="60" cy="740" r="8" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.4"/>
    <circle cx="440" cy="740" r="8" fill="none" stroke="${style.accentColor}" stroke-width="1.5" opacity="0.4"/>
  </g>
</svg>`;
}

async function main() {
  // Read books.ts
  const booksPath = path.join('src', 'data', 'books.ts');
  if (!fs.existsSync(booksPath)) {
    console.error('Error: books.ts not found at', booksPath);
    process.exit(1);
  }
  
  const booksContent = fs.readFileSync(booksPath, 'utf8');
  
  // Extract all books
  const bookRegex = /\{\s*id:\s*"([^"]+)"[^}]*title:\s*"([^"]+)"[^}]*author:\s*"([^"]*)"[^}]*categories:\s*\[([^\]]*)\]/g;
  const books = [];
  let match;
  
  while ((match = bookRegex.exec(booksContent)) !== null) {
    const id = match[1];
    const title = match[2];
    const author = match[3];
    const categoriesStr = match[4];
    const categories = categoriesStr
      .split(',')
      .map(c => c.replace(/["'\s]/g, ''))
      .filter(Boolean);
    
    books.push({ id, title, author, categories });
  }
  
  console.log(`Found ${books.length} books in books.ts`);
  
  let generated = 0;
  let skipped = 0;
  
  for (const book of books) {
    const bookDir = path.join('public', 'books', book.id);
    const coverSvgPath = path.join(bookDir, 'cover.svg');
    const coverPngPath = path.join(bookDir, 'cover.png');
    
    // Check if cover already exists
    if (fs.existsSync(coverSvgPath) || fs.existsSync(coverPngPath)) {
      skipped++;
      continue;
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(bookDir)) {
      fs.mkdirSync(bookDir, { recursive: true });
    }
    
    // Generate SVG cover
    const svg = makeSVG(book.title, book.author, book.categories);
    fs.writeFileSync(coverSvgPath, svg, 'utf8');
    
    generated++;
    console.log(`✓ Generated cover for: ${book.title} (${book.categories.join(', ')})`);
  }
  
  console.log(`\n✨ Done! Generated ${generated} covers, skipped ${skipped} existing covers.`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
