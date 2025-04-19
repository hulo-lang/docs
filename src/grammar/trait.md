---
title: Trait
icon: fas fa-scale-unbalanced-flip
date: 2025-04-19
category: grammar
tag:
    - trait
license: MIT
---

>**trait** is a structure that defines class's members and method signatures, used to specify a contract for certain behaviors or functionalities. It is similar to the traditional interface in object-oriented programming, but usually does not contain method implementations. Any type that implements a trait must provide concrete method implementations. trait is mainly used to define a set of methods that need to be shared across multiple classes or structures, enabling code reuse and structured design.

```hulo
trait comp {
    operator >: ()
    operator >>: ()
    operator <: ()
    operator <<: ()
    operator []: ()
    operator new: ()
    operator delete: () 
}
```

```hulo
trait Animal {
    name: () -> str
    age: () -> num

    static animal: () -> animal_type
}

type animal_type = str;

class sheep {
    final _name: str
    final _age: num
    static final _type: animal_type

    const sheep({ this.name = "sheep", this.age })
}

impl Animal for sheep {
    fn name() => $this._name;

    fn age() => $this._age;

    static fn animal() => $sheep._type;
}

extend class sheep {
    fn to_string() -> str {
        return "{ name: ${this.name}, age: ${this.age} }"
    }
}

fn main() {
    let s: Animal = new sheep("", 15) // sheep{ _name: "", _age: 15 }
    $s = new sheep(age: 10)

    println!($s)

    echo $s.to_string()

    echo $s $sheep.animal()
}
```