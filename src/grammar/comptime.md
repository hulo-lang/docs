---
title: Comptime
icon: ghost
category: grammar
tag:
    - comptime
license: MIT
---

> `comptime` 是编程语言中的一个关键字，表示“编译期执行”。使用 `comptime` 包裹的代码会在编译阶段而非运行时被求值、执行或展开。本质上是将运行时代码提前到编译期执行，是构建高性能、可扩展语言系统的核心能力之一。它为语言带来了强大的元编程能力，是现代系统语言中越来越常见的设计特性。

## 常量折叠（constant folding）

在编译期就把常量表达式的结果算出来，避免运行时重复计算。

```hulo
const PI = 3.14
const radius = 5
const area = comptime {
    3.14 * $radius * $radius
} // 编译期直接得出结果 78.5
```
在上述示例中，`comptime` 代码块中的表达式在编译期就被求值并替换，因此对 `area` 的声明等价于直接写成 `const area = 78.5`，从而避免了运行时的任何计算开销，提高了性能和效率。

## 编译期类

## 编译期函数

## 编译期变量

在 Hulo 中内置了一些编译期变量，便于代码调试

* FILE，获取当前文件名
* LINE, 获取代码行
* CALL，获取调用者
* OS, 获取当前操作系统
* TERM, 获取终端

## 编译期宏

## comptime 运算符