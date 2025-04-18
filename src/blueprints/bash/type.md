---
title: Type
icon: fas fa-spell-check
date: 2025-04-13
category: blueprint
tag:
    - bash
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
```bash
str1="Hello"
str2='World'
str3="" # 空字符串
str4="123"
```

### 长字符串

::: tip
在 Bash 中有多种方式可以实现长字符串，对于具体如何实现可以通过修改配置文件的方式实现
:::

::: code-tabs#shell

@tab 续行符

```json title="huloc.json"
"bash": {
    "multiStringResolution": "symbol"
}
```

@tab Here-String

```json title="huloc.json"
"bash": {
    "multiStringResolution": "Here-String"
}
```

@tab Here-Doc

```json title="huloc.json"
"bash": {
    "multiStringResolution": "Here-Doc"
}
```

@tab ANSI C

```json title="huloc.json"
"bash": {
    "multiStringResolution": "ANSI-C"
}
```
:::

**输入：**
```hulo
$str := """This is a very very long string
that continues on the next line
and still is a single string."""

echo $str
```

**输出：**
::: code-tabs#shell

@tab 续行符

```bash
str="This is a \
multi-line \
string."

echo "$str"
```

@tab Here-String

```bash
str=$(cat <<EOF
This is a
multi-line
string.
EOF
)

echo "$str"
```

@tab Here-Doc

```bash
str=$(cat <<'EOF'
This is a
multi-line
string.
EOF
)

echo "$str"
```

@tab ANSI C

```bash
str=$'This is a\nmulti-line\nstring.'

echo "$str"
```

:::

### 字符插值

**输入：**
```hulo
$greeting := "Hello"
$name := "Alice"

$message := "$greeting, $name!"
```

**输出：**
```bash
greeting="Hello"
name="Alice"

message="$greeting, $name!"
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
```bash
# 整数赋值
num1=42
num2=-17

# 浮点数赋值（注意：bash 不支持浮点数直接运算）
float1=3.14
float2=-0.001
float3=0.0
float4=.5
float5=5.

# 科学计数法形式（作为字符串处理）
sci1=1e3
sci2=-2.5e-4
```

### 浮点数参与表达式

**输入：**
```hulo
// 使用 bc 或 awk 做浮点计算 (支持运算符重载使用其他工具)
$result1 := 3.5 + 2.1
let result2 = -5.2 * 3.1
let result3: num = 1.23 / 0.0034
```

**输出：**
```bash
# 使用 bc 或 awk 做浮点计算 (支持运算符重载使用其他工具)
result1=$(echo "3.5 + 2.1" | bc)
result2=$(awk "BEGIN {print -5.2 * 3.1}")
result3=$(bc <<< "scale=4; 1.23 / 0.0034")
```

### 作为数组元素

**输入：**
```hulo
let numbers: list<num> | num[] = [1, 2.0, -3.14, 4e2, -5.0e-3]
```

**输出：**
```bash
numbers=(1 2.0 -3.14 4e2 -5.0e-3)
```

### 条件判断中使用浮点数

**输入：**
```hulo
$x := 2.5
$y := 2.0

if $x > $y {
    echo "$x is greater than $y"
}
```

**输出：**
```bash
x=2.5
y=2.0

if awk "BEGIN {exit !($x > $y)}"; then
  echo "$x is greater than $y"
fi
```

### 函数参数中的float值

**输入：**
```hulo
fn print_float(f: num) => echo "Received: $f"

print_float 0.123
print_float(-456.78)
print_float 9e-2
```

**输出：**
```bash
print_float() {
  echo "Received: $1"
}

print_float 0.123
print_float -456.78
print_float 9e-2
```

## bool

::: tip
虽然 Bash 没有原生的 true / false 布尔类型，但我们通常会用：
* 整数 0 表示 true
* 非 0 表示 false
* 或者用 true / false 命令（它们本质上返回特定退出码）
:::

鉴于以上两种方式, Hulo 提供编译选项的方式方便用户实现

::: code-tabs#shell

@tab 数值类型

```json title="huloc.json"
"bash": {
    "boolTypeResolution": "number"
}
```

@tab 字符类型

```json title="huloc.json"
"bash": {
    "boolTypeResolution": "string"
}
```

@tab 命令类型

```json title="huloc.json"
"bash": {
    "boolTypeResolution": "command"
}
```
:::


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
::: code-tabs#shell

@tab 数值类型

```bash
if [ 0 -eq 0 ]; then
  echo "This always runs"
fi

if [ 1 -eq 0 ] then
  echo "This never runs"
fi
```

@tab 字符类型

```bash
if [ "true" = "true" ]; then
  echo "This always runs"
fi

if [ "true" = "false" ]; then
  echo "This never runs"
fi
```

@tab 命令类型

```bash
if true; then
  echo "This always runs"
fi

if false; then
  echo "This never runs"
fi
```
:::

