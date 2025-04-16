---
title: DevOps
icon: fas fa-repeat
date: 2025-04-13
category: toolchain
tag:
    - devops
license: MIT
---

## 架构图

```sequence DevOps
Client ->>+ Service: HTTP Request
Service ->>+ Hulo Script: call()
Note right of Service: Hulo SDK
Hulo Script -->> Service: Log seq=x
loop Every log
    Hulo Script ->>+ Middlewares: Request id=x
    Middlewares -->>- Hulo Script: Response id=x
end
Hulo Script -->> Service: Log seq=x+1
Hulo Script -->> Service: Log ...
Hulo Script -->> Service: Result
Service -->>- Client: HTTP Response
```

在这个架构中，远程服务器可以是任意语言，从sdk包裹着 hulo 脚本的代码提供服务。在执行脚本的时候，hulo可以向其他平台发送日志、记录等信息报告，也可以走API传回

## 示例

## 配置文件

```json title="run-scripts/hulo.launch.json"
{
    "ext": ".sh",
    "platform": "amber",
    "beforeRun": [],
    "afterRun": [],
    "env": []
}
```

**ext**

* 类型：`str`
* 默认值: ".sh"

**platform**

* 类型：`str`
* 默认值: "bash"
