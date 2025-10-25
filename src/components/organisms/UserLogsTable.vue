<script setup>
import { computed } from "vue";

const props = defineProps({
  logs: {
    type: Array,
    default: () => [],
  },
});

const hasLogs = computed(() => props.logs.length > 0);
</script>

<template>
  <div class="card">
    <header class="card-header">Recent Activity</header>
    <div class="card-body">
      <div v-if="!hasLogs" class="py-8 text-center text-sm text-slate-500">
        No logs recorded yet.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3">User ID</th>
              <th class="px-4 py-3">Action</th>
              <th class="px-4 py-3">Detail</th>
              <th class="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 bg-white">
            <tr v-for="log in logs" :key="log.id" class="hover:bg-slate-50">
              <td class="px-4 py-3 font-mono text-xs text-slate-500">{{ log.user_id }}</td>
              <td class="px-4 py-3 text-slate-700">{{ log.action }}</td>
              <td class="px-4 py-3 text-slate-600">{{ log.detail }}</td>
              <td class="px-4 py-3 text-slate-500">
                {{ new Date(log.created_at).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
