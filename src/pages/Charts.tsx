import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";
import { TrendingUp, Star, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Charts() {
  const trendingBooks = [...books].sort((a, b) => b.ratingsCount - a.ratingsCount);
  const topRatedBooks = [...books].sort((a, b) => b.ratingAvg - a.ratingAvg);
  const newBooks = [...books].filter(b => b.badge === "NEW");

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">চার্টস</h1>
          <p className="text-sm text-muted-foreground">সবচেয়ে জনপ্রিয় বই</p>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="trending" className="gap-2">
              <TrendingUp size={16} />
              ট্রেন্ডিং
            </TabsTrigger>
            <TabsTrigger value="top-rated" className="gap-2">
              <Star size={16} />
              সেরা রেটিং
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2">
              <Eye size={16} />
              নতুন
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {trendingBooks.map((book, index) => (
                <div key={book.id} className="relative">
                  <BookCard book={book} />
                  <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-rated" className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {topRatedBooks.map((book, index) => (
                <div key={book.id} className="relative">
                  <BookCard book={book} />
                  <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            {newBooks.length === 0 ? (
              <div className="flex min-h-[40vh] items-center justify-center">
                <p className="text-muted-foreground">কোনো নতুন বই নেই</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {newBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
