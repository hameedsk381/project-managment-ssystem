import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  LayoutGrid, 
  List as ListIcon,
  Star,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../../../types/project';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Apollo Platform',
    identifier: 'APO',
    description: 'Cloud infrastructure monitoring and automated scaling platform for enterprise clients.',
    status: 'ongoing',
    priority: 'high',
    leadId: 'u1',
    memberIds: ['u1', 'u2', 'u3'],
    progress: 65,
    createdAt: '2023-10-01',
    updatedAt: '2023-12-15',
  },
  {
    id: '2',
    name: 'Hermes Messenger',
    identifier: 'HER',
    description: 'High-performance real-time messaging system with end-to-end encryption.',
    status: 'ongoing',
    priority: 'medium',
    leadId: 'u2',
    memberIds: ['u2', 'u4'],
    progress: 40,
    createdAt: '2023-11-05',
    updatedAt: '2023-12-20',
  },
  {
    id: '3',
    name: 'Atlas Analytics',
    identifier: 'ATL',
    description: 'Data visualization and predictive analytics suite for marketing teams.',
    status: 'completed',
    priority: 'low',
    leadId: 'u3',
    memberIds: ['u1', 'u3', 'u5'],
    progress: 100,
    createdAt: '2023-08-15',
    updatedAt: '2023-11-30',
  }
];

export default function ProjectList() {
  const navigate = useNavigate();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage and track your team's initiatives.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-secondary/30 rounded-lg p-1 border border-border">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-background shadow-sm text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-background shadow-sm text-blue-500' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
            <Plus size={18} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-8 py-4 bg-secondary/10 border-b border-border">
        <div className="flex items-center space-x-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors">
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors">
            <Clock size={16} />
            <span>Last updated</span>
            <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Showing {mockProjects.length} projects</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-secondary/20">
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Identifier</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockProjects.map((project) => (
                  <tr 
                    key={project.id} 
                    onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                    className="hover:bg-secondary/10 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">
                          {project.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{project.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1 w-48">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                        {project.identifier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={project.priority} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-muted-foreground">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${project.progress}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/dashboard/projects/${project.id}`)}
      className="bg-background rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full cursor-pointer"
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xl">
            {project.name.charAt(0)}
          </div>
          <div className="flex space-x-1">
            <button className="p-1.5 text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors">
              <Star size={18} />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-blue-500 transition-colors">{project.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">{project.description}</p>
        
        <div className="flex items-center space-x-3 mb-6">
          <StatusBadge status={project.status} />
          <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
            {project.identifier}
          </span>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-background bg-secondary/80 flex items-center justify-center text-[10px] text-muted-foreground">
                +2
              </div>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{project.progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${project.progress}%` }} 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    ongoing: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    on_hold: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    archived: 'bg-secondary text-muted-foreground',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${styles[status as keyof typeof styles]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles = {
    low: 'text-gray-500',
    medium: 'text-blue-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  };
  return (
    <div className="flex items-center space-x-1.5">
      <div className={`w-1.5 h-1.5 rounded-full ${styles[priority as keyof typeof styles].replace('text', 'bg')}`} />
      <span className={`text-xs font-medium capitalize ${styles[priority as keyof typeof styles]}`}>
        {priority}
      </span>
    </div>
  );
}
