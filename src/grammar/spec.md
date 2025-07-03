---
title: Specification
icon: fas fa-file-alt
date: 2025-04-13
category: grammar
tag: 
    - spec
    - naming
    - convention
license: MIT
---

> `Coding Standards` are important guidelines in the Hulo language for **unifying code style and naming conventions**, including variable naming, function naming, type naming, command naming, and other aspects. By following consistent coding standards, developers can write clearer, more readable, and maintainable code. Hulo provides flexible naming rules that support multiple naming styles, providing a solid foundation for building high-quality projects.

## General Naming Rules

### Basic Principles

* Variable names must start with lowercase letters and follow `snake_case` style
* Avoid using single-letter variable names (except for loop variables `i`, `j`, `k`)
* Do not use abbreviations unless they are widely accepted (such as `id`, `url`, `cpu`)
* Names should be descriptive and clearly express their purpose and meaning

### Boolean Variable Naming

Boolean variables should use `is_` / `has_` / `can_` prefixes to clearly express their boolean nature:

```hulo
let is_enabled: bool = true
let has_access: bool = false
let can_execute: bool = true
let is_authenticated: bool = false
let has_permission: bool = true
```

### Counter Variable Naming

Counter variables end with `_count` to clearly indicate their counting function:

```hulo
let user_count: num = 100
let retry_count: num = 3
let connection_count: num = 0
let error_count: num = 0
```

### Collection Variable Naming

Collection type variables use plural forms to clearly indicate they contain multiple elements:

```hulo
let users: list<User> = []
let permissions: set<str> = {"read", "write", "execute"}
let configs: map<str, any> = {"host": "localhost", "port": 8080}
```

## Constant Naming Rules

### Basic Constants

Use `UPPER_CASE_SNAKE_CASE` style with all uppercase letters separated by underscores:

```hulo
const MAX_RETRY: num = 5
const DEFAULT_TIMEOUT: num = 30
const PI: num = 3.141592653
const API_BASE_URL: str = "https://api.example.com"
const MAX_CONNECTIONS: num = 100
```

### Configuration Constants

Configuration-related constants can add `CONFIG_` prefix:

```hulo
const CONFIG_DATABASE_HOST: str = "localhost"
const CONFIG_DATABASE_PORT: num = 5432
const CONFIG_LOG_LEVEL: str = "info"
```

## Function and Method Naming

### Basic Rules

Use `snake_case` style, start with verbs, and clearly express the function's purpose:

```hulo
fn get_user_name(user_id: num) -> str
fn send_request(url: str) -> response
fn validate_email(email: str) -> bool
fn calculate_total_price(items: list<Item>) -> num
fn process_user_data(user: User) -> bool
```

### Getter and Setter Methods

Use `get` and `set` keywords to define getters and setters:

```hulo
class User {
    name: str
    age: num
    
    get name() -> str => $this.name
    set name(value: str) => $this.name = $value
    
    get age() -> num => $this.age
    set age(value: num) => $this.age = $value
}

// Or use function form
fn get_username() -> str
fn set_username(new_name: str)
fn get_user_age() -> num
fn set_user_age(age: num)
```

### Boolean Function Naming

Functions returning boolean values use `is_` / `has_` / `can_` prefixes:

```hulo
fn is_valid_email(email: str) -> bool
fn has_permission(user: User, action: str) -> bool
fn can_access_resource(user: User, resource: str) -> bool
```

### Async Function Naming

Async functions can add `async_` prefix or use `_async` suffix:

```hulo
fn async_fetch_data(url: str) -> Promise<Data>
fn send_email_async(recipient: str, content: str) -> Promise<bool>
```

## Command Naming Standards

### Basic Command Naming

Command names typically use lowercase letters and support multiple naming styles:

```hulo
// Traditional lowercase style
cmd mycommand {
    cmd init {}
    cmd stop {}
}

// Hyphenated style (recommended)
cmd my-command {
    cmd init {}
    cmd stop {}
}

// Multi-word commands
cmd user-management {
    cmd create-user {}
    cmd delete-user {}
    cmd update-user {}
}
```

### PowerShell Style Commands

Support PowerShell-style `Verb-Noun` naming conventions:

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

### Command Parameter Naming

Command parameters also follow consistent naming conventions:

```hulo
cmd deploy-application {
    // Use hyphenated parameter names
    environment: str
    version: str
    force-deploy: bool
    
    cmd deploy() {
        echo "Deploying to $environment with version $version"
    }
}

cmd Invoke-RestAPI {
    // PowerShell-style parameters
    endpoint: str
    method: str
    request-body: str
    
    cmd Invoke() {
        echo "Calling $method $endpoint"
    }
}
```

### Command Aliases

You can create aliases for commands to support different calling methods:

```hulo
cmd my-command {
    alias: ["mc", "mycmd"]
    
    cmd init {}
    cmd stop {}
}

// Usage
my-command init
mc init
mycmd init
```

## Type Naming Standards

### Class Naming

Class names use `PascalCase`, fields use `snake_case`:

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

### Built-in Types

Built-in basic types use lowercase uniformly:

```hulo
let name: str = "Alice"
let age: num = 25
let scores: list<num> = [85, 90, 78]
let config: map<str, any> = {"debug": true}
let flag: bool = true
```

### Type Aliases

Type aliases use `PascalCase`:

```hulo
type UserId = str
type EmailAddress = str
type DatabaseConfig = {
    host: str
    port: num
    credentials: map<str, str>
}
```

## Enum Naming Standards

### Enum Types

Enum types use `PascalCase`, enum items use `SCREAMING_SNAKE_CASE`:

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

### Associated Value Enums

Enum items with associated values also follow the same naming conventions:

```hulo
enum NetworkProtocol {
    TCP(port: num)
    UDP(port: num)
    HTTP(port: num, secure: bool)
}
```

## Module and Package Naming

### Module Naming

Module names use `snake_case`:

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

### Package Naming

Package names use lowercase letters and can contain hyphens:

```hulo
// Package name examples
my-application
user-management-system
api-client
database-connector
```

## File Naming Standards

### Source Files

Source files use hyphen-separated (kebab-case) with `.hl` extension:

```hulo
user-service.hl
database-connection.hl
api-client.hl
config-manager.hl
http-client.hl
request-handler.hl
response-parser.hl
```

### Module Files

Module entry files are uniformly named `mod.hl`, other files use hyphen separation:

```hulo
src/
├── mod.hl                    // Main module entry
├── user-management/
│   ├── mod.hl               // User management module entry
│   ├── user-service.hl      // User service
│   ├── user-model.hl        // User model
│   └── user-validation.hl   // User validation
├── database-connection/
│   ├── mod.hl               // Database connection module entry
│   ├── connection-pool.hl   // Connection pool
│   ├── query-builder.hl     // Query builder
│   └── transaction-manager.hl // Transaction manager
└── api-client/
    ├── mod.hl               // API client module entry
    ├── http-client.hl       // HTTP client
    ├── request-handler.hl   // Request handler
    └── response-parser.hl   // Response parser
```

## Comment Standards

### Single-line Comments

Single-line comments use `//`, concise and clear:

```hulo
let user_count: num = 100  // Current total number of users
fn validate_email(email: str) -> bool {
    // Check if email format is valid
    return $email.contains("@")
}
```

### Multi-line Comments

Complex comments use `/** ... */` format:

```hulo
/**
 * User authentication service
 * Provides user login, registration, permission verification and other functions
 * 
 * @param username Username
 * @param password Password
 * @returns Authentication result
 */
fn authenticate_user(username: str, password: str) -> AuthResult {
    // Implementation logic
}
```

### Build Directive Comments

Build directives use special format:

```hulo
// @hulo-build bash@4.0 --path /bin/bash
// @hulo-build powershell --version 7.0
```

## Code Format Standards

### Indentation

Use 4 spaces for indentation, do not use tabs:

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

### Blank Line Usage

Add blank lines between logic blocks to improve readability:

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