import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  CheckSquare, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertCircle,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Calendar,
  MoreVertical,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

const velocityData = [
  { name: 'Sprint 1', completed: 24, backlog: 12 },
  { name: 'Sprint 2', completed: 32, backlog: 10 },
  { name: 'Sprint 3', completed: 28, backlog: 15 },
  { name: 'Sprint 4', completed: 40, backlog: 8 },
];

const burnDownData = [
  { name: 'Day 1', remaining: 100 },
  { name: 'Day 2', remaining: 85 },
  { name: 'Day 3', remaining: 70 },
  { name: 'Day 4', remaining: 65 },
  { name: 'Day 5', remaining: 50 },
  { name: 'Day 6', remaining: 35 },
  { name: 'Day 7', remaining: 20 },
];

export default function WorkspaceOverview() {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="px-10 py-10 border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
              <span>Platform</span>
              <ChevronRight size={10} />
              <span className="text-foreground">Overview</span>
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tighter">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 vercel-border bg-background rounded-md text-sm font-medium hover:bg-secondary transition-all">
              <Calendar size={14} />
              <span>Last 14 Days</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-foreground text-background rounded-md text-sm font-bold transition-all hover:opacity-90 shadow-lg shadow-foreground/10">
              <Sparkles size={14} />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-10 space-y-12">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard label="Total Projects" value="12" icon={<BarChart2 size={16} />} trend="+2" />
            <StatCard label="Active Issues" value="148" icon={<CheckSquare size={16} />} trend="+15" />
            <StatCard label="Completed This Week" value="42" icon={<Clock size={16} />} trend="+8" />
            <StatCard label="Active Cycles" value="4" icon={<Users size={16} />} trend="0" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Visualizations */}
            <div className="lg:col-span-2 space-y-12">
              {/* Team Velocity */}
              <div className="p-8 bg-background rounded-xl vercel-card h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Team Velocity</h2>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-foreground" />
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-muted" />
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Backlog</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={velocityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: 'var(--muted-foreground)', fontWeight: 700 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{ fill: 'var(--muted-foreground)', fontWeight: 700 }} />
                      <Tooltip 
                        cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                        contentStyle={{ backgroundColor: 'var(--background)', border: 'none', borderRadius: '8px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.08)' }}
                      />
                      <Bar dataKey="completed" fill="var(--foreground)" radius={[2, 2, 0, 0]} barSize={32} />
                      <Bar dataKey="backlog" fill="var(--muted)" radius={[2, 2, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sprint Burn-down */}
              <div className="p-8 bg-background rounded-xl vercel-card h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Sprint Burn-down</h2>
                  <div className="text-[10px] font-bold text-develop bg-develop/10 px-3 py-1 rounded-full uppercase tracking-widest">Alpha Q4</div>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={burnDownData}>
                      <defs>
                        <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.05}/>
                          <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: 'var(--muted-foreground)', fontWeight: 700 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{ fill: 'var(--muted-foreground)', fontWeight: 700 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--background)', border: 'none', borderRadius: '8px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
                      />
                      <Area type="monotone" dataKey="remaining" stroke="var(--foreground)" fillOpacity={1} fill="url(#colorBurn)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Sidebar Modules */}
            <div className="space-y-12">
              {/* AI Insights Card */}
              <div className="p-8 bg-foreground rounded-2xl text-background shadow-2xl shadow-foreground/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles size={120} />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-background/10 rounded-lg backdrop-blur-sm">
                      <Sparkles size={16} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">AI Insights</span>
                  </div>
                  <div className="space-y-5">
                    <div className="p-5 bg-background/5 rounded-xl border border-background/10 backdrop-blur-sm">
                      <h4 className="text-xs font-bold mb-2 uppercase tracking-widest text-ship">Risk Detected</h4>
                      <p className="text-sm text-background/70 leading-relaxed tracking-tight">"Apollo Platform" has 12 items delayed by 3+ days. Delivery date at risk.</p>
                    </div>
                    <div className="p-5 bg-background/5 rounded-xl border border-background/10 backdrop-blur-sm">
                      <h4 className="text-xs font-bold mb-2 uppercase tracking-widest text-develop">Efficiency Gain</h4>
                      <p className="text-sm text-background/70 leading-relaxed tracking-tight">Team velocity increased by 14% this sprint. New benchmark set.</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-background text-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-all active:scale-[0.98]">
                    Optimize Workflow
                  </button>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="p-8 bg-background rounded-xl vercel-card space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Upcoming</h2>
                  <button className="text-[10px] text-foreground font-bold uppercase tracking-widest hover:underline">View all</button>
                </div>
                <div className="space-y-3">
                  <DeadlineItem title="User Auth PR" date="Tomorrow" project="APO" priority="high" />
                  <DeadlineItem title="API Documentation" date="Oct 24" project="HER" priority="medium" />
                  <DeadlineItem title="Style Guide Sync" date="Oct 26" project="GEN" priority="low" />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-8 bg-background rounded-xl vercel-card space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Activity</h2>
                  <Activity size={14} className="text-muted-foreground" />
                </div>
                <div className="space-y-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full vercel-border bg-secondary flex items-center justify-center font-bold text-[10px] shrink-0">JD</div>
                      <div className="space-y-1">
                        <p className="text-sm text-foreground font-medium leading-snug tracking-tight">
                          John Doe closed <span className="font-bold">APO-12</span>
                        </p>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">12 mins ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: { label: string; value: string; icon: React.ReactNode; trend: string }) {
  return (
    <div className="p-8 bg-background rounded-xl vercel-card group hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="p-2.5 bg-secondary rounded-lg text-muted-foreground group-hover:text-foreground transition-colors">
          {icon}
        </div>
        <div className={`flex items-center text-[10px] font-bold tracking-widest ${trend.startsWith('+') ? 'text-develop' : 'text-muted-foreground'}`}>
          {trend !== '0' && <ArrowUpRight size={10} className="mr-1" />}
          {trend === '0' ? 'STABLE' : trend}
        </div>
      </div>
      <div className="text-4xl font-extrabold text-foreground tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
}

function DeadlineItem({ title, date, project, priority }: { title: string; date: string; project: string; priority: string }) {
  const priorityColors = {
    high: 'bg-ship',
    medium: 'bg-orange-500',
    low: 'bg-develop'
  };
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-lg vercel-border group hover:bg-secondary transition-all cursor-pointer">
      <div className="space-y-1.5">
        <h4 className="text-sm font-bold text-foreground line-clamp-1 tracking-tight">{title}</h4>
        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{project}</span>
          <div className="w-1 h-1 rounded-full bg-border" />
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest">{date}</span>
        </div>
      </div>
      <div className={`w-1.5 h-1.5 rounded-full ${priorityColors[priority as keyof typeof priorityColors]}`} />
    </div>
  );
}
