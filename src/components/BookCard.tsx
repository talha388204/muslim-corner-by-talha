import { Book } from "@/types/book";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  function categoryBadgeClasses(cat: string) {
    const key = (cat || '').toLowerCase();
    if (key.includes('সিরিজ') || key.includes('series')) return 'bg-green-100 text-green-900';
    if (key.includes('সাহিত্য') || key.includes('sahitto') || key.includes('sahitya')) return 'bg-amber-100 text-amber-900';
    if (key.includes('কুরআন') || key.includes('quran')) return 'bg-sky-100 text-sky-900';
    if (key.includes('হাদিস') || key.includes('hadith')) return 'bg-amber-50 text-amber-900';
    if (key.includes('কর্নার') || key.includes('corner')) return 'bg-emerald-50 text-emerald-900';
    return 'bg-yellow-100 text-yellow-900';
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={12}
        className={`${
          i < Math.floor(rating)
            ? "fill-rating-star text-rating-star"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div
      className="group relative cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      {/* Book Cover Container */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-card">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-full w-full object-cover"
        />
        
        {/* Badge */}
        {book.badge && (
          <div className="absolute left-2 top-2 rounded bg-badge-bg px-2 py-1 text-xs font-bold text-badge-text">
            {book.badge}
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="mt-2 space-y-1">
        {/* Rating + Category label */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(book.ratingAvg)}
            <span className="ml-1 text-xs text-muted-foreground">({book.ratingsCount})</span>
          </div>

          {book.categories && book.categories[0] && (
            <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium ${categoryBadgeClasses(book.categories[0])}`}>
              {book.categories[0]}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-xs text-muted-foreground">{book.author}</p>
      </div>
    </div>
  );
};
