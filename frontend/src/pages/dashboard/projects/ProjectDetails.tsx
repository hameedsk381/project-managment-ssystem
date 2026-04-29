import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  List, 
  Calendar, 
  Users, 
  Settings, 
  Info, 
  ChevronRight,
  MoreVertical,
  Plus,
  Star,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import KanbanBoard from '../issues/KanbanBoard';
import IssueList from '../issues/IssueList';

type ProjectTab = 'overview' | 'board' | 'list' | 'timeline' | 'members' | 'settings';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProjectTab>('overview');

  const projectName = "Apollo Platform"; // Mock

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Project Header */}
      <div className="px-8 pt-6 border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-600/20">
              {projectName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground mb-1">
                <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard/projects')}>Projects</span>
                <ChevronRight size={12} />
                <span className="text-foreground">{projectName}</span>
              </div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">{projectName}</h1>
                <button className="p-1 hover:bg-secondary rounded text-muted-foreground"><Star size={18} /></button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2 mr-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">JD</div>
              ))}
              <button className="w-8 h-8 rounded-full border-2 border-background bg-secondary/50 flex items-center justify-center text-[10px] font-bold hover:bg-secondary transition-colors"><Plus size={14} /></button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Plus size={18} />
              <span>New Issue</span>
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-8 overflow-x-auto">
          <TabButton icon={<Info size={16} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <TabButton icon={<LayoutGrid size={16} />} label="Board" active={activeTab === 'board'} onClick={() => setActiveTab('board')} />
          <TabButton icon={<List size={16} />} label="List" active={activeTab === 'list'} onClick={() => setActiveTab('list')} />
          <TabButton icon={<Calendar size={16} />} label="Timeline" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} />
          <TabButton icon={<Users size={16} />} label="Members" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
          <TabButton icon={<Settings size={16} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'overview' && <ProjectOverview />}
        {activeTab === 'board' && <KanbanBoard />}
        {activeTab === 'list' && <IssueList />}
        {activeTab === 'timeline' && <ProjectTimeline />}
        {activeTab === 'members' && <ProjectMembers />}
        {activeTab === 'settings' && <ProjectSettings />}
      </div>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-2 pb-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
        active 
          ? 'border-blue-500 text-blue-500' 
          : 'border-transparent text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ProjectOverview() {
  return (
    <div className="h-full overflow-y-auto p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">About this project</h2>
            <div className="p-6 bg-secondary/20 rounded-xl border border-border prose prose-sm dark:prose-invert max-w-none">
              <p>Apollo Platform is our core infrastructure monitoring system. It provides real-time visibility into microservices, automated scaling policies, and predictive anomaly detection for enterprise deployments.</p>
              <ul className="mt-4 space-y-2">
                <li>Multi-cloud support (AWS, GCP, Azure)</li>
                <li>Zero-config instrumentation</li>
                <li>Advanced alerting and incident response</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start space-x-4 p-4 hover:bg-secondary/10 rounded-xl transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">JD</div>
                  <div>
                    <p className="text-sm text-foreground"><span className="font-bold">John Doe</span> updated the status of <span className="text-blue-500 hover:underline cursor-pointer">ISS-124: Update login styles</span> to <span className="font-medium text-orange-500">In Progress</span></p>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="p-6 bg-secondary/30 rounded-xl border border-border space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Project Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-bold text-green-500">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lead</span>
                <span className="text-sm font-bold">Sarah Lee</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Priority</span>
                <span className="text-sm font-bold text-orange-500">High</span>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
                  <span>Overall Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-blue-600/5 rounded-xl border border-blue-500/20">
            <h3 className="text-sm font-bold text-blue-500 mb-2">AI Summary</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The project is progressing well, with a 15% increase in throughput over the last week. The main bottleneck is currently in the Review stage, where 8 issues are awaiting approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectTimeline() {
  return (
    <div className="h-full flex items-center justify-center text-muted-foreground flex-col space-y-4">
      <Calendar size={48} className="opacity-20" />
      <div className="text-center">
        <h3 className="font-bold text-foreground">Timeline View</h3>
        <p className="text-sm">Gantt chart visualization is coming in Chunk 3 of Phase 2.</p>
      </div>
    </div>
  );
}

function ProjectMembers() {
  return (
    <div className="h-full overflow-y-auto p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Project Members</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
          <Plus size={16} />
          <span>Add Member</span>
        </button>
      </div>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-secondary/30">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Member</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-secondary/5 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">JD</div>
                  <div>
                    <div className="text-sm font-bold text-foreground">John Doe</div>
                    <div className="text-xs text-muted-foreground">john@example.com</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 bg-secondary rounded border border-border">Maintainer</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 hover:bg-secondary rounded text-muted-foreground"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectSettings() {
  return (
    <div className="h-full overflow-y-auto p-8 max-w-3xl mx-auto space-y-10">
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">General Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Project Name</label>
            <input type="text" className="w-full p-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none" defaultValue="Apollo Platform" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Identifier</label>
            <input type="text" className="w-full p-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none" defaultValue="APO" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <textarea className="w-full p-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none min-h-[100px]" defaultValue="Cloud infrastructure monitoring and automated scaling platform for enterprise clients." />
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-10 border-t border-border">
        <h2 className="text-xl font-bold text-red-500">Danger Zone</h2>
        <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-xl space-y-4">
          <div>
            <h4 className="text-sm font-bold text-foreground">Archive Project</h4>
            <p className="text-xs text-muted-foreground">Archive this project and its issues. You can still restore it later.</p>
          </div>
          <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-all">Archive Project</button>
        </div>
      </section>
    </div>
  );
}
