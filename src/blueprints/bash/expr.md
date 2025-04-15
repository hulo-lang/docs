---
title: Expressions
icon: fas fa-puzzle-piece
date: 2025-04-13
category: blueprint
tag: 
    - bash
    - expr
license: MIT
---

## 参数展开

| 表达式      | 含义 | 等价于 |
| ----------- | ----------- | ----------- |
| $\{var} | 变量值 | $var 或 ${var} |
| $\{var:-default} | 如果为空则使用默认值 | $var ?? "default" |
| $\{var:=default} | 如果为空则赋值默认值 | $var ??= "default" |
| $\{var:+alt} | 如果设置了，则替代 |  |
| $\{var:?err} | 如果为空则报错并退出 | $var ?? throw "msg" |
| $\{#var} | 字符串长度 | $var.len |
| $\{var:offset} | 从 offset 开始 | $var[2:] |
| $\{var:offset:length} | offset 开始，length 长度 | $var[2:2+3] |
| $\{var#pattern} | 从开头移除最短匹配 |  |
| $\{var##pattern} | 从开头移除最长匹配	| |
| $\{var%pattern} | 从结尾移除最短匹配 | |
| $\{var%%pattern} | 从结尾移除最长匹配 | |
| $\{var/pat/rep} | 替换第一个匹配 | "abca".replace('a', '_a') |
| $\{var//pat/rep} | 替换所有匹配 | "abca".replace_all('a', '_a') |
| $\{var/#pat/rep} | 如果以 pat 开头才替换 | "abca".replace_all(r"^a", "_a") |
| $\{var/%pat/rep} | 如果以 pat 结尾才替换 | "abca".replace_all(r"a$", "_a") |
| $\{#arr[@]} | 数组元素个数 | $arr.len |
| $\{#arr[1]} | 第 i 个元素长度 | $arr[1].len |