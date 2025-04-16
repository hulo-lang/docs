---
title: Editor Plugin
icon: fa-solid fa-puzzle-piece
date: 2025-04-13
category: toolchain
tag:
    - plugin
license: MIT
---

在 Hulo 中，对 Command 类型（又称 cmd）的提示需要显式的声明类型定义，编辑器才有数据源进行代码提示/纠错/补全。但是，如果每次都解析一遍语法树会增加响应时长，因此 Hulo 会将 cmd 类型信息提前编译成 json 便于复用且加速编辑器响应。

代码提示状态图：

@startregex
/^(?<command>\w+)(?:\s+-(?<flag>\w+)(?:\s+(?<arg>(?:"[\"]*"|'[\']*'|\[[\]]*\]|\{[\}]*\}|[^*]+))?)?(?:\s+|$))*/gmx
@endregex

::: note
本图仅供参考，具体的实现以实际为主
:::
