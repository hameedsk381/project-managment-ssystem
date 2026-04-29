import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationDropdownProps {
  onClose: () => void;
}

const recentNotifications = [
  { id: '1', title: 'Sarah mentioned you', time: '2m ago', icon: <MessageSquare size={14} className="text-blue-500" /> },
  { id: '2', title: 'Task moved to Done', time: '1h ago', icon: <CheckCircle2 size={14} className="text-green-500" /> },
  { id: '3', title: 'Deadline tomorrow', time: '5h ago', icon: <Clock size={14} className="text-red-500" /> },
];

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 mt-2 w-80 bg-popover border border-border shadow-2xl rounded-xl overflow-hidden z-[100] flex flex-col"
    >
      <div className="px-4 py-3 border-b border-border bg-secondary/10 flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Notifications</h3>
        <button className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline">Mark all read</button>
      </div>

      <div className="max-h-[320px] overflow-y-auto">
        {recentNotifications.map((n) => (
          <button 
            key={n.id} 
            onClick={onClose}
            className="w-full flex items-start space-x-3 px-4 py-3 hover:bg-secondary/50 transition-all border-b border-border last:border-0 group text-left"
          >
            <div className="mt-0.5 p-1.5 bg-secondary group-hover:bg-background rounded-lg transition-colors">
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{n.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
            </div>
          </button>
        ))}
      </div>

      <Link 
        to="/dashboard/notifications" 
        onClick={onClose}
        className="px-4 py-3 text-center text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all border-t border-border flex items-center justify-center space-x-2"
      >
        <span>View all notifications</span>
        <ChevronRight size={14} />
      </Link>
    </motion.div>
  );
}
