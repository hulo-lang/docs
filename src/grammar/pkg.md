---
title: Package
icon: fas fa-box
date: 2025-04-13
category: grammar
tag: 
    - pub
    - import
    - mod
license: MIT
---

> `包管理` 是 Hulo 语言中用于**组织和管理代码结构**的核心机制，包括模块系统、导入导出、可见性控制等。通过包管理，开发者可以将代码分解为逻辑相关的单元，实现代码的模块化、复用和维护。Hulo 提供了灵活的导入导出语法、多层次的可见性控制以及强大的模块组合能力，为构建大型项目提供了坚实的基础。

## 代码可见性

在 Hulo 中，模块成员的默认可见性是私有的。你需要使用 `pub` 关键字将模块、函数、变量等标记为公开成员，以便其他模块能够访问它们。

### 可见性修饰符

```hulo
// 私有成员（默认）
const PI = 3.14
fn internal_function() {
    echo "This is private"
}

// 公开成员
pub const PUBLIC_PI = 3.14159
pub fn public_function() {
    echo "This is public"
}

// 公开类型
pub class User {
    pub name: str
    age: num  // 私有字段
    
    pub fn getName() -> str => $this.name
    fn getAge() -> num => $this.age  // 私有方法
}
```

### 可见性规则

```hulo
// 在同一个模块内，所有成员都可以访问
fn test_visibility() {
    echo $PI              // 可以访问私有常量
    internal_function()   // 可以调用私有函数
    public_function()     // 可以调用公开函数
}

// 在其他模块中，只能访问公开成员
import { public_function, PUBLIC_PI } from "./myModule"
// internal_function()  // 错误：无法访问私有函数
```

## 包结构

Hulo 的包结构基于文件系统，支持层次化的模块组织。假设我们有如下项目结构：

```
myproject/
├── main.hl
├── pkg.hl
├── utils/
│   ├── mod.hl
│   ├── string.hl
│   └── math.hl
├── models/
│   ├── mod.hl
│   ├── user.hl
│   └── product.hl
└── services/
    ├── mod.hl
    ├── auth.hl
    └── database.hl
```

### 模块文件命名

- **主模块文件**：`mod.hl`（模块入口）
- **功能文件**：`function.hl`、`class.hl` 等
- **入口文件**：`main.hl`（程序入口）

## 导入系统

Hulo 提供了多种导入方式，满足不同的使用场景。

### 直接执行模块

适用于只想执行模块中的副作用（比如注册全局变量、初始化逻辑）。

```hulo
// 执行模块，不导入任何成员
import "./setup"
import "./config/init"
import "../shared/globals"
```

### 命名导入

从模块中导入特定的成员，支持解构语法和别名。

```hulo
// 基础命名导入
import { add, multiply, PI } from "./math"

// 使用导入的成员
let result = add(5, 3)
let area = multiply(PI, 10)
```

#### 重命名导入（别名）

```hulo
// 单个成员重命名
import { add as mathAdd, multiply as mathMul } from "./math"

// 使用别名
let sum = mathAdd(1, 2)
let product = mathMul(3, 4)

// 避免命名冲突
import { User as UserModel } from "./models/user"
import { User as UserService } from "./services/user"
```

#### 导入所有导出

```hulo
// 不带命名空间
import * from "./math"
add(1, 2)      // 直接使用
multiply(3, 4) // 直接使用

// 带命名空间
import * as Math from "./math"
Math.add(1, 2)
Math.multiply(3, 4)

// 混合导入
import { add, multiply }, * as MathUtils from "./math"
add(1, 2)           // 直接使用
MathUtils.PI        // 通过命名空间使用
```

### 路径导入

Hulo 支持多种路径导入方式，包括相对路径和绝对路径。

#### 相对路径

```hulo
// 当前目录
import { func } from "./module"

// 上级目录
import { util } from "../utils"

// 多级相对路径
import { config } from "../../config"

// 同级目录
import { helper } from "./helpers/string"
```

#### 绝对路径

```hulo
// 从项目根目录开始
import { User } from "/models/user"

// 从包根目录开始
import { Database } from "/services/database"
```

### 条件导入

根据编译时条件选择不同的模块。

```hulo
// 根据平台导入
import { 
    if $os == "windows" then "./windows/utils" 
    else "./unix/utils" 
} as PlatformUtils

// 根据环境导入
import {
    if $env == "development" then "./dev/config"
    else if $env == "production" then "./prod/config"
    else "./test/config"
} as Config
```

### 导入最佳实践

```hulo
// ✅ 推荐：明确导入需要的成员
import { add, subtract, PI } from "./math"

// ❌ 不推荐：导入所有成员
import * from "./math"

// ✅ 推荐：使用有意义的别名
import { User as UserModel } from "./models/user"

// ✅ 推荐：按功能分组导入
import { add, subtract } from "./math"
import { format, parse } from "./string"
import { User, Product } from "./models"
```

## 导出系统

Hulo 提供了灵活的导出机制，支持多种导出方式。

### 显式导出

```hulo
// 导出常量
pub const VERSION = "1.0.0"
pub const API_BASE = "https://api.example.com"

// 导出函数
pub fn greet(name: str) -> str {
    return "Hello, $name!"
}

pub fn calculate(a: num, b: num) -> num {
    return $a + $b
}

// 导出类
pub class Calculator {
    pub fn add(a: num, b: num) -> num {
        return $a + $b
    }
    
    pub fn multiply(a: num, b: num) -> num {
        return $a * $b
    }
}
```

### 重新导出

```hulo
// 重新导出其他模块的成员
pub use { add, subtract } from "./math"
pub use { format, parse } from "./string"

// 重新导出并重命名
pub use { User as UserModel } from "./models/user"
pub use { Database as DB } from "./services/database"

// 重新导出所有成员
pub use * from "./utils"
```

### 选择性导出

```hulo
// 在 mod.hl 中选择性导出
pub use { add, multiply } from "./math"
pub use { User, Product } from "./models"
pub use { Database } from "./services"

// 隐藏内部实现
// 不导出 internal_helper 函数
fn internal_helper() {
    // 内部实现
}
```

## 模块系统

在 Hulo 中，**模块**是组织代码的一种方式，本质上是**命名空间的别名**。它可以将外部的变量、函数、常量等统一包装，避免命名冲突，并提升代码的可读性与可维护性。

### 声明模块

```hulo
mod math {
    const PI = 3.14159
    
    pub fn add(a: num, b: num) -> num {
        return $a + $b
    }
    
    pub fn subtract(a: num, b: num) -> num {
        return $a - $b
    }
    
    fn internal_helper() -> num {
        return 42
    }
}
```

### 访问模块成员

```hulo
// 访问公开成员
let result = math::add(5, 3)
let difference = math::subtract(10, 4)

// 访问私有成员（仅在模块内部）
// math::internal_helper()  // 错误：无法访问私有成员
```

### 模块嵌套

```hulo
mod geometry {
    pub mod circle {
        pub const PI = 3.14159
        
        pub fn area(radius: num) -> num {
            return PI * $radius * $radius
        }
        
        pub fn circumference(radius: num) -> num {
            return 2 * PI * $radius
        }
    }
    
    pub mod rectangle {
        pub fn area(width: num, height: num) -> num {
            return $width * $height
        }
        
        pub fn perimeter(width: num, height: num) -> num {
            return 2 * ($width + $height)
        }
    }
}

// 访问嵌套模块
let circleArea = geometry::circle::area(5)
let rectArea = geometry::rectangle::area(4, 6)
```

### 模块可见性

```hulo
// 私有模块（默认）
mod internal {
    pub fn helper() {
        echo "Internal helper"
    }
}

// 公开模块
pub mod public {
    pub fn api() {
        echo "Public API"
    }
}

// 访问模块
internal::helper()  // 仅在当前文件中可访问
public::api()       // 可在其他模块中访问
```

### 引入外部成员

```hulo
// 在模块中使用外部成员
const GLOBAL_CONFIG = "production"

pub fn public_function() -> str {
    return "public"
}

mod utils {
    use GLOBAL_CONFIG
    use public_function
    
    pub fn process() {
        echo "Config: $GLOBAL_CONFIG"
        echo "Function: ${public_function()}"
    }
}
```

### 模块组合

```hulo
// 组合多个模块
mod math {
    pub fn add(a: num, b: num) -> num => $a + $b
    pub fn subtract(a: num, b: num) -> num => $a - $b
}

mod string {
    pub fn concat(a: str, b: str) -> str => $a + $b
    pub fn uppercase(s: str) -> str => $s.toUpper()
}

mod utils {
    use { add, subtract } from math
    use { concat, uppercase } from string
    
    pub fn process(data: str, count: num) -> str {
        let result = concat($data, " processed")
        let final = uppercase($result)
        return $final
    }
}
```

## 包管理最佳实践

### 文件组织

```hulo
// ✅ 推荐的文件结构
project/
├── main.hl              // 程序入口
├── mod.hl               // 主模块
├── config/
│   ├── mod.hl
│   ├── database.hl
│   └── app.hl
├── models/
│   ├── mod.hl
│   ├── user.hl
│   └── product.hl
├── services/
│   ├── mod.hl
│   ├── auth.hl
│   └── api.hl
└── utils/
    ├── mod.hl
    ├── string.hl
    └── math.hl
```

### 模块设计原则

```hulo
// ✅ 单一职责原则
mod math {
    // 只包含数学相关功能
    pub fn add(a: num, b: num) -> num => $a + $b
    pub fn multiply(a: num, b: num) -> num => $a * $b
}

mod string {
    // 只包含字符串处理功能
    pub fn format(template: str, ...args: any) -> str => {
        // 格式化逻辑
    }
}

// ✅ 最小化公开接口
mod database {
    // 只公开必要的接口
    pub fn connect(config: DatabaseConfig) -> Connection
    pub fn query(sql: str) -> Result
    
    // 内部实现细节保持私有
    fn validateConfig(config: DatabaseConfig) -> bool
    fn createPool(config: DatabaseConfig) -> Pool
}
```

### 导入导出策略

```hulo
// ✅ 推荐：在 mod.hl 中统一管理导出
// mod.hl
pub use { add, subtract, multiply } from "./math"
pub use { format, parse, validate } from "./string"
pub use { User, Product, Order } from "./models"

// ✅ 推荐：使用有意义的模块名
import { Database } from "./services/database"
import { AuthService } from "./services/auth"
import { UserModel } from "./models/user"

// ❌ 不推荐：导入所有成员
import * from "./utils"

// ✅ 推荐：明确导入需要的成员
import { format, parse } from "./utils"
```

### 可见性控制

```hulo
// ✅ 推荐：合理使用可见性修饰符
pub mod api {
    // 公开的 API 接口
    pub fn getUser(id: num) -> User
    pub fn createUser(user: User) -> Result
    
    // 内部实现细节
    fn validateUser(user: User) -> bool
    fn sanitizeInput(input: str) -> str
}

// ✅ 推荐：使用 pub use 重新导出
pub mod models {
    pub use { User, Product } from "./user"
    pub use { Order, Payment } from "./order"
}
```

### 错误处理

```hulo
// ✅ 推荐：统一的错误处理
pub mod errors {
    pub class ValidationError {
        pub field: str
        pub message: str
        
        ValidationError($this.field, $this.message)
    }
    
    pub class DatabaseError {
        pub code: num
        pub message: str
        
        DatabaseError($this.code, $this.message)
    }
}

// 在其他模块中使用
import { ValidationError, DatabaseError } from "./errors"

fn processUser(user: User) {
    if !validateUser($user) {
        throw ValidationError("user", "Invalid user data")
    }
}
```

## 高级特性

### 动态导入

```hulo
// 运行时动态导入
fn loadModule(path: str) {
    let module = import($path)
    return $module
}

// 条件动态导入
fn getService(serviceType: str) {
    match $serviceType {
        "database" => return import("./services/database"),
        "cache" => return import("./services/cache"),
        "api" => return import("./services/api"),
        _ => throw Error("Unknown service type")
    }
}
```

### 模块别名

```hulo
// 为模块创建别名
mod MathUtils = math
mod StringUtils = string

// 使用别名
let result = MathUtils::add(1, 2)
let formatted = StringUtils::format("Hello {}", "World")
```

### 循环依赖处理

```hulo
// 使用延迟导入处理循环依赖
mod user {
    pub fn createUser(name: str) -> User {
        // 延迟导入，避免循环依赖
        let validation = import("./validation")
        return validation::validateAndCreate($name)
    }
}

mod validation {
    pub fn validateAndCreate(name: str) -> User {
        let user = import("./user")
        return user::User($name)
    }
}
```