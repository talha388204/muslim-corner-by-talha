import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { Library as LibraryIcon } from "lucide-react";

export default function Library() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <LibraryIcon className="mx-auto mb-4 text-primary" size={64} />
          <h1 className="mb-2 text-2xl font-bold">আমার লাইব্রেরি</h1>
          <p className="text-muted-foreground">আপনার সংগৃহীত বই এখানে দেখা যাবে</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
