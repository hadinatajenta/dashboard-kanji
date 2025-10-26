<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseCard from "@/components/atoms/BaseCard.vue";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const status = ref("Processing login...");
const isError = ref(false);

onMounted(() => {
  const { token, name, email, picture } = route.query;

  if (!token || typeof token !== "string") {
    status.value = "Missing access token. Please try signing in again.";
    isError.value = true;
    return;
  }

  authStore.setAuth({
    token,
    user: {
      name: typeof name === "string" ? name : "",
      email: typeof email === "string" ? email : "",
      picture: typeof picture === "string" ? picture : "",
    },
  });

  status.value = "Login successful. Redirecting...";

  setTimeout(() => {
    router.replace({ name: "dashboard" });
  }, 800);
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100">
    <BaseCard>
      <template #header>Authenticating</template>
      <p
        :class="[
          'text-sm',
          isError ? 'text-red-600' : 'text-slate-600',
        ]"
      >
        {{ status }}
      </p>
      <p v-if="isError" class="mt-2 text-xs text-slate-500">
        We could not verify your account. Please return to the login page and try
        again.
      </p>
    </BaseCard>
  </div>
</template>

