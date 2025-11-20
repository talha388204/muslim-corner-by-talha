import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Usage:
// node scripts/import-external-books.js "C:\\Users\\user\\OneDrive\\Documents\\all files\\pdf book"

const root = process.argv[2];
if (!root) {
  console.error('Provide root folder as first arg');
  process.exit(1);
}

// category folder names (exact folder names under the root)
const categories = {
  'quran': 'কুরআন',
  'hadith': 'হাদিস',
  'islamic corner': 'ইসলামিক কর্নার',
  'islamic sahitto': 'ইসলামিক সাহিত্য',
  'islamic sahitto ': 'ইসলামিক সাহিত্য'
};

// Known filename -> Bengali title mapping (add more if you want)
const titleMapping = {
  'mishkat': 'মিশকাত শরীফ (১-৪)',
  'mishkat sharif': 'মিশকাত শরীফ (১-৪)',
  'mishkat-s': 'মিশকাত শরীফ (১-৪)',
  'nobider jibon kahini': 'নবীদের জীবন কাহিনি',
  'nobider jibone': 'নবীদের জীবন কাহিনি',
  'siratur rasul': 'সীরাতুর রাসুল',
  'dhulimolin upohar': 'ধূলিমলিন উপহার - রামাদান',
  'hafizi quran': 'হাফেজী কুরআন',
  'maariful quran': 'মাআরেফুল কুরআন',
  'tafhimul quran': 'তাফহিমুল কুরআন'
};

function slugify(name){
  return name.toLowerCase().replace(/[^\u0980-\u09FFa-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function detectMappedTitle(filename){
  const lower = filename.toLowerCase();
  // if filename contains bengali characters, use filename (replace underscores/dashes with spaces)
  if (/[\u0980-\u09FF]/.test(filename)){
    return filename.replace(/[_\-]+/g,' ').replace(/\.pdf$/i,'').trim();
  }
  for (const k of Object.keys(titleMapping)){
    if (lower.includes(k)) return titleMapping[k];
  }
  // fallback: humanize filename
  return filename.replace(/[-_\.]+/g,' ').replace(/\.pdf$/i,'').trim();
}

function createBookObject({id,title,author,coverUrl,pdfUrl,pages,cats}){
  return `  {
    id: "${id}",
    title: "${title}",
    author: "${author||''}",
    description: "Imported",
    coverUrl: "${coverUrl}",
    pdfUrl: "${pdfUrl}",
    pages: ${pages||0},
    categories: [${cats.map(c=>`\"${c}\"`).join(', ')}],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },\n`;
}

async function main(){
  const publicBooks = path.join('public','books');
  if (!fs.existsSync(publicBooks)) fs.mkdirSync(publicBooks,{recursive:true});

  const newEntries = [];

  for (const [folderName, catBn] of Object.entries(categories)){
    const dir = path.join(root, folderName);
    if (!fs.existsSync(dir)) {
      console.warn('Category folder not found:', dir);
      continue;
    }
    const files = fs.readdirSync(dir);
    for (const file of files){
      const full = path.join(dir,file);
      const stat = fs.statSync(full);
      if (!stat.isFile()) continue;
      if (!/\.pdf$/i.test(file)) continue;

      const rawName = path.basename(file, path.extname(file));
      const titleBn = detectMappedTitle(file);
      const slug = slugify(rawName) || crypto.randomBytes(4).toString('hex');
      const destDir = path.join(publicBooks, slug);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir,{recursive:true});
      const destPdf = path.join(destDir, `${slug}.pdf`);
      fs.copyFileSync(full, destPdf);

      // put a placeholder cover.svg (will be overwritten by generator)
      const coverPath = path.join(destDir,'cover.svg');
      if (!fs.existsSync(coverPath)){
        fs.writeFileSync(coverPath, `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"900\"><rect width=\"100%\" height=\"100%\" fill=\"#eee\"/></svg>`,'utf8');
      }

      // append book object
      const relPdf = `/books/${slug}/${slug}.pdf`;
      const relCover = `/books/${slug}/cover.svg`;
      newEntries.push({slug,title:titleBn,cover:relCover,pdf:relPdf,cat:catBn});
      console.log('Imported', file, '→', destPdf, 'category=', catBn);
    }
  }

  if (newEntries.length === 0) {
    console.log('No new PDFs found to import.');
    return;
  }

  // Insert into src/data/books.ts before closing array bracket
  const booksTsPath = path.join('src','data','books.ts');
  if (!fs.existsSync(booksTsPath)){
    console.error('src/data/books.ts not found; aborting adding entries.');
    process.exit(1);
  }
  const booksTs = fs.readFileSync(booksTsPath,'utf8');
  const insertAt = booksTs.lastIndexOf('];');
  if (insertAt === -1){
    console.error('Could not find end of books array in src/data/books.ts');
    process.exit(1);
  }

  let toInsert = '';
  for (const e of newEntries){
    const obj = createBookObject({id:e.slug,title:e.title,author:'',coverUrl:e.cover,pdfUrl:e.pdfUrl,pages:0,cats:[e.cat]});
    // note: using pages 0; you can run a page-count script later
    toInsert += obj;
  }

  const newContent = booksTs.slice(0,insertAt) + toInsert + booksTs.slice(insertAt);
  fs.writeFileSync(booksTsPath,newContent,'utf8');
  console.log(`Appended ${newEntries.length} book entries to ${booksTsPath}`);
}

main().catch(err=>{console.error(err); process.exit(1);});
