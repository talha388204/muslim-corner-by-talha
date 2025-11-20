import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { CategoryTabs } from "@/components/CategoryTabs";
import { BottomNav } from "@/components/BottomNav";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("সকল");

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

      {/* Banner/Promo Section - Optional */}
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
