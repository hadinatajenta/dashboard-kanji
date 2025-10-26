<script setup>
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const navigation = [
  { label: "Dashboard", to: "/", icon: "space_dashboard" },
  { label: "Users", to: "/users", icon: "group" },
  { label: "Collections", to: "/collections", icon: "library_books" },
  { label: "Bunpo", to: "/bunpo", icon: "translate" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

const props = defineProps({
  variant: {
    type: String,
    default: "desktop",
    validator: (value) => ["desktop", "mobile"].includes(value),
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

const router = useRouter();
const authStore = useAuthStore();

const displayName = computed(() => authStore.user?.name || "Administrator");
const displayEmail = computed(() => authStore.user?.email || "");

const containerClasses = computed(() => {
  if (props.variant === "mobile") {
    return [
      "fixed inset-y-0 left-0 z-50 w-72 max-w-full bg-white shadow-xl",
      "flex flex-col gap-4 px-4 py-6 transition-transform duration-200 md:hidden",
      props.isOpen ? "translate-x-0" : "-translate-x-full",
    ];
  }

  return "hidden md:flex h-full w-64 flex-col gap-4 border-r border-slate-200 bg-white px-4 py-6";
});

const closeIfMobile = () => {
  if (props.variant === "mobile") {
    emit("close");
  }
};

const handleLogout = async () => {
  await authStore.logout("user clicked sign out");
  closeIfMobile();
  router.push({ name: "login" });
};

const handleNavigation = () => {
  closeIfMobile();
};
</script>

<template>
  <aside :class="containerClasses">
    <div class="flex items-center justify-between gap-2 px-2">
      <div class="flex items-center gap-2">
        <span
          class="grid h-10 w-10 place-items-center rounded-xl bg-primary-500 text-lg font-semibold text-white"
        >
          漢
        </span>
        <div>
          <p class="text-sm font-semibold text-slate-900">Kanji Dashboard</p>
          <p class="text-xs text-slate-500">Management Console</p>
        </div>
      </div>
      <button
        v-if="props.variant === 'mobile'"
        type="button"
        class="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
        @click="emit('close')"
      >
        <span class="material-symbols-rounded text-lg">close</span>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <nav class="flex-1">
      <ul class="space-y-1">
        <li v-for="item in navigation" :key="item.to">
          <RouterLink
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
            active-class="bg-primary-100 text-primary-700"
            @click="handleNavigation"
          >
            <span class="material-symbols-rounded text-xl text-primary-500/70">
              {{ item.icon }}
            </span>
            <span>{{ item.label }}</span>
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
        class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline"
        @click="handleLogout"
      >
        <span class="material-symbols-rounded text-base">logout</span>
        Sign out
      </button>
    </div>
  </aside>
</template>
