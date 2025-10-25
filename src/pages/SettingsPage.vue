<script setup>
import DashboardLayout from "@/components/templates/DashboardLayout.vue";
</script>

<template>
  <DashboardLayout>
    <div class="card">
      <header class="card-header">Settings</header>
      <div class="card-body text-sm text-slate-600 space-y-2">
        <p>
          Configure application preferences, authentication providers, and other
          environment specific toggles here.
        </p>
        <p class="text-xs text-slate-400">
          Tip: use Pinia stores and Axios services to persist these settings to
          your backend.
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>
