<template>
  <template v-if="isLogin !== null">
    <template v-if="isLogin">
      <div class="w-full max-w-3xl mx-auto px-4">
        <!-- Warning Limits Info Banner -->
        <div
          class="bg-[#fef08a] text-black border-2 border-black rounded-lg px-4 py-1 mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left flex items-start gap-3 select-none"
          v-if="limit"
        >
          <UIcon
            name="i-lucide-alert-triangle"
            class="w-5 h-5 text-amber-800 shrink-0 mt-0.5"
          />
          <div class="font-bold text-sm leading-relaxed">
            {{ $t("vocab_title", { limit: limit }) }}
            <NuxtLink
              to="/upgrade"
              class="underline font-black hover:text-[#be185d] transition-colors pl-1"
            >
              {{ $t("upgrade") }}
            </NuxtLink>
            {{ $t("for_more") }}
          </div>
        </div>

        <!-- Upper Panel Actions -->
        <div class="flex flex-wrap gap-3">
          <!-- Create Button -->
          <button
            @click="openModal = true"
            class="bg-[#be185d] hover:bg-[#da1b6a] text-white font-extrabold px-4 py-1 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer text-sm"
          >
            {{ $t("add_new_btn") }}
          </button>

          <!-- Import Button -->
          <label
            class="bg-white hover:bg-gray-50 text-black font-extrabold px-4 py-1 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer text-sm inline-block"
            for="importFile"
          >
            {{ $t("import_file") }}
          </label>
          <input
            :accept="acceptTypeUpload"
            type="file"
            id="importFile"
            @change="filesChange($event)"
            @click="(e) => (e.target.value = null)"
            class="hidden"
          />
        </div>

        <!-- Download template -->
        <div
          class="flex items-center gap-1.5 text-sm font-black underline cursor-pointer select-none my-3"
          @click="handleDownload"
        >
          <UIcon name="i-lucide-download" class="w-4 h-4" />
          <span>{{ $t("download_file") }}</span>
        </div>

        <!-- UModal for Add/Edit -->
        <UModal
          v-if="openModal"
          :open="openModal"
          :title="modeEdit ? $t('edit_vocab') : $t('add_vocab')"
          :close="{
            color: 'error',
            class: 'rounded-full',
            onClick: closeModal,
          }"
          :ui="{ footer: 'justify-end' }"
        >
          <template #body>
            <UForm
              :schema="schema"
              :state="vocabulary"
              class="space-y-4"
              @submit="onSubmit"
            >
              <UFormField name="word">
                <div class="dark:text-white text-black mb-2">
                  {{ $t("word") }}(*)
                </div>
                <UInput v-model="vocabulary.word" class="w-full" />
              </UFormField>
              <UFormField name="type">
                <div class="dark:text-white text-black mb-2">
                  {{ $t("type") }}(*)
                </div>
                <USelect
                  v-model="vocabulary.type"
                  class="w-full"
                  :items="TYPE_VOCAB"
                />
              </UFormField>
              <UFormField name="meaning">
                <div class="dark:text-white text-black mb-2">
                  {{ $t("meaning") }}(*)
                </div>
                <UInput v-model="vocabulary.meaning" class="w-full" />
                <p class="text-yellow-300 pt-3">
                  {{ $t("note_add") }}
                </p>
              </UFormField>
              <UFormField name="example">
                <div class="dark:text-white text-black mb-2">
                  {{ $t("example") }}(*)
                </div>
                <UInput v-model="vocabulary.example" class="w-full" />
              </UFormField>
              <UFormField name="description">
                <div class="dark:text-white text-black mb-2">
                  {{ $t("description") }}(*)
                </div>
                <UTextarea v-model="vocabulary.description" class="w-full" />
              </UFormField>

              <div class="flex justify-end gap-3 pt-3">
                <UButton
                  class="cursor-pointer font-bold border-2 border-black dark:border-white rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                  color="neutral"
                  @click="closeModal"
                  variant="subtle"
                >
                  {{ $t("cancel") }}
                </UButton>
                <UButton
                  class="cursor-pointer font-black border-2 border-black dark:border-white rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  type="submit"
                  color="neutral"
                >
                  {{ $t("submit") }}
                </UButton>
              </div>
            </UForm>
          </template>
        </UModal>

        <!-- Search Filter and Mass Actions -->
        <div
          v-if="listVocabBackUp?.length"
          class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-3 text-left"
        >
          <div>
            <UInput
              v-model.lazy="filter"
              size="xl"
              :placeholder="$t('filter_title')"
            />
            <button
              @click="handleFilter"
              class="dark:bg-white text-black bg-white hover:bg-gray-50 px-[12px] py-[6px] rounded ml-1 border-2 border-black cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
            >
              Go
            </button>
          </div>

          <UButton
            v-if="listIdDelete.length"
            color="error"
            class="cursor-pointer font-black border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all px-4 py-2 text-sm uppercase tracking-wider"
            @click="deleteMany"
          >
            {{ $t("delete_all") }} ({{ listIdDelete.length }})
          </UButton>
        </div>

        <!-- Vocabulary Cards List -->
        <div
          v-if="listVocab"
          class="border-2 dark:border-white border-black rounded px-5 mt-3 max-h-[70vh] overflow-auto mb-8"
        >
          <div
            v-for="item of listVocab"
            :key="item.id"
            class="py-1 flex justify-between"
          >
            <div class="flex gap-5 items-center">
              <input
                class="w-5 h-5 cursor-pointer"
                type="checkbox"
                @change="onCheckedItems($event, item.id)"
              />
              <span class="font-bold">{{ item.word }}</span>
              <span class="bg-zinc-600 text-white px-2 rounded font-bold">{{
                item.type
              }}</span>
            </div>

            <div class="flex gap-2">
              <UButton
                @click="playAudio(item)"
                @mouseenter="prefetchAudio(item)"
                @touchstart.passive="prefetchAudio(item)"
                @focus="prefetchAudio(item)"
                :loading="loadingAudioId === item.id"
                class="cursor-pointer font-bold border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                :icon="
                  playingAudioId === item.id
                    ? 'i-lucide-audio-lines'
                    : 'i-lucide-volume-2'
                "
                size="md"
                color="primary"
                variant="subtle"
              />
              <UButton
                @click="editVocab(item)"
                class="cursor-pointer font-bold border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                icon="i-lucide-edit"
                size="md"
                color="neutral"
                variant="subtle"
              />
              <UButton
                @click="deleteVocab(item.id)"
                class="cursor-pointer font-bold border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                icon="i-lucide-trash"
                size="md"
                color="error"
                variant="solid"
              />
            </div>
          </div>
        </div>

        <!-- Skeleton Loading State -->
        <div
          v-if="listVocabBackUp === null && listVocab === null"
          class="flex flex-col gap-4 mb-8"
        >
          <div
            v-for="(item, index) of Array(8)"
            :key="index"
            class="bg-white dark:bg-[#212121] border border-black dark:border-white rounded-lg p-4 flex justify-between items-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <div class="flex gap-4 items-center">
              <USkeleton class="h-5 w-5 rounded-sm" />
              <USkeleton class="h-6 w-24 rounded-sm" />
              <USkeleton class="h-5 w-12 rounded-sm" />
            </div>
            <div class="flex gap-2">
              <USkeleton class="h-8 w-8 rounded-sm" />
              <USkeleton class="h-8 w-8 rounded-sm" />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="
            (!listVocabBackUp?.length && listVocabBackUp !== null) ||
            (!listVocab?.length && listVocab !== null)
          "
          class="flex justify-center mb-8 py-10"
        >
          <div class="flex flex-col items-center">
            <p
              class="text-center font-black text-xl mb-4 text-black dark:text-white"
            >
              {{ $t("no_data") }}
            </p>
            <img
              src="~/assets/images/cloud.png"
              alt="cloud"
              width="180"
              class="filter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>
      </div>
    </template>
    <NoLogin v-else />
  </template>
</template>

<script setup>
import {
  ApiGetAllVocab,
  ApiCreateVocab,
  ApiUpdateVocab,
  ApiDeleteVocab,
  ApiDeleteManyVocab,
  ApiImportVocab,
} from "~/apis/vocabulary";
import { object, string } from "yup";
import { TYPE_VOCAB } from "~/utils/constants";
import Adsense from "~/components/Adsense.vue";
useHead({
  title: "VocabVibes Vocabulary",
  meta: [
    {
      name: "description",
      content:
        "Manage your vocabulary with VocabVibes - Nơi lưu trữ, cá nhân hoá từ vựng của bản",
    },
  ],
});
defineShortcuts({
  n: () => {
    openModal.value = true;
  },
});
const { t } = useI18n();
const router = useRouter();
const acceptTypeUpload =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";
const toast = useToast();
const schema = object({
  word: string().required(t("required")),
  meaning: string().required(t("required")),
  example: string().nullable(),
  type: string().required(t("required")),
  description: string().nullable(),
});
const listVocab = ref(null);
const listVocabBackUp = ref(null);
const openModal = ref(false);
const modeEdit = ref();
const filter = ref(null);
const isLogin = ref(null);
const limit = ref();
const listIdDelete = ref([]);
const vocabulary = reactive({
  word: undefined,
  meaning: undefined,
  example: undefined,
  type: undefined,
  description: undefined,
});

const closeModal = () => {
  openModal.value = false;
  vocabulary.word = undefined;
  vocabulary.meaning = undefined;
  vocabulary.example = undefined;
  vocabulary.type = undefined;
  vocabulary.description = undefined;
  modeEdit.value = null;
};

const editVocab = (vocab) => {
  modeEdit.value = vocab.id;
  vocabulary.word = vocab.word;
  vocabulary.meaning = vocab.meaning;
  vocabulary.example = vocab.example;
  vocabulary.type = vocab.type;
  vocabulary.description = vocab.description;
  openModal.value = true;
};

const deleteVocab = async (id) => {
  try {
    const res = await ApiDeleteVocab(id);
    if (res?.data?.deleted) {
      initData();
      toast.add({
        title: t("delete_success"),
        color: "success",
        duration: 1000,
        placement: "top-center",
      });
    }
  } catch (error) {
    toast.add({
      title: t("action_fail"),
      color: "error",
      duration: 1000,
      placement: "top-center",
    });
  }
};

const deleteMany = async () => {
  try {
    const res = await ApiDeleteManyVocab(listIdDelete.value);
    if (res?.data?.deleted) {
      initData();
      toast.add({
        title: t("delete_success"),
        color: "success",
        duration: 1000,
        placement: "top-center",
      });
      listIdDelete.value = [];
    }
  } catch (error) {
    toast.add({
      title: t("action_fail"),
      color: "error",
      duration: 1000,
      placement: "top-center",
    });
  }
};

const onSubmit = async (event) => {
  const payload = event.data;
  delete payload.id;
  try {
    const res = modeEdit.value
      ? await ApiUpdateVocab(modeEdit.value, payload)
      : await ApiCreateVocab(payload);
    if (res?.data?.code === 200) {
      closeModal();
      initData();
      toast.add({
        title: t(res?.data?.message),
        color: "success",
        duration: 1000,
        placement: "top-center",
      });
    } else {
      closeModal();
      toast.add({
        title: t(res?.data?.message, { limit: res?.data?.limit }),
        color: "error",
        duration: 2000,
        placement: "top-center",
        actions: [
          {
            icon: "i-lucide-cloud-upload",
            label: t("upgrade_now"),
            color: "neutral",
            variant: "solid",
            onClick: (e) => {
              router.push("/upgrade");
            },
          },
        ],
      });
    }
  } catch (error) {
    toast.add({
      title: t("action_fail"),
      color: "error",
      duration: 1000,
      placement: "top-center",
    });
  }
};
const onCheckedItems = (event, id) => {
  let newListChecked = [];
  if (event.target.checked) {
    newListChecked = new Set([...listIdDelete.value, id]);
  } else {
    newListChecked = listIdDelete.value.filter((i) => i !== id);
  }
  listIdDelete.value = [...newListChecked];
};
const initData = async () => {
  filter.value = null;
  try {
    const res = await ApiGetAllVocab();
    listVocab.value = res?.data?.listVocab;
    listVocabBackUp.value = res?.data?.listVocab;
    limit.value = res?.data?.limit;
  } catch (error) {
    toast.add({
      title: t("something_wrong"),
      color: "error",
      duration: 1000,
    });
  }
};

const filesChange = async (event) => {
  try {
    const res = await ApiImportVocab(event.target.files[0]);
    if (res?.data?.code === 200) {
      toast.add({
        title: t(res?.data?.message),
        color: "success",
        duration: 1000,
        placement: "top-center",
      });
      initData();
    } else {
      toast.add({
        title: t(res?.data?.message, { limit: res?.data?.limit }),
        color: "error",
        duration: 2000,
        placement: "top-center",
        actions: [
          {
            icon: "i-lucide-cloud-upload",
            label: t("upgrade_now"),
            color: "neutral",
            variant: "solid",
            onClick: (e) => {
              router.push("/upgrade");
            },
          },
        ],
      });
    }
  } catch (error) {
    toast.add({
      title: t("something_wrong"),
      color: "error",
      duration: 1000,
    });
  }
};

const handleFilter = () => {
  if (!filter.value) {
    listVocab.value = listVocabBackUp.value;
  } else {
    listVocab.value = listVocabBackUp.value.filter((i) =>
      i.word.toLowerCase().includes(filter.value.toLowerCase()),
    );
  }
};

const {
  play: playWord,
  prefetch: prefetchWord,
  loadingId: loadingAudioId,
  playingId: playingAudioId,
} = useWordAudio();
const playAudio = (item) => playWord(item.word, item.id);
const prefetchAudio = (item) => prefetchWord(item.word);

const handleDownload = () => {
  const link = document.createElement("a");
  link.href = `${import.meta.env.VITE_BASE_URL}/vocabulary/download-template`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
