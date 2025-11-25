import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
import { addToLibrary, isInLibrary, saveProgress, getProgress, toggleBookmark as toggleBookmarkStorage, markAsDownloaded } from "@/lib/offlineStorage";
import { pdfCache } from "@/lib/pdfCache";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const book = books.find((b) => b.id === id);

  const [numPages, setNumPages] = useState<number>(0);
  const [pagesLoaded, setPagesLoaded] = useState<number>(0);
  const [maxVisiblePage, setMaxVisiblePage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam) || 1 : 1;
  });
  const [scale, setScale] = useState<number>(1.2);
  const [showControls, setShowControls] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([]);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [initialJumpDone, setInitialJumpDone] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Reset state when book changes
    setLoadError(null);
    setNumPages(0);
    setPagesLoaded(0);
    setMaxVisiblePage(0);
    setPdfUrl("");
    setInitialJumpDone(false);
    
    // Load reading progress and bookmarks
    if (book) {
      const progress = getProgress(book.id);
      
      // Check if URL has a specific page parameter
      const pageParam = searchParams.get('page');
      const urlPage = pageParam ? parseInt(pageParam) || null : null;
      
      if (urlPage !== null && urlPage !== 1) {
        // URL parameter takes priority over stored progress
        console.log('🎯 Initial load with URL page:', urlPage);
        setCurrentPage(urlPage);
      } else if (progress && progress.currentPage > 1) {
        // No URL parameter, use stored progress
        console.log('🎯 Initial load with stored progress page:', progress.currentPage);
        setCurrentPage(progress.currentPage);
      } else {
        setCurrentPage(1);
        setInitialJumpDone(true); // No jump needed, start at page 1
      }
      
      if (progress) {
        setBookmarkedPages(progress.bookmarks || []);
      }
      
      setIsDownloaded(isInLibrary(book.id));
      
      // Load PDF from cache or fetch
      loadPDF();
    }
  }, [book, searchParams]);

  const loadPDF = async () => {
    if (!book) return;
    
    try {
      // Try to get from cache first
      const cachedUrl = await pdfCache.getCachedPDF(book.pdfUrl);
      
      if (cachedUrl) {
        console.log('Loading PDF from cache - instant load');
        setPdfUrl(cachedUrl);
        // Cached PDFs load instantly, so prepare for quick rendering
        const pageParam = searchParams.get('page');
        const targetPage = pageParam ? parseInt(pageParam) || 1 : 1;
        if (targetPage > 1) {
          // Pre-set max visible page for faster initial render
          setMaxVisiblePage(Math.min(book.pages || 999, targetPage + 10));
        }
      } else if (!navigator.onLine) {
        // Offline and no cache
        setLoadError('আপনি অফলাইনে আছেন এবং এই বইটি ক্যাশ করা নেই');
      } else {
        console.log('Loading PDF from network');
        setPdfUrl(book.pdfUrl);
        // Cache in background
        pdfCache.cachePDF(book.pdfUrl, book.id).catch(console.error);
      }
    } catch (error) {
      console.error('Error loading PDF:', error);
      if (!navigator.onLine) {
        setLoadError('অফলাইনে বইটি লোড করা যায়নি। প্রথমে অনলাইনে খুলুন।');
      } else {
        setPdfUrl(book.pdfUrl);
      }
    }
  };

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

    // Don't track scroll until initial jump is complete
    if (!initialJumpDone) {
      console.log('⏸️ Scroll tracking paused - waiting for initial jump');
      return;
    }

    const handleScroll = () => {
      const pages = container.querySelectorAll('.react-pdf__Page');
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const centerY = containerTop + containerHeight / 2;

      let closestPage = 1;
      let closestDistance = Infinity;

      pages.forEach((page, index) => {
        const pageRect = page.getBoundingClientRect();
        const pageCenter = pageRect.top + pageRect.height / 2;
        const distance = Math.abs(centerY - pageCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestPage = index + 1;
        }
      });

      setCurrentPage(closestPage);
      // Aggressively preload pages ahead
      setMaxVisiblePage((prev) =>
        Math.max(prev, Math.min(numPages, closestPage + 15))
      );
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [numPages, initialJumpDone]);

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">বই পাওয়া যায়নি</p>
          <Button onClick={() => navigate('/')}>হোমে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log('📄 PDF loaded successfully with', numPages, 'pages for', book?.id);
    setNumPages(numPages);
    setLoadError(null);
    
    // Check if we need to jump to a specific page
    const pageParam = searchParams.get('page');
    const urlPage = pageParam ? parseInt(pageParam) || null : null;
    const targetPage = urlPage || currentPage;
    
    console.log('🎯 Target page:', targetPage, 'Current page:', currentPage, 'URL page:', urlPage);
    
    if (targetPage > 1) {
      // CRITICAL FIX: Render FROM page 1 to target + buffer
      // This ensures all pages before target are available for scroll
      const initialBuffer = Math.min(numPages, targetPage + 12);
      
      console.log('⚡ Rendering pages 1 to', initialBuffer, 'for target', targetPage);
      setMaxVisiblePage(initialBuffer);
      
      // Jump to target page after render
      setTimeout(() => {
        console.log('🚀 Jumping to page:', targetPage);
        const container = document.getElementById('pdf-container');
        const pages = container?.querySelectorAll('.react-pdf__Page');
        
        // Scroll to target page (0-indexed)
        if (pages && pages[targetPage - 1]) {
          pages[targetPage - 1].scrollIntoView({ behavior: 'auto', block: 'start' });
          console.log('✅ Jump complete to page', targetPage);
          
          // Enable scroll tracking after jump
          setTimeout(() => {
            setInitialJumpDone(true);
            console.log('✅ Scroll tracking enabled');
            
            // Load more pages ahead progressively
            setTimeout(() => {
              setMaxVisiblePage(prev => Math.min(numPages, Math.max(prev, targetPage + 25)));
              console.log('📖 Extended loading ahead');
            }, 500);
          }, 300);
        } else {
          console.log('⚠️ Target page not rendered yet, waiting...');
          // Retry with longer wait
          setTimeout(() => {
            const container = document.getElementById('pdf-container');
            const pages = container?.querySelectorAll('.react-pdf__Page');
            if (pages && pages[targetPage - 1]) {
              pages[targetPage - 1].scrollIntoView({ behavior: 'auto', block: 'start' });
              console.log('✅ Jump complete to page', targetPage, '(retry)');
              setTimeout(() => {
                setInitialJumpDone(true);
              }, 300);
            }
          }, 1000);
        }
      }, 400);
    } else {
      // Starting at page 1, no jump needed
      setMaxVisiblePage(Math.min(numPages, 15));
      setInitialJumpDone(true);
      console.log('✅ Starting at page 1, scroll tracking enabled');
      
      // Background load more pages
      setTimeout(() => {
        setMaxVisiblePage(prev => Math.min(numPages, 30));
      }, 500);
    }
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error for', book?.id, pdfUrl, error);
    if (!navigator.onLine) {
      setLoadError('অফলাইনে বইটি লোড করা যায়নি। অনলাইনে প্রথমবার খুলুন।');
    } else {
      setLoadError('পিডিএফ লোড করতে সমস্যা হয়েছে');
    }
  }

  const handleDownload = async () => {
    if (!book) return;

    if (isDownloaded) {
      toast.info("বইটি ইতিমধ্যে ডাউনলোড করা আছে");
      return;
    }

    try {
      // Cache the PDF for offline reading using IndexedDB
      await pdfCache.cachePDF(book.pdfUrl, book.id);
    
      // Add to library and mark as downloaded
      addToLibrary(book);
      markAsDownloaded(book.id);
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
    setScale(prev => {
      const newScale = Math.min(3.0, prev + 0.2);
      return Number(newScale.toFixed(1)); // Round to prevent floating point issues
    });
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(0.5, prev - 0.2);
      return Number(newScale.toFixed(1)); // Round to prevent floating point issues
    });
  };

  const jumpToPage = useCallback((pageNum: number) => {
    if (pageNum < 1 || pageNum > numPages) return;
  
    // Ensure the target page is rendered
    setMaxVisiblePage((prev) => Math.max(prev, pageNum + 10));
    
    // Immediate scroll without delay for better UX
    const container = document.getElementById('pdf-container');
    const pages = container?.querySelectorAll('.react-pdf__Page');
    if (pages && pages[pageNum - 1]) {
      pages[pageNum - 1].scrollIntoView({ behavior: 'auto', block: 'start' });
      setCurrentPage(pageNum);
    } else {
      // Page not rendered yet, wait a bit
      setTimeout(() => {
        const container = document.getElementById('pdf-container');
        const pages = container?.querySelectorAll('.react-pdf__Page');
        if (pages && pages[pageNum - 1]) {
          pages[pageNum - 1].scrollIntoView({ behavior: 'auto', block: 'start' });
          setCurrentPage(pageNum);
        }
      }, 200);
    }
  }, [numPages]);

  // Note: Initial page jump is now handled in onDocumentLoadSuccess for faster loading

  const pageWidth = Math.min(containerWidth * 0.95, 800);
  const pagesToRender =
    numPages > 0 ? maxVisiblePage : 0;
  // Show loader until first 10 pages load
  const initialVisibleTarget = Math.min(10, numPages);
  const showInitialLoader =
    !loadError &&
    !!pdfUrl &&
    pdfUrl !== "undefined" &&
    (numPages === 0 || pagesLoaded < initialVisibleTarget);

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
        {!isOnline && (
          <div className="bg-destructive/10 border-t border-destructive/20 px-4 py-1.5 text-center">
            <p className="text-xs text-destructive">অফলাইন মোড - শুধুমাত্র ক্যাশ করা বই দেখা যাবে</p>
          </div>
        )}
      </header>

      {/* Controls - Toggle Visibility */}
      <div
        className={`fixed left-0 right-0 ${!isOnline ? 'top-[76px] md:top-[84px]' : 'top-[48px] md:top-[56px]'} z-40 bg-card/95 backdrop-blur border-t border-border transition-transform ${
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

      {showInitialLoader && (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
          <LoadingIndicator message="পিডিএফ লোড হচ্ছে..." />
        </div>
      )}

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
              <div className="text-center px-4">
                <p className="text-destructive mb-4">{loadError}</p>
                {!isOnline ? (
                  <p className="text-sm text-muted-foreground mb-4">
                    অফলাইনে পড়তে প্রথমে অনলাইনে বইটি খুলুন এবং ডাউনলোড করুন
                  </p>
                ) : null}
                <Button onClick={() => {
                  setLoadError(null);
                  loadPDF();
                }}>আবার চেষ্টা করুন</Button>
              </div>
            </div>
          ) : (!pdfUrl || pdfUrl === 'undefined') ? (
            <div className="flex h-screen items-center justify-center">
              {/* Initial load before PDF url is resolved - single global Lottie */}
              <LoadingIndicator message="পিডিএফ লোড হচ্ছে..." />
            </div>
          ) : (
            <Document
              key={book.id}
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="py-20 text-center text-sm text-muted-foreground">
                  পিডিএফ প্রস্তুত হচ্ছে...
                </div>
              }
            >
              {numPages > 0 &&
                Array.from({ length: pagesToRender }, (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={pageWidth}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={false}
                    className="mb-2 shadow-lg"
                    devicePixelRatio={window.devicePixelRatio || 2}
                    onLoadSuccess={() => setPagesLoaded((prev) => prev + 1)}
                    loading={
                      <div
                        className="flex items-center justify-center bg-muted/20"
                        style={{ width: pageWidth * scale, height: pageWidth * scale * 1.4 }}
                      >
                        <p className="text-xs text-muted-foreground">পৃষ্ঠা {index + 1} লোড হচ্ছে...</p>
                      </div>
                    }
                    error={
                      <div
                        className="flex items-center justify-center bg-card"
                        style={{ width: pageWidth * scale, height: pageWidth * scale * 1.4 }}
                      >
                        <p className="text-sm text-destructive">পৃষ্ঠা {index + 1} লোড করা যায়নি</p>
                      </div>
                    }
                  />
                ))}
            </Document>
          )}
        </div>
      </div>

      {/* Page Info - Fixed Bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur transition-transform ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center gap-1 p-2">
          <div className="flex items-center justify-center gap-4">
            <p className="text-xs font-medium md:text-sm">
              পৃষ্ঠা: {currentPage} / {numPages}
            </p>
            {numPages > 0 && (
              <p className="text-xs font-medium text-primary md:text-sm">
                {Math.round((currentPage / numPages) * 100)}% সম্পন্ন
              </p>
            )}
            {bookmarkedPages.length > 0 && (
              <p className="text-xs text-muted-foreground">
                বুকমার্ক: {bookmarkedPages.length}
              </p>
            )}
          </div>
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
