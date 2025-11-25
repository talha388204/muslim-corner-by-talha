import { Search, QrCode, Bookmark, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const TopNav = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App already installed');
      setShowInstallButton(false);
    } else {
      // Show button after a short delay to ensure PWA is ready
      const timer = setTimeout(() => {
        if (!deferredPrompt) {
          console.log('Showing install button (no beforeinstallprompt yet)');
          setShowInstallButton(true);
        }
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      toast.info("অ্যাপ ইনস্টল করতে ব্রাউজারের মেনু থেকে 'Add to Home Screen' অপশন ব্যবহার করুন");
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('Install prompt outcome:', outcome);
      
      if (outcome === 'accepted') {
        toast.success("অ্যাপ ইনস্টল হচ্ছে...");
        setShowInstallButton(false);
      } else {
        toast.info("ইনস্টল বাতিল করা হয়েছে");
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Install prompt error:', error);
      toast.error("ইনস্টল করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div 
          className="cursor-pointer text-xl font-bold text-primary"
          onClick={() => navigate("/")}
        >
          Muslim Corner
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {showInstallButton && (
            <Button
              size="sm"
              onClick={handleInstallClick}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download size={18} />
              <span className="hidden sm:inline">ইনস্টল</span>
            </Button>
          )}
          <button 
            onClick={() => navigate("/search")}
            className="text-foreground hover:text-primary"
          >
            <Search size={22} />
          </button>
          <button className="text-foreground hover:text-primary">
            <QrCode size={22} />
          </button>
          <button 
            onClick={() => navigate("/bookmarks")}
            className="text-foreground hover:text-primary"
          >
            <Bookmark size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
