---
title: Statements
icon: fas fa-scroll
date: 2025-04-13
category: grammar
tag: 
    - stmt
license: MIT
---

## 注释

::: tip 
在 Hulo 中，注释在编译后会被保留，并转换为目标语言对应的注释格式。这对于保留文档信息、调试辅助或生成带注释的目标代码尤为有用。若你希望生成的代码更简洁，也可以通过设置 `disableComment = true` 来禁用注释输出。
:::

### 单行注释

单行注释使用 `//` 开头，适合添加简短说明：
```hulo
let x = 42  // 定义一个整数变量 x
```

### 多行注释

多行注释使用 `/** ... */` 包裹，可以书写更复杂、格式化的注解说明。适用于函数说明、配置说明、模块文档等场景：

```hulo
/**
 * 初始化程序
 * 这里进行环境配置和启动流程
 */
fn init() {
    // TODO: 实现细节
}
```

### 构建指令注释

Hulo 支持通过特殊格式的注释来传递构建指令，例如目标平台、编译选项等。这类注释以 `// @hulo-build` 开头，紧随其后的关键字和参数将被编译器解析，而非作为普通注释处理。
```hulo
// @hulo-build bash
```

上述语句指示 Hulo 编译器在当前文件中使用 Bash 为目标平台进行构建。这在需要跨平台支持时非常有用，允许你为不同平台编写差异化的逻辑或配置，而不影响主代码的结构。

在很多情况下，单纯指定目标平台并不足以满足更细粒度的控制需求。因此，Hulo 还支持在构建指令中附加参数，以实现更灵活的构建行为：
```hulo
// @hulo-build bash@4.0 --path /bin/bash
```

在上面的例子中，`bash@4.0` 指定了目标平台及其版本，而 `--path /bin/bash` 则作为构建参数传递给后端工具，用于调整生成逻辑或路径配置。这种方式可用于平台差异适配、多版本支持、插件切换等高级用法。


## 作用域

### let

* 作用域范围：仅在声明所在的 `{}` 块内有效
* 重新赋值：允许
* 重复声明：禁止（同作用域内）
```hulo
{
  let a = 10
  echo $a // 
  $a = 20
}

echo $a // null
```

### var

* 作用域范围：跨所有代码块，直到文件/函数结束
* 重新赋值：允许
* 重复声明：允许（会覆盖前值）
```hulo
{
  var a = 10
  echo $a // 10
  $a = 20
}

echo $a // 20
```

### const

* 作用域范围：同 `let`，仅在声明块内有效
* 重新赋值：禁止
* 重复声明：禁止
```hulo
{
  const a = 10
  echo $a // 10
  $a = 20 // 错误
}

echo $a // null
```

## type

::: tip
在 Hulo 中的类型系统类似于 `Typescript`，引入这套系统主要是为了实现对命令的抽象。除了 `type` 关键字外，`use` 关键字也支持相应的类型系统。关于 `use` 的详解，我们会在命令章节娓娓道来。
:::

### 类型别名
```hulo
type int = num
type float = num

let i: int = 1
const PI: float = 3.14
```

### 联合类型
```hulo
type A = num | str | bool
type B = num & str

type Protocal = 'tcp' | 'udp'

type User = { name: str, age: num }

type Function<T, R> = (arg: T) => R;

// 继承接口
type Releaser = { Package.install, Package.init  }
```

### 复合类型基础

**never**
`never` 是类型系统中的一个特殊类型，表示**永远不可达的值或永不返回的操作**。

* 在类型运算中排除某些情况
```hulo
type NonNull<T> = T extends null ? never : T
```

* 表示不可能的分支
```hulo
type Shape = Circle | Square
fn getArea(s: Shape): num {
    if (s is Circle) {
        return s.radius * s.radius * 3.14
    } else if (s is Square) {
        return s.size * s.size
    } else {
        // 这里s的类型是never
        // 表示所有可能情况都已处理
    }
}
```

**[key in T]**

遍历 `T` 本身（需 `T` 是联合类型），生成键名来自 `T` 成员的新类型。

```hulo
type Protocal = 'udp' | 'tcp'
```
对于 `Protocal` 的遍历将依次得到 `udp`、`tcp` 的键名：
```hulo
type ProtocalNo = {
  [K in Protocal]: num
}
/* 结果：
type ProtocalNo {
  udp: num
  tcp: num
}
*/
```

**[key in keyof T]**

遍历类型 `T` 的所有**属性名（键）**，生成新的映射类型。

```hulo
class User {
  name: str
  age: num
}
```
对于 `User` 类型，遍历的所有属性名为 `name`、 `age`
```hulo
type UserClone<T extends User> = {
  [K in keyof T]: T[K]
}
/* 结果：
type UserClone {
  name: str
  age: num
}
*/
```

**T[K]**

通过键名 `K` 获取类型 `T` 中对应属性的类型。

```hulo
type User = {
  name: str
  age: num
}

type NameType = User["name"]  // str

type AgeType = User["age"]   // num
```
::: tip
* `K` 必须是 `T` 的已知键名（或联合键名）
* 支持嵌套访问（如 `T["a"]["b"]`）
:::

**extends**

用于对类型进行条件限制或继承。

* 泛型约束
```hulo
// 确保 T 必须包含 id 属性
type WithId<T extends { id: str }> = T

// 合法
type Valid = WithId<{ id: "123", name: str }>

// 非法（缺少 id）
type Invalid = WithId<{ name: str }>
```

* 条件判断
```hulo
// 若 T 是 num 则返回 str，否则返回 bool
type TypeCheck<T> = T extends num ? str : bool

type A = TypeCheck<10>     // str
type B = TypeCheck<"hello"> // bool
```

::: tip
在 Hulo 中 `extends` 关键字还用于类的继承
:::

### ValueOf

**类型签名：**
```hulo
type ValueOf<T> = T[keyof T]
```

**示例：**
```hulo
class Foo {
  a: num
  b: str
}

type FooValues = ValueOf<Foo> // num | str
```

### Readonly

将 `T` 的所有属性变为只读。

**类型签名：**

```hulo
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

**示例：**
```hulo
class Config {
  timeout: num
}
type ImmutableConfig = Readonly<Config>  // { readonly timeout: num }
```

### Partial

`Partial<T>` 是一个**实用工具类型**，用于将类型 `T` 的所有属性变为**可选属性**。它特别适用于需要处理对象部分更新的场景。

**类型签名：**
```hulo
type Partial<T> = {
  [P in keyof T]?: T[p] // 将 T 的每个属性 P 标记为可选
}
```

**示例：**
```hulo
class User {
  name: str
  age: num
}

type PartialUser = Partial<User> // { name?: str, age?: num }
```

### Pick

从类型 `T` 中选取一组属性 `K` 组成新类型。

**类型签名：**
```hulo
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

**示例：**
```hulo
class User {
  id: str
  name: str
  age: num
  email: str
}

type UserBasicInfo = Pick<User, "id" | "name">
/* 结果：
type UserBasicInfo = {
  id: str
  name: str
}
*/
```

### Exclude

从类型 `T` 中排除可赋值给 `U` 的类型。

**类型签名：**
```hulo
type Exclude<T, U> = T extends U ? never : T
```

**示例：**
```hulo
type Allowed = num | str | bool
type NoStrings = Exclude<Allowed, str>  // num | bool
```

### Omit

从类型 `T` 中排除一组属性 `K` 组成新类型。

**类型签名：**
```hulo
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

**示例：**
```hulo
// 排除敏感字段
type SafeUser = Omit<User, "email" | "id">
/* 结果：
type SafeUser = {
  name: str
  age: num
}
*/
```

### If

在类型系统中实现条件逻辑，类似于三元表达式，但作用于类型层面。

**类型签名：**
```hulo
type If<Condition, Then, Else> = Condition extends true ? Then : Else
```

**示例：**
```hulo
type IsNumber<T> = T extends num ? true : false
type Result = If<IsNumber<str>, "Yes", "No">  // "No"

type Status = "success" | "error"
type Message<T> = If<
  T extends "success", 
  { code: 200 }, 
  { code: 500 }
>

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

### Merge

合并两个类型 `T` 和 `U` 的属性，`U` 的同名属性会覆盖 `T`。

**类型签名：**
```hulo
type Merge<T, U> = {
  [K in keyof T | keyof U]:
    K extends keyof U ? U[K] :
    K extends keyof T ? T[K] :
    never
}
```

**示例：**
```hulo
type A = { name: str; age: num }
type B = { age: str; email: str }

type C = Merge<A, B>
/* 结果：
{
  name: str
  age: str  // 被 B 覆盖
  email: str
}
*/
```

### Diff

找出 `T` 中存在但 `U` 中不存在的属性。

**类型签名：**
```hulo
type Diff<T, U> = {
  [K in Exclude<keyof T, keyof U>]: T[K]
}
```

**示例：**
```hulo
type User = { id: str; name: str; age: num }
type UpdatedUser = { id: str; name: str }

type ChangedFields = Diff<User, UpdatedUser>
/* 结果：
{
  age: num  // 只有 User 有
}
*/
```

### Mutable

将类型 `T` 的所有 `readonly` 属性变为可变属性，移除所有属性的只读修饰符。

**类型签名：**
```hulo
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

**示例：**
```hulo
class ImmutableConfig {
  readonly timeout: num
  readonly retries: num
}

type EditableConfig = Mutable<ImmutableConfig>
/* 结果：
{
  timeout: num
  retries: num
}
*/
```

### NonNullable
```hulo

```

### Exclude

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

### extends