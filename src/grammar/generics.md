---
title: Generics
icon: fas fa-layer-group
date: 2025-04-19
category: grammar
tag: 
    - generics
license: MIT
---

## 函数

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

## 类
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

## 接口
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