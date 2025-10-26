<script setup>
import { ref } from "vue";
import MainSidebar from "@/components/organisms/MainSidebar.vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div class="flex h-screen flex-col bg-slate-100 md:flex-row">
    <MainSidebar variant="desktop" />

    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
        @click="closeSidebar"
      />
    </transition>

    <MainSidebar
      variant="mobile"
      :is-open="isSidebarOpen"
      @close="closeSidebar"
    />

    <main class="flex flex-1 flex-col overflow-hidden">
      <header
        class="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-8 sm:py-5"
      >
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 md:hidden"
            @click="toggleSidebar"
          >
            <span class="sr-only">Toggle sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div>
            <h1 class="text-xl font-semibold text-slate-900 sm:text-2xl">Welcome back</h1>
            <p class="text-sm text-slate-500">Manage kanji collections and users</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <slot name="actions" />
        </div>
      </header>
      <section class="flex-1 overflow-y-auto space-y-6 p-4 sm:p-8">
        <slot />
      </section>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
