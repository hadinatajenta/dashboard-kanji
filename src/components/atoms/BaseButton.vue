<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Action",
  },
  variant: {
    type: String,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent";

const variants = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus-visible:outline-primary-600",
  ghost:
    "bg-transparent text-primary-600 hover:bg-primary-50 focus-visible:outline-primary-600",
};
</script>

<template>
  <button
    :class="[baseClasses, variants[props.variant] ?? variants.primary]"
    :disabled="props.disabled"
  >
    <slot>{{ props.label }}</slot>
  </button>
</template>
