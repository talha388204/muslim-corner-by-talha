import { Search, QrCode, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TopNav = () => {
  const navigate = useNavigate();

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
        <div className="flex items-center gap-4">
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
