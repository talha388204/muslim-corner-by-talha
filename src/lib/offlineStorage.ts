import { Book } from "@/types/book";

const LIBRARY_KEY = "muslim_corner_library";
const READING_PROGRESS_KEY = "muslim_corner_progress";

export interface LibraryBook extends Book {
  addedAt: Date;
  downloaded: boolean;
}

export interface BookProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  lastReadAt: Date;
  bookmarks: number[];
}

// Library Management
export const getLibrary = (): LibraryBook[] => {
  const data = localStorage.getItem(LIBRARY_KEY);
  if (!data) return [];
  return JSON.parse(data, (key, value) => {
    if (key === 'addedAt') return new Date(value);
    return value;
  });
};

export const addToLibrary = (book: Book): void => {
  const library = getLibrary();
  const exists = library.find(b => b.id === book.id);
  if (!exists) {
    const libraryBook: LibraryBook = {
      ...book,
      addedAt: new Date(),
      downloaded: false
    };
    library.push(libraryBook);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
};

export const removeFromLibrary = (bookId: string): void => {
  const library = getLibrary().filter(b => b.id !== bookId);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
};

export const isInLibrary = (bookId: string): boolean => {
  return getLibrary().some(b => b.id === bookId);
};

export const markAsDownloaded = (bookId: string): void => {
  const library = getLibrary();
  const book = library.find(b => b.id === bookId);
  if (book) {
    book.downloaded = true;
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
};

// Reading Progress
export const getProgress = (bookId: string): BookProgress | null => {
  const data = localStorage.getItem(READING_PROGRESS_KEY);
  if (!data) return null;
  const allProgress: BookProgress[] = JSON.parse(data, (key, value) => {
    if (key === 'lastReadAt') return new Date(value);
    return value;
  });
  return allProgress.find(p => p.bookId === bookId) || null;
};

export const saveProgress = (progress: BookProgress): void => {
  const data = localStorage.getItem(READING_PROGRESS_KEY);
  let allProgress: BookProgress[] = data ? JSON.parse(data) : [];
  
  const index = allProgress.findIndex(p => p.bookId === progress.bookId);
  if (index >= 0) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }
  
  localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(allProgress));
};

export const getAllProgress = (): BookProgress[] => {
  const data = localStorage.getItem(READING_PROGRESS_KEY);
  if (!data) return [];
  return JSON.parse(data, (key, value) => {
    if (key === 'lastReadAt') return new Date(value);
    return value;
  });
};

export const toggleBookmark = (bookId: string, page: number): void => {
  const progress = getProgress(bookId);
  if (!progress) return;
  
  const bookmarks = progress.bookmarks || [];
  const index = bookmarks.indexOf(page);
  
  if (index >= 0) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(page);
  }
  
  saveProgress({ ...progress, bookmarks });
};
