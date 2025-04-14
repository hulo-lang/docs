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
