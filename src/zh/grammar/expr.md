---
title: 表达式
icon: fas fa-puzzle-piece
date: 2025-04-13
category: grammar
tag: 
    - expr
license: MIT
---

## 算术运算符
> 算术运算符用于对数值类型执行基本的数学操作。

### + 加

加法运算符 `+` 是一个多用途的运算符，支持不同类型的数据操作。它不仅可以用于数值相加，还可以用于字符串拼接与列表合并，具有良好的通用性与直观的语义表达。根据操作数的类型，`+` 会自动推断执行相应的合并或连接行为。
```hulo
1 + 1 // 2
"Hello " + "World!" // "Hello World!"
[1, 2] + [3, 4] // [1, 2, 3, 4]
```

### - 减
用于执行数值之间的减法操作，结果为两数之差。

### * 乘
执行数值的乘法计算，在数值类型中广泛使用。

### / 除
进行数值除法，返回一个带小数的结果。

### % 取余
返回两个数相除后的余数，常用于循环、判断等逻辑结构中。

### ** 幂
表示指数运算，左边为底数，右边为指数。

### // 整除
返回两个数整除后的商（向下取整），舍弃小数部分。

### ++ 自增
对变量执行加一操作，常用于计数逻辑中。

### -- 自减
对变量执行减一操作，用于逆向遍历等场景。

## 关系运算符
> 关系运算符用于比较两个值，并返回布尔值（true 或 false）。它们广泛用于条件判断和控制流程中。

### == 相等

判断两个值是否相等。对基础类型（如 num, str, bool）按值比较。
```hulo
1 == 1 // true
"hi" == "hi" // true
```

### != 不等

判断两个值是否不相等。
```hulo
1 != 2 // true
"hi" != "hello" // true
```

### > 大于 / < 小于

数值和可比较对象间的大小比较：
```hulo
3 > 1 // true
2 < 5 // true
```

### >= 大于等于 / <= 小于等于

```hulo
5 >= 5 // true
2 <= 3 // true
```

### in 成员检查

用在 `if` 表达式的时候用于检查某个元素是否存在于集合、字符串或映射中。
```hulo
2 in [1, 2, 3] // true
"lo" in "hello" // true
"key" in {"key": 1} // true
```

## 赋值运算符

### =
### +=
### -=
### *=
### /= 除后赋值
### **= 幂后赋值
### //= 整除后赋值
### &=, |=, ^=, <<=, >>= 位运算赋值

### := 海象运算符

海象运算符 `:=` 是 Hulo 中用于声明并赋值变量的一种语法糖，它结合了 `let` 的声明和 `=` 的赋值过程，适用于希望在表达式中快捷声明变量的场景。常用于条件表达式、循环等结构中，使代码更加简洁。
```hulo
$value := 10

$value = "Hello World" // 错误，value 是 num 类型变量
```

::: info
`:=` 允许 Hulo 语言系统在变量赋值时进行类型推断并维持类型一致性。与 `any` 不同，它不会破坏类型系统。
:::

### 三目运算符

三目运算符 `? :` 是一种简洁的条件判断表达式，格式为 `条件 ? 值1 : 值2`，当条件为真时返回值1，否则返回值2。它是 `if-else` 语句的紧凑替代，常用于根据条件选择结果的场景。
```hulo
let age = 18
echo($age >= 18 ? "adult": "minior") // adult
```

### 空值合并

空值合并运算符 `??` 用于处理可能为 `null` 或未定义的可选值。它允许你为空值提供默认值，从而避免运行时错误。`??=` 是其对应的简写形式，仅在变量为 `null` 时才赋值，保持已有值不变。这在初始化可选配置、参数默认化等场景中非常实用。
```hulo
let name: str?
echo($name ?? "default") // default

$name ??= "default"
echo(name) // default

$name ??= "hulo"
echo(name) // default
```

## 逻辑运算符

* && 逻辑与
* || 逻辑或
* ! 逻辑非

## 位运算符

* & 位与
* | 位或
* ^ 位异或
* ~ 位非
* << 左移
* \>> 右移
* \>>> 无符号右移 

## 类型运算符
> 类型运算符用于在运行时或编译时进行类型相关的操作，包括类型判断（is）、类型获取（typeof）、类型转换（as）等。这些运算符提供了灵活的方式来检查、推导或改变值的类型，使得代码更加健壮和可控，是 Hulo 类型系统的重要组成部分。

### typeof

`typeof` 是一个用于在运行时获取表达式静态类型的关键字，它返回一个类型对象（如 num, str, list\<num> 等）。这在泛型编程、类型推导、单元测试和调试中非常有用，尤其适用于需要根据值类型进行判断或断言的场景。

与 `is` 不同，`typeof` 用于获取类型，而不是判断是否属于某类型。你可以将 `typeof` 的结果与其他类型字面值进行比较，也可以用于动态类型推导。
```hulo
// 基本类型判断
assert_eq(typeof 10, num)
assert_eq(typeof "hello", str)
assert_eq(typeof true, bool)

type int = num

// 变量类型推导验证
let i: int = 1
assert(typeof $i == num)

let f = 3.14
if typeof f == num {
  echo "It's a number"
}

// 列表类型判断
let names = ["Alice", "Bob"]
assert_eq(typeof $names, list<str>)

// 嵌套类型判断
let matrix = [[1, 2], [3, 4]]
assert(typeof $matrix == list<list<num>>)

// 函数类型判断
fn greet(name: str) -> str {
  return "Hello, " + $name
}

assert(typeof $greet == (str) -> str)

// 与泛型结合使用
fn print_type<T>(value: T) {
  echo "Type: ${typeof $value}"
}

print_type(123)       // 输出 Type: num
print_type("hello")   // 输出 Type: str
```
使用 `typeof` 可以极大增强程序在类型维度上的表达能力与安全性，尤其在编写通用工具、验证断言或构建类型驱动逻辑时非常有价值。

### is

`is` 用于在运行时判断某个值的类型。它常用于条件语句中，根据不同的数据类型执行不同的逻辑分支。判断表达式的语法为：
```hulo
type Boolean = bool

let value = 10

if $value is num {
  echo "The value is a number"
} else if $value is str {
  echo "The value is a string"
} else if $value is Boolean {
  echo "The value is a boolean"
} else {
  echo "The value has an unknown type"
}
```
该语法支持对基础类型（如 num、str、bool 等）以及自定义类型进行匹配，是进行类型安全处理的重要工具。当然对于复合类型推断语句，`if-else` 语法可能不是最佳实践， `match` 语句却可以有效提升代码的鲁棒性和可读性。例如：

```hulo
match $value {
  num => echo "The value is a number",
  str => echo "The value is a string",
  Boolean => echo "The value is a boolean",
  _ => echo "The value has an unknown type",
}
```

### as

`as` 是 Hulo 中用于类型转换的关键字，它允许你将一个表达式的类型显式转换为指定的目标类型。在类型系统严格检查的场景中，这种转换为特定类型的能力尤为重要，它确保了代码在类型层面上的可控性和可读性。
```hulo
let s = "Hello World" as str
```

::: warning
`as` 也带来了某些风险，尤其是在将值转换为 `any` 类型时。虽然这种做法在某些动态语言中较为常见，但在 Hulo 的类型系统中，它会绕过编译期的类型检查，从而可能引入潜在错误，破坏程序的类型安全性。正确使用 `as`，特别是避免过度依赖 `any`，是保持代码健壮性的关键。这种做法是不推荐的：
```hulo
let obj = "Hello World" as any

$obj = 10 // 破坏类型系统
```
:::

## 成员访问运算符

### 成员访问

### 模块访问

### 下标索引

### 函数调用

### in 值访问

```hulo
let items = [1, 2, 3]

// 用来遍历数组的元素
loop $item in $items {
  echo $item // 1 2 3
}
```

### of 键值对访问

`of` 关键字用于遍历对象的键值对。它与 `in` 不同，of 专门用于访问对象中的键值对。

```hulo
let obj = { "name": "Alice", "age": 30 }

// 遍历对象的键
for $key of $obj {
  echo "$key: ${obj[key]}"  // 输出 name: Alice, age: 30
}

// 遍历对象的键值对
for $key, $value of obj {
  echo "$key: $value"  // 输出 name: Alice, age: 30
}
```

### 可变参数

### 扩展运算符
```hulo
let list1 = [1, 2, 3]
let list2 = [0, ...list1, 4]
echo $list2 // [0, 1, 2, 3, 4]
```

### 地址解析

### 级联运算符

#### 级联调用方法
```hulo
obj = MyClass() 
  ..set_name("Hulo")
  ..set_age(18)
  ..print_info()
```
等价于:
```hulo
obj = MyClass()
obj.set_name("Hulo")
obj.set_age(18)
obj.print_info()
```

#### 级联修改属性
```hulo
user = User()
  ..name = "Alice"
  ..age = 25
  ..email = "alice@example.com";
```
等价于：
```hulo
user = User()
user.name = "Alice"
user.age = 25
user.email = "alice@example.com"
```

#### 级联修改属性
```hulo
list = []
  ..push(1)
  ..push(2)
  ..push(3);
```
等价于:
```hulo
list = []
list.push(1)
list.push(2)
list.push(3)
```

### 管道运算符
```hulo
ch <- "hello"

let data <- ch
```

### 条件成员访问 / 可选链
```hulo
let name: str?
echo(name?.length) // name 为 null，不会调用length
```

### 编译期成员访问

```hulo
println!("Hello World")
$FILE!

name?.len!()
```

## 箭头函数
```hulo
fn printf(v: any) => echo(v)
```

<!-- TODO
  用于 文件 2>&1 的符号 
  以及 & "main.exe"
  "main.exe" &
  > >> >>> 文件操作的符号
  -->