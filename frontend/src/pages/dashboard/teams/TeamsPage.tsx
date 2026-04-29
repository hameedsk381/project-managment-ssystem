import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  ChevronRight,
  TrendingUp,
  Activity,
  Layers,
  Clock,
  PieChart as PieIcon
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const productivityData = [
  { name: 'Week 1', productivity: 65 },
  { name: 'Week 2', productivity: 78 },
  { name: 'Week 3', productivity: 72 },
  { name: 'Week 4', productivity: 85 },
];

export default function TeamsPage() {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border">
        <div>
          <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground mb-1">
            <span>Workspace</span>
            <ChevronRight size={12} />
            <span className="text-foreground">Teams</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Teams</h1>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={18} />
          <span>Create Team</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Team Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-secondary/30 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Total Members</span>
              <Users className="text-blue-500" size={18} />
            </div>
            <div className="text-3xl font-bold">24</div>
            <div className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp size={12} className="mr-1" /> +3 this month
            </div>
          </div>
          <div className="p-6 bg-secondary/30 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Team Productivity</span>
              <Activity className="text-purple-500" size={18} />
            </div>
            <div className="text-3xl font-bold">82%</div>
            <div className="text-xs text-muted-foreground mt-1">Avg. across all teams</div>
          </div>
          <div className="p-6 bg-secondary/30 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Projects Assigned</span>
              <Layers className="text-orange-500" size={18} />
            </div>
            <div className="text-3xl font-bold">12</div>
            <div className="text-xs text-muted-foreground mt-1">4 active sprints</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teams List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-foreground">All Teams</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <input 
                  type="text" 
                  placeholder="Search teams..."
                  className="pl-9 pr-3 py-1.5 bg-secondary/30 border border-transparent focus:border-border rounded-lg text-xs w-48 focus:outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <TeamCard 
                name="Frontend Engineering" 
                lead="Sarah Lee" 
                members={6} 
                projects={4} 
                workload={85} 
              />
              <TeamCard 
                name="Backend Services" 
                lead="John Doe" 
                members={8} 
                projects={5} 
                workload={62} 
              />
              <TeamCard 
                name="Product Design" 
                lead="Mike Ray" 
                members={4} 
                projects={3} 
                workload={45} 
              />
            </div>
          </div>

          {/* Productivity Chart */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Aggregate Productivity</h2>
            <div className="p-6 bg-secondary/30 rounded-xl border border-border h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="productivity" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="p-6 bg-blue-600/5 rounded-xl border border-blue-500/20">
              <h3 className="text-sm font-bold text-blue-500 mb-2 flex items-center">
                <PieIcon size={16} className="mr-2" /> Team Insights
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Frontend Engineering is currently at 85% capacity. Consider redistributing 2 tasks to the Backend team for better balance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamCard({ name, lead, members, projects, workload }: { name: string; lead: string; members: number; projects: number; workload: number }) {
  return (
    <div className="p-6 bg-background rounded-xl border border-border hover:border-blue-500/30 transition-all cursor-pointer group shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-600/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-foreground group-hover:text-blue-500 transition-colors">{name}</h3>
            <p className="text-xs text-muted-foreground">Lead: {lead}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-2 rounded-lg bg-secondary/20">
          <div className="text-sm font-bold text-foreground">{members}</div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Members</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary/20">
          <div className="text-sm font-bold text-foreground">{projects}</div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Projects</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary/20">
          <div className="text-sm font-bold text-foreground">{workload}%</div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Workload</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase text-muted-foreground">
          <span>Sprint Progress</span>
          <span>{workload}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${workload}%` }}
            className={`h-full rounded-full ${workload > 80 ? 'bg-orange-500' : 'bg-blue-500'}`} 
          />
        </div>
      </div>
    </div>
  );
}
