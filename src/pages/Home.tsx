import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookCard } from "@/components/BookCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { books } from "@/data/books";
import { getAllProgress } from "@/lib/offlineStorage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("সকল");
  
  // Get last read book
  const lastReadBook = useMemo(() => {
    const allProgress = getAllProgress();
    if (allProgress.length === 0) return null;
    
    // Sort by lastReadAt to get the most recent
    const sorted = allProgress.sort((a, b) => 
      new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
    );
    
    const lastProgress = sorted[0];
    const book = books.find(b => b.id === lastProgress.bookId);
    
    if (!book) return null;
    
    const progressPercent = Math.round((lastProgress.currentPage / lastProgress.totalPages) * 100);
    
    return {
      book,
      currentPage: lastProgress.currentPage,
      totalPages: lastProgress.totalPages,
      progressPercent
    };
  }, []);

  const filteredBooks =
    activeCategory === "সকল"
      ? books
      : books.filter((book) => book.categories.includes(activeCategory));

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Last Read Book Card */}
      {lastReadBook && (
        <div className="border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 p-4">
          <Card className="overflow-hidden bg-card/50 border-primary/20">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">শেষ পড়া বই</h3>
              </div>
              <div className="flex gap-4">
                <img 
                  src={lastReadBook.book.coverUrl} 
                  alt={lastReadBook.book.title}
                  className="w-20 h-28 object-cover rounded shadow-md"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2">{lastReadBook.book.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{lastReadBook.book.author}</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          পৃষ্ঠা {lastReadBook.currentPage} / {lastReadBook.totalPages}
                        </span>
                        <span className="font-semibold text-primary">
                          {lastReadBook.progressPercent}%
                        </span>
                      </div>
                      <Progress value={lastReadBook.progressPercent} className="h-2" />
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => navigate(`/reader/${lastReadBook.book.id}`)}
                  >
                    পড়া চালিয়ে যান
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Banner/Promo Section */}
      <div className="border-b border-border bg-gradient-to-r from-primary/20 to-accent/20 p-6 text-center">
        <h2 className="text-xl font-bold">মুসলিম কর্নার</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          আপনার প্রিয় বই পড়ুন যেকোনো সময়
        </p>
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-6">
        <h3 className="mb-4 text-lg font-semibold">
          {activeCategory === "সকল" ? "সকল বই" : activeCategory}
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            কোনো বই পাওয়া যায়নি
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
