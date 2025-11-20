import { useState, useEffect } from "react";
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
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === id);

  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.2);
  const [showControls, setShowControls] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    if (showControls) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

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
  }

  const handleDownload = () => {
    window.open(book.pdfUrl, "_blank");
    toast.success("ডাউনলোড শুরু হয়েছে");
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

  const handleBookmark = () => {
    toast.success(`বুকমার্ক করা হয়েছে`);
  };

  // Calculate optimal width for PDF pages
  const pageWidth = Math.min(containerWidth * 0.95, 800);

  return (
    <div
      className="relative flex h-screen flex-col bg-background"
      onClick={() => setShowControls(!showControls)}
    >
      {/* Top Bar - Fixed */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 bg-card/95 backdrop-blur transition-transform ${
          showControls ? "translate-y-0" : "-translate-y-full"
        }`}
      >
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

        {/* Controls */}
        <div className="flex items-center justify-around border-t border-border p-1.5 md:p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
          >
            <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
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
          >
            <Bookmark className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <SearchIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              setScale(Math.max(0.5, scale - 0.2));
            }}
          >
            <ZoomOut className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              setScale(Math.min(3.0, scale + 0.2));
            }}
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
          <Document
            file={book.pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex h-screen items-center justify-center">
                <p>লোড হচ্ছে...</p>
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={pageWidth}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="mb-2 shadow-lg"
              />
            ))}
          </Document>
        </div>
      </div>

      {/* Page Info - Fixed Bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur transition-transform ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-center p-2">
          <p className="text-xs font-medium md:text-sm">
            মোট পৃষ্ঠা: {numPages}
          </p>
        </div>
      </div>
    </div>
  );
}
