<script setup>
import { onMounted, reactive, ref } from "vue";

import DashboardLayout from "@/components/templates/DashboardLayout.vue";
import UserTable from "@/components/organisms/UserTable.vue";
import UserLogsTable from "@/components/organisms/UserLogsTable.vue";
import PaginationControls from "@/components/organisms/PaginationControls.vue";
import { fetchUsers, fetchUserLogs } from "@/services/userService";

const users = ref([]);
const totalUsers = ref(0);
const isLoadingUsers = ref(false);
const userError = ref("");

const logs = ref([]);
const logsMeta = reactive({
  page: 1,
  totalPages: 1,
  totalItems: 0,
});
const isLoadingLogs = ref(false);
const logsError = ref("");

const loadUsers = async () => {
  try {
    isLoadingUsers.value = true;
    const response = await fetchUsers();
    users.value = response.data?.users ?? [];
    totalUsers.value = response.data?.count ?? users.value.length;
  } catch (error) {
    console.error("Failed to fetch users", error);
    userError.value = "Unable to load users.";
  } finally {
    isLoadingUsers.value = false;
  }
};

const loadLogs = async () => {
  try {
    isLoadingLogs.value = true;
    const response = await fetchUserLogs({
      page: logsMeta.page,
      page_size: 10,
    });
    logs.value = response.data?.items ?? [];
    logsMeta.totalPages = response.data?.meta?.total_pages ?? 1;
    logsMeta.totalItems = response.data?.meta?.total_items ?? logs.value.length;
  } catch (error) {
    console.error("Failed to fetch user logs", error);
    logsError.value = "Unable to load activity logs.";
  } finally {
    isLoadingLogs.value = false;
  }
};

const handleLogsPageChange = (page) => {
  logsMeta.page = page;
  loadLogs();
};

onMounted(async () => {
  await Promise.all([loadUsers(), loadLogs()]);
});
</script>

<template>
  <DashboardLayout>
    <section class="grid gap-6 lg:grid-cols-5">
      <div class="lg:col-span-3 space-y-4">
        <div v-if="isLoadingUsers" class="card">
          <div class="card-body text-sm text-slate-500">Loading users...</div>
        </div>
        <div v-else-if="userError" class="card">
          <div class="card-body text-sm text-red-500">{{ userError }}</div>
        </div>
        <UserTable v-else :users="users" />
        <p class="text-xs text-slate-400">Total users: {{ totalUsers }}</p>
      </div>
      <div class="lg:col-span-2 space-y-4">
        <div v-if="isLoadingLogs" class="card">
          <div class="card-body text-sm text-slate-500">Loading logs...</div>
        </div>
        <div v-else-if="logsError" class="card">
          <div class="card-body text-sm text-red-500">{{ logsError }}</div>
        </div>
        <template v-else>
          <UserLogsTable :logs="logs" />
          <PaginationControls
            :page="logsMeta.page"
            :total-pages="logsMeta.totalPages"
            @change="handleLogsPageChange"
          />
        </template>
      </div>
    </section>
  </DashboardLayout>
</template>
