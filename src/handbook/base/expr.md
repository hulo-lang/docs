---
title: Expressions
icon: fas fa-puzzle-piece
---

## 关键字

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

### typeof
```hulo
echo(typeof 10) // num

let i: int = 1
echo(typeof i == num) // true
```

### is
```hulo
let a = 10
if a is num {
    echo "a is a number"
}
```

### as
```hulo
let obj: any = "Hello World" as any
```

## 运算符

### 级联运算符

#### 级联调用方法
```hulo
obj = MyClass() 
  ..set_name("Hulo")
  ..set_age(18)
  ..print_info()
```
等价于:
```hulo
obj = MyClass()
obj.set_name("Hulo")
obj.set_age(18)
obj.print_info()
```

#### 级联修改属性
```hulo
user = User()
  ..name = "Alice"
  ..age = 25
  ..email = "alice@example.com";
```
等价于：
```hulo
user = User()
user.name = "Alice"
user.age = 25
user.email = "alice@example.com"
```

#### 级联修改属性
```hulo
list = []
  ..push(1)
  ..push(2)
  ..push(3);
```
等价于:
```hulo
list = []
list.push(1)
list.push(2)
list.push(3)
```

### 空值合并
```hulo
let name: str?
echo(name ?? "default") // default

name ??= "default"
echo(name) // default

name ??= "hulo"
echo(name) // default
```

### 条件成员访问
```hulo
let name: str?
echo(name?.length) // name 为 null，不会调用length
```

### 三目运算符

```hulo
let age = 18
echo(age >= 18 ? "Adult": "Minior") // Adult
```

### 扩展运算符
```hulo
let list1 = [1, 2, 3]
let list2 = [0, ...list1, 4]
echo $list2 // [0, 1, 2, 3, 4]
```

### 箭头函数
```hulo
fn printf(v: any) => echo(v)
```

### 管道运算符
```hulo
ch <- "hello"

let data <- ch
```
