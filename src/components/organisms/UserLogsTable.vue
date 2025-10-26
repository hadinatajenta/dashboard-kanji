<script setup>
import { computed } from "vue";

const props = defineProps({
  logs: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: undefined,
  },
  title: {
    type: String,
    default: "Recent Activity",
  },
  subtitle: {
    type: String,
    default: "Track the most recent actions taken inside your dashboard.",
  },
});

const hasLogs = computed(() => props.logs.length > 0);

const timelineLogs = computed(() =>
  [...props.logs].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  }),
);

const totalLogs = computed(() => props.total ?? timelineLogs.value.length);

const formatDateTime = (value) => {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const actionTheme = (action = "") => {
  const normalized = action.toLowerCase();

  if (normalized === "login") {
    return {
      chip: "bg-emerald-50 text-emerald-600",
      dot: "bg-emerald-500",
      label: "Login",
    };
  }

  if (normalized === "logout") {
    return {
      chip: "bg-rose-50 text-rose-600",
      dot: "bg-rose-500",
      label: "Logout",
    };
  }

  return {
    chip: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
    label: action || "Activity",
  };
};
</script>

<template>
  <section
    class="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/30"
  >
    <header
      class="flex items-center justify-between gap-3 rounded-t-2xl border-b border-slate-200 bg-slate-900 px-6 py-5 text-white"
    >
      <div>
        <h2 class="text-lg font-semibold">{{ props.title }}</h2>
        <p class="text-sm text-slate-200/80">
          {{ props.subtitle }}
        </p>
      </div>
      <div
        v-if="hasLogs"
        class="rounded-full bg-white/15 px-4 py-1 text-xs font-medium text-white backdrop-blur"
      >
        Showing {{ Math.min(timelineLogs.length, 10) }} of {{ totalLogs }} logs
      </div>
    </header>

    <div class="space-y-5 p-4 sm:p-6">
      <div v-if="!hasLogs" class="py-10 text-center text-sm text-slate-500">
        <p class="font-medium text-slate-600">No activity recorded</p>
        <p class="mt-1 text-xs text-slate-400">
          Actions performed by users will be listed here in real-time.
        </p>
      </div>

      <div v-else class="space-y-6">
        <!-- Mobile timeline -->
        <ol class="relative space-y-5 border-l border-slate-200 md:hidden">
          <li
            v-for="(log, index) in timelineLogs"
            :key="`${log.user_name}-${log.created_at}-${index}`"
            class="ml-4 space-y-3 rounded-xl bg-slate-50/70 px-4 py-3 shadow-sm"
          >
            <span
              class="absolute -left-[9px] top-3 h-2.5 w-2.5 rounded-full border border-white"
              :class="actionTheme(log.action).dot"
            />
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>{{ formatDateTime(log.created_at) }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">
                {{ log.user_name || "Unknown user" }}
              </p>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span
                :class="[
                  'inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold',
                  actionTheme(log.action).chip,
                ]"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="actionTheme(log.action).dot" />
                {{ actionTheme(log.action).label }}
              </span>
              <span>{{ log.detail || "—" }}</span>
            </div>
          </li>
        </ol>

        <!-- Desktop table -->
        <div class="hidden md:block">
          <div class="overflow-hidden rounded-xl border border-slate-200">
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-slate-50">
                <tr class="text-left text-xs font-semibold uppercase text-slate-500">
                  <th class="px-6 py-3">User</th>
                  <th class="px-6 py-3">Action</th>
                  <th class="px-6 py-3">Detail</th>
                  <th class="px-6 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 bg-white text-sm">
                <tr
                  v-for="(log, index) in timelineLogs"
                  :key="`${log.user_name}-${log.created_at}-${index}`"
                  class="transition hover:bg-slate-50/70"
                >
                  <td class="px-6 py-4">
                    <p class="font-semibold text-slate-900">
                      {{ log.user_name || "Unknown user" }}
                    </p>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      :class="[
                        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
                        actionTheme(log.action).chip,
                      ]"
                    >
                      <span
                        class="h-1.5 w-1.5 rounded-full"
                        :class="actionTheme(log.action).dot"
                      />
                      {{ actionTheme(log.action).label }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-600">
                    {{ log.detail || "—" }}
                  </td>
                  <td class="px-6 py-4 text-slate-500">
                    {{ formatDateTime(log.created_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

