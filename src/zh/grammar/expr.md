---
title: 表达式
icon: fas fa-puzzle-piece
date: 2025-04-13
category: grammar
tag: 
    - expr
license: MIT
---

> `表达式` 是 Hulo 语言中用于**计算值**的基本语法单元，由操作数、运算符和函数调用等元素组成。表达式可以产生一个值，这个值可以是数值、字符串、布尔值或其他类型的数据。表达式是构建复杂程序逻辑的基础，通过组合不同的运算符和操作数，可以实现各种计算和操作。

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

减法运算符 `-` 用于执行数值之间的减法操作，结果为两数之差。对于数值类型，它执行标准的数学减法运算。
```hulo
10 - 3 // 7
3.14 - 1.5 // 1.64
```

### * 乘

乘法运算符 `*` 执行数值的乘法计算，在数值类型中广泛使用。对于字符串和数组，它还可以用于重复操作。
```hulo
5 * 3 // 15
"ha" * 3 // "hahaha"
[1, 2] * 2 // [1, 2, 1, 2]
```

### / 除

除法运算符 `/` 进行数值除法，返回一个带小数的结果。即使两个整数相除，结果也可能是浮点数。
```hulo
10 / 2 // 5.0
7 / 3 // 2.333...
```

### % 取余

取余运算符 `%` 返回两个数相除后的余数，常用于循环、判断等逻辑结构中。
```hulo
10 % 3 // 1
15 % 4 // 3
```

### ** 幂

幂运算符 `**` 表示指数运算，左边为底数，右边为指数。
```hulo
2 ** 3 // 8
5 ** 2 // 25
```

### // 整除

整除运算符 `//` 返回两个数整除后的商（向下取整），舍弃小数部分。
```hulo
10 // 3 // 3
7 // 2 // 3
```

### ++ 自增

自增运算符 `++` 对变量执行加一操作，常用于计数逻辑中。支持前缀和后缀两种形式。
```hulo
let a = 5
$a++ // 后缀自增，先使用值再增加
echo $a // 6

let b = 5
++$b // 前缀自增，先增加再使用值
echo $b // 6
```

### -- 自减

自减运算符 `--` 对变量执行减一操作，用于逆向遍历等场景。同样支持前缀和后缀两种形式。
```hulo
let a = 5
$a-- // 后缀自减
echo $a // 4

let b = 5
--$b // 前缀自减
echo $b // 4
```

## 关系运算符
> 关系运算符用于比较两个值，并返回布尔值（true 或 false）。它们广泛用于条件判断和控制流程中。

### == 相等

判断两个值是否相等。对基础类型（如 num, str, bool）按值比较。
```hulo
1 == 1 // true
"hi" == "hi" // true
[1, 2] == [1, 2] // true
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
"abc" > "abb" // true (字典序比较)
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

### = 基本赋值

基本赋值运算符 `=` 用于将右侧表达式的值赋给左侧变量。
```hulo
let a = 10
let b = "hello"
```

### += 加法赋值

加法赋值运算符 `+=` 将右侧值加到左侧变量上，然后赋值给左侧变量。
```hulo
let a = 5
$a += 3 // 等价于 a = a + 3
echo $a // 8

let s = "Hello"
$s += " World" // 等价于 s = s + " World"
echo $s // "Hello World"
```

### -= 减法赋值

减法赋值运算符 `-=` 从左侧变量中减去右侧值，然后赋值给左侧变量。
```hulo
let a = 10
$a -= 3 // 等价于 a = a - 3
echo $a // 7
```

### *= 乘法赋值

乘法赋值运算符 `*=` 将左侧变量乘以右侧值，然后赋值给左侧变量。
```hulo
let a = 5
$a *= 3 // 等价于 a = a * 3
echo $a // 15
```

### /= 除法赋值

除法赋值运算符 `/=` 将左侧变量除以右侧值，然后赋值给左侧变量。
```hulo
let a = 15
$a /= 3 // 等价于 a = a / 3
echo $a // 5.0
```

### **= 幂赋值

幂赋值运算符 `**=` 将左侧变量的值作为底数，右侧值作为指数进行幂运算，然后赋值给左侧变量。
```hulo
let a = 2
$a **= 3 // 等价于 a = a ** 3
echo $a // 8
```

### //= 整除赋值

整除赋值运算符 `//=` 将左侧变量除以右侧值（向下取整），然后赋值给左侧变量。
```hulo
let a = 10
$a //= 3 // 等价于 a = a // 3
echo $a // 3
```

### 位运算赋值

位运算赋值运算符包括 `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=`，用于位运算的复合赋值。
```hulo
let a = 5
$a &= 3 // 等价于 a = a & 3
echo $a // 1

let b = 8
$b |= 2 // 等价于 b = b | 2
echo $b // 10

let c = 4
$c <<= 2 // 等价于 c = c << 2
echo $c // 16
```

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

### && 逻辑与

逻辑与运算符 `&&` 在两个操作数都为真时返回真，否则返回假。支持短路求值。
```hulo
true && true // true
true && false // false
false && true // false
false && false // false

// 短路求值示例
let a = 5
let b = 0
$a > 0 && $b > 0 // false，第二个条件不会执行
```

### || 逻辑或

逻辑或运算符 `||` 在两个操作数中至少有一个为真时返回真，否则返回假。同样支持短路求值。
```hulo
true || true // true
true || false // true
false || true // true
false || false // false

// 短路求值示例
let a = 5
let b = 0
$a > 0 || $b > 0 // true，第二个条件不会执行
```

### ! 逻辑非

逻辑非运算符 `!` 对操作数进行逻辑取反，真变假，假变真。
```hulo
!true // false
!false // true
!($a > 0) // 等价于 a <= 0
```

## 位运算符

### & 位与

位与运算符 `&` 对两个操作数的每一位进行与运算，只有两个位都为1时结果才为1。
```hulo
5 & 3 // 1 (二进制: 101 & 011 = 001)
```

### | 位或

位或运算符 `|` 对两个操作数的每一位进行或运算，只要有一个位为1结果就为1。
```hulo
5 | 3 // 7 (二进制: 101 | 011 = 111)
```

### ^ 位异或

位异或运算符 `^` 对两个操作数的每一位进行异或运算，相同为0，不同为1。
```hulo
5 ^ 3 // 6 (二进制: 101 ^ 011 = 110)
```

### ~ 位非

位非运算符 `~` 对操作数的每一位进行取反运算，0变1，1变0。
```hulo
~5 // -6 (二进制: ~101 = 11111111111111111111111111111010)
```

### << 左移

左移运算符 `<<` 将操作数的所有位向左移动指定的位数，右侧补0。
```hulo
5 << 2 // 20 (二进制: 101 << 2 = 10100)
```

### >> 算术右移

算术右移运算符 `>>` 将操作数的所有位向右移动指定的位数，左侧补符号位。
```hulo
-8 >> 1 // -4 (保持符号位)
8 >> 1 // 4
```

### >>> 逻辑右移

逻辑右移运算符 `>>>` 将操作数的所有位向右移动指定的位数，左侧补0。
```hulo
-8 >>> 1 // 2147483644 (不保持符号位)
8 >>> 1 // 4
```

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

成员访问运算符 `.` 用于访问对象的属性和方法。
```hulo
class Person {
  name: str
  age: num
  
  fn greet() -> str {
    return "Hello, I'm ${this.name}"
  }
}

let person = Person("Alice", 25)
echo $person.name // 访问属性
echo $person.greet() // 调用方法
```

### 模块访问

模块访问运算符 `::` 用于访问模块或类的静态成员。
```hulo
class Math {
  static PI: num = 3.14159
  
  static fn max(a: num, b: num) -> num {
    return $a > $b ? $a : $b
  }
}

echo Math::PI // 访问静态属性
echo Math::max(10, 20) // 调用静态方法
```

### 下标索引

下标索引运算符 `[]` 用于访问数组、字符串或映射中的元素。
```hulo
let arr = [1, 2, 3, 4, 5]
echo $arr[0] // 1

let str = "Hello"
echo $str[1] // "e"

let map = {"name": "Alice", "age": 25}
echo $map["name"] // "Alice"
```

### 函数调用

函数调用运算符 `()` 用于调用函数或方法。
```hulo
fn greet(name: str) -> str {
  return "Hello, $name"
}

echo greet("Alice") // "Hello, Alice"

// 方法调用
let list = [1, 2, 3]
$list.push(4) // 调用 push 方法
```

### in 值访问

`in` 关键字用于遍历集合中的值，适用于只需要访问元素值而不需要索引或键的场景。

```hulo
let items = [1, 2, 3]

// 用来遍历数组的元素
loop $item in $items {
  echo $item // 1 2 3
}

// 遍历字符串字符
let text = "Hello"
loop $char in $text {
  echo $char // H e l l o
}

// 遍历集合元素
let fruits: set<str> = {"apple", "banana", "orange"}
loop $fruit in $fruits {
  echo $fruit
}

// 遍历映射值
let scores: map<str, num> = {"Alice": 95, "Bob": 87}
loop $score in $scores {
  echo $score // 95 87
}
```

### of 键值对访问

`of` 关键字用于遍历对象的键值对。它与 `in` 不同，of 专门用于访问对象中的键值对。

```hulo
let obj = { "name": "Alice", "age": 30 }

// 遍历对象的键
loop $key of $obj {
  echo "$key: ${obj[$key]}"  // 输出 name: Alice, age: 30
}

// 遍历对象的键值对
loop $key, $value of $obj {
  echo "$key: $value"  // 输出 name: Alice, age: 30
}

// 遍历数组索引和值
let colors = ["red", "green", "blue"]
loop $index, $color of $colors {
  echo "颜色 $index: $color"  // 获取索引和值
}

// 遍历字符串字符和位置
let text = "ABC"
loop $pos, $char of $text {
  echo "位置 $pos: 字符 $char"  // 获取位置和字符
}
```

### 可变参数

可变参数运算符 `...` 用于函数定义中表示接受可变数量的参数。
```hulo
fn sum(...args: num[]) -> num {
  let total = 0
  loop $arg in $args {
    $total += $arg
  }
  return $total
}

echo sum(1, 2, 3, 4, 5) // 15
```

### 扩展运算符

扩展运算符 `...` 用于展开数组或对象的内容。
```hulo
let list1 = [1, 2, 3]
let list2 = [0, ...list1, 4]
echo $list2 // [0, 1, 2, 3, 4]

// 合并对象
let obj1 = {"name": "Alice"}
let obj2 = {"age": 25}
let combined = {...obj1, ...obj2}
echo $combined // {"name": "Alice", "age": 25}
```

<!-- ### 地址解析

地址解析运算符 `&` 用于获取变量的内存地址（在支持指针的语言中）。
```hulo
let a = 10
let ptr = &a // 获取变量 a 的地址
``` -->

### 级联运算符

级联运算符 `..` 用于对同一个对象进行连续操作，避免重复引用对象名。

#### 级联调用方法
```hulo
$obj := MyClass() 
  ..set_name("Hulo")
  ..set_age(18)
  ..print_info()
```
等价于:
```hulo
$obj := MyClass()
$obj.set_name("Hulo")
$obj.set_age(18)
$obj.print_info()
```

#### 级联修改属性
```hulo
$user := User()
  ..name = "Alice"
  ..age = 25
  ..email = "alice@example.com";
```
等价于：
```hulo
$user = User()
$user.name = "Alice"
$user.age = 25
$user.email = "alice@example.com"
```

#### 级联调用方法
```hulo
$list := []
  ..push(1)
  ..push(2)
  ..push(3);
```
等价于:
```hulo
$list = []
$list.push(1)
$list.push(2)
$list.push(3)
```

### 管道运算符

管道运算符 `<-` 用于数据流处理，将左侧的数据传递给右侧的处理函数。
```hulo
$ch <- "hello"

let data <- $ch
```

### 条件成员访问 / 可选链

条件成员访问运算符 `?.` 用于安全地访问可能为 null 的对象的成员。
```hulo
let name: str?
echo($name?.length) // name 为 null，不会调用length

let person: Person?
echo($person?.name) // 安全访问，如果 person 为 null 则返回 null
```

### 编译期成员访问

编译期成员访问运算符 `!` 用于在编译时访问成员，通常用于宏或编译时计算。
```hulo
println!("Hello World")
$FILE!

$name?.len!()
```

## 箭头函数

箭头函数是函数定义的简洁语法，使用 `=>` 符号。
```hulo
fn printf(v: any) => echo($v)

// 等价于
fn printf(v: any) {
  return echo($v)
}

// 带参数的箭头函数
fn add(a: num, b: num) => $a + $b

// 多行箭头函数
fn process(data: str) => {
  let result = $data.to_upper()
  return $result
}
```

## 优先级和结合性

运算符的优先级决定了表达式中运算的执行顺序，而结合性决定了相同优先级运算符的执行顺序。

### 运算符优先级（从高到低）

1. **一元运算符**: `!`, `~`, `++`, `--`, `typeof`, `&`
2. **幂运算**: `**`
3. **乘除运算**: `*`, `/`, `//`, `%`
4. **加减运算**: `+`, `-`
5. **位移运算**: `<<`, `>>`, `>>>`
6. **关系运算**: `<`, `<=`, `>`, `>=`
7. **相等运算**: `==`, `!=`
8. **位运算**: `&`, `^`, `|`
9. **逻辑运算**: `&&`, `||`
10. **条件运算**: `? :`
11. **赋值运算**: `=`, `+=`, `-=`, `*=`, `/=`, `**=`, `//=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=`

### 结合性

- **左结合**: 大多数二元运算符都是左结合的
- **右结合**: 赋值运算符和条件运算符是右结合的

```hulo
// 左结合示例
1 + 2 + 3 // 等价于 (1 + 2) + 3

// 右结合示例
$a = $b = $c = 1 // 等价于 a = (b = (c = 1))
```

## 表达式求值

Hulo 中的表达式求值遵循标准的数学和逻辑规则，支持短路求值和惰性求值。

### 短路求值

逻辑运算符 `&&` 和 `||` 支持短路求值，可以提高程序效率并避免潜在错误。

```hulo
// && 短路求值
let a = 5
let b = 0
$a > 0 && $b > 0 // false，$b > 0 不会执行

// || 短路求值
let name: str?
echo($name || "default") // 如果 name 为 null，返回 "default"
```

### 惰性求值

某些表达式支持惰性求值，只在需要时才计算值。

```hulo
// 条件表达式
let result = $condition ? expensive_function() : 0
// 只有当 condition 为真时才调用 expensive_function
```

<!-- TODO
  用于 文件 2>&1 的符号 
  以及 & "main.exe"
  "main.exe" &
  > >> >>> 文件操作的符号
  -->