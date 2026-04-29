import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  CheckSquare, 
  Folder, 
  Users, 
  Settings, 
  X,
  Command,
  FileText,
  Plus
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(); // This would be toggle in the parent
      }
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-background border border-border shadow-2xl rounded-2xl overflow-hidden z-[100]"
        >
          <div className="flex items-center px-4 py-3 border-b border-border bg-secondary/20">
            <Search className="text-muted-foreground mr-3" size={20} />
            <input 
              autoFocus
              type="text" 
              placeholder="Search anything... (Issues, Projects, Commands)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-foreground text-lg focus:outline-none placeholder:text-muted-foreground/50"
            />
            <div className="flex items-center space-x-1.5 px-2 py-1 bg-secondary rounded-md border border-border">
              <Command size={12} className="text-muted-foreground" />
              <span className="text-[10px] font-bold text-muted-foreground">K</span>
            </div>
            <button onClick={onClose} className="ml-4 p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {!query ? (
              <div className="space-y-4 py-4 px-2">
                <section>
                  <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">Quick Commands</h3>
                  <div className="grid grid-cols-2 gap-1">
                    <CommandItem icon={<Plus size={16} />} label="Create New Issue" shortcut="C" />
                    <CommandItem icon={<Folder size={16} />} label="Go to Projects" shortcut="P" />
                    <CommandItem icon={<Users size={16} />} label="Manage Team" shortcut="T" />
                    <CommandItem icon={<Settings size={16} />} label="Workspace Settings" shortcut="S" />
                  </div>
                </section>
                
                <section>
                  <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">Recent Searches</h3>
                  <div className="space-y-1">
                    <RecentItem icon={<CheckSquare size={16} />} label="ISS-124: Update login styles" />
                    <RecentItem icon={<Folder size={16} />} label="Apollo Platform" />
                    <RecentItem icon={<FileText size={16} />} label="Product Roadmap Q4" />
                  </div>
                </section>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p className="text-sm">No results found for "<span className="text-foreground font-bold">{query}</span>"</p>
              </div>
            )}
          </div>

          <div className="px-4 py-2 bg-secondary/10 border-t border-border flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <div className="px-1.5 py-0.5 bg-secondary rounded border border-border text-[10px] font-bold">↑↓</div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Navigate</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="px-1.5 py-0.5 bg-secondary rounded border border-border text-[10px] font-bold">ENTER</div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Select</span>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">AI Powered Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function CommandItem({ icon, label, shortcut }: { icon: React.ReactNode; label: string; shortcut: string }) {
  return (
    <button className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-secondary transition-all group text-left">
      <div className="flex items-center space-x-3">
        <div className="p-1.5 bg-secondary group-hover:bg-background rounded-lg text-muted-foreground group-hover:text-blue-500 transition-colors">
          {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="px-1.5 py-0.5 bg-secondary rounded border border-border text-[10px] font-bold text-muted-foreground group-hover:border-blue-500/30 transition-colors">
        {shortcut}
      </div>
    </button>
  );
}

function RecentItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-all text-left group">
      <div className="text-muted-foreground group-hover:text-blue-500 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground truncate">{label}</span>
    </button>
  );
}


