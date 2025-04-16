---
title: Compiler
icon: fa-tools
date: 2025-04-15
category: toolchain
tag:
    - compiler
license: MIT
---

> 编译器（Compiler）是一种将高级语言源代码转换为目标代码（通常是机器代码或中间代码）的系统软件。它是连接人类抽象思维与底层计算机硬件执行的关键桥梁，承担着语法分析、语义校验、优化处理和代码生成等任务。在 Hulo 中编译器就是负责将 `.hl` 源代码转换成各类系统原生脚本语言。

## 配置文件

`huloc.yaml` 是 Hulo 项目的核心配置文件，用于定义编译器选项（compiler options）、包含的源文件、模块解析策略、输出结构等。它是让 Hulo 编译器正确理解项目结构与构建目标的关键。

### 基本结构
```yaml title="huloc.yaml"
compilerOptions:
include: ["src/"]
exclude: ["dist/"]
```

### 字段说明

**include**

指定需要编译的文件/目录
* 类型：`str[]`
* 默认值: []

**exclude**

排除不参与编译的目录
* 类型：`str[]`
* 默认值: []