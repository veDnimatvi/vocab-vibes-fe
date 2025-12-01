<script setup>
const props = defineProps({
  class: { type: String, default: "" },
});

onMounted(() => {
  const el = document.querySelector(".adsbygoogle");
  if (el && !el.getAttribute("data-adsbygoogle-status")) {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
});
</script>

<template>
  <ins
    class="adsbygoogle"
    style="display: block"
    data-ad-client="ca-pub-4514641971794594"
    data-ad-slot="5204322267"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
</template>
