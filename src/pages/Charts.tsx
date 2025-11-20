import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { TrendingUp } from "lucide-react";

export default function Charts() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <TrendingUp className="mx-auto mb-4 text-primary" size={64} />
          <h1 className="mb-2 text-2xl font-bold">চার্টস</h1>
          <p className="text-muted-foreground">শীঘ্রই আসছে...</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
