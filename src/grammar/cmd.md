---
title: Command
icon: fas fa-terminal
date: 2025-04-13
category: grammar
tag: 
    - cmd
license: MIT
---

> `cmd` 是 Hulo 语言中的基础数据类型，用于执行系统命令、脚本和程序。Hulo 提供了强大的命令系统，支持参数解析、版本控制、模式匹配和跨平台兼容性。通过 `cmd` 关键字声明命令，使用注释说明使用规则，结合 `use` 模式匹配系统实现灵活的命令组合和分发。

## 声明

```hulo
cmd mycmd {}
```

## 命令继承

## 等价类

其调用方式与传统命令类似。

## 命令声明
在 Hulo 中，命令可以通过 `cmd` **关键字** 进行声明，并使用 `@command` **注解** 来定义调用规则。
```hulo
@command(rule: "myCommand [FLAGS]")
cmd myCommand {
    @flag
    a: bool

    @flag
    b: str

    @flag
    c: str

    // 构造方式 1
    myCommand() {}

    // 构造方式 2
    myCommand(this.a) {}

    // 构造方式 3（优先级高于构造方式 1）
    // 若需要匹配所有参数，可以使用空入参的构造函数
    myCommand(this.a, this.b, this.c) {
        if ($this.a[0] == 'h') {
            $this.a[0] = 'H'
        }
    }
}
```

命令调用示例
```hulo
myCommand -a
myCommand -b "hello" -c "World"
myCommand -a -b "hello" -c "World"
// 等价于
myCommand -ab "hello" -c "World"
```

## 命令映射

在 Hulo 的规则体系下，不同平台的命令无论是子命令还是参数都有明确的类型。但是，原始的命令毕竟全都是接收标识符作为参数，具体的类型可能无法表达所有。例如，在老旧的命令中 /? 等价于 -h，这些差异造成了翻译成目标语言的时候必须加一层。

为此，`@Serialize` 注解就应运而生，Hulo 提供了一套较为完备规则映射系统。Serialize 可以加在类上也可以加在字段上，这就有优先级的问题对于类上的注解优先级会高于字段的注解，因为他决定了全局映射。

### 基本语法规则

```hulo
// 基本语法: @Serialize("模板字符串")
@Serialize("-d {}")           // 单个占位符
@Serialize("-d {},{}")        // 多个占位符
@Serialize("-d {0},{1},{2}")  // 索引占位符
@Serialize("-d {name}")       // 命名占位符
```

### 占位符类型系统

#### 基础占位符
```hulo
{}      // 自动索引占位符
{0}     // 显式索引占位符
{name}  // 命名占位符
{?}     // 可选占位符（值不存在时跳过）
{*}     // 展开占位符（数组展开为多个参数）
```

#### 条件占位符
```hulo
{if:condition}     // 条件占位符
{unless:condition} // 反向条件占位符
{when:value}       // 值匹配条件
{default:value}    // 默认值占位符
```

**示例：**
```hulo
@Serialize("""
    {if:verbose} --verbose {/if}
    {if:debug} --debug {/if}
    {if:quiet} --quiet {/if}
    {unless:verbose} --no-verbose {/unless}
""")
options: {
    verbose: bool
    debug: bool
}
```

条件嵌套
**声明：**
```hulo
type AuthConfig = { username: str, password: str, token: str }

@Serialize("""
    {if:auth}
        --auth {username}:{password}
        {if:token} --token {token} {/if}
    {/if}
""")
auth: AuthConfig
```

**调用：**
```hulo
--auth { username: "root", password: "123", token: "x-token" }
// output: --auth root:123 --token x-token

--auth username="root" password="123"
// output: --auth root:123
```

#### 格式化占位符

```hulo
{format:fmt}       // 格式化占位符
{join:sep}         // 连接占位符
{split:sep}        // 分割占位符
{quote}            // 引号占位符
{escape}           // 转义占位符
```

**声明：**
```hulo

```

**调用：**
```hulo

```

#### 循环和展开

```hulo
// 数组展开
@Serialize("-d {*}")
files: str[]

// 对象属性展开
@Serialize("-d {*.key}={*.value}")
config: map<str, str>

// 条件展开
@Serialize("-d {if:enabled}{*}{/if}")
enabled_files: str[]
```

#### 格式化规则
```hulo
// JSON 格式化
@Serialize("-d {format:json}")
data: map<str, any>

// 自定义格式化函数
@Serialize("-d {format:custom_format}")
data: num[][]

// 多重格式化
@Serialize("-d {format:json,indent:2}")
data: map<str, any>
```

```hulo
fn custom_format(v: CustomType) -> str {
    let rows = <str>[]
    loop $row in $rows {
        let cols = <str>[]
        loop $col in $row {
            $col.add($col.to_str())
        }
        $rows.add($col.join(","))
    }
    return $rows.join(";")
}
```

### 复合规则组合示例
```hulo

```

#### 自定义占位符

#### 完整示例

```hulo
@Serialize("""
    {if:daemon}daemon {/if}
    {if:command}{command} {/if}
    {if:image}{image} {/if}
    {if:container}{container} {/if}
    {if:ports}
        {for:port in ports}
            -p {port.host}:{port.container}
        {/for}
    {/if}
    {if:volumes}
        {for:volume in volumes}
            -v {volume.source}:{volume.target}
        {/for}
    {/if}
    {if:env}
        {for:key,value in env}
            -e {key}={value}
        {/for}
    {/if}
    {if:name}--name {name} {/if}
    {if:detach}-d {/if}
    {if:interactive}-i {/if}
    {if:tty}-t {/if}
    {if:rm}--rm {/if}
    {if:network}--network {network} {/if}
    {if:args}{*}{/if}
""")
cmd docker {
    daemon: bool = false
    command: str?
    image: str?
    container: str?
    ports: list<{host: str, container: str}> = []
    volumes: list<{source: str, target: str}> = []
    env: map<str, str> = {}
    name: str?
    detach: bool = false
    interactive: bool = false
    tty: bool = false
    rm: bool = false
    network: str?
    args: str[] = []
    
    docker() {}
}
```

### 内置注解

`@Constraint` 是 Hulo 内置的用于声明子命令间以及各个 Options 关系的注解。

### 命令解释顺序

#### 基本规则
Hulo 允许使用 [FLAGS] 作为内置规则，代表所有 **flags（标志参数）**。
当然，你也可以直接穷举所有 flags 进行定义：

### **命令参数规则对比**  

| **规则类型**  | **语法**                 | **示例**                 | **是否正确** |
|--------------|-------------------------|-------------------------|-------------|
| **可选参数** | `myCommand [arg]`        | `myCommand`             | ✔           |
|              |                          | `myCommand "hello"`     | ✔           |
|              |                          | `myCommand sayHello`    | ✔           |
| **强制参数** | `myCommand arg1 arg2`    | `myCommand say hello`   | ✔           |
|              |                          | `myCommand 1 2`        | ✔           |
|              |                          | `myCommand hello`       | ❌          |
|              |                          | `myCommand`             | ❌          |
| **枚举类型** | `myCommand {start\|stop\|init}` | `myCommand start`    | ✔           |
|              |                          | `myCommand stop`        | ✔           |
|              |                          | `myCommand other`       | ❌          |
| **可变参数** | `myCommand ...`          | `myCommand`             | ✔           |
|              |                          | `myCommand 1 2 3`       | ✔           |
|              |                          | `myCommand say hello`   | ✔           |

### 自定义格式
```hulo
cmd myCommand {
    @flag(format: "/a {{v}}")
    a: str

    @flag(format: "/b")
    b: bool

    @flag(format: "/c {{k}} {{v}}")
    c: map<str, str>

    @flag(format: custom_format_1)
    d: list<num>

    @flag(format: custom_format_2)
    e: list<num>

    @flag(format: custom_format_3)
    f: list<num>

    // 对于字符串类型的默认构造
    fn defaultFormat(fmt: str, obj: FlagObject, values: any) -> str {
        match obj.value {
            str => {
                assert_type(values, str)
                // apply 的时候 values 会调用 to_str() 方法
                return template.apply(fmt, values)
            },
            map => {
                assert_type(values, map)
                let res = <str>[]
                loop (k, v) in values {
                    res.add(template.apply(fmt, k, v))
                }
                return res.join(" ")
            },
            list => {
                assert_type(values, list)
                let res = <str>[]
                v.foreach((e) => res.add(template.apply(fmt, k, v)))
                return res.join(" ")
            },
            bool => {
                assert_type(values, bool)
                return template.apply(fmt, values)
            }
        }
    }

    fn custom_format_1(v: list<num>) -> str {
        return "-d ${str.join($v, ",")}"
    }

    fn custom_format_2(v: list<num>) -> str {
        let res = <str>[]
        v.foreach((e) => res.add("-d $e"))
        return res.join(" ")
    }

    fn custom_format_3(v: list<num>) -> str {
        let res = <str>[]
        let cnt: num = 0
        v.foreach((e) => res.add("v$cnt=${cnt++}"))
        return "-d ${res.join(";")}"
    }
}

myCommand -a "hello" // => myCommand /a "hello"
myCommand -ab "hello" // => myCommand /a "hello" /b
myCommand -c {"key1": "value1", "key2": "value2"} // => myCommand /c key1 value1 /c key2 value2
myCommand -d [1, 2, 3] // => myCommand -d 1,2,3
myCommand -e [1, 2, 3] // => myCommand -d 1 -d 2 -d 3
myCommand -f [1, 2, 3] // => myCommand -d v1=1;v2=2;v3=3
```

## 命令调用

### 基础类型
Hulo 提供两种命令调用方式：
1. 命令式调用（类似传统 Shell 命令）
2. 函数式调用（类似函数调用语法

这两种方式**仅在语法上不同**，实际效果完全一致。
```hulo
myCommand -a "a" // string 类型

myCommand -b // bool 类型

myCommand -c 6 // number 类型
```

命令式调用的特殊规则
在 命令式调用 中：

* `-`（单短横）后面**只能跟一个字母**。
* 如果多个字母组合在一起，则被解析为多个**短选项**（flags）的组合。
* `--`（双短横）可用于**完整单词的参数名**，避免歧义。
```hulo
myCommand -n "ansurfen"
myCommand --name "ansurfen"
myCommand -c
myCommand -nc "ansurfen" // 等价于 myCommand -n "ansurfen" -c
```

相比之下，函数式调用 没有短选项的限制，可以使用完整的参数名称：
```hulo
myCommand(n: "ansurfen", c: true)
```

除了上述的基础数据类型外，命令还支持接收以下参数类型：

### map类型
```hulo
// 命令行参数形式
myCommand -d {"a": 6, "b": true} // => myCommand -d a=6 -d b=true

// 函数调用形式
myCommand(d: {"a":6, "b": true})
```

### collections类型
```hulo
// list
// 命令行参数形式
myCommand -c [1, 2, 3] // => myCommand -c 1 -c 2 -c 3

// 函数调用形式
myCommand(c: [1, 2, 3])

// triple
myCommand -c (1, 2, 3) // => myCommand -c 1 -c 2 -c 3

// set
myCommand -c {1, 2, 3} // => myCommand -c 1 -c 2 -c 3
```

### enum类型
```hulo
enum Protocal {
    port: num

    tcp(6),
    udp(17);
}

myCommand --protocal Protocal::tcp --port Protocal::tcp.port
```

### class类型
```hulo
class User {
    name: str
    pwd: str
}

// 命令行参数形式
myCommand -u User{name: "root", pwd: "123456"} // => myCommand -u name="root" -u pwd="123456"

// 函数调用形式
myCommand(u: User{name: "root", pwd: "123456"})
```

### time类型
```hulo
// time.Duration 类型 e.g. 10s 500ms 2m 1h30m
myCommand --timeout "10s"
myCommand --timeout "1h30m"

// time.Time 类型
myCommand --at "23:00"
```

### 特殊参数
--后面紧跟的参数是用于传递给编译器执行的
```hulo
myCommand -- -n "ansurfen"
```

## 命令执行运算符

命令执行运算符 `&` 提供了一种将字符串字面量或变量值直接解释为可执行命令的机制，实现动态命令调用。

```hulo
& "./main.exe"
```
该运算符将操作数从字符串类型强制转换为命令类型，并在运行时执行对应的可执行文件，而非将其作为普通字符串处理。对于字符串变量同样也是支持的：

```hulo
let main: str = "./main.exe"

& $main
```

## 运算符

### 管道
与传统的*Bash*脚本类似，Hulo 也支持**管道运算符**（|）。管道用于将 *前一个命令的输出* 作为 *下一个命令的输入*，从而实现数据的流式传递。

无论是**函数调用**还是**命令行参数形式**，Hulo 都支持管道的使用。
```hulo
// 函数调用形式
myCommand(n: "ansurfen", c: true) | echo

// 命令行参数形式
echo "Hello World" | myCommand -n "ansurfen" -c
```

### 逻辑与
如果前一个命令执行成功（没有抛出异常），则执行下一个命令；否则停止执行。
```hulo
mkdir mydir && cd mydir && echo "enter mydir"
```
* 如果 mkdir mydir 成功，则执行 cd mydir。
* 如果 cd mydir 成功，则执行 echo "enter mydir"。
* 如果 mkdir mydir 失败，后续命令不会执行。

### 逻辑或
如果前一个命令执行失败（没有抛出异常），则执行下一个命令；否则跳过。
```hulo
mkdir mydir || echo "enter mydir"
```
* 如果 mkdir mydir 成功，echo 不会执行。
* 如果 mkdir mydir 失败，会输出 "enter mydir"。

### 并列命令
在 Hulo 中，`;`用作 **语句结束符**，不仅适用于命令，还适用于任何语句。这类似于 C 语言 的语法，使得多个语句可以在同一行书写，而不会影响执行逻辑。
```hulo
echo "a"; echo "b"; echo "c"
```
上述代码会依次执行 echo 命令，输出：
```cmd
a
b
c
```

### 异步执行

Hulo 支持两种异步执行模式：传统的后台执行语法和现代化的异步函数语法。

#### 传统后台执行
`&` 运算符用于将命令放入后台执行，使其异步运行，而不阻塞后续命令的执行。这类似于*Bash*中的 `&` 用法。

```hulo
// 后台执行命令
longRunningTask &
echo "任务已启动"

// 等待方式
wait       // 等待所有后台任务
wait -1    // 等待最后一个后台任务
wait 1     // 等待作业号1的任务
```

#### 异步函数执行
```hulo
// 定义并立即执行异步函数
let task_id = async () => {
    longRunningTask
} () // 立即执行，返回任务ID
echo "任务已启动"

// 等待特定任务
await $task_id
```

::: tip
两种语法在底层实现上等价，但异步函数语法提供了更好的代码组织和错误处理能力。
:::

执行流程
1. longRunningTask & 在 后台执行，不会阻塞后续代码。
2. echo "任务已启动" 立即执行，而不会等待 longRunningTask 完成。

## 约束条件

::: tip
在默认情况下，所有子命令、选项都是可以共存的，这也就意味着 **∥** 操作符在大部分情况不必显式声明。
:::

### 基础约束

```hulo
cmd git {
    version: bool
    help: bool
    
    // 优雅的约束语法糖
    constraints {
        // 互斥约束
        version ⊥ help
        version ⊥ add
        version ⊥ commit
        version ⊥ push
        
        // 等价约束
        help ⊥ (add | commit | push | pull)
    }
    
    git() {}
}
```

### 复杂约束

```hulo
cmd docker {
    build: bool
    run: bool
    stop: bool
    image: str?
    container: str?
    ports: str[]
    volumes: str[]
    
    constraints {
        // 互斥约束
        build ⊥ run
        run ⊥ stop
        
        // 条件约束：如果 run 为 true，则 image 必须存在
        run → image ≠ null
        
        // 条件约束：如果指定了 ports，则必须指定 image
        ports ≠ ∅ → image ≠ null
        
        // 必需约束：至少需要一个操作
        (build ∨ run ∨ stop) ∨ (image ≠ null)
        
        // 共存约束：ports 和 volumes 可以共存
        ports ∥ volumes
    }
    
    docker() {}
}
```

### 操作符

| 操作符 | 语义 | 描述 |
|--------|------|------|
| ⊥ | 互斥 | A与B不能同时存在，必须选择其中一个 |
| ∥ | 共存 | A与B可以同时存在，也可以都不存在 |
| → | 蕴含 | 如果A存在，则B必须存在 |
| ↔ | 等价 | A与B必须同时存在或同时不存在 |
| = ∅ | 为空 | 参数值必须为空集合或空字符串 |
| ≠ ∅ | 非空 | 参数值不能为空集合或空字符串 |
| ≠ null | 非空值 | 参数值不能为null或未定义 |
| = null | 空值 | 参数值必须为null或未定义 |
| ∧ | 逻辑与 | 多个条件必须同时满足 |
| ∨ | 逻辑或 | 多个条件中至少满足一个 |
| ¬ | 逻辑非 | 条件取反，不满足指定条件 |

### 高级约束

```hulo
cmd npm {
    install: bool
    uninstall: bool
    package: str?
    global: bool
    
    constraints {
        // 条件约束
        install → package ≠ null
        uninstall → package ≠ null
        
        // 等价约束
        global ↔ (install ∨ uninstall)
        
        // 互斥约束
        install ⊥ uninstall
    }
    
    npm() {}
}
```

### 分组约束

```hulo
cmd kubectl {
    get: bool
    create: bool
    delete: bool
    apply: bool
    
    constraints {
        // 分组约束
        group read_ops: get {
            exactly_one: false  // 可以没有
        }
        
        group write_ops: create, delete, apply {
            at_most_one: true  // 最多一个
        }
        
        // 组间约束
        read_ops ∥ write_ops  // 读写操作可以共存
    }
    
    kubectl() {}
}
```

### 复杂逻辑约束

```hulo
cmd terraform {
    init: bool
    plan: bool
    apply: bool
    destroy: bool
    config: str?
    vars: map<str, str>
    
    constraints {
        // 复杂逻辑约束
        (plan ∨ apply ∨ destroy) → init
        (apply ∨ destroy) → plan
        destroy → apply = false
        
        // 如果指定了 vars，则必须指定 config
        vars ≠ ∅ → config ≠ null
        
        // 条件组合
        if init {
            config = null ∨ config ≠ null  // 都可以
        } else if plan {
            config ≠ null
        } else if apply {
            config ≠ null ∧ vars ≠ ∅
        }
    }
    
    terraform() {}
}
```

### 约束函数

```hulo
cmd aws {
    s3: bool
    ec2: bool
    region: str?
    profile: str?
    config: map<str, str>
    
    constraints {
        // 使用约束函数
        validate_exclusive(s3, ec2)
        validate_required_if_region(region, profile, config)
        validate_at_least_one(s3, ec2)
    }
    
    // 约束函数定义
    fn validate_exclusive(a: bool, b: bool) {
        a ∧ b → false
    }
    
    fn validate_required_if_region(region: str?, ...params: any[]) {
        region ≠ null → params.any(≠ null)
    }
    
    fn validate_at_least_one(...values: bool[]) {
        values.any(true)
    }
    
    aws() {}
}
```

### 约束继承

```hulo
// 基础约束模板
cmd baseConstraints {
    constraints {
        // 通用约束
        fn validate_exclusive(a: bool, b: bool) {
            a ∧ b → false
        }
        
        fn validate_required(value: any?) {
            value ≠ null ∧ value ≠ ∅
        }
    }
}

// 继承约束
cmd docker extends baseConstraints {
    build: bool
    run: bool
    image: str?
    
    constraints {
        // 使用继承的约束函数
        validate_exclusive(build, run)
        validate_required(image ∨ build ∨ run)
    }
    
    docker() {}
}
```

### 错误处理

```hulo
cmd mysql {
    create: bool
    drop: bool
    database: str?
    user: str?
    password: str?
    
    constraints {
        // 带错误消息的约束
        create ⊥ drop : "Cannot create and drop database at the same time"
        
        (create ∨ drop) → database ≠ null 
            : "Database name is required for create or drop operations"
        
        user ≠ null → password ≠ null
            : "Password is required when user is specified"
        
        (create ∨ drop ∨ user ≠ null) 
            : "Must specify at least one operation or user"
    }
    
    mysql() {}
}
```


### 完整示例

```hulo
cmd cli {
    version: bool
    help: bool
    
    constraints {
        // 基础约束
        version ⊥ (help | build | test | deploy)
        help ⊥ (version | build | test | deploy)
        
        // 分组约束
        group info: version, help {
            at_most_one: true
        }
        
        group operations: build, test, deploy {
            at_most_one: true
        }
        
        info ⊥ operations
    }
    
    cli() {}
    
    cmd build extends baseParameter {
        debug: bool
        release: bool
        target: str?
        output: str?
        
        constraints {
            // 互斥约束
            debug ⊥ release : "Cannot build in both debug and release mode"
            
            // 条件约束
            target ≠ null → output ≠ null
                : "Output path is required when target is specified"
            
            // 必需约束
            (debug ∨ release) ∨ target ≠ null
                : "Must specify either build mode or target"
        }
        
        build() {}
    }
    
    cmd deploy extends baseParameter {
        staging: bool
        production: bool
        config: str?
        env: map<str, str>
        
        constraints {
            // 条件约束
            staging → config ≠ null : "Config file is required for staging deployment"
            production → config ≠ null : "Config file is required for production deployment"
            
            // 互斥约束
            staging ⊥ production : "Cannot deploy to staging and production simultaneously"
            
            // 环境变量约束
            env ≠ ∅ → (staging ∨ production)
                : "Environment variables can only be set for staging or production"
        }
        
        deploy() {}
    }
}
```

### 特殊约束场景

```hulo
cmd package {
    install: bool
    uninstall: bool
    update: bool
    list: bool
    packages: str[]
    source: str?
    
    constraints {
        // 数组约束
        (install ∨ uninstall ∨ update) → packages ≠ ∅
            : "Package names are required for install, uninstall, or update"
        
        list → packages = ∅
            : "Cannot specify packages with list command"
        
        // 源约束
        source ≠ null → (install ∨ update)
            : "Source can only be specified for install or update"
        
        // 复杂逻辑
        if install {
            packages ≠ ∅ ∧ (source = null ∨ source ≠ null)
        } else if uninstall {
            packages ≠ ∅ ∧ source = null
        } else if update {
            packages ≠ ∅ ∨ packages = ∅
        }
    }
    
    package() {}
}
```

### 嵌套约束

```hulo
cmd server {
    start: bool
    stop: bool
    restart: bool
    config: str?
    port: num?
    ssl: bool
    
    constraints {
        // 基础互斥
        start ⊥ stop
        stop ⊥ restart
        start ⊥ restart
        
        // SSL 相关约束
        ssl → port ≠ null
            : "Port must be specified when SSL is enabled"
        
        ssl → config ≠ null
            : "Config file is required for SSL"
        
        // 端口约束
        port ≠ null → (start ∨ restart)
            : "Port can only be specified for start or restart"
        
        // 配置约束
        config ≠ null → (start ∨ restart)
            : "Config can only be specified for start or restart"
    }
    
    server() {}
}
```

## 约束选择器

### 基础访问
```hulo
cmd kubectl {
    version: bool
    help: bool
    
    cmd get extends baseCommand {
        namespace: str
        output: str
    }
    
    cmd create extends baseCommand {
        file: str
        dry_run: bool
    }
    
    cmd delete extends baseCommand {
        resource: str
        force: bool
    }
    
    constraints {
        // 访问所有子命令
        version ⊥ kubectl.cmds -> "can not use version flag with commands"
        
        // 访问所有选项
        help ⊥ kubectl.opts -> "can not use help flag with options"
        
        // 访问特定命令
        version ⊥ (get | create | delete) -> "version conflicts with commands"
    }
}
```

### 选择器语法
```hulo
constraints {
    // 选择器语法
    version ⊥ .cmds -> "version conflicts with all commands"
    help ⊥ .opts -> "help conflicts with all options"
    
    // 访问父命令
    version ⊥ ..cmds -> "version conflicts with parent commands"
    
    // 访问兄弟命令
    version ⊥ ~.cmds -> "version conflicts with sibling commands"
    
    // 访问所有后代
    version ⊥ **.cmds -> "version conflicts with all descendant commands"
}
```

### 过滤选择器

```hulo
constraints {
    // 按类型过滤
    version ⊥ .cmds[extends baseCommand] -> "version conflicts with base commands"
    help ⊥ .opts[bool] -> "help conflicts with boolean options"
    
    // 按名称过滤
    version ⊥ .cmds[name: "get|create"] -> "version conflicts with read commands"
    help ⊥ .opts[name: "file|resource"] -> "help conflicts with file options"
    
    // 按属性过滤
    version ⊥ .cmds[has: "namespace"] -> "version conflicts with commands having namespace"
    help ⊥ .opts[type: "str"] -> "help conflicts with string options"
}
```

### 组合选择器

```hulo
constraints {
    // 组合选择器
    version ⊥ (.cmds[extends baseCommand] | .opts[bool]) -> "version conflicts with base commands and bool options"
    
    // 排除特定项
    version ⊥ (.cmds - get) -> "version conflicts with commands except get"
    help ⊥ (.opts - output) -> "help conflicts with options except output"
    
    // 并集选择器
    help ⊥ (.cmds | .opts) -> "help conflicts with all commands and options"
}
```

### 完整示例


```hulo
cmd terraform {
    version: bool
    help: bool
    
    cmd init extends baseCommand {
        @Serialize("-backend={}")
        backend: str
    }
    
    cmd plan extends baseCommand {
        @Serialize("-out={}")
        out: str
        @Serialize("-var={}={}")
        var: map<str, str>
    }
    
    cmd apply extends baseCommand {
        @Serialize("-auto-approve")
        auto_approve: bool
        @Serialize("-var={}={}")
        var: map<str, str>
        
        constraints {
            // 访问当前命令的选项
            help ⊥ .opts -> "can not use help flag with apply options"
            
            // 访问特定选项
            auto_approve ⊥ var -> "cannot use auto-approve with variables"
            
            // 条件约束
            auto_approve → (.opts[type: "map<str,str>"] = ∅) -> "when auto-approve specified, no variables allowed"
        }
    }
    
    constraints {
        // 访问所有子命令
        version ⊥ .cmds -> "can not use version flag with commands"
        
        // 访问特定类型的命令
        version ⊥ .cmds[extends baseCommand] -> "version conflicts with base commands"
        
        // 排除特定命令
        help ⊥ (.cmds - init) -> "help conflicts with commands except init"
    }
}
```

### 高级选择器


```hulo
constraints {
    // 路径选择器
    version ⊥ terraform.init.backend -> "version conflicts with init backend"
    help ⊥ terraform.plan.out -> "help conflicts with plan output"
    
    // 通配符选择器
    version ⊥ terraform.*.var -> "version conflicts with any command's variables"
    
    // 递归选择器
    version ⊥ terraform.**.opts -> "version conflicts with all nested options"
}
```

### 语法总结

```hulo
// 基础选择器
.cmds           // 所有子命令
.opts           // 所有选项
..cmds          // 父命令
~.cmds          // 兄弟命令
**.cmds         // 所有后代命令

// 过滤选择器
.cmds[extends baseCommand]    // 继承特定类型的命令
.opts[bool]                   // 特定类型的选项
.cmds[name: "pattern"]        // 按名称过滤
.opts[has: "property"]        // 按属性过滤

// 组合选择器
(.cmds | .opts)               // 并集
(.cmds - specific)            // 差集

// 路径选择器
terraform.init.backend        // 具体路径
terraform.*.var               // 通配符路径
terraform.**.opts             // 递归路径
```

### 高级用法示例

```hulo
cmd aws {
    version: bool
    help: bool
    
    cmd s3 extends baseCommand {
        ls: bool
        cp: bool
        mv: bool
        rm: bool
        bucket: str
        key: str
    }
    
    cmd ec2 extends baseCommand {
        describe: bool
        create: bool
        terminate: bool
        instance_id: str
        image_id: str
    }
    
    constraints {
        // 复杂选择器组合
        version ⊥ (.cmds[extends baseCommand] & .cmds[has: "bucket"]) -> "version conflicts with s3 commands"
        
        // 多层过滤
        help ⊥ (.opts[type: "str"] | .opts[type: "bool"]) -> "help conflicts with string and bool options"
        
        // 动态条件
        version ⊥ .cmds[if: extends baseCommand && has: "instance_id"] -> "version conflicts with ec2 commands"
        
        // 递归访问
        version ⊥ **.opts[type: "str"] -> "version conflicts with all string options in any subcommand"
        
        // 排除特定模式
        help ⊥ (.cmds - s3) -> "help conflicts with commands except s3"
        
        // 组合约束
        (version | help) ⊥ (.cmds[extends baseCommand] | .opts[required]) -> "flags conflict with base commands and required options"
    }
}
```
