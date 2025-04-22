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

## type

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
type IsString<T> = T is str ? "yes" : "no"

type A = IsString<str> // "yes"
type B = IsString<num> // "no"

type TypeChecker<T> = 
    T is str ? "string" :
    T is num ? "number" :
    T is bool ? "boolean" :
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
