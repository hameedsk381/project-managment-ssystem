import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Settings, MoreVertical } from 'lucide-react';
import { useProjects, useCreateProject } from '../hooks/useProjects';

export default function Projects() {
  const { data: projects, isLoading, isError } = useProjects();
  const createProject = useCreateProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectIdentifier, setNewProjectIdentifier] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    createProject.mutate({ name: newProjectName, identifier: newProjectIdentifier }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setNewProjectName('');
        setNewProjectIdentifier('');
      }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      {isLoading && <div className="text-muted-foreground">Loading projects...</div>}
      {isError && <div className="text-red-500">Failed to load projects. (API might be down)</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Link to={`/projects/${project.id}/board`} key={project.id} className="p-6 bg-secondary/30 rounded-lg border border-border hover:border-blue-500/50 transition-colors group block">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold">
                {project.identifier}
              </div>
              <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.preventDefault()}>
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{project.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description || 'No description provided.'}</p>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <span className="flex items-center">
                <Settings className="w-3 h-3 mr-1" />
                {project.network_type || 'Public'}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Create Modal placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-secondary p-6 rounded-lg shadow-xl border border-border w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-foreground">Create Project</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Project Name</label>
                <input 
                  type="text" 
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Identifier</label>
                <input 
                  type="text" 
                  required
                  value={newProjectIdentifier}
                  onChange={(e) => setNewProjectIdentifier(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:ring-2 focus:ring-blue-500"
                  maxLength={5}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={createProject.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {createProject.isPending ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
