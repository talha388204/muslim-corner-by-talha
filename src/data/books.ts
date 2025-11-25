import { Book } from "@/types/book";

// =====================================================
// 📚 নতুন বই যোগ করার নির্দেশিকা
// =====================================================
// 
// ১. public/books/ ফোল্ডারে নতুন ফোল্ডার তৈরি করুন (যেমন: book-001/)
// ২. সেখানে PDF রাখুন: book.pdf
// ৩. Thumbnail তৈরি করুন: node scripts/generate-thumbnail.js public/books/book-001/book.pdf public/books/book-001/cover.jpg
// ৪. নিচের array তে নতুন বই যোগ করুন
// 
// বিস্তারিত দেখুন: public/books/README.md
// Thumbnail Script: scripts/README.md
// =====================================================

export const books: Book[] = [
  {
    id: "আন্দালুসের_ইতিহাস_১ম_খণ্ড",
    title: "আন্দালুসের ইতিহাস ১ম খণ্ড pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/আন্দালুসের_ইতিহাস_১ম_খণ্ড/cover.svg",
    pdfUrl: "/books/আন্দালুসের_ইতিহাস_১ম_খণ্ড/আন্দালুসের_ইতিহাস_১ম_খণ্ড.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "আন্দালুসের_ইতিহাস_২য়_খণ্ড",
    title: "আন্দালুসের ইতিহাস ২য় খণ্ড pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/আন্দালুসের_ইতিহাস_২য়_খণ্ড/cover.svg",
    pdfUrl: "/books/আন্দালুসের_ইতিহাস_২য়_খণ্ড/আন্দালুসের_ইতিহাস_২য়_খণ্ড.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ চতুর্থ খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ তৃতীয় খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ দ্বিতীয় খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ পন্চম খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ প্রথম খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_",
    title: "সেলজুক সম্রাজ্যের ইতিহাস ১ম খণ্ড pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_/cover.svg",
    pdfUrl: "/books/সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_/সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "আন্দালুসের_ইতিহাস_১ম_খণ্ড",
    title: "আন্দালুসের ইতিহাস ১ম খণ্ড pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/আন্দালুসের_ইতিহাস_১ম_খণ্ড/cover.svg",
    pdfUrl: "/books/আন্দালুসের_ইতিহাস_১ম_খণ্ড/আন্দালুসের_ইতিহাস_১ম_খণ্ড.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "আন্দালুসের_ইতিহাস_২য়_খণ্ড",
    title: "আন্দালুসের ইতিহাস ২য় খণ্ড pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/আন্দালুসের_ইতিহাস_২য়_খণ্ড/cover.svg",
    pdfUrl: "/books/আন্দালুসের_ইতিহাস_২য়_খণ্ড/আন্দালুসের_ইতিহাস_২য়_খণ্ড.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ চতুর্থ খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_চতুর্থ_খন্ড_রাগিব_সারজানি.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ তৃতীয় খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_তৃতীয়_খন্ড_রাগিব_সারজানি_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ দ্বিতীয় খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_দ্বিতীয়_খন্ড_রাগিব_সারজানি_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ পন্চম খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_পন্চম_খন্ড_রাগিব_সারজানি.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_",
    title: "ইসলামের ইতিহাস সংক্ষিপ্ত বিশ্বকোষ প্রথম খন্ড রাগিব সারজানি pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_/cover.svg",
    pdfUrl: "/books/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_/ইসলামের_ইতিহাস_সংক্ষিপ্ত_বিশ্বকোষ_প্রথম_খন্ড_রাগিব_সারজানি_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_",
    title: "সেলজুক সম্রাজ্যের ইতিহাস ১ম খণ্ড pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_/cover.svg",
    pdfUrl: "/books/সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_/সেলজুক_সম্রাজ্যের_ইতিহাস_১ম_খণ্ড_.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  {
    id: "da-zakir-nayek-lecture-somogro-1",
    title: "ডাঃ জাকির নায়েক লেকচার সমগ্র ১ম খণ্ড",
    author: "পিস পাবলিকেশন",
    description: "ডাঃ জাকির নায়েকের লেকচার সংকলনের প্রথম খণ্ড",
    coverUrl: "/books/da-zakir-nayek-lecture-somogro-1/cover.jpg",
    pdfUrl: "/books/da-zakir-nayek-lecture-somogro-1/da-zakir-nayek-lecture-somogro-1.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "da-zakir-nayek-lecture-somogro-2",
    title: "ডা. জাকির নায়েক লেকচার সমগ্র ২য় খণ্ড",
    author: "পিস পাবলিকেশন",
    description: "ডা. জাকির নায়েকের লেকচার সংকলনের দ্বিতীয় খণ্ড",
    coverUrl: "/books/da-zakir-nayek-lecture-somogro-2/cover.jpg",
    pdfUrl: "/books/da-zakir-nayek-lecture-somogro-2/da-zakir-nayek-lecture-somogro-2.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "islamer-kendrobindu-dr-zakir-nayek",
    title: "ইসলামের কেন্দ্রবিন্দু",
    author: "ড. জাকির নায়েক",
    description: "ইসলামের মূল শিক্ষা ও কেন্দ্রীয় বিষয়বস্তু নিয়ে আলোচনা",
    coverUrl: "/books/islamer-kendrobindu-dr-zakir-nayek/cover.jpg",
    pdfUrl: "/books/islamer-kendrobindu-dr-zakir-nayek/islamer-kendrobindu-dr-zakir-nayek.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "islam-o-secularism-dr-zakir-nayek",
    title: "ইসলাম ও সেকিউল্যরিজম",
    author: "ড. জাকির নায়েক",
    description: "ইসলাম ও সেকিউল্যারিজমের মধ্যে তুলনামূলক আলোচনা",
    coverUrl: "/books/islam-o-secularism-dr-zakir-nayek/cover.jpg",
    pdfUrl: "/books/islam-o-secularism-dr-zakir-nayek/islam-o-secularism-dr-zakir-nayek.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "islam-o-khristio-dhormer-sadrisyo-dr-zakir-nayek",
    title: "ইসলাম ও খ্রিষ্টীয় ধর্মের মধ্যে সাদৃশ্য",
    author: "ড. জাকির নায়েক",
    description: "ইসলাম ও খ্রিষ্টধর্মের মধ্যে সাদৃশ্য ও পার্থক্য নিয়ে আলোচনা",
    coverUrl: "/books/islam-o-khristio-dhormer-sadrisyo-dr-zakir-nayek/cover.jpg",
    pdfUrl: "/books/islam-o-khristio-dhormer-sadrisyo-dr-zakir-nayek/islam-o-khristio-dhormer-sadrisyo-dr-zakir-nayek.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "adhar-rater-musafir-nasim-hejaji",
    title: "আধার রাতের মুসাফির",
    author: "",
    description: "Short description",
    coverUrl: "/books/adhar-rater-musafir-nasim-hejaji/cover.jpg",
    pdfUrl: "/books/adhar-rater-musafir-nasim-hejaji/adhar-rater-musafir-nasim-hejaji.pdf",
    pages: 239,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "al-quran-o-adhunik-biggan-dr-zakir-nayek",
    title: "আল কুরআন ও আধুনিক বিজ্ঞান",
    author: "ড. জাকির নায়েক",
    description: "পবিত্র কুরআন ও আধুনিক বিজ্ঞানের মধ্যে সম্পর্ক নিয়ে আলোচনা",
    coverUrl: "/books/al-quran-o-adhunik-biggan-dr-zakir-nayek/cover.jpg",
    pdfUrl: "/books/al-quran-o-adhunik-biggan-dr-zakir-nayek/al-quran-o-adhunik-biggan-dr-zakir-nayek.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "ahban-adhunik-monone-mizanur-rahman-azhari",
    title: "আহবান",
    author: "",
    description: "Short description",
    coverUrl: "/books/ahban-adhunik-monone-mizanur-rahman-azhari/cover.jpg",
    pdfUrl: "/books/ahban-adhunik-monone-mizanur-rahman-azhari/ahban-adhunik-monone-mizanur-rahman-azhari.pdf",
    pages: 251,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "bela-furabar-age",
    title: "বেলা ফুরাবার আগে",
    author: "",
    description: "Short description",
    coverUrl: "/books/bela-furabar-age/cover.jpg",
    pdfUrl: "/books/bela-furabar-age/bela-furabar-age.pdf",
    pages: 103,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "allama-saidi-rochanaboli-1",
    title: "আল্লামা সাঈদী রচনাবলী ১ম খন্ড",
    author: "আল্লামা সাঈদী",
    description: "আল্লামা সাঈদীর রচনা সংকলনের প্রথম খণ্ড",
    coverUrl: "/books/allama-saidi-rochanaboli-1/cover.jpg",
    pdfUrl: "/books/allama-saidi-rochanaboli-1/allama-saidi-rochanaboli-1.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "allama-saidi-rochanaboli-2",
    title: "আল্লামা সাঈদী রচনাবলী ২য় খন্ড",
    author: "আল্লামা সাঈদী",
    description: "আল্লামা সাঈদীর রচনা সংকলনের দ্বিতীয় খণ্ড",
    coverUrl: "/books/allama-saidi-rochanaboli-2/cover.jpg",
    pdfUrl: "/books/allama-saidi-rochanaboli-2/allama-saidi-rochanaboli-2.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "jibon-jekhane-jemon",
    title: "জীবন যেখানে যেমন",
    author: "",
    description: "Short description",
    coverUrl: "/books/jibon-jekhane-jemon/cover.jpg",
    pdfUrl: "/books/jibon-jekhane-jemon/jibon-jekhane-jemon.pdf",
    pages: 146,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "maa-o-baba-arif-azad",
    title: "মা মা  ও বাবা",
    author: "",
    description: "Short description",
    coverUrl: "/books/maa-o-baba-arif-azad/cover.jpg",
    pdfUrl: "/books/maa-o-baba-arif-azad/maa-o-baba-arif-azad.pdf",
    pages: 163,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "allama-saidi-rochanaboli-3",
    title: "আল্লামা সাঈদী রচনাবলী ৩য় খণ্ড",
    author: "আল্লামা সাঈদী",
    description: "আল্লামা সাঈদীর রচনা সংকলনের তৃতীয় খণ্ড",
    coverUrl: "/books/allama-saidi-rochanaboli-3/cover.jpg",
    pdfUrl: "/books/allama-saidi-rochanaboli-3/allama-saidi-rochanaboli-3.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "islame-porda-dr-khondkar-abdullah-jahangir",
    title: "ইসলামে পর্দা",
    author: "ড. খন্দকার আব্দুল্লাহ জাহাঙ্গীর",
    description: "ইসলামে পর্দার বিধান ও গুরুত্ব",
    coverUrl: "/books/islame-porda-dr-khondkar-abdullah-jahangir/cover.jpg",
    pdfUrl: "/books/islame-porda-dr-khondkar-abdullah-jahangir/islame-porda-dr-khondkar-abdullah-jahangir.pdf",
    pages: 0,
    categories: ["জনপ্রিয় বই"],
    ratingAvg: 4.5,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "paradoxical-sajid-1",
    title: "প্যারাডক্সিক্যাল সাজিদ - ১",
    author: "",
    description: "Short description",
    coverUrl: "/books/paradoxical-sajid-1/cover.jpg",
    pdfUrl: "/books/paradoxical-sajid-1/paradoxical-sajid-1.pdf",
    pages: 172,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "paradoxical-sajid-2",
    title: "প্যারাডক্সিক্যাল সাজিদ - ২",
    author: "",
    description: "Short description",
    coverUrl: "/books/paradoxical-sajid-2/cover.jpg",
    pdfUrl: "/books/paradoxical-sajid-2/paradoxical-sajid-2.pdf",
    pages: 235,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "prottyaborton-arif-azad",
    title: "প্রত্যাবর্তন",
    author: "",
    description: "Short description",
    coverUrl: "/books/prottyaborton-arif-azad/cover.jpg",
    pdfUrl: "/books/prottyaborton-arif-azad/prottyaborton-arif-azad.pdf",
    pages: 220,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-01",
    title: "সাইমুম সিরিজ 1",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-01/cover.jpg",
    pdfUrl: "/books/saimum-01/saimum-01.pdf",
    pages: 166,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-02",
    title: "সাইমুম সিরিজ 2",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-02/cover.jpg",
    pdfUrl: "/books/saimum-02/saimum-02.pdf",
    pages: 178,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "আদর্শ-পরিবার-গঠনে-৪০-টি-উপদেশ-মুহাম্মাদ-সালেহ-আল-মুনাজ্জিদ",
    title: "আদর্শ পরিবার গঠনে ৪০ টি উপদেশ মুহাম্মাদ সালেহ আল মুনাজ্জিদ",
    author: "",
    description: "Imported",
    coverUrl: "/books/adarsho-poribar-40-upodesh-muhammad-saleh-al-munajid/cover.jpg",
    pdfUrl: "/books/adarsho-poribar-40-upodesh-muhammad-saleh-al-munajid/আদর্শ-পরিবার-গঠনে-৪০-টি-উপদেশ-মুহাম্মাদ-সালেহ-আল-মুনাজ্জিদ.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "ইসলামের-ইতিহাস-নববী-যুগ-থেকে-বর্তমান-ড-মুহাম্মাদ-ইবরাহিম-আশ-শারিকি",
    title: "ইসলামের ইতিহাস (নববী যুগ থেকে বর্তমান) ড মুহাম্মাদ ইবরাহিম আশ শারিকি",
    author: "",
    description: "Imported",
    coverUrl: "/books/islamer-itihash-nobobi-jug-theke-bortoman-dr-muhammad-ibrahim-ash-shariki/cover.jpg",
    pdfUrl: "/books/islamer-itihash-nobobi-jug-theke-bortoman-dr-muhammad-ibrahim-ash-shariki/ইসলামের-ইতিহাস-নববী-যুগ-থেকে-বর্তমান-ড-মুহাম্মাদ-ইবরাহিম-আশ-শারিকি.pdf",
    pages: 0,
    categories: ["ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "গাজওয়াতুল-হিন্দ-প্রফেসর-ড-ইসমতুল্লাহ",
    title: "গাজওয়াতুল হিন্দ প্রফেসর ড ইসমতুল্লাহ",
    author: "",
    description: "Imported",
    coverUrl: "/books/gazwatul-hind-prof-dr-ismatullah/cover.jpg",
    pdfUrl: "/books/gazwatul-hind-prof-dr-ismatullah/গাজওয়াতুল-হিন্দ-প্রফেসর-ড-ইসমতুল্লাহ.pdf",
    pages: 0,
    categories: ["ইতিহাস"], 
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "পারিবারিক-সংকটে-নবিজির-উপদেশ-ড-ইয়াদ-কুনাইবী",
    title: "পারিবারিক সংকটে নবিজির উপদেশ ড ইয়াদ কুনাইবী",
    author: "",
    description: "Imported",
    coverUrl: "/books/paribarik-songkote-nobijir-upodesh-dr-iyad-qunaibi/cover.jpg",
    pdfUrl: "/books/paribarik-songkote-nobijir-upodesh-dr-iyad-qunaibi/পারিবারিক-সংকটে-নবিজির-উপদেশ-ড-ইয়াদ-কুনাইবী.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "মুসলিম-প্যারেন্টিং-সন্তান-প্রতিপালন-গাইড-ড-মুহাম্মদ-আব্দুল-বারী",
    title: "মুসলিম প্যারেন্টিং সন্তান প্রতিপালন গাইড ড মুহাম্মদ আব্দুল বারী",
    author: "",
    description: "Imported",
    coverUrl: "/books/muslim-parenting-sontan-protipalon-guide-dr-muhammad-abdul-bari/cover.jpg",
    pdfUrl: "/books/muslim-parenting-sontan-protipalon-guide-dr-muhammad-abdul-bari/মুসলিম-প্যারেন্টিং-সন্তান-প্রতিপালন-গাইড-ড-মুহাম্মদ-আব্দুল-বারী.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "যে-আফসোস-রয়েই-যাবে-আব্দুল-হাই-মুহাম্মাদ-সাইফুল্লাহ",
    title: "যে আফসোস রয়েই যাবে আব্দুল হাই মুহাম্মাদ সাইফুল্লাহ",
    author: "",
    description: "Imported",
    coverUrl: "/books/je-afsos-royei-jabe-abdul-hai-muhammad-saifullah/cover.jpg",
    pdfUrl: "/books/je-afsos-royei-jabe-abdul-hai-muhammad-saifullah/যে-আফসোস-রয়েই-যাবে-আব্দুল-হাই-মুহাম্মাদ-সাইফুল্লাহ.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "সাহাবিদের-চোখে-দুনিয়া-ইমাম-আহমাদ-ইবনে-হাম্বল-রহঃ",
    title: "সাহাবিদের চোখে দুনিয়া ইমাম আহমাদ ইবনে হাম্বল (রহঃ)",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahabider-chokhe-dunia-imam-ahmad-ibne-hanbal/cover.jpg",
    pdfUrl: "/books/sahabider-chokhe-dunia-imam-ahmad-ibne-hanbal/সাহাবিদের-চোখে-দুনিয়া-ইমাম-আহমাদ-ইবনে-হাম্বল-রহঃ.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "সুরা-ইউসুফের-পরশে-শাইখ-আলী-জাবির-আল-ফাইফী",
    title: "সুরা ইউসুফের পরশে শাইখ আলী জাবির আল ফাইফী",
    author: "",
    description: "Imported",
    coverUrl: "/books/sura-yusuf-er-poroshe-shaikh-ali-jabir-al-faifi/cover.jpg",
    pdfUrl: "/books/sura-yusuf-er-poroshe-shaikh-ali-jabir-al-faifi/সুরা-ইউসুফের-পরশে-শাইখ-আলী-জাবির-আল-ফাইফী.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "23-nobider-kahini-part-1-by-dr-md-asadullah-al-ghalib",
    title: "নবীদের জীবন কাহিনি-১",
    author: "",
    description: "Imported",
    coverUrl: "/books/23-nobider-kahini-part-1-by-dr-md-asadullah-al-ghalib/cover.jpg",
    pdfUrl: "/books/23-nobider-kahini-part-1-by-dr-md-asadullah-al-ghalib/23-nobider-kahini-part-1-by-dr-md-asadullah-al-ghalib.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-01-atmo-bisshos",
    title: "আত্ম বিশ্বাস",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-01/cover.jpg",
    pdfUrl: "/books/sahitto-01/আত্ম বিশ্বাস.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-02-allahr-opor-tawakol",
    title: "আল্লাহর উপর তাওয়াক্কুল",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-02/cover.jpg",
    pdfUrl: "/books/sahitto-02/আল্লাহর উপর তাওয়াক্কুল.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-03-allahr-premer-shondhane",
    title: "আল্লাহর প্রেমের সন্ধানে",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-03/cover.jpg",
    pdfUrl: "/books/sahitto-03/আল্লাহর প্রেমের সন্ধানে.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-04-eso-tawbar-pothe",
    title: "এসো তাওবার পথে",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-04/cover.jpg",
    pdfUrl: "/books/sahitto-04/এসো তাওবার পথে.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-05-dasotto-mohima",
    title: "দাসত্বের মহিমা",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-05/cover.jpg",
    pdfUrl: "/books/sahitto-05/দাসত্বের মহিমা.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-06-productive-muslim",
    title: "প্রোডাক্টিভ মুসলিম",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-06/cover.jpg",
    pdfUrl: "/books/sahitto-06/প্রোডাক্টিভ মুসলিম.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-07-rasuler-chokhe-duniya",
    title: "রাসুলের চোখে দুনিয়া",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-07/cover.jpg",
    pdfUrl: "/books/sahitto-07/রাসুলের চোখে দুনিয়া.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "sahitto-08-sera-hok-ramadan",
    title: "সেরা হোক এবারের রমাদান",
    author: "",
    description: "Imported",
    coverUrl: "/books/sahitto-08/cover.jpg",
    pdfUrl: "/books/sahitto-08/সেরা হোক এবারের রমাদান.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "24-nobider-kahini-part-2-by-dr-md-asadullah-al-ghalib",
    title: "নবীদের জীবন কাহিনি-২",
    author: "",
    description: "Imported",
    coverUrl: "/books/24-nobider-kahini-part-2-by-dr-md-asadullah-al-ghalib/cover.jpg",
    pdfUrl: "/books/24-nobider-kahini-part-2-by-dr-md-asadullah-al-ghalib/24-nobider-kahini-part-2-by-dr-md-asadullah-al-ghalib.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "59-seeratur-rasool-sm-by-prof-dr-muhammad-asadullah-al-ghalib",
    title: "সীরাতুর রাসুল-3",
    author: "",
    description: "Imported",
    coverUrl: "/books/59-seeratur-rasool-sm-by-prof-dr-muhammad-asadullah-al-ghalib/cover.jpg",
    pdfUrl: "/books/59-seeratur-rasool-sm-by-prof-dr-muhammad-asadullah-al-ghalib/59-seeratur-rasool-sm-by-prof-dr-muhammad-asadullah-al-ghalib.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "dhulimlin-upohar-ramadan",
    title: "ধূলিমলিন উপহার - রমাদান",
    author: "",
    description: "Imported",
    coverUrl: "/books/dhulimlin-upohar-ramadan/cover.jpg",
    pdfUrl: "/books/dhulimlin-upohar-ramadan/dhulimlin-upohar-ramadan.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "তারাবীহর-সালাতে-কুরআনের-বার্তা-boimate-com",
    title: "তারাবীহর সালাতে কুরআনের বার্তা ",
    author: "",
    description: "Imported",
    coverUrl: "/books/tarabih-salate-quraner-barta-boimate-com/cover.jpg",
    pdfUrl: "/books/tarabih-salate-quraner-barta-boimate-com/tarabih-salate-quraner-barta-boimate-com.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "তালাকের-আগে-ভাবুন-boimate-com",
    title: "তালাকের আগে ভাবুন",
    author: "",
    description: "Imported",
    coverUrl: "/books/talaker-age-vabun-boimate-com/cover.jpg",
    pdfUrl: "/books/talaker-age-vabun-boimate-com/talaker-age-vabun-boimate-com.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "পবিত্র-কুরআনের-মুজিযা",
    title: "পবিত্র কুরআনের মুজিযা",
    author: "",
    description: "Imported",
    coverUrl: "/books/pabitro-quraner-mojiza/cover.jpg",
    pdfUrl: "/books/pabitro-quraner-mojiza/pabitro-quraner-mojiza.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "রাসূলুল্লাহ-সঃ-এর-সকাল-সন্ধ্যার-দু-আ-ও-যিকর-boimate-com-pdf",
    title: "রাসূলুল্লাহ (সঃ) এর সকাল সন্ধ্যার দু'আ ও যিকর ",
    author: "",
    description: "Imported",
    coverUrl: "/books/rasulullah-s-er-sokal-sondhar-dua-o-zikr-boimate-com-pdf/cover.jpg",
    pdfUrl: "/books/rasulullah-s-er-sokal-sondhar-dua-o-zikr-boimate-com-pdf/rasulullah-s-er-sokal-sondhar-dua-o-zikr-boimate-com-pdf.pdf",
    pages: 0,
    categories: ["ইসলামিক কর্নার", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "অবাধ্যতার-ইতিহাস-ডা-শামসুল-আরেফীন",
    title: "অবাধ্যতার ইতিহাস ডা. শামসুল আরেফীন",
    author: "",
    description: "Imported",
    coverUrl: "/books/obadhyotar-itihash-dr-shamsul-arefin/cover.jpg",
    pdfUrl: "/books/obadhyotar-itihash-dr-shamsul-arefin/obadhyotar-itihash-dr-shamsul-arefin.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "এবার-ভিন্ন-কিছু-হোক-আরিফ-আজাদ",
    title: "এবার ভিন্ন কিছু হোক আরিফ আজাদ",
    author: "",
    description: "Imported",
    coverUrl: "/books/ebar-vinno-kichu-hok-arif-azad/cover.jpg",
    pdfUrl: "/books/ebar-vinno-kichu-hok-arif-azad/ebar-vinno-kichu-hok-arif-azad.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "কুরআন-থেকে-নেওয়া-জীবনের-পাঠ-আরিফ-আজাদ-boimate-com",
    title: "কুরআন থেকে নেওয়া জীবনের পাঠ আরিফ আজাদ",
    author: "",
    description: "Imported",
    coverUrl: "/books/quran-theke-neowa-jiboner-path-arif-azad-boimate-com/cover.jpg",
    pdfUrl: "/books/quran-theke-neowa-jiboner-path-arif-azad-boimate-com/quran-theke-neowa-jiboner-path-arif-azad-boimate-com.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },

  
{
    id: "চোখের_হেফাযত_ও_জবানের_হেফাযত",
    title: "চোখের হেফাযত ও জবানের হেফাযত pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/চোখের_হেফাযত_ও_জবানের_হেফাযত/cover.jpg",
    pdfUrl: "/books/চোখের_হেফাযত_ও_জবানের_হেফাযত/চোখের_হেফাযত_ও_জবানের_হেফাযত.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  }, 
{
    id: "নারীরা ভুল করে কোথায়",
    title: "নারীরা ভুল করে কোথায় pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/নারীরা ভুল করে কোথায়/cover.jpg",
    pdfUrl: "/books/নারীরা ভুল করে কোথায়/নারীরা ভুল করে কোথায়.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  }, 
{
    id: "পাশ্চাত্য_নারীসমাজ_ও_ইসলাম_",
    title: "পাশ্চাত্য নারীসমাজ ও ইসলাম pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/পাশ্চাত্য_নারীসমাজ_ও_ইসলাম_/cover.jpg",
    pdfUrl: "/books/পাশ্চাত্য_নারীসমাজ_ও_ইসলাম_/পাশ্চাত্য_নারীসমাজ_ও_ইসলাম_.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  }, 
{
    id: "ফিমেল মাইন্ড short pdf",
    title: "ফিমেল মাইন্ড Short PDF pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ফিমেল মাইন্ড short pdf/cover.jpg",
    pdfUrl: "/books/ফিমেল মাইন্ড short pdf/ফিমেল মাইন্ড short pdf.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  } , {
    id: "ভুমিকম্পের_কারণ_ও_আমাদের_করণীয়",
    title: "ভুমিকম্পের কারণ ও আমাদের করণীয় pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/ভুমিকম্পের_কারণ_ও_আমাদের_করণীয়/cover.jpg",
    pdfUrl: "/books/ভুমিকম্পের_কারণ_ও_আমাদের_করণীয়/ভুমিকম্পের_কারণ_ও_আমাদের_করণীয়.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  }  ,
  {
    id: "মহিলা_সাহাবীগণের_জীবনাদর্শ_",
    title: "মহিলা সাহাবীগণের জীবনাদর্শ pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/মহিলা_সাহাবীগণের_জীবনাদর্শ_/cover.jpg",
    pdfUrl: "/books/মহিলা_সাহাবীগণের_জীবনাদর্শ_/মহিলা_সাহাবীগণের_জীবনাদর্শ_.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "সংসার_সুখের_হয়_দু'জনের_গুণে",
    title: "সংসার সুখের হয় দু'জনের গুণে pdf",
    author: "",
    description: "Imported",
    coverUrl: "/books/সংসার_সুখের_হয়_দু'জনের_গুণে/cover.jpg",
    pdfUrl: "/books/সংসার_সুখের_হয়_দু'জনের_গুণে/সংসার_সুখের_হয়_দু'জনের_গুণে.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "ফেরা-দুই-বোনের-আলোর-পথে-আসার-গল্প-boimate-com",
    title: "ফেরা (দুই বোনের আলোর পথে আসার গল্প)",
    author: "",
    description: "Imported",
    coverUrl: "/books/fera-dui-boner-alor-pothe-asar-golpo-boimate-com/cover.jpg",
    pdfUrl: "/books/fera-dui-boner-alor-pothe-asar-golpo-boimate-com/fera-dui-boner-alor-pothe-asar-golpo-boimate-com.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "সত্যকথন-আরিফ-আজাদ",
    title: "সত্যকথন — আরিফ আজাদ",
    author: "",
    description: "Imported",
    coverUrl: "/books/sottyokothon-arif-azad/cover.jpg",
    pdfUrl: "/books/sottyokothon-arif-azad/sottyokothon-arif-azad.pdf",
    pages: 0,
    categories: ["ইসলামিক সাহিত্য", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "imdadia-hafezi-quran",
    title: "ইমদাদিয়া হাফেজী কুরআন",
    author: "",
    description: "Imported",
    coverUrl: "/books/imdadia-hafezi-quran/cover.jpg",
    pdfUrl: "/books/imdadia-hafezi-quran/imdadia-hafezi-quran.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-01",
    title: "মাআরেফুল কুরআন (০১)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-01/cover.jpg",
    pdfUrl: "/books/maariful-quran-01/maariful-quran-01.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-02",
    title: "মাআরেফুল কুরআন (০২)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-02/cover.jpg",
    pdfUrl: "/books/maariful-quran-02/maariful-quran-02.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-03",
    title: "মাআরেফুল কুরআন (০৩)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-03/cover.jpg",
    pdfUrl: "/books/maariful-quran-03/maariful-quran-03.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-04",
    title: "মাআরেফুল কুরআন (০৪)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-04/cover.jpg",
    pdfUrl: "/books/maariful-quran-04/maariful-quran-04.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-05",
    title: "মাআরেফুল কুরআন (০৫)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-05/cover.jpg",
    pdfUrl: "/books/maariful-quran-05/maariful-quran-05.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-06",
    title: "মাআরেফুল কুরআন (০৬)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-06/cover.jpg",
    pdfUrl: "/books/maariful-quran-06/maariful-quran-06.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-07",
    title: "মাআরেফুল কুরআন (০৭)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-07/cover.jpg",
    pdfUrl: "/books/maariful-quran-07/maariful-quran-07.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "maariful-quran-08",
    title: "মাআরেফুল কুরআন (০৮)",
    author: "",
    description: "Imported",
    coverUrl: "/books/maariful-quran-08/cover.jpg",
    pdfUrl: "/books/maariful-quran-08/maariful-quran-08.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "quran-arabic-bangla-translation",
    title: "কুরআন (আরবি-বাংলা অনুবাদ)",
    author: "",
    description: "Imported",
    coverUrl: "/books/quran-arabic-bangla-translation/cover.jpg",
    pdfUrl: "/books/quran-arabic-bangla-translation/quran-arabic-bangla-translation.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "tafheemul-quran-ampara",
    title: "তাফহিমুল কুরআন",
    author: "",
    description: "Imported",
    coverUrl: "/books/tafheemul-quran-ampara/cover.jpg",
    pdfUrl: "/books/tafheemul-quran-ampara/tafheemul-quran-ampara.pdf",
    pages: 0,
    categories: ["কুরআন", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "mishkat-shorif-1-v2",
    title: "মিশকাত শরীফ (১)",
    author: "",
    description: "Imported",
    coverUrl: "/books/mishkat-shorif-1-v2/cover.jpg",
    pdfUrl: "/books/mishkat-shorif-1-v2/mishkat-shorif-1-v2.pdf",
    pages: 0,
    categories: ["হাদিস", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "mishkat-shorif-2-v2",
    title: "মিশকাত শরীফ (২)",
    author: "",
    description: "Imported",
    coverUrl: "/books/mishkat-shorif-2-v2/cover.jpg",
    pdfUrl: "/books/mishkat-shorif-2-v2/mishkat-shorif-2-v2.pdf",
    pages: 0,
    categories: ["হাদিস", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "mishkat-shorif-3",
    title: "মিশকাত শরীফ (৩)",
    author: "",
    description: "Imported",
    coverUrl: "/books/mishkat-shorif-3/cover.jpg",
    pdfUrl: "/books/mishkat-shorif-3/mishkat-shorif-3.pdf",
    pages: 0,
    categories: ["হাদিস", "ইতিহাস"],
    ratingAvg: 4,
    ratingsCount: 0,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-03",
    title: "সাইমুম সিরিজ 3",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-03/cover.jpg",
    pdfUrl: "/books/saimum-03/saimum-03.pdf",
    pages: 214,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-04",
    title: "সাইমুম সিরিজ 4",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-04/cover.jpg",
    pdfUrl: "/books/saimum-04/saimum-04.pdf",
    pages: 201,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-05",
    title: "সাইমুম সিরিজ 5",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-05/cover.jpg",
    pdfUrl: "/books/saimum-05/saimum-05.pdf",
    pages: 119,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-06",
    title: "সাইমুম সিরিজ 6",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-06/cover.jpg",
    pdfUrl: "/books/saimum-06/saimum-06.pdf",
    pages: 101,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-07",
    title: "সাইমুম সিরিজ 7",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-07/cover.jpg",
    pdfUrl: "/books/saimum-07/saimum-07.pdf",
    pages: 189,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-08",
    title: "সাইমুম সিরিজ 8",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-08/cover.jpg",
    pdfUrl: "/books/saimum-08/saimum-08.pdf",
    pages: 175,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-09",
    title: "সাইমুম সিরিজ 9",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-09/cover.jpg",
    pdfUrl: "/books/saimum-09/saimum-09.pdf",
    pages: 99,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-10",
    title: "সাইমুম সিরিজ 10",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-10/cover.jpg",
    pdfUrl: "/books/saimum-10/saimum-10.pdf",
    pages: 201,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-11",
    title: "সাইমুম সিরিজ 11",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-11/cover.jpg",
    pdfUrl: "/books/saimum-11/saimum-11.pdf",
    pages: 193,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-12",
    title: "সাইমুম সিরিজ 12",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-12/cover.jpg",
    pdfUrl: "/books/saimum-12/saimum-12.pdf",
    pages: 204,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-13",
    title: "সাইমুম সিরিজ 13",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-13/cover.jpg",
    pdfUrl: "/books/saimum-13/saimum-13.pdf",
    pages: 189,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-14",
    title: "সাইমুম সিরিজ 14",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-14/cover.jpg",
    pdfUrl: "/books/saimum-14/saimum-14.pdf",
    pages: 163,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-15",
    title: "সাইমুম সিরিজ 15",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-15/cover.jpg",
    pdfUrl: "/books/saimum-15/saimum-15.pdf",
    pages: 196,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-16",
    title: "সাইমুম সিরিজ 16",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-16/cover.jpg",
    pdfUrl: "/books/saimum-16/saimum-16.pdf",
    pages: 198,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-17",
    title: "সাইমুম সিরিজ 17",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-17/cover.jpg",
    pdfUrl: "/books/saimum-17/saimum-17.pdf",
    pages: 194,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-18",
    title: "সাইমুম সিরিজ 18",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-18/cover.jpg",
    pdfUrl: "/books/saimum-18/saimum-18.pdf",
    pages: 184,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-19",
    title: "সাইমুম সিরিজ 19",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-19/cover.jpg",
    pdfUrl: "/books/saimum-19/saimum-19.pdf",
    pages: 177,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-20",
    title: "সাইমুম সিরিজ 20",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-20/cover.jpg",
    pdfUrl: "/books/saimum-20/saimum-20.pdf",
    pages: 217,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-21",
    title: "সাইমুম সিরিজ 21",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-21/cover.jpg",
    pdfUrl: "/books/saimum-21/saimum-21.pdf",
    pages: 185,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-22",
    title: "সাইমুম সিরিজ 22",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-22/cover.jpg",
    pdfUrl: "/books/saimum-22/saimum-22.pdf",
    pages: 164,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-23",
    title: "সাইমুম সিরিজ 23",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-23/cover.jpg",
    pdfUrl: "/books/saimum-23/saimum-23.pdf",
    pages: 202,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-24",
    title: "সাইমুম সিরিজ 24",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-24/cover.jpg",
    pdfUrl: "/books/saimum-24/saimum-24.pdf",
    pages: 195,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-25",
    title: "সাইমুম সিরিজ 25",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-25/cover.jpg",
    pdfUrl: "/books/saimum-25/saimum-25.pdf",
    pages: 193,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-26",
    title: "সাইমুম সিরিজ 26",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-26/cover.jpg",
    pdfUrl: "/books/saimum-26/saimum-26.pdf",
    pages: 195,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-27",
    title: "সাইমুম সিরিজ 27",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-27/cover.jpg",
    pdfUrl: "/books/saimum-27/saimum-27.pdf",
    pages: 167,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-28",
    title: "সাইমুম সিরিজ 28",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-28/cover.jpg",
    pdfUrl: "/books/saimum-28/saimum-28.pdf",
    pages: 220,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-29",
    title: "সাইমুম সিরিজ 29",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-29/cover.jpg",
    pdfUrl: "/books/saimum-29/saimum-29.pdf",
    pages: 134,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-30",
    title: "সাইমুম সিরিজ 30",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-30/cover.jpg",
    pdfUrl: "/books/saimum-30/saimum-30.pdf",
    pages: 171,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-31",
    title: "সাইমুম সিরিজ 31",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-31/cover.jpg",
    pdfUrl: "/books/saimum-31/saimum-31.pdf",
    pages: 178,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-32",
    title: "সাইমুম সিরিজ 32",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-32/cover.jpg",
    pdfUrl: "/books/saimum-32/saimum-32.pdf",
    pages: 192,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-33",
    title: "সাইমুম সিরিজ 33",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-33/cover.jpg",
    pdfUrl: "/books/saimum-33/saimum-33.pdf",
    pages: 177,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-34",
    title: "সাইমুম সিরিজ 34",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-34/cover.jpg",
    pdfUrl: "/books/saimum-34/saimum-34.pdf",
    pages: 175,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-35",
    title: "সাইমুম সিরিজ 35",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-35/cover.jpg",
    pdfUrl: "/books/saimum-35/saimum-35.pdf",
    pages: 168,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-36",
    title: "সাইমুম সিরিজ 36",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-36/cover.jpg",
    pdfUrl: "/books/saimum-36/saimum-36.pdf",
    pages: 158,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-37",
    title: "সাইমুম সিরিজ 37",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-37/cover.jpg",
    pdfUrl: "/books/saimum-37/saimum-37.pdf",
    pages: 195,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-38",
    title: "সাইমুম সিরিজ 38",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-38/cover.jpg",
    pdfUrl: "/books/saimum-38/saimum-38.pdf",
    pages: 192,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-39",
    title: "সাইমুম সিরিজ 39",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-39/cover.jpg",
    pdfUrl: "/books/saimum-39/saimum-39.pdf",
    pages: 213,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-40",
    title: "সাইমুম সিরিজ 40",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-40/cover.jpg",
    pdfUrl: "/books/saimum-40/saimum-40.pdf",
    pages: 139,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-41",
    title: "সাইমুম সিরিজ 41",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-41/cover.jpg",
    pdfUrl: "/books/saimum-41/saimum-41.pdf",
    pages: 146,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-42",
    title: "সাইমুম সিরিজ 42",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-42/cover.jpg",
    pdfUrl: "/books/saimum-42/saimum-42.pdf",
    pages: 200,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-43",
    title: "সাইমুম সিরিজ 43",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-43/cover.jpg",
    pdfUrl: "/books/saimum-43/saimum-43.pdf",
    pages: 131,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-44",
    title: "সাইমুম সিরিজ 44",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-44/cover.jpg",
    pdfUrl: "/books/saimum-44/saimum-44.pdf",
    pages: 178,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-45",
    title: "সাইমুম সিরিজ 45",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-45/cover.jpg",
    pdfUrl: "/books/saimum-45/saimum-45.pdf",
    pages: 189,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-46",
    title: "সাইমুম সিরিজ 46",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-46/cover.jpg",
    pdfUrl: "/books/saimum-46/saimum-46.pdf",
    pages: 180,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-47",
    title: "সাইমুম সিরিজ 47",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-47/cover.jpg",
    pdfUrl: "/books/saimum-47/saimum-47.pdf",
    pages: 168,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-48",
    title: "সাইমুম সিরিজ 48",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-48/cover.jpg",
    pdfUrl: "/books/saimum-48/saimum-48.pdf",
    pages: 156,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-49",
    title: "সাইমুম সিরিজ 49",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-49/cover.jpg",
    pdfUrl: "/books/saimum-49/saimum-49.pdf",
    pages: 195,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-50",
    title: "সাইমুম সিরিজ 50",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-50/cover.jpg",
    pdfUrl: "/books/saimum-50/saimum-50.pdf",
    pages: 173,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-51",
    title: "সাইমুম সিরিজ 51",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-51/cover.jpg",
    pdfUrl: "/books/saimum-51/saimum-51.pdf",
    pages: 160,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-52",
    title: "সাইমুম সিরিজ 52",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-52/cover.jpg",
    pdfUrl: "/books/saimum-52/saimum-52.pdf",
    pages: 188,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-53",
    title: "সাইমুম সিরিজ 53",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-53/cover.jpg",
    pdfUrl: "/books/saimum-53/saimum-53.pdf",
    pages: 169,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-54",
    title: "সাইমুম সিরিজ 54",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-54/cover.jpg",
    pdfUrl: "/books/saimum-54/saimum-54.pdf",
    pages: 170,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-55",
    title: "সাইমুম সিরিজ 55",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-55/cover.jpg",
    pdfUrl: "/books/saimum-55/saimum-55.pdf",
    pages: 164,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
{
    id: "saimum-56",
    title: "সাইমুম সিরিজ 56",
    author: "",
    description: "Short description",
    coverUrl: "/books/saimum-56/cover.jpg",
    pdfUrl: "/books/saimum-56/saimum-56.pdf",
    pages: 168,
    categories: ["ইসলামিক সিরিজ"],
    ratingAvg: 4,
    ratingsCount: 10,
    badge: "",
    featured: false
  },
  
];

export const categories = [
  "সকল",
  "কুরআন",
  "হাদিস",
  "তাফসির",
  "ইসলামিক কর্নার",
  "ইসলামিক সাহিত্য",
  "ইতিহাস",
  "জনপ্রিয় বই",
  "ইসলামিক সিরিজ"
];

