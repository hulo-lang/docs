import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  {
    text: "Home",
    icon: "house",
    prefix: "/home/",
    link: "/"
  },
  {
    text: "Get Started",
    icon: "signs-post",
    prefix: "/guide/",
    link: "/guide/"
  },
  {
    text: "Grammar",
    icon: "code",
    prefix: "/grammar/",
    link: "/grammar/"
  },
  {
    text: "Ecosystem",
    icon: "layer-group",
    children: [
      {
        text: "Library",
        icon: "box",
        children: [
          {
            text: "Standard Library",
            link: "/libs/builtin"
          },
          {
            text: "Modules",
            link: "/modules/builtin"
          },
        ]
      },
      {
        text: "Community",
        icon: "users",
        children: [
          {
            text: "Discord Chat",
            link: "https://discord.gg/EGyaCRjEmV"
          },
        ]
      },
      {
        text: "Plugins",
        icon: "plug",
        children: [
          {
            text: "VSCode Extension",
            link: "https://marketplace.visualstudio.com/items?itemName=hulo-lang.hulo"
          },
          {
            text: "JetBrains Plugin",
            link: "https://plugins.jetbrains.com/plugin"
          },
        ]
      }
    ]
  },
  {
    text: "Blueprints",
    icon: "lightbulb",
    prefix: "/blueprints/",
    link: "/blueprints/"
  },
  "/demos/",
  {
    text: "Help & Support",
    icon: "circle-check",
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
