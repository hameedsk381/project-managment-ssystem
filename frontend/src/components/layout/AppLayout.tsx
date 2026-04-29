import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Sparkles, X, MessageSquare, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AppLayout() {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 md:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 z-50 transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-500 ease-in-out`}>
        <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
      </div>

      <main className="flex-1 flex flex-col min-w-0 relative bg-background">
        <TopNav 
          onToggleAIPanel={() => setIsAIPanelOpen(!isAIPanelOpen)} 
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <div className="flex-1 overflow-auto relative">
          <Outlet />
        </div>

        {/* AI Assistant Side Panel */}
        <AnimatePresence>
          {isAIPanelOpen && (
            <motion.div 
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="absolute right-0 top-14 bottom-0 w-[400px] bg-background vercel-border border-l-0 shadow-2xl flex flex-col z-50"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-background">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-foreground text-background rounded-lg">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight text-foreground uppercase tracking-[0.2em]">AI Intelligence</h3>
                </div>
                <button onClick={() => setIsAIPanelOpen(false)} className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 p-8 overflow-y-auto space-y-8">
                <div className="p-5 bg-background vercel-card rounded-xl text-sm text-foreground leading-relaxed tracking-tight border-l-4 border-develop">
                  <p>Hello! I'm your <span className="font-bold">AI Native Core</span>. I've analyzed your current workspace. You have <span className="text-ship font-bold">3 critical bottlenecks</span> in Sprint 4. Would you like me to optimize the workload?</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Autonomous Actions</p>
                  <AIActionItem icon={<Command size={14} />} title="Analyze project risk" description="Identify items delayed by 3+ days" color="develop" />
                  <AIActionItem icon={<Command size={14} />} title="Detect delivery blockers" description="Find dependencies causing friction" color="preview" />
                  <AIActionItem icon={<Command size={14} />} title="Balance team workload" description="Reassign issues based on velocity" color="ship" />
                </div>
              </div>
              
              <div className="p-6 border-t border-border bg-background">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask AI... (Enter to send)" 
                    className="w-full pl-4 pr-12 py-3 bg-background vercel-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-foreground/5 text-foreground transition-all placeholder:text-muted-foreground/50 font-medium"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-foreground text-background p-1.5 rounded-lg hover:opacity-90 transition-all">
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function AIActionItem({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: 'develop' | 'preview' | 'ship' }) {
  const colors = {
    develop: 'hover:border-develop/30 hover:bg-develop/5',
    preview: 'hover:border-preview/30 hover:bg-preview/5',
    ship: 'hover:border-ship/30 hover:bg-ship/5'
  };

  return (
    <button className={`w-full text-left p-4 bg-background vercel-border rounded-xl transition-all group ${colors[color]}`}>
      <div className="flex items-center space-x-3 mb-1">
        <div className="text-muted-foreground group-hover:text-foreground transition-colors">
          {icon}
        </div>
        <span className="text-xs font-bold text-foreground tracking-tight">{title}</span>
      </div>
      <p className="text-[11px] text-muted-foreground ml-7 leading-normal">{description}</p>
    </button>
  );
}
