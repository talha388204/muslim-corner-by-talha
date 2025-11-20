import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Bookmark,
  Search as SearchIcon,
  Sun,
  ZoomIn,
  ZoomOut,
  Menu,
} from "lucide-react";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    if (showControls) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

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

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

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
    toast.success(`পৃষ্ঠা ${pageNumber} বুকমার্ক করা হয়েছে`);
  };

  return (
    <div
      className="relative flex h-screen flex-col bg-background"
      onClick={() => setShowControls(!showControls)}
    >
      {/* Top Bar */}
      <div
        className={`absolute left-0 right-0 top-0 z-50 bg-card/95 backdrop-blur transition-transform ${
          showControls ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            <ChevronLeft />
          </Button>

          <div className="flex-1 px-4">
            <h1 className="truncate text-sm font-semibold">{book.title}</h1>
            <p className="truncate text-xs text-muted-foreground">{book.author}</p>
          </div>

          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-around border-t border-border p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
          >
            <Download size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
          >
            <Share2 size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark();
            }}
          >
            <Bookmark size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <SearchIcon size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setScale(Math.max(0.5, scale - 0.1));
            }}
          >
            <ZoomOut size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setScale(Math.min(2.0, scale + 0.1));
            }}
          >
            <ZoomIn size={18} />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto">
        <div className="flex justify-center p-4">
          <Document
            file={book.pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex h-screen items-center justify-center">
                <p>লোড হচ্ছে...</p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur transition-transform ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4">
          {/* Page Navigation */}
          <div className="mb-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPage();
              }}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft />
            </Button>

            <div className="text-center">
              <p className="text-sm font-medium">
                পৃষ্ঠা {pageNumber} / {numPages}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPage();
              }}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight />
            </Button>
          </div>

          {/* Page Slider */}
          <Slider
            value={[pageNumber]}
            min={1}
            max={numPages}
            step={1}
            onValueChange={(value) => {
              setPageNumber(value[0]);
            }}
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer"
          />

          {/* Progress Indicator */}
          <div className="mt-2 flex justify-center">
            <div className="h-1 w-1 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
