---
title: 指南
icon: lightbulb
date: 2025-04-13
category: 指南
license: MIT
---

```component VPBanner
title: 逐步教程
content: 欢迎来到 Hulo 编程语言的世界！本教程专为初学者设计，如果你已有编程经验，可以直接跳转到 <i>语法</i> 部分。
background: url("https://theme-hope-assets.vuejs.press/bg/10-light.svg")
actions:
  - text: 查看语法
    link: ../grammar/
```

欢迎来到 Hulo 编程语言文档！🎉

Hulo 是一个跨平台的脚本语言，能够将你的代码编译为多种目标平台的脚本，包括 Bash、PowerShell、VBScript 等。

## 快速开始

这是一个简单的 Hello World 示例：

```hulo title="main.hl"
echo "Hello World"
```

运行 `hulo main.hl`，它将会编译为：

### Bash 版本
```sh
echo "Hello World"
```

### VBScript 版本
```vb
Set shell = CreateObject("WScript.Shell")
shell.Exec("cmd.exe /c echo ""Hello, World!""")
```

### PowerShell 版本
```powershell
Write-Host "Hello World"
```

## 主要特性

- **跨平台编译**：一次编写，多平台运行
- **简单易学**：语法简洁，学习成本低
- **丰富的标准库**：内置多种实用功能
- **类型系统**：编译期静态类型检测机制，更加安全高效

## 下一步

- [安装 Hulo](./install.md) - 了解如何安装和配置
- [环境变量](./env.md) - 配置开发环境
- [语法参考](../grammar/) - 深入学习语言特性
- [标准库](../libs/) - 探索内置功能

更多平台和目标语言将在未来版本中支持！