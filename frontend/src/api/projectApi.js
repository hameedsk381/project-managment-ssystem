import apiClient from "./axios";

export async function getProjects(params = {}) {
  const { data } = await apiClient.get("/projects", { params });
  return data;
}

export async function createProject(payload) {
  const { data } = await apiClient.post("/projects", payload);
  return data;
}

export async function updateProject(projectId, payload) {
  const { data } = await apiClient.put(`/projects/${projectId}`, payload);
  return data;
}

export async function getProjectById(projectId) {
  const { data } = await apiClient.get(`/projects/${projectId}`);
  return data;
}

export async function getProjectMilestones(projectId) {
  const { data } = await apiClient.get(`/projects/${projectId}/milestones`);
  return data;
}

export async function getProjectTasks(projectId) {
  const { data } = await apiClient.get(`/projects/${projectId}/tasks`);
  return data;
}

export async function getProjectActivity(projectId) {
  const { data } = await apiClient.get(`/projects/${projectId}/activity`);
  return data;
}

export async function getProjectDecisions(projectId) {
  const { data } = await apiClient.get(`/projects/${projectId}/decisions`);
  return data;
}

export async function createProjectDecision(projectId, payload) {
  const { data } = await apiClient.post(`/projects/${projectId}/decisions`, payload);
  return data;
}

export async function getProjectFiles(projectId) {
  const { data } = await apiClient.get(`/projects/${projectId}/files`);
  return data;
}

export async function createProjectMilestone(projectId, payload) {
  const { data } = await apiClient.post(`/projects/${projectId}/milestones`, payload);
  return data;
}

export async function updateProjectMilestone(projectId, milestoneId, payload) {
  const { data } = await apiClient.put(`/projects/${projectId}/milestones/${milestoneId}`, payload);
  return data;
}
