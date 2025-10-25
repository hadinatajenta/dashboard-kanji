<script setup>
import BaseCard from "@/components/atoms/BaseCard.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  delta: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <BaseCard>
    <template #header>{{ title }}</template>
    <div class="flex items-end justify-between gap-2">
      <p class="text-3xl font-semibold tracking-tight text-slate-900">
        {{ value }}
      </p>
      <span
        v-if="delta"
        class="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
      >
        {{ delta }}
      </span>
    </div>
  </BaseCard>
</template>
