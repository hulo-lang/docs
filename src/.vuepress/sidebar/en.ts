import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    {
      text: "Get Started",
      icon: "lightbulb",
      prefix: "guide/",
      collapsible: false,
      link: "/guide/",
      children: ["install", "env", "usage"],
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
        "comptime",
        "decorator",
        "unsafe",
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
      text: "Toolchain",
      icon: "hammer",
      prefix: "toolchain/",
      collapsible: false,
      link: "/toolchain/",
      children: ["compiler", "pm", "editor_plugin", "tui", "devops"]
    },
    {
      text: "Design Pattern",
      icon: "compass-drafting",
      prefix: "design/",
      collapsible: true,
      link: "/design/",
      children: []
    },
    {
      text: "Feedback",
      icon: "rss",
      link: "https://github.com/hulo-lang/hulo/issues",
    },
  ],
  "/architecture/": [
    "architecture",
    "hcr",
    {
      text: "Analyzer",
      icon: "microscope",
      prefix: "/architecture/analyzer/",
      link: "/architecture/analyzer/",
      children: [
        "install",
        "quickstart",
        "grammar"
      ]
    },
    {
      text: "Bash",
      icon: "fa-brands fa-linux",
      prefix: "/architecture/bash/",
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
      prefix: "/architecture/powershell/",
      collapsible: true,
      children: []
    },
    {
      text: "Batch",
      icon: "fa-brands fa-windows",
      prefix: "/architecture/batch/",
      collapsible: true,
      children: ["type"]
    },
    {
      text: "VBScript",
      icon: "fa-solid fa-v",
      prefix: "/architecture/vbs/",
      collapsible: true,
      children: ["branch"]
    },
    {
      text: "Amber",
      icon: "fa-solid fa-diamond",
      prefix: "/architecture/amber/",
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
