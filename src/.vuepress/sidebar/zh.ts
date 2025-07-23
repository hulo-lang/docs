import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    {
      text: "快速开始",
      icon: "lightbulb",
      prefix: "guide/",
      collapsible: false,
      link: "guide/",
      children: ["install", "env", "usage"],
    },
    {
      text: "语法",
      icon: "code",
      prefix: "grammar/",
      link: "grammar/",
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
        "comptime",
        "decorator",
        "unsafe",
        "async",
        "test",
      ],
    },
    {
      text: "标准库",
      prefix: "libs/",
      icon: "fas fa-coins",
      link: "libs/",
      collapsible: true,
      children: [
        "builtin",
        "time",
        "math",
        "fs",
        "testify",
        "reflect",
        "bash",
        "powershell",
        "batch",
        "vbs",
        "amber",
      ],
    },
    {
      text: "工具链",
      icon: "hammer",
      prefix: "toolchain/",
      collapsible: false,
      link: "toolchain/",
      children: ["compiler", "pm", "editor_plugin", "tui", "devops"]
    },
    {
      text: "设计模式",
      icon: "compass-drafting",
      prefix: "design/",
      collapsible: true,
      link: "design/",
      children: []
    },
    {
      text: "反馈",
      icon: "rss",
      link: "https://github.com/hulo-lang/hulo/issues",
    },
  ],
  "/zh/blueprints/": [
    "architecture",
    "hcr",
    {
      text: "Bash",
      icon: "fa-brands fa-linux",
      prefix: "/zh/blueprints/bash/",
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
      prefix: "/zh/blueprints/powershell/",
      collapsible: true,
      children: []
    },
    {
      text: "Batch",
      icon: "fa-brands fa-windows",
      prefix: "/zh/blueprints/batch/",
      collapsible: true,
      children: ["type"]
    },
    {
      text: "VBScript",
      icon: "fa-solid fa-v",
      prefix: "/zh/blueprints/vbs/",
      collapsible: true,
      children: ["branch"]
    },
    {
      text: "Amber",
      icon: "fa-solid fa-diamond",
      prefix: "/zh/blueprints/amber/",
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
  "/zh/demos": "structure",
  "/zh/others/": [
    {
      text: "项目",
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
