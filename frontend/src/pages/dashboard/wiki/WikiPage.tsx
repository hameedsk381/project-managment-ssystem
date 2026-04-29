import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Book, 
  Search, 
  Plus, 
  MoreHorizontal, 
  ChevronRight,
  Folder,
  Settings,
  Star,
  Clock,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  File,
  Users,
  LayoutGrid,
  Hash,
  Eye,
  Share2,
  ArrowUpRight
} from 'lucide-react';
import { SAMPLE_WIKI_PAGES } from '../../../utils/sampleData';

export default function WikiPage() {
  const [loading, setLoading] = useState(true);
  const [activeDoc, setActiveDoc] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredPages = (SAMPLE_WIKI_PAGES || []).filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePage = (SAMPLE_WIKI_PAGES || []).find(p => p.id === activeDoc) || SAMPLE_WIKI_PAGES[0];

  if (loading) return <WikiSkeleton />;
  if (!activePage) return <div className="p-20 text-center">No wiki pages found.</div>;

  return (
    <div className="flex h-full bg-background overflow-hidden relative">
      {/* Wiki Sidebar */}
      <div className="w-80 vercel-border border-l-0 border-y-0 bg-[#fafafa] dark:bg-black/20 flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-border bg-background">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[11px] font-extrabold text-foreground uppercase tracking-[0.2em] flex items-center space-x-3">
              <Book size={16} />
              <span>Wiki Core</span>
            </h2>
            <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground">
              <Settings size={16} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Search index..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background vercel-border rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-foreground/5"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-10">
          <section>
            <div className="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Categories</div>
            <div className="space-y-1">
              <FolderItem name="Engineering" count={12} active={activePage.category === 'Engineering'} />
              <FolderItem name="Product" count={5} active={activePage.category === 'Product'} />
              <FolderItem name="Design" count={8} active={activePage.category === 'Design'} />
            </div>
          </section>

          <section>
            <div className="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">All Documents</div>
            <div className="space-y-1">
              {filteredPages.map(doc => (
                <DocItem 
                  key={doc.id} 
                  doc={doc} 
                  active={activeDoc === doc.id} 
                  onClick={() => setActiveDoc(doc.id)} 
                />
              ))}
            </div>
          </section>
        </div>

        <div className="p-6 bg-background border-t border-border">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-foreground text-background rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-foreground/5 active:scale-95"
          >
            <Plus size={16} />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Toolbar */}
        <div className="h-16 border-b border-border flex items-center justify-between px-10 bg-background sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              <span>Knowledge</span>
              <ChevronRight size={10} />
              <span className="text-foreground">Wiki</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:inline">Revised {activePage.lastUpdated}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <Eye size={14} />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-foreground text-background text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all hover:opacity-90 shadow-lg shadow-foreground/5">
              <Edit2 size={14} />
              <span>Edit</span>
            </button>
            <div className="w-px h-4 bg-border"></div>
            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground"><MoreHorizontal size={18} /></button>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-12 py-16 lg:px-32 max-w-6xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              <StatItem label="Total Pages" value="24" icon={<File size={14} />} />
              <StatItem label="Active" value="5" icon={<Clock size={14} />} />
              <StatItem label="Drafts" value="3" icon={<Edit2 size={14} />} />
              <StatItem label="Shared" value="12" icon={<Users size={14} />} />
            </div>

            {/* Article */}
            <article className="space-y-16 pb-32">
              <header className="space-y-8">
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-[0.2em] border ${
                    activePage.status === 'published' ? 'bg-develop/5 text-develop border-develop/20' : 'bg-ship/5 text-ship border-ship/20'
                  }`}>
                    {activePage.status}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{activePage.category}</span>
                </div>
                
                <h1 className="text-6xl font-extrabold text-foreground tracking-tighter leading-[0.95]">
                  {activePage.title}
                </h1>
                
                <div className="flex items-center space-x-6 pt-10 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full vercel-border bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                      {activePage.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-foreground uppercase tracking-widest">{activePage.author}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Maintainer</p>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-border"></div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
                    Synchronized {activePage.lastUpdated}
                  </div>
                </div>
              </header>

              {/* Body */}
              <div className="space-y-10">
                <p className="text-2xl text-foreground font-medium leading-relaxed tracking-tight border-l-4 border-foreground pl-8">
                  {activePage.description}
                </p>
                
                <div className="p-12 bg-background vercel-border border-dashed rounded-3xl flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-4 bg-foreground text-background rounded-2xl">
                    <Edit2 size={32} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-foreground tracking-tight">AI Integrated Editor</h4>
                    <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                      This module is ready for AI-assisted writing. Start typing to see suggestions based on your project context and linked issues.
                    </p>
                  </div>
                  <button className="px-10 py-3 bg-foreground text-background rounded-xl text-xs font-bold uppercase tracking-widest shadow-2xl shadow-foreground/10 hover:opacity-90 transition-all active:scale-95">
                    Activate Workspace
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                  <QuickLink icon={<LayoutGrid size={18} />} title="Platform Assets" description="Core UI components and tokens" />
                  <QuickLink icon={<FileText size={18} />} title="API Protocol" description="Endpoint specifications and auth" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CreateWikiModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-background rounded-2xl vercel-border group hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3 text-muted-foreground mb-3 group-hover:text-foreground transition-colors">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="text-3xl font-extrabold text-foreground tracking-tighter">{value}</div>
    </div>
  );
}

function DocItem({ doc, active, onClick }: { doc: any; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all group ${
        active 
          ? 'bg-foreground text-background shadow-2xl shadow-foreground/5' 
          : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
      }`}
    >
      <div className="flex items-center space-x-3">
        <FileText size={14} />
        <span className="truncate w-40 text-left">{doc.title}</span>
      </div>
      <ChevronRight size={14} className={`transition-transform ${active ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
    </button>
  );
}

function FolderItem({ name, count, active }: { name: string; count: number; active?: boolean }) {
  const [isOpen, setIsOpen] = useState(active);
  return (
    <div className="space-y-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all group ${
          active ? 'text-foreground' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
        }`}
      >
        <div className="flex items-center space-x-3">
          <ChevronRight size={12} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          <Folder size={14} className={active ? 'text-foreground' : ''} />
          <span>{name}</span>
        </div>
        <span className="text-[9px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground">{count}</span>
      </button>
      {isOpen && (
        <div className="ml-8 border-l border-border/50 pl-3 space-y-1 mt-1">
          <button className="w-full flex items-center px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">Overview</button>
          <button className="w-full flex items-center px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">Specifications</button>
        </div>
      )}
    </div>
  );
}

function QuickLink({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-background rounded-2xl vercel-border hover:shadow-2xl transition-all cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-secondary rounded-lg text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all">
          {icon}
        </div>
        <ArrowUpRight size={16} className="text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function WikiSkeleton() {
  return (
    <div className="flex h-full animate-pulse bg-background">
      <div className="w-80 border-r border-border p-10 space-y-12">
        <div className="h-10 w-48 bg-secondary rounded-lg"></div>
        <div className="h-12 w-full bg-secondary rounded-lg"></div>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 w-full bg-secondary rounded-lg"></div>)}
        </div>
      </div>
      <div className="flex-1 p-24 space-y-16">
        <div className="h-6 w-64 bg-secondary rounded-lg"></div>
        <div className="h-32 w-full bg-secondary rounded-2xl"></div>
        <div className="space-y-6">
          <div className="h-6 w-full bg-secondary rounded-lg"></div>
          <div className="h-6 w-full bg-secondary rounded-lg"></div>
          <div className="h-6 w-3/4 bg-secondary rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

function CreateWikiModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-background vercel-border shadow-2xl rounded-3xl overflow-hidden">
        <div className="px-10 py-8 border-b border-border flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">New Article</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground"><X size={24} /></button>
        </div>
        <div className="p-10 space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Article Title</label>
            <input type="text" placeholder="e.g. System Architecture v2" className="w-full px-5 py-4 bg-background vercel-border rounded-xl focus:outline-none text-sm font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Category</label>
            <select className="w-full px-5 py-4 bg-background vercel-border rounded-xl focus:outline-none text-xs font-bold uppercase tracking-widest">
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
            </select>
          </div>
        </div>
        <div className="px-10 py-8 border-t border-border bg-secondary/20 flex justify-end space-x-6">
          <button onClick={onClose} className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors">Discard</button>
          <button className="px-10 py-3 bg-foreground text-background rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-2xl shadow-foreground/10 hover:opacity-90">Publish</button>
        </div>
      </motion.div>
    </div>
  );
}
