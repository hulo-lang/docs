---
title: Macro
icon: fas fa-puzzle-piece
---

## 不带参数的
```hulo
fn extend_user(self: Class<User>) {
    echo $self.name // User
    echo ${self.fields.len} // 0
    $self.fields[""]
}

@extend_user
class User {}
```

## 带参数的
```hulo
fn extend_user({required }) {
    return _build(self: Class<User>) {
        echo $self.name // User
        echo ${self.fields.len} // 0
        $self.fields.add(field(name: "name", type: ""))
    }
}

@extend_user()
class User {}
```

## 函数注解
```hulo
fn log(self: () -> void | Function, funcName: str) {
    echo("executing $funcName")
    self()
}

@log
fn sayHello() {
    echo("Hello World")
}
```

## 类注解

## 方法注解

## 字段注解

## 注解执行流程

## 注解包装


