import apiClient from "./axios";

export async function getNotifications(params = {}) {
  const { data } = await apiClient.get("/notifications", { params });
  return data;
}

export async function markNotificationRead(notificationId) {
  const { data } = await apiClient.patch(`/notifications/${notificationId}/read`);
  return data;
}
