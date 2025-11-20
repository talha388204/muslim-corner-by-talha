#!/usr/bin/env node

// Usage: node scripts/get-pdf-pages.js <file1> <file2> ...
// Outputs JSON array: [{ file, pages }, ...]

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

async function getPages(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjsLib.getDocument({ data });
  const doc = await loadingTask.promise;
  const pages = doc.numPages;
  await doc.destroy();
  return pages;
}

(async function () {
  const args = process.argv.slice(2);
  const results = [];
  for (const f of args) {
    try {
      const abs = path.resolve(f);
      if (!fs.existsSync(abs)) {
        results.push({ file: f, error: "not found" });
        continue;
      }
      const pages = await getPages(abs);
      results.push({ file: f, pages });
    } catch (err) {
      results.push({ file: f, error: String(err) });
    }
  }
  console.log(JSON.stringify(results, null, 2));
})();
