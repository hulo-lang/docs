---
title: Specification
icon: fas fa-file-alt
---

## 通用规则

* 变量名必须使用小写字母开头，并遵循 snake_case 风格。
* 避免使用单字母变量名（除非是循环变量 i, j, k）。
* 不要使用缩写，除非是广泛接受的缩写（如 id, url, cpu）。
* 布尔变量尽量使用 is_ / has_ / can_ 开头，如：
```hulo
let is_enabled: bool = true
let has_access: bool = false
let can_execute: bool = true
```
* 计数器变量以 _count 结尾：
```hulo
let user_count: num = 100
let retry_count: num = 3
```
* 对于多行定义（>=3），建议只使用一个关键字：
```hulo
let (
    user_count: num = 100
    has_access: bool = false
    can_execute: bool = true
)
```

## 常量命名规则
* 使用 UPPER_CASE_SNAKE_CASE：
```hulo
const MAX_RETRY: num = 5
const DEFAULT_TIMEOUT: num = 30
const PI: num = 3.141592653
```

## 函数 & 方法命名
* 使用 snake_case，动词开头：
```hulo
fn get_user_name(user_id: num) -> str
fn send_request(url: str) -> response
fn validate_email(email: str) -> bool
```
* 如果是 setter/getter，使用 set_ / get_ 前缀：
```hulo
fn set_username(new_name: str)
fn get_username() -> str
```

## 结构体 & 类命名
* builtin的基础类型都统一为小写, str、num、list、set、map...
* 使用 PascalCase：
```hulo
struct UserProfile {
    username: str
    email: str
    age: num
}
```
* 字段使用 snake_case：
```
struct ServerConfig {
    host: str
    port: num
    is_https: bool
}
```

## 枚举命名
* 枚举类型使用 PascalCase，枚举项使用 SCREAMING_SNAKE_CASE：
```
enum UserRole {
    ADMIN
    EDITOR
    VIEWER
}
```

## 命名禁忌
🚫 不要使用：

* 无意义的变量名 (x, y, data, temp)
* 魔法数（直接使用 3.14，应使用 PI）
* 拼音或非英语变量名（除非特殊场景）
* 缩写过多的变量名（如 usrCfg 应该用 user_config）
* 与关键字冲突的变量名（如 fn, let, const）

## 示例
```hulo
const DEFAULT_RETRIES: num = 3

struct DatabaseConfig {
    host: str
    port: num
    username: str
    password: str
    max_connections: num
}

fn connect_to_db(config: DatabaseConfig) -> bool {
    if config.max_connections > 100 {
        return false
    }
    return true
}

fn get_user_role(user_id: num) -> UserRole {
    return UserRole.ADMIN
}
```