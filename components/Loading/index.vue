<template>
  <div
    v-if="loading"
    class="absolute bottom-0 left-0 right-0 z-10 bg-gray-500 top-0 opacity-55">
    <div class="flex justify-center h-full text-black">
      <div class="flex flex-col justify-center">
        <img
          width="100"
          height="100"
          src="~/assets/images/loading.gif"
          alt="loading" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean,
});
</script>

<style lang="scss" scoped></style>
