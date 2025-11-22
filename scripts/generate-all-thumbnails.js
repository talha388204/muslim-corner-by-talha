/**
 * Generate professional SVG covers for all books based on their category
 * with unique Islamic patterns, calligraphy elements, and geometric designs
 * 
 * Usage:
 * node scripts/generate-all-thumbnails.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Category-based design themes with unique patterns
const categoryThemes = {
  'কুরআন': {
    bgGradient: ['#0a4a3a', '#0d6e5c', '#0a4a3a'],
    coverGradient: ['#1a8c6d', '#22b382', '#1a8c6d'],
    accent: '#fbbf24',
    accentSecondary: '#34d399',
    patternColor: '#2dd4af',
    textColor: '#ffffff',
    pattern: 'mosque', // Mosque dome and minaret patterns
  },
  'হাদিস': {
    bgGradient: ['#4a2c0a', '#6e490d', '#4a2c0a'],
    coverGradient: ['#8c5a1a', '#b37722', '#8c5a1a'],
    accent: '#fcd34d',
    accentSecondary: '#fbbf24',
    patternColor: '#fde047',
    textColor: '#ffffff',
    pattern: 'scroll', // Ancient scroll and book patterns
  },
  'তাফসির': {
    bgGradient: ['#1e3a5f', '#2d5a8f', '#1e3a5f'],
    coverGradient: ['#3b6ca8', '#4a8ed2', '#3b6ca8'],
    accent: '#60a5fa',
    accentSecondary: '#93c5fd',
    patternColor: '#93c5fd',
    textColor: '#ffffff',
    pattern: 'bookstack', // Stacked books pattern
  },
  'ইসলামিক কর্নার': {
    bgGradient: ['#2d1b3d', '#4a2e5c', '#2d1b3d'],
    coverGradient: ['#6b4a8c', '#8b5fb3', '#6b4a8c'],
    accent: '#c084fc',
    accentSecondary: '#e879f9',
    patternColor: '#d8b4fe',
    textColor: '#ffffff',
    pattern: 'star', // Star and crescent patterns
  },
  'ইসলামিক সাহিত্য': {
    bgGradient: ['#3d1b1b', '#5c2e2e', '#3d1b1b'],
    coverGradient: ['#8c4a4a', '#b35f5f', '#8c4a4a'],
    accent: '#fb7185',
    accentSecondary: '#fda4af',
    patternColor: '#fda4af',
    textColor: '#ffffff',
    pattern: 'floral', // Islamic floral arabesque patterns
  },
  'জনপ্রিয় বই': {
    bgGradient: ['#1b3d2d', '#2e5c4a', '#1b3d2d'],
    coverGradient: ['#4a8c6b', '#5fb38b', '#4a8c6b'],
    accent: '#34d399',
    accentSecondary: '#6ee7b7',
    patternColor: '#6ee7b7',
    textColor: '#ffffff',
    pattern: 'geometric', // Modern geometric patterns
  },
  'ইসলামিক সিরিজ': {
    bgGradient: ['#061616', '#071b19', '#061616'],
    coverGradient: ['#0f6b5f', '#0b8f75', '#04604c'],
    accent: '#d4b24a',
    accentSecondary: '#c79b2a',
    patternColor: '#c79b2a',
    textColor: '#ffffff',
    pattern: 'series', // Series badge and number styling
  }
};

// Generate unique pattern for each category
function getPatternSVG(patternType, id, color) {
  const patterns = {
    mosque: `
      <pattern id="pattern${id}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <!-- Mosque dome -->
        <path d="M50 20 Q30 20 30 35 L30 50 L70 50 L70 35 Q70 20 50 20 Z" fill="${color}" opacity="0.08"/>
        <circle cx="50" cy="20" r="8" fill="${color}" opacity="0.1"/>
        <!-- Minarets -->
        <rect x="25" y="50" width="4" height="25" fill="${color}" opacity="0.06"/>
        <rect x="71" y="50" width="4" height="25" fill="${color}" opacity="0.06"/>
        <circle cx="27" cy="48" r="3" fill="${color}" opacity="0.08"/>
        <circle cx="73" cy="48" r="3" fill="${color}" opacity="0.08"/>
      </pattern>`,
    
    scroll: `
      <pattern id="pattern${id}" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
        <!-- Ancient scroll -->
        <rect x="20" y="30" width="50" height="30" rx="3" fill="${color}" opacity="0.06"/>
        <circle cx="20" cy="45" r="8" fill="${color}" opacity="0.08"/>
        <circle cx="70" cy="45" r="8" fill="${color}" opacity="0.08"/>
        <line x1="28" y1="38" x2="62" y2="38" stroke="${color}" stroke-width="1.5" opacity="0.1"/>
        <line x1="28" y1="45" x2="62" y2="45" stroke="${color}" stroke-width="1.5" opacity="0.1"/>
        <line x1="28" y1="52" x2="62" y2="52" stroke="${color}" stroke-width="1.5" opacity="0.1"/>
      </pattern>`,
    
    bookstack: `
      <pattern id="pattern${id}" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <!-- Stacked books -->
        <rect x="15" y="55" width="50" height="8" fill="${color}" opacity="0.08"/>
        <rect x="20" y="45" width="40" height="8" fill="${color}" opacity="0.1"/>
        <rect x="18" y="35" width="44" height="8" fill="${color}" opacity="0.06"/>
        <line x1="15" y1="55" x2="18" y2="43" stroke="${color}" stroke-width="1" opacity="0.08"/>
        <line x1="65" y1="55" x2="62" y2="43" stroke="${color}" stroke-width="1" opacity="0.08"/>
      </pattern>`,
    
    star: `
      <pattern id="pattern${id}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <!-- Star and Crescent -->
        <path d="M50 25 L54 38 L68 38 L57 46 L61 59 L50 51 L39 59 L43 46 L32 38 L46 38 Z" fill="${color}" opacity="0.08"/>
        <path d="M30 70 Q25 65 25 60 Q25 50 35 50 Q30 55 30 60 Q30 65 35 70 Z" fill="${color}" opacity="0.1"/>
        <circle cx="38" cy="60" r="2" fill="${color}" opacity="0.12"/>
      </pattern>`,
    
    floral: `
      <pattern id="pattern${id}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <!-- Islamic Arabesque Floral -->
        <circle cx="50" cy="50" r="15" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.08"/>
        <path d="M50 35 Q55 40 50 45 Q45 40 50 35" fill="${color}" opacity="0.1"/>
        <path d="M65 50 Q60 55 55 50 Q60 45 65 50" fill="${color}" opacity="0.1"/>
        <path d="M50 65 Q45 60 50 55 Q55 60 50 65" fill="${color}" opacity="0.1"/>
        <path d="M35 50 Q40 45 45 50 Q40 55 35 50" fill="${color}" opacity="0.1"/>
        <circle cx="50" cy="50" r="5" fill="${color}" opacity="0.12"/>
      </pattern>`,
    
    geometric: `
      <pattern id="pattern${id}" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <!-- Modern Islamic Geometry -->
        <rect x="10" y="10" width="25" height="25" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.08" transform="rotate(45 22.5 22.5)"/>
        <rect x="45" y="10" width="25" height="25" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.08" transform="rotate(45 57.5 22.5)"/>
        <rect x="10" y="45" width="25" height="25" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.08" transform="rotate(45 22.5 57.5)"/>
        <rect x="45" y="45" width="25" height="25" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.08" transform="rotate(45 57.5 57.5)"/>
      </pattern>`,
    
    series: `
      <pattern id="pattern${id}" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
        <!-- Series pattern with connecting lines -->
        <circle cx="45" cy="45" r="12" fill="none" stroke="${color}" stroke-width="2" opacity="0.08"/>
        <circle cx="45" cy="45" r="6" fill="${color}" opacity="0.1"/>
        <line x1="15" y1="15" x2="30" y2="30" stroke="${color}" stroke-width="1.5" opacity="0.06"/>
        <line x1="75" y1="15" x2="60" y2="30" stroke="${color}" stroke-width="1.5" opacity="0.06"/>
        <line x1="15" y1="75" x2="30" y2="60" stroke="${color}" stroke-width="1.5" opacity="0.06"/>
        <line x1="75" y1="75" x2="60" y2="60" stroke="${color}" stroke-width="1.5" opacity="0.06"/>
      </pattern>`
  };
  
  return patterns[patternType] || patterns.geometric;
}

// Generate decorative elements for each category
function getDecorativeElements(patternType, theme, id) {
  const decorations = {
    mosque: `
      <!-- Mosque inspired decoration -->
      <g opacity="0.7">
        <path d="M250 80 Q220 80 220 100 L220 120 L280 120 L280 100 Q280 80 250 80 Z" fill="none" stroke="${theme.accent}" stroke-width="2.5"/>
        <circle cx="250" cy="80" r="12" fill="none" stroke="${theme.accent}" stroke-width="2"/>
        <line x1="210" y1="120" x2="210" y2="140" stroke="${theme.accent}" stroke-width="2"/>
        <line x1="290" y1="120" x2="290" y2="140" stroke="${theme.accent}" stroke-width="2"/>
        <circle cx="210" cy="142" r="4" fill="${theme.accent}"/>
        <circle cx="290" cy="142" r="4" fill="${theme.accent}"/>
      </g>`,
    
    scroll: `
      <!-- Scroll decoration -->
      <g opacity="0.7">
        <rect x="180" y="90" width="140" height="50" rx="5" fill="none" stroke="${theme.accent}" stroke-width="2.5"/>
        <circle cx="180" cy="115" r="15" fill="none" stroke="${theme.accent}" stroke-width="2"/>
        <circle cx="320" cy="115" r="15" fill="none" stroke="${theme.accent}" stroke-width="2"/>
        <line x1="200" y1="105" x2="300" y2="105" stroke="${theme.accentSecondary}" stroke-width="1.5" opacity="0.8"/>
        <line x1="200" y1="115" x2="300" y2="115" stroke="${theme.accentSecondary}" stroke-width="1.5" opacity="0.8"/>
        <line x1="200" y1="125" x2="300" y2="125" stroke="${theme.accentSecondary}" stroke-width="1.5" opacity="0.8"/>
      </g>`,
    
    bookstack: `
      <!-- Stacked books decoration -->
      <g opacity="0.7">
        <rect x="200" y="110" width="100" height="15" fill="none" stroke="${theme.accent}" stroke-width="2"/>
        <rect x="210" y="95" width="80" height="15" fill="none" stroke="${theme.accentSecondary}" stroke-width="2"/>
        <rect x="205" y="80" width="90" height="15" fill="none" stroke="${theme.accent}" stroke-width="2"/>
        <line x1="200" y1="110" x2="205" y2="95" stroke="${theme.accent}" stroke-width="1.5"/>
        <line x1="300" y1="110" x2="295" y2="95" stroke="${theme.accent}" stroke-width="1.5"/>
      </g>`,
    
    star: `
      <!-- Star and Crescent -->
      <g opacity="0.75">
        <path d="M250 70 L255 88 L274 88 L259 99 L264 117 L250 106 L236 117 L241 99 L226 88 L245 88 Z" 
              fill="none" stroke="${theme.accent}" stroke-width="2.5"/>
        <path d="M210 110 Q203 103 203 95 Q203 80 218 80 Q210 87 210 95 Q210 103 218 110 Z" 
              fill="none" stroke="${theme.accentSecondary}" stroke-width="2.5"/>
        <circle cx="222" cy="95" r="4" fill="${theme.accent}"/>
      </g>`,
    
    floral: `
      <!-- Floral Arabesque -->
      <g opacity="0.7">
        <circle cx="250" cy="100" r="30" fill="none" stroke="${theme.accent}" stroke-width="2.5"/>
        <circle cx="250" cy="100" r="20" fill="none" stroke="${theme.accentSecondary}" stroke-width="1.5"/>
        <path d="M250 70 Q260 80 250 90 Q240 80 250 70" fill="${theme.accent}" opacity="0.3"/>
        <path d="M280 100 Q270 110 260 100 Q270 90 280 100" fill="${theme.accent}" opacity="0.3"/>
        <path d="M250 130 Q240 120 250 110 Q260 120 250 130" fill="${theme.accent}" opacity="0.3"/>
        <path d="M220 100 Q230 90 240 100 Q230 110 220 100" fill="${theme.accent}" opacity="0.3"/>
        <circle cx="250" cy="100" r="8" fill="${theme.accentSecondary}" opacity="0.4"/>
      </g>`,
    
    geometric: `
      <!-- Modern Geometric -->
      <g opacity="0.7">
        <rect x="200" y="80" width="40" height="40" fill="none" stroke="${theme.accent}" stroke-width="2.5" transform="rotate(45 220 100)"/>
        <rect x="260" y="80" width="40" height="40" fill="none" stroke="${theme.accentSecondary}" stroke-width="2.5" transform="rotate(45 280 100)"/>
        <line x1="235" y1="100" x2="265" y2="100" stroke="${theme.accent}" stroke-width="2"/>
        <circle cx="250" cy="100" r="6" fill="${theme.accent}"/>
      </g>`,
    
    series: `
      <!-- Series Badge -->
      <g opacity="0.75">
        <circle cx="250" cy="100" r="35" fill="none" stroke="${theme.accent}" stroke-width="3"/>
        <circle cx="250" cy="100" r="25" fill="none" stroke="${theme.accentSecondary}" stroke-width="2"/>
        <circle cx="250" cy="100" r="15" fill="${theme.accent}" opacity="0.2"/>
        <path d="M210 70 L220 85" stroke="${theme.accent}" stroke-width="2" opacity="0.5"/>
        <path d="M290 70 L280 85" stroke="${theme.accent}" stroke-width="2" opacity="0.5"/>
        <path d="M210 130 L220 115" stroke="${theme.accent}" stroke-width="2" opacity="0.5"/>
        <path d="M290 130 L280 115" stroke="${theme.accent}" stroke-width="2" opacity="0.5"/>
      </g>`
  };
  
  return decorations[patternType] || decorations.geometric;
}

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
  const patternType = theme.pattern;
  
  let titleTspans = '';
  const startY = titleLines.length > 2 ? 270 : 310;
  titleLines.forEach((line, i) => {
    const fontSize = i === 0 ? 40 : 36;
    titleTspans += `<tspan x="250" dy="${i === 0 ? 0 : 56}" font-size="${fontSize}">${line}</tspan>\n      `;
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
    ${getPatternSVG(patternType, id, theme.patternColor)}
    <linearGradient id="shine${id}" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#bg${id})"/>
  <rect width="100%" height="100%" fill="url(#pattern${id})"/>

  <!-- 3D Book Container -->
  <g transform="translate(50,60)">
    <!-- Shadow for 3D effect -->
    <rect x="25" y="25" width="500" height="800" rx="16" fill="#000" opacity="0.3"/>
    <rect x="20" y="20" width="500" height="800" rx="16" fill="${theme.bgGradient[0]}"/>
    
    <!-- Main Cover -->
    <rect x="0" y="0" width="500" height="800" rx="16" fill="url(#cover${id})" filter="url(#shadow${id})"/>
    
    <!-- Ornamental Borders -->
    <rect x="20" y="20" width="460" height="760" rx="12" fill="none" stroke="${theme.accent}" stroke-width="4" opacity="0.9"/>
    <rect x="30" y="30" width="440" height="740" rx="10" fill="none" stroke="${theme.accent}" stroke-width="2" opacity="0.6"/>
    
    <!-- Category-Specific Decorative Elements -->
    ${getDecorativeElements(patternType, theme, id)}
    
    <!-- Ornamental Divider Top -->
    <path d="M100 180 Q150 165 200 180 T300 180 T400 180" fill="none" stroke="${theme.accent}" stroke-width="2.5" opacity="0.7"/>
    <path d="M120 190 Q150 180 180 190" fill="none" stroke="${theme.accentSecondary}" stroke-width="1.5" opacity="0.5"/>
    <path d="M320 190 Q350 180 380 190" fill="none" stroke="${theme.accentSecondary}" stroke-width="1.5" opacity="0.5"/>
    
    <!-- Title Background -->
    <rect x="50" y="230" width="400" height="${titleLines.length > 2 ? 350 : 300}" rx="8" fill="#000" opacity="0.15"/>
    
    <!-- Title Text -->
    <text x="250" y="${startY}" text-anchor="middle" fill="${theme.textColor}" font-family="'Noto Sans Bengali', 'Noto Sans', Arial, sans-serif" font-weight="700">
      ${titleTspans}
    </text>
    
    <!-- Ornamental Divider Bottom -->
    <path d="M100 ${titleLines.length > 2 ? 600 : 580} Q150 ${titleLines.length > 2 ? 585 : 565} 200 ${titleLines.length > 2 ? 600 : 580} T300 ${titleLines.length > 2 ? 600 : 580} T400 ${titleLines.length > 2 ? 600 : 580}" fill="none" stroke="${theme.accent}" stroke-width="2.5" opacity="0.7"/>
    <path d="M120 ${titleLines.length > 2 ? 610 : 590} Q150 ${titleLines.length > 2 ? 600 : 580} 180 ${titleLines.length > 2 ? 610 : 590}" fill="none" stroke="${theme.accentSecondary}" stroke-width="1.5" opacity="0.5"/>
    <path d="M320 ${titleLines.length > 2 ? 610 : 590} Q350 ${titleLines.length > 2 ? 600 : 580} 380 ${titleLines.length > 2 ? 610 : 590}" fill="none" stroke="${theme.accentSecondary}" stroke-width="1.5" opacity="0.5"/>
    
    <!-- Bottom Decorative Band -->
    <rect x="0" y="750" width="500" height="50" fill="${theme.accent}" opacity="0.15" rx="0 0 16 16"/>
    <rect x="150" y="765" width="200" height="3" fill="${theme.accent}" opacity="0.3" rx="1.5"/>
    
    <!-- Shine Effect for 3D look -->
    <rect x="0" y="0" width="180" height="800" rx="16" fill="url(#shine${id})"/>
    
    <!-- Corner Decorations -->
    <circle cx="60" cy="60" r="8" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.4"/>
    <circle cx="440" cy="60" r="8" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.4"/>
    <circle cx="60" cy="740" r="8" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.4"/>
    <circle cx="440" cy="740" r="8" fill="none" stroke="${theme.accent}" stroke-width="1.5" opacity="0.4"/>
  </g>
</svg>`;
}

// Read books.ts to get all book data
const booksContent = fs.readFileSync('src/data/books.ts', 'utf-8');

// Extract book data
const bookMatches = [...booksContent.matchAll(/\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)"[^}]*categories:\s*\["([^"]+)"\]/g)];

console.log(`\n📚 Found ${bookMatches.length} books to process\n`);
console.log('🎨 Generating professional category-based covers with unique Islamic patterns...\n');

let successCount = 0;
let errorCount = 0;

bookMatches.forEach((match, index) => {
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
    
    // Show progress
    const progress = ((index + 1) / bookMatches.length * 100).toFixed(1);
    console.log(`[${index + 1}/${bookMatches.length}] (${progress}%) ✓ ${category} - ${title.substring(0, 40)}...`);
  } catch (error) {
    errorCount++;
    console.error(`[${index + 1}/${bookMatches.length}] ✗ Error: ${id} - ${error.message}`);
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Successfully generated: ${successCount} covers`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`${'='.repeat(60)}\n`);

if (successCount > 0) {
  console.log('🎉 All covers have been generated with unique category-based designs!');
  console.log('\nCategory Design Features:');
  console.log('  কুরআন        - Mosque domes and minaret patterns (Green/Gold)');
  console.log('  হাদিস        - Ancient scroll and book patterns (Golden/Amber)');
  console.log('  তাফসির       - Stacked books scholarly patterns (Blue)');
  console.log('  ইসলামিক কর্নার - Star and crescent patterns (Purple)');
  console.log('  ইসলামিক সাহিত্য - Floral arabesque patterns (Rose/Red)');
  console.log('  জনপ্রিয় বই    - Modern geometric patterns (Emerald)');
  console.log('  ইসলামিক সিরিজ  - Series badge and connecting lines (Teal/Gold)\n');
}
