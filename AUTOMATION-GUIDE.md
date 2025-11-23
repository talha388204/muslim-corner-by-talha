# 📚 Book Cover Automation Guide

This guide explains how to automatically generate book covers from PDF first pages.

## 🚀 Quick Start

### Step 1: Generate Covers from PDFs

Run this command to extract the first page from each PDF and save it as `cover.jpg`:

```bash
npx tsx scripts/generate-covers.ts
```

This will:
- Scan all folders in `/public/books/`
- Find PDF files
- Extract page 1 as high-quality JPG
- Save as `cover.jpg` in each book folder
- Remove old `cover.svg` files

### Step 2: Update Book Data

Run this to update all cover references in the codebase:

```bash
node scripts/update-covers-to-jpg.js
```

This updates `src/data/books.ts` to use `.jpg` instead of `.svg`

## 📖 Detailed Information

### Prerequisites

Required packages (already installed):
- `pdfjs-dist` - PDF rendering
- `canvas` - Image generation
- `tsx` - TypeScript execution

### Command Options

#### Generate Covers

```bash
# Generate only missing covers (default)
npx tsx scripts/generate-covers.ts

# Force regenerate ALL covers
npx tsx scripts/generate-covers.ts --force
```

### What Happens Behind the Scenes

1. **Scanning**: Script searches `/public/books/` for folders containing PDFs
2. **Extraction**: Uses PDF.js to render first page at 2x scale
3. **Saving**: Outputs high-quality JPEG (95% quality)
4. **Cleanup**: Removes outdated SVG covers
5. **Update**: Changes all references in code from `.svg` to `.jpg`

### Image Quality Settings

Current settings in `generate-covers.ts`:
- **Scale**: 2.0 (high resolution)
- **Format**: JPEG
- **Quality**: 95%
- **Optimization**: Automatic

To adjust quality, edit line in `scripts/generate-covers.ts`:
```typescript
const viewport = page.getViewport({ scale: 2.0 }); // Change scale here
const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 }); // Change quality here
```

## 🔧 Adding New Books

When you add new PDF books:

```bash
# 1. Place PDF in folder
/public/books/your-new-book/book-name.pdf

# 2. Generate cover automatically
npx tsx scripts/generate-covers.ts

# 3. Update books.ts references
node scripts/update-covers-to-jpg.js

# 4. Add book entry to src/data/books.ts
```

## 📊 Script Output Example

```
🚀 Starting cover generation from PDF first pages...

📚 Found 150 books with PDFs

✅ Generated: saimum-01/cover.jpg
🗑️  Removed: saimum-01/cover.svg
✅ Generated: mishkat-shorif-1-v2/cover.jpg
🗑️  Removed: mishkat-shorif-1-v2/cover.svg
⏭️  Skipped (already exists): allama-saidi-rochanaboli-1

📊 Summary:
   ✅ Processed: 148
   ⏭️  Skipped: 2
   ❌ Failed: 0

💡 Tip: Use --force flag to regenerate all covers
```

## ❌ Troubleshooting

### Error: "Cannot find module 'canvas'"

```bash
npm install canvas
```

### Error: "Permission denied"

Make sure the scripts have execution permissions:

```bash
chmod +x scripts/*.ts scripts/*.js
```

### Low Quality Covers

Increase the scale factor in `generate-covers.ts`:

```typescript
const viewport = page.getViewport({ scale: 3.0 }); // Higher = better quality
```

### Script Hangs

Some PDFs may be corrupted or very large. Check console output for the specific book causing issues.

## 🎯 Best Practices

1. **Always backup** before running `--force` regeneration
2. **Test on a few books** first before processing all
3. **Check image sizes** - covers should be reasonably sized (not too large)
4. **Verify quality** - View a few covers to ensure acceptable quality
5. **Use version control** - Commit before bulk operations

## 🔄 Workflow Integration

Integrate into your development workflow:

```json
{
  "scripts": {
    "covers:generate": "npx tsx scripts/generate-covers.ts",
    "covers:force": "npx tsx scripts/generate-covers.ts --force",
    "covers:update": "node scripts/update-covers-to-jpg.js",
    "covers:all": "npm run covers:generate && npm run covers:update"
  }
}
```

Then simply run:
```bash
npm run covers:all
```

## 📝 Notes

- **File Size**: Generated JPGs are typically 100-300KB each
- **Processing Time**: ~1-2 seconds per book
- **Cache**: Covers are cached by the PWA for offline use
- **Format**: Only JPEG is supported (not PNG/WEBP)

## 🆘 Support

For issues or questions:
1. Check the console output for error messages
2. Verify PDF files are not corrupted
3. Ensure all dependencies are installed
4. Check file permissions in `/public/books/`

---

**Last Updated**: 2025
**Script Version**: 1.0.0
