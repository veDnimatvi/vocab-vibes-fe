<template>
  <template v-if="isLogin !== null">
    <template v-if="isLogin">
      <div class="text-center my-5">
        <p
          class="text-4xl font-bold pb-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-rose-600">
          {{ $t("choose_your_plan") }}
        </p>
        <p class="max-w-3xl mx-auto text-lg">
          {{ $t("select_plan") }}
        </p>
      </div>
      <div class="px-2 2xl:px-64 pb-6">
        <div
          v-for="item of PACKAGES"
          :key="item.name"
          :class="`bg-white duration-300 hover:scale-105 hover:shadow-2xl my-5 rounded-lg cursor-pointer border-2 ${switchColorBorder(
            item
          )}`">
          <div
            v-if="item.recommend"
            class="bg-gradient-to-br from-indigo-400 to-purple-600 text-white text-center py-2 text-sm font-semibold">
            {{ $t("recommended") }}
          </div>
          <div
            v-if="item.bestChoice"
            class="bg-linear-to-r from-rose-400 to-red-600 text-white text-center py-2 text-sm font-semibold">
            {{ $t("best_choice") }}
          </div>
          <div
            v-if="item.popular"
            class="bg-linear-to-r from-yellow-400 to-orange-600 text-white text-center py-2 text-sm font-semibold">
            {{ $t("popular") }}
          </div>
          <div class="p-6">
            <div
              class="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div class="flex-1 max-w-2/3 max-lg:text-center">
                <h3 class="text-4xl lg:text-2xl font-bold text-gray-900 mb-2">
                  {{ $t(item.name) }}
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ $t(item.note) }}
                </p>
              </div>

              <div class="text-center px-4">
                <div class="text-3xl font-bold text-gray-900">
                  {{ item.combo1.toLocaleString("vi-VN") }}
                </div>
                <div class="text-gray-600 text-sm">VNĐ</div>
              </div>

              <div class="text-center px-4">
                <div class="text-xl font-semibold text-blue-600">
                  {{ $t(item.discription) }}
                </div>
              </div>
              <div className="flex-shrink-0 min-w-1/5">
                <div
                  :class="`px-6 py-2 font-semibold transition-all duration-300 text-center rounded shadow-lg hover:shadow-xl text-white ${switchColorBg(
                    item
                  )}`"
                  @click="handlePayment(item)">
                  {{ $t("get") }} {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UModal
        v-if="openModal"
        :open="openModal"
        :ui="{ footer: 'justify-between' }">
        <template #header>
          <p class="text-xl dark:text-white text-black">
            {{ detailPackage.name }} {{ $t("package_store") }}
            <span class="text-green-500 font-bold">{{
              $t(detailPackage.discription)
            }}</span>
          </p>
        </template>
        <template #body>
          <p class="dark:text-white text-black">
            {{ $t("describe") }}
          </p>
          <div
            v-for="item of optionPackages"
            :key="item.due_date"
            :class="`relative cursor-pointer transition-all duration-300 my-4 mb-2 ${
              price === item.value ? 'transform scale-105' : 'hover:scale-102'
            }`"
            @click="changePrice(item.value)">
            <div
              :class="`rounded-2xl p-4 border-2 transition-all duration-300 ${
                price === item.value
                  ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
              }`">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div
                    :class="`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      price === item.value
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`">
                    <UIcon
                      v-if="price === item.value"
                      name="i-lucide-check"
                      class="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div class="flex items-baseline space-x-2">
                      <span class="text-lg font-bold text-gray-800">
                        {{ item.label.toLocaleString("vi-VN") }}
                      </span>
                    </div>
                    <div class="text-sm text-green-600 font-medium">
                      {{ item.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <UButton
            class="cursor-pointer"
            :label="$t('continue_payment')"
            color="success"
            variant="solid"
            @click="submitPayment" />
          <UButton
            class="cursor-pointer"
            :label="$t('cancel')"
            color="neutral"
            @click="closeModal" />
        </template>
      </UModal>

      <UModal
        v-if="openWarning"
        :open="openWarning"
        :ui="{ footer: 'justify-between' }">
        <template #header>
          <p class="text-lg dark:text-white text-black">
            {{ $t("note_update_package") }}
          </p>
        </template>
        <template #footer>
          <UButton
            class="cursor-pointer"
            :label="$t('yes')"
            color="success"
            variant="solid"
            @click="continuePayment" />
          <UButton
            class="cursor-pointer"
            :label="$t('cancel')"
            color="neutral"
            @click="closeModal" />
        </template>
      </UModal>

      <UModal
        v-if="openPayment"
        :open="openPayment"
        :ui="{ footer: 'justify-end' }">
        <template #header>
          <p class="text-xl dark:text-white text-black">Đơn hàng của bạn</p>
        </template>
        <template #body>
          <div class="dark:text-white text-black">
            <p>Vui lòng chuyển khoản với thông tin sau:</p>
            <p class="mt-3">
              Ngân hàng:
              <span
                class="px-2 py-1 ml-2 font-bold text-gray-800 border-2 border-gray-200 rounded-lg bg-gray-50"
                >TPBank</span
              >
            </p>
            <p class="mt-3">
              Số tài khoản:
              <span
                class="px-2 py-1 ml-2 font-bold text-gray-800 border-2 border-gray-200 rounded-lg bg-gray-50"
                >04047563801</span
              >
            </p>
            <p class="mt-3">
              Chủ tài khoản:
              <span
                class="px-2 py-1 ml-2 font-bold text-gray-800 border-2 border-gray-200 rounded-lg bg-gray-50"
                >NGUYEN THANH THIEN</span
              >
            </p>
            <p class="mt-3">
              NỘI DUNG:
              <span
                class="px-2 py-1 ml-2 font-bold text-gray-800 border-2 border-gray-200 rounded-lg bg-gray-50"
                >{{ messageCode }}</span
              >
            </p>
            <p class="mt-3">
              SỐ TIỀN:
              <span
                class="px-2 py-1 ml-2 font-bold text-gray-800 border-2 border-gray-200 rounded-lg bg-gray-50"
                >{{ price.toLocaleString("vi-VN") }}đ</span
              >
            </p>
            <div class="flex items-center text-sm text-gray-500 my-4">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="mx-4">Hoặc</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>
            <p>
              Quét mã QR sau (khuyến khích quét bằng các App ngân hàng, một số
              ví điện tử VNPAY, ShopeePay,...)
            </p>
            <img
              class="mx-auto my-4"
              :src="`https://qr.sepay.vn/img?acc=04047563801&bank=TPBANK&amount=${price}&des=${messageCode}`"
              alt="QR Code"
              width="200"
              height="200" />
          </div>
        </template>
        <template #footer>
          <UButton
            class="cursor-pointer"
            :label="$t('close')"
            color="neutral"
            @click="closePaymentModal" />
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
