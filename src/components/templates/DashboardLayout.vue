<script setup>
import MainSidebar from "@/components/organisms/MainSidebar.vue";
</script>

<template>
  <div class="flex h-screen min-h-0 bg-slate-100">
    <MainSidebar />
    <main class="flex-1 overflow-y-auto">
      <header class="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">Welcome back</h1>
          <p class="text-sm text-slate-500">Manage kanji collections and users</p>
        </div>
        <slot name="actions" />
      </header>
      <section class="space-y-6 p-8">
        <slot />
      </section>
    </main>
  </div>
</template>
