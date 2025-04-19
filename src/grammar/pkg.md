---
title: Package
icon: fas fa-box
date: 2025-04-13
category: grammar
tag: 
    - pkg
license: MIT
---

## pub
pub 关键字用于标注表达式/语句是否可导出。默认情况下，没有pub标记的表达式/语句是无法供外部访问的。
```hulo :no-line-numbers
pub var PI = 3.14

pub fn sayHello() {
    echo("Hello World")
}
```

## import
对于被 `pub` 标记的表达式/语句，便可以用 import 关键字在外部引入，且在声明的时候省略 `.hl` 扩展文件名。

### 直接执行模块（不导入）
::: tip
适用于只想执行模块中的副作用（比如注册全局变量、初始化逻辑）
:::
```hulo :no-line-numbers
import "./setup"
```

### 命名导入（Named Import）
::: important
* 只能导入被 `pub` 关键字导出的成员
* 必须使用模块原本的名称
* 支持解构风格导入
:::
```hulo :no-line-numbers
import { funcA, funcB } from "./myModule"
```

🔹 重命名导入（别名）
```hulo :no-line-numbers
import { funA as A } from "./myModule"
```

🔹 导入所有导出
```hulo :no-line-numbers
// 不带别名
import * from "./myModule"
funcA()
funcB()

// 带别名
import * as myModule from "./myModule"
myModule.funcA()
myModule.funcB()
```