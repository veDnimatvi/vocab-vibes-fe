import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ui: {
    colorMode: false,
  },
  compatibilityDate: "2025-06-02",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "nuxt-vue3-google-signin",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
  ],
  colorMode: {
    classSuffix: "", // để dark => class là `dark`, không phải `dark-mode`
    preference: "light", // hoặc 'light' nếu muốn mặc định là sáng
    fallback: "light",
  },
  googleFonts: {
    families: {
      Lexend: true,
    },
  },
  googleSignIn: {
    clientId:
      "764916376919-9m2dh33i64ubst4lpc4607hnps15hcpu.apps.googleusercontent.com",
  },
  i18n: {
    strategy: "no_prefix",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "vn", name: "Vietnamese", file: "vn.json" },
    ],
    defaultLocale: "vn",
  },
  app: {
    head: {
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-29PBZ4B3FJ",
          async: true,
        },
        {
          textContent: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-29PBZ4B3FJ');
          `,
        },
      ],
    },
  },
});