import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalPages: number;
  onPageSelect: (page: number) => void;
  bookmarks: number[];
}

export function SearchDialog({
  open,
  onOpenChange,
  totalPages,
  onPageSelect,
  bookmarks,
}: SearchDialogProps) {
  const [pageInput, setPageInput] = useState("");

  const handleJumpToPage = () => {
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageSelect(pageNum);
      onOpenChange(false);
      setPageInput("");
    }
  };

  const handleBookmarkClick = (page: number) => {
    onPageSelect(page);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>পৃষ্ঠা খুঁজুন</DialogTitle>
          <DialogDescription>
            পৃষ্ঠা নম্বর লিখুন অথবা বুকমার্ক থেকে বেছে নিন
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Page Jump */}
          <div className="space-y-2">
            <label className="text-sm font-medium">পৃষ্ঠা নম্বর (1-{totalPages})</label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={1}
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJumpToPage()}
                placeholder="পৃষ্ঠা নম্বর লিখুন"
                className="flex-1"
              />
              <Button onClick={handleJumpToPage}>যান</Button>
            </div>
          </div>

          {/* Bookmarks */}
          {bookmarks.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">বুকমার্ক ({bookmarks.length})</label>
              <ScrollArea className="h-[200px] rounded-md border">
                <div className="space-y-1 p-2">
                  {bookmarks
                    .sort((a, b) => a - b)
                    .map((page) => (
                      <Button
                        key={page}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleBookmarkClick(page)}
                      >
                        <Bookmark className="mr-2 h-4 w-4 fill-primary text-primary" />
                        পৃষ্ঠা {page}
                      </Button>
                    ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {bookmarks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              কোন বুকমার্ক নেই
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
