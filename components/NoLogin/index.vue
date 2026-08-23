<template>
  <div class="flex items-center justify-center py-16 px-4">
    <div class="w-full max-w-md text-center">

      <!-- Decorative tilted tag -->
      <div class="inline-block bg-[#fde047] border-2 border-black rounded px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6 -rotate-1 select-none">
        🔐 Truy cập bị hạn chế
      </div>

      <!-- Main card -->
      <div class="bg-white dark:bg-[#212121] border-2 border-black dark:border-white rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]">

        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="bg-[#fdf4ff] border-2 border-black rounded-full p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <img src="~/assets/images/icons-touch-id.png" alt="touchId" class="w-14 h-14 object-contain" />
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-2xl font-black text-black dark:text-white uppercase tracking-wide mb-3">
          {{ $t("please_login") }}
        </h1>

        <!-- Subtitle -->
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          {{ $t("title_please_login") }}
        </p>

        <!-- CTA -->
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 bg-[#d946ef] hover:bg-[#c026d3] text-white font-black px-7 py-3 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-sm uppercase tracking-wider">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          {{ $t("back_to_home") }}
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup></script>
