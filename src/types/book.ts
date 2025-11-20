export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverUrl: string;
  pdfUrl: string;
  pages: number;
  categories: string[];
  tags?: string[];
  featured?: boolean;
  flipbook?: boolean;
  ratingAvg: number;
  ratingsCount: number;
  price?: string;
  badge?: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  lastOpenedAt: Date;
  bookmarks?: number[];
}
