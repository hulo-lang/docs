---
title: Data Types
icon: fas fa-box
---

## Number
```hulo
let a: num = -10
let pi = 3.14
```

## String

### basic
```hulo
let s: str = str("  Hello World!  ")
s = s.trim() // delete space

echo ${s.len()}
echo(s.len())

echo(#s)
echo ${#s}

echo ${s.replace("o", "X")}

echo ${s[0..5]} ${s[1]}
```

### multi string
```hulo
let a = """ 
    this is 
a multi string
"""
```

### variable substitution
```hulo
let c = 10
echo "c is $c" // c is 10
```

## Bool

## Null
```hulo
let s: str?

echo $s // null

s = "Hello World"

echo $s // echo "Hello World"

let ss: str

echo $ss // echo ""

let m: map<str, num> = null

m?["a"].to_str()
```

## Collections
```hulo
// array
let arr: int[3]

arr[2] = 5
arr[3] = 10 // error

// list
let a: list<num> | num[] = [1, 2, 3]

// triple
let b: triple<num> = (1, 2, 3)

// set
let c: set<num> = {1, 2, 3}
```

## Map

## Enum

>**Enumeration** is a data type used to define a set of named constants. Each enum value has a unique name, typically representing a fixed, meaningful set of options. Enums improve code readability and maintainability by avoiding the use of magic numbers or hardcoded strings.

```hulo
// stimulate by union type
type protocal = 'tcp' | 'udp'

// method 1
enum protocal {
    tcp, udp
}

protocal::tcp

// method 2
enum protocal {
    port: num

    tcp(6),
    udp(17);
}

protocal::tcp.port
protocal::udp
protocal::udp.index
```

## Class


## Command