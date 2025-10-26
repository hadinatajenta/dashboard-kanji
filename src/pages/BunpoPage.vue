<script setup>
import DashboardLayout from "@/components/templates/DashboardLayout.vue";
</script>

<template>
  <DashboardLayout>
    <section class="space-y-6">
      <header class="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200/50">
        <h1 class="text-xl font-semibold text-slate-900">Bunpo Playground</h1>
        <p class="mt-2 text-sm text-slate-500">
          This space is ready for Bunpo integrations. The test endpoint currently
          responds with <span class="font-medium text-primary-600">"endpoint success"</span>.
        </p>
      </header>
      <article class="rounded-2xl border border-dashed border-primary-200 bg-primary-50/60 p-6 text-sm text-primary-700">
        <p>
          Hook additional UI components here as the Bunpo feature evolves—charts,
          cards, or rich editors can live inside this section.
        </p>
      </article>
    </section>
  </DashboardLayout>
</template>
