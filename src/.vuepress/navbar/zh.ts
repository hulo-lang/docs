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
    text: "模块",
    icon: "box",
    prefix: "/zh/modules/",
    link: "/zh/modules/"
  },
  {
    text: "蓝图",
    icon: "lightbulb",
    prefix: "/zh/blueprints/",
    link: "/zh/blueprints/"
  },
  "/zh/demos/",
  {
    text: "其他",
    icon: "circle-info",
    children: [
      {
        text: "项目",
        children: [
          {
            text: "常见问题",
            icon: "circle-question",
            link: "/others/faq"
          },
          {
            text: "路线图",
            icon: "map",
            link: "/others/roadmap",
          },
          {
            text: "变更日志",
            icon: "clock",
            link: "/others/changelog",
          },
          {
            text: "贡献指南",
            icon: "lightbulb",
            link: "/others/contribution",
          },
          {
            text: "协议",
            icon: "paperclip",
            link: "/others/license"
          }
        ]
      }
    ]
  },
]);
