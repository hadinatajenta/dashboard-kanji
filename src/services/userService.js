import httpClient from "./httpClient";

export const fetchUsers = async () => {
  const response = await httpClient.get("/api/users");
  return response.data;
};

export const fetchUserLogsByUser = async (userId, params = {}) => {
  const response = await httpClient.get(`/api/users/${userId}/logs`, {
    params,
  });
  return response.data;
};
