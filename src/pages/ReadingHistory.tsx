import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { getAllProgress } from "@/lib/offlineStorage";
import { books } from "@/data/books";
import { BookOpen, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { useMemo, useState } from "react";

export default function ReadingHistory() {
  const navigate = useNavigate();
  const [allProgress, setAllProgress] = useState(getAllProgress());

  // Sort by last read date
  const sortedProgress = useMemo(() => {
    return [...allProgress].sort((a, b) => 
      new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
    );
  }, [allProgress]);

  const historyItems = useMemo(() => {
    return sortedProgress.map(progress => {
      const book = books.find(b => b.id === progress.bookId);
      if (!book) return null;
      
      const progressPercent = Math.round((progress.currentPage / progress.totalPages) * 100);
      
      return {
        progress,
        book,
        progressPercent
      };
    }).filter(Boolean);
  }, [sortedProgress]);

  const handleRemoveHistory = (bookId: string) => {
    // Remove from localStorage
    const stored = localStorage.getItem("muslim_corner_progress");
    if (stored) {
      const data = JSON.parse(stored);
      const filtered = data.filter((p: any) => p.bookId !== bookId);
      localStorage.setItem("muslim_corner_progress", JSON.stringify(filtered));
      setAllProgress(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              পড়ার ইতিহাস
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              আপনি যেসব বই পড়েছেন তার তালিকা
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {historyItems.length} টি বই
          </div>
        </div>

        {historyItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg text-muted-foreground mb-2">
              কোনো পড়ার ইতিহাস নেই
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              বই পড়া শুরু করলে এখানে দেখাবে
            </p>
            <Button onClick={() => navigate("/")}>
              বই খুঁজুন
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {historyItems.map((item) => (
              <Card 
                key={item!.progress.bookId}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(`/reader/${item!.book.id}?page=${item!.progress.currentPage}`)}
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item!.book.coverUrl} 
                      alt={item!.book.title}
                      className="w-20 h-28 object-cover rounded shadow-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                            {item!.book.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-3">
                            {item!.book.author}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveHistory(item!.progress.bookId);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {format(new Date(item!.progress.lastReadAt), "d MMMM, yyyy", { locale: bn })}
                          </span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              পৃষ্ঠা {item!.progress.currentPage} / {item!.progress.totalPages}
                            </span>
                            <span className="font-semibold text-primary">
                              {item!.progressPercent}%
                            </span>
                          </div>
                          <Progress value={item!.progressPercent} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
