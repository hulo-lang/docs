---
title: Control Flow
icon: fas fa-repeat
date: 2025-04-13
category: grammar
tag: 
    - flow
license: MIT
---

## If

>**if** is one of the most fundamental conditional control statements in programming, used to determine whether a block of code should execute based on the value of a boolean expression (true or false).

```hulo :no-line-numbers
let c: num = 5

if $c < 3 {
    println!("c < 3")
} else if ($c == 5) {
    println!("c = 5")
} else {
    println!("c != 5 && c > 3")
}
```

## Match
>**match** is a control structure used to execute different code branches based on a given value or pattern. Its purpose is to simplify complex conditional logic by providing a more intuitive and structured way to handle multiple scenarios.
>With pattern matching, it can evaluate not only single values but also the shape, type, or content of data structures. This makes **match** particularly effective and concise when working with complex data or implementing conditional branching.
>Additionally, **match** typically includes a default branch to handle cases that do not explicitly match any pattern, ensuring robustness and predictability in program behavior.

### 值匹配
```hulo :no-line-numbers
let max = $a > $b ? $a : $b

$max = ($a > $b) ? $a : ($b > 10 ? $b : ($b > $max ? $b : $max))

match $max {
    1 => println("one!"),
    2 | 3 | 5 => println("this is prime"),
    13..19 => println($max),
    _ => println("default"),
}
```

### 类型断言
```hulo :no-line-numbers
let a = 10

let ok: str? = () => {
    match $a {
        num => return $a.to_str(),
        _ => null,
    }
}
```

### 元组匹配
```hulo :no-line-numbers
let pair: triple<num> = (2, -3)

match $pair {
    (2, -3) => println("2, -3"),
    (x, _) if $x % 2 == 0 => println("x is even"),
    (x, y) if $x + y == 5 => println("x + y = 5"),
    _ => println("null"),
}
```

## Loop

>A **loop** is a control structure in programming used to repeatedly execute a block of code until a specific termination condition is met. Loops greatly reduce redundancy in code and enable efficient handling of data in bulk. 

### 列表遍历
```hulo :no-line-numbers
let arr: list<num> = [1, 3.14, 5.0, 0.7]

loop (let i = 0; $i < $arr.len(); $i++) {
    echo $i $arr[$i]
}

loop (i: num, v: num) in $arr {
    echo $i $v
}
```

### 数值遍历
```hulo
// 从 1 遍历到 5，步长为 0.1
loop $i in 1..5..0.1 {
    echo $i
}
```

### while循环
```hulo :no-line-numbers
let cnt = 0
loop {
    $cnt++

    if ($cnt > 100) {
        break
    }
}
```

### do...while循环
```hulo :no-line-numbers
let cnt = 0
do {
    $cnt++
} loop ($cnt > 100)
```

### lambda表达式
```hulo :no-line-numbers
let cnt = 0
let res: num = () => {
    loop {
        $cnt+=2

        if $cnt == 10 {
            return $cnt * 2;
        }
    }
    return -1
}
```

### 标签
```hulo :no-line-numbers
L1: loop {
    println("enter l1")

    L2: loop {
        println("l2")
        break L1;
    }

    println("exit l1")
}
```