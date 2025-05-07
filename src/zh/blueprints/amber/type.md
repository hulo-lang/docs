---
title: Type
icon: fas fa-spell-check
date: 2025-04-19
category: blueprint
tag:
    - amber
    - type
license: MIT
---

## str

### 变量赋值

**输入：**
```hulo
$str1 := "Hello"
let str2 = 'World'
let str3: str? // 空字符串
let str4 = "123" as str
```

**输出：**
```amber
let str1 = "Hello"
let str2 = "World"
let str3 = "" // 空字符串
let str4 = "123"
```

### 长字符串


### 字符插值

**输入：**
```hulo
$greeting := "Hello"
$name := "Alice"

$message := "$greeting, $name!"
```

**输出：**
```amber
let greeting = "Hello"
let name = "Alice"

let message = "{greeting}, {name}!"
```

### 字符串前缀

## num

### 变量赋值

**输入：**
```hulo
// 整数赋值
let num1 = 42
let num2: num = -17

type float = num

// 浮点数赋值
$float1 := 3.14
let float2 = -0.001
let float3: num = 0.0
$float4 := 0.5 as float
let float5: float = 5.0

// 科学计数法形式（作为字符串处理）
sci1=1e3
sci2=-2.5e-4
```

**输出：**
```amber
// 整数赋值
let num1 = 42
let num2 = -17

// 浮点数赋值
let float1 = 3.14
let float2 = -0.001
let float3 = 0.0
let float4 = 0.5
let float5 = 5.0

// 科学计数法形式（作为字符串处理）
let sci1 = "1e3"
let sci2 = "-2.5e-4"
```

### 浮点数参与表达式

### 作为数组元素

### 条件判断中使用浮点数

### 函数参数中的float值

## bool

**输入：**
```hulo
if true {
  echo "This always runs"
}

if false {
  echo "This never runs"
}
```

**输出：**
```amber
if true {
  echo "This always runs"
}

if false {
  echo "This never runs"
}
```

## null

## 变量赋值

**输入：**
```hulo
let nil1 = null
let nil2
let nil3: str?
let nil4: any
```

**输出：**
```amber
let nil1 = null
let nil2 = null
let nil3 = null
let nil4 = null
```

## array

### 变量赋值

**输入：**
```hulo
let nums = [1, 2, 3]
let fruits = ["apple", "banana", "orange"]
```

**输出：**
```amber
let nums = [1, 2, 3]
let fruits = ["apple", "banana", "orange"]
```

### 方法

## triple

**输入：**
```hulo
let nums = (1, 2)
```

**输出：**
```amber
let nums = [1, 2]
```

## set

**输入：**
```hulo
let nums = {1, 2}
```

**输出：**
```amber
let nums = [1, 2]
```

## map

## enum

### 枚举常量

**输入：**
```hulo
enum Protocal {
    tcp, // 0
    udp = 2,
    icmp, // 3
}

enum Arch {
    x86 = "x86",
    arm = "arm",
    amd64 = "amd64"
}

enum Color {
    red = "#FF0000",
    white = 0xffffff,
}
```

**输出：**
```amber
const enum_protocal_tcp = 0
const enum_protocal_udp = 2
const enum_protocal_icmp = 3

const enum_arch_x86 = "x86"
const enum_arch_arm = "arm"
const enum_arch_amd64 = "amd64"

const enum_color_red = "#FF0000"
const enum_color_white = "0xffffff"
```

::: tip
变量的命名以实际为准，上面的规则仅用于演示。
:::

### 枚举变量

**输入：**
```hulo
enum Protocal {
    final text: str
    final index: num

    const Protocal(this.text, this.index);

    tcp("tcp", 0),
    udp("udp", 2),
    icmp("icmp", 3);

    fn get_protocal_no() throws -> num {
        return match $this.text {
            "tcp" => 6,
            "udp" => 17,
            "icmp" => 1,
            _ => throw "unreachable"
        }
    }
}

echo Protocal::tcp.index
echo Protocal::udp.get_protocal_no()
```

**输出：**
```amber
const enum_protocal_tcp_text = "tcp"
const enum_protocal_tcp_index = 0
// ... 省略其他定义

fun enum_get_protocal_no(arg1: Text, arg2: Num) {
    if {
        arg1 == "tcp" {
            return 6
        }
        arg1 == "udp" {
            return 17
        }
        arg1 == "icmp" {
            return 1
        }
        else {
            hulo_throw("unreachable")
        }
    }
}

echo enum_protocal_tcp_index
echo enum_get_protocal_no(enum_protocal_tcp_text, enum_protocal_tcp_index)
```

## class

## cmd