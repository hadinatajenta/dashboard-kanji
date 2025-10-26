import { defineStore } from "pinia";
import { clearAuthToken, setAuthToken } from "@/services/httpClient";
import { logout as logoutRequest } from "@/services/authService";

const STORAGE_TOKEN_KEY = "kanji.token";
const STORAGE_USER_KEY = "kanji.user";

const getStoredUser = () => {
  const raw = localStorage.getItem(STORAGE_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Failed to parse stored user payload", error);
    return null;
  }
};

const initialToken = localStorage.getItem(STORAGE_TOKEN_KEY);
const initialUser = getStoredUser();

if (initialToken) {
  setAuthToken(initialToken);
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: initialToken,
    user: initialUser,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    setAuth({ token, user }) {
      this.token = token;
      this.user = user;
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      setAuthToken(token);
    },
    async logout(detail) {
      if (this.token) {
        try {
          await logoutRequest({ detail });
        } catch (error) {
          console.warn("Failed to notify backend about logout", error);
        }
      }

      this.clearAuthState();
    },
    clearAuthState() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(STORAGE_TOKEN_KEY);
      localStorage.removeItem(STORAGE_USER_KEY);
      clearAuthToken();
    },
  },
});

