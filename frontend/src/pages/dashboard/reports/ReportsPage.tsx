import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  ChevronRight,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieIcon,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const taskData = [
  { name: 'Mon', completed: 12, backlog: 4 },
  { name: 'Tue', completed: 18, backlog: 6 },
  { name: 'Wed', completed: 15, backlog: 8 },
  { name: 'Thu', completed: 25, backlog: 5 },
  { name: 'Fri', completed: 22, backlog: 3 },
  { name: 'Sat', completed: 8, backlog: 2 },
  { name: 'Sun', completed: 5, backlog: 1 },
];

const distributionData = [
  { name: 'Feature', value: 45, color: '#3b82f6' },
  { name: 'Bug', value: 25, color: '#ef4444' },
  { name: 'Task', value: 20, color: '#10b981' },
  { name: 'Refactor', value: 10, color: '#8b5cf6' },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground mb-1">
              <span>Workspace</span>
              <ChevronRight size={12} />
              <span className="text-foreground">Reports</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Analytics & Reports</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors">
              <FileSpreadsheet size={16} />
              <span>Export CSV</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Download size={16} />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-secondary/30 border border-transparent hover:border-border rounded-lg text-xs font-medium transition-all">
            <Calendar size={14} />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-secondary/30 border border-transparent hover:border-border rounded-lg text-xs font-medium transition-all">
            <Filter size={14} />
            <span>All Projects</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ReportStat label="Throughput" value="124" subValue="+12%" icon={<TrendingUp />} trend="up" />
          <ReportStat label="Avg. Cycle Time" value="4.2d" subValue="-0.5d" icon={<Activity />} trend="up" />
          <ReportStat label="Bugs Reported" value="18" subValue="+2" icon={<Activity />} trend="down" />
          <ReportStat label="Deployment Freq" value="8/wk" subValue="+1" icon={<BarChart2 />} trend="up" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 p-6 bg-secondary/30 rounded-xl border border-border h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-foreground">Task Completion Velocity</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/20" />
                  <span className="text-xs text-muted-foreground">Backlog</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={taskData}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="completed" stroke="#3b82f6" fillOpacity={1} fill="url(#colorComp)" strokeWidth={2} />
                  <Area type="monotone" dataKey="backlog" stroke="#3b82f6" strokeDasharray="5 5" fill="transparent" strokeWidth={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="p-6 bg-secondary/30 rounded-xl border border-border flex flex-col">
            <h2 className="text-lg font-bold text-foreground mb-8">Work Distribution</h2>
            <div className="flex-1 h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Allocated</span>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {distributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportStat({ label, value, subValue, icon, trend }: { label: string; value: string; subValue: string; icon: React.ReactNode; trend: 'up' | 'down' }) {
  return (
    <div className="p-6 bg-secondary/30 rounded-xl border border-border">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="p-1.5 bg-background border border-border rounded-lg text-muted-foreground">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className={`text-xs flex items-center font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
          {subValue}
        </div>
      </div>
    </div>
  );
}
