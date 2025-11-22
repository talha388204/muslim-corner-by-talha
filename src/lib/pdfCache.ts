// PDF Caching utility using IndexedDB for faster loading
const DB_NAME = 'muslim_corner_pdf_cache';
const DB_VERSION = 1;
const STORE_NAME = 'pdfs';

interface CachedPDF {
  url: string;
  blob: Blob;
  cachedAt: number;
  bookId: string;
}

class PDFCache {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'url' });
          store.createIndex('bookId', 'bookId', { unique: false });
          store.createIndex('cachedAt', 'cachedAt', { unique: false });
        }
      };
    });
  }

  async cachePDF(url: string, bookId: string): Promise<void> {
    if (!this.db) await this.init();

    try {
      // Check if already cached
      const existing = await this.getCachedPDF(url);
      if (existing) {
        console.log('PDF already cached:', url);
        return;
      }

      // Fetch the PDF
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch PDF');
      
      const blob = await response.blob();

      // Store in IndexedDB
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const cachedPDF: CachedPDF = {
        url,
        blob,
        cachedAt: Date.now(),
        bookId
      };

      await new Promise<void>((resolve, reject) => {
        const request = store.put(cachedPDF);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log('PDF cached successfully:', url);
    } catch (error) {
      console.error('Error caching PDF:', error);
      throw error;
    }
  }

  async getCachedPDF(url: string): Promise<string | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(url);

      request.onsuccess = () => {
        const result = request.result as CachedPDF | undefined;
        if (result) {
          // Convert blob to object URL for PDF.js
          const objectUrl = URL.createObjectURL(result.blob);
          resolve(objectUrl);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async isCached(url: string): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(url);

      request.onsuccess = () => {
        resolve(request.result !== undefined);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async clearCache(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCacheSize(): Promise<number> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const pdfs = request.result as CachedPDF[];
        const totalSize = pdfs.reduce((sum, pdf) => sum + pdf.blob.size, 0);
        resolve(totalSize);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async removePDF(url: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(url);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const pdfCache = new PDFCache();
