import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/auth/LoginPage.vue"),
      meta: { guestOnly: true },
    },
    {
      path: "/auth/callback",
      name: "oauthCallback",
      component: () => import("@/pages/auth/OAuthCallback.vue"),
      meta: { guestOnly: true },
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/pages/DashboardHome.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/pages/UsersPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/collections",
      name: "collections",
      component: () => import("@/pages/CollectionsPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/pages/SettingsPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/401",
      name: "unauthorized",
      component: () => import("@/pages/errors/UnauthorizedPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "dashboard" },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "login" });
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: "dashboard" });
  }

  return next();
});

export default router;
