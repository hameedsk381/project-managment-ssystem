import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  ChevronRight, 
  MoreVertical,
  Layers,
  Users,
  Flag,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  X,
  ArrowUpRight
} from 'lucide-react';
import { SAMPLE_GOALS } from '../../../utils/sampleData';

export default function GoalsPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredGoals = SAMPLE_GOALS.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <GoalsSkeleton />;

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="px-10 py-10 border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
                <span>Platform</span>
                <ChevronRight size={10} />
                <span className="text-foreground">Goals</span>
              </div>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tighter">Strategic Goals</h1>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-8 py-2.5 bg-foreground text-background rounded-md text-sm font-bold transition-all hover:opacity-90 shadow-lg shadow-foreground/5 active:scale-95"
            >
              <Plus size={18} />
              <span>New Goal</span>
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search goals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background vercel-border rounded-lg text-sm focus:outline-none transition-all placeholder:text-muted-foreground/40 font-medium"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={14} className="text-muted-foreground" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-background vercel-border rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="on_track">On Track</option>
                <option value="at_risk">At Risk</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-10 space-y-12">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SummaryCard label="Total Goals" value={SAMPLE_GOALS.length} icon={<Target size={16} />} trend="active" />
            <SummaryCard label="On Track" value={SAMPLE_GOALS.filter(g => g.status === 'on_track').length} icon={<TrendingUp size={16} />} trend="success" />
            <SummaryCard label="At Risk" value={SAMPLE_GOALS.filter(g => g.status === 'at_risk').length} icon={<AlertCircle size={16} />} trend="warning" />
            <SummaryCard label="Completed" value={SAMPLE_GOALS.filter(g => g.progress === 100).length} icon={<CheckCircle2 size={16} />} trend="info" />
          </div>

          {/* Goals Grid */}
          <div className="space-y-6">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))
            ) : (
              <EmptyState 
                title="No goals found" 
                description="Try adjusting your search or filters to find what you're looking for."
              />
            )}
          </div>
        </div>
      </div>

      {/* Create Goal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CreateGoalModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryCard({ label, value, icon, trend }: { label: string; value: number; icon: React.ReactNode; trend: string }) {
  const trendColors: Record<string, string> = {
    success: 'text-develop',
    warning: 'text-ship',
    info: 'text-preview',
    active: 'text-foreground',
  };

  return (
    <div className="p-8 bg-background rounded-xl vercel-card group hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="p-2.5 bg-secondary rounded-lg text-muted-foreground group-hover:text-foreground transition-colors">
          {icon}
        </div>
        <div className={`text-[10px] font-bold tracking-widest uppercase ${trendColors[trend]}`}>
          {trend}
        </div>
      </div>
      <div className="text-4xl font-extrabold text-foreground tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
}

function GoalCard({ goal }: { goal: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const statusColors: Record<string, string> = {
    on_track: 'text-develop bg-develop/5 border-develop/20',
    at_risk: 'text-ship bg-ship/5 border-ship/20',
    completed: 'text-preview bg-preview/5 border-preview/20',
  };

  return (
    <div className="bg-background rounded-xl vercel-card overflow-hidden group transition-all duration-300">
      <div 
        className="p-8 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-6 flex-1">
          <div className="p-4 bg-secondary rounded-xl group-hover:bg-foreground group-hover:text-background transition-all duration-500">
            <Target size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-foreground transition-colors">{goal.title}</h3>
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${statusColors[goal.status] || ''}`}>
                {goal.status.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full vercel-border bg-secondary flex items-center justify-center text-[10px] font-bold">{goal.owner.charAt(0)}</div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{goal.owner}</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                <Calendar size={12} />
                <span>{goal.startDate} — {goal.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-12">
          <div className="w-56">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Achievement</span>
              <span className="text-sm font-extrabold text-foreground">{goal.progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                className={`h-full rounded-full ${goal.status === 'at_risk' ? 'bg-ship' : 'bg-foreground'}`}
              />
            </div>
          </div>
          <div className={`p-2 rounded-lg transition-all ${isOpen ? 'rotate-90 bg-secondary' : 'group-hover:bg-secondary'}`}>
            <ChevronRight size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border bg-[#fafafa] dark:bg-black/20"
          >
            <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center">
                  <Flag size={12} className="mr-3" />
                  Key Results
                </h4>
                <div className="space-y-3">
                  {goal.keyResults.map((kr: any) => (
                    <div key={kr.id} className="p-5 bg-background vercel-border rounded-xl flex items-center justify-between hover:shadow-lg transition-all">
                      <div className="flex-1 min-w-0 mr-6">
                        <p className="text-sm font-bold text-foreground mb-3">{kr.title}</p>
                        <div className="w-full bg-secondary rounded-full h-1 overflow-hidden">
                          <div 
                            className="bg-develop h-full" 
                            style={{ width: `${(kr.current / kr.target) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-foreground">{kr.current}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">/ {kr.target} {kr.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center">
                  <Layers size={12} className="mr-3" />
                  Associated Initiatives
                </h4>
                <div className="flex flex-wrap gap-3">
                  {goal.projects.map((project: string) => (
                    <div key={project} className="px-4 py-2 bg-background vercel-border rounded-lg text-[11px] font-bold text-foreground uppercase tracking-widest flex items-center hover:bg-secondary transition-all cursor-pointer">
                      <div className="w-1.5 h-1.5 rounded-full bg-develop mr-3" />
                      {project}
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-border mt-8">
                  <button className="text-[11px] font-bold text-foreground uppercase tracking-widest hover:underline flex items-center">
                    <span>View full alignment map</span>
                    <ArrowUpRight size={14} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CreateGoalModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-background vercel-border shadow-2xl rounded-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Create New Goal</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Goal Title</label>
            <input type="text" placeholder="e.g. Expand into Enterprise sector" className="w-full px-4 py-3 bg-background vercel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/5 transition-all text-sm font-medium" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Owner</label>
              <select className="w-full px-4 py-3 bg-background vercel-border rounded-xl focus:outline-none text-xs font-bold uppercase tracking-widest">
                <option>Product Team</option>
                <option>Engineering</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Target Date</label>
              <input type="date" className="w-full px-4 py-3 bg-background vercel-border rounded-xl focus:outline-none text-sm font-medium" />
            </div>
          </div>
        </div>
        <div className="px-8 py-6 border-t border-border bg-secondary/20 flex justify-end space-x-4">
          <button onClick={onClose} className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground">Cancel</button>
          <button className="px-8 py-2.5 bg-foreground text-background rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-foreground/5 hover:opacity-90">Create Goal</button>
        </div>
      </motion.div>
    </div>
  );
}

function GoalsSkeleton() {
  return (
    <div className="p-10 space-y-12 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-10 w-64 bg-secondary rounded-lg"></div>
        <div className="h-12 w-40 bg-secondary rounded-lg"></div>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-secondary rounded-xl"></div>)}
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map(i => <div key={i} className="h-28 bg-secondary rounded-xl"></div>)}
      </div>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center bg-background rounded-2xl vercel-border border-dashed">
      <div className="p-8 bg-secondary rounded-full mb-6">
        <Target size={48} className="text-muted-foreground/20" />
      </div>
      <h3 className="text-xl font-bold text-foreground tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mt-3">{description}</p>
    </div>
  );
}
