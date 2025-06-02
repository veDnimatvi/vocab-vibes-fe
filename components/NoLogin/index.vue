<template>
  <div class="flex items-center justify-center p-4">
    <div class="w-full max-w-2xl relative z-10 text-center">
      <div
        class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-0">
        <div class="flex justify-center mb-5">
          <img src="~/assets/images/icons-touch-id.png" alt="touchId" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ $t("please_login") }}
        </h1>
        <p class="text-lg text-gray-600 mb-8">
          {{ $t("title_please_login") }}
        </p>

        <NuxtLink
          to="/"
          class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105">
          {{ $t("back_to_home") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>
