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

## 模块

在 Hulo 中，**模块**是组织代码的一种方式，本质上是**命名空间的别名**。它可以将外部的变量、函数、常量等统一包装，避免命名冲突，并提升代码的可读性与可维护性。

### 声明模块

```hulo
mod math {
    const PI = 3.14

    fn add(a: num, b: num) => $a + $b
    fn square(x: num) => $x * $x
}
```

此时，`math` 模块包含 `add` 与 `square` 两个函数。

### 访问成员

```hulo
let result = math::add(1, 2)
let sq = math::square(5)

echo $math::PI
```

### 模块嵌套

```hulo
mod fruit {
    mod apple {
        var count: num = 0
    }

    mod pine {
        var count: num = 0
    }
}
```

访问方式 `fruit::apple::count`
在 mod 中无法使用 `let` 声明变量

### 代码可见性

在 Hulo 中，模块内的代码默认是私有的（private），只能在定义它们的模块中访问。要使函数、常量或子模块在外部可访问，必须显式使用 `pub`（public）关键字进行标记。例如：
```hulo
pub mod math {
    pub const PI = 3.14

    pub fn area(radius: num) -> num {
        return PI * radius * radius
    }

    fn private_helper() {
        // 这是一个私有函数，仅在 math 模块内可见
    }
}
```
接下来你就可以在外部访问模块的成员：
```hulo
let result = math::area(5)
let helper = math::private_helper // 错误，尝试访问私有成员
```

::: tip
对于模块嵌套结构，如果希望从外部访问子模块中的内容，必须为每一级嵌套的 `mod` 添加 `pub` 修饰符。也就是说，只有当父模块和所有中间模块都是 `pub` 的，最内层的公开成员才会对外可见。
:::

### 引入外部成员

```hulo
const PI = 3.14

pub fn add(a: num, b: num) => $a + $b

mod math {
    use PI;
    use add;
}
```

::: important
虽然 `add` 函数是 `pub` 的，使其在定义模块内部可访问，但若要在引入模块后继续向外暴露该成员，仍需显式声明导出，例如使用 `pub use add`。否则，即使外部模块能访问 `math`，也无法通过 `math::add` 调用该函数。换句话说，`pub` 决定了可见性，而 `pub use` 决定了再导出能力。
:::