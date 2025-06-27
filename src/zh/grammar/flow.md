---
title: 控制流
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

单分支条件判断是最基本的条件控制结构，当条件为真时执行代码块，否则跳过。适用于只需要在特定条件下执行代码的场景。

```hulo
let age: num = 10

if $age > 18 {
    echo "you are an adult"
}

// 条件表达式支持复杂的逻辑运算
if $age >= 18 && $age <= 65 {
    echo "working age"
}
```

### 多分支

多分支条件判断使用 `else if` 和 `else` 来处理多个不同的条件分支。条件按顺序检查，一旦某个条件为真，对应的分支就会被执行，后续条件不再检查。

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

// 嵌套条件判断
if $score > 90 {
  if $score == 100 {
    echo "Perfect score!"
  } else {
    echo "Excellent but not perfect"
  }
} else {
  echo "Need improvement"
}
```

## 模式匹配

在 Hulo 中的 `match` 用于根据值的模式执行不同的代码分支，语法灵活强大，支持值匹配、类型断言、元组匹配以及守卫条件等多种匹配方式。
::: tip
* `match` **表达式必须穷尽所有可能情况**，通常需要提供默认分支 `_`。
* **按顺序匹配**，第一个匹配成功的分支会被执行，后续分支不会执行。
:::

### 值匹配

值匹配是模式匹配的基础形式，支持精确值匹配、范围匹配和多重匹配。使用 `|` 可以匹配多个值，使用 `..` 可以匹配范围，使用 `_` 作为默认分支。

```hulo :no-line-numbers
let max = $a > $b ? $a : $b

$max = ($a > $b) ? $a : ($b > 10 ? $b : ($b > $max ? $b : $max))

match $max {
    1 => println("one!"),
    2 | 3 | 5 => println("this is prime"),  // 多重匹配
    13..19 => println($max),                // 范围匹配
    _ => println("default"),                // 默认分支
}

// 字符串匹配
let status = "success"
match $status {
    "success" => println("Operation completed"),
    "error" => println("Operation failed"),
    "pending" => println("Operation in progress"),
    _ => println("Unknown status")
}
```

### 类型断言

类型断言用于根据变量的实际类型执行不同的逻辑。这在处理联合类型或动态类型时特别有用，可以安全地进行类型检查和转换。

```hulo :no-line-numbers
let a = 10

let ok: str? = () => {
    match $a {
        num => return $a.to_str(),  // 如果是数字类型，转换为字符串
        _ => null,                  // 其他类型返回 null
    }
}

// 处理联合类型
let value: num | str | bool = "hello"
match $value {
    num => println("Number: $value"),
    str => println("String: $value"),
    bool => println("Boolean: $value"),
    _ => println("Unknown type")
}
```

### 元组匹配

元组匹配允许根据元组的结构和内容进行模式匹配。支持精确匹配、部分匹配和守卫条件，可以提取元组中的值到变量中。

```hulo :no-line-numbers
let pair: triple<num> = (2, -3)

match $pair {
    (2, -3) => println("2, -3"),                    // 精确匹配
    (x, _) if $x % 2 == 0 => println("x is even"),  // 部分匹配 + 守卫条件
    (x, y) if $x + y == 5 => println("x + y = 5"),  // 完整匹配 + 守卫条件
    _ => println("null"),                           // 默认分支
}

// 嵌套元组匹配
let complex = ((1, 2), (3, 4))
match $complex {
    ((a, b), (c, d)) if $a + $b == $c + $d => println("Sums are equal"),
    ((x, _), (_, y)) => println("First: $x, Last: $y"),
    _ => println("No pattern matched")
}
```

### 枚举匹配

枚举匹配允许根据枚举的类型和关联值进行模式匹配。支持基础枚举、关联值枚举和代数数据类型的匹配。

```hulo :no-line-numbers
// 基础枚举匹配
enum Status {
    Pending,
    Approved,
    Rejected
}

let status = Status::Approved
match $status {
    Status::Pending => println("等待处理"),
    Status::Approved => println("已批准"),
    Status::Rejected => println("已拒绝"),
    _ => println("未知状态")
}

// 关联值枚举匹配
enum Protocol {
    port: num
    tcp(6),
    udp(17)
}

let protocol = Protocol::tcp(8080)
match $protocol {
    Protocol::tcp(80) => println("HTTP 协议"),
    Protocol::tcp(443) => println("HTTPS 协议"),
    Protocol::tcp(port) => println("TCP 端口: $port"),
    Protocol::udp(port) => println("UDP 端口: $port"),
    _ => println("未知协议")
}

// 代数数据类型匹配
enum NetworkPacket {
    TCP { src_port: num, dst_port: num },
    UDP { port: num, payload: str }
}

let packet = NetworkPacket::TCP { src_port: 1234, dst_port: 80 }
match $packet {
    NetworkPacket::TCP { src_port, dst_port } => {
        println("TCP 包: $src_port -> $dst_port")
    },
    NetworkPacket::UDP { port, payload } => {
        println("UDP 包: 端口 $port, 数据: $payload")
    }
}
```

## 循环结构

在 Hulo 中的 `loop` 用于重复执行代码块直到满足特定终止条件，语法简洁高效，支持列表遍历、数值遍历、while循环、do...while循环以及带标签的循环控制等多种循环方式。
::: tip
* `loop` **支持多种循环语法**，可根据具体需求选择合适的循环形式。
* **支持标签跳转**，可以使用 `break` 和 `continue` 配合标签实现复杂的循环控制。
:::

### 列表遍历

Hulo 提供了两种列表遍历方式：传统的索引遍历和现代的迭代器遍历。索引遍历适用于需要访问元素位置的场景，而迭代器遍历则更加简洁高效。

```hulo :no-line-numbers
let arr: list<num> = [1, 3.14, 5.0, 0.7]

// 索引遍历 - 适用于需要访问索引的场景
loop (let i = 0; $i < $arr.len(); $i++) {
    echo $i $arr[$i]
}

// 迭代器遍历 - 更简洁，适用于只需要值的场景
loop (i: num, v: num) in $arr {
    echo $i $v
}

// 使用 in 关键字遍历 - 只获取值
loop $item in $arr {
    echo $item
}

// 使用 of 关键字遍历 - 获取键值对
loop ($key, $value) of $arr {
    echo "索引 $key: 值 $value"
}

// 遍历字符串
let text = "Hello"
loop $char in $text {
    echo $char
}

// 遍历集合
let colors: set<str> = {"red", "green", "blue"}
loop $color in $colors {
    echo $color
}

// 遍历映射
let config: map<str, str> = {"host": "localhost", "port": "8080"}
loop ($key, $value) of $config {
    echo "$key = $value"
}
```

### 数值遍历

数值遍历支持指定起始值、结束值和步长，语法简洁直观。步长可以是小数，支持正向和反向遍历。

```hulo
// 从 1 遍历到 5，步长为 0.1
loop $i in 1..5..0.1 {
    echo $i
}

// 反向遍历，从 10 到 1，步长为 -1
loop $i in 10..1..-1 {
    echo $i
}
```

### in 和 of 遍历模式

Hulo 提供了两种不同的遍历模式：`in` 和 `of`，它们适用于不同的数据结构和访问需求。

#### in 模式 - 值遍历

`in` 模式用于遍历集合中的值，适用于只需要访问元素值而不需要索引或键的场景。

```hulo
// 遍历数组值
let numbers = [1, 2, 3, 4, 5]
loop $num in $numbers {
    echo $num  // 只获取值：1, 2, 3, 4, 5
}

// 遍历字符串字符
let message = "Hello"
loop $char in $message {
    echo $char  // 获取每个字符：H, e, l, l, o
}

// 遍历集合元素
let fruits: set<str> = {"apple", "banana", "orange"}
loop $fruit in $fruits {
    echo $fruit  // 获取每个水果名称
}

// 遍历映射值
let scores: map<str, num> = {"Alice": 95, "Bob": 87, "Charlie": 92}
loop $score in $scores {
    echo $score  // 只获取分数：95, 87, 92
}
```

#### of 模式 - 键值对遍历

`of` 模式用于遍历键值对，适用于需要同时访问键和值的场景。

```hulo
// 遍历数组索引和值
let colors = ["red", "green", "blue"]
loop $index, $color of $colors {
    echo "颜色 $index: $color"  // 获取索引和值
}

// 遍历映射键值对
let config: map<str, str> = {"host": "localhost", "port": "8080"}

loop $key of $config {
    echo $key // 获取键
}

loop $key, $value of $config {
    echo "$key = $value"  // 获取键和值
}

// 遍历字符串字符和位置
let text = "ABC"
loop $pos, $char of $text {
    echo "位置 $pos: 字符 $char"  // 获取位置和字符
}

// 遍历集合元素和索引（如果支持）
let items: set<str> = {"item1", "item2", "item3"}
loop $index, $item of $items {
    echo "项目 $index: $item"
}
```

#### 模式选择指南

- **使用 `in`**：当你只需要值，不需要索引或键时
- **使用 `of`**：当你需要同时访问键（索引）和值时
- **性能考虑**：`in` 模式通常更高效，因为它避免了键值对的解构开销

### while循环

while循环适用于不确定循环次数的场景，条件在循环开始时检查。如果条件为假，循环体一次都不会执行。

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

do...while循环保证循环体至少执行一次，条件在循环结束时检查。适用于需要先执行再判断的场景。

```hulo :no-line-numbers
let cnt = 0
do {
    $cnt++
} loop ($cnt > 100)
```

### lambda表达式中的循环

在lambda表达式中使用循环时，可以使用 `return` 语句提前退出函数并返回值。这对于需要复杂逻辑计算的场景非常有用。

```hulo :no-line-numbers
let cnt = 0
let res: num = () => {
    loop {
        $cnt+=2

        if $cnt == 10 {
            return $cnt * 2;  // 提前返回并退出函数
        }
    }
    return -1  // 默认返回值
}
```

### 标签控制

标签控制允许在嵌套循环中进行精确的跳转控制。`break` 用于跳出指定标签的循环，`continue` 用于跳过当前迭代继续下一次循环。

```hulo :no-line-numbers
L1: loop {
    println("enter l1")

    L2: loop {
        println("l2")
        break L1;  // 直接跳出 L1 循环
    }

    println("exit l1")  // 这行不会执行
}

// 使用 continue 跳过当前迭代
loop $i in 1..10 {
    if $i % 2 == 0 {
        continue  // 跳过偶数
    }
    echo $i  // 只打印奇数
}
```

## 异常处理

Hulo 提供简洁且强大的异常处理机制，采用 `try`-`catch`-`finally` 结构，确保在出现错误时程序能够优雅地响应，而不是崩溃退出。其语法灵感来源于现代编程语言，同时也适用于脚本场景下的错误捕获与资源管理。

### 语法结构

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

基础异常处理展示了最简单的 try-catch 结构。当代码块中抛出异常时，程序会跳转到 catch 块进行处理，避免程序崩溃。

```hulo
try {
    throw Error("Something went wrong")
} catch (err) {
    echo "Caught error: $err"
}

// 处理可能出现的运行时错误
try {
    let result = 10 / 0  // 除零错误
} catch (err) {
    echo "Division error: $err"
}
```

### 带finally结构

finally 块用于确保无论是否发生异常，某些清理代码都会被执行。这对于资源管理、文件关闭、连接释放等场景非常重要。

```hulo
try {
    let a = 1 / 0
} catch (err) {
    echo "Caught: $err"
} finally {
    echo "Cleanup done"  // 总是会执行
}

// 文件操作示例
try {
    let file = open("data.txt")
    let content = file.read()
    echo $content
} catch (err) {
    echo "File error: $err"
} finally {
    if file {
        file.close()  // 确保文件被关闭
    }
}
```

### 捕获函数中的异常

函数内部抛出的异常可以被调用方的 try-catch 块捕获。这允许函数专注于业务逻辑，而将错误处理交给调用方。

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

// 多个函数调用的异常处理
fn validateInput(input: str) {
    if input.len() == 0 {
        throw Error("Input cannot be empty")
    }
    if input.len() > 100 {
        throw Error("Input too long")
    }
}

try {
    validateInput("")
    validateInput("very long input...")
} catch (err) {
    echo "Validation failed: $err"
}
```

### 自定义异常类型

Hulo 允许抛出任何类型的对象作为异常，但推荐使用内置的 `Error` 类型或自定义结构体来提供更丰富的错误信息。

```hulo
// 使用内置 Error 类型
throw Error("Invalid file path")

// 抛出字符串（简单情况）
throw "Invalid file path"

// 自定义异常结构
class ValidationError {
    field: str
    message: str
}

fn validateUser(name: str, age: num) {
    if $name.len() == 0 {
        throw ValidationError("name", "Name cannot be empty")
    }
    if $age < 0 || $age > 150 {
        throw ValidationError("age", "Age must be between 0 and 150")
    }
}

try {
    validateUser("", -5)
} catch (err) {
    if $err is ValidationError {
        echo "Validation error in field ${err.field}: ${err.message}"
    } else {
        echo "Unknown error: $err"
    }
}
```

### 嵌套捕获

嵌套的 try-catch 结构允许在不同层级处理不同类型的异常，提供更精细的错误控制。

```hulo
try {
    try {
        let file = open("config.txt")
        let config = parseConfig($file.read())
        applyConfig($config)
    } catch (err) {
        if $err is FileError {
            echo "Using default configuration"
            applyDefaultConfig()
        } else {
            throw $err  // 重新抛出未知异常
        }
    }
} catch (err) {
    echo "Critical error: $err"
    exit 1
}
```

## 延迟执行

> `defer` 用于注册在当前作用域结束时执行的代码块。无论函数是正常结束、异常抛出，还是通过 `return` 提前返回，`defer` 中的代码都会被保证执行。适用于资源释放、日志记录等场景。

```hulo
defer { ... }  // 延迟执行代码块
```

::: tip
延迟代码的执行顺序为 **后注册先执行（LIFO）**。
但请注意：`exit` **强制退出时，**`defer` **不会执行。**
:::

### 基本用法

defer 的基本用法是确保在函数结束时执行清理代码，无论函数如何结束。这对于资源管理特别重要。

```hulo
fn example() {
    defer { println("Third") }   // 3. 最后执行
    defer println("Second")      // 2. 其次执行
    println("First")             // 1. 最先执行
}
// 输出: First → Second → Third

// 资源管理示例
fn processFile(filename: str) {
    let file = open($filename)
    defer $file.close()  // 确保文件被关闭
    
    let content = $file.read()
    processContent($content)
    // 函数结束时自动调用 file.close()
}
```

### 提前返回时的执行

即使函数提前返回，defer 中的代码也会被执行。这确保了清理代码总是能够运行。

```hulo
fn example2(v: num | str) {
  defer println("return")  // 总是会执行

  if $v is num {
    return  // 即使提前返回，defer 也会执行
  }

  echo $v
  // 正常结束时 defer 也会执行
}

// 条件返回示例
fn validateAndProcess(data: str) {
    defer println("Validation completed")
    
    if $data.len() == 0 {
        defer println("Empty data detected")
        return false
    }
    
    if $data.len() > 1000 {
        defer println("Data too large")
        return false
    }
    
    processData($data)
    return true
}
```

### 异常处理中的延迟执行

在异常处理流程中，defer 的执行顺序是：try 块 → defer 块 → catch 块。这确保了即使在异常情况下也能进行必要的清理。

```hulo
try {
    let file = f"data.txt"
    defer $file.close() // 保证资源释放
    throw Error("Oops")
} catch (e) {
    println("Caught:", e)
}
```
::: note
此时异常流执行的顺序为 `try` → `defer` → `catch`
:::

```hulo
// 更复杂的异常处理示例
fn safeOperation() {
    let resource1 = acquireResource1()
    defer $resource1.release()
    
    let resource2 = acquireResource2()
    defer $resource2.release()
    
    try {
        performOperation($resource1, $resource2)
    } catch (err) {
        println("Operation failed: $err")
        // 即使发生异常，两个资源都会被释放
    }
}
```

### exit 强制退出

当使用 `exit` 强制退出程序时，defer 中的代码不会被执行。这是因为 exit 会立即终止程序，跳过所有清理代码。

```hulo
defer println("shutdown")
exit 1 // shutdown 不会被打印

// 对比正常退出
fn normalExit() {
    defer println("cleanup")
    return  // cleanup 会被打印
}

fn forceExit() {
    defer println("cleanup")
    exit 1  // cleanup 不会被打印
}
```

### 实际应用场景

defer 在实际开发中有多种应用场景，包括资源管理、日志记录、性能监控等。

```hulo
// 性能监控
fn expensiveOperation() {
    let start = time.now()
    defer {
        let duration = time.now() - start
        println("Operation took $duration ms")
    }
    
    // 执行耗时操作
    performExpensiveTask()
}

// 日志记录
fn processRequest(request: Request) {
    defer println("Request $request.id processed")
    
    if !validateRequest(request) {
        defer println("Request $request.id validation failed")
        return
    }
    
    handleRequest(request)
}
```
