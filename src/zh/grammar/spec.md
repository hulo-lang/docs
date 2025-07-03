---
title: 编码规范
icon: fas fa-file-alt
date: 2025-04-13
category: grammar
tag: 
    - spec
    - naming
    - convention
license: MIT
---

> `编码规范` 是 Hulo 语言中用于**统一代码风格和命名约定**的重要指导原则，包括变量命名、函数命名、类型命名、命令命名等各个方面。通过遵循一致的编码规范，开发者可以编写出更加清晰、可读、可维护的代码。Hulo 提供了灵活的命名规则，支持多种命名风格，为构建高质量的项目提供了坚实的基础。

## 通用命名规则

### 基本原则

* 变量名必须使用小写字母开头，并遵循 `snake_case` 风格
* 避免使用单字母变量名（除非是循环变量 `i`, `j`, `k`）
* 不要使用缩写，除非是广泛接受的缩写（如 `id`, `url`, `cpu`）
* 命名应当具有描述性，能够清晰表达其用途和含义

### 布尔变量命名

布尔变量尽量使用 `is_` / `has_` / `can_` 开头，以明确表达其布尔性质：

```hulo
let is_enabled: bool = true
let has_access: bool = false
let can_execute: bool = true
let is_authenticated: bool = false
let has_permission: bool = true
```

### 计数器变量命名

计数器变量以 `_count` 结尾，明确表示其计数功能：

```hulo
let user_count: num = 100
let retry_count: num = 3
let connection_count: num = 0
let error_count: num = 0
```

### 集合变量命名

集合类型变量使用复数形式，明确表示其包含多个元素：

```hulo
let users: list<User> = []
let permissions: set<str> = {"read", "write", "execute"}
let configs: map<str, any> = {"host": "localhost", "port": 8080}
```

## 常量命名规则

### 基本常量

使用 `UPPER_CASE_SNAKE_CASE` 风格，全大写字母配合下划线分隔：

```hulo
const MAX_RETRY: num = 5
const DEFAULT_TIMEOUT: num = 30
const PI: num = 3.141592653
const API_BASE_URL: str = "https://api.example.com"
const MAX_CONNECTIONS: num = 100
```

### 配置常量

配置相关的常量可以添加 `CONFIG_` 前缀：

```hulo
const CONFIG_DATABASE_HOST: str = "localhost"
const CONFIG_DATABASE_PORT: num = 5432
const CONFIG_LOG_LEVEL: str = "info"
```

## 函数与方法命名

### 基本规则

使用 `snake_case` 风格，动词开头，清晰表达函数的功能：

```hulo
fn get_user_name(user_id: num) -> str
fn send_request(url: str) -> response
fn validate_email(email: str) -> bool
fn calculate_total_price(items: list<Item>) -> num
fn process_user_data(user: User) -> bool
```

### Getter 和 Setter 方法

使用 `get` 和 `set` 关键字定义 getter 和 setter：

```hulo
class User {
    name: str
    age: num
    
    get name() -> str => $this.name
    set name(value: str) => $this.name = $value
    
    get age() -> num => $this.age
    set age(value: num) => $this.age = $value
}

// 或者使用函数形式
fn get_username() -> str
fn set_username(new_name: str)
fn get_user_age() -> num
fn set_user_age(age: num)
```

### 布尔函数命名

返回布尔值的函数使用 `is_` / `has_` / `can_` 前缀：

```hulo
fn is_valid_email(email: str) -> bool
fn has_permission(user: User, action: str) -> bool
fn can_access_resource(user: User, resource: str) -> bool
```

### 异步函数命名

异步函数可以添加 `async_` 前缀或使用 `_async` 后缀：

```hulo
fn async_fetch_data(url: str) -> Promise<Data>
fn send_email_async(recipient: str, content: str) -> Promise<bool>
```

## 命令命名规范

### 基本命令命名

命令名通常使用小写字母，支持多种命名风格：

```hulo
// 传统小写风格
cmd mycommand {
    cmd init {}
    cmd stop {}
}

// 带连字符风格（推荐）
cmd my-command {
    cmd init {}
    cmd stop {}
}

// 多词命令
cmd user-management {
    cmd create-user {}
    cmd delete-user {}
    cmd update-user {}
}
```

### PowerShell 风格命令

支持 PowerShell 风格的 `Verb-Noun` 命名约定：

```hulo
cmd Invoke-Process {
    cmd Start-Process {}
    cmd Stop-Process {}
    cmd Get-Process {}
}

cmd Get-User {
    cmd Get-UserInfo {}
    cmd Get-UserPermissions {}
}

cmd Set-Configuration {
    cmd Set-DatabaseConfig {}
    cmd Set-ApplicationConfig {}
}
```

### 命令参数命名

命令参数也遵循一致的命名规范：

```hulo
cmd deploy-application {
    // 使用连字符分隔的参数名
    environment: str
    version: str
    force-deploy: bool
    
    cmd deploy() {
        echo "Deploying to $environment with version $version"
    }
}

cmd Invoke-RestAPI {
    // PowerShell 风格的参数
    endpoint: str
    method: str
    request-body: str
    
    cmd Invoke() {
        echo "Calling $method $endpoint"
    }
}
```

### 命令别名

可以为命令创建别名，支持不同的调用方式：

```hulo
cmd my-command {
    alias: ["mc", "mycmd"]
    
    cmd init {}
    cmd stop {}
}

// 使用方式
my-command init
mc init
mycmd init
```

## 类型命名规范

### 类命名

类名使用 `PascalCase`，字段使用 `snake_case`：

```hulo
class UserProfile {
    username: str
    email: str
    age: num
    is_active: bool
    created_at: str
}

class DatabaseConnection {
    host: str
    port: num
    username: str
    password: str
    max_connections: num
}
```

### 内置类型

内置的基础类型统一使用小写：

```hulo
let name: str = "Alice"
let age: num = 25
let scores: list<num> = [85, 90, 78]
let config: map<str, any> = {"debug": true}
let flag: bool = true
```

### 类型别名

类型别名使用 `PascalCase`：

```hulo
type UserId = str
type EmailAddress = str
type DatabaseConfig = {
    host: str
    port: num
    credentials: map<str, str>
}
```

## 枚举命名规范

### 枚举类型

枚举类型使用 `PascalCase`，枚举项使用 `SCREAMING_SNAKE_CASE`：

```hulo
enum UserRole {
    ADMIN
    EDITOR
    VIEWER
    GUEST
}

enum HttpStatus {
    OK
    CREATED
    BAD_REQUEST
    UNAUTHORIZED
    NOT_FOUND
    INTERNAL_SERVER_ERROR
}
```

### 关联值枚举

带关联值的枚举项也遵循相同的命名规范：

```hulo
enum NetworkProtocol {
    TCP(port: num)
    UDP(port: num)
    HTTP(port: num, secure: bool)
}
```

## 模块与包命名

### 模块命名

模块名使用 `snake_case`：

```hulo
mod user_management {
    pub fn create_user() {}
    pub fn delete_user() {}
}

mod database_utils {
    pub fn connect() {}
    pub fn disconnect() {}
}
```

### 包命名

包名使用小写字母，可以包含连字符：

```hulo
// 包名示例
my-application
user-management-system
api-client
database-connector
```

## 文件命名规范

### 源文件

源文件使用连字符分隔（kebab-case），以 `.hl` 扩展名结尾：

```hulo
user-service.hl
database-connection.hl
api-client.hl
config-manager.hl
http-client.hl
request-handler.hl
response-parser.hl
```

### 模块文件

模块入口文件统一命名为 `mod.hl`，其他文件使用连字符分隔：

```hulo
src/
├── mod.hl                    // 主模块入口
├── user-management/
│   ├── mod.hl               // 用户管理模块入口
│   ├── user-service.hl      // 用户服务
│   ├── user-model.hl        // 用户模型
│   └── user-validation.hl   // 用户验证
├── database-connection/
│   ├── mod.hl               // 数据库连接模块入口
│   ├── connection-pool.hl   // 连接池
│   ├── query-builder.hl     // 查询构建器
│   └── transaction-manager.hl // 事务管理器
└── api-client/
    ├── mod.hl               // API客户端模块入口
    ├── http-client.hl       // HTTP客户端
    ├── request-handler.hl   // 请求处理器
    └── response-parser.hl   // 响应解析器
```

## 注释规范

### 单行注释

单行注释使用 `//`，简洁明了：

```hulo
let user_count: num = 100  // 当前用户总数
fn validate_email(email: str) -> bool {
    // 检查邮箱格式是否有效
    return $email.contains("@")
}
```

### 多行注释

复杂注释使用 `/** ... */` 格式：

```hulo
/**
 * 用户认证服务
 * 提供用户登录、注册、权限验证等功能
 * 
 * @param username 用户名
 * @param password 密码
 * @returns 认证结果
 */
fn authenticate_user(username: str, password: str) -> AuthResult {
    // 实现逻辑
}
```

### 构建指令注释

构建指令使用特殊格式：

```hulo
// @hulo-build bash@4.0 --path /bin/bash
// @hulo-build powershell --version 7.0
```

## 代码格式规范

### 缩进

使用 4 个空格进行缩进，不使用制表符：

```hulo
fn process_data(data: str) -> bool {
    if $data.len() > 0 {
        let result = validate_data($data)
        if $result {
            return true
        }
    }
    return false
}
```

### 空行使用

在逻辑块之间添加空行，提高可读性：

```hulo
fn calculate_statistics(numbers: list<num>) -> (num, num, num) {
    let sum = 0
    let count = $numbers.len()
    
    // 计算总和
    loop num in $numbers {
        $sum += $num
    }
    
    // 计算平均值
    let average = $count > 0 ? $sum / $count : 0
    
    return ($sum, $count, $average)
}
```

### 行长度

每行代码不超过 120 个字符，过长时进行换行：

```hulo
fn create_user_with_extended_profile(
    username: str,
    email: str,
    age: num,
    profile_data: map<str, any>
) -> User {
    // 实现逻辑
}
```

## 命名禁忌

### 避免使用的命名

🚫 **不要使用以下命名方式：**

* 无意义的变量名：`x`, `y`, `data`, `temp`, `obj`
* 魔法数字：直接使用 `3.14`，应使用 `PI` 常量
* 拼音或非英语变量名（除非特殊场景）
* 缩写过多的变量名：`usrCfg` 应该用 `user_config`
* 与关键字冲突的变量名：`fn`, `let`, `const`, `class`
* 过于宽泛的命名：`data`, `info`, `result`（应更具体）

### 推荐的命名方式

✅ **推荐使用以下命名方式：**

```hulo
// 具体而有意义的变量名
let user_profile: UserProfile
let database_connection: DatabaseConnection
let authentication_result: AuthResult

// 清晰的函数名
fn validate_user_credentials(username: str, password: str) -> bool
fn calculate_monthly_revenue(year: num, month: num) -> num

// 描述性的常量名
const MAX_CONCURRENT_CONNECTIONS: num = 100
const DEFAULT_SESSION_TIMEOUT: num = 3600
```

## 完整示例

```hulo
const DEFAULT_RETRIES: num = 3
const MAX_CONNECTIONS: num = 100

class DatabaseConfig {
    host: str
    port: num
    username: str
    password: str
    max_connections: num
    connection_timeout: num
}

enum UserRole {
    ADMIN
    EDITOR
    VIEWER
    GUEST
}

fn connect_to_database(config: DatabaseConfig) -> bool {
    if $config.max_connections > $MAX_CONNECTIONS {
        return false
    }
    return true
}

fn get_user_role(user_id: num) -> UserRole {
    // 根据用户ID获取角色
    return UserRole::ADMIN
}

cmd user-management {
    cmd create-user {
        username: str
        email: str
        role: UserRole
    }
    
    cmd delete-user {
        user-id: num
        force-delete: bool
    }
}

cmd Invoke-Process {
    cmd Start-Process {
        process-name: str
        arguments: list<str>
    }
    
    cmd Stop-Process {
        process-id: num
        force-stop: bool
    }
}
```