---
title: 函数
icon: fas fa-superscript
date: 2025-04-13
category: grammar
tag: 
    - func
license: MIT
---

> `函数` 是 Hulo 语言中的核心概念，用于**封装可重用的代码块**。函数通过接收参数、执行特定逻辑并返回结果来实现代码的模块化和复用。Hulo 支持多种函数声明方式，包括标准声明、lambda 表达式、函数重载和闭包等特性，为不同的编程场景提供灵活的选择。

## 函数声明

在 Hulo 中，函数是编程的基础概念，代表执行特定任务的代码块。函数通过名称调用，接收参数（输入），并可能返回结果（输出）。函数的主要目的是提高代码的可重用性、可读性和模块化。

### lambda 声明

lambda 声明提供了一种简洁的函数定义方式，特别适用于单行函数和简单的表达式。

```hulo
fn f() => println("Hello World!");

fn f() => "Hello World";

fn f(x: num) => $x * 2;

fn f(x: num, y: str) => ( $x + 10 , "sss $y s" );
```

这种语法允许更简洁地声明单行函数，使用 `=>` 箭头语法直接返回表达式结果。

### 标准声明

标准声明提供了完整的函数定义语法，支持多种参数类型和复杂的函数逻辑。

#### 基本语法

```hulo
pub fn functionName(param1: type1, param2: type2 = defaultValue) -> returnType {
    // 函数体
    return result
}
```

#### 参数类型详解

**位置参数（Positional Parameters）**

位置参数按照声明顺序传递，是最基本的参数类型。

```hulo
fn greet(name: str, age: num) {
    echo "Hello $name, you are $age years old"
}

greet("Alice", 25)  // 按位置传递参数
```

**默认参数（Default Parameters）**

可以为参数指定默认值，当调用时未提供该参数时使用默认值。

```hulo
fn createUser(name: str, age: num = 18, email: str = "") {
    echo "User: $name, Age: $age, Email: $email"
}

createUser("Bob")                    // 使用默认年龄和邮箱
createUser("Charlie", 30)            // 使用默认邮箱
createUser("David", 35, "d@test.com") // 提供所有参数
```

**可变参数（Variadic Parameters）**

使用 `...` 语法可以接收任意数量的参数，参数在函数内部作为数组处理。

```hulo
fn sum(...numbers: num) -> num {
    let total = 0
    loop num in $numbers {
        $total += $num
    }
    return $total
}

echo sum(1, 2, 3, 4, 5)  // 15
echo sum(10, 20)         // 30
echo sum()               // 0
```

**命名参数（Named Parameters）**

命名参数使用花括号 `{}` 包裹，支持 `required` 关键字标记必需参数。

```hulo
fn configureServer(
    host: str = "localhost",
    port: num = 8080,
    {required secure: bool, timeout: num = 30}
) {
    echo "Server: $host:$port, Secure: $secure, Timeout: $timeout"
}

// 调用方式
configureServer("example.com", 443, secure: true)
configureServer(port: 9000, secure: false, timeout: 60)
configureServer(secure: true)  // 使用默认 host 和 port
```

**命令式调用（Imperative Calling）**

Hulo 支持命令式调用语法，可以省略括号和逗号，使代码更简洁。

```hulo
fn processFile(filename: str, format: str = "txt", {required backup: bool}) {
    echo "Processing $filename with format $format, backup: $backup"
}

// 传统调用方式
processFile("data.txt", "json", backup: true)

// 命令式调用方式
processFile "data.txt" "json" -backup true

// 混合使用
processFile "config.txt" -backup false
processFile "log.txt" "csv" -backup true
```

**命令式调用规则：**

1. **位置参数**：直接按顺序传递，无需逗号
2. **命名参数**：使用 `-` 前缀，格式为 `-paramName value`
3. **布尔参数**：`-flag` 表示 `true`，`-flag false` 表示 `false`
4. **变量引用**：使用 `$` 前缀引用变量

```hulo
fn createUser(name: str, age: num = 18, {required active: bool, role: str = "user"}) {
    echo "User: $name, Age: $age, Active: $active, Role: $role"
}

let userName = "Alice"
let userAge = 25

// 命令式调用示例
createUser $userName $userAge -active true -role "admin"
createUser "Bob" -active true
createUser "Charlie" 30 -active false -role "guest"
```

**混合参数类型**

可以在同一个函数中组合使用不同类型的参数。

```hulo
fn processData(
    data: str,                    // 位置参数
    format: str = "json",         // 默认参数
    ...options: str,              // 可变参数
    {required validate: bool,     // 必需命名参数
     encoding: str = "utf-8"}     // 可选命名参数
) {
    echo "Processing $data with format $format"
    echo "Validation: $validate, Encoding: $encoding"
    echo "Options: $options"
}

// 传统调用示例
processData("user.json", "xml", "compress", "encrypt", validate: true)
processData("config.txt", validate: false, encoding: "ascii")

// 命令式调用示例
processData "user.json" "xml" "compress" "encrypt" -validate true
processData "config.txt" -validate false -encoding "ascii"
```

#### 函数可见性

使用 `pub` 关键字可以控制函数的可见性。

```hulo
fn internalFunction() {
    // 私有函数，只能在当前模块内访问
}

pub fn publicFunction() {
    // 公共函数，可以被其他模块访问
}
```

#### 完整示例

```hulo
import { pi } from "math"

pub fn calculateArea(
    shape: str,
    width: num,
    height: num = 0,
    ...dimensions: num,
    {required unit: str, precision: num = 2}
) -> num {
    let area = 0
    
    match $shape {
        "rectangle" => $area = $width * $height,
        "circle" => $area = $pi * $width * $width,
        "triangle" => $area = 0.5 * $width * $height,
        _ => {
            echo "Unknown shape: $shape"
            return 0
        }
    }
    
    // 应用精度
    $area = round($area, $precision)
    
    echo "Area: $area $unit"
    return $area
}

// 调用示例
calculateArea("rectangle", 10, 5, unit: "m²")
calculateArea("circle", 5, unit: "cm²", precision: 3)
calculateArea("triangle", 8, 6, unit: "in²")
```

### 返回值类型

Hulo 函数支持多种返回值类型，包括基本类型、联合类型和元组类型。如果需要返回多个值，可以使用元组或联合类型来实现。

#### 基本类型返回值

```hulo
fn getAge() -> num {
    return 25
}

fn getName() -> str {
    return "Alice"
}

fn isActive() -> bool {
    return true
}
```

#### Lambda 表达式返回值

Lambda 表达式也支持返回值，但语法与传统函数不同。由于 lambda 本身使用 `=>` 作为箭头，为了避免语法冲突，lambda 的返回值使用 `:` 而不是 `->`。

```hulo
// Lambda 表达式返回值语法
fn getValue() => 42

fn add(x: num, y: num) => $x + $y

fn getUser() => ("Alice", 25)

// 带返回类型的 lambda（不推荐）
fn getAge(): num => 25

fn calculate(x: num, y: num): num => $x * $y

fn process(data: str): (bool, str) => (true, "processed: $data")
```

::: warning
虽然 lambda 表达式支持返回值类型声明，但**不推荐**使用。因为 lambda 的设计初衷是简化函数声明，如果还需要显式声明返回类型，就失去了简化的意义。建议让编译器自动推断返回类型。
:::

::: tip
**语法对比：**
- **传统函数**：`fn name() -> ReturnType { ... }`
- **Lambda 表达式**：`fn name() => expression` 或 `fn name(): ReturnType => expression`
:::

#### 联合类型返回值

联合类型允许函数返回多种可能的类型，特别适用于条件性返回值。

```hulo
fn getValue(condition: bool) -> num | str {
    if condition {
        return 42
    }
    return "default"
}

fn findUser(id: num) -> User | null {
    if id > 0 {
        return User("Alice", 25)
    }
    return null
}
```

#### 元组返回值

使用元组可以返回多个相关的值，提供结构化的返回值。

```hulo
fn getUserInfo() -> (str, num, str) {
    return ("Alice", 30, "alice@example.com")
}

fn calculateStats(numbers: list<num>) -> (num, num, num) {
    let sum = 0
    let count = $numbers.len()
    let avg = 0
    
    loop num in $numbers {
        $sum += $num
    }
    
    if $count > 0 {
        $avg = $sum / $count
    }
    
    return ($sum, $count, $avg)
}

// 使用元组解构接收多个返回值
let (name, age, email) = getUserInfo()
echo "姓名: $name, 年龄: $age, 邮箱: $email"

let (total, count, average) = calculateStats([1, 2, 3, 4, 5])
echo "总和: $total, 数量: $count, 平均值: $average"
```

#### 复杂返回值示例

```hulo
fn processData(data: str) -> (bool, str, num) | Error {
    if $data.len() == 0 {
        return Error("Empty data")
    }
    
    let success = true
    let result = "Processed: $data"
    let count = $data.len()
    
    return ($success, $result, $count)
}

// 处理返回值
match processData("test") {
    (success, result, count) => {
        echo "Success: $success, Result: $result, Count: $count"
    },
    Error => {
        echo "Error occurred"
    }
}
```

### 编译时函数

编译时函数在编译阶段执行，而不是在运行时。它们使用 `comptime` 关键字声明，可以通过 `!` 运算符调用，也可以在 `comptime` 块中直接调用。

#### 基本用法

```hulo
comptime fn my_print(msg: str) {
    println!($msg)
}

comptime fn get_version() -> str {
    return "1.0.0"
}

// 使用 ! 运算符调用编译时函数
my_print!("Hello from compile time")
echo "Version: ${get_version!()}"
```

#### comptime 块调用

在 `comptime` 块中，可以直接调用编译时函数，无需使用 `!` 运算符。

```hulo
comptime fn setup_constants() {
    let PI = 3.14159
    let E = 2.71828
    println!("Constants initialized")
}

comptime fn get_config() -> str {
    return "production"
}

// 在 comptime 块中调用编译时函数
comptime {
    setup_constants()  // 直接调用，无需 !
    let env = get_config()  // 直接调用，无需 !
    println!("Environment: $env")
}
```

#### 编译时计算

```hulo
comptime fn calculate_constants() {
    let PI = 3.14159
    let E = 2.71828
    let GOLDEN_RATIO = 1.61803
    
    println!("PI: $PI")
    println!("E: $E")
    println!("Golden Ratio: $GOLDEN_RATIO")
}

// 在编译时执行
calculate_constants!()
```

#### 编译时条件

```hulo
comptime fn setup_environment(env: str) {
    match $env {
        "development" => {
            println!("Setting up development environment")
            // 设置开发环境配置
        },
        "production" => {
            println!("Setting up production environment")
            // 设置生产环境配置
        },
        _ => {
            println!("Unknown environment: $env")
        }
    }
}

setup_environment!("development")
```

#### 复杂编译时逻辑

```hulo
comptime fn generate_config(env: str, debug: bool) {
    let config = {
        "environment": $env,
        "debug": $debug,
        "version": "1.0.0"
    }
    
    if $debug {
        $config["log_level"] = "debug"
        $config["verbose"] = true
    }
    
    println!("Generated config: $config")
}

// 在 comptime 块中执行复杂逻辑
comptime {
    let is_debug = true
    let environment = "development"
    
    generate_config($environment, $is_debug)
    
    if $is_debug {
        println!("Debug mode enabled")
    }
}
```

编译时函数在转换为目标代码之前执行。调用方式有两种：
- **使用 `!` 运算符**：`function!()` 或 `function!(args)`
- **在 `comptime` 块中**：直接调用，无需 `!` 运算符

编译时函数常用于：
- 配置生成
- 常量计算
- 环境设置
- 代码生成

## 函数重载

> **函数重载** 是指在同一个作用域中定义多个同名但实现不同的函数，基于参数的数量、类型或顺序进行区分。编译器根据函数调用时参数的特征（数量、类型或顺序）来确定调用哪个具体的函数。函数重载的主要目的是增强代码的灵活性和可读性。

### 基础重载

基础重载展示了如何根据参数类型的不同来重载函数。

```hulo
fn f(s: str) => echo($s)

fn f(i: num) => echo $i

f("hello world")  // 调用 str 版本
f(3.14)           // 调用 num 版本
```

### 参数数量重载

可以根据参数数量的不同来重载函数。

```hulo
fn greet() => echo("Hello, World!")

fn greet(name: str) => echo("Hello, $name!")

fn greet(name: str, title: str) => echo("Hello, $title $name!")

greet()                    // "Hello, World!"
greet("Alice")             // "Hello, Alice!"
greet("Bob", "Dr.")        // "Hello, Dr. Bob!"
```

### 类型重载

可以根据参数类型的不同来重载函数，包括联合类型和自定义类型。

```hulo
fn process(s: str | num) => echo("Processing: $s")

fn process(s: bool) => echo("Boolean: $s")

class User {
    name: str
    age: num
}

fn process(user: User) => echo("User: ${user.name}, Age: ${user.age}")

// 调用示例
process("text")            // 调用 str | num 版本
process(42)                // 调用 str | num 版本
process(true)              // 调用 bool 版本
process(User("Alice", 25)) // 调用 User 版本
```

### 复杂重载示例

```hulo
fn calculate(a: num, b: num) -> num => $a + $b

fn calculate(a: str, b: str) -> str => "$a$b"

fn calculate(a: num, b: num, c: num) -> num => $a + $b + $c

fn calculate(a: list<num>) -> num {
    let sum = 0
    loop num in $a {
        $sum += $num
    }
    return $sum
}

// 调用示例
echo calculate(5, 3)           // 8
echo calculate("Hello", "World") // "HelloWorld"
echo calculate(1, 2, 3)        // 6
echo calculate([1, 2, 3, 4, 5]) // 15
```

### 重载规则和限制

**允许的重载：**
- 参数数量不同
- 参数类型不同
- 参数顺序不同

**不允许的重载：**
- 仅返回类型不同
- 仅参数名称不同

```hulo
// ❌ 错误：仅返回类型不同
fn f(s: str) => "abc"
fn f(i: num) => 10

// ❌ 错误：仅参数名称不同
fn f(name: str) => echo($name)
fn f(title: str) => echo($title)

// ✅ 正确：参数类型不同
fn f(s: str) => echo($s)
fn f(i: num) => echo($i)
```

## 闭包

> **闭包** 是一个函数与其定义时的词法环境（变量作用域）的捆绑。这使得函数即使在原始作用域之外执行时，也能访问该作用域中的变量。闭包通常用于数据封装、回调函数和工厂函数。
> 简单来说，闭包使函数能够"记住"它被创建时的环境。

::: warning
由于 Hulo 采用编译期解释和运行时转译的架构，闭包功能在目标语言中的实现会受到限制。编译期闭包可以完全支持，但运行时闭包的功能可能因目标语言的特性而有所差异。
:::

### 基本闭包

```hulo
fn createCounter() -> fn() -> num {
    let count = 0
    return fn() -> num {
        $count++
        return $count
    }
}

let counter = createCounter()
echo counter()  // 1
echo counter()  // 2
echo counter()  // 3
```

### 带参数的闭包

```hulo
fn createMultiplier(factor: num) -> fn(num) -> num {
    return fn(x: num) -> num {
        return $x * $factor
    }
}

let double = createMultiplier(2)
let triple = createMultiplier(3)

echo double(5)  // 10
echo triple(5)  // 15
```

### 闭包作为回调

```hulo
fn processNumbers(numbers: list<num>, callback: fn(num) -> num) -> list<num> {
    let result: list<num> = []
    loop num in $numbers {
        $result.push(callback($num))
    }
    return $result
}

let numbers = [1, 2, 3, 4, 5]

// 使用闭包作为回调
let doubled = processNumbers($numbers, fn(x: num) -> num => $x * 2)
let squared = processNumbers($numbers, fn(x: num) -> num => $x * $x)

echo $doubled  // [2, 4, 6, 8, 10]
echo $squared  // [1, 4, 9, 16, 25]
```

### 闭包捕获外部变量

```hulo
fn createGreeter(greeting: str) -> fn(str) -> str {
    return fn(name: str) -> str {
        return "$greeting, $name!"  // 捕获外部的 greeting 变量
    }
}

let helloGreeter = createGreeter("Hello")
let hiGreeter = createGreeter("Hi")

echo helloGreeter("Alice")  // "Hello, Alice!"
echo hiGreeter("Bob")       // "Hi, Bob!"
```

### 闭包的实际应用

```hulo
// 配置管理器
fn createConfigManager(defaultConfig: map<str, any>) -> (fn(str, any), fn(str) -> any) {
    let config = $defaultConfig
    
    let setConfig = fn(key: str, value: any) {
        $config[$key] = $value
    }
    
    let getConfig = fn(key: str) -> any {
        return $config[$key]
    }
    
    return ($setConfig, $getConfig)
}

let (setConfig, getConfig) = createConfigManager({"theme": "dark", "language": "en"})

setConfig("theme", "light")
setConfig("fontSize", 14)

echo getConfig("theme")     // "light"
echo getConfig("fontSize")  // 14
echo getConfig("language")  // "en"
```

### 闭包的特性

**优点：**
- 数据封装和隐私保护
- 状态保持
- 函数式编程支持
- 回调函数实现

**注意事项：**
- 内存使用：闭包会保持对捕获变量的引用
- 性能考虑：过度使用闭包可能影响性能
- 调试复杂性：闭包可能使调试变得复杂