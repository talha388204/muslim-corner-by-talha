import { Book } from "@/types/book";
import bookCover1 from "@/assets/book-cover-1.png";
import bookCover2 from "@/assets/book-cover-2.png";
import bookCover3 from "@/assets/book-cover-3.png";
import bookCover4 from "@/assets/book-cover-4.png";
import bookCover5 from "@/assets/book-cover-5.png";
import bookCover6 from "@/assets/book-cover-6.png";

export const books: Book[] = [
  {
    id: "book-001",
    title: "রবীন্দ্র কাহিনী",
    author: "মুহম্মদ আনামুল্লাহ আমান পারভেজ",
    coverUrl: bookCover1,
    pdfUrl: "/pdfs/sample-book.pdf",
    pages: 320,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.7,
    ratingsCount: 230,
    badge: "NEW"
  },
  {
    id: "book-002",
    title: "প্রণয়ের অনল কাব্য",
    author: "ডি আর এম সোহাগ",
    coverUrl: bookCover2,
    pdfUrl: "/pdfs/sample-book.pdf",
    pages: 245,
    categories: ["সাহিত্য"],
    ratingAvg: 4.8,
    ratingsCount: 280
  },
  {
    id: "book-003",
    title: "শরতে",
    author: "সাদিকুন নাহার নিশা",
    coverUrl: bookCover3,
    pdfUrl: "/pdfs/sample-book.pdf",
    pages: 190,
    categories: ["সাহিত্য"],
    ratingAvg: 4.6,
    ratingsCount: 156
  },
  {
    id: "book-004",
    title: "কোনো এক সন্ধ্যাবেলায়",
    author: "মুশফিকা রহমান সেপি",
    coverUrl: bookCover4,
    pdfUrl: "/pdfs/sample-book.pdf",
    pages: 312,
    categories: ["সাহিত্য"],
    ratingAvg: 4.5,
    ratingsCount: 132
  },
  {
    id: "book-005",
    title: "একজুটে সপ্ন প্রয়াসকিত",
    author: "সুবর্ণা রানা",
    coverUrl: bookCover5,
    pdfUrl: "/pdfs/sample-book.pdf",
    pages: 278,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.9,
    ratingsCount: 504
  },
  {
    id: "book-006",
    title: "মা মা ও বাবা",
    author: "আরিফ আজাদ",
    description: "পরিবার ও মাতা-পিতা সম্পর্কিত একটি মর্মস্পর্শী গ্রন্থ",
    coverUrl: bookCover6,
    pdfUrl: "/pdfs/sample-book.pdf",
    pages: 156,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 5.0,
    ratingsCount: 892,
    badge: "BESTSELLER",
    featured: true
  },
];

export const categories = [
  "সকল",
  "জনপ্রিয় বই",
  "কার্টুন",
  "সেরা ফ্রি বই",
  "সেরা বই",
  "ইসলামিক কর্নার",
  "সাহিত্য"
];
