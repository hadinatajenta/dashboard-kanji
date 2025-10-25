<script setup>
import { computed } from "vue";
import BaseButton from "@/components/atoms/BaseButton.vue";

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["change"]);

const canPrev = computed(() => props.page > 1);
const canNext = computed(() => props.page < props.totalPages);

const goPrev = () => {
  if (canPrev.value) emit("change", props.page - 1);
};

const goNext = () => {
  if (canNext.value) emit("change", props.page + 1);
};
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <p class="text-xs text-slate-500">
      Page {{ props.page }} of {{ props.totalPages || 1 }}
    </p>
    <div class="flex items-center gap-2">
      <BaseButton
        variant="ghost"
        :disabled="!canPrev"
        @click="goPrev"
      >
        Previous
      </BaseButton>
      <BaseButton
        variant="ghost"
        :disabled="!canNext"
        @click="goNext"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>
