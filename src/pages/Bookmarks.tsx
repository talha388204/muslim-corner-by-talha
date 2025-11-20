import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, ExternalLink } from "lucide-react";
import { getAllProgress, getLibrary } from "@/lib/offlineStorage";
import { books } from "@/data/books";

export default function Bookmarks() {
  const navigate = useNavigate();
  const allProgress = getAllProgress();
  const library = getLibrary();

  // Get all bookmarks with book info
  const bookmarksData = allProgress
    .filter(progress => progress.bookmarks && progress.bookmarks.length > 0)
    .map(progress => {
      const book = books.find(b => b.id === progress.bookId) || 
                   library.find(b => b.id === progress.bookId);
      return {
        book,
        bookmarks: progress.bookmarks,
        totalPages: progress.totalPages
      };
    })
    .filter(item => item.book);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-foreground">বুকমার্ক</h1>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-6">
        {bookmarksData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Bookmark size={64} className="mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground">কোনো বুকমার্ক নেই</h2>
            <p className="mt-2 text-muted-foreground">
              আপনি এখনো কোনো পৃষ্ঠা বুকমার্ক করেননি
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookmarksData.map(({ book, bookmarks, totalPages }) => (
              <div key={book!.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex gap-4">
                  <img
                    src={book!.coverUrl}
                    alt={book!.title}
                    className="h-32 w-24 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{book!.title}</h3>
                    <p className="text-sm text-muted-foreground">{book!.author}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {bookmarks.length} টি বুকমার্ক
                    </p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bookmarks.sort((a, b) => a - b).map(page => (
                        <button
                          key={page}
                          onClick={() => navigate(`/reader/${book!.id}?page=${page}`)}
                          className="flex items-center gap-1 rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
                        >
                          <span>পৃষ্ঠা {page}</span>
                          <ExternalLink size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
