import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "主页",
    icon: "house",
    prefix: "/zh/home/",
    link: "/zh/"
  },
  {
    text: "快速开始",
    icon: "signs-post",
    prefix: "/zh/guide/",
    link: "/zh/guide/"
  },
  {
    text: "语法",
    icon: "code",
    prefix: "/zh/grammar/",
    link: "/zh/grammar/"
  },
  {
    text: "生态系统",
    icon: "layer-group",
    children: [
      {
        text: "库",
        icon: "box",
        children: [
          {
            text: "标准库",
            link: "/libs/builtin"
          },
          {
            text: "模块",
            link: "/modules/builtin"
          },
        ]
      },
      {
        text: "社区",
        icon: "users",
        children: [
          {
            text: "Discord 聊天室",
            link: "https://discord.gg/EGyaCRjEmV"
          },
        ]
      },
      {
        text: "插件",
        icon: "plug",
        children: [
          {
            text: "VSCode 扩展",
            link: "https://marketplace.visualstudio.com/items?itemName=hulo-lang.hulo"
          },
          {
            text: "JetBrains 插件",
            link: "https://plugins.jetbrains.com/plugin"
          },
        ]
      }
    ]
  },
  {
    text: "蓝图",
    icon: "lightbulb",
    prefix: "/zh/blueprints/",
    link: "/zh/blueprints/"
  },
  "/zh/demos/",
  {
    text: "帮助与支持",
    icon: "circle-check",
    children: [
      {
        text: "项目",
        children: [
          {
            text: "常见问题",
            icon: "circle-question",
            link: "/zh/others/faq"
          },
          {
            text: "路线图",
            icon: "map",
            link: "/zh/others/roadmap",
          },
          {
            text: "变更日志",
            icon: "clock",
            link: "/zh/others/changelog",
          },
          {
            text: "贡献指南",
            icon: "lightbulb",
            link: "/zh/others/contribution",
          },
          {
            text: "协议",
            icon: "paperclip",
            link: "/zh/others/license"
          }
        ]
      }
    ]
  },
]);
