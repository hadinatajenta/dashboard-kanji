<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 text-center">
    <p class="text-9xl font-black text-primary-100">401</p>
    <h1 class="mt-4 text-3xl font-semibold text-slate-900">Unauthorized</h1>
    <p class="mt-2 max-w-md text-sm text-slate-500">
      You do not have permission to access the Kanji dashboard with this account.
      Please sign in using an authorised administrator profile.
    </p>
    <RouterLink
      class="mt-6 inline-flex items-center rounded-lg bg-primary-500 px-5 py-2 text-sm font-medium text-white hover:bg-primary-600"
      :to="{ name: 'login' }"
    >
      Back to login
    </RouterLink>
  </div>
</template>
