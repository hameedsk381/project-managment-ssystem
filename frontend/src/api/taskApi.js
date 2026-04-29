import apiClient from "./axios";

export async function getTasks(params = {}) {
  const { data } = await apiClient.get("/tasks", { params });
  return data;
}

export async function createTask(payload) {
  const { data } = await apiClient.post("/tasks", payload);
  return data;
}

export async function updateTaskStatus(taskId, payload) {
  const { data } = await apiClient.patch(`/tasks/${taskId}/status`, payload);
  return data;
}

export async function assignTaskUser(taskId, payload) {
  const { data } = await apiClient.patch(`/tasks/${taskId}/assign`, payload);
  return data;
}

export async function getTaskActivity(taskId) {
  const { data } = await apiClient.get(`/tasks/${taskId}/activity`);
  return data;
}
