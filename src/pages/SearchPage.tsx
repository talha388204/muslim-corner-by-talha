import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />

      <div className="container mx-auto px-4 py-6">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="বই বা লেখক খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results */}
        {searchQuery && (
          <>
            <h3 className="mb-4 text-sm text-muted-foreground">
              {filteredBooks.length} টি ফলাফল
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}

        {searchQuery && filteredBooks.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            কোনো ফলাফল পাওয়া যায়নি
          </div>
        )}

        {!searchQuery && (
          <div className="py-12 text-center text-muted-foreground">
            বই বা লেখকের নাম লিখে খুঁজুন
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
