<template>
  <template v-if="isLogin !== null">
    <div class="flex justify-center" v-if="isLogin">
      <div v-if="!modePractice" class="mt-10 w-full max-w-4xl px-4 my-6 flex flex-col gap-6">
        <!-- Neobrutalist Daily Challenge Banner -->
        <div class="bg-[#be185d] border-2 border-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-left">
          
          <!-- Subtle background decorative circle -->
          <div class="absolute -top-10 -left-10 w-24 h-24 bg-pink-400 rounded-full opacity-40"></div>

          <!-- Left Column: Copy & Action -->
          <div class="flex flex-col items-start relative z-10 md:w-3/5">
            <!-- Event Badge -->
            <div class="inline-block bg-[#1a1a1a] text-white font-mono text-[10px] font-bold px-2 py-1 tracking-wider uppercase mb-5">
              {{ locale === 'en' ? '# DAILY EVENT' : '# SỰ KIỆN HẰNG NGÀY' }}
            </div>
            
            <!-- Title -->
            <div class="font-black text-white leading-none mb-6">
              <div class="text-3xl md:text-4xl uppercase tracking-wide">
                {{ locale === 'en' ? 'DAILY' : 'THỬ THÁCH' }}
              </div>
              <div class="inline-block bg-white text-black border-2 border-black px-4 py-1.5 font-black text-2xl md:text-3.5xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-2 uppercase tracking-wider rotate-1">
                {{ locale === 'en' ? 'CHALLENGE' : 'HẰNG NGÀY' }}
              </div>
            </div>

            <!-- Description -->
            <p class="text-white text-sm md:text-base font-bold mb-8 max-w-lg leading-relaxed">
              {{ $t("title_practice") }}
            </p>

            <!-- Play button -->
            <button
              @click="onPractice"
              class="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-black font-extrabold px-6 py-3.5 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-base uppercase tracking-wider select-none">
              <span>{{ $t("practice_btn") }}</span>
              <span class="ml-2">⚡</span>
            </button>
          </div>

          <!-- Right Column: Interactive Brain Card Graphic -->
          <div class="md:w-2/5 flex justify-center items-center relative z-10 w-full">
            <div class="relative bg-[#fce7f3] border-2 border-black p-4 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-6 w-[180px] h-[180px] md:w-[220px] md:h-[220px] flex items-center justify-center select-none">
              <!-- Grid background lines -->
              <div class="absolute inset-2 border border-[#f472b6] opacity-30 pointer-events-none flex items-center justify-center">
                <div class="w-full h-[1px] bg-[#f472b6]"></div>
                <div class="h-full w-[1px] bg-[#f472b6] absolute"></div>
              </div>
              
              <!-- Brain icon -->
              <UIcon name="i-lucide-brain" class="w-24 h-24 text-[#be185d] relative z-10" />

              <!-- Progress Indicator -->
              <div class="absolute bottom-2 left-2 bg-[#1a1a1a] text-white font-mono text-[9px] font-black px-2 py-1 uppercase tracking-wider border border-black z-20">
                Progress: 75%
              </div>
            </div>
          </div>

        </div>

        <!-- Neobrutalist Vibe Tip Box -->
        <div class="bg-[#ffedd5] border-2 border-black rounded-lg p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left flex flex-col gap-2 self-start mt-5">
          <div class="flex items-center gap-2 text-amber-800 font-extrabold text-sm uppercase tracking-wider">
            <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-amber-800" />
            <span>VIBE TIP</span>
          </div>
          <p class="text-amber-950 text-sm md:text-base font-bold leading-relaxed">
            {{ locale === 'en' ? 'Use Spaced Repetition (spaced intervals) to help your brain retain information 3 times longer than normal. Practice regularly every day!' : 'Dùng phương pháp "Spaced Repetition" (Lặp lại ngắt quãng) giúp não bộ ghi nhớ thông tin lâu gấp 3 lần bình thường. Hãy luyện tập đều đặn mỗi ngày!' }}
          </p>
        </div>
      </div>
      <div v-else class="w-[600px] mt-20">
        <div
          :class="`border-2 rounded p-4 ${
            showAnswer !== null
              ? showAnswer
                ? 'border-green-500 shadow-[6px_6px_0px_0px_#22c55e]'
                : 'border-red-500 shadow-[6px_6px_0px_0px_#ef4444]'
              : 'border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]'
          }`">
          <p class="font-bold text-xl mb-3">
            <span
              class="dark:bg-white dark:text-black bg-black text-white px-2 rounded font-bold">
              {{ wordSelected.type }}
            </span>
            <span class="pl-3">{{
              randomNumber % 2 === 0 ? wordSelected.word : wordSelected.meaning
            }}</span>
          </p>
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit">
            <p>{{ $t("answer") }}:</p>
            <UFormField name="answer">
              <UInput
                size="xl"
                class="w-full"
                v-model="state.answer"
                ref="input"
                placeholder="Press / to start typing" />
            </UFormField>
            <div v-if="showAnswer !== null">
              <p>
                {{ randomNumber % 2 === 0 ? $t("meaning") : $t("word") }}:
                {{
                  randomNumber % 2 === 0
                    ? wordSelected.meaning
                    : wordSelected.word
                }}
              </p>
            </div>
            <p v-if="wordSelected.description">
              {{ $t("description") }}: {{ wordSelected.description }}
            </p>
            <UButton class="cursor-pointer font-bold" type="submit">
              {{ showAnswer !== null ? $t("next") : $t("check") }}
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
    <NoLogin v-else />
  </template>
  <!-- <Adsense /> -->
</template>

<script setup>
import { object, string } from "yup";
import { ApiGetAllVocab } from "~/apis/vocabulary";
import Adsense from "~/components/Adsense.vue";
useHead({
  title: "VocabVibes Practice - Ghi nhớ từ vựng hiệu quả mỗi ngày",
  meta: [
    {
      name: "description",
      content:
        "Practice vocabulary with VocabVibes - Ghi nhớ từ vựng hiệu quả mỗi ngày",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "keywords",
      content:
        "vocabulary, practice, learn, English, VocabVibes, luyện tập từ vựng, nền tảng học từ vựng, ghi nhớ từ vựng, ôn tập từ vựng",
    },
  ],
});
defineShortcuts({
  enter: () => {
    document.querySelector("button[type='submit']")?.click();
  },
  "/": () => {
    input.value?.inputRef?.focus();
  },
});
const { t, locale } = useI18n();
const toast = useToast();
const router = useRouter();
const modePractice = ref(false);
const input = useTemplateRef("input");
const schema = object({
  answer: string().required(t("required")),
});
const state = reactive({
  answer: "",
});
const randomNumber = ref(0);
const showAnswer = ref(null);
const isLogin = ref(null);
const wordSelected = ref();
const listVocab = ref([]);
const initData = async () => {
  try {
    const res = await ApiGetAllVocab();
    listVocab.value = res?.data?.listVocab || [];
  } catch (error) {
    toast.add({
      title: t("something_wrong"),
      color: "error",
      duration: 1000,
    });
  }
};
const onSubmit = (event) => {
  if (showAnswer.value !== null) {
    randomWord();
    showAnswer.value = null;
    state.answer = "";
  } else {
    const listMean = wordSelected.value.meaning
      .toLowerCase()
      .split(",")
      .map((i) => i.trim());
    const listWord = wordSelected.value.word
      .toLowerCase()
      .split(",")
      .map((i) => i.trim());
    const listAnswer = event.data.answer
      .toLowerCase()
      .split(",")
      .map((i) => i.trim());
    const check =
      randomNumber.value % 2 === 0
        ? listAnswer.every((i) => listMean.includes(i))
        : listAnswer.every((i) => listWord.includes(i));
    showAnswer.value = check;
  }
};

const onPractice = () => {
  if (listVocab.value.length > 0) {
    modePractice.value = true;
    randomWord();
  } else {
    toast.add({
      title: t("empty_err_practice"),
      color: "warning",
      placement: "top-center",
      actions: [
        {
          icon: "i-lucide-pointer",
          label: t("click_here"),
          color: "neutral",
          variant: "solid",
          onClick: () => {
            router.push("/vocabulary");
          },
        },
      ],
    });
  }
};

const randomWord = () => {
  const randomIndex = Math.floor(Math.random() * listVocab.value.length);
  randomNumber.value = Math.floor(Math.random() * 10);
  wordSelected.value = listVocab.value[randomIndex];
};
onMounted(() => {
  const token = getCookie(KEY.TOKEN);
  if (token) {
    initData();
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});
</script>

<style lang="scss" scoped></style>
