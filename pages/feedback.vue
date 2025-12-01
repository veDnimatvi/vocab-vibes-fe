<template>
  <div class="flex justify-center rounded">
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSdeXU3wjYHrMDRZbARICUcYnxnb04zpwtqVzdd4ITYIcJOi3w/viewform?embedded=true"
      width="640"
      height="600"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      >Đang tải…</iframe
    >
  </div>
  <Adsense />
</template>

<script setup>
import Adsense from "~/components/Adsense.vue";

useHead({
  title: "VocabVibes Feedback",
});
</script>

<style lang="scss" scoped></style>
