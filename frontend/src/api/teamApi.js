import apiClient from "./axios";

export async function getTeams(params = {}) {
  const { data } = await apiClient.get("/teams", { params });
  return data;
}

export async function createTeam(payload) {
  const { data } = await apiClient.post("/teams", payload);
  return data;
}

export async function updateTeam(teamId, payload) {
  const { data } = await apiClient.put(`/teams/${teamId}`, payload);
  return data;
}
