<template>
  <template v-if="isLogin !== null">
    <template v-if="isLogin">
      <div class="flex justify-center">
        <div class="w-[600px]">
          <div class="py-2" v-if="limit">
            {{ $t("vocab_title", { limit: limit }) }}
            <NuxtLink to="/upgrade" class="text-yellow-400 underline">{{
              $t("upgrade")
            }}</NuxtLink>
            {{ $t("for_more") }}
          </div>
          <button
            @click="openModal = true"
            class="dark:bg-white text-black bg-[#e2e3ee] font-bold rounded px-3 py-2 cursor-pointer">
            {{ $t("add_new_btn") }}
          </button>
          <UModal
            v-if="openModal"
            :open="openModal"
            :title="modeEdit ? $t('edit_vocab') : $t('add_vocab')"
            :close="{
              color: 'error',
              class: 'rounded-full',
              onClick: closeModal,
            }"
            :ui="{ footer: 'justify-end' }">
            <template #body>
              <UForm
                :schema="schema"
                :state="vocabulary"
                class="space-y-4"
                @submit="onSubmit">
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
                    :items="TYPE_VOCAB" />
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
                <template class="flex justify-end gap-3">
                  <UButton
                    class="cursor-pointer"
                    :label="$t('cancel')"
                    color="neutral"
                    @click="closeModal" />
                  <UButton
                    class="cursor-pointer"
                    :label="$t('submit')"
                    type="submit"
                    label="Submit"
                    color="neutral"
                    variant="outline" />
                </template>
              </UForm>
            </template>
          </UModal>
          <label
            class="dark:bg-white text-black bg-[#e2e3ee] font-bold rounded px-3 py-2 cursor-pointer ml-2 inline-block"
            for="importFile"
            >{{ $t("import_file") }}</label
          >
          <input
            :accept="acceptTypeUpload"
            type="file"
            id="importFile"
            @change="filesChange($event)"
            @click="(e) => (e.target.value = null)"
            class="hidden" />

          <div
            class="underline cursor-pointer w-max py-3"
            @click="handleDownload">
            {{ $t("download_file") }}
          </div>
        </div>
      </div>
      <div v-if="listVocabBackUp?.length" class="flex justify-center">
        <div class="w-[600px]">
          <div class="flex justify-between items-center">
            <div>
              <UInput
                v-model.lazy="filter"
                size="xl"
                :placeholder="$t('filter_title')" />
              <button
                @click="handleFilter"
                class="dark:bg-white text-black bg-[#e2e3ee] px-[12px] py-[8px] rounded ml-1 cursor-pointer">
                Go
              </button>
            </div>
            <UButton
              v-if="listIdDelete.length"
              color="error"
              class="cursor-pointer font-bold"
              @click="deleteMany"
              >{{ $t("delete_all") }}({{ listIdDelete.length }})</UButton
            >
          </div>
          <div
            class="border-2 dark:border-white border-black rounded px-5 mt-3 max-h-[70vh] overflow-auto mb-8">
            <div
              v-for="item of listVocab"
              :key="item.id"
              class="py-2 flex justify-between">
              <div class="flex gap-5 items-center">
                <input
                  class="w-5 h-5 cursor-pointer"
                  type="checkbox"
                  @change="onCheckedItems($event, item.id)" />
                <span class="font-bold">{{ item.word }}</span>
                <span class="bg-zinc-600 text-white px-2 rounded font-bold">{{
                  item.type
                }}</span>
              </div>
              <div class="flex gap-2">
                <UButton
                  @click="editVocab(item)"
                  class="cursor-pointer"
                  icon="i-lucide-edit"
                  size="md"
                  color="neutral"
                  variant="subtle" />
                <UButton
                  @click="deleteVocab(item.id)"
                  class="cursor-pointer"
                  icon="i-lucide-trash"
                  size="md"
                  color="error"
                  variant="solid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="listVocabBackUp === null && listVocab === null"
        class="flex justify-center mb-8">
        <div class="w-[600px]">
          <div
            class="border-2 dark:border-white border-black rounded px-5 mt-3 min-h-[70vh] overflow-auto py-4">
            <div
              v-for="item of Array(14)"
              class="flex items-center gap-4 justify-between py-2">
              <div class="flex gap-4 items-center">
                <USkeleton class="h-6 w-6 rounded-sm" />
                <USkeleton class="h-8 w-22 rounded-sm" />
                <USkeleton class="h-8 w-12 rounded-sm" />
              </div>
              <div class="flex gap-4">
                <USkeleton class="h-8 w-8 rounded-sm" />
                <USkeleton class="h-8 w-8 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          (!listVocabBackUp?.length && listVocabBackUp !== null) ||
          (!listVocab?.length && listVocab !== null)
        "
        class="flex justify-center mb-8">
        <div class="mt-20">
          <p class="text-center font-bold text-lg">{{ $t("no_data") }}</p>
          <img src="~/assets/images/cloud.png" alt="cloud" width="200" />
        </div>
      </div>
    </template>
    <NoLogin v-else />
  </template>
  <!-- <Adsense /> -->
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
      i.word.toLowerCase().includes(filter.value.toLowerCase())
    );
  }
};

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
