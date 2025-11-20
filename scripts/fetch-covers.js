#!/usr/bin/env node

// Usage: node scripts/fetch-covers.js [slug1 slug2 ...]
// If no args provided, defaults to three sample slugs.

import fs from 'fs';
import path from 'path';

const DEFAULTS = ['saimum-01','adhar-rater-musafir-nasim-hejaji','paradoxical-sajid-1'];

async function fetchUrlToFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
}

function titleFromSlug(slug) {
  return slug.replace(/[-_]+/g, ' ');
}

async function tryOpenLibrary(title) {
  const q = encodeURIComponent(title);
  const url = `https://openlibrary.org/search.json?q=${q}&limit=5`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data && data.docs && data.docs.length) {
    for (const doc of data.docs) {
      if (doc.cover_i) return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
    }
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const slugs = args.length ? args : DEFAULTS;

  for (const slug of slugs) {
    try {
      const title = titleFromSlug(slug);
      console.log(`Processing: ${slug} -> "${title}"`);
      let imgUrl = await tryOpenLibrary(title);
      if (imgUrl) {
        console.log(`Found OpenLibrary cover: ${imgUrl}`);
      } else {
        console.log(`No OpenLibrary cover for "${title}", using placeholder.`);
        imgUrl = `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(title)}`;
      }

      const destDir = path.join('public','books', slug);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      const destPath = path.join(destDir, 'cover.png');

      await fetchUrlToFile(imgUrl, destPath);
      console.log(`Saved cover to ${destPath}`);
    } catch (err) {
      console.error(`Failed for ${slug}:`, err.message);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
