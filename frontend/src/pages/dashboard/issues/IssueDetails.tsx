import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Link as LinkIcon, 
  MessageSquare, 
  History,
  Send,
  Plus,
  X,
  ChevronRight,
  AlertCircle,
  Calendar,
  User,
  Tag,
  Clock
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Issue, IssueState, IssuePriority } from '../../../types/issue';

const mockIssue: Issue = {
  id: 'ISS-1',
  projectId: '1',
  title: 'Implement user authentication flow',
  description: '### Objective\nSet up a secure JWT-based authentication system for the platform.\n\n### Requirements\n- Use HTTP-only cookies for storing tokens\n- Implement refresh token rotation\n- Add role-based access control (RBAC)\n- Create login and registration UI components',
  state: 'in_progress',
  priority: 'urgent',
  assigneeId: 'John Doe',
  labelIds: ['Auth', 'Backend', 'Security'],
  dueDate: '2024-01-15',
  estimate: 5,
  createdAt: '2023-12-01',
  updatedAt: '2023-12-21',
};

export default function IssueDetails() {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const [activeTab, setActiveTab] = useState<'comments' | 'activity'>('comments');
  const [comment, setComment] = useState('');

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center space-x-2 text-xs font-medium">
            <span className="text-muted-foreground hover:text-foreground cursor-pointer">Projects</span>
            <ChevronRight size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground hover:text-foreground cursor-pointer">Apollo Platform</span>
            <ChevronRight size={12} className="text-muted-foreground" />
            <span className="text-foreground">{issueId || mockIssue.id}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
            <LinkIcon size={18} />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
            <MoreHorizontal size={18} />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors md:hidden">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 border-r border-border">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{mockIssue.title}</h1>
              <div className="flex flex-wrap gap-2">
                {mockIssue.labelIds.map((label) => (
                  <span key={label} className="px-2 py-0.5 bg-secondary text-xs font-medium text-muted-foreground rounded-full border border-border">
                    {label}
                  </span>
                ))}
                <button className="px-2 py-0.5 hover:bg-secondary text-xs font-medium text-blue-500 rounded-full border border-dashed border-blue-500/30 flex items-center space-x-1">
                  <Plus size={12} />
                  <span>Add Label</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Description</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground bg-secondary/20 p-6 rounded-xl border border-border/50">
                {mockIssue.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <div className="flex items-center space-x-6 mb-6">
                <button 
                  onClick={() => setActiveTab('comments')}
                  className={`flex items-center space-x-2 pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'comments' ? 'border-blue-500 text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  <MessageSquare size={16} />
                  <span>Comments</span>
                </button>
                <button 
                  onClick={() => setActiveTab('activity')}
                  className={`flex items-center space-x-2 pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'activity' ? 'border-blue-500 text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  <History size={16} />
                  <span>Activity</span>
                </button>
              </div>

              {activeTab === 'comments' ? (
                <div className="space-y-6">
                  {/* Comment input */}
                  <div className="flex space-x-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">JD</div>
                    <div className="flex-1 space-y-3">
                      <div className="relative">
                        <textarea 
                          placeholder="Add a comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full bg-secondary/30 border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 min-h-[100px] transition-all resize-none"
                        />
                        <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                          <button className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
                            <Tag size={16} />
                          </button>
                          <button 
                            disabled={!comment.trim()}
                            className="p-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md transition-colors"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample comments */}
                  <div className="space-y-8 pl-12">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-foreground">Sarah Lee</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">I've started working on the RBAC middleware. Should have a PR ready by tomorrow morning.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pl-4 border-l-2 border-border ml-4">
                  <div className="relative pb-6">
                    <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-background"></div>
                    <p className="text-sm text-foreground"><span className="font-bold">Sarah Lee</span> changed state to <span className="font-medium text-orange-500">In Progress</span></p>
                    <p className="text-xs text-muted-foreground mt-0.5">2 hours ago</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-secondary border-4 border-background"></div>
                    <p className="text-sm text-foreground"><span className="font-bold">Sarah Lee</span> self-assigned this issue</p>
                    <p className="text-xs text-muted-foreground mt-0.5">3 hours ago</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Properties */}
        <div className="w-80 hidden xl:flex flex-col overflow-y-auto p-6 bg-secondary/10 space-y-8">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Properties</h3>
            <div className="space-y-1">
              <PropertyItem icon={<AlertCircle size={14} />} label="Priority" value={<PriorityValue priority={mockIssue.priority} />} />
              <PropertyItem icon={<User size={14} />} label="Assignee" value={
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center text-[10px] font-bold">{mockIssue.assigneeId?.charAt(0)}</div>
                  <span className="text-sm font-medium">{mockIssue.assigneeId}</span>
                </div>
              } />
              <PropertyItem icon={<Clock size={14} />} label="State" value={<StateValue state={mockIssue.state} />} />
              <PropertyItem icon={<Calendar size={14} />} label="Due Date" value={<span className="text-sm font-medium">{mockIssue.dueDate}</span>} />
              <PropertyItem icon={<Tag size={14} />} label="Estimate" value={<span className="text-sm font-medium">{mockIssue.estimate} points</span>} />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Time Tracking</h3>
            <div className="px-2 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Created</span>
                <span>{mockIssue.createdAt}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Updated</span>
                <span>{mockIssue.updatedAt}</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Linked Issues</h3>
            <button className="w-full mx-2 flex items-center justify-center space-x-2 px-4 py-2 border border-dashed border-border rounded-lg text-xs font-medium text-muted-foreground hover:bg-secondary/50 transition-colors">
              <Plus size={14} />
              <span>Link Issue</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function PropertyItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer">
      <div className="flex items-center space-x-3 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium group-hover:text-foreground transition-colors">{label}</span>
      </div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}

function PriorityValue({ priority }: { priority: IssuePriority }) {
  const styles = {
    none: 'text-gray-400',
    low: 'text-gray-500',
    medium: 'text-blue-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  };
  return <span className={`text-sm font-bold capitalize ${styles[priority]}`}>{priority}</span>;
}

function StateValue({ state }: { state: IssueState }) {
  const styles = {
    backlog: 'text-gray-500',
    todo: 'text-blue-500',
    in_progress: 'text-orange-500',
    review: 'text-purple-500',
    done: 'text-green-500',
    cancelled: 'text-gray-400',
  };
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${styles[state].replace('text', 'bg')}`} />
      <span className={`text-sm font-bold capitalize ${styles[state]}`}>{state.replace('_', ' ')}</span>
    </div>
  );
}
