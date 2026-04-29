import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Clock, 
  Users, 
  Bell, 
  BarChart2, 
  Settings,
  BookOpen,
  Flag,
  Briefcase,
  MessageSquare,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard/workspace', icon: LayoutDashboard },
  { name: 'Projects', path: '/dashboard/projects', icon: CheckSquare },
  { name: 'My Issues', path: '/dashboard/issues/my', icon: Clock },
  { name: 'Teams', path: '/dashboard/teams', icon: Users },
  { name: 'Goals', path: '/dashboard/goals', icon: Flag },
  { name: 'Portfolio', path: '/dashboard/portfolio', icon: Briefcase },
  { name: 'Collaboration', path: '/dashboard/collaboration', icon: MessageSquare },
  { name: 'Wiki', path: '/dashboard/wiki', icon: BookOpen },
  { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
  { name: 'Reports', path: '/dashboard/reports', icon: BarChart2 },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 vercel-border bg-background flex-col flex h-full">
      <div className="h-14 flex items-center px-4 border-b border-border justify-between bg-background">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-foreground rounded-md mr-2 flex items-center justify-center shrink-0">
            <span className="text-background font-bold text-[10px]">AI</span>
          </div>
          <span className="font-bold tracking-tighter text-foreground text-sm">AI Native PM</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 hover:bg-secondary rounded text-muted-foreground">
            <X size={18} />
          </button>
        )}
      </div>
      
      <div className="px-3 py-4 flex flex-col space-y-6 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
            AI Management System
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'text-foreground font-semibold' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span className="relative z-10 flex items-center tracking-tight">
                  <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`} />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
