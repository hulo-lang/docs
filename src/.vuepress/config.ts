import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/docs/",
  head: [
    ["link", { rel: "icon", href: "tab-icon.png" }],
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "Hulo",
      description: "✨ The official documentation site for the Hulo programming language.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Hulo",
      description: "✨ Hulo 编程语言的官方文档网站。",
    },
  },

  theme,
  // Enable it with pwa
  // shouldPrefetch: false,
});
