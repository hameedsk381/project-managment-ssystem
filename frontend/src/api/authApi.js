import apiClient from "./axios";

export async function loginUser(payload) {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
}

export async function getCurrentUser() {
  const { data } = await apiClient.get("/auth/me");
  return data;
}
