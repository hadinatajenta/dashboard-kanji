import httpClient from "./httpClient";

export const logout = async ({ detail } = {}) => {
  const payload = detail ? { detail } : {};
  return httpClient.post("/auth/logout", payload);
};

