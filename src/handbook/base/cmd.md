---
title: Command
icon: fas fa-terminal
---

`cmd` 是 Hulo 的基础数据类型，其调用方式与传统命令类似。
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

### 命令规则

#### 基本规则
Hulo 允许使用 [FLAGS] 作为内置规则，代表所有 **flags（标志参数）**。
当然，你也可以直接穷举所有 flags 进行定义：


### 自定义格式
```hulo
cmd myCommand {
    @flag(format: "/a {{v}}")
    a: str

    @flag(format: "/b")
    b: bool

    @flag(format: "/c {{k}} {{v}}")
    c: map<str, str>

    @flag(format: customFormat1)
    d: list<num>

    @flag(format: customFormat2)
    e: list<num>

    @flag(format: customFormat3)
    f: list<num>

    // 对于字符串类型的默认构造
    fn defaultFormat(fmt: str, obj: FlagObject, values: any) -> str {
        match obj.value {
            str => {
                assert_type(values, str)
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

    fn customFormat1(v: list<num>) -> str {
        return "-d ${str.join($v, ",")}"
    }

    fn customFormat2(v: list<num>) -> str {
        let res = <str>[]
        v.foreach((e) => res.add("-d $e"))
        return res.join(" ")
    }

    fn customFormat3(v: list<num>) -> str {
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
enum protocal {
    port: num

    tcp(6),
    udp(17);
}

myCommand --protocal protocal::tcp --port protocal::tcp.port
```

### class类型
```hulo
class user {
    name: str
    pwd: str
}

// 命令行参数形式
myCommand -u user{name: "root", pwd: "123456"} // => myCommand -u name="root" -u pwd="123456"

// 函数调用形式
myCommand(u: user{name: "root", pwd: "123456"})
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

### 异步
Hulo 语言支持 `&` 运算符，用于将命令放入后台执行，使其异步运行，而不阻塞后续命令的执行。这类似于*Bash*中的 `&` 用法。

```hulo
longRunningTask &
echo "任务已启动"
```

执行流程
1. longRunningTask & 在 后台执行，不会阻塞后续代码。
2. echo "任务已启动" 立即执行，而不会等待 longRunningTask 完成。