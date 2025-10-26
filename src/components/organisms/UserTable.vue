<script setup>
import { computed } from "vue";

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  selectedReference: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["select"]);

const hasUsers = computed(() => props.users.length > 0);

const sortedUsers = computed(() =>
  [...props.users].sort((a, b) => {
    const dateA = a.last_login_at ? new Date(a.last_login_at).getTime() : 0;
    const dateB = b.last_login_at ? new Date(b.last_login_at).getTime() : 0;
    return dateB - dateA;
  }),
);

const formatDateTime = (value) => {
  if (!value) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk.charAt(0).toUpperCase())
    .join("") || "U";

const providerTheme = (provider = "") => {
  const normalized = provider.toLowerCase();
  if (normalized === "google") {
    return {
      chip: "bg-[#E8F0FE] text-[#1A73E8]",
      dot: "bg-[#1A73E8]",
      label: "Google",
    };
  }

  return {
    chip: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
    label: provider ? provider.toUpperCase() : "UNKNOWN",
  };
};

const isSelected = (reference) =>
  props.selectedReference && reference && props.selectedReference === reference;

const handleSelect = (user) => {
  emit("select", user);
};
</script>

<template>
  <section
    class="rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40"
  >
    <header
      class="flex flex-col gap-4 rounded-t-2xl border-b border-slate-200 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h2 class="text-lg font-semibold">User Directory</h2>
        <p class="text-sm text-primary-100/90">
          Monitor who has access to the dashboard and their latest activity.
        </p>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <span
          class="rounded-full bg-white/20 px-4 py-1 font-medium text-white backdrop-blur"
        >
          Total users · {{ sortedUsers.length }}
        </span>
      </div>
    </header>

    <div class="p-4 sm:p-6">
      <div v-if="!hasUsers" class="py-10 text-center text-sm text-slate-500">
        <p class="font-medium text-slate-600">No users yet</p>
        <p class="mt-1 text-xs text-slate-400">
          Users will appear here after authenticating via Google.
        </p>
      </div>

      <div v-else class="space-y-5">
        <!-- Mobile cards -->
        <div class="grid gap-4 md:hidden">
          <article
            v-for="user in sortedUsers"
            :key="user.reference"
            :class="[
              'rounded-xl border p-4 shadow-sm transition hover:shadow-md',
              isSelected(user.reference)
                ? 'border-primary-300 bg-primary-50/70 shadow-primary-200/60'
                : 'border-slate-200 bg-white shadow-slate-200/30',
            ]"
            role="button"
            tabindex="0"
            @click="handleSelect(user)"
            @keyup.enter="handleSelect(user)"
          >
            <div class="flex items-start gap-3">
              <div
                :class="[
                  'grid h-11 w-11 place-items-center rounded-full text-sm font-semibold',
                  isSelected(user.reference)
                    ? 'bg-primary-500 text-white'
                    : 'bg-primary-100 text-primary-700',
                ]"
              >
                <img
                  v-if="user.picture_url"
                  :src="user.picture_url"
                  alt="avatar"
                  class="h-11 w-11 rounded-full object-cover"
                />
                <span v-else>{{ initials(user.name) }}</span>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-slate-900">
                  {{ user.name }}
                </p>
                <p class="text-xs text-slate-500">{{ user.email }}</p>
                <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span
                    :class="[
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium',
                      providerTheme(user.provider).chip,
                    ]"
                  >
                    <span
                      class="h-1.5 w-1.5 rounded-full"
                      :class="providerTheme(user.provider).dot"
                    />
                    {{ providerTheme(user.provider).label }}
                  </span>
                  <span class="text-slate-400">·</span>
                  <span class="text-slate-500">{{ formatDateTime(user.last_login_at) }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Desktop table -->
        <div class="hidden md:block">
          <div class="overflow-hidden rounded-xl border border-slate-200">
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-slate-50">
                <tr class="text-left text-xs font-semibold uppercase text-slate-500">
                  <th class="px-6 py-3">User</th>
                  <th class="px-6 py-3">Email</th>
                  <th class="px-6 py-3">Provider</th>
                  <th class="px-6 py-3">Last login</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 bg-white text-sm">
                <tr
                  v-for="user in sortedUsers"
                  :key="user.reference"
                  :class="[
                    'cursor-pointer transition hover:bg-slate-50/70',
                    isSelected(user.reference) ? 'bg-primary-50/70' : '',
                  ]"
                  @click="handleSelect(user)"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        :class="[
                          'grid h-10 w-10 place-items-center rounded-full text-xs font-semibold',
                          isSelected(user.reference)
                            ? 'bg-primary-500 text-white'
                            : 'bg-primary-100 text-primary-700',
                        ]"
                      >
                        <img
                          v-if="user.picture_url"
                          :src="user.picture_url"
                          alt="avatar"
                          class="h-10 w-10 rounded-full object-cover"
                        />
                        <span v-else>{{ initials(user.name) }}</span>
                      </div>
                      <div>
                        <p class="font-semibold text-slate-900">
                          {{ user.name }}
                        </p>
                        <p class="text-xs text-slate-400">
                          Joined {{ formatDateTime(user.created_at) }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-600">{{ user.email }}</td>
                  <td class="px-6 py-4">
                    <span
                      :class="[
                        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                        providerTheme(user.provider).chip,
                      ]"
                    >
                      <span
                        class="h-1.5 w-1.5 rounded-full"
                        :class="providerTheme(user.provider).dot"
                      />
                      {{ providerTheme(user.provider).label }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-500">
                    {{ formatDateTime(user.last_login_at) }}
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

