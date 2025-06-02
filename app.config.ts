export default defineAppConfig({
  toaster: {
    position: "top-center" as const,
  },
  ui: {
    modal: {
      slots: {
        title: "dark:text-white",
        content: "dark:bg-black shadow-lg text-white",
        base: "dark:bg-black dark:text-white rounded-lg shadow-lg",
        overlay: "dark:bg-black/70 bg-white/70 backdrop-blur-sm",
      },
    },
  },
});
