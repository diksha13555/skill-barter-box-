import { useState, useRef } from 'react'; // <-- 1. ADDED useRef
import { Search, Bell, Calendar, Trophy, FileText, Loader2 } from 'lucide-react'; // <-- 2. ADDED FileText & Loader2
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Removed 'Link' as it's no longer needed for this button

interface NavigationProps {
  onAuthClick: () => void;
  onScoreboardClick: () => void;
  onCalendarClick: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ onAuthClick, onScoreboardClick, onCalendarClick, isAuthenticated, onLogout }: NavigationProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- 3. ADDED STATE & REF FOR FILE UPLOAD ---
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 4. This function triggers when the hidden file input is clicked
  const handleResumeClick = () => {
    fileInputRef.current?.click();
  };

  // 5. This function runs when a file is selected
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("File selected:", file.name);
      setIsUploading(true);

      // --- TODO: REPLACE THIS WITH YOUR REAL UPLOAD LOGIC ---
      // Here you would use FormData and fetch/axios to send
      // 'file' to your backend API.
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating upload time
      
      alert(`Resume "${file.name}" uploaded successfully!`);
      // You can replace alert with a toast notification
      // --- END OF MOCK UPLOAD ---

      setIsUploading(false);

      // Clear the input value so the user can upload the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  // --- END OF NEW FUNCTIONS ---

  return (
    <> {/* 6. Use a Fragment to hold the nav and the hidden input */}
      {/* 7. ADDED HIDDEN FILE INPUT */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-neon-orange/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-neon-orange flex items-center justify-center font-bold text-purple-dark">
                SB
              </div>
              <span className="text-xl font-bold text-neon-orange hidden sm:inline">
                Skill Barter Box
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for people or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-purple-medium/50 border-purple-light focus:border-neon-orange transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onScoreboardClick}
                className="hover:bg-purple-light hover:text-neon-orange transition-colors"
                title="Global Scoreboard"
              >
                <Trophy className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-light hover:text-neon-orange transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-orange rounded-full"></span>
              </Button>

              {isAuthenticated && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onCalendarClick}
                    className="hover:bg-purple-light hover:text-neon-orange transition-colors"
                    title="Schedule Session"
                  >
                    <Calendar className="w-5 h-5" />
                  </Button>
                  
                  {/* --- 8. MODIFIED RESUME BUTTON --- */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-purple-light hover:text-neon-orange transition-colors"
                    title="Upload Resume"
                    onClick={handleResumeClick} // <-- Triggers file input
                    disabled={isUploading} // <-- Disables button while uploading
                  >
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin" /> // <-- Shows spinner
                    ) : (
                      <FileText className="w-5 h-5" /> // <-- Shows file icon
                    )}
                  </Button>
                  {/* --- END OF MODIFIED BUTTON --- */}
                </>
              )}
              
              {isAuthenticated ? (
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-purple-dark transition-all"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={onAuthClick}
                  className="bg-neon-orange hover:bg-neon-orange/90 text-purple-dark font-semibold glow-orange"
                >
                  Join Now - Its Free
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;