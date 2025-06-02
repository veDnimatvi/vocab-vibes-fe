<template>
  <Loading :loading="isLoading" />
  <header
    class="sticky top-0 border-b-2 dark:border-[#3a3a3a] border-[#e5e5e5] bg-white dark:bg-[#212121]">
    <div
      class="flex row-start-1 gap-6 items-center justify-between w-full font-pixel container mx-auto py-3 text-md max-lg:px-2">
      <div class="lg:hidden" @click="handleMenuMobile">
        <UIcon name="i-lucide-align-justify" class="size-8 mt-2" />
      </div>
      <NuxtLink
        class="flex items-center justify-center gap-3 cursor-pointer ml-3 lg:hidden"
        to="/">
        <img
          src="~/assets/images/logo.png"
          alt="logo"
          class="lg:w-[40px] lg:h-[40px] max-lg:w-[30px] max-lg:h-[30px]"
          width="40"
          height="40" />
        <p class="font-bold max-lg:text-md lg:text-lg">VOCABVIBES</p>
      </NuxtLink>

      <div class="max-lg:hidden flex items-center justify-between gap-3">
        <NuxtLink
          class="flex items-center justify-center gap-3 cursor-pointer ml-3"
          to="/">
          <img
            src="~/assets/images/logo.png"
            alt="logo"
            class="lg:w-[40px] lg:h-[40px] max-lg:w-[30px] max-lg:h-[30px]"
            width="40"
            height="40" />
          <p class="font-bold max-lg:text-md lg:text-lg">VOCABVIBES</p>
        </NuxtLink>
        <NuxtLink
          to="/"
          active-class="text-red-500"
          class="px-3 py-2 cursor-pointer font-bold hover:text-red-500">
          <div class="relative">
            {{ $t("home") }}
          </div>
        </NuxtLink>
        <NuxtLink
          to="/practice"
          active-class="text-red-500"
          class="px-3 py-2 cursor-pointer font-bold hover:text-red-500">
          {{ $t("practice") }}
        </NuxtLink>
        <NuxtLink
          to="/vocabulary"
          active-class="text-red-500"
          class="px-3 py-2 cursor-pointer font-bold hover:text-red-500">
          {{ $t("my_vocab") }}
        </NuxtLink>
        <NuxtLink
          to="/upgrade"
          active-class="text-red-500"
          class="px-3 py-2 cursor-pointer font-bold hover:text-red-500">
          <div class="relative">
            {{ $t("Upgrade") }}
            <img
              class="absolute -top-[10px] -right-[13px] rotate-15 right"
              src="~/assets/images/icon-crown.png"
              alt="crown" />
          </div>
        </NuxtLink>
        <NuxtLink
          to="/feedback"
          active-class="text-red-500"
          class="px-3 py-2 cursor-pointer font-bold hover:text-red-500">
          {{ $t("feed_back") }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <USelect
          v-model="lang"
          :items="itemLanguage"
          :avatar="avatar"
          class="w-40 max-lg:hidden"
          @change="handleChangeLang" />
        <button class="max-lg:hidden pt-2 cursor-pointer" @click="toggleTheme">
          <UIcon
            name="i-lucide-sun"
            class="size-5"
            v-if="colorMode.preference === 'light'" />
          <UIcon name="i-lucide-eclipse" class="size-5" v-else />
        </button>
        <p v-if="isLogin" class="font-bold max-lg:hidden">
          {{ userInfo?.name }}
        </p>
        <UDropdownMenu
          v-if="isLogin"
          :items="items"
          :ui="{ content: 'w-48' }"
          :content="{ align: 'end' }">
          <UAvatar :src="userInfo?.picture" alt="avatar" size="lg" />
        </UDropdownMenu>
        <div v-if="!isLogin" class="ml-3">
          <GoogleSignInButton
            @success="handleLoginSuccess"
            @error="handleLoginError"></GoogleSignInButton>
        </div>
      </div>
      <UModal fullscreen :open="openMenuMobile">
        <template #header>
          <div class="lg:hidden flex justify-between items-center w-full">
            <NuxtLink
              class="flex items-center justify-center gap-3 cursor-pointer"
              to="/">
              <img
                src="~/assets/images/logo.png"
                alt="logo"
                width="40"
                height="40" />
              <p class="font-bold text-lg text-black dark:text-white">
                VOCABVIBES
              </p>
            </NuxtLink>
            <UIcon
              name="i-lucide-circle-x"
              class="size-8 text-black dark:text-white"
              @click="openMenuMobile = false" />
          </div>
        </template>
        <template #body>
          <div class="flex justify-center py-5">
            <button
              class="pt-2 cursor-pointer text-black dark:text-white flex justify-center items-center gap-2"
              @click="toggleTheme">
              <span class="font-bold">{{ $t("theme") }}: </span>
              <UIcon
                name="i-lucide-sun"
                class="size-7"
                v-if="colorMode.preference === 'light'" />
              <UIcon name="i-lucide-eclipse" class="size-7" v-else />
            </button>
          </div>
          <div class="flex justify-center py-5" @click="openMenuMobile = false">
            <NuxtLink
              to="/"
              active-class="text-red-500"
              class="px-3 py-2 cursor-pointer font-bold hover:text-red-500">
              <div class="relative text-black dark:text-white">
                {{ $t("home") }}
              </div>
            </NuxtLink>
          </div>
          <div class="flex justify-center py-5" @click="openMenuMobile = false">
            <NuxtLink
              to="/practice"
              active-class="text-red-500"
              class="px-3 py-2 cursor-pointer font-bold hover:text-red-500 text-black dark:text-white">
              {{ $t("practice") }}
            </NuxtLink>
          </div>
          <div class="flex justify-center py-5" @click="openMenuMobile = false">
            <NuxtLink
              to="/vocabulary"
              active-class="text-red-500"
              class="px-3 py-2 cursor-pointer font-bold hover:text-red-500 text-black dark:text-white">
              {{ $t("my_vocab") }}
            </NuxtLink>
          </div>
          <div class="flex justify-center py-5" @click="openMenuMobile = false">
            <NuxtLink
              to="/upgrade"
              active-class="text-red-500"
              class="px-3 py-2 cursor-pointer font-bold hover:text-red-500 text-black dark:text-white">
              <div class="relative">
                {{ $t("Upgrade") }}
                <img
                  class="absolute -top-[10px] -right-[13px] rotate-15 right"
                  src="~/assets/images/icon-crown.png"
                  alt="crown" />
              </div>
            </NuxtLink>
          </div>
          <div class="flex justify-center py-5" @click="openMenuMobile = false">
            <NuxtLink
              to="/feedback"
              active-class="text-red-500"
              class="px-3 py-2 cursor-pointer font-bold hover:text-red-500 text-black dark:text-white">
              {{ $t("feed_back") }}
            </NuxtLink>
          </div>
          <div class="flex justify-center py-5">
            <USelect
              v-model="lang"
              :items="itemLanguage"
              :avatar="avatar"
              class="w-40"
              @change="handleChangeLang" />
          </div>
        </template>
      </UModal>
    </div>
  </header>
  <div class="h-[91vh] max-lg:px-5 lg:px-56 pt-6">
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Loading from "~/components/Loading/index.vue";
import { GoogleSignInButton } from "vue3-google-signin";
import { ApiLogin } from "~/apis/auth";
import { useRoute } from "vue-router";
const colorMode = useColorMode();
const toast = useToast();
const route = useRoute();
const { t, locale, setLocale } = useI18n();
const items = computed(() => [
  [
    {
      label: t("edit"),
      icon: "i-lucide-pencil",
    },
  ],
  [
    {
      label: t("logout"),
      color: "error",
      icon: "i-lucide-log-out",
      onSelect() {
        logout();
      },
    },
  ],
]);

const itemLanguage = ref([
  {
    label: "Vietnamese",
    value: "vn",
    avatar: {
      src: "https://img.icons8.com/?size=35&id=2egPD0I7yi4-&format=png&color=000000",
      alt: "vn",
    },
  },
  {
    label: "English",
    value: "en",
    avatar: {
      src: "https://img.icons8.com/?size=35&id=t3NE3BsOAQwq&format=png&color=000000",
      alt: "en",
    },
  },
]);
const lang = ref();
const isLoading = ref(false);
const openMenuMobile = ref(false);
const isLogin = ref(null);
const userInfo = reactive({
  name: "",
  picture: "",
});

const avatar = computed(
  () => itemLanguage.value.find((item) => item.value === lang.value)?.avatar
);

const handleChangeLang = () => {
  setLocale(lang.value);
};

const handleMenuMobile = () => {
  openMenuMobile.value = true;
};

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
onMounted(() => {
  lang.value = getCookie("i18n_redirected") || "vn";
  const token = getCookie(KEY.TOKEN);
  if (token) {
    userInfo.name = getCookie(KEY.NAME);
    userInfo.picture = getCookie(KEY.PICTURE);
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});

const logout = () => {
  userInfo.name = "";
  userInfo.picture = "";
  removeCookie(KEY.TOKEN);
  removeCookie(KEY.NAME);
  removeCookie(KEY.PICTURE);
  isLogin.value = false;
  if (route.path !== "/" && route.path !== "/feedback") {
    window.location.reload();
  }
};

const handleLoginSuccess = (response) => {
  onSubmit(response);
};

const handleLoginError = () => {
  toast.add({
    title: "Login failed !",
    color: "error",
    duration: 1000,
    placement: "top-center",
  });
};

const onSubmit = async (data) => {
  isLoading.value = true;
  try {
    const res = await ApiLogin({
      token: data?.credential,
    });

    if (res?.data) {
      toast.add({
        title: "Login successful !",
        color: "success",
        duration: 1000,
        placement: "top-center",
      });
      setCookie(KEY.TOKEN, res?.data?.accessToken);
      setCookie(KEY.NAME, res?.data?.name);
      setCookie(KEY.PICTURE, res?.data?.picture);
      userInfo.name = res?.data?.name;
      userInfo.picture = res?.data?.picture;
      isLogin.value = true;
    }
    isLoading.value = false;
    if (route.path !== "/" && route.path !== "/feedback") {
      window.location.reload();
    }
  } catch (error) {
    isLoading.value = false;
    toast.add({
      title: "Login failed !",
      color: "error",
      duration: 1000,
      placement: "top-center",
    });
  }
};
</script>

<style lang="scss" scoped></style>
