import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  MoreVertical,
  Search,
  Filter,
  Check
} from 'lucide-react';

const mockNotifications = [
  {
    id: '1',
    type: 'mention',
    title: 'Sarah Lee mentioned you',
    description: 'Sarah mentioned you in a comment on "Implement user authentication flow"',
    time: '2 minutes ago',
    isRead: false,
    project: 'Apollo Platform'
  },
  {
    id: '2',
    type: 'status',
    title: 'Task status updated',
    description: 'John Doe moved "Design system updates" to "Review"',
    time: '1 hour ago',
    isRead: false,
    project: 'Apollo Platform'
  },
  {
    id: '3',
    type: 'due_date',
    title: 'Upcoming Deadline',
    description: '"Fix sidebar overflow" is due in 24 hours',
    time: '5 hours ago',
    isRead: true,
    project: 'Apollo Platform'
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.isRead);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground mb-1">
              <span>Workspace</span>
              <ChevronRight size={12} />
              <span className="text-foreground">Notifications</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Notification Center</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors"
            >
              <Check size={16} />
              <span>Mark all as read</span>
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('all')}
              className={`pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'all' ? 'border-blue-500 text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              All Notifications
            </button>
            <button 
              onClick={() => setActiveTab('unread')}
              className={`pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'unread' ? 'border-blue-500 text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              Unread
              <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-[10px] text-white rounded-full font-bold">
                {notifications.filter(n => !n.isRead).length}
              </span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <input 
                type="text" 
                placeholder="Search notifications..."
                className="pl-9 pr-3 py-1.5 bg-secondary/30 border border-transparent focus:border-border rounded-lg text-xs w-48 focus:outline-none transition-all"
              />
            </div>
            <button className="p-1.5 hover:bg-secondary rounded-lg text-muted-foreground">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-secondary/5">
        <div className="max-w-4xl mx-auto p-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center text-muted-foreground">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">All caught up!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">You don't have any unread notifications at the moment.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: any }) {
  const icons = {
    mention: <MessageSquare className="text-blue-500" size={18} />,
    status: <CheckCircle2 className="text-green-500" size={18} />,
    due_date: <Clock className="text-red-500" size={18} />,
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-6 bg-background rounded-xl border border-border transition-all hover:shadow-md cursor-pointer group relative overflow-hidden ${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-secondary/30 rounded-lg shrink-0">
          {icons[notification.type as keyof typeof icons] || <Bell size={18} />}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">{notification.title}</h3>
            <span className="text-xs text-muted-foreground">{notification.time}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{notification.description}</p>
          <div className="pt-2 flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              {notification.project}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
              {notification.type.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 hover:bg-secondary rounded text-muted-foreground">
            <Check size={16} />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded text-muted-foreground">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
