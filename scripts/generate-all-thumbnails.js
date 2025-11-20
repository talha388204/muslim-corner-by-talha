/**
 * Generate professional SVG covers for all books based on their category
 * 
 * Usage:
 * node scripts/generate-all-thumbnails.js
 */

const fs = require('fs');
const path = require('path');

// Category-based design themes
const categoryThemes = {
  'কুরআন': {
    bgGradient: ['#0a4a3a', '#0d6e5c', '#0a4a3a'],
    coverGradient: ['#1a8c6d', '#22b382', '#1a8c6d'],
    accent: '#fbbf24',
    patternColor: '#2dd4af',
    textColor: '#ffffff'
  },
  'হাদিস': {
    bgGradient: ['#4a2c0a', '#6e490d', '#4a2c0a'],
    coverGradient: ['#8c5a1a', '#b37722', '#8c5a1a'],
    accent: '#fcd34d',
    patternColor: '#fde047',
    textColor: '#ffffff'
  },
  'তাফসির': {
    bgGradient: ['#1e3a5f', '#2d5a8f', '#1e3a5f'],
    coverGradient: ['#3b6ca8', '#4a8ed2', '#3b6ca8'],
    accent: '#60a5fa',
    patternColor: '#93c5fd',
    textColor: '#ffffff'
  },
  'ইসলামিক কর্নার': {
    bgGradient: ['#2d1b3d', '#4a2e5c', '#2d1b3d'],
    coverGradient: ['#6b4a8c', '#8b5fb3', '#6b4a8c'],
    accent: '#c084fc',
    patternColor: '#d8b4fe',
    textColor: '#ffffff'
  },
  'ইসলামিক সাহিত্য': {
    bgGradient: ['#3d1b1b', '#5c2e2e', '#3d1b1b'],
    coverGradient: ['#8c4a4a', '#b35f5f', '#8c4a4a'],
    accent: '#fb7185',
    patternColor: '#fda4af',
    textColor: '#ffffff'
  },
  'জনপ্রিয় বই': {
    bgGradient: ['#1b3d2d', '#2e5c4a', '#1b3d2d'],
    coverGradient: ['#4a8c6b', '#5fb38b', '#4a8c6b'],
    accent: '#34d399',
    patternColor: '#6ee7b7',
    textColor: '#ffffff'
  },
  'ইসলামিক সিরিজ': {
    bgGradient: ['#061616', '#071b19', '#061616'],
    coverGradient: ['#0f6b5f', '#0b8f75', '#04604c'],
    accent: '#d4b24a',
    patternColor: '#c79b2a',
    textColor: '#ffffff'
  }
};

function wrapText(text, maxLength = 15) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxLength) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  
  return lines;
}

function generateSVGCover(title, category) {
  const theme = categoryThemes[category] || categoryThemes['ইসলামিক কর্নার'];
  const titleLines = wrapText(title, 15);
  
  const id = Math.random().toString(36).substring(7);
  
  let titleTspans = '';
  const startY = titleLines.length > 2 ? 280 : 320;
  titleLines.forEach((line, i) => {
    const fontSize = i === 0 ? 38 : 36;
    titleTspans += `<tspan x="250" dy="${i === 0 ? 0 : 55}" font-size="${fontSize}">${line}</tspan>\n      `;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs>
    <linearGradient id="bg${id}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${theme.bgGradient[0]}"/>
      <stop offset="50%" stop-color="${theme.bgGradient[1]}"/>
      <stop offset="100%" stop-color="${theme.bgGradient[2]}"/>
    </linearGradient>
    <linearGradient id="cover${id}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${theme.coverGradient[0]}"/>
      <stop offset="50%" stop-color="${theme.coverGradient[1]}"/>
      <stop offset="100%" stop-color="${theme.coverGradient[2]}"/>
    </linearGradient>
    <filter id="shadow${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000" flood-opacity="0.7"/>
    </filter>
    <pattern id="pattern${id}" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M40 0 L45 15 L60 20 L45 25 L40 40 L35 25 L20 20 L35 15 Z" fill="${theme.patternColor}" opacity="0.1"/>
    </pattern>
    <linearGradient id="shine${id}" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#bg${id})"/>
  <rect width="100%" height="100%" fill="url(#pattern${id})"/>

  <g transform="translate(50,60)">
    <rect x="25" y="25" width="500" height="800" rx="16" fill="#000" opacity="0.3"/>
    <rect x="20" y="20" width="500" height="800" rx="16" fill="${theme.bgGradient[0]}"/>
    <rect x="0" y="0" width="500" height="800" rx="16" fill="url(#cover${id})" filter="url(#shadow${id})"/>
    
    <rect x="20" y="20" width="460" height="760" rx="12" fill="none" stroke="${theme.accent}" stroke-width="4" opacity="0.9"/>
    <rect x="30" y="30" width="440" height="740" rx="10" fill="none" stroke="${theme.accent}" stroke-width="2" opacity="0.6"/>
    
    <circle cx="250" cy="120" r="60" fill="none" stroke="${theme.accent}" stroke-width="3" opacity="0.7"/>
    <circle cx="250" cy="120" r="50" fill="none" stroke="${theme.accent}" stroke-width="2" opacity="0.5"/>
    <path d="M250 70 L250 170 M200 120 L300 120" stroke="${theme.accent}" stroke-width="2" opacity="0.6"/>
    
    <path d="M100 200 Q150 180 200 200 T300 200 T400 200" fill="none" stroke="${theme.accent}" stroke-width="2" opacity="0.7"/>
    
    <rect x="60" y="250" width="380" height="300" rx="8" fill="#000" opacity="0.2"/>
    
    <text x="250" y="${startY}" text-anchor="middle" fill="${theme.textColor}" font-family="'Noto Sans Bengali', 'Noto Sans', Arial, sans-serif" font-weight="700">
      ${titleTspans}
    </text>
    
    <path d="M100 580 Q150 560 200 580 T300 580 T400 580" fill="none" stroke="${theme.accent}" stroke-width="2" opacity="0.7"/>
    <rect x="0" y="750" width="500" height="50" fill="${theme.accent}" opacity="0.2" rx="0 0 16 16"/>
    
    <rect x="0" y="0" width="200" height="800" rx="16" fill="url(#shine${id})"/>
  </g>
</svg>`;
}

// Read books.ts to get all book data
const booksContent = fs.readFileSync('src/data/books.ts', 'utf-8');

// Extract book data
const bookMatches = [...booksContent.matchAll(/\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)"[^}]*categories:\s*\["([^"]+)"\]/g)];

console.log(`Found ${bookMatches.length} books to process`);

let successCount = 0;
let errorCount = 0;

bookMatches.forEach((match) => {
  const [, id, title, category] = match;
  const coverPath = path.join('public', 'books', id, 'cover.svg');
  
  try {
    const svg = generateSVGCover(title, category);
    const dir = path.dirname(coverPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(coverPath, svg, 'utf-8');
    successCount++;
    console.log(`✓ Generated: ${id}`);
  } catch (error) {
    errorCount++;
    console.error(`✗ Error generating ${id}:`, error.message);
  }
});

console.log(`\n✅ Successfully generated: ${successCount} covers`);
console.log(`❌ Errors: ${errorCount}`);
