---
title: Unsafe
icon: fas fa-triangle-exclamation
date: 2025-04-20
category: grammar
tag:
    - unsafe
license: MIT
---

> 在 Hulo 中，unsafe 用于引入不受类型系统保护的 *原生代码块*，以实现与底层系统或外部语言（如 Bash、PowerShell、Batch 等）的集成。它为开发者提供了直接操作系统资源、调用原生命令或执行高性能任务的能力。

// 注释那块还要介绍 @hulo-build

## 语法

### 简易

```hulo
${

}
```

### 关键字

```hulo
unsafe {
  原生代码
}
```

## 嵌入代码块

有了 unsafe 语句，可以很轻松的嵌入平台独特的代码块。

::: tip
下列仅作为演示使用，非必要请勿直接使用。因为 Hulo 在编译后都会自动生成。
:::

**输入：**
::: code-tabs#stmt

@tab bash

```hulo
${#!/bin/bash}
```

@tab batch

```hulo
${@echo off}
```

@tab powershell

```hulo
${#Requires -Version 7.0}
```

@tab vbs

```hulo
${Option Explicit}
```

@tab amber

```hulo
${#[allow_nested_if_else]}
fn foo() {
    // ...
}
```

:::

**输出：**
::: code-tabs#stmt

@tab bash

```bash
#!/bin/bash
```

@tab batch

```batch
@echo off
```

@tab powershell

```powershell
#Requires -Version 7.0
```

@tab vbs

```vb
Option Explicit
```

@tab amber
```amber
#[allow_nested_if_else]
fun foo() {
    // ...
}
```

:::

## extern

在 Hulo 中，`extern` 用于 显式导出 `unsafe` 代码块中定义的变量、函数等，使它们能够在 Hulo 的主流程中以 *受控、类型化的方式被访问和调用*。

::: info 核心作用
* 将原生代码中的变量或函数引入到 Hulo 类型系统中
* 允许原生函数以 Hulo 的语法格式调用
* 提高可读性与代码组织性，避免混乱的内联原生代码调用

`extern` 搭配 `unsafe` 使用，可将低层平台行为抽象为高层可管理的接口。
:::

下面我们将以 bash 脚本为例，讲述如何利用 `extern` 和 `unsafe` 结合。

### 导出变量


**输入：**
```hulo
unsafe {
timestamp=$(date +%s)  # 秒级时间戳
millis=$(date +%s%3N)  # 毫秒级（需GNU date）
}

extern timestamp: num, millis: num

echo $timestamp $millis
```

**输出：**
```bash
timestamp=$(date +%s)  # 秒级时间戳
millis=$(date +%s%3N)  # 毫秒级（需GNU date）

echo $timestamp $millis
```

在上述示例中，我们在 `unsafe` 代码块中用 Bash 获取时间戳。随后，通过 `extern` 将变量导出，并声明其类型为 num。这样我们就可以在 Hulo 中像访问普通变量一样使用它们。

### 导出函数

**输入：**
```hulo
unsafe {
sum() {
    local a=$1  # 第一个参数
    local b=$2  # 第二个参数
    local result=$((a + b))
    echo "$result"  # 通过echo返回值
}
}

extern sum: (a: num, b: num) -> num

$value := sum(1, 2)
```

**输出：**
```bash
sum() {
    local a=$1  # 第一个参数
    local b=$2  # 第二个参数
    local result=$((a + b))
    echo "$result"  # 通过echo返回值
}

value=$(sum 1 2)
```

同导出变量的示例类似，借助 `extern` 我们可以很轻松的导出函数，并声明其类型。从而在主流程中访问。

::: warning 注意事项
* `extern` 不会执行代码，仅声明接口
* 必须配合 `unsafe` 使用
* 不同平台的语法差异由用户自行保证
* 提供类型声明是为了让 Hulo 在语义层面提供安全提示，但并不真正影响运行时行为
:::

## 嵌入表达式

在 Hulo 中，`unsafe` 语句块不仅可以编写完整的原生代码段，也允许你将原生命令结果直接嵌入表达式中，就像使用函数调用一样。这种用法适用于简单、轻量的调用场景，无需显式导出变量或定义函数。

接下来我们以获取秒级时间戳（自1970-01-01）为例：
::: code-tabs#expr

@tab bash

```hulo
let timestamp = ${$(date +%s)}
```

@tab batch
```hulo
${for /F "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I}
let timestamp = ${%datetime:\~0,14%}
```

@tab powershell

```hulo
let timestamp = ${[int][double]::Parse((Get-Date -UFormat "%s"))}
```

@tab vbs

```hulo
let timestamp = ${DateDiff("s", "01/01/1970 00:00:00", Now())}
```


@tab amber

```hulo
${import * from "std/date"}

extern date_now: () -> num

let timestamp = date_now()
```

:::

编译后：
::: code-tabs#expr

@tab bash

```bash
timestamp=$(date +%s)
```

@tab batch

```batch
for /F "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set timestamp=%datetime:~0,14%
```


@tab powershell

```powershell
$timestamp = [int][double]::Parse((Get-Date -UFormat "%s"))
```

@tab vbs

```vb
timestamp = DateDiff("s", "01/01/1970 00:00:00", Now())
```

@tab amber

```amber
import * from "std/date"

let timestamp = date_now()
```

:::

在上述代码中有一个共同特点：`timestamp` 变量作为受 Hulo 类型系统管理的左值，而原生代码作为右值被嵌入并赋值。这说明，即便是非安全代码，也可以在类型系统的保护下安全嵌入和使用。

## 嵌入条件语句

## 嵌入循环

## 模板

对于代码块操作，有时候会有些需求将 Hulo 代码更定制化的嵌入原生中，这时候就需要模板。

### 模板语法

`{{ }}`
模板语法都包含在 `{{` 和 `}}` 中间。

### 注释

模板注释没有单行注释，默认就是支持多行注释。同正常的注释一样，不支持嵌套，必须紧贴分界符。注释过的代码片段，在编译后会消失。
```hulo
unsafe {
  {# 这是单行注释 #}

  {#
      这是一个
          多行注释
  #}
}
```

### pipeline

Hulo 模板中支持类似命令中的管道运算符操作，`|` 会将前面处理的结果（返回值）传递给后一个命令的最后一个位置。

```hulo
$ {
  echo {{ 1 | sum 2 | sum -3 }}
}
```
例如在上述例子中，最终执行完其实就是 `echo 0` 语句

### 变量

### 条件判断

Hulo 的条件判断有以下几种方法
```hulo
${
  {% if pipeline %} T1 {% end %}
  
  {% if pipeline %} T1 {% else %} T0 {% end %}

  {% if pipeline %} T2 {% else if pipeline %} T1 {% else %} T0 {% end %}
}
```

### 循环

```hulo
${
  {% loop pipeline %} T1 {% end %}
}
```

示例

**输入：**
```hulo
let count = 10

${
  {% loop i in count %}
    echo {{$i}}
  {% end %}
}
```

**输出：**
```bash
echo 1
echo 2
echo 3
# ...
echo 10
```

```hulo
let count = 10

${
  {{ val := 0 }}
  {% loop i in count %}
    echo {{$i}}
    {{ val += i * 10 }}
  {% end %}
}
```

```bash
echo 1
echo 12
echo 123
# ...
echo 12345678910
```


### 内置函数

**nameof**

返回这个变量的名字

```hulo
$value := 10
echo ${ {{ nameof value }}}
```

::: important
最后的名字肯定是翻译成目标语言后命名的名字，而非原原本本的 value 字面量。他的名字可能的格式为 temp_1 之类的。
:::

除了书写函数名外，Hulo还内置了 `@` 作为 `nameof` 的别名，你可以用 `@value` 替代 `nameof value`

**valueof**

返回这个变量的值

`$`

**refof**

返回这个变量的引用

`&`

**include**

`include` 能够直接内联文件。想象一下，在某些情况下，你只需要 `extern` 导出函数或者变量，如果直接在 Hulo 中编写代码块，没有代码提示或者编辑器检查可能难以避免某些问题的排查。因此，这个函数的重要性就尤为凸显。

下面我们假设有这样一个原生文件：
```bash

```

```hulo
${{{include "math.sh"}}}
```



### 自定义函数

```hulo
unsafe fn sum(a: num, b: num) {
  return $a + $b
}

${
  {{ sum 1 2 }}
}
```

### 宏

#### 声明
```hulo
{% macro X(a, b) %}
  echo {{$a}} {{$b}}
{% end %}
```

#### 调用
```hulo
${
  {{template X 10 "Hello World" true}}
}
```
