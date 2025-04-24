---
title: Data Types
icon: fas fa-spell-check
date: 2025-04-13
category: grammar
tag: 
    - type
license: MIT
---

## num

在 Hulo 中，`num` 是用于表示**数值类型**的内建类型，涵盖了整数与浮点数。

### 基础用法
```hulo
// 整数
let num1 = 42
let num2: num = -17

type float = num

// 浮点数
$float1 := 3.14
let float2 = -0.001
let float3: num = 0.0
$float4 := 0.5 as float
let float5: float = 5.0
```

### 算术运算

`num` 类型支持常见的算术运算符：
```hulo
1 + 2        // 加法 -> 3
4 - 2        // 减法 -> 2
3 * 5        // 乘法 -> 15
10 / 2       // 除法 -> 5.0
7 % 3        // 取余 -> 1
2 ** 3       // 幂运算 -> 8
10 // 3      // 整除 -> 3
```

### 科学计数法

Hulo 的 `num` 类型支持科学计数法（Scientific Notation），可用于表示非常大的或非常小的数值：
```hulo
let a = 1e3      // 1000.0
let b = 5.2e-2   // 0.052
let c: num = 3.14e6
```

::: tip
* `e` 或`E` 表示 10 的指数幂。
* 指数部分可以为正也可以为负。
:::

### 进制表示

```hulo
let a = 0b1010    // 二进制，等于 10
let b = 0o77      // 八进制，等于 63
let c = 0xFF      // 十六进制，等于 255
let d = 42        // 十进制，等于 42
```

::: tip
`0b` 或 `0B` 开头：二进制（binary）
`0o` 或 `0O` 开头：八进制（octal）
`0x` 或 `0X` 开头：十六进制（hexadecimal）
:::

## str

### 基础用法
```hulo
let s1 = "Hello"
let s2 = 'World'
let multiline = """
  多行字符串
  支持换行保留
"""
```

### 字符串运算
```hulo
"a" + "b" // 拼接，得到 "ab"
"a" * 3 // 重复，得到 "aaa"

// 切片, 前闭后开区间 [start, end)

"abcde"[3] // 得到 "d"
"abcde"[1..4] // 得到 "bcd" (长度=4-1=3)
"abcde"[..3] // 得到 "abc" (等效[0..3])
"abcde"[2..] // 得到 "cde" (等效[2..$s.len])
"abcde"[1..-1] // 得到 "bcd" (-1表示最后位置)
"abcde"[4..0] // 得到 "edcb"
"abcde"[-1..] // 得到 "edcba"

#"abc" // 得到 3

"a" in "abc" // true, 条件表达式
```

::: tip
对于 `#` 运算符，作用在变量上的规则同 `$` 类似。例如：`#a` 或者 `#{time.date.to_str()}`
:::

### 字符插值
```hulo
let name = "Alice"
let age = 25

// 基础插值
let s1 = "Name: $name, Age: $age" // Name: Alice, Age: 25

// 表达式插值
let s2 = "Next year: ${age + 1}" // Next year: 26
```

### 字符串前缀

#### 内置前缀

**`r"..."`**

* 功能：正则匹配
* 示例: 
```hulo
let reg = r"\d+"
echo $reg.match("123456") // true
```

**`R"..."`**

* 功能：获取原生字符串
* 示例：
```hulo
r"C:\Users\name" // 反斜杠不会解释为转义符
r"Your age: ${1 + 2}" // 插值表达式不起作用
```

::: note
对于 R 还支持长字符串
:::

**`f"..."`**

* 功能：获取 `File` 对象
* 示例：
```hulo
let main = f"main.exe"

assert(typeof $main, File)

echo $main.read() // 读取文件内容
```

**`c"..."`**

* 功能： 获取 `Command` 对象
* 示例：
```hulo
let main = c"main.exe"

assert(typeof $main, Command)

& $main // 执行可执行文件
```

#### 自定义前缀

在 Hulo 中支持对前缀的运算符重载，但是默认情况下最好不要重载内置的前缀，因为有些实现可能是 builtin 的，不管是编译期还是运行时都无法重新实现。

```hulo
extends class str {
  @override
  operator f(s: str) -> File {
    let f = File(s)
    echo "creating $f.name object"
    return $f
  }
}
```

## bool

`bool` 是布尔类型，只能取两个值之一：
```hulo
true  // 表示真
false // 表示假
```

## null
```hulo
let s: str?

echo $s // null

s = "Hello World"

echo $s // echo "Hello World"

let ss: str

echo $ss // echo ""

let m: map<str, num> = null

m?.["a"].to_str()
```

## 数组

**基本特性**

* 有序集合
* 可变长度
* 类型统一

**类型声明**

```hulo
let numbers: num[] = [1, 2, 3]

let names: list<str> = ["Alice", "Bob"]

let ranges: list<num> = [1..10] // 范围初始化
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

**访问元素**

同绝大部分编程语言一样，Hulo 的数组首元素也从 0 开始计算
```hulo
$names[0] // "Alice"

$numbers[3] // 越界异常，有效取值 0 - 2
```

**切片**

```hulo
$numbers[1..] // [2, 3]
$numbers[0..1] // [1, 2]
$numbers[..-1] // [3, 2, 1]
```

## 元组

**基本特征**

* 固定长度：声明时确定元素数量和类型
* 异构元素：允许不同类型组合
* 结构绑定：支持解构赋值

**类型声明**
```hulo
// 显式类型
let person: [str, num] = ["Alice", 30]

// 命名元组（可选特性）
let point: (x: num, y: num) = (10, 20)
```

**访问元素**
```hulo
$person.0 // "Alice"
$point.y // 20
```

**解构赋值**
```hulo
let (name, age) = $person
```

**更新元素**
```hulo
$person.0 = "Bob"

$person.with(1, 20)
```

**模式匹配**
```hulo
match $point {
    (0, 0) => echo "原点",
    (x, 0) => echo "X轴",
    (0, y) => echo "Y轴",
    _ => echo "其他位置"
}
```

## 集合

**基本特性**

* 唯一性：自动去重
* 无序存储：不保证遍历顺序

**类型声明**
```hulo
let ids: set<num> = {1, 2, 3}

$flags := {"read", "write"}
```

**添加元素**
```hulo
$ids.add(4)
```

**删除元素**
```hulo
$flags.remove("read")
```

**存在检查**
```hulo
$ids.has(2) // true

$ids.has("read") // 错误，ids 带有 num 类型约束

// 使用 in 语法糖

3 in $ids // false

"read" in $flags // true
```

**集合运算**
```hulo
let a = {1, 2, 3}
let b = {3, 4, 5}

$a.union(b)       // {1, 2, 3, 4, 5}
$a.intersect(b)   // {3}
$a.difference(b)  // {1, 2}
```

## map

### 声明与初始化
```hulo
type map<T, U> // 类型签名

let capitals: map<str, str> = {
  "China": "Beijing",
  "Japan": "Tokyo"
}
```

### 访问元素
```hulo
$capitals["China"] // Beijing

$capitals["USA"]?.len // null, 安全读取
```

### 写入/更新
```hulo
$capitals["USA"] = "Washington"
```

### 删除
```hulo
delete $capitals["Japan"]
```

### 存在检查
```hulo
"China" in $capitals // true
```

### 迭代控制

### 模式匹配
```hulo
match $capitals {
  {} => echo "Empty map",
  {"China": city} => echo "China's capital is ${city}",
  _ => echo "Other countries"
}
```

## 枚举

### 基础枚举（Basic Enum）

在 Hulo 语言中，基础枚举可以支持多种灵活的初始化方式，以下是完整的语法规范和示例：

**标准数字枚举：**
```hulo
enum Status {
    Pending,    // 0
    Approved,   // 1
    Rejected    // 2
}
```

**显式数字赋值：**
```hulo
enum HttpCode {
    OK = 200,
    NotFound = 404,
    ServerError = 500,
    GatewayTimeout  // 自动赋值为 501（前值+1）
}
```

**字符串枚举：**
```hulo
enum Direction {
    North = "N",
    South = "S",
    East = "E",
    West = "W"
}
```

**混合类型枚举：**
```hulo
enum Config {
    RetryCount = 3,
    Timeout = "30s",
    EnableLogging = true
}
```

### 关联值枚举（Associated Value Enum）

```hulo
enum Protocol {
    port: num  // 关联字段声明

    tcp(6),    // 枚举值携带数据
    udp(17);
}

// 使用
let p = Protocol::tcp(6)
echo p.port  // 访问关联字段
```

### 代数数据类型（ADT）

```hulo
enum NetworkPacket {
    TCP { src_port: num, dst_port: num },
    UDP { port: num, payload: str }
}
```

## class

### 类型声明

```hulo
class Point {
  x: num
  y: num

  fn to_str() {
    return "x: $this.x, y: $this.y"
  }
}
```

### 构造函数

在 Hulo 中，构造函数用于初始化类实例。一个类可以有多个构造函数(支持重载)，通过参数列表区分。

#### 默认构造器
同大多数语言一样，Hulo 会创造出一个默认构造函数（如果没有显式声明的话）。例如，在 `Point` 类型的声明的例子中，它的默认构造可能是这样：
```hulo
Point(x: num, y: num): $this.x = $x, $this.y = $y {}
```
这是由 Hulo 在编译时创建的默认构造。

#### 直接构造器

参数传递方式与默认构造器无异，不过省略了将入参赋值给 $this 的过程。
```hulo
class Point {
  // ...

  Point($this.x, $this.y)

  // 或者

  Point({required $this.x, required $this.y})
}
```

#### 命名构造器
```hulo
class Point {
  // ...

  Point.zero(): $this.x = $this.y = 0 {}
}
```

#### 常量构造器

当 `class` 的所有成员带 `final` 标记时，需要使用 `const` 修饰构造函数。指明这个类中所有成员一旦初始化后就不可变。
```hulo
class Point {
  final x: num
  final y: num

  const Point($this.x, $this.y)
}
```

#### 构造函数重载
同传统的函数一样，构造函数也是一个特殊的函数，同样支持重载。
```hulo
class Point {
  // ...

  Point(zero: bool): $this.x = 0, $this.y = 0 {
    if ! $zero {
      throw "invalid param"
    }
  }
}
```

### 初始化

```hulo
let p1 = Point{x: 2, y: 2} // 不走构造器，直接对字段初始化

let p2 = Point(2, 2) // 默认构造器

let p3 = Point(true) // 构造函数重载

let p3 = Point(x: 2, y: 2) // 构造函数重载

let p4 = Point.zero() // 命名构造器
```

### 成员访问

Hulo 提供了多种成员访问方式，包括直接访问、可选链式访问、静态访问，以及通过 Getter 和 Setter 进行受控访问。

#### 实例成员访问
```hulo
$p1.x // 访问 p1 的 x 成员
```

#### 可选链式访问
```hulo
$p2?.y  // 如果 p2 不为 null，则访问 y；否则返回 null
```

#### 静态成员访问
```hulo
Point::$name  // 访问 Point 类的静态成员 name
```

#### 受控访问

Getter 和 Setter 提供了对类字段的受控访问，允许在读取或修改时执行额外逻辑。

```hulo
class String {
  v: str

  get len: num => $this.v.length() // Getter

  set value(v: str) => $this.v = $v // Setter
}

fn main() {
  let s = String("Hello World!")
  assert(s.len == 12) // 调用 Getter
  $s.value = "abcde"  // 调用 Setter
}
```

#### this 和 super

`this` 访问当前示例：

```hulo
class Point {
  x: num
  fn printX() => echo $this.x  // 通过 this 访问字段
}
```

`super` 访问父类成员：
```hulo
class ColorPoint extends Point {
  fn to_str(): str => super.to_str() + " (colored)"  // 调用父类方法
}
```

### 成员修饰符

#### 静态修饰符

```hulo
class Counter {
    // 静态字段
    static count: num = 0
    
    // 静态方法
    static fn increment(): num {
        $Counter::count++
        return $Counter::count
    }
}

echo Counter::increment()  // 1
echo Counter::increment()  // 2
```

#### 不可变修饰符

不可变字段只能在构造函数的时候初始化，之后在方法中无法重新赋值。
```hulo
class Constants {
    final PI: num
    final E: num
    
    const Constants($this.PI, $this.E)

    fn bad_method() {
        this.PI = 3.14  // 尝试修改会编译错误
    }
}
```

### 继承与多态
```hulo
class ColorPoint extends Point {
  color: str

  ColorPoint(x: num, y: num, color: str) {
    super(x, y)
    $this.color = $color
  }

  @override
  fn to_str(): str => "ColorPoint(${this.x}, ${this.y}, ${this.color})"
}
```

### 运算符重载

在 Hulo 中运算符重载通常工作在编译期，这意味在 `comptime` 阶段运算符方法就会变展开变成正常的方法。

```hulo
class Vector {
    x: num
    y: num
    
    operator + (other: Vector) -> Vector {
        return Vector(this.x + other.x, this.y + other.y)
    }
}

let v1 = Vector(1, 2)
let v2 = Vector(3, 4)
let v3 = $v1 + $v2  // Vector(4, 6)
```


以下是 Hulo 语言中可重载的运算符及其对应的方法签名：

| 运算符 | 对应方法签名                     | 示例用法               | 说明                     |
|--------|--------------------------------|-----------------------|-------------------------|
| `<`    | `operator < (other: T) -> bool` | `a < b`              | 小于比较                 |
| `>`    | `operator > (other: T) -> bool` | `a > b`              | 大于比较                 |
| `<=`   | `operator <= (other: T) -> bool` | `a <= b`             | 小于等于                 |
| `>=`   | `operator >= (other: T) -> bool` | `a >= b`             | 大于等于                 |
| `==`   | `operator == (other: T) -> bool` | `a == b`             | 相等比较                 |
| `~`    | `operator ~ () -> T`           | `~a`                 | 按位取反/模式匹配         |
| `-`    | `operator - (other: T) -> T` | `a - b`              | 减法/取负                |
| `+`    | `operator + (other: T) -> T` | `a + b`              | 加法/拼接                |
| `/`    | `operator / (other: T) -> T` | `a / b`              | 除法                     |
| `~/`   | `operator ~/ (other: T) -> T` | `a ~/ b`             | 整除                     |
| `*`    | `operator * (other: T) -> T` | `a * b`              | 乘法/重复                |
| `%`    | `operator % (other: T) -> T` | `a % b`              | 取模                     |
| `\|`   | `operator \| (other: T) -> T` | `a \| b`             | 按位或/管道              |
| `^`    | `operator ^ (other: T) -> T` | `a ^ b`              | 按位异或                 |
| `&`    | `operator & (other: T) -> T` | `a & b`              | 按位与                   |
| `<<`   | `operator << (other: T) -> T` | `a << b`             | 左移位                   |
| `>>`   | `operator >> (other: T) -> T` | `a >> b`             | 算术右移位               |
| `>>>`  | `operator >>> (other: T) -> T` | `a >>> b`            | 逻辑右移位               |
| `[]`   | `operator [] (index: IndexType) -> ValueType` | `a[0]`              | 下标访问                 |
| `[]=`  | `operator []= (index: IndexType, value: ValueType)` | `a[0] = 1`         | 下标赋值                 |
| `new` | `operator new()` | `let a = new A()` | new 初始化对象 |
| `delete` | `operator delete()` | `delete $a` | delete 对象 |

::: tip
对于 str 类型，你还可以重载 `a-z`、`A-Z` 的字符串前缀。
:::