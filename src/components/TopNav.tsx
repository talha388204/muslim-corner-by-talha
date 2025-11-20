import { Search, QrCode, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TopNav = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div 
          className="cursor-pointer text-2xl font-bold text-primary"
          onClick={() => navigate("/")}
        >
          মেঘই
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
          <button className="relative text-foreground hover:text-primary">
            <ShoppingCart size={22} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
