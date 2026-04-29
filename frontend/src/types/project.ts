export type ProjectStatus = 'ongoing' | 'completed' | 'archived' | 'on_hold';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  identifier: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  leadId: string;
  memberIds: string[];
  progress: number;
  startDate?: string;
  targetDate?: string;
  createdAt: string;
  updatedAt: string;
}
