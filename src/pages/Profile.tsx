import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Bookmark, Trash2, Moon, Sun } from "lucide-react";
import { getLibrary, getAllProgress } from "@/lib/offlineStorage";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBooks: 0,
    downloadedBooks: 0,
    readingBooks: 0,
    totalBookmarks: 0
  });

  useEffect(() => {
    const library = getLibrary();
    const progress = getAllProgress();
    
    setStats({
      totalBooks: library.length,
      downloadedBooks: library.filter(b => b.downloaded).length,
      readingBooks: progress.length,
      totalBookmarks: progress.reduce((sum, p) => sum + (p.bookmarks?.length || 0), 0)
    });
  }, []);

  const handleClearCache = async () => {
    if (confirm('আপনি কি সব ক্যাশ ডেটা মুছতে চান?')) {
      try {
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        localStorage.clear();
        toast.success('ক্যাশ সাফল্যের সাথে মুছে ফেলা হয়েছে');
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        toast.error('ক্যাশ মুছতে সমস্যা হয়েছে');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">প্রোফাইল ও সেটিংস</h1>
          <p className="text-sm text-muted-foreground">আপনার পড়ার পরিসংখ্যান</p>
        </div>

        {/* Stats Cards - Clickable */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate('/library')}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BookOpen className="mb-2 text-primary" size={32} />
              <div className="text-2xl font-bold">{stats.totalBooks}</div>
              <div className="text-xs text-muted-foreground">লাইব্রেরি</div>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate('/downloads')}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Download className="mb-2 text-primary" size={32} />
              <div className="text-2xl font-bold">{stats.downloadedBooks}</div>
              <div className="text-xs text-muted-foreground">ডাউনলোড</div>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate('/reading-history')}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BookOpen className="mb-2 text-primary" size={32} />
              <div className="text-2xl font-bold">{stats.readingBooks}</div>
              <div className="text-xs text-muted-foreground">পড়ছেন</div>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate('/bookmarks')}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Bookmark className="mb-2 text-primary" size={32} />
              <div className="text-2xl font-bold">{stats.totalBookmarks}</div>
              <div className="text-xs text-muted-foreground">বুকমার্ক</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>অ্যাপ সেটিংস</CardTitle>
              <CardDescription>আপনার পছন্দ অনুযায়ী কাস্টমাইজ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon size={20} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium">ডার্ক মোড</div>
                    <div className="text-xs text-muted-foreground">সবসময় সক্রিয়</div>
                  </div>
                </div>
                <Sun size={20} className="text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>স্টোরেজ</CardTitle>
              <CardDescription>ডেটা ও ক্যাশ ম্যানেজ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleClearCache}
              >
                <Trash2 className="mr-2" size={18} />
                সব ক্যাশ মুছুন
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                এটি সব অফলাইন ডেটা এবং পড়ার অগ্রগতি মুছে দেবে
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>সম্পর্কে</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">অ্যাপ নাম</span>
                <span className="font-medium">Muslim Corner</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">সংস্করণ</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ধরন</span>
                <span className="font-medium">ফ্রি পিডিএফ বই</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
