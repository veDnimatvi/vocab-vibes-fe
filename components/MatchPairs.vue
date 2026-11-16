<template>
  <div class="w-full max-w-3xl mx-auto px-4 mt-10 mb-10">
    <!-- Header: back + stats -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
      <button
        @click="emit('back')"
        class="inline-flex items-center gap-1 bg-white text-black font-extrabold px-3 py-1 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer text-sm"
      >
        <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
        {{ $t("match_back") }}
      </button>

      <div class="flex items-center gap-3 font-bold text-sm">
        <span
          class="bg-[#fef08a] text-black border-2 border-black rounded px-2 py-0.5"
        >
          {{ $t("match_time") }}: {{ formattedTime }}
        </span>
        <span
          class="bg-[#fecaca] text-black border-2 border-black rounded px-2 py-0.5"
        >
          {{ $t("match_mistakes") }}: {{ mistakes }}
        </span>
        <span
          class="bg-[#bbf7d0] text-black border-2 border-black rounded px-2 py-0.5"
        >
          {{ matched.size }}/{{ pairCount }}
        </span>
      </div>
    </div>

    <!-- Done -->
    <div
      v-if="isDone"
      class="bg-[#bbf7d0] text-black border-2 border-black rounded-lg p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4 text-center"
    >
      <UIcon name="i-lucide-party-popper" class="w-12 h-12 text-green-700" />
      <p class="font-black text-2xl">{{ $t("match_done") }}</p>
      <p class="font-bold">
        {{ $t("match_time") }}: {{ formattedTime }} ·
        {{ $t("match_mistakes") }}: {{ mistakes }}
      </p>
      <div class="flex gap-3">
        <button
          @click="newGame"
          class="bg-[#be185d] hover:bg-[#da1b6a] text-white font-extrabold px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
        >
          {{ $t("match_play_again") }}
        </button>
        <button
          @click="emit('back')"
          class="bg-white text-black font-extrabold px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
        >
          {{ $t("match_back") }}
        </button>
      </div>
    </div>

    <!-- Board -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button
        v-for="card of cards"
        :key="card.key"
        type="button"
        :disabled="matched.has(card.pairId)"
        @click="onSelect(card)"
        :class="[
          'min-h-[120px] sm:aspect-square p-3 rounded border-2 flex flex-col items-center justify-center text-center gap-1 transition-all select-none',
          matched.has(card.pairId)
            ? 'opacity-0 scale-90 pointer-events-none border-transparent'
            : wrongKeys.includes(card.key)
              ? 'bg-[#fecaca] border-red-500 shadow-[3px_3px_0px_0px_#ef4444] shake'
              : selected?.key === card.key
                ? 'bg-[#fef08a] border-black -translate-y-[2px] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white dark:bg-[#2a2a2a] border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] cursor-pointer',
        ]"
      >
        <template v-if="card.kind === 'word'">
          <span
            :class="[
              'font-black text-lg break-words',
              selected?.key === card.key || wrongKeys.includes(card.key)
                ? 'text-[#be185d]'
                : 'text-[#be185d] dark:text-pink-400',
            ]"
          >
            {{ card.text }}
          </span>
        </template>
        <template v-else>
          <span
            :class="[
              'font-bold text-sm break-words',
              selected?.key === card.key || wrongKeys.includes(card.key)
                ? 'text-black'
                : 'text-black dark:text-white',
            ]"
          >
            {{ card.text }}
          </span>
          <span
            v-if="card.sub"
            :class="[
              'text-xs line-clamp-3 break-words',
              selected?.key === card.key || wrongKeys.includes(card.key)
                ? 'text-zinc-700'
                : 'text-zinc-600 dark:text-zinc-300',
            ]"
          >
            = {{ card.sub }}
          </span>
        </template>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  vocabs: { type: Array, default: () => [] },
  size: { type: Number, default: 8 },
});
const emit = defineEmits(["back"]);

const { play } = useWordAudio();

const cards = ref([]);
const selected = ref(null);
const matched = ref(new Set());
const wrongKeys = ref([]);
const mistakes = ref(0);
const elapsed = ref(0);
let timer = null;
let locked = false;

const pairCount = computed(() => cards.value.length / 2);
const isDone = computed(
  () => pairCount.value > 0 && matched.value.size === pairCount.value,
);
const formattedTime = computed(() => {
  const m = Math.floor(elapsed.value / 60);
  const s = elapsed.value % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
});

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const norm = (s) => (s || "").trim().toLowerCase();

// Chọn ngẫu nhiên N từ, bỏ qua từ/nghĩa bị trùng để không có 2 cặp giống nhau
const pickVocabs = () => {
  const usedWords = new Set();
  const usedMeanings = new Set();
  const result = [];
  for (const item of shuffle(props.vocabs)) {
    if (result.length >= props.size) break;
    const w = norm(item?.word);
    const m = norm(item?.meaning);
    if (!w || !m || usedWords.has(w) || usedMeanings.has(m)) continue;
    usedWords.add(w);
    usedMeanings.add(m);
    result.push(item);
  }
  return result;
};

const stopTimer = () => {
  clearInterval(timer);
  timer = null;
};

const newGame = () => {
  const picked = pickVocabs();
  cards.value = shuffle(
    picked.flatMap((item, idx) => [
      { key: `w-${idx}`, pairId: idx, kind: "word", text: item.word },
      {
        key: `m-${idx}`,
        pairId: idx,
        kind: "meaning",
        text: item.meaning,
        sub: item.description,
        word: item.word,
      },
    ]),
  );
  selected.value = null;
  matched.value = new Set();
  wrongKeys.value = [];
  mistakes.value = 0;
  elapsed.value = 0;
  locked = false;
  stopTimer();
  timer = setInterval(() => elapsed.value++, 1000);
};

const onSelect = (card) => {
  if (locked || matched.value.has(card.pairId)) return;

  // Bấm vào thẻ từ tiếng Anh -> đọc luôn
  if (card.kind === "word") play(card.text);

  const first = selected.value;
  if (!first || first.key === card.key || first.kind === card.kind) {
    selected.value = first?.key === card.key ? null : card;
    return;
  }

  if (first.pairId === card.pairId) {
    matched.value = new Set([...matched.value, card.pairId]);
    selected.value = null;
    if (isDone.value) stopTimer();
  } else {
    mistakes.value++;
    wrongKeys.value = [first.key, card.key];
    selected.value = null;
    locked = true;
    setTimeout(() => {
      wrongKeys.value = [];
      locked = false;
    }, 600);
  }
};

onMounted(newGame);
onBeforeUnmount(stopTimer);
</script>

<style scoped>
.shake {
  animation: shake 0.35s;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}
</style>
