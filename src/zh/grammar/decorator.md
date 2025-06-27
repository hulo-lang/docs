---
title: 装饰器
icon: fas vr-cardboard
date: 2025-04-19
category: grammar
tag: 
    - macro
license: MIT
---

>An annotation is a form of metadata in programming languages, typically used to add supplementary information to a program without directly affecting its logic or execution. Annotations can be applied to classes, methods, variables, or other elements to support compile-time checks, runtime processing, or documentation generation. They are often used in frameworks or libraries for dependency injection, configuration, and code generation.

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
    return (self: Class<User>) => {
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

元注解（Meta Annotation）是用于描述**代码的元信息**的机制，形式为以 `@` 开头的注解。它们**不属于 Hulo 语言本身的语法特性**，而是在**解释器或构建器中通过内置（builtin）方式解析与执行**，从而实现对语义的增强或控制。

元注解通常用于标记函数、变量、模块等实体的属性，例如是否已弃用、是否可被重载等。

### @deprecated

标记当前函数或变量为**已弃用**。调用时解释器可以提示警告信息。
```hulo
@deprecated("Use `newLog` instead")
fn oldLog(msg: str) {
    println(msg)
}
```

### @inline

提示解释器或构建工具在编译时将函数内联展开（仅在静态分析中有效）。
```hulo
@inline
fn add(a: num, b: num) => $a + $b
```

### @entry

指定程序的入口点（通常用于脚本语言模式下的执行入口）。
```hulo
@entry
fn main() {
    println("Hello, Hulo!")
}
```

::: tip
在 Hulo 中 `main` 为默认程序入口点。
:::

### @override

用于标记当前函数是对**父类或接口中已有方法的重写（override）**，在解释器中可用于进行签名校验或增强提示。
它的作用类似于许多面向对象语言中的同名关键字，例如 Java、Kotlin、Dart 等。其主要目标是提高代码可读性并避免无意中的签名偏差。

```hulo
class Animal {
    fn speak() {
        println("Animal sound")
    }
}

class Dog extends Animal {
    @override
    fn speak() {
        println("Woof!")
    }
}
```

在上面的例子中, `Animal` 类定义了一个 `speak()` 方法。`Dog` 类继承 `Animal`，并通过 `@override` 显式标注重写行为。如果 `Dog.speak()` 方法的参数或返回类型与 `Animal.speak() `不一致，解释器可提前报错，防止误用。

::: warning
* 若标注了 `@override`，但父类并无同名函数，会报错。
* 若未标注 `@override`，但函数实际重写了父类方法，可能会发出提示或警告。
:::

### @command

### @flag

**alias**

* 类型: `str[]`
* 默认值: 

**format**

* 类型: `str | function`
* 默认值：