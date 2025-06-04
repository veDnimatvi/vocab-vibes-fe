<template>
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-6">
      {{ $t("banner") }}
    </h1>
    <p class="text-lg mb-8 max-w-3xl mx-auto">
      {{ $t("intro") }}
    </p>
    <UButton
      size="lg"
      class="text-white cursor-pointer bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-lg px-8 py-4">
      <NuxtLink to="/practice">{{ $t("let_start") }}</NuxtLink>
      <UIcon name="i-lucide-chevron-right" class="z-1 pt-2 ml-2 w-5 h-5" />
    </UButton>

    <section class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ $t("why") }}
          </h2>
          <p class="text-xl">
            {{ $t("why_title") }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          class="cursor-pointer rounded border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-xl transition-all duration-300">
          <div class="p-8 text-center">
            <div
              class="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-brain" class="z-1 w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t("smart_learn") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("smart_learn_desc") }}
            </p>
          </div>
        </div>
        <div
          class="cursor-pointer rounded border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300">
          <div class="p-8 text-center">
            <div
              class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-target" class="z-1 w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t("we_diff") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("we_diff_desc") }}
            </p>
          </div>
        </div>

        <div
          class="cursor-pointer rounded border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-xl transition-all duration-300">
          <div class="p-8 text-center">
            <div
              class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-zap" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t("vocab_in_your") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("vocab_in_your_desc") }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "VocabVibes - Ghi nhớ từ vựng hiệu quả mỗi ngày",
  meta: [
    {
      name: "author",
      content: "Vitamindev",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "application-name",
      content: "VocabVibes",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "VocabVibes",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "description",
      content:
        "VocabVibes giúp bạn lưu trữ và ôn tập từ vựng tiếng Anh theo cách cá nhân hóa, hiệu quả và thú vị mỗi ngày. Bắt đầu miễn phí ngay hôm nay!",
    },
    {
      name: "keywords",
      content:
        "học từ vựng,từ vựng tiếng Anh,học tiếng Anh,học từ vựng thông minh,nền tảng học từ vựng,ghi nhớ từ vựng,ôn tập từ vựng,luyện tập từ vựng,vocabvibes,học từ vựng tiếng Anh hiệu quả,luyện tập từ vựng tiếng Anh,ứng dụng luyện tập từ vựng tiếng Anh,web luyện tập từ vựng tiếng Anh,app luyện tập từ vựng tiếng Anh,cách ôn tập từ vựng tiếng Anh không bị quên,ứng dụng luyện từ vựng tiếng Anh miễn phí hiệu quả nhất,luyện tập từ vựng tiếng Anh qua trò chơi tương tác,ôn tập từ vựng tiếng Anh để giao tiếp hàng ngày,ôn tập từ vựng tiếng Anh thi Toeic cấp tốc,ôn tập từ vựng tiếng Anh phục vụ du học Mỹ,luyện tập từ vựng tiếng Anh cho người mới bắt đầu,luyện từ vựng tiếng Anh cho học sinh tiểu học,luyện từ vựng tiếng Anh cho học sinh lớp 12 ôn thi THPT,luyện từ vựng tiếng Anh cho người đi làm bận rộn,cách học 100 từ vựng tiếng Anh mỗi tuần,kế hoạch luyện tập từ vựng tiếng Anh trong 7 ngày,lộ trình ôn tập từ vựng tiếng Anh trong 1 tháng,mẹo ghi nhớ 50 từ vựng tiếng Anh mỗi ngày",
    },
    {
      property: "og:title",
      content: "VocabVibes - Ghi nhớ từ vựng hiệu quả mỗi ngày",
    },
    {
      property: "og:description",
      content:
        "Lưu trữ và luyện tập từ vựng tiếng Anh một cách cá nhân hóa và thông minh cùng VocabVibes.",
    },
    {
      property: "og:image",
      content: "~/assets/images/logo.png",
    },
    {
      property: "og:url",
      content: "https://vocabvibes.io.vn/",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "VocabVibes",
    },
    {
      name: "twitter:title",
      content: "VOCABVIBES - Ghi nhớ từ vựng hiệu quả mỗi ngày",
    },
    {
      name: "twitter:description",
      content:
        "Lưu trữ và luyện tập từ vựng tiếng Anh một cách cá nhân hóa và thông minh cùng VocabVibes.",
    },
    {
      name: "twitter:image",
      content: "~/assets/images/logo.png",
    },
  ],
});
</script>

<style lang="css" scoped></style>
