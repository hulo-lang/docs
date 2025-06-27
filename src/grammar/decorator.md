---
title: Decorator
icon: fas fa-magic
date: 2025-04-19
category: grammar
tag: 
    - decorator
    - annotation
    - macro
license: MIT
---

> `装饰器` 是 Hulo 语言中的一种**元编程机制**，用于在编译期或运行期修改类、函数、字段等程序元素的行为。装饰器通过 `@` 符号声明，可以添加元数据、修改行为、注入代码或进行编译期检查。它是构建框架、库和高级抽象的重要工具，提供了强大的代码生成和转换能力。

## 装饰器基础

装饰器是一种特殊的函数，它接受被装饰的目标作为参数，并返回修改后的目标或执行副作用。

### 基本语法

```hulo
// 装饰器函数定义
fn decorator(target: any) {
    // 装饰器逻辑
    return $target
}

// 使用装饰器
@decorator
class MyClass {
    // 类定义
}
```

### 装饰器工厂

装饰器工厂是返回装饰器函数的函数，允许传递参数：

```hulo
// 装饰器工厂
fn decoratorFactory(options: map<str, any>) {
    return (target: any) => {
        // 使用 options 参数
        echo "Decorating with options: $options"
        return $target
    }
}

// 使用装饰器工厂
@decoratorFactory({"name": "test", "version": "1.0"})
class TestClass {
    // 类定义
}
```

## 装饰器类型

### 类装饰器

类装饰器用于修改类的行为、添加元数据或生成代码：

```hulo
// 简单的类装饰器
fn logClass(target: Class<any>) {
    echo "Class ${target.name} is being decorated"
    return $target
}

// 添加静态方法的装饰器
fn addStaticMethod(methodName: str, method: Function) {
    return (target: Class<any>) => {
        $target[methodName] = $method
        return $target
    }
}

// 使用示例
@logClass
@addStaticMethod("create", () => new User())
class User {
    name: str
    age: num
    
    User($this.name, $this.age)
}

// 调用静态方法
let user = User::create()
```

### 方法装饰器

方法装饰器用于修改方法的行为、添加日志、缓存等功能：

```hulo
// 日志装饰器
fn log(target: any, propertyKey: str, descriptor: PropertyDescriptor) {
    let originalMethod = $descriptor.value
    
    $descriptor.value = (...args: any[]) => {
        echo "Calling ${$propertyKey} with args: $args"
        let result = $originalMethod.apply($target, $args)
        echo "Result: $result"
        return $result
    }
    
    return $descriptor
}

// 缓存装饰器
fn cache(target: any, propertyKey: str, descriptor: PropertyDescriptor) {
    let cache = new Map()
    let originalMethod = $descriptor.value
    
    $descriptor.value = (...args: any[]) => {
        let key = JSON.stringify($args)
        if ($cache.has($key)) {
            return $cache.get($key)
        }
        let result = $originalMethod.apply($target, $args)
        $cache.set($key, $result)
        return $result
    }
    
    return $descriptor
}

// 使用示例
class Calculator {
    @log
    @cache
    fn fibonacci(n: num): num {
        if n <= 1 return n
        return this.fibonacci(n - 1) + this.fibonacci(n - 2)
    }
}
```

### 字段装饰器

字段装饰器用于修改字段的访问行为、添加验证等：

```hulo
// 只读装饰器
fn readonly(target: any, propertyKey: str) {
    Object.defineProperty($target, $propertyKey, {
        writable: false,
        configurable: false
    })
}

// 验证装饰器
fn validate(validator: Function) {
    return (target: any, propertyKey: str) => {
        let value = $target[$propertyKey]
        if (!validator($value)) {
            throw Error("Validation failed for $propertyKey")
        }
    }
}

// 使用示例
class User {
    @readonly
    id: str
    
    @validate((age: num) => $age >= 0 && $age <= 150)
    age: num
    
    User($this.id, $this.age)
}
```

### 参数装饰器

参数装饰器用于修改函数参数的行为：

```hulo
// 必需参数装饰器
fn required(target: any, propertyKey: str, parameterIndex: num) {
    let requiredParams = $target.requiredParams || []
    ${requiredParams[parameterIndex]} = true
    $target.requiredParams = $requiredParams
}

// 使用示例
class API {
    fn getUser(@required id: str, name?: str) {
        // 函数实现
    }
}
```

## 内置装饰器

Hulo 提供了一系列内置装饰器，用于常见的编程场景：

### @deprecated

标记函数、类或字段为已弃用：

```hulo
@deprecated("Use newFunction instead")
fn oldFunction() {
    // 旧实现
}

@deprecated("This class will be removed in v2.0")
class OldClass {
    // 旧类实现
}
```

### @override

标记方法为重写父类方法：

```hulo
class Animal {
    fn speak() {
        echo "Animal sound"
    }
}

class Dog extends Animal {
    @override
    fn speak() {
        echo "Woof!"
    }
}
```

### @inline

提示编译器内联函数：

```hulo
@inline
fn add(a: num, b: num): num {
    return a + b
}
```



### @entry

指定程序入口点：

```hulo
@entry
fn main() {
    echo "Hello, Hulo!"
}
```

### @command

标记类为命令类型：

```hulo
@command
class GitCommand {
    // 命令实现
}
```

### @flag

定义命令标志：

```hulo
@flag(short: "v", long: "verbose")
verbose: bool

@flag(short: "o", long: "output", required: true)
output: str
```

## 装饰器组合

多个装饰器可以组合使用，执行顺序为从下到上：

```hulo
@decorator1
@decorator2
@decorator3
class MyClass {
    // 执行顺序：decorator3 -> decorator2 -> decorator1
}
```

### 装饰器工厂组合

```hulo
@decoratorFactory1({"option1": "value1"})
@decoratorFactory2({"option2": "value2"})
class CombinedClass {
    // 类定义
}
```

## 高级装饰器模式

### 装饰器链

```hulo
// 创建装饰器链
fn createDecoratorChain(...decorators: Function[]) {
    return (target: any) => {
        return $decorators.reduceRight((result, decorator) => {
            return $decorator($result)
        }, $target)
    }
}

// 使用装饰器链
@createDecoratorChain(
    logDecorator,
    cacheDecorator,
    validateDecorator
)
class AdvancedClass {
    // 类定义
}
```

### 条件装饰器

```hulo
// 条件装饰器
fn conditionalDecorator(condition: bool, decorator: Function) {
    return $condition ? $decorator : (target: any) => $target
}

// 使用示例
@conditionalDecorator($process.env.NODE_ENV === "development", $logDecorator)
class ProductionClass {
    // 只在开发环境添加日志
}
```

### 元装饰器

元装饰器是用于创建其他装饰器的装饰器：

```hulo
// 元装饰器：为装饰器添加错误处理
fn withErrorHandling(decorator: Function) {
    return (...args: any[]) => {
        try {
            return $decorator.apply(null, $args)
        } catch (error) {
            echo "Decorator error: $error"
            return $args[0] // 返回原始目标
        }
    }
}

// 使用元装饰器
@withErrorHandling
fn riskyDecorator(target: any) {
    // 可能出错的装饰器逻辑
    throw Error("Something went wrong")
}
```

## 装饰器最佳实践

### 命名约定

```hulo
// ✅ 好的命名：清晰表达用途
fn validateEmail(target: any, propertyKey: str) {
    // 验证邮箱格式
}

fn cacheResult(target: any, propertyKey: str, descriptor: PropertyDescriptor) {
    // 缓存结果
}

// ❌ 不好的命名：过于通用
fn decorator(target: any) {
    // 不清楚具体用途
}
```

### 错误处理

```hulo
// ✅ 好的错误处理
fn safeDecorator(target: any) {
    try {
        // 装饰器逻辑
        return $modifiedTarget
    } catch (error) {
        echo "Decorator failed: $error"
        return $target // 返回原始目标
    }
}
```

### 性能考虑

```hulo
// ✅ 好的性能实践：避免重复计算
let decoratorCache = new Map()

fn cachedDecorator(target: any) {
    let cacheKey = $target.constructor.name
    if ($decoratorCache.has($cacheKey)) {
        return $decoratorCache.get($cacheKey)
    }
    
    let result = expensiveDecoration($target)
    $decoratorCache.set($cacheKey, $result)
    return $result
}
```

### 文档化

```hulo
/**
 * 验证装饰器
 * @param validator 验证函数
 * @returns 装饰器函数
 */
fn validate(validator: Function) {
    return (target: any, propertyKey: str) => {
        // 验证逻辑
    }
}
```

## 装饰器与编译期

Hulo 的装饰器主要在编译期执行，这提供了强大的代码生成能力：

```hulo
// 编译期代码生成
fn generateAPI(target: Class<any>) {
    // 在编译期生成 API 代码
    let apiCode = generateAPICode($target)
    compileAndInclude($apiCode)
    return $target
}

@generateAPI
class UserAPI {
    // 编译期会自动生成相应的 API 代码
}
```

装饰器是 Hulo 语言中强大的元编程工具，通过合理使用装饰器，可以大大提升代码的可读性、可维护性和开发效率。