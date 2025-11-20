import { useParams, useNavigate } from "react-router-dom";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star, Download, Share2, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">বই খুঁজে পাওয়া যায়নি</h1>
          <Button onClick={() => navigate("/")} className="mt-4">
            হোমে ফিরুন
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating)
            ? "fill-rating-star text-rating-star"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `${book.title} by ${book.author}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      toast.info("শেয়ার ফিচার সাপোর্ট করে না");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">বই বিস্তারিত</h1>
        </div>
      </div>

      {/* Book Detail */}
      <div className="p-4">
        <div className="mx-auto max-w-md">
          {/* Cover Image */}
          <div className="relative mx-auto aspect-[2/3] w-48 overflow-hidden rounded-lg shadow-2xl">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold">{book.title}</h2>
              <p className="mt-1 text-muted-foreground">{book.author}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">{renderStars(book.ratingAvg)}</div>
              <span className="text-sm text-muted-foreground">
                {book.ratingAvg} ({book.ratingsCount} রিভিউ)
              </span>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div>{book.pages} পৃষ্ঠা</div>
              {book.price && <div>{book.price}</div>}
            </div>

            {/* Description */}
            {book.description && (
              <div className="rounded-lg bg-card p-4">
                <h3 className="mb-2 font-semibold">বিবরণ</h3>
                <p className="text-sm text-muted-foreground">
                  {book.description}
                </p>
              </div>
            )}

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {book.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-secondary px-3 py-1 text-xs"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate(`/reader/${book.id}`)}
              >
                <BookOpen className="mr-2" size={20} />
                পড়া শুরু করুন
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2" size={18} />
                  শেয়ার
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(book.pdfUrl, "_blank");
                    toast.success("ডাউনলোড শুরু হয়েছে");
                  }}
                >
                  <Download className="mr-2" size={18} />
                  ডাউনলোড
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
