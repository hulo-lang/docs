---
home: true
containerClass: home
icon: house
title: Home
heroImage: logo.png
heroText: Hulo
heroImageStyle:
tagline: Hulo is a batch-processing oriented programming language that compiles to native system-level scripts like Bash, PowerShell, and VBS.
actions:
  - text: GET STARTED
    icon: signs-post
    link: ./en_us/guide/
    type: primary

  - text: Docs
    icon: book
    link: ./en_us/grammar/

highlights:

  - header: Why choose Hulo?
    features:
      - title: Cross Platform
        icon: network-wired
        details: Compiles to multiple shell languages including Bash, PowerShell, and VBS ...
        link: 

      - title: Modern Syntax
        icon: code
        details: Clean, expressive syntax similar to modern programming languages, eliminating traditional shell scripting quirks
        link: 

      - title: Type Safety
        icon: circle-info
        details: Strong static typing system to catch errors at compile time rather than runtime
        link: 

      - title: Command Hints
        icon: comment-dots
        details: Intelligent code completion and inline documentation for all commands and APIs
        link: 

      - title: Native Support
        icon: puzzle-piece
        details: Allows embedding of unsafe native code blocks when direct system access is required
        link: 

      - title: Safety Features
        icon: lock
        details: Built-in error handling with try-catch mechanisms and automatic resource cleanup
        link: 

      - title: Compile-Time
        icon: diagram-project
        details: Advanced metaprogramming capabilities through compile-time code generation and analysis
        link: 

  - header: Toolchains
    description: Awesome and powerful extensions for Hulo
    image: /assets/image/box.svg
    highlights:
      - title: Compiler
        icon: fa-tools
        details: Hulo Compiler - Transpiles high-level Hulo code into Bash, PowerShell, VBScript, and Batch for seamless cross-platform automation scripting
        link: /toolchain/compiler

      - title: hlpm
        icon: fa-solid fa-cube
        details: Hulo Package Manager - Dependency management tool with version resolution and private registry support
        link: /toolchain/pm

      - title: Editor Plugins
        icon: puzzle-piece
        details: Official IDE extensions for VS Code/IntelliJ with syntax highlighting, debugger integration and LSP support
        link: /toolchain/editor_plugin

      - title: Terminal UI
        icon: fas fa-terminal
        details: Interactive terminal components (progress bars, menus) with cross-shell rendering compatibility
        link: /toolchain/tui

      - title: DevOps
        icon: fas fa-repeat
        details: Native CI/CD integration through Docker images, GitHub Actions templates and pipeline utilities
        link: /toolchain/devops

  - header: Huloize
    description: Rewrite in hulo with type safety guarantees
    features:
      - title: nvm
        icon: fa-brands fa-node
        details: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions
        link: https://github.com/hulo-lang/nvm.git

      - title: docker install
        icon: fa-brands fa-docker
        details: Docker installation script
        link: https://github.com/hulo-lang/docker-install.git

      - title: Scoop
        icon: fa-solid fa-bowl-food
        details: A command-line installer for Windows.
        link: https://github.com/hulo-lang/Scoop.git

      - title: gradlew
        icon: fa-brands fa-java
        details: Gradlew is the Gradle Wrapper script that standardizes builds by managing the correct Gradle version.
        link: https://github.com/hulo-lang/gradlew.git

      - title: amber-example
        icon: fa-solid fa-diamond
        details: A language compiled to Bash.
        link: https://github.com/hulo-lang/amber-example.git
      
      - title: Join us
        icon: lightbulb
        details: Help us to refactor everything!
        link: a

copyright: false
footer: Theme by <a href="https://theme-hope.vuejs.press/" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2025-present Hulo
---
