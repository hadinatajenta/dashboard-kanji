import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    sidebarCollapsed: false,
    lastSyncedAt: null,
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    markSynced() {
      this.lastSyncedAt = new Date().toISOString();
    },
  },
});
