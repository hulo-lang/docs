import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  {
    text: "Get Started",
    icon: "signs-post",
    prefix: "/guide/",
    link: "/guide/"
  },
  {
    text: "Docs",
    icon: "book",
    prefix: "/grammar/",
    link: "/grammar/"
  },
  {
    text: "Blueprints",
    icon: "lightbulb",
    prefix: "/blueprints/",
    link: "/blueprints/"
  },
  "/demos/",
  {
    text: "Others",
    icon: "circle-info",
    children: [
      {
        text: "PROJECT",
        children: [
          {
            text: "CHANGELOG",
            icon: "clock",
            link: "#",
          },
          {
            text: "Contribution Guide",
            icon: "lightbulb",
            link: "#",
          },
          {
            text: "License",
            icon: "fa-solid fa-paperclip",
            link: "#"
          }
        ]
      }
    ]
  },
]);
