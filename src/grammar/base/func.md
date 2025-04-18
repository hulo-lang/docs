---
title: Function
icon: fas fa-superscript
date: 2025-04-13
category: grammar
tag: 
    - syntax
    - func
license: MIT
---

## Basic Syntax
>A **function** is a fundamental concept in programming, representing a block of code designed to perform a specific task. Functions are invoked by name, take arguments (inputs), and may return a result (output). The primary purpose of functions is to improve code reusability, readability, and modularity.

### lambda declare
```hulo
fn f() => println("Hello World!");

fn f() => "Hello World";

fn f(x: num) => x * 2;

fn f(x: num, y: str) => { x + 10 , "sss $y s" };
```
This syntax allows for more concise declarations of single-line functions.

### standard declare
```hulo
import { pi } from "math"

pub fn f(s: str = "default", i: num, args: ...any, {required ok: bool, name: str = "user1"}) {
    echo("s: $s, i: $i, args: $args, ok: $ok, name: $name")
}

// method one，${var_name} is unneccessary
f("abc", pi, 3.14, "6", true, ok: true)
// method two, -ok also does not specify true; the default declaration -ok is true
f "abc" $pi 3.14 "6" true -ok true

pub fn sum(args: ...num) -> num {
    let ret = 0
    loop (_, v: num) in args {
        ret += v
    }
    return ret
}

echo sum(1, pi, 5.27)
```

### multi return values
```hulo
fn f(c: num) -> (num | list<num>, str?, map<str, any>) {
    if c > 10 {
        return 10, "Hello", { "x": 10 }
    }
    return [1, 5], null, { "y": 10 }
}

let { a, b , c } = f(10)

echo(a, b, c)
```

### comptime function
```hulo
comptime fn my_print(msg: str) {
    println!(msg)
}

println!("hi")
```
Compile-time functions are executed before they are translated into object code. In contrast to the traditional function, it just adds a `!` to work.


## Overload
>**Function overloading** refers to the ability to define multiple functions with the same name but different implementations based on varying numbers or types of parameters in the same scope. The compiler determines which specific function to call based on the characteristics of the arguments (number, type, or order) at the time of the function call. The primary purpose of function overloading is to enhance code flexibility and readability.

### basic
```hulo
fn f(s: str) => echo(s)

fn f(i: num) => echo $i

f("hello world")
f(3.14)
```

### complex
```hulo
fn f(s: str | num) => echo(s)

fn f(s: bool) => echo(s)

class user {
    name: str
    pwd: str
}

fn f(s: user) => echo(s)
```

### incorrect writing
```hulo
fn f(s: str) => "abc"

fn f(i: num) => 10
```
This is not allow to return different values

## Closure
>A **closure** is a function bundled with its lexical environment (variable scope) where it was defined. This allows the function to access variables in its original scope even when executed outside that scope. Closures are commonly used for data encapsulation, callback functions, and factory functions.
>In simpler terms, a closure enables a function to "remember" the environment where it was created.

```hulo
fn incr(): fn() -> num {
    let cnt: num = 0
    return fn (): num {
        cnt++
        return cnt
    }
}

let c = incr()
echo(incr()) // 1
echo(incr()) // 2
```