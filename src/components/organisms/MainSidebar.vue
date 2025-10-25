<script setup>
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const navigation = [
  { label: "Dashboard", to: "/" },
  { label: "Users", to: "/users" },
  { label: "Collections", to: "/collections" },
  { label: "Settings", to: "/settings" },
];

const router = useRouter();
const authStore = useAuthStore();

const displayName = computed(
  () => authStore.user?.name || "Administrator",
);
const displayEmail = computed(() => authStore.user?.email || "");

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <aside
    class="flex h-full w-64 flex-col gap-4 border-r border-slate-200 bg-white px-4 py-6"
  >
    <div class="flex items-center gap-2 px-2">
      <span class="h-10 w-10 rounded-xl bg-primary-500 text-lg font-semibold text-white grid place-items-center">
        漢
      </span>
      <div>
        <p class="text-sm font-semibold text-slate-900">Kanji Dashboard</p>
        <p class="text-xs text-slate-500">Management Console</p>
      </div>
    </div>
    <nav class="flex-1">
      <ul class="space-y-1">
        <li v-for="item in navigation" :key="item.to">
          <RouterLink
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
            active-class="bg-primary-100 text-primary-700"
          >
            <span class="inline-block h-2 w-2 rounded-full bg-primary-400" />
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="rounded-lg bg-slate-100 p-4 text-xs text-slate-500">
      <p>
        Logged in as
        <strong class="text-slate-700">{{ displayName }}</strong>
      </p>
      <p v-if="displayEmail" class="mt-1 text-[11px] text-slate-400">
        {{ displayEmail }}
      </p>
      <button
        type="button"
        class="mt-3 text-xs font-semibold text-primary-600 hover:underline"
        @click="handleLogout"
      >
        Sign out
      </button>
    </div>
  </aside>
</template>
