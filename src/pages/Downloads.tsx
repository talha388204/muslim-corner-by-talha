import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { BookCard } from "@/components/BookCard";
import { getLibrary } from "@/lib/offlineStorage";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { pdfCache } from "@/lib/pdfCache";
import { removeFromLibrary } from "@/lib/offlineStorage";
import { useState } from "react";

export default function Downloads() {
  const navigate = useNavigate();
  const [library, setLibrary] = useState(getLibrary());
  
  // Filter only downloaded books
  const downloadedBooks = library.filter(book => book.downloaded);

  const handleRemove = async (bookId: string) => {
    try {
      const book = downloadedBooks.find(b => b.id === bookId);
      if (book) {
        // Remove from cache
        await pdfCache.removePDF(book.pdfUrl);
        // Remove from library
        removeFromLibrary(bookId);
        setLibrary(getLibrary());
        toast.success("বইটি ডাউনলোড থেকে সরানো হয়েছে");
      }
    } catch (error) {
      console.error('Failed to remove:', error);
      toast.error("সরাতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Download className="h-6 w-6 text-primary" />
              ডাউনলোড
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              অফলাইনে পড়ার জন্য ডাউনলোড করা বই
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {downloadedBooks.length} টি বই
          </div>
        </div>

        {downloadedBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Download className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-2">
              কোনো বই ডাউনলোড করা নেই
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              বই পড়ার সময় ডাউনলোড করুন অফলাইনে পড়ার জন্য
            </p>
            <Button onClick={() => navigate("/")}>
              বই খুঁজুন
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {downloadedBooks.map((book) => (
              <div key={book.id} className="relative group">
                <BookCard book={book} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(book.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
