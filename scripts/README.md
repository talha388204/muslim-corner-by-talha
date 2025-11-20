# Thumbnail Generation Script

## প্রয়োজনীয় প্যাকেজ ইন্সটল করুন

প্রথমে এই কমান্ডগুলো রান করুন:

```bash
npm install canvas pdfjs-dist
```

## Thumbnail তৈরি করার নিয়ম

### একটি PDF থেকে Thumbnail তৈরি:

```bash
node scripts/generate-thumbnail.js public/books/book-001/book.pdf public/books/book-001/cover.png
```

### সকল PDF থেকে Thumbnail তৈরি (Batch):

```bash
node scripts/generate-all-thumbnails.js
```

এটি `public/books/` ফোল্ডারের সব বই এর জন্য স্বয়ংক্রিয়ভাবে thumbnail তৈরি করবে।

## কিভাবে কাজ করে

1. Script PDF এর প্রথম পৃষ্ঠা লোড করে
2. উচ্চ মানের রেজোলিউশনে render করে (scale 2.0)
3. PNG ফরম্যাটে সেভ করে

## নোট

- প্রথমবার রান করলে dependency ইন্সটল হতে সময় লাগতে পারে
- PDF ফাইল বড় হলে processing এ কিছু সময় লাগবে
- Generated thumbnail সাইজ প্রায় 300-500KB হবে
