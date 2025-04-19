import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    {
      text: "Get Started",
      icon: "lightbulb",
      prefix: "guide/",
      collapsible: false,
      link: "/guide/",
      children: ["install", "usage"],
    },
    {
      text: "Grammar",
      icon: "code",
      prefix: "grammar/",
      link: "/grammar/",
      collapsible: true,
      children: [
        "spec",
        "pkg",
        "type",
        "cmd",
        "expr",
        "stmt",
        "flow",
        "func",
        "trait",
        "generics",
        "macro",
        "metadata",
        "async",
        "test",
      ],
    },
    {
      text: "Standard Library",
      prefix: "libs/",
      icon: "fas fa-coins",
      collapsible: true,
      children: [
        "builtin",
        "time",
        "math",
        "fs",
        "assert",
        "bash",
        "powershell",
        "batch",
        "vbs",
        "amber",
      ],
    },
    {
      text: "Toolchain",
      icon: "hammer",
      prefix: "toolchain/",
      collapsible: false,
      link: "/toolchain/",
      children: ["compiler", "pm", "editor_plugin", "tui", "devops"]
    },
    {
      text: "Feedback",
      icon: "rss",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    },
  ],
  "/blueprints/": [
    "architecture",
    "hcr",
    {
      text: "Bash",
      icon: "fa-brands fa-linux",
      prefix: "/blueprints/bash/",
      collapsible: true,
      children: [
        "type",
        "expr",
        "branch",
        "loop",
        "func",
      ]
    },
    {
      text: "Powershell",
      icon: "fa-brands fa-windows",
      prefix: "/blueprints/powershell/",
      collapsible: true,
      children: []
    },
    {
      text: "Batch",
      icon: "fa-brands fa-windows",
      prefix: "/blueprints/batch/",
      collapsible: true,
      children: ["type"]
    },
    {
      text: "VBScript",
      icon: "fa-solid fa-v",
      prefix: "/blueprints/vbs/",
      collapsible: true,
      children: ["branch"]
    },
    {
      text: "Amber",
      icon: "fa-solid fa-diamond",
      prefix: "/blueprints/amber/",
      collapsible: true,
      children: [
        "type",
        "expr",
        "branch",
        "loop",
        "func",
      ]
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
