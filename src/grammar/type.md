---
title: Data Types
icon: fas fa-spell-check
date: 2025-04-13
category: grammar
tag: 
    - type
license: MIT
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

m?.["a"].to_str()
```

## Collections
```hulo
// array
let arr: num[3]

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
type Protocal = 'tcp' | 'udp'

// method 1
enum Protocal {
    tcp, udp
}

Protocal::tcp

// method 2
enum Protocal {
    port: num

    tcp(6),
    udp(17);
}

Protocal::tcp.port
Protocal::udp
Protocal::udp.index
```

## Class

>**class** is a fundamental concept in Object-Oriented Programming (OOP). It acts as a blueprint or template for creating objects that share the same properties and behaviors. A class defines the attributes (state) and methods (behaviors) of objects. Once a class is defined, objects can be created through instantiation.

Let's assume we are creating a rectangle class with two properties: width and height. We will implement the following:

- A method to calculate the area area().
- A method to calculate the perimeter perimeter().

```hulo
class rectangle {
    width: num
    height: num

    fn area() => $this.width * $this.height

    fn perimeter() => 2 * ( $this.width + $this.height )
}
```

### 构造函数
A constructor is a special method used to initialize an object when it is created. It typically shares the same name as the class and is responsible for setting the initial state of the object. Constructors can take parameters, allowing users to provide initial values when instantiating the object.

### static修饰符
static is a keyword used to define static members or static methods. Static members belong to the class itself, not to any specific instance of the class. In other words, static members are at the class level and are shared among all instances.

```hulo
class rectangle {
    // ...
    static class_name: str = "rectangle"

    static fn get_class_name() => $class_name; 

    static fn get_width() => $this.width; // error
}

let r1 = new rectangle(1, 3)

echo $rectangle.class_name
echo $rectangle.get_class_name()
echo $r1.class_name
```

### Single Inheritance
```hulo
class base_car {
    name: str

    base_car(name: str) {
        $this.name = $name
        println("init base car")
    }

    fn run() => println("run")
}

class super_car: base_car {
    super_car() {
        super("super car")
    }

    fn run() => $super.run()
}

let c = new super_car()
echo $c.name // super car
```

### Operator Overload

>The **operator overloading** allows you to define how operators (such as + ,-, * , etc.) behave for a custom type. You can do this by defining an operator function.

Let's assume we have a point class with two properties: x and y, representing 2D coordinates. We overload the addition operator (+) so that adding two point objects results in the addition of their x and y coordinates.

```hulo
class point {
    x: num
    y: num

    fn operator +(right: point) -> point {
        $this.x += $right.x
        $this.y += $right.y
        return $this
    }
}

let p1 = point{x: 1, y: 2}
let p2 = point{x: 2, y: 1}

$p1 = $p1 + $p2
echo $p.x // 3
```