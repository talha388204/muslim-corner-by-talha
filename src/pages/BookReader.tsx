import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  Download,
  Share2,
  Bookmark,
  Search as SearchIcon,
  ZoomIn,
  ZoomOut,
  Menu,
} from "lucide-react";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SearchDialog } from "@/components/reader/SearchDialog";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { addToLibrary, isInLibrary, saveProgress, getProgress, toggleBookmark as toggleBookmarkStorage } from "@/lib/offlineStorage";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [showControls, setShowControls] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([]);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Memoize PDF options to prevent re-initialization
  const pdfOptions = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
  }), []);

  useEffect(() => {
    // Reset state when book changes
    setDocumentLoaded(false);
    setLoadError(null);
    setNumPages(0);
    
    // Load reading progress and bookmarks
    if (book) {
      const progress = getProgress(book.id);
      if (progress) {
        setCurrentPage(progress.currentPage);
        setBookmarkedPages(progress.bookmarks || []);
      }
      setIsDownloaded(isInLibrary(book.id));
    }
  }, [book]);

  useEffect(() => {
    // Save reading progress
    if (book && numPages > 0) {
      saveProgress({
        bookId: book.id,
        currentPage,
        totalPages: numPages,
        lastReadAt: new Date(),
        bookmarks: bookmarkedPages,
      });
    }
  }, [currentPage, book, numPages, bookmarkedPages]);

  // Controls visibility is now toggled only by tapping the reader area.

  useEffect(() => {
    // Set initial container width
    const updateWidth = () => {
      const container = document.getElementById('pdf-container');
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Track current page based on scroll position
  useEffect(() => {
    const container = document.getElementById('pdf-container');
    if (!container || numPages === 0) return;

    const handleScroll = () => {
      const pages = container.querySelectorAll('.react-pdf__Page');
      if (!pages.length) return;

      const viewportMiddle = window.innerHeight / 2;
      let currentVisible = 1;

      pages.forEach((page, index) => {
        const rect = page.getBoundingClientRect();
        // Consider the page that intersects the vertical middle of the viewport as current
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          currentVisible = index + 1;
        }
      });

      setCurrentPage(currentVisible);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [numPages]);

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">বই খুঁজে পাওয়া যায়নি</h1>
          <Button onClick={() => navigate("/")} className="mt-4">
            হোমে ফিরুন
          </Button>
        </div>
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setDocumentLoaded(true);
    setLoadError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error:', error);
    setLoadError('পিডিএফ লোড করতে সমস্যা হয়েছে');
    setDocumentLoaded(false);
  }

  const handleDownload = async () => {
    if (!book) return;

    if (isDownloaded) {
      toast.info("বইটি ইতিমধ্যে ডাউনলোড করা আছে");
      return;
    }

    try {
      // Cache the PDF for offline reading
      const cache = await caches.open('muslim-corner-pdfs');
      await cache.add(book.pdfUrl);
      
      // Add to library
      addToLibrary(book);
      setIsDownloaded(true);
      
      toast.success("বইটি ডাউনলোড এবং লাইব্রেরিতে যোগ করা হয়েছে");
    } catch (error) {
      console.error('Download failed:', error);
      toast.error("ডাউনলোড ব্যর্থ হয়েছে");
    }
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.info("লিংক কপি করা হয়েছে");
    }
  };

  const handleBookmark = () => {
    if (!book) return;
    toggleBookmarkStorage(book.id, currentPage);
    
    setBookmarkedPages(prev => {
      if (prev.includes(currentPage)) {
        toast.success("বুকমার্ক সরানো হয়েছে");
        return prev.filter(p => p !== currentPage);
      } else {
        toast.success("বুকমার্ক যোগ করা হয়েছে");
        return [...prev, currentPage];
      }
    });
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(3.0, prev + 0.2));
    toast.success("জুম করা হয়েছে");
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.2));
    toast.success("জুম আউট করা হয়েছে");
  };

  const jumpToPage = (pageNum: number) => {
    if (pageNum < 1 || pageNum > numPages) return;
    
    const container = document.getElementById('pdf-container');
    const pages = container?.querySelectorAll('.react-pdf__Page');
    if (pages && pages[pageNum - 1]) {
      pages[pageNum - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate optimal width for PDF pages
  const pageWidth = Math.min(containerWidth * 0.95, 800);

  return (
    <div
      className="relative flex h-screen flex-col bg-background"
      onClick={() => setShowControls(!showControls)}
    >
      {/* Top Header - Always Fixed */}
      <header className="fixed left-0 right-0 top-0 z-50 bg-card/95 backdrop-blur">
        <div className="flex items-center justify-between p-2 md:p-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>

          <div className="flex-1 px-2 md:px-4">
            <h1 className="truncate text-xs font-semibold md:text-sm">{book.title}</h1>
            <p className="truncate text-[10px] text-muted-foreground md:text-xs">{book.author}</p>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
            <Menu className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </header>

      {/* Controls - Toggle Visibility */}
      <div
        className={`fixed left-0 right-0 top-[48px] md:top-[56px] z-40 bg-card/95 backdrop-blur border-t border-border transition-transform ${
          showControls ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-around p-1.5 md:p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            title="ডাউনলোড করুন"
          >
            <Download className={`h-3.5 w-3.5 md:h-4 md:w-4 ${isDownloaded ? 'text-primary' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            title="শেয়ার করুন"
          >
            <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark();
            }}
            title="বুকমার্ক করুন"
          >
            <Bookmark className={`h-3.5 w-3.5 md:h-4 md:w-4 ${bookmarkedPages.includes(currentPage) ? 'fill-primary text-primary' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              setSearchOpen(true);
            }}
            title="পৃষ্ঠা খুঁজুন"
          >
            <SearchIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            title="জুম আউট"
          >
            <ZoomOut className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            title="জুম ইন"
          >
            <ZoomIn className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Viewer - Continuous Scroll */}
      <div 
        id="pdf-container"
        className="flex-1 overflow-auto pt-[100px] md:pt-[110px]"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y pinch-zoom'
        }}
      >
        <div className="flex flex-col items-center gap-2 p-2 md:p-4">
          {loadError ? (
            <div className="flex h-screen items-center justify-center">
              <div className="text-center">
                <p className="text-destructive mb-4">{loadError}</p>
                <Button onClick={() => window.location.reload()}>আবার চেষ্টা করুন</Button>
              </div>
            </div>
          ) : (
<<<<<<< Updated upstream
            <Document
              key={book.id}
              file={book.pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex h-screen items-center justify-center">
                  <LoadingIndicator message="পিডিএফ লোড হচ্ছে..." />
                </div>
              }
              options={pdfOptions}
            >
              {documentLoaded && numPages > 0 && Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={pageWidth}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="mb-2 shadow-lg"
                  devicePixelRatio={2}
                  loading={
                    <div className="flex items-center justify-center bg-muted/50" style={{ width: pageWidth, height: pageWidth * 1.4 }}>
                      <LoadingIndicator size={100} message={`পৃষ্ঠা ${index + 1}`} />
=======
            // If the book has no valid pdfUrl, show a helpful message instead of attempting to load
            (!book.pdfUrl || book.pdfUrl === 'undefined') ? (
              <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                  <p className="text-destructive mb-4">এই বইটির পিডিএফ উপলব্ধ নয়।</p>
                  <p className="text-sm text-muted-foreground mb-4">আপনি চাইলে বইটি পুনরায় ইম্পোর্ট করুন বা ডেভ টুল দিয়ে `public/books/{book.id}` ফোল্ডার চেক করুন।</p>
                  <Button onClick={() => navigate(-1)}>ফিরে যান</Button>
                </div>
              </div>
            ) : (
              <Document
                key={book.id}
                file={book.pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex h-screen items-center justify-center">
                    <div className="text-center">
                      <p className="mb-2">লোড হচ্ছে...</p>
                      <p className="text-sm text-muted-foreground">অনুগ্রহ করে অপেক্ষা করুন</p>
>>>>>>> Stashed changes
                    </div>
                  </div>
                }
                options={pdfOptions}
              >
                {documentLoaded && numPages > 0 && Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={pageWidth}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="mb-2 shadow-lg"
                    devicePixelRatio={2}
                    loading={
                      <div className="flex items-center justify-center bg-muted" style={{ width: pageWidth, height: pageWidth * 1.4 }}>
                        <p className="text-sm text-muted-foreground">পৃষ্ঠা {index + 1} লোড হচ্ছে...</p>
                      </div>
                    }
                    error={
                      <div className="flex items-center justify-center bg-muted/50" style={{ width: pageWidth, height: pageWidth * 1.4 }}>
                        <p className="text-sm text-destructive">পৃষ্ঠা {index + 1} লোড করা যায়নি</p>
                      </div>
                    }
                  />
                ))}
              </Document>
            )
          )}
        </div>
      </div>

      {/* Page Info - Fixed Bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur transition-transform ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-center gap-4 p-2">
          <p className="text-xs font-medium md:text-sm">
            পৃষ্ঠা: {currentPage} / {numPages}
          </p>
          {bookmarkedPages.length > 0 && (
            <p className="text-xs text-muted-foreground">
              বুকমার্ক: {bookmarkedPages.length}
            </p>
          )}
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        totalPages={numPages}
        onPageSelect={jumpToPage}
        bookmarks={bookmarkedPages}
      />
    </div>
  );
}
