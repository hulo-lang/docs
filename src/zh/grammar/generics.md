---
title: 泛型
icon: fas fa-layer-group
date: 2025-04-19
category: grammar
tag: 
    - generics
license: MIT
---

> `泛型`是一种在编程语言中用于实现**类型参数化**的机制，允许开发者在编写程序组件时不预先指定具体的数据类型，而是在实际使用时再指定类型。它是一种抽象化的能力，使得函数、类型、接口、结构体或类在定义时可以引入一个或多个类型参数。这些类型参数在组件内部表现为实际类型的占位符，直到该组件被实例化或调用时才被替换为具体类型。

在 Hulo 中的类/函数/接口可以有类型参数，例如：
```hulo :no-line-numbers
class Box<T> {
    value: T

    Box($this.value)
}

let box: Box<num> = Box<num>(3.14)
```
但是如果类型参数可以推断出来，例如从构造函数的参数或者从其他途径，就可以省略类型参数：
```hulo :no-line-numbers
let box = Box(3.14)
```

## 泛型函数

泛型函数允许你编写可以处理多种数据类型的函数，而无需为每种类型编写重复的代码。类型参数在函数调用时根据传入的参数自动推断，或者可以显式指定。

### 基础泛型函数

```hulo
// 简单的泛型函数
fn identity<T>(value: T) -> T {
    return $value
}

// 使用自动类型推断
let num = identity(42)        // 推断为 num
let str = identity("hello")   // 推断为 str
let bool = identity(true)     // 推断为 bool

// 显式指定类型参数
let explicit = identity<num>(42)
```

### 多参数泛型函数

```hulo
// 两个相同类型的参数
fn add<T>(a: T, b: T) -> T {
    return $a + $b
}

// 两个不同类型的参数
fn pair<T, U>(first: T, second: U) -> [T, U] {
    return [$first, $second]
}

// 使用示例
let sum = add(10, 20)                    // 自动推断为 num
let concat = add("Hello", "World")       // 自动推断为 str
let tuple = pair("age", 25)              // 推断为 [str, num]
```

### 泛型函数与运算符重载

```hulo
// 定义支持加法的泛型函数
fn sum<T>(a: T, b: T) -> T {
    return $a + $b
}

// 为自定义类型添加运算符重载
class Vector {
    x: num
    y: num
    
    Vector($this.x, $this.y)
    
    operator +(other: Vector) -> Vector {
        return Vector($this.x + $other.x, $this.y + $other.y)
    }
}

// 现在可以用于自定义类型
let v1 = Vector(1, 2)
let v2 = Vector(3, 4)
let v3 = sum($v1, $v2)  // 自动使用 Vector 的 + 运算符
```

::: tip
* 泛型函数的类型参数 `<T>` 在函数名后声明
* 类型参数可以在参数列表、返回类型和函数体内使用
* 编译器会根据传入的参数自动推断类型参数
* 也可以显式指定类型参数：`identity<num>(42)`
* 支持多个类型参数：`fn process<T, U, V>(...)`
:::

## 泛型类

泛型类允许你创建可以处理多种数据类型的类。类的实例化时指定具体的类型参数，使得类内部的属性和方法都能使用这个类型。

### 基础泛型类

```hulo
// 简单的泛型容器类
class Box<T> {
    value: T
    
    Box($this.value)
    
    fn getValue(): T => $this.value
    
    fn setValue(value: T) {
        $this.value = $value
    }
}

// 使用示例
let numBox = Box<num>(42)
let strBox = Box<str>("Hello")
let boolBox = Box<bool>(true)

echo $numBox.getValue()   // 42
echo $strBox.getValue()   // "Hello"
```

### 多类型参数类

```hulo
// 键值对类
class Pair<K, V> {
    key: K
    value: V
    
    Pair($this.key, $this.value)
    
    fn getKey(): K => $this.key
    
    fn getValue(): V => $this.value
    
    fn setValue(value: V) {
        $this.value = $value
    }
}

// 使用示例
let userPair = Pair<str, num>("age", 25)
let configPair = Pair<str, bool>("enabled", true)

echo $userPair.getKey()     // "age"
echo $userPair.getValue()   // 25
```

### 泛型类与约束

```hulo
// 带约束的泛型类
class SortedList<T extends Comparable<T>> {
    items: T[] = []
    
    fn add(item: T) {
        $this.items.push($item)
        $this.items.sort()
    }
    
    fn get(index: num): T => $this.items[index]
    
    fn size(): num => $this.items.length()
}

// 使用示例（num 实现了 Comparable）
let numbers = SortedList<num>()
$numbers.add(3)
$numbers.add(1)
$numbers.add(2)

echo $numbers.get(0)  // 1 (已排序)
```

::: tip
* 泛型类的类型参数在类名后声明：`class Box<T>`
* 类型参数可以在类的属性、方法参数、返回类型中使用
* 实例化时可以显式指定类型参数：`Box<num>(42)`
* 如果构造函数参数能推断出类型，可以省略类型参数：`Box(42)`
* 支持在类定义中使用约束：`class Container<T extends SomeTrait>`
:::

### 泛型类的继承

```hulo
// 基础泛型容器
class Container<T> {
    value: T
    
    Container($this.value)
    
    fn get(): T => $this.value
}

// 泛型类继承泛型类
class Box<T> extends Container<T> {
    Box(value: T) {
        super($value)
    }
    
    fn set(value: T) {
        $this.value = $value
    }
}

// 非泛型类继承泛型类（指定具体类型）
class StringContainer extends Container<str> {
    StringContainer(value: str) {
        super($value)
    }
    
    fn toUpper(): str => $this.value.toUpper()
}

// 使用示例
let box = Box<num>(42)
let stringContainer = StringContainer("hello")
```

## 泛型接口

泛型接口（trait）允许你定义可以处理多种数据类型的接口。实现泛型接口的类必须提供具体的类型参数，或者实现接口的泛型版本。

### 基础泛型接口

```hulo
// 可比较接口
trait Comparable<T> {
    compare: (T) -> num  // 返回 -1, 0, 1
}

// 可克隆接口
trait Cloneable<T> {
    clone: () -> T
}

// 可序列化接口
trait Serializable<T> {
    serialize: () -> str
    deserialize: (str) -> T
}
```

### 实现泛型接口

```hulo
// 为具体类型实现接口
class User {
    name: str
    age: num
    
    User($this.name, $this.age)
    
    // 实现 Comparable<User>
    fn compare(other: User) -> num {
        if $this.age < $other.age return -1
        if $this.age > $other.age return 1
        return 0
    }
    
    // 实现 Cloneable<User>
    fn clone() -> User {
        return User($this.name, $this.age)
    }
    
    // 实现 Serializable<User>
    fn serialize() -> str {
        return "{\"name\":\"${$this.name}\",\"age\":${$this.age}}"
    }
    
    fn deserialize(data: str) -> User {
        // 解析 JSON 并创建 User 对象
        // 这里简化处理
        return User("parsed", 0)
    }
}

// 显式实现接口
impl Comparable<User> for User {
    fn compare(other: User) -> num {
        if $this.age < $other.age return -1
        if $this.age > $other.age return 1
        return 0
    }
}

impl Cloneable<User> for User {
    fn clone() -> User {
        return User($this.name, $this.age)
    }
}

impl Serializable<User> for User {
    fn serialize() -> str {
        return "{\"name\":\"${$this.name}\",\"age\":${$this.age}}"
    }
    
    fn deserialize(data: str) -> User {
        return User("parsed", 0)
    }
}
```

### 泛型接口组合

```hulo
// 组合多个接口
type Sortable<T> = Comparable<T> & Cloneable<T>

// 使用组合接口的函数
fn sort<T: Sortable<T>>(items: T[]) -> T[] {
    // 排序逻辑
    return $items.sort()
}

// 使用示例
let users: User[] = [
    User("Alice", 25),
    User("Bob", 30),
    User("Charlie", 20)
]

let sortedUsers = sort($users)
```

### 泛型接口的高级用法

```hulo
// 工厂接口
trait Factory<T> {
    create: () -> T
}

// 构建器接口
trait Builder<T> {
    build: () -> T
    reset: () -> void
}

// 观察者接口
trait Observer<T> {
    update: (T) -> void
}

// 可观察接口
trait Observable<T> {
    addObserver: (Observer<T>) -> void
    removeObserver: (Observer<T>) -> void
    notify: (T) -> void
}

// 实现示例
impl Factory<User> for UserFactory {
    fn create() -> User {
        return User("default", 0)
    }
}

class UserFactory {}

impl Builder<User> for UserBuilder {
    fn build() -> User {
        return User($this.name, $this.age)
    }
    
    fn reset() {
        $this.name = ""
        $this.age = 0
    }
}

class UserBuilder {
    name: str = ""
    age: num = 0
    
    fn setName(name: str) {
        $this.name = $name
    }
    
    fn setAge(age: num) {
        $this.age = $age
    }
}
```

### 泛型接口的默认实现

```hulo
// 带默认实现的泛型接口
trait Printable<T> {
    fn print() {
        echo "default print"
    }
    
    fn format() -> str {
        return "default format"
    }
}

// 使用默认实现
impl Printable<User> for User {}

// 覆盖默认实现
impl Printable<User> for User {
    fn print() {
        echo "User: ${$this.name}, Age: ${$this.age}"
    }
    
    fn format() -> str {
        return "User(${$this.name}, ${$this.age})"
    }
}
```

### 泛型接口继承

```hulo
// 基础接口
trait Readable<T> {
    read: () -> T
}

trait Writable<T> {
    write: (T) -> void
}

// 继承接口
trait ReadWrite<T>: Readable<T>, Writable<T> {
    // 可以添加新的方法
    fn clear() {
        // 默认实现
    }
}

// 实现继承的接口
impl ReadWrite<str> for FileHandler {
    fn read() -> str {
        return "file content"
    }
    
    fn write(data: str) {
        echo "writing: $data"
    }
    
    fn clear() {
        echo "clearing file"
    }
}

class FileHandler {}
```

::: tip
* 泛型接口的类型参数在接口名后声明：`trait Comparable<T>`
* 接口的方法签名可以使用类型参数
* 实现接口时可以指定具体类型或保持泛型
* 可以使用类型别名简化复杂的接口组合：`type Sortable<T> = Comparable<T> & Cloneable<T>`
* 支持接口的组合和继承，提供强大的抽象能力
:::

## 泛型约束

> **泛型约束**是指在使用泛型时对类型参数施加的限制，用于指定类型参数必须满足的条件。它确保在编译期，传入的类型具备某些特性，如实现某个接口、继承某个类、具有特定操作或成员等。通过设置约束，开发者可以在泛型代码中安全地使用依赖于这些特性的语法和操作，而无需显式转换或额外检查。

### 基础约束语法

Hulo 支持多种约束语法，包括 `extends` 关键字和冒号语法：

#### extends 语法（推荐）
```hulo
// 单个约束
fn process<T extends Addable>(item: T) -> T {
    return $item + $item
}

// 多个约束（交集）
fn process<T extends Addable + Comparable>(item: T) -> T {
    if $item > 0 {
        return $item + $item
    }
    return $item
}

// 联合约束
fn process<T extends str | num>(item: T) -> T {
    return $item
}
```

#### 冒号语法
```hulo
// 单个约束
fn process<T: Addable>(item: T) -> T {
    return $item + $item
}

// 多个约束（交集）
fn process<T: Addable & Comparable>(item: T) -> T {
    if $item > 0 {
        return $item + $item
    }
    return $item
}

// 联合约束
fn process<T: str | num>(item: T) -> T {
    return $item
}
```

### 接口约束

最常见的约束类型就是采用泛型接口，要求实现这个接口的类型参数才能被应用到该类型上。
```hulo :no-line-numbers
fn add<T extends Additive<T>>(a: T, b: T) {
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
fn add<T extends str | num>(a: T, b: T) => $a + $b
```

你甚至可以将复合类型的规则作用到 泛型的接口约束 上，例如：
```hulo :no-line-numbers
fn add<T extends Additive<T> + Comparable<T>>(a: T, b: T) => $a + $b
```

### 类型体操约束

Hulo 支持复杂的类型体操约束，允许在编译期进行类型计算和条件判断：

#### 条件约束
```hulo
// 条件类型约束
fn process<T extends (T extends str ? HasLength : HasValue)>(item: T) {
    if $item is str {
        echo $item.length()
    } else {
        echo $item.value()
    }
}

// 嵌套条件约束
fn safeAccess<T extends (T extends null ? never : T)>(item: T) -> T {
    return $item
}
```

#### 映射约束
```hulo
// 映射类型约束
fn processObject<T extends { [K in keyof T]: T[K] extends str ? T[K] : never }>(obj: T) {
    loop ($key, $value) of $obj {
        echo "$key: $value"
    }
}

// 只读约束
fn processReadonly<T extends { readonly [P in keyof T]: T[P] }>(obj: T) {
    // 处理只读对象
}
```

#### 递归约束
```hulo
// 递归类型约束
fn deepClone<T extends (T extends object ? { [K in keyof T]: T[K] } : T)>(item: T) -> T {
    if $item is object {
        // 深度克隆逻辑
        return clone($item)
    }
    return $item
}
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
fn add<T extends bool>(a: T, b: T) => $a & $b
```

### 高级特化模式

#### 条件特化
```hulo
// 根据类型条件进行特化
fn process<T extends (T extends str ? HasLength : HasValue)>(item: T) {
    if $item is str {
        echo "String length: ${$item.length()}"
    } else {
        echo "Value: ${$item.value()}"
    }
}

// 特化版本
fn process<T extends str>(item: T) {
    echo "String: $item"
}

fn process<T extends num>(item: T) {
    echo "Number: $item"
}
```

#### 约束组合特化
```hulo
// 基础约束
fn merge<T extends Addable + Comparable>(a: T, b: T) -> T {
    return $a > $b ? $a : $b
}

// 特化版本：字符串合并
fn merge<T extends str>(a: T, b: T) -> T {
    return $a + " " + $b
}

// 特化版本：数组合并
fn merge<T extends list<any>>(a: T, b: T) -> T {
    return [...$a, ...$b]
}
```

## 泛型工具类型

Hulo 提供了一系列内置的泛型工具类型，用于类型操作和转换：

### 基础工具类型
```hulo
// 可选类型
type Optional<T> = T | null

// 只读类型
type Readonly<T> = { readonly [P in keyof T]: T[P] }

// 部分类型
type Partial<T> = { [P in keyof T]?: T[P] }

// 必需类型
type Required<T> = { [P in keyof T]-?: T[P] }

// 选择类型
type Pick<T, K extends keyof T> = { [P in K]: T[P] }

// 排除类型
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

### 高级工具类型
```hulo
// 条件类型
type If<C extends bool, T, F> = C extends true ? T : F

// 非空类型
type NonNullable<T> = T extends null | undefined ? never : T

// 函数参数类型
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never

// 函数返回类型
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never

// 构造函数类型
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never

// 实例类型
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : never
```

## 泛型最佳实践

### 约束设计原则
```hulo
// ✅ 好的约束：明确且最小化
fn sort<T extends Comparable<T>>(items: T[]) -> T[] {
    // 只需要比较能力
}

// ❌ 不好的约束：过于宽泛
fn sort<T>(items: T[]) -> T[] {
    // 没有约束，可能导致运行时错误
}

// ✅ 好的约束：组合必要的能力
fn process<T extends Addable<T> + Comparable<T> + Cloneable<T>>(item: T) -> T {
    // 明确需要的能力
}
```

### 类型推断优化
```hulo
// ✅ 利用类型推断
fn createBox<T>(value: T) -> Box<T> {
    return Box($value)
}

let box = createBox(42) // 自动推断为 Box<num>

// ✅ 显式类型参数（当推断不准确时）
let box = createBox<num>(42) // 明确指定类型
```

### 泛型约束的渐进增强
```hulo
// 基础版本
fn process<T>(item: T) -> T {
    return $item
}

// 增强版本：添加约束
fn process<T extends Cloneable<T>>(item: T) -> T {
    return $item.clone()
}

// 进一步增强：更多约束
fn process<T extends Cloneable<T> + Comparable<T>>(item: T) -> T {
    let cloned = $item.clone()
    return $cloned > $item ? $cloned : $item
}
```