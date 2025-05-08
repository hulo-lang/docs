---
title: Testify
icon: fas fa-triangle-exclamation
date: 2025-04-19
category: lib
tag:
    - assert
license: MIT
---

>Testify 库是一类在编程中广泛用于单元测试的工具库，它的核心功能是提供一组断言（assertions）函数，用于验证程序在特定条件下的行为是否正确。
>当你在编写测试用例时，Assert 库能帮你明确地表达期望值与实际结果之间的关系。如果某个断言失败，测试框架就会报告一个错误，从而提示开发者代码存在潜在问题。

::: important
尽管 Hulo 也提供了目标语言的实现，但是 assert 包中的函数在大部分情况下都是 comptime 修饰的函数。
:::

## ok

* **类型**
```hulo :no-line-numbers
fn ok(ok: bool, msg?: str);
```

* **详细信息**
第一个参数是表达式。第二个参数可选，它是失败时输出的提示。

* **示例**
```hulo :no-line-numbers
import "assert"

assert.ok(1 == 2, "error: 1 != 2")
```

## equal

* **类型**
```hulo :no-line-numbers
fn equal(want: any, got: any, msg?: str);
```

* **详细信息**
第一个参数是期望值，第二个参数是实际值。第三个参数是可选的，当断言失败时用于输出提示信息。

* **示例**
```hulo :no-line-numbers
import "assert"

assert.equal(1 + 1, 2, "error: 1 + 1 != 2")
```

## not_equal

* **类型**
```hulo :no-line-numbers
fn not_equal(not_want: any, got: any, msg?: str);
```

* **详细信息**
第一个参数是期望不等于的值，第二个参数是实际值。第三个参数是可选的，断言失败时输出提示信息。

* **示例**
```hulo :no-line-numbers
import "assert"

assert.not_equal(3, 1 + 1, "error: value should not be 3")
```

::: tip
在 builtin 中包装了 assert 库，可以不需要导入直接使用，不过需要注意的是函数名略微有些不同。
:::

## builtin.assert

* **类型**
```hulo :no-line-numbers
fn assert(ok: bool, msg?: str);
```

* **详细信息**
第一个参数是表达式。第二个参数可选，它是失败时输出的提示。

* **示例**
```hulo :no-line-numbers
assert.ok(1 == 2, "error: 1 != 2")
```

## builtin.assert_eq

* **类型**
```hulo :no-line-numbers
fn assert_eq(want: any, got: any, msg?: str);
```

* **详细信息**
第一个参数是期望值，第二个参数是实际值。第三个参数是可选的，当断言失败时用于输出提示信息。

* **示例**
```hulo :no-line-numbers
assert_eq(1 + 1, 2, "error: 1 + 1 != 2")
```

## builtin.assert_neq

* **类型**
```hulo :no-line-numbers
fn assert_neq(want: any, got: any, msg?: str);
```

* **详细信息**
第一个参数是期望不等于的值，第二个参数是实际值。第三个参数是可选的，断言失败时输出提示信息。

* **示例**
```hulo :no-line-numbers
assert_neq(3, 1 + 1, "error: value should not be 3")
```