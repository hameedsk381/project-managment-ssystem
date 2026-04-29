import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  Filter,
  Search,
  ChevronDown,
  AlertCircle,
  Clock,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { Issue, IssueState, IssuePriority } from '../../../types/issue';

const COLUMNS: { id: IssueState; title: string; color: string }[] = [
  { id: 'backlog', title: 'Backlog', color: 'bg-muted-foreground' },
  { id: 'todo', title: 'Todo', color: 'bg-develop' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-preview' },
  { id: 'review', title: 'Review', color: 'bg-purple-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' },
];

const mockIssues: Issue[] = [
  {
    id: 'ISS-1',
    projectId: '1',
    title: 'Implement user authentication flow',
    description: 'Set up JWT based auth with refresh tokens.',
    state: 'in_progress',
    priority: 'urgent',
    assigneeId: 'u1',
    labelIds: ['l1'],
    estimate: 3,
    createdAt: '2023-12-01',
    updatedAt: '2023-12-21',
  },
  {
    id: 'ISS-2',
    projectId: '1',
    title: 'Design system updates for dark mode',
    description: 'Refine color palette for better contrast.',
    state: 'todo',
    priority: 'high',
    assigneeId: 'u2',
    labelIds: ['l2'],
    estimate: 2,
    createdAt: '2023-12-05',
    updatedAt: '2023-12-21',
  },
  {
    id: 'ISS-3',
    projectId: '1',
    title: 'Bug: Fix sidebar overflow on mobile',
    description: 'Sidebar content is cut off on small screens.',
    state: 'backlog',
    priority: 'medium',
    labelIds: ['l3'],
    estimate: 1,
    createdAt: '2023-12-10',
    updatedAt: '2023-12-21',
  }
];

export default function KanbanBoard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('issueId', id);
  };

  const handleDrop = (e: React.DragEvent, newState: IssueState) => {
    const id = e.dataTransfer.getData('issueId');
    if (!id) return;
    setIssues(prev => prev.map(issue =>
      issue.id === id ? { ...issue, state: newState } : issue
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const filteredIssues = issues.filter(i =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">
              <span>Platform</span>
              <ChevronDown size={10} className="rotate-[-90deg]" />
              <span className="text-foreground">Issues</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tighter">Kanban Board</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-secondary rounded-lg p-1 vercel-border">
              <button className="p-1.5 bg-background shadow-sm rounded-md text-foreground">
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => navigate('/dashboard/issues')}
                className="p-1.5 text-muted-foreground hover:text-foreground"
              >
                <ListIcon size={16} />
              </button>
            </div>
            <button className="flex items-center space-x-2 px-6 py-2 bg-foreground text-background rounded-lg text-sm font-bold transition-all hover:opacity-90 shadow-lg shadow-foreground/5 active:scale-95">
              <Plus size={16} />
              <span>Create Issue</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background vercel-border rounded-lg text-xs focus:outline-none transition-all placeholder:text-muted-foreground/50 font-medium"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 vercel-border rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              <Filter size={14} />
              <span>Filters</span>
            </button>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-muted-foreground">
            <Clock size={14} />
            <span className="uppercase tracking-widest">Last synced 2m ago</span>
          </div>
        </div>
      </div>

      {/* Board Content */}
      <div className="flex-1 overflow-x-auto p-8 bg-[#fafafa] dark:bg-black">
        <div className="flex space-x-8 h-full min-w-max">
          {COLUMNS.map((column) => (
            <div
              key={column.id}
              className="flex flex-col w-[320px] h-full"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${column.color}`} />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">{column.title}</h3>
                  <span className="text-[10px] font-bold text-muted-foreground bg-background vercel-border px-2 py-0.5 rounded-full">
                    {filteredIssues.filter(i => i.state === column.id).length}
                  </span>
                </div>
                <button className="p-1 hover:bg-secondary rounded-lg transition-colors text-muted-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Column Content */}
              <div className="flex-1 overflow-y-auto px-1 space-y-4 pb-10 scrollbar-hide">
                <AnimatePresence mode="popLayout">
                  {filteredIssues.filter(i => i.state === column.id).map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      handleDragStart={(e) => handleDragStart(e, issue.id)}
                    />
                  ))}
                </AnimatePresence>

                {/* Drop Zone Placeholder */}
                <div className="h-16 vercel-border border-dashed border-2 flex flex-col items-center justify-center rounded-xl bg-background/40 transition-all cursor-default group hover:bg-background/60">
                  <Plus size={16} className="text-muted-foreground/30 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30">New Issue</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IssueCard({ issue, handleDragStart }: { issue: Issue; handleDragStart: (e: React.DragEvent) => void }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      draggable
      onDragStart={handleDragStart as any}
      onClick={() => navigate(`/dashboard/issues/${issue.id}`)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-background p-5 rounded-xl vercel-card cursor-grab active:cursor-grabbing group transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{issue.id}</span>
          <div className="w-1 h-1 rounded-full bg-border" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">v1.2.0</span>
        </div>
        <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary rounded-lg text-muted-foreground">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <h4 className="text-sm font-bold text-foreground mb-6 line-clamp-2 leading-snug tracking-tight group-hover:text-develop transition-colors">
        {issue.title}
      </h4>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center space-x-4">
          <PriorityIcon priority={issue.priority} />
          <div className="flex items-center space-x-1.5 text-muted-foreground">
            <MessageSquare size={13} />
            <span className="text-[10px] font-bold uppercase">2</span>
          </div>
          <div className="flex items-center space-x-1.5 text-muted-foreground">
            <Paperclip size={13} />
            <span className="text-[10px] font-bold uppercase">1</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {issue.estimate && (
            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary px-2 py-1 rounded-md">
              {issue.estimate} PTS
            </div>
          )}
          <div className="w-7 h-7 rounded-full vercel-border bg-background flex items-center justify-center text-[10px] font-bold text-foreground shadow-sm group-hover:bg-foreground group-hover:text-background transition-all duration-300">
            {issue.assigneeId ? issue.assigneeId.charAt(0).toUpperCase() : '?'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PriorityIcon({ priority }: { priority: IssuePriority }) {
  const icons = {
    none: <AlertCircle size={14} className="text-muted-foreground/40" />,
    low: <AlertCircle size={14} className="text-muted-foreground" />,
    medium: <AlertCircle size={14} className="text-develop" />,
    high: <AlertCircle size={14} className="text-preview" />,
    urgent: <AlertCircle size={14} className="text-ship" />,
  };
  return icons[priority] || icons.none;
}
