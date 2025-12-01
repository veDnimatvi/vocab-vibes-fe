<template>
  <template v-if="isLogin !== null">
    <div class="flex justify-center mt-20" v-if="isLogin">
      <div v-if="!modePractice" class="w-[600px]">
        <p class="font-bold text-xl">
          {{ $t("title_practice") }}
        </p>
        <button
          @click="onPractice"
          class="bg-[#FE1414] text-white font-bold rounded px-3 py-2 cursor-pointer mt-5">
          {{ $t("practice_btn") }}
        </button>
      </div>
      <div v-else class="w-[600px]">
        <div
          :class="`border-2 rounded p-4 ${
            showAnswer !== null
              ? showAnswer
                ? 'border-green-500'
                : 'border-red-500'
              : 'dark:border-white border-black'
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
const { t } = useI18n();
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
