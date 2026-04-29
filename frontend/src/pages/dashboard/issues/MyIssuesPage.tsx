import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List as ListIcon, 
  Table as TableIcon, 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import KanbanBoard from './KanbanBoard';
import IssueList from './IssueList';

type ViewType = 'kanban' | 'list' | 'table' | 'calendar';

export default function MyIssuesPage() {
  const [view, setView] = useState<ViewType>('kanban');

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground mb-1">
              <span>Workspace</span>
              <ChevronRight size={12} />
              <span className="text-foreground">My Issues</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">My Issues</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center bg-secondary/30 rounded-lg p-1 border border-border">
              <ViewButton icon={<LayoutGrid size={16} />} active={view === 'kanban'} onClick={() => setView('kanban')} />
              <ViewButton icon={<ListIcon size={16} />} active={view === 'list'} onClick={() => setView('list')} />
              <ViewButton icon={<TableIcon size={16} />} active={view === 'table'} onClick={() => setView('table')} />
              <ViewButton icon={<CalendarIcon size={16} />} active={view === 'calendar'} onClick={() => setView('calendar')} />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Plus size={18} />
              <span>Create Issue</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <input 
                type="text" 
                placeholder="Search my issues..."
                className="pl-9 pr-3 py-1.5 bg-secondary/30 border border-transparent focus:border-border rounded-lg text-xs w-64 focus:outline-none transition-all"
              />
            </div>
            <div className="h-4 w-px bg-border"></div>
            <FilterButton label="Priority" />
            <FilterButton label="Status" />
            <FilterButton label="Label" />
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            Showing 24 issues assigned to you
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {view === 'kanban' && <KanbanBoard />}
        {view === 'list' && <IssueList />}
        {view === 'table' && <IssueList />}
        {view === 'calendar' && <CalendarPlaceholder />}
      </div>
    </div>
  );
}

function ViewButton({ icon, active, onClick }: { icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-1.5 rounded-md transition-all ${active ? 'bg-background shadow-sm text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {icon}
    </button>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center space-x-2 px-2.5 py-1.5 hover:bg-secondary/50 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
      <span>{label}</span>
      <ChevronDown size={14} />
    </button>
  );
}

function CalendarPlaceholder() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
      <CalendarIcon size={48} className="opacity-20" />
      <div className="text-center">
        <h3 className="font-bold text-foreground">Calendar View</h3>
        <p className="text-sm">Stay tuned! Calendar view is coming in the next update.</p>
      </div>
    </div>
  );
}
