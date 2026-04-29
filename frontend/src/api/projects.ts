import { apiClient } from './client';

export interface Project {
  id: string;
  name: string;
  identifier: string;
  description: string;
  network_type: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await apiClient.get<Project[]>('/projects/');
  return data;
};

export const getProject = async (id: string): Promise<Project> => {
  const { data } = await apiClient.get<Project>(`/projects/${id}`);
  return data;
};

export const createProject = async (projectData: Partial<Project>): Promise<Project> => {
  const { data } = await apiClient.post<Project>('/projects/', projectData);
  return data;
};
