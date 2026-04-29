import apiClient from "./axios";

export async function getDashboardStats() {
  const { data } = await apiClient.get("/dashboard/stats");
  return data;
}

export async function getRecentActivity() {
  const { data } = await apiClient.get("/dashboard/activity");
  return data;
}

export async function getUpcomingMilestones() {
  const { data } = await apiClient.get("/dashboard/milestones");
  return data;
}

export async function getAtRiskItems() {
  const { data } = await apiClient.get("/dashboard/at-risk");
  return data;
}

export async function getMyTasksPreview() {
  const { data } = await apiClient.get("/dashboard/my-tasks");
  return data;
}

export async function getDeliveryConfidence() {
  const { data } = await apiClient.get("/dashboard/delivery-confidence");
  return data;
}
