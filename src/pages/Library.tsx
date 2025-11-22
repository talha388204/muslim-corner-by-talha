import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { BookCard } from "@/components/BookCard";
import { getLibrary } from "@/lib/offlineStorage";
import { books } from "@/data/books";
import { useState, useEffect } from "react";
import { Library as LibraryIcon, Download } from "lucide-react";

export default function Library() {
  // Only show library books that exist in the main books data
  const [libraryBooks, setLibraryBooks] = useState(() => 
    getLibrary().filter(book => books.some(b => b.id === book.id))
  );

  useEffect(() => {
    const updateLibrary = () => {
      // Filter out books that don't exist in the main books data
      const validLibraryBooks = getLibrary().filter(book => 
        books.some(b => b.id === book.id)
      );
      setLibraryBooks(validLibraryBooks);
    };
    
    window.addEventListener('storage', updateLibrary);
    const interval = setInterval(updateLibrary, 1000);
    
    return () => {
      window.removeEventListener('storage', updateLibrary);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">আমার লাইব্রেরি</h1>
          <p className="text-sm text-muted-foreground">
            {libraryBooks.length} টি বই সংরক্ষিত
          </p>
        </div>

        {libraryBooks.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <LibraryIcon className="mx-auto mb-4 text-muted-foreground" size={64} />
              <h2 className="mb-2 text-xl font-semibold">লাইব্রেরি খালি</h2>
              <p className="text-muted-foreground">
                বই ডিটেইলস পেজ থেকে লাইব্রেরিতে যুক্ত করুন
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {libraryBooks.map((book) => (
              <div key={book.id} className="relative">
                <BookCard book={book} />
                {book.downloaded && (
                  <div className="absolute right-2 top-2 rounded-full bg-primary p-1.5">
                    <Download size={12} className="text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
