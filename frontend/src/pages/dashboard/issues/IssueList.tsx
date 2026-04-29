import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ChevronDown,
  LayoutGrid,
  List as ListIcon,
  Table as TableIcon,
  Calendar as CalendarIcon,
  Clock,
  User,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Issue, IssueState, IssuePriority } from '../../../types/issue';

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

export default function IssueList() {
  const [issues] = useState<Issue[]>(mockIssues);
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">Issues</h1>
          <div className="flex items-center bg-secondary/30 rounded-lg p-1 border border-border">
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm transition-all">
              <ListIcon size={16} />
            </button>
            <button className="p-1.5 rounded-md text-blue-500 bg-background shadow-sm transition-all">
              <TableIcon size={16} />
            </button>
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm transition-all">
              <LayoutGrid size={16} />
            </button>
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm transition-all">
              <CalendarIcon size={16} />
            </button>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} />
          <span>New Issue</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-8 py-3 bg-secondary/10 border-b border-border">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Filter issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-background border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
          </div>
          <div className="h-4 w-px bg-border"></div>
          <ToolbarButton icon={<Filter size={14} />} label="Filter" />
          <ToolbarButton icon={<User size={14} />} label="Assignee" />
          <ToolbarButton icon={<AlertCircle size={14} />} label="Priority" />
          <ToolbarButton icon={<Tag size={14} />} label="Labels" />
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>{issues.length} Issues</span>
        </div>
      </div>

      {/* Spreadsheet View */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="sticky top-0 bg-background z-10">
            <tr className="border-b border-border">
              <th className="w-12 px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">#</th>
              <th className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="w-32 px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">State</th>
              <th className="w-32 px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Priority</th>
              <th className="w-40 px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Assignee</th>
              <th className="w-32 px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Estimate</th>
              <th className="w-40 px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-secondary/10 transition-colors group cursor-pointer">
                <td className="px-4 py-3 text-center text-xs font-mono text-muted-foreground">{issue.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground line-clamp-1">{issue.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StateBadge state={issue.state} />
                </td>
                <td className="px-4 py-3">
                  <PriorityIcon priority={issue.priority} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[10px] font-bold text-blue-600">
                      {issue.assigneeId ? issue.assigneeId.charAt(0).toUpperCase() : '?'}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {issue.assigneeId || 'Unassigned'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {issue.estimate ? (
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      {issue.estimate} pts
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/30">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                  {issue.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center space-x-2 px-2.5 py-1 rounded hover:bg-secondary transition-colors text-xs font-medium text-muted-foreground hover:text-foreground">
      {icon}
      <span>{label}</span>
      <ChevronDown size={12} />
    </button>
  );
}

function StateBadge({ state }: { state: IssueState }) {
  const styles = {
    backlog: 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400',
    todo: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    in_progress: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    review: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    done: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    cancelled: 'bg-gray-200 text-gray-500',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${styles[state]}`}>
      {state.replace('_', ' ')}
    </span>
  );
}

function PriorityIcon({ priority }: { priority: IssuePriority }) {
  const styles = {
    none: 'text-gray-400',
    low: 'text-gray-500',
    medium: 'text-blue-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  };
  return (
    <div className="flex items-center space-x-2">
      <div className={`p-0.5 rounded ${styles[priority]}`}>
        <AlertCircle size={14} />
      </div>
      <span className={`text-xs font-medium capitalize ${styles[priority]}`}>{priority}</span>
    </div>
  );
}
