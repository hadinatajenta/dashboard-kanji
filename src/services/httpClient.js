import axios from "axios";

const rawBaseURL = import.meta.env.VITE_BE_API ?? "http://localhost:8080";
const baseURL = rawBaseURL.startsWith("http")
  ? rawBaseURL
  : `http://${rawBaseURL}`;

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

const httpClient = axios.create({
  baseURL,
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default httpClient;
