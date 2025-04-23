---
title: Control Flow
icon: fas fa-repeat
date: 2025-04-13
category: grammar
tag: 
    - condition
    - loop
    - try
    - defer
license: MIT
---

> `控制流` 是指控制程序逻辑执行的**先后顺序**，涉及数据在逻辑处理过程中的形式和状态变化。它决定了哪些语句执行、何时执行、是否重复执行等。

## 条件判断

在 Hulo 中的 `if` 用于根据条件执行代码块，语法简洁直观，支持单分支、多分支（`else if`）以及最终的 `else` 默认分支。
::: tip
* `if` **表达式必须跟随代码块**，不能省略大括号。
* **条件为真**时执行对应分支，**否则**继续判断后续分支或进入 else。
:::

### 单分支

```hulo
let age: num = 10

if $age > 18 {
    echo "you are an adult"
}
```

### 多分支

```hulo
$score := 60

if $score > 90 {
  echo "Grade: excellent"
} else if $score > 75 {
  echo "Grade: good"
} else if $score > 60 {
  echo "Grade: Pass"
} else {
  echo "Grade: fail"
}
```

## 模式匹配
>**match** is a control structure used to execute different code branches based on a given value or pattern. Its purpose is to simplify complex conditional logic by providing a more intuitive and structured way to handle multiple scenarios.
>With pattern matching, it can evaluate not only single values but also the shape, type, or content of data structures. This makes **match** particularly effective and concise when working with complex data or implementing conditional branching.
>Additionally, **match** typically includes a default branch to handle cases that do not explicitly match any pattern, ensuring robustness and predictability in program behavior.

### 值匹配
```hulo :no-line-numbers
let max = $a > $b ? $a : $b

$max = ($a > $b) ? $a : ($b > 10 ? $b : ($b > $max ? $b : $max))

match $max {
    1 => println("one!"),
    2 | 3 | 5 => println("this is prime"),
    13..19 => println($max),
    _ => println("default"),
}
```

### 类型断言
```hulo :no-line-numbers
let a = 10

let ok: str? = () => {
    match $a {
        num => return $a.to_str(),
        _ => null,
    }
}
```

### 元组匹配
```hulo :no-line-numbers
let pair: triple<num> = (2, -3)

match $pair {
    (2, -3) => println("2, -3"),
    (x, _) if $x % 2 == 0 => println("x is even"),
    (x, y) if $x + y == 5 => println("x + y = 5"),
    _ => println("null"),
}
```

## 循环结构

>A **loop** is a control structure in programming used to repeatedly execute a block of code until a specific termination condition is met. Loops greatly reduce redundancy in code and enable efficient handling of data in bulk. 

### 列表遍历
```hulo :no-line-numbers
let arr: list<num> = [1, 3.14, 5.0, 0.7]

loop (let i = 0; $i < $arr.len(); $i++) {
    echo $i $arr[$i]
}

loop (i: num, v: num) in $arr {
    echo $i $v
}
```

### 数值遍历
```hulo
// 从 1 遍历到 5，步长为 0.1
loop $i in 1..5..0.1 {
    echo $i
}
```

### while循环
```hulo :no-line-numbers
let cnt = 0
loop {
    $cnt++

    if ($cnt > 100) {
        break
    }
}
```

### do...while循环
```hulo :no-line-numbers
let cnt = 0
do {
    $cnt++
} loop ($cnt > 100)
```

### lambda表达式
```hulo :no-line-numbers
let cnt = 0
let res: num = () => {
    loop {
        $cnt+=2

        if $cnt == 10 {
            return $cnt * 2;
        }
    }
    return -1
}
```

### 标签
```hulo :no-line-numbers
L1: loop {
    println("enter l1")

    L2: loop {
        println("l2")
        break L1;
    }

    println("exit l1")
}
```

## 异常处理

Hulo 提供简洁且强大的异常处理机制，采用 `try`-`catch`-`finally` 结构，确保在出现错误时程序能够优雅地响应，而不是崩溃退出。其语法灵感来源于现代编程语言，同时也适用于脚本场景下的错误捕获与资源管理。

语法结构
```hulo
try {
    // 可能抛出异常的代码
} catch (err) {
    // 捕获异常后的处理逻辑
} finally {
    // 无论是否发生异常都会执行的代码（可选）
}
```

### 基础示例

```hulo
try {
    throw Error("Something went wrong")
} catch (err) {
    echo "Caught error: $err"
}
```

### 带finally结构

```hulo
try {
    let a = 1 / 0
} catch (err) {
    echo "Caught: $err"
} finally {
    echo "Cleanup done"
}
```

### 捕获函数中的异常

```hulo
fn mayFail(v: num) {
    if v < 0 {
        throw Error("Negative number not allowed")
    }
    return v
}

try {
    let result = mayFail(-1)
} catch (err) {
    echo "Error: $err"
}
```

### 自定义异常类型

你可以抛出任何对象，但推荐使用内置的 `Error` 类型或自定义结构体：
```hulo
throw Error("Invalid file path")
```
或者：
```hulo
throw "Invalid file path"
```

### 嵌套捕获

## 延迟执行

> `defer` 用于注册在当前作用域结束时执行的代码块。无论函数是正常结束、异常抛出，还是通过 `return` 提前返回，`defer` 中的代码都会被保证执行。适用于资源释放、日志记录等场景。

```hulo
defer { ... }  // 延迟执行代码块
```

::: tip
延迟代码的执行顺序为 **后注册先执行（LIFO）**。
但请注意：`exit` **强制退出时，**`defer` **不会执行。**
:::

示例说明：
```hulo
fn example() {
    defer { println("Third") }   // 3. 最后执行
    defer println("Second")      // 2. 其次执行
    println("First")             // 1. 最先执行
}
// 输出: First → Second → Third
```

即使提前 return，也会执行：
```hulo
fn example2(v: num | str) {
  defer println("return")

  if v is num {
    return
  }

  echo $v
}
```

在异常控制流程中：
```hulo
try {
    let file = f"data.txt"
    defer file.close() // 保证资源释放
    throw Error("Oops")
} catch (e) {
    println("Caught:", e)
}
```
::: note
此时异常流执行的顺序为 `try` → `defer` → `catch`
:::

当使用 exit 强制退出时，defer 无法执行：
```hulo
defer println("shutdown")
exit 1 // shutdown 不会被打印
```

exit 退出后不会执行
