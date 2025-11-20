import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Category-based design themes with modern 3D styling
const categoryThemes = {
  'quran': {
    background: 'linear-gradient(135deg, #0d4d3f 0%, #0a3d32 50%, #062821 100%)',
    accent: '#1a8f6f',
    glow: 'rgba(26, 143, 111, 0.3)',
    pattern: 'islamic-geometric',
    textColor: '#e8f5f1',
    borderColor: '#1a8f6f'
  },
  'hadith': {
    background: 'linear-gradient(135deg, #4a3410 0%, #3d2c0f 50%, #2a1f0b 100%)',
    accent: '#d4a574',
    glow: 'rgba(212, 165, 116, 0.3)',
    pattern: 'ornate-border',
    textColor: '#f5e6d3',
    borderColor: '#d4a574'
  },
  'tafsir': {
    background: 'linear-gradient(135deg, #1a3a52 0%, #14304a 50%, #0d1f35 100%)',
    accent: '#4a9fd8',
    glow: 'rgba(74, 159, 216, 0.3)',
    pattern: 'book-lines',
    textColor: '#e3f2fd',
    borderColor: '#4a9fd8'
  },
  'islamic corner': {
    background: 'linear-gradient(135deg, #5a2d82 0%, #4a2470 50%, #341a5e 100%)',
    accent: '#9b6bc7',
    glow: 'rgba(155, 107, 199, 0.3)',
    pattern: 'stars',
    textColor: '#f3e5f5',
    borderColor: '#9b6bc7'
  },
  'islamic sahitto': {
    background: 'linear-gradient(135deg, #c89f5d 0%, #b8884d 50%, #a67439 100%)',
    accent: '#e8c589',
    glow: 'rgba(232, 197, 137, 0.3)',
    pattern: 'elegant-lines',
    textColor: '#2d2416',
    borderColor: '#8b6332'
  },
  'jonopriyo boi': {
    background: 'linear-gradient(135deg, #c45a5a 0%, #b34545 50%, #9e3030 100%)',
    accent: '#e88989',
    glow: 'rgba(232, 137, 137, 0.3)',
    pattern: 'dots',
    textColor: '#fff5f5',
    borderColor: '#e88989'
  },
  'islamic series': {
    background: 'linear-gradient(135deg, #2d5f5d 0%, #234f4d 50%, #1a3f3e 100%)',
    accent: '#5da89f',
    glow: 'rgba(93, 168, 159, 0.3)',
    pattern: 'waves',
    textColor: '#e0f2f1',
    borderColor: '#5da89f'
  }
};

// Function to wrap text for better display
function wrapText(text, maxLength = 20) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Generate pattern based on category
function generatePattern(pattern, accent, width = 600, height = 900) {
  switch (pattern) {
    case 'islamic-geometric':
      return `
        <defs>
          <pattern id="islamicPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40,0 L80,40 L40,80 L0,40 Z" fill="none" stroke="${accent}" stroke-width="1" opacity="0.1"/>
            <circle cx="40" cy="40" r="15" fill="none" stroke="${accent}" stroke-width="1" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#islamicPattern)"/>
      `;
    case 'ornate-border':
      return `
        <defs>
          <pattern id="ornatePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="${accent}" opacity="0.15"/>
            <circle cx="0" cy="0" r="2" fill="${accent}" opacity="0.15"/>
            <circle cx="40" cy="40" r="2" fill="${accent}" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#ornatePattern)"/>
      `;
    case 'book-lines':
      return `
        <defs>
          <pattern id="linesPattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="10" x2="100" y2="10" stroke="${accent}" stroke-width="1" opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#linesPattern)"/>
      `;
    case 'stars':
      return `
        <defs>
          <pattern id="starsPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50,20 L55,35 L70,35 L58,45 L63,60 L50,50 L37,60 L42,45 L30,35 L45,35 Z" 
                  fill="${accent}" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#starsPattern)"/>
      `;
    case 'elegant-lines':
      return `
        <defs>
          <pattern id="elegantPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0,30 Q30,20 60,30" fill="none" stroke="${accent}" stroke-width="1" opacity="0.12"/>
            <path d="M0,30 Q30,40 60,30" fill="none" stroke="${accent}" stroke-width="1" opacity="0.12"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#elegantPattern)"/>
      `;
    case 'dots':
      return `
        <defs>
          <pattern id="dotsPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="2.5" fill="${accent}" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#dotsPattern)"/>
      `;
    case 'waves':
      return `
        <defs>
          <pattern id="wavesPattern" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 Q25,10 50,20 T100,20" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#wavesPattern)"/>
      `;
    default:
      return '';
  }
}

// Generate SVG cover with modern 3D design
function generateSVGCover(title, author, category) {
  const theme = categoryThemes[category] || categoryThemes['islamic corner'];
  
  const titleLines = wrapText(title, 24);
  const authorLines = author ? wrapText(author, 30) : [];
  
  // Calculate text positioning
  const startY = 350;
  const lineHeight = 56;
  const titleFontSize = titleLines.length > 2 ? 36 : 42;
  
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.background.match(/#[0-9a-f]{6}/gi)[0]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${theme.background.match(/#[0-9a-f]{6}/gi)[1]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${theme.background.match(/#[0-9a-f]{6}/gi)[2]};stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.accent};stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:${theme.accent};stop-opacity:0.05" />
    </linearGradient>
    
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
      <feOffset dx="0" dy="15" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.4"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  
  <!-- Pattern overlay -->
  ${generatePattern(theme.pattern, theme.accent)}
  
  <!-- Outer shadow frame -->
  <rect x="30" y="60" width="540" height="780" rx="20" fill="#000" opacity="0.2"/>
  
  <!-- Main 3D book card -->
  <rect x="50" y="80" width="500" height="740" rx="16" fill="url(#cardGrad)" filter="url(#shadow)"/>
  
  <!-- Inner content area with border -->
  <rect x="70" y="100" width="460" height="700" rx="12" fill="rgba(0,0,0,0.2)" stroke="${theme.borderColor}" stroke-width="2" opacity="0.6"/>
  
  <!-- Shine effect -->
  <rect x="70" y="100" width="460" height="120" rx="12" fill="rgba(255,255,255,0.08)"/>
  
  <!-- Top decorative line -->
  <line x1="100" y1="240" x2="500" y2="240" stroke="${theme.accent}" stroke-width="2" opacity="0.4"/>
  
  <!-- Title text -->
  <text x="300" y="${startY}" text-anchor="middle" fill="${theme.textColor}" font-family="Noto Sans Bengali, Noto Sans, Arial, sans-serif" font-weight="700" filter="url(#glow)">`;

  titleLines.forEach((line, index) => {
    svg += `
    <tspan x="300" dy="${index === 0 ? 0 : lineHeight}" font-size="${titleFontSize}">${line}</tspan>`;
  });

  svg += `
  </text>`;

  // Author text if available
  if (authorLines.length > 0) {
    const authorY = startY + (titleLines.length * lineHeight) + 60;
    svg += `
  
  <!-- Bottom decorative line -->
  <line x1="150" y1="${authorY - 30}" x2="450" y2="${authorY - 30}" stroke="${theme.accent}" stroke-width="1.5" opacity="0.3"/>
  
  <!-- Author text -->
  <text x="300" y="${authorY}" text-anchor="middle" fill="${theme.textColor}" font-family="Noto Sans Bengali, Noto Sans, Arial, sans-serif" font-weight="500" opacity="0.85">`;

    authorLines.forEach((line, index) => {
      svg += `
    <tspan x="300" dy="${index === 0 ? 0 : 40}" font-size="28">${line}</tspan>`;
    });

    svg += `
  </text>`;
  }
  
  // Bottom decorative elements
  svg += `
  
  <!-- Corner decorations -->
  <circle cx="100" cy="750" r="4" fill="${theme.accent}" opacity="0.4"/>
  <circle cx="500" cy="750" r="4" fill="${theme.accent}" opacity="0.4"/>
  <circle cx="100" cy="150" r="4" fill="${theme.accent}" opacity="0.4"/>
  <circle cx="500" cy="150" r="4" fill="${theme.accent}" opacity="0.4"/>
  
  <!-- Glow effect at bottom -->
  <ellipse cx="300" cy="850" rx="200" ry="30" fill="${theme.glow}" opacity="0.5"/>
  
</svg>`;

  return svg;
}

// Main execution
async function generateAllCovers() {
  try {
    // Import books data
    const booksModule = await import('../src/data/books.ts');
    const books = booksModule.books;

    console.log(`🎨 Starting professional cover generation for ${books.length} books...`);
    
    let successCount = 0;
    let skipCount = 0;

    for (const book of books) {
      const bookDir = path.join(__dirname, '..', 'public', 'books', book.id);
      
      if (!fs.existsSync(bookDir)) {
        console.log(`⚠️  Directory not found for ${book.id}, skipping...`);
        skipCount++;
        continue;
      }

      const coverPath = path.join(bookDir, 'cover.svg');
      const svg = generateSVGCover(book.title, book.author, book.category);
      
      fs.writeFileSync(coverPath, svg, 'utf-8');
      successCount++;
      console.log(`✅ Generated cover for: ${book.title} (${book.category})`);
    }

    console.log(`\n🎉 Cover generation complete!`);
    console.log(`   ✅ Successfully generated: ${successCount}`);
    console.log(`   ⏭️  Skipped: ${skipCount}`);
    console.log(`\n📝 All covers have been updated with professional 3D designs based on category themes.`);
    
  } catch (error) {
    console.error('❌ Error generating covers:', error);
    process.exit(1);
  }
}

generateAllCovers();
