import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    {
      text: "Get Started",
      icon: "lightbulb",
      prefix: "guide/",
      collapsible: false,
      children: ["install", "usage"],
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "grammar/",
      children: [
        {
          text: "Basic Syntax",
          prefix: "base/",
          icon: "fas fa-magic",
          collapsible: true,
          children: ["spec", "pkg", "type", "cmd", "expr", "stmt", "flow", "func"],
        },
        {
          text: "Advanced Syntax",
          prefix: "advanced/",
          icon: "fas fa-rocket",
          collapsible: true,
          children: ["trait", "generics", "macro", "metadata"],
        },
        {
          text: "Standard Library",
          prefix: "stdlib/",
          icon: "fas fa-university",
          collapsible: true,
          children: [],
        }
      ],
    },
    {
      text: "Toolchain",
      icon: "hammer",
      prefix: "toolchain/",
      collapsible: false,
      children: ["pm", "editor_plugin", "tui", "devops"]
    },
    {
      text: "Feedback",
      icon: "rss",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    },
  ],
  "/blueprints/": [
    "architecture",
    {
      text: "Bash",
      icon: "fa-brands fa-linux",
      prefix: "/blueprints/bash/",
      collapsible: true,
      children: [
        "type",
        "expr"
      ]
    },
    {
      text: "Powershell",
      icon: "fa-brands fa-windows",
      link: "",
      collapsible: true,
      children: []
    },
    {
      text: "Batch",
      icon: "fa-brands fa-windows",
      link: "",
      collapsible: true,
      children: []
    },
    {
      text: "VBScript",
      icon: "fa-solid fa-v",
      link: "",
      collapsible: true,
      children: []
    },
    {
      text: "Amber",
      icon: "fa-solid fa-diamond",
      link: "",
      collapsible: true,
      children: []
    },
  ],
  "/demos": "structure",
  "/others/": [
    {
      text: "Project",
      icon: "circle-info",
      children: [
        "faq",
        "roadmap",
        "changelog",
        "contribution",
        "license"
      ]
    }
  ]
});
