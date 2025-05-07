---
title: Amber
icon: fa-solid fa-diamond
date: 2025-04-19
category: blueprint
tag: 
    - amber
license: MIT
---

[Amber](https://amber-lang.com/) is a programming language that compiles to Bash. It's a high level programming language that makes it easy to create shell scripts. It's particularly well suited for cloud services.

Hulo can compile hulo script to amber, and thereby you can get bash from amber script using its compiler.

根据 amber 的命名规范，Hulo 编译器将会把源代码中的变量、函数全部翻译成 snake_case 命名法的风格。

## 编译

```sh
hlpm build . --lang amber
```

## 运行

```sh
hlpm run . --lang amber
```
