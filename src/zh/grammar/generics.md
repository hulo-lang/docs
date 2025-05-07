---
title: 泛型
icon: fas fa-layer-group
date: 2025-04-19
category: grammar
tag: 
    - generics
license: MIT
---

> 泛型（Generics）是一种在编程语言中用于实现类型参数化的机制，允许开发者在编写程序组件时不预先指定具体的数据类型，而是在实际使用时再指定类型。它是一种抽象化的能力，使得函数、类型、接口、结构体或类在定义时可以引入一个或多个类型参数。这些类型参数在组件内部表现为实际类型的占位符，直到该组件被实例化或调用时才被替换为具体类型。

在 Hulo 中的类/函数/接口可以有类型参数，例如：
```hulo :no-line-numbers
class Box<T> {
    value: T

    Box(this.value)
}

let box: Box<num> = Box<num>(3.14)
```
但是如果类型参数可以推断出来，例如从构造函数的参数或者从其他途径，就可以省略类型参数：
```hulo :no-line-numbers
let box = Box(3.14)
```

## 泛型函数

```hulo
fn add<T>(a: T, b: T) -> T {
    return a + b
}

add(1, 2)
add("Hello", "World")

import "./user.hulo"

let u1 = new user(name: "u1")
let u2 = new user(name: "u2")

extend class user {
    fn operator +(right: user) -> user {
        return user{name: this.name() + right.name(), age: this.age() + right.age()};
    }
}

let u3 = add(u1, u2)

echo $u3
```

## 泛型类
```hulo
class pair<T, U> {
    x: T
    y: U

    pair({required this.x, required this.y})

    fn one(): T => x;

    fn two(): U => y;
}

fn main() {
    let a = pair<str, bool>("abc", true)

    println(a.one())
    println(a.two())
}
```

## 泛型接口
```hulo
trait comparable<T> {
    is_same: (T) -> bool
}

trait clone<T> {
    fork: () -> T
}

fn f<T: clone & comparable>(x: T, y: T): T {
    if $x.is_same(y) {
        return $x.fork()
    }
    return $y.fork()
}

type myT = clone & comparable;

fn f<T: myT>(x: T, y: T): T {
    if $x.is_same(y) {
        return $x.fork()
    }
    return $y.fork()
}
```

## 泛型约束

> **泛型约束**是指在使用泛型时对类型参数施加的限制，用于指定类型参数必须满足的条件。它确保在编译期，传入的类型具备某些特性，如实现某个接口、继承某个类、具有特定操作或成员等。通过设置约束，开发者可以在泛型代码中安全地使用依赖于这些特性的语法和操作，而无需显式转换或额外检查。

### 接口约束

最常见的约束类型就是采用泛型接口，要求实现这个接口的类型参数才能被应用到该类型上。
```hulo :no-line-numbers
fn add<T: Additive<T>>(a: T, b: T) {
    return $a + $b
}
```

如上声明可知，add 函数要求两个入参必须是可加类型：
```hulo :no-line-numbers
add(1, 2) // OK，num 是一个可加类型
add(true, false) // 错误，bool 类型不可相加
```

### 复合约束
同类型系统所述的复合类型类型类似，泛型约束也遵循相同的规则。
```hulo :no-line-numbers
fn add<T: str | num>(a: T, b: T) => $a + $b
```

你甚至可以将复合类型的规则作用到 泛型的接口约束 上，例如：
```hulo :no-line-numbers
fn add<T: Additive<T> & Comparable<T>>(a: T, b: T) => $a + $b
```

## 泛型特化

在上述例子中，我们使用泛型约束实现了 add 函数，但是它对于 bool 类型或者其他自定义类型并不支持。为了解决这个问题，我们可以像类似函数重载的方式一样，单独为想要处理的类型实现约束的扩展。

```hulo :no-line-numbers
fn add(a: bool, b: bool) => $a & $b
```
在声明了这个函数重载后，对 `add(true, false)` 的调用便不会抛出异常。当然，你也可以在声明前加入类型参数，更加规范的告诉其他开发者，这是一个泛型的特化而非简单的函数重载。

::: tip
不管哪两种书写方式，对于编译器来说并无本质区别。
:::

```hulo :no-line-numbers
fn add<T: bool>(a: T, b: T) => $a & $b
```