<template>
  <div class="w-full">
    <!-- Hero Section -->
    <div class="max-w-5xl mx-auto px-4 text-center lg:text-left py-10 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Column: Copy & Actions -->
        <div class="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <!-- Skewed Badge -->
          <div class="inline-block bg-[#fde047] text-black font-black px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-2 mb-8 text-xs uppercase tracking-widest font-mono">
            #1 Daily Learning App
          </div>
          
          <!-- Heading -->
          <h1 class="text-4xl md:text-6xl font-black leading-[1.15] mb-8 text-black dark:text-white tracking-tight">
            <span v-html="formattedBanner"></span>
          </h1>
          
          <!-- Intro Description -->
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl leading-relaxed">
            {{ $t("intro") }}
          </p>
          
          <!-- Neobrutalism Buttons -->
          <div class="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <NuxtLink
              to="/practice"
              class="inline-flex items-center justify-center bg-[#be185d] hover:bg-[#ca1a63] text-white font-extrabold px-8 py-4.5 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-base select-none">
              <span>{{ $t("let_start") }}</span>
              <UIcon name="i-lucide-arrow-right" class="w-5 h-5 ml-2.5" />
            </NuxtLink>
            
            <a
              href="#why-section"
              class="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-black font-extrabold px-8 py-4.5 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-base select-none">
              {{ locale === 'en' ? 'See how it works' : 'Xem cách nó hoạt động' }}
            </a>
          </div>
        </div>

        <!-- Right Column: Interactive Graphic Card -->
        <div class="lg:col-span-5 flex justify-center lg:justify-end">
          <div class="relative w-[340px] h-[340px] md:w-[380px] md:h-[380px] bg-purple-50 dark:bg-purple-950/20 border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-full flex items-center justify-center">
            
            <!-- Floating shapes -->
            <div class="absolute top-10 left-2 w-8 h-8 bg-[#d946ef] border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-12"></div>
            <div class="absolute bottom-16 right-2 w-6 h-6 bg-purple-500 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
            <div class="absolute top-24 right-4 w-7 h-7 bg-[#d946ef] border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-45"></div>

            <!-- Streak badge -->
            <div class="absolute -top-4 -right-2 bg-[#78350f] text-amber-200 font-extrabold px-3 py-3 border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-12 text-center flex flex-col items-center justify-center w-20 h-20 z-10 select-none">
              <span class="text-xs leading-none uppercase">100+</span>
              <span class="text-[9px] leading-none uppercase tracking-wider">Streak</span>
            </div>

            <!-- Neobrutalist Zine Card -->
            <div class="relative bg-white text-black w-[280px] md:w-[310px] p-6 border-2 border-black rounded shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3 select-none text-left">
              <div class="flex justify-between items-start mb-4">
                <span class="text-[10px] font-black tracking-widest text-[#d946ef] uppercase font-mono">Word of the Day</span>
                <div class="w-7 h-7 rounded-full border border-black flex items-center justify-center bg-white">
                  <UIcon name="i-lucide-bookmark" class="w-4 h-4 text-black" />
                </div>
              </div>
              
              <h2 class="text-3xl font-extrabold mb-1 tracking-tight text-black">Serendipity</h2>
              <div class="text-xs text-gray-500 font-mono mb-4">/ˌserənˈdipədē/ • n.</div>
              
              <hr class="border-t-2 border-[#d946ef] mb-4" />
              
              <p class="text-sm font-medium text-gray-800 leading-relaxed mb-6">
                Sự may mắn khi tìm thấy những điều giá trị một cách tình cờ.
              </p>
              
              <div class="flex gap-2">
                <span class="text-[10px] font-black px-2.5 py-1 border border-[#d946ef] text-[#d946ef] rounded-full uppercase tracking-wider font-mono bg-white">Literature</span>
                <span class="text-[10px] font-black px-2.5 py-1 border border-purple-500 text-purple-500 rounded-full uppercase tracking-wider font-mono bg-white">Nature</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <!-- Why Choose Us Section -->
    <div id="why-section" class="-mx-5 lg:-mx-56 px-5 lg:px-56 py-16 lg:py-24 bg-[#18181b] text-white">
      <div class="max-w-5xl mx-auto px-4">
        
        <div class="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16 text-left">
          <h2 class="text-4xl md:text-5xl font-black text-white lg:max-w-md leading-tight" v-html="formattedWhy"></h2>
          <p class="text-lg text-gray-400 lg:max-w-xl leading-relaxed lg:pt-2">
            {{ $t("why_title") }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="border-2 border-zinc-800 rounded-lg p-8 bg-transparent text-left flex flex-col h-full hover:border-[#f97316] transition-colors duration-300">
            <div class="w-8 h-8 flex items-center justify-center font-extrabold text-black bg-[#f97316] border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 text-sm">
              1
            </div>
            <h3 class="text-xl font-black text-white mb-4">
              {{ $t("smart_learn") }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ $t("smart_learn_desc") }}
            </p>
          </div>

          <!-- Card 2 -->
          <div class="border-2 border-zinc-800 rounded-lg p-8 bg-transparent text-left flex flex-col h-full hover:border-[#d946ef] transition-colors duration-300">
            <div class="w-8 h-8 flex items-center justify-center font-extrabold text-black bg-[#d946ef] border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 text-sm">
              2
            </div>
            <h3 class="text-xl font-black text-white mb-4">
              {{ $t("we_diff") }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ $t("we_diff_desc") }}
            </p>
          </div>

          <!-- Card 3 -->
          <div class="border-2 border-zinc-800 rounded-lg p-8 bg-transparent text-left flex flex-col h-full hover:border-[#8b5cf6] transition-colors duration-300">
            <div class="w-8 h-8 flex items-center justify-center font-extrabold text-black bg-[#8b5cf6] border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 text-sm">
              3
            </div>
            <h3 class="text-xl font-black text-white mb-4">
              {{ $t("vocab_in_your") }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ $t("vocab_in_your_desc") }}
            </p>
          </div>
        </div>
        
      </div>
    </div>

    <!-- CTA Section -->
    <div class="-mx-5 lg:-mx-56 px-5 lg:px-56 py-20 lg:py-28 bg-[#6d28d9] text-white text-center relative overflow-hidden">
      <!-- Watermark Background Lines -->
      <div class="absolute inset-0 select-none pointer-events-none flex flex-col justify-around items-center opacity-[0.08] font-black text-7xl md:text-8xl tracking-[0.2em] text-black uppercase">
        <div>LEARN LEARN LEARN</div>
        <div>LEARN LEARN LEARN</div>
        <div>LEARN LEARN LEARN</div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-4">
        <h2 class="text-4xl md:text-5xl font-black mb-12 tracking-tight leading-tight max-w-2xl">
          {{ locale === 'en' ? 'Ready to break language barriers?' : 'Sẵn sàng bứt phá ngôn ngữ?' }}
        </h2>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <NuxtLink
            to="/practice"
            class="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-black font-extrabold px-8 py-4.5 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-lg uppercase tracking-wider font-mono">
            {{ locale === 'en' ? 'JOIN NOW' : 'THAM GIA NGAY' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import Adsense from "~/components/Adsense.vue";

const { t, locale } = useI18n();

// Format the banner: highlight "từ vựng" and "Vocabulary" in magenta pink
const formattedBanner = computed(() => {
  const text = t("banner") || "";
  return text
    .replace(/(từ vựng)/gi, '<span class="text-[#be185d] font-black">$1</span>')
    .replace(/(Vocabulary)/gi, '<span class="text-[#d946ef] font-black">$1</span>');
});

// Format the "why" title: highlight "VOCABVIBES?" in magenta pink
const formattedWhy = computed(() => {
  const text = t("why") || "";
  return text.replace(/(VOCABVIBES\??)/gi, '<span class="text-[#d946ef] font-black">$1</span>');
});

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
    {
      name: "google-adsense-account",
      content: "ca-pub-4514641971794594",
    },
  ],
});
</script>

<style lang="css" scoped>
/* Smooth scroll behavior for page anchors */
html {
  scroll-behavior: smooth;
}
</style>
