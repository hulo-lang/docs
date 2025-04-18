---
title: Statements
icon: fas fa-scroll
date: 2025-04-13
category: grammar
tag: 
    - syntax
    - stmt
license: MIT
---

### type

#### 类型别名
```hulo
type int = num
type float = num

let i: int = 1
const PI: float = 3.14
```

#### 联合类型
```hulo
type A = num | str | bool
type B = num & str

type Protocal = 'tcp' | 'udp'

type User = { name: str, age: num }

type Function<T, R> = (arg: T) => R;

// 继承接口
type Releaser = { Package.install, Package.init  }
```

#### 条件类型
```hulo
type IsString<T> = T extends str ? "yes" : "no"

type A = IsString<str> // "yes"
type B = IsString<num> // "no"

type TypeChecker<T> = 
    T extends str ? "string" :
    T extends num ? "number" :
    T extends bool ? "boolean" :
    "null";

type A = TypeChecker<str>;  // "string"
type B = TypeChecker<num>;  // "number"
type C = TypeChecker<bool>; // "boolean"
type D = TypeChecker<null>; // "null"
```

#### Pick
```hulo
type Pick<T, K in keyof T> = {
    
}
```

#### Partial
```hulo

```

#### Require
```hulo

```

#### NonNullable
```hulo

```

#### Exclude

## 作用域

```hulo
let a = 10
var b = 10
const c = 10
```

```
let (
    a = 10
    b = 3.14
    c = "Hello World"
)

const (
    d = 1
)
```

## defer

## use
```hulo
cmd myecho {
    @flag
    eval: bool

    @flag
    format: bool

    @param
    message: str

    myecho() {}

    myecho(eval) {}

    myecho(eval, format) {}
}

impl myecho for echo {
    ...
}

// myecho 类型等于echo类型排除某个构造函数
use myecho = Exculde<echo, myecho() | myecho(eval)> & Pick<myecho, myecho() | myecho(eval)>
```
