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
            text: "FAQ",
            icon: "circle-question",
            link: "/others/faq"
          },
          {
            text: "Roadmap",
            icon: "map",
            link: "/others/roadmap",
          },
          {
            text: "Changelog",
            icon: "clock",
            link: "/others/changelog",
          },
          {
            text: "Contribution Guide",
            icon: "lightbulb",
            link: "/others/contribution",
          },
          {
            text: "License",
            icon: "paperclip",
            link: "/others/license"
          }
        ]
      }
    ]
  },
]);
