<script setup>
import { computed } from "vue";

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
});

const hasUsers = computed(() => props.users.length > 0);
</script>

<template>
  <div class="card">
    <header class="card-header">Users</header>
    <div class="card-body">
      <div v-if="!hasUsers" class="py-8 text-center text-sm text-slate-500">
        No users to display yet.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Provider</th>
              <th class="px-4 py-3">Last login</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 bg-white">
            <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img
                    v-if="user.picture_url"
                    :src="user.picture_url"
                    alt="avatar"
                    class="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p class="font-medium text-slate-900">{{ user.name }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ user.email }}</td>
              <td class="px-4 py-3 text-slate-600">{{ user.provider }}</td>
              <td class="px-4 py-3 text-slate-500">
                {{ new Date(user.last_login_at).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
