<script setup lang="ts">
import LayoutUnit from "~/components/LayoutUnit/index.vue";
const appConfig = useAppConfig();
</script>

<template>
  <UApp :toaster="appConfig.toaster">
    <LayoutUnit>
      <NuxtPwaManifest />
      <NuxtPage />
    </LayoutUnit>
  </UApp>
</template>
