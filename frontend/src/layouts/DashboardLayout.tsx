import { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useThemeStore } from '../store/theme';
import { useAuthStore } from '../store/auth';
import { Moon, Sun, Menu, Bell, Search, Settings, Grid, CheckSquare, Clock, Sparkles, X, MessageSquare } from 'lucide-react';

export default function DashboardLayout() {
  const { theme, toggleTheme } = useThemeStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-secondary/30 flex flex-col hidden md:flex">
        <div className="h-14 flex items-center px-4 border-b border-border">
          <div className="w-6 h-6 bg-blue-600 rounded mr-2" />
          <span className="font-semibold tracking-tight text-foreground">Workspace</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 text-sm font-medium">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Workspace
          </div>
          <Link to="/workspace" className="flex items-center px-3 py-2 rounded-md hover:bg-secondary/80 text-foreground transition-colors">
            <Grid className="w-4 h-4 mr-3 text-muted-foreground" />
            Dashboard
          </Link>
          <Link to="/projects" className="flex items-center px-3 py-2 rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <CheckSquare className="w-4 h-4 mr-3" />
            Projects
          </Link>
          <a href="#" className="flex items-center px-3 py-2 rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
            <Clock className="w-4 h-4 mr-3" />
            My Issues
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-background">
          <div className="flex items-center">
            <button className="md:hidden mr-4 text-muted-foreground hover:text-foreground">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search issues, projects..." 
                className="pl-9 pr-4 py-1.5 bg-secondary/50 border border-transparent focus:border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-border w-64 transition-all text-foreground"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button 
              onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
              className="p-1.5 rounded-md text-purple-500 hover:bg-purple-500/10 transition-colors flex items-center space-x-1"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Ask AI</span>
            </button>
            <div className="w-px h-4 bg-border mx-1"></div>
            <button className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white ml-2 cursor-pointer">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-background/50">
          <Outlet />
        </div>

        {/* AI Assistant Panel */}
        {isAIPanelOpen && (
          <div className="absolute right-0 top-14 bottom-0 w-80 bg-background border-l border-border shadow-2xl flex flex-col z-40 transform transition-transform">
            <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/30">
              <div className="flex items-center space-x-2 text-purple-500">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
              </div>
              <button onClick={() => setIsAIPanelOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-secondary/50 p-3 rounded-lg text-sm text-foreground">
                <p>Hello! I'm your AI project assistant. How can I help you today?</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="text-left text-xs text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-2 rounded transition-colors border border-purple-500/20">
                  Summarize active project blockers
                </button>
                <button className="text-left text-xs text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-2 rounded transition-colors border border-purple-500/20">
                  Generate tasks for "User Profile" feature
                </button>
                <button className="text-left text-xs text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-2 rounded transition-colors border border-purple-500/20">
                  Find duplicate issues
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-border bg-background">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask AI a command..." 
                  className="w-full pl-3 pr-10 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-foreground"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
