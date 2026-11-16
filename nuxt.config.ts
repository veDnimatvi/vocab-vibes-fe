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
    "@vite-pwa/nuxt", // Thêm module PWA
  ],
  pwa: {
    manifest: {
      name: "Vocab Vibes",
      description: "Ứng dụng học từ vựng hiệu quả",
      icons: [
        {
          src: "icons/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      runtimeCaching: [
        {
          // Cache file phát âm từ Youdao (xem composables/useWordAudio.js).
          // Youdao không có CORS -> response là opaque (status 0), vẫn cache được.
          urlPattern: /^https:\/\/dict\.youdao\.com\/dictvoice\?.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "word-audio",
            cacheableResponse: { statuses: [0, 200] },
            expiration: {
              maxEntries: 1000,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 năm
              purgeOnQuotaError: true,
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
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
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4514641971794594",
          async: true,
        },
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
