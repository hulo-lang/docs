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

### basic
```hulo
let s: str = str("  Hello World!  ")
s = s.trim() // delete space

echo ${s.len()}
echo(s.len())

echo(#s)
echo ${#s}

echo ${s.replace("o", "X")}

echo ${s[0..5]} ${s[1]}
```

### multi string
```hulo
let a = """ 
    this is 
a multi string
"""
```

### variable substitution
```hulo
let c = 10
echo "c is $c" // c is 10
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
```

**集合运算**
```hulo
let a = {1, 2, 3}
let b = {3, 4, 5}

$a.union(b)       // {1, 2, 3, 4, 5}
$a.intersect(b)   // {3}
$a.difference(b)  // {1, 2}
```

## 字典

`map` 是一种键值对集合类型，提供高效的查找、插入和删除操作。

可以以下语法创建一个字典：
```hulo
let m: map<str, str> = {
  "key1": "value1",
  "key2": "value2"
}
```

### 访问值

```hulo
echo $m["key1"] // value1
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

>**class** is a fundamental concept in Object-Oriented Programming (OOP). It acts as a blueprint or template for creating objects that share the same properties and behaviors. A class defines the attributes (state) and methods (behaviors) of objects. Once a class is defined, objects can be created through instantiation.

Let's assume we are creating a rectangle class with two properties: width and height. We will implement the following:

- A method to calculate the area area().
- A method to calculate the perimeter perimeter().

```hulo
class rectangle {
    width: num
    height: num

    fn area() => $this.width * $this.height

    fn perimeter() => 2 * ( $this.width + $this.height )
}
```

### 构造函数
A constructor is a special method used to initialize an object when it is created. It typically shares the same name as the class and is responsible for setting the initial state of the object. Constructors can take parameters, allowing users to provide initial values when instantiating the object.

### static修饰符
static is a keyword used to define static members or static methods. Static members belong to the class itself, not to any specific instance of the class. In other words, static members are at the class level and are shared among all instances.

```hulo
class rectangle {
    // ...
    static class_name: str = "rectangle"

    static fn get_class_name() => $class_name; 

    static fn get_width() => $this.width; // error
}

let r1 = new rectangle(1, 3)

echo $rectangle.class_name
echo $rectangle.get_class_name()
echo $r1.class_name
```

### Single Inheritance
```hulo
class base_car {
    name: str

    base_car(name: str) {
        $this.name = $name
        println("init base car")
    }

    fn run() => println("run")
}

class super_car: base_car {
    super_car() {
        super("super car")
    }

    fn run() => $super.run()
}

let c = new super_car()
echo $c.name // super car
```

### Operator Overload

>The **operator overloading** allows you to define how operators (such as + ,-, * , etc.) behave for a custom type. You can do this by defining an operator function.

Let's assume we have a point class with two properties: x and y, representing 2D coordinates. We overload the addition operator (+) so that adding two point objects results in the addition of their x and y coordinates.

```hulo
class point {
    x: num
    y: num

    fn operator +(right: point) -> point {
        $this.x += $right.x
        $this.y += $right.y
        return $this
    }
}

let p1 = point{x: 1, y: 2}
let p2 = point{x: 2, y: 1}

$p1 = $p1 + $p2
echo $p.x // 3
```