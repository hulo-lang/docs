import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/docs/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Hulo",
      description: "A docs demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Hulo",
      description: "vuepress-theme-hope 的文档演示",
    },
  },

  theme,
  // Enable it with pwa
  // shouldPrefetch: false,
});
