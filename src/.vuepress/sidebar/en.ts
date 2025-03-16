import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    "portfolio",
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Slides",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    },
  ],
  "/handbook/": [{
    text: "Handbook",
    icon: "book",
    prefix: "",
    link: "/handbook/",
    children: [
      {
        text: "Getting Started",
        icon: "lightbulb",
        prefix: "guide/",
        collapsible: true,
        children: ["install", "usage"],
      },
      {
        text: "Basic Syntax",
        prefix: "base/",
        icon: "fas fa-magic",
        collapsible: true,
        children: ["type", "cmd", "expr", "stmt", "flow", "func"],
      },
      {
        text: "Advanced Syntax",
        prefix: "advanced/",
        icon: "fas fa-rocket",
        collapsible: true,
        children: [],
      },
      {
        text: "Standard Library",
        prefix: "stdlib/",
        icon: "fas fa-university",
        collapsible: true,
        children: [],
      }
    ],
  }],
});
