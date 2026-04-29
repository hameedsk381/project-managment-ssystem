import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Briefcase, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Users,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Completed', value: 40, color: '#10b981' },
  { name: 'On Track', value: 35, color: '#3b82f6' },
  { name: 'At Risk', value: 15, color: '#f59e0b' },
  { name: 'Delayed', value: 10, color: '#ef4444' },
];

export default function PortfolioDashboard() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-background">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Portfolio Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Cross-project health and strategic alignment.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors">Export Report</button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">Add Portfolio</button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Portfolios" value="4" icon={<Briefcase />} color="blue" />
        <StatCard label="Total Budget" value="$1.2M" icon={<TrendingUp />} color="green" />
        <StatCard label="Critical Issues" value="12" icon={<AlertTriangle />} color="red" />
        <StatCard label="Active Members" value="84" icon={<Users />} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Health Chart */}
        <div className="lg:col-span-1 p-6 bg-secondary/30 rounded-xl border border-border shadow-sm">
          <h2 className="text-lg font-bold mb-6 text-foreground">Project Health</h2>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-foreground">85%</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Health Score</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-foreground px-1">Active Portfolios</h2>
          <div className="space-y-4">
            <PortfolioItem 
              name="Engineering Core" 
              projects={8} 
              progress={72} 
              status="on-track" 
              owner="Sarah Lee"
            />
            <PortfolioItem 
              name="Design Systems" 
              projects={3} 
              progress={45} 
              status="delayed" 
              owner="John Doe"
            />
            <PortfolioItem 
              name="Marketing Launch Q4" 
              projects={5} 
              progress={90} 
              status="completed" 
              owner="Mike Ray"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  const colors = {
    blue: 'text-blue-500 bg-blue-500/10',
    green: 'text-green-500 bg-green-500/10',
    red: 'text-red-500 bg-red-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
  };
  return (
    <div className="p-6 bg-secondary/30 rounded-xl border border-border shadow-sm">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colors[color as keyof typeof colors]}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

function PortfolioItem({ name, projects, progress, status, owner }: { name: string; projects: number; progress: number; status: string; owner: string }) {
  const statusStyles = {
    'on-track': 'bg-blue-500/10 text-blue-500',
    'delayed': 'bg-red-500/10 text-red-500',
    'completed': 'bg-green-500/10 text-green-500',
  };
  
  return (
    <div className="p-5 bg-background rounded-xl border border-border group hover:border-blue-500/30 transition-all cursor-pointer shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="font-bold text-foreground group-hover:text-blue-500 transition-colors">{name}</h3>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-0.5">
              <span>{projects} Projects</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Lead: {owner}</span>
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${statusStyles[status as keyof typeof statusStyles]}`}>
          {status}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-muted-foreground">Portfolio Progress</span>
          <span className="font-bold text-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full rounded-full ${status === 'delayed' ? 'bg-red-500' : 'bg-blue-500'}`} 
          />
        </div>
      </div>
    </div>
  );
}
