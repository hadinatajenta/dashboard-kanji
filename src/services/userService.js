import httpClient from "./httpClient";

export const fetchUsers = async () => {
  const response = await httpClient.get("/api/users");
  return response.data;
};

export const fetchUserLogs = async (params = {}) => {
  const response = await httpClient.get("/api/users/logs", { params });
  return response.data;
};
