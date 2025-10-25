<script setup>
import BaseButton from "@/components/atoms/BaseButton.vue";

const backendURL = import.meta.env.VITE_BE_API ?? "http://localhost:8080";

const resolvedBackendURL = backendURL.startsWith("http")
  ? backendURL
  : `http://${backendURL}`;

const handleGoogleLogin = () => {
  const target = new URL("/auth/google/login", resolvedBackendURL);
  window.location.href = target.toString();
};
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-100 via-white to-slate-100"
  >
    <div class="card max-w-md w-full">
      <header class="card-header">
        <h1 class="text-xl font-semibold text-slate-900">Sign in to Kanji Desk</h1>
        <p class="mt-1 text-sm text-slate-500">
          Manage kanji collections and monitor usage analytics.
        </p>
      </header>
      <div class="card-body space-y-6">
        <BaseButton class="w-full" @click="handleGoogleLogin">
          Continue with Google
        </BaseButton>
        <p class="text-xs leading-relaxed text-slate-400">
          By continuing you agree to our privacy policy. We only request basic
          profile information to provide personalised experiences.
        </p>
      </div>
    </div>
  </div>
</template>
