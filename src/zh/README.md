---
home: true
containerClass: home
icon: house
title: 主页
heroImage: logo.png
heroText: Hulo
heroImageStyle:
tagline: Hulo 是一门专为批处理设计的编程语言，可编译为 Bash、PowerShell 和 VBS 等原生系统级脚本语言。
actions:
  - text: 立即开始
    link: ./guide/
    icon: signs-post
    type: primary

  - text: 文档
    link: ./grammar/

highlights:

  - header: 为什么选择 Hulo ？
    features:
      - title: 跨平台
        icon: network-wired
        details: 编译成多种批处理语言，如 Bash, PowerShell, 及 VBS ...
        link: 

      - title: 现代语法
        icon: code
        details: 同现代编程语言类似的易于表达的语法，消除传统 Shell 脚本古怪的特性
        link: 

      - title: 类型安全
        icon: circle-info
        details: 强大的静态类型系统，在编译时捕获错误，而不是在运行时捕获错误
        link: 

      - title: 命令提示
        icon: comment-dots
        details: 智能代码补全和对命令及API内置文档
        link: 

      - title: 原生支持
        icon: puzzle-piece
        details: 支持嵌入不安全的原生代码块
        link: 

      - title: 安全特性
        icon: lock
        details: 内置基于 try-catch 的错误处理机制以及自动资源回收
        link: 

      - title: 元编程
        icon: diagram-project
        details: 基于编译时代码生成和分析的高级元编程功能
        link: 

  - header: 工具链
    description: Hulo 的强大扩展
    image: /assets/image/box.svg
    highlights:
      - title: 编译器
        icon: fa-tools
        details: Hulo 编译器 - Transpiles high-level Hulo code into Bash, PowerShell, VBScript, and Batch for seamless cross-platform automation scripting
        link: /toolchain/compiler

      - title: hlpm
        icon: fa-solid fa-cube
        details: Hulo 包管理 - 具有解析版本和自建私有仓库能力的依赖管理工具
        link: /toolchain/pm

      - title: 编辑器插件
        icon: puzzle-piece
        details: Official IDE extensions for VS Code/IntelliJ with syntax highlighting, debugger integration and LSP support
        link: /toolchain/editor_plugin

      - title: 终端 UI
        icon: fas fa-terminal
        details: Interactive terminal components (progress bars, menus) with cross-shell rendering compatibility
        link: /toolchain/tui

      - title: DevOps
        icon: fas fa-repeat
        details: Native CI/CD integration through Docker images, GitHub Actions templates and pipeline utilities
        link: /toolchain/devops

  - header: Huloize
    description: 基于类型安全的 Hulo 重构
    features:
      - title: nvm
        icon: fa-brands fa-node
        details: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions
        link: https://github.com/hulo-lang/nvm.git

      - title: docker install
        icon: fa-brands fa-docker
        details: Docker 安装脚本
        link: https://github.com/hulo-lang/docker-install.git

      - title: Scoop
        icon: fa-solid fa-bowl-food
        details: Windows 的命令行安装工具
        link: https://github.com/hulo-lang/Scoop.git

      - title: gradlew
        icon: fa-brands fa-java
        details: Gradlew is the Gradle Wrapper script that standardizes builds by managing the correct Gradle version.
        link: https://github.com/hulo-lang/gradlew.git

      - title: amber-example
        icon: fa-solid fa-diamond
        details: 编译至 Bash 的语言
        link: https://github.com/hulo-lang/amber-example.git
      
      - title: 加入我们
        icon: lightbulb
        details: 帮助我们重构一切！
        link: a

copyright: false
footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2025-至今 Hulo
---
