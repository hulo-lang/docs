---
title: HCR
icon: fa-solid fa-bullseye
date: 2025-04-19
category: blueprint
tag:
    - hcr
license: MIT
---

> HCR 是 Hulo编译规则 的缩写，主要用于相同语法不同版本的编译策略控制。

## 版号

## 规则
<主版本>.<语法版本>.<策略集>.<规则补丁>[.<兼容标记>]

.u 有最新版本升级
.c 

1.1.bash.map

version: 1.2
target: bash

hulo 编译器版本 1.2

版本方案 假设 multiString 的实现版本为 1.0.here-doc.v1
可以作翻译

1.1
实现
1.0
实现基础类型

multiStr:
1.0.here-doc.1 // 在 1.0 的 版本中实现的 here-doc ，补丁 1
1.3.here-doc.1 // 在 1.3 的 版本中实现的 here-doc ，补丁 1

如果你的编译器版本在  1.2 那么他匹配到 1.3 的话 他会抛出异常

1.0.here-doc.1.c // 如果 .c 则为近似的兼容版本 如果有 1.2 的版本则选择 1.2 的版本的

x.y 这个同步 Hulo 的版本号


主版本.次版本.修订号（MAJOR.MINOR.PATCH）

MAJOR：不兼容的API变更

MINOR：向后兼容的功能新增

PATCH：向后兼容的问题修复

细分版本 实现第一个 demo，同时规定好 HCR 和 版本的映射

也可以不指定HCR 直接指定策略集合，默认使用最高版本