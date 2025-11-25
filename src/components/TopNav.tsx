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
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.error("Installation not available");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast.success("অ্যাপ ইনস্টল হচ্ছে...");
      setShowInstallButton(false);
    }
    
    setDeferredPrompt(null);
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
