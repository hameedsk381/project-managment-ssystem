import { apiClient } from './client';

export interface Issue {
  id: string;
  project_id: string;
  title: string;
  description: string;
  state: 'backlog' | 'todo' | 'in_progress' | 'done' | 'cancelled';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee_id?: string;
  labels?: string[];
}

export const getIssues = async (projectId: string): Promise<Issue[]> => {
  const { data } = await apiClient.get<Issue[]>(`/projects/${projectId}/issues/`);
  return data;
};

export const createIssue = async (projectId: string, issueData: Partial<Issue>): Promise<Issue> => {
  const { data } = await apiClient.post<Issue>(`/projects/${projectId}/issues/`, issueData);
  return data;
};

export const updateIssue = async (projectId: string, issueId: string, issueData: Partial<Issue>): Promise<Issue> => {
  const { data } = await apiClient.patch<Issue>(`/projects/${projectId}/issues/${issueId}`, issueData);
  return data;
};
