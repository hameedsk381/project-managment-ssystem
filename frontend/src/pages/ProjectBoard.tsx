import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useIssues, useUpdateIssue } from '../hooks/useIssues';
import { Issue } from '../api/issues';

const COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'Todo' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function ProjectBoard() {
  const { projectId } = useParams<{ projectId: string }>();
  // We use a fallback projectId for the demo if not in URL
  const activeProjectId = projectId || 'demo-project-1';
  
  const { data: issues, isLoading } = useIssues(activeProjectId);
  const updateIssue = useUpdateIssue(activeProjectId);

  const handleDragStart = (e: React.DragEvent, issueId: string) => {
    e.dataTransfer.setData('issueId', issueId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, state: Issue['state']) => {
    e.preventDefault();
    const issueId = e.dataTransfer.getData('issueId');
    if (issueId) {
      updateIssue.mutate({ issueId, data: { state } });
    }
  };

  if (isLoading) return <div className="p-8 text-muted-foreground">Loading board...</div>;

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Project Board</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          New Issue
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-6 min-w-max h-full pb-4">
          {COLUMNS.map((col) => {
            const columnIssues = issues?.filter((issue) => issue.state === col.id) || [];
            return (
              <div 
                key={col.id} 
                className="w-80 flex flex-col bg-secondary/20 rounded-lg border border-border"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id as Issue['state'])}
              >
                <div className="p-4 flex items-center justify-between border-b border-border bg-secondary/40 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground">{col.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground font-medium">
                      {columnIssues.length}
                    </span>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                  {columnIssues.map((issue) => (
                    <div 
                      key={issue.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, issue.id)}
                      className="p-3 bg-background border border-border rounded shadow-sm hover:border-blue-500/50 cursor-grab active:cursor-grabbing transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase">{issue.id.slice(0,8)}</span>
                        <button className="opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-3">{issue.title}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          issue.priority === 'urgent' ? 'bg-red-500/10 text-red-500' :
                          issue.priority === 'high' ? 'bg-orange-500/10 text-orange-500' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {issue.priority}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center text-xs font-bold border border-blue-600/30">
                          {issue.assignee_id ? 'JD' : '?'}
                        </div>
                      </div>
                    </div>
                  ))}
                  {columnIssues.length === 0 && (
                    <div className="h-20 border-2 border-dashed border-border rounded flex items-center justify-center text-sm text-muted-foreground">
                      Drop issues here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
