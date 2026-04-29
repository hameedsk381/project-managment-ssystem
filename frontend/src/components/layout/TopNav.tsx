import { useState, useEffect } from 'react';
import { useThemeStore } from '../../store/theme';
import { useAuthStore } from '../../store/auth';
import { Moon, Sun, Menu, Bell, Search, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import SearchModal from '../dashboard/SearchModal';
import UserDropdown from '../dashboard/UserDropdown';
import NotificationDropdown from '../dashboard/NotificationDropdown';

interface TopNavProps {
  onToggleAIPanel: () => void;
  onToggleMobileSidebar: () => void;
}

export function TopNav({ onToggleAIPanel, onToggleMobileSidebar }: TopNavProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-14 flex items-center justify-between px-8 border-b border-border bg-background shrink-0 z-40">
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <div className="flex items-center flex-1">
        <button 
          onClick={onToggleMobileSidebar}
          className="md:hidden mr-4 text-muted-foreground hover:text-foreground p-1 hover:bg-secondary rounded transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div 
          onClick={() => setIsSearchOpen(true)}
          className="relative hidden sm:block max-w-sm w-full cursor-pointer group"
        >
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="w-full pl-9 pr-3 py-1.5 bg-background vercel-border rounded-md text-xs transition-all text-muted-foreground group-hover:bg-secondary/50 flex items-center justify-between">
            <span className="tracking-tight font-medium">Search system...</span>
            <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-secondary rounded text-[9px] font-bold tracking-widest text-muted-foreground">
              COMMAND K
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={onToggleAIPanel}
          className="px-4 py-1.5 rounded-md bg-foreground text-background text-[11px] font-bold transition-all hover:opacity-90 flex items-center space-x-2 shadow-lg shadow-foreground/5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest hidden sm:inline">Ask AI</span>
        </button>
        
        <div className="w-px h-4 bg-border mx-2 hidden sm:block"></div>
        
        <div className="relative">
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-ship rounded-full"></span>
          </button>
          <AnimatePresence>
            {isNotificationOpen && <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        <div className="relative">
          <div 
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="w-8 h-8 rounded-full vercel-border bg-background flex items-center justify-center text-[10px] font-bold text-foreground ml-2 cursor-pointer hover:bg-secondary transition-all"
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <AnimatePresence>
            {isUserDropdownOpen && <UserDropdown onClose={() => setIsUserDropdownOpen(false)} />}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
