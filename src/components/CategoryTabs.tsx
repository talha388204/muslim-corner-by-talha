import { categories } from "@/data/books";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="border-b border-border bg-background">
      <div className="flex gap-4 overflow-x-auto px-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors",
              activeCategory === category
                ? "border-nav-active text-nav-active"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
