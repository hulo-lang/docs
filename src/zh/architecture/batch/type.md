---
title: Type
icon: fas fa-spell-check
date: 2025-04-13
category: architecture
tag:
    - batch
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
```batch
set str1=Hello
set str2=World
set str3=
set str4=123
```

### 长字符串

::: warning
batch 中暂时不支持长字符串
:::

### 字符插值

**输入：**
```hulo
$greeting := "Hello"
$name := "Alice"

$message := "$greeting, $name!"
```

**输出：**
```batch
set greeting=Hello
set name=Alice

set message=%greeting%, %name%!
```

### 字符串前缀
```hulo
r""
c""
f""
```

## num

### 变量赋值

**输入：**
```hulo
// 整数赋值
let num1 = 42
let num2: num = -17

type float = num

// 浮点数赋值（注意：bash 不支持浮点数直接运算）
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
```batch
:: 整数赋值
set num1=42
set num2=-17

:: 浮点数赋值（仅作为字符串存储，不能用于数学运算）
set float1=3.14
set float2=-0.001
set float3=0.0
set float4=0.5
set float5=5.0

:: 科学计数法（仍然作为字符串处理）
set sci1=1e3
set sci2=-2.5e-4
```

### 浮点数参与表达式

::: warning
batch 中暂时不支持浮点数运算
:::


### 作为数组元素

**输入：**
```hulo
let numbers: list<num> | num[] = [1, 2.0, -3.14, 4e2, -5.0e-3]
```

**输出：**
```batch
set numbers[0]=1
set numbers[1]=2.0
set numbers[2]=-3.14
set numbers[3]=4e2
set numbers[4]=-5.0e-3
```

### 条件判断中使用浮点数

### 函数参数中的float值

## bool

::: tip
虽然 Batch 没有原生的 true / false 布尔类型，但我们通常会用：
* 1 表示 true
* 0 表示 false
* 或者用 true / false 字面量
:::

**输入：**
```hulo :no-line-numbers
if true {
  echo "This always runs"
}

if false {
  echo "This never runs"
}
```

**输出：**

::: code-tabs#shell

@tab 数值类型

```batch
if "1"=="1" (
    echo This always runs
)

if "0"=="1" (
    echo This never runs
)
```

@tab 字符类型

```batch
if "true"=="true" (
    echo This always runs
)

if "false"=="true" (
    echo This never runs
)
```

:::