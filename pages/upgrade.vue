<template>
  <template v-if="isLogin !== null">
    <template v-if="isLogin">

      <!-- ── Page Header ── -->
      <div class="w-full max-w-4xl mx-auto px-4 pt-8 pb-4 text-center">
        <div class="inline-block bg-[#fde047] border-2 border-black rounded px-4 py-1 text-md font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4 -rotate-1 select-none">
          💎 Plans &amp; Pricing
        </div>
        <p class="text-base text-gray-600 dark:text-gray-400 font-medium max-w-xl mx-auto">
          {{ $t("select_plan") }}
        </p>
      </div>

      <!-- ── Package Cards ── -->
      <div class="w-full max-w-4xl mx-auto px-4 pb-12 flex flex-col gap-5">
        <div
          v-for="item of PACKAGES"
          :key="item.name"
          class="bg-white dark:bg-[#212121] border-2 border-black dark:border-white rounded-xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">

          <!-- Badge ribbon -->
          <div
            v-if="item.recommend"
            class="bg-[#6d28d9] text-white text-center py-2 text-xs font-black uppercase tracking-widest border-b-2 border-black">
            ⭐ {{ $t("recommended") }}
          </div>
          <div
            v-if="item.bestChoice"
            class="bg-[#dc2626] text-white text-center py-2 text-xs font-black uppercase tracking-widest border-b-2 border-black">
            🔥 {{ $t("best_choice") }}
          </div>
          <div
            v-if="item.popular"
            class="bg-[#f59e0b] text-black text-center py-2 text-xs font-black uppercase tracking-widest border-b-2 border-black">
            ✨ {{ $t("popular") }}
          </div>

          <!-- Card body -->
          <div class="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

            <!-- Name + note -->
            <div class="flex-1">
              <h3 class="text-2xl font-black text-black dark:text-white mb-1 uppercase tracking-wide">
                {{ $t(item.name) }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {{ $t(item.note) }}
              </p>
            </div>

            <!-- Price -->
            <div class="text-center px-4 dark:border-white sm:pl-5">
              <div class="text-3xl font-black text-black dark:text-white">
                {{ item.combo1.toLocaleString("vi-VN") }}
              </div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">VNĐ / {{ $t("month") }}</div>
            </div>

            <!-- Description label -->
            <div class="text-center px-3 sm:w-[150px]">
              <span class="bg-[#d946ef] text-white text-xs font-black px-3 py-1.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider select-none">
                {{ $t(item.discription) }}
              </span>
            </div>

            <!-- CTA Button -->
            <div class="shrink-0">
              <button
                :class="`sm:w-[180px] px-6 py-3 font-black text-sm uppercase tracking-wider border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-white ${switchColorBg(item)}`"
                @click="handlePayment(item)">
                {{ $t("get") }} {{ item.name }}
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- ── Modal: Choose combo ── -->
      <UModal
        v-if="openModal"
        :open="openModal"
        :ui="{ footer: 'justify-between' }">
        <template #header>
          <div class="flex items-center gap-3">
            <span :class="`${switchColorBg(detailPackage)} font-black px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm uppercase tracking-wider`">
              {{ detailPackage.name }}
            </span>
            <span class="font-black text-green-600 dark:text-green-400 text-base">
              {{ $t(detailPackage.discription) }}
            </span>
            <!-- <span class="text-black dark:text-white font-bold text-base">{{ $t("package_store") }}</span> -->
          </div>
        </template>
        <template #body>
          <p class="dark:text-white text-black font-bold mb-3 text-sm uppercase tracking-wider">
            {{ $t("describe") }}
          </p>

          <!-- Combo option cards -->
          <div class="flex flex-col gap-3">
            <div
              v-for="item of optionPackages"
              :key="item.due_date"
              :class="`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                price === item.value
                  ? 'border-[#d946ef] bg-[#fdf4ff] dark:bg-[#2d1b36]'
                  : 'border-black dark:border-white bg-white dark:bg-[#1a1a1a]'
              }`"
              @click="changePrice(item.value)">

              <!-- Custom radio dot -->
              <div :class="`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                price === item.value
                  ? 'border-[#d946ef] bg-[#d946ef]'
                  : 'border-black dark:border-white'
              }`">
                <UIcon v-if="price === item.value" name="i-lucide-check" class="w-3 h-3 text-white" />
              </div>

              <div class="flex-1">
                <div class="font-black text-black dark:text-white text-base">
                  {{ item.label }}
                </div>
                <div v-if="item.description" class="text-xs text-green-600 dark:text-green-400 font-bold mt-0.5">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            class="bg-[#22c55e] hover:bg-[#16a34a] text-white font-black px-5 py-2.5 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all cursor-pointer text-sm uppercase tracking-wider"
            @click="submitPayment">
            {{ $t('continue_payment') }}
          </button>
          <button
            class="bg-white dark:bg-[#212121] text-black dark:text-white font-bold px-5 py-2.5 border-2 border-black dark:border-white rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-sm"
            @click="closeModal">
            {{ $t('cancel') }}
          </button>
        </template>
      </UModal>

      <!-- ── Modal: Warning (already has package) ── -->
      <UModal
        v-if="openWarning"
        :open="openWarning"
        :ui="{ footer: 'justify-between' }">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="text-xl">⚠️</span>
            <p class="text-base font-black dark:text-white text-black uppercase tracking-wide">
              {{ $t("note_update_package") }}
            </p>
          </div>
        </template>
        <template #footer>
          <button
            class="bg-[#22c55e] hover:bg-[#16a34a] text-white font-black px-5 py-2.5 border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-sm uppercase tracking-wider"
            @click="continuePayment">
            {{ $t('yes') }}
          </button>
          <button
            class="bg-white dark:bg-[#212121] text-black dark:text-white font-bold px-5 py-2.5 border-2 border-black dark:border-white rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-sm"
            @click="closeModal">
            {{ $t('cancel') }}
          </button>
        </template>
      </UModal>

      <!-- ── Modal: Payment info + QR ── -->
      <UModal
        v-if="openPayment"
        :open="openPayment"
        :ui="{ footer: 'justify-end' }">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="bg-[#fde047] border-2 border-black text-black font-black px-2 py-0.5 text-xs rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider select-none">Đơn hàng</span>
          </div>
        </template>
        <template #body>
          <div class="dark:text-white text-black space-y-3">
            <p class="font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Vui lòng chuyển khoản với thông tin sau:</p>

            <div class="flex items-center gap-3 bg-gray-50 dark:bg-[#1a1a1a] border-2 border-black dark:border-white rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span class="text-xs font-black uppercase tracking-wider text-gray-400 w-28 shrink-0">Ngân hàng</span>
              <span class="font-black text-black dark:text-white">TPBank</span>
            </div>
            <div class="flex items-center gap-3 bg-gray-50 dark:bg-[#1a1a1a] border-2 border-black dark:border-white rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span class="text-xs font-black uppercase tracking-wider text-gray-400 w-28 shrink-0">Số TK</span>
              <span class="font-black text-black dark:text-white tracking-widest">04047563801</span>
            </div>
            <div class="flex items-center gap-3 bg-gray-50 dark:bg-[#1a1a1a] border-2 border-black dark:border-white rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span class="text-xs font-black uppercase tracking-wider text-gray-400 w-28 shrink-0">Chủ TK</span>
              <span class="font-black text-black dark:text-white">NGUYEN THANH THIEN</span>
            </div>
            <div class="flex items-center gap-3 bg-[#fdf4ff] dark:bg-[#2d1b36] border-2 border-[#d946ef] rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(217,70,239,1)]">
              <span class="text-xs font-black uppercase tracking-wider text-[#d946ef] w-28 shrink-0">Nội dung</span>
              <span class="font-black text-black dark:text-white tracking-wider">{{ messageCode }}</span>
            </div>
            <div class="flex items-center gap-3 bg-[#f0fdf4] dark:bg-[#0d2318] border-2 border-green-500 rounded-lg p-3 shadow-[2px_2px_0px_0px_#22c55e]">
              <span class="text-xs font-black uppercase tracking-wider text-green-600 w-28 shrink-0">Số tiền</span>
              <span class="font-black text-green-600 text-lg">{{ price.toLocaleString("vi-VN") }}đ</span>
            </div>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-2">
              <div class="flex-grow border-t-2 border-dashed border-black dark:border-white"></div>
              <span class="text-xs font-black uppercase tracking-widest text-gray-400">Hoặc quét QR</span>
              <div class="flex-grow border-t-2 border-dashed border-black dark:border-white"></div>
            </div>

            <p class="text-xs font-bold text-gray-500 dark:text-gray-400 text-center">
              Quét mã QR sau (khuyến khích quét bằng các App ngân hàng, một số ví điện tử VNPAY, ShopeePay,...)
            </p>

            <!-- QR image -->
            <div class="flex justify-center">
              <div class="border-2 border-black rounded-xl p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <img
                  :src="`https://qr.sepay.vn/img?acc=04047563801&bank=TPBANK&amount=${price}&des=${messageCode}`"
                  alt="QR Code"
                  width="200"
                  height="200"
                  class="rounded-lg" />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <button
            class="bg-white dark:bg-[#212121] text-black dark:text-white font-bold px-5 py-2.5 border-2 border-black dark:border-white rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-sm"
            @click="closePaymentModal">
            {{ $t('close') }}
          </button>
        </template>
      </UModal>

    </template>
    <NoLogin v-else />
  </template>
  <!-- <Adsense /> -->
</template>

<script setup>
import { PACKAGES } from "~/utils/constants";
import { ApiCreateOrder } from "~/apis/order";
import { ApiCheckPackage } from "~/apis/auth";
import Adsense from "~/components/Adsense.vue";
useHead({
  title: "VocabVibes Upgrade - Nâng cấp gói học",
  meta: [
    {
      name: "description",
      content:
        "Chọn gói học phù hợp để lưu trữ và luyện tập nhiều từ vựng hơn mỗi ngày. Cùng VocabVibes học tiếng Anh hiệu quả hơn.",
    },
  ],
});
const toast = useToast();
const openModal = ref(false);
const openPayment = ref(false);
const openWarning = ref(false);
const detailPackage = ref();
const optionPackages = ref();
const price = ref();
const words = ref();
const dueDate = ref();
const messageCode = ref();
const { t } = useI18n();
const isLogin = ref(null);

const changePrice = (value) => {
  price.value = value;
};
const switchColorBg = (item) => {
  if (item.bestChoice) {
    return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700";
  }
  if (item.recommend) {
    return "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700";
  }
  if (item.popular) {
    return "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700";
  }
  return "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700";
};
const switchColorBorder = (item) => {
  if (item.bestChoice) {
    return "border-red-500";
  }
  if (item.recommend) {
    return "border-blue-500";
  }
  if (item.popular) {
    return "border-yellow-500";
  }
  return "border-slate-500";
};
const funcCallApiCreateOrder = async () => {
  try {
    const res = await ApiCreateOrder({
      price: price.value,
      word: words.value,
      due_date: dueDate.value,
    });
    messageCode.value = res?.data?.transfer_description;
    openModal.value = false;
    openWarning.value = false;
    openPayment.value = true;
  } catch (error) {
    toast.add({
      title: t("something_wrong"),
      color: "error",
      duration: 1000,
    });
  }
};

const handlePayment = (data) => {
  detailPackage.value = data;
  words.value = data.words;
  optionPackages.value = [
    {
      label: data.combo1.toLocaleString("vi-VN") + " Vnđ / 1 " + t("month"),
      value: data.combo1,
      due_date: 1,
      description: "",
    },
    {
      label: data.combo3.toLocaleString("vi-VN") + " Vnđ / 3 " + t("month"),
      value: data.combo3,
      due_date: 3,
      description: t(data.noteCombo3),
    },
    {
      label: data.combo6.toLocaleString("vi-VN") + " Vnđ / 6 " + t("month"),
      value: data.combo6,
      due_date: 6,
      description: t(data.noteCombo6),
    },
    {
      label: data.comboY.toLocaleString("vi-VN") + " Vnđ / " + t("year"),
      value: data.comboY,
      due_date: 12,
      description: t(data.noteComboY),
    },
  ];
  openModal.value = true;
};
const submitPayment = async () => {
  dueDate.value = optionPackages.value.find(
    (x) => x.value === price.value
  )?.due_date;
  if (dueDate.value) {
    try {
      const res = await ApiCheckPackage(words.value);
      if (res?.data?.warning) {
        openWarning.value = true;
        return;
      } else {
        funcCallApiCreateOrder();
      }
    } catch (error) {
      toast.add({
        title: t("something_wrong"),
        color: "error",
        duration: 1000,
      });
    }
  }
};

const continuePayment = () => {
  dueDate.value = optionPackages.value.find(
    (x) => x.value === price.value
  )?.due_date;
  if (dueDate.value) {
    funcCallApiCreateOrder();
  }
};
const closeModal = () => {
  openModal.value = false;
  openWarning.value = false;
  detailPackage.value = null;
  price.value = null;
};

const closePaymentModal = () => {
  openPayment.value = false;
  detailPackage.value = null;
  price.value = null;
  words.value = null;
  dueDate.value = null;
  messageCode.value = null;
};
onMounted(() => {
  const token = getCookie(KEY.TOKEN);
  if (token) {
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});
</script>

<style lang="scss" scoped></style>
