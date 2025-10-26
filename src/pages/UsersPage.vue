<script setup>
import { onMounted, ref } from "vue";

import DashboardLayout from "@/components/templates/DashboardLayout.vue";
import UserTable from "@/components/organisms/UserTable.vue";
import UserLogsTable from "@/components/organisms/UserLogsTable.vue";
import { fetchUsers, fetchUserLogsByUser } from "@/services/userService";

const users = ref([]);
const totalUsers = ref(0);
const isLoadingUsers = ref(false);
const userError = ref("");

const selectedUser = ref(null);
const selectedUserLogs = ref([]);
const selectedLogsTotal = ref(0);
const isLoadingSelectedLogs = ref(false);
const selectedLogsError = ref("");

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

const loadSelectedUserLogs = async () => {
  if (!selectedUser.value) {
    selectedUserLogs.value = [];
    selectedLogsTotal.value = 0;
    selectedLogsError.value = "";
    return;
  }

  try {
    isLoadingSelectedLogs.value = true;
    selectedLogsError.value = "";
    const response = await fetchUserLogsByUser(selectedUser.value.reference, {
      page: 1,
      page_size: 10,
    });
    selectedUserLogs.value = response.data?.items ?? [];
    selectedLogsTotal.value =
      response.data?.meta?.total_items ?? selectedUserLogs.value.length;
  } catch (error) {
    console.error("Failed to fetch selected user logs", error);
    selectedLogsError.value = "Unable to load selected user activity.";
    selectedUserLogs.value = [];
    selectedLogsTotal.value = 0;
  } finally {
    isLoadingSelectedLogs.value = false;
  }
};

const handleUserSelect = (user) => {
  if (selectedUser.value && selectedUser.value.reference === user.reference) {
    selectedUser.value = null;
    selectedUserLogs.value = [];
    selectedLogsTotal.value = 0;
    selectedLogsError.value = "";
    return;
  }

  selectedUser.value = user;
  loadSelectedUserLogs();
};

const clearSelectedUser = () => {
  selectedUser.value = null;
  selectedUserLogs.value = [];
  selectedLogsTotal.value = 0;
  selectedLogsError.value = "";
};

onMounted(async () => {
  await loadUsers();
});
</script>

<template>
  <DashboardLayout>
    <section class="space-y-6">
      <div class="space-y-4">
        <div
          v-if="isLoadingUsers"
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <span class="h-3 w-3 animate-pulse rounded-full bg-primary-500" />
            <p class="text-sm text-slate-500">Fetching users…</p>
          </div>
          <div class="mt-5 space-y-3">
            <div
              v-for="index in 3"
              :key="index"
              class="h-12 rounded-lg bg-slate-100/80"
            />
          </div>
        </div>
        <div
          v-else-if="userError"
          class="rounded-2xl border border-red-200 bg-white p-6 text-sm text-red-600 shadow-sm"
        >
          {{ userError }}
        </div>
        <template v-else>
          <UserTable
            :users="users"
            :selected-reference="selectedUser?.reference ?? ''"
            @select="handleUserSelect"
          />
          <p class="text-xs text-slate-400">Total users: {{ totalUsers }}</p>
        </template>
      </div>

      <div
        v-if="selectedUser"
        class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40"
      >
        <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-sm font-semibold text-slate-900">
              {{ selectedUser.name }}
            </p>
            <p class="text-xs text-slate-500">{{ selectedUser.email }}</p>
          </div>
          <button
            type="button"
            class="text-xs font-semibold text-primary-600 hover:underline"
            @click="clearSelectedUser"
          >
            Clear selection
          </button>
        </div>
        <div
          v-if="isLoadingSelectedLogs"
          class="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm"
        >
          Loading selected user activity…
        </div>
        <div
          v-else-if="selectedLogsError"
          class="rounded-xl border border-red-200 bg-white p-4 text-sm text-red-600 shadow-sm"
        >
          {{ selectedLogsError }}
        </div>
        <UserLogsTable
          v-else
          :logs="selectedUserLogs"
          :total="selectedLogsTotal"
          :title="`Activity · ${selectedUser.name}`"
          :subtitle="`Latest actions associated with ${selectedUser.email}`"
        />
      </div>

      <div
        v-else
        class="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 shadow-sm"
      >
        Select a user from the directory to review their recent activity.
      </div>
    </section>
  </DashboardLayout>
</template>
