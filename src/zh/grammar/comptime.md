---
title: 元编程
icon: ghost
category: grammar
tag:
    - comptime
license: MIT
---

> `comptime` 关键字用于声明**编译期执行的代码块**或**编译期已知的值**，所有计算在编译阶段完成。本质上是将运行时代码提前到编译期执行，是构建高性能、可扩展语言系统的核心能力之一。它为语言带来了强大的元编程能力，是现代系统语言中越来越常见的设计特性。

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

## 编译期变量

```hulo
comptime let PI = 3.14159
let radius = 5
let area = PI * radius * radius  // PI在编译期被替换
```

::: warning
编译期变量可以赋值给运行时变量，但是反之不然。
:::

```hulo
comptime {
  if $OS == "windows" {
    const os = "win"
  } else {
    const os = "posix"
  }
}

echo $os
```

在 Hulo 中内置了一些编译期变量，便于代码调试

* FILE，获取当前文件名
* LINE, 获取代码行
* CALL，获取调用者
* OS, 获取当前操作系统
* TERM, 获取终端


## 编译期函数

编译期函数是在代码编译阶段而非运行时执行的函数，适用于常量计算、类型生成等场景。

```hulo
comptime fn sum(a: num, b: num) => $a + $b
```

```hulo
// 合法调用
comptime {
  let x = sum(1, 2)  // x = 3 (编译期计算)
}

let y = sum!(3, 4)   // y = 7 (编译期计算)

// 非法调用（运行时）
let z = sum(1, 2)    // 错误：需在comptime块或使用!调用
```

## 编译期类型

在 Hulo 中，类型本身可以作为编译期实体，允许在编译期计算、传递和操作类型。这使得元编程（如泛型、类型生成、条件类型选择）更加灵活。

无需显式声明 `comptime` 便可直接使用：
```hulo
type number = num

comptime let x: number = 10
```

让我们来看一个更复杂的案例：
```hulo
class User {
  name: str
  age: num
}

comptime {
  let u: User = User{name: "u1", age: 20}
  if $u.age > 18 {
    echo "user is adult"
  }
}
```

## 编译期方法

在 Hulo 中，编译期方法（`comptime fn`）和运行时方法（`fn`）可以共存，并支持重载。编译器会根据调用上下文自动选择合适的方法。

| 特性                | 编译期方法 (`comptime fn`) | 运行时方法 (`fn`)          |
|---------------------|--------------------------|--------------------------|
| **调用时机**         | 仅编译期                 | 默认支持编译期+运行时      |
| **参数限制**         | 必须为编译期常量          | 无限制                   |
| **运算符重载**       | ✅ 支持                  | ✅ 支持                  |
| **`unsafe` 修饰**   | ❌ 禁止                  | ✅ 允许                  |

### 方法重载
```hulo
class Calculator {
  // 运行时/编译期通用方法
  fn add(x: num, y: num) => x + y

  // 编译期专用重载
  comptime fn add(x: num, y: num) => $x * $y  // 编译期乘法优化
}

// 调用示例
let rt = Calculator.add(2, 3)   // 运行时 → 5
let ct = Calculator.add!(2, 3)   // 编译期 → 6
```

### 运算符重载

```hulo
class Vec2 {
  x: num
  y: num

  // 编译期向量加法
  comptime operator +(other: Vec2) => Vec2 {
    x: $this.x + $other.x,
    y: $this.y + $other.y
  }
}

// 编译期调用
comptime let v = Vec2 { x: 1, y: 2 } + Vec2 { x: 3, y: 4 }
// v = Vec2 { x: 4, y: 6 }
```

### 冲突解决规则

```hulo
class Demo {
  fn process(x: num)      => "runtime num"
  fn process(x: str)      => "runtime str"
  comptime fn process(x: num) => "compile-time num"
}

// 调用结果
let a = Demo.process(42)    // "runtime num"
let b = Demo.process!("42") // 错误：无匹配的编译期重载
let c = Demo.process!(42)   // "compile-time num"
```

## 强制编译时调用

在函数名后添加 `!` 运算符（又名 强制编译时运算符），可强制在编译期执行该函数调用。  
等效于将调用语句包裹在 `comptime { }` 块中，但提供更简洁的语法。

```hulo
// 以下两种写法等效：
let x = sum!(1, 2)
let x = comptime { sum(1, 2) }
```

## 返回值

### 动态类型返回

`comptime` 块可以返回不同的类型，最终类型会被推断为所有可能返回值的联合类型（Union Type）：
```hulo
let x: str | bool = comptime {
  if 1 > 2 { "true" }
  else { false }
}
```

### 隐式返回（默认行为）

在 comptime 块中，默认最后一个表达式的值会作为整个块的返回值（类似 Rust 或 Ruby 的隐式返回）。例如：
```hulo
let value = comptime {
  1 + 2     // 这个表达式的结果（3）会被返回
}
// value = 3
```

适用于计算类场景：
```hulo
comptime let target_arch = "amd64"

let array_size = comptime {
  if target_arch == "x86" { 256 }
  else { 512 }
}
// array_size 是编译期确定的 256 或 512
```

### 避免隐式返回

在上面文档中我们介绍了代码块的隐式返回，但有时你可能不希望这样，以下是控制方式：

方法一：使用 `;` 终止语句
在末尾添加 ; 可以让最后一个表达式不成为返回值：
```hulo
let x = comptime {
  1 + 2;  // 计算但不返回
  // 此时整个 comptime 块不会返回任何值
}
assert(x, null) // ok
```

方法 2：显式 `return`
```hulo
let x = comptime {
  compute_something()
  return  // 显式提前返回，避免隐式返回
}
assert(x, null) // ok
```

方法 3：插入无返回值语句
```hulo
let x = comptime {
  init_something()  // 假设这个函数不返回任何值
  // 由于最后一个语句无返回值，整个块也不会返回有效值
}
assert(x, null) // ok
```

## declare

`declare` 也可以用于声明编译期的 函数 或 常量，但不定义它们的实现。通常用于声明编译器内置函数和变量，供代码提示使用。

### 函数声明

语法
```hulo
declare comptime fn 函数名(参数类型...) -> 返回类型
```

示例
```hulo
// 声明一个编译期加法函数（暂不实现 或 已经内置）
declare comptime fn add(a: num, b: num) -> num

// 后续某处提供实现
comptime fn add(a: num, b: num) => $a + $b

// 使用
let x = add!(1, 2)  // x = 3
```

::: note
声明和定义的签名必须完全一致（参数类型、返回类型）
:::


### 变量声明

语法
```hulo
declare comptime (const | var | let) 标识符: 类型
```

示例
```hulo
// 声明常量（暂不赋值 或 已经内置）
declare comptime const PI: num

// 后续初始化
comptime const PI = 3.1415926

// 使用
let circle_area = PI * radius * radius
```

## 编译期宏


### 声明宏

### 过程宏