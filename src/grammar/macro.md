---
title: Macro
icon: fas vr-cardboard
date: 2025-04-19
category: grammar
tag: 
    - macro
license: MIT
---

>An annotation is a form of metadata in programming languages, typically used to add supplementary information to a program without directly affecting its logic or execution. Annotations can be applied to classes, methods, variables, or other elements to support compile-time checks, runtime processing, or documentation generation. They are often used in frameworks or libraries for dependency injection, configuration, and code generation.

::: important
In hulo annotations are the same concept as macros. Therefore, you can call macro or annotation.
:::

## 不带参数的
```hulo
fn extend_user(self: Class<User>) {
    echo $self.name // User
    echo ${self.fields.len} // 0
    $self.fields[""]
}

@extend_user
class User {}
```

## 带参数的
```hulo
fn extend_user({required }) {
    return _build(self: Class<User>) {
        echo $self.name // User
        echo ${self.fields.len} // 0
        $self.fields["name"] = symbol(str)
    }
}

@extend_user()
class User {}
```

## 函数注解
```hulo
fn log(self: () -> void | Function, funcName: str) {
    echo("executing $funcName")
    self()
}

@log
fn sayHello() {
    echo("Hello World")
}
```

## 类注解

## 方法注解

## 字段注解

## 注解执行流程

## 注解包装

## 元注解
元注解没有 hulo 语言的实现，仅在解释器中通过builtin实现

### @override

### @comptime

### @deprecated

### @injectable
```hulo
// main.hl
var my_echo = (args: ...str) => {
    return $(echo ...args)
}

fn my_echo_for_printf(args: ...str) -> str {
    echo("hook echo")
    return $(printf ...args)
}

my_echo = my_echo_for_printf
my_echo("a", "b", "c")
```
通过调用 main.my_echo 的URL注入
