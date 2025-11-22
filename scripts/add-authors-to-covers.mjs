import fs from 'fs';
import path from 'path';

// Use current working directory as repository root (safer on Windows)
const root = process.cwd();
const booksFile = path.join(root, 'src', 'data', 'books.ts');
const publicBooksDir = path.join(root, 'public', 'books');

function inferAuthorFromTitle(title) {
  // remove bracketed parts and trailing punctuation
  let t = title.replace(/\(.*?\)/g, '').trim();
  // split by space and take last up to 3 words
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  const take = Math.min(3, parts.length);
  const last = parts.slice(-take).join(' ');
  // if last contains words like "pdf" or "boimate" drop them
  const cleaned = last.replace(/boimate\S*/gi, '').replace(/pdf/gi, '').trim();
  return cleaned || parts[parts.length-1];
}

const booksText = fs.readFileSync(booksFile, 'utf8');
// crude parser to find book objects: look for blocks like { id: ... title: ... author: ... coverUrl: ... }
const bookBlocks = booksText.split(/\n\s*\{\s*\n/).slice(1);
let updated = 0;
let skipped = 0;
let createdFiles = 0;

for (const block of bookBlocks) {
  try {
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    const authorMatch = block.match(/author:\s*"([^"]*)"/);
    const coverMatch = block.match(/coverUrl:\s*"([^"]+)"/);
    if (!idMatch || !titleMatch || !authorMatch || !coverMatch) continue;
    const id = idMatch[1];
    const title = titleMatch[1];
    const author = authorMatch[1];
    const coverUrl = coverMatch[1];
    if (author && author.trim().length > 0) {
      skipped++;
      continue; // already has author in data — skip
    }
    const inferred = inferAuthorFromTitle(title);
    if (!inferred) {
      skipped++;
      continue;
    }
    // coverUrl like /books/dir/cover.svg
    const rel = coverUrl.replace(/^\//, '');
    const coverPath = path.join(root, rel.split('/').join(path.sep));
    if (!fs.existsSync(coverPath)) {
      // try folder with sanitized id
      const alt = path.join(publicBooksDir, id, 'cover.svg');
      if (fs.existsSync(alt)) {
        // use alt
        console.log('Using alt path for', id);
      } else {
        console.warn('cover.svg not found for', id, coverPath);
        skipped++;
        continue;
      }
    }
    const finalCover = fs.existsSync(coverPath) ? coverPath : path.join(publicBooksDir, id, 'cover.svg');
    let svg = fs.readFileSync(finalCover, 'utf8');
    if (svg.includes(inferred)) {
      skipped++;
      continue; // already contains author text
    }
    // find closing </text> of the main title block — we will insert before the first </text> occurrence
    const idx = svg.indexOf('</text>');
    if (idx === -1) {
      console.warn('No </text> found in', finalCover);
      skipped++;
      continue;
    }
    const authorTspan = `      <tspan x="250" dy="56" font-size="30">${inferred}</tspan>\n`;
    const newSvg = svg.slice(0, idx) + authorTspan + svg.slice(idx);
    fs.writeFileSync(finalCover, newSvg, 'utf8');
    console.log('Updated', finalCover, '→ author:', inferred);
    updated++;
  } catch (err) {
    console.error('Error processing block', err);
  }
}

console.log(`Done. Updated: ${updated}, Skipped: ${skipped}`);
