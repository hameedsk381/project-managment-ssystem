import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const velocityData = [
  { name: 'Cycle 1', completed: 40, planned: 45 },
  { name: 'Cycle 2', completed: 50, planned: 50 },
  { name: 'Cycle 3', completed: 35, planned: 40 },
  { name: 'Cycle 4', completed: 60, planned: 55 },
];

const burnDownData = [
  { day: 'Mon', remaining: 100 },
  { day: 'Tue', remaining: 80 },
  { day: 'Wed', remaining: 65 },
  { day: 'Thu', remaining: 40 },
  { day: 'Fri', remaining: 20 },
];

export default function Workspace() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Workspace Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="text-sm text-muted-foreground mb-1">Total Projects</div>
          <div className="text-3xl font-bold text-foreground">12</div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="text-sm text-muted-foreground mb-1">Active Issues</div>
          <div className="text-3xl font-bold text-foreground">34</div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="text-sm text-muted-foreground mb-1">Completed This Week</div>
          <div className="text-3xl font-bold text-green-500">28</div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="text-sm text-muted-foreground mb-1">Active Cycles</div>
          <div className="text-3xl font-bold text-foreground">3</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Velocity Chart */}
        <div className="p-6 bg-secondary/30 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Team Velocity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Bar dataKey="planned" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Burn Down Chart */}
        <div className="p-6 bg-secondary/30 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Sprint Burn-down</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={burnDownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Line type="monotone" dataKey="remaining" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
