<script setup>
import BaseButton from "@/components/atoms/BaseButton.vue";
import StatTile from "@/components/molecules/StatTile.vue";
import DashboardLayout from "@/components/templates/DashboardLayout.vue";
</script>

<template>
  <DashboardLayout>
    <template #actions>
      <BaseButton label="Add Collection" />
    </template>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatTile title="Total Kanjis" value="1,246" delta="+32%" />
      <StatTile title="Study Groups" value="48" delta="+12%" />
      <StatTile title="Active Users" value="8,421" delta="+5%" />
      <StatTile title="Pending Reviews" value="213" />
    </div>

    <div class="card">
      <header class="card-header">Recent Activity</header>
      <div class="card-body space-y-3 text-sm text-slate-600">
        <p>• New kanji “語” added to Advanced N3 collection.</p>
        <p>• User Ayumi assigned to Intermediate review track.</p>
        <p>• System generated 14 new practice quizzes.</p>
      </div>
    </div>
  </DashboardLayout>
</template>
