---
title: 特征
icon: fas fa-scale-unbalanced-flip
date: 2025-04-19
category: grammar
tag:
    - trait
license: MIT
---

> `trait` is a structure that **defines class's members and method signatures**, used to **specify a contract for certain behaviors or functionalities**. It is similar to the traditional interface in object-oriented programming, but usually does not contain method implementations.

## 特征中的方法定义

假设我们现在有 `LogService` 和 `GameService` 两种服务器，而我们希望它们都能对外提供一个统一的运行接口，这时就可以使用特征（trait）来约定服务应该具备的公共行为。
```hulo
trait Service {
    run() throws
}
```
在上面的示例中，`Service` 是一个特征，它通过 `run()` 方法定义了所有服务应当实现的核心功能。这个方法使用 throws 表示它可能会抛出异常，允许具体实现根据自身情况处理错误。
通过使用特征，多个不同类型的服务（如日志服务、游戏服务等）可以统一实现 Service 接口，从而使得代码在调用这些服务时具有一致的形式和行为。这不仅增强了系统的模块化设计，也提高了扩展性和可测试性。

## 为类型实现特征

因为特征只定义行为是什么样的，因此我们需要为类型实现具体的特征，定义行为具体是怎么样的。

首先来为 `LogService` 和 `GameService` 实现 `Service` 特征：
```hulo
// 隐式实现
class LogService {
    fn run() throws => echo "run LogService"
}

class GameService {}

// 显式实现
impl Service for GameService {
    fn run() throws => echo "run GameService"
}
```
实现特征的语法与为类、枚举实现方法很像：`impl Service for GameService`，读作“为 `GameService` 类型实现 `Service` 特征”，然后在 `impl` 的花括号中实现该特征的具体方法。

::: tip
对于隐式声明的方式，你也可以显式的声明出来，而不需要再次实现。例如：
```hulo
impl Service for LogService, GameService;
```
:::

接下来就可以在这个类型上调用特征的方法：
```hulo
let srvs: Service[] = [LogService{}, GameService{}] 

loop $srv in $srvs {
    $srv.run()
}
```

运行输出：
```
run LogService
run GameService
```

## 特征中的属性定义

同方法一样，特征（trait）也可以定义属性。这些属性为实现该特征的类型设定了必须提供的字段接口，用于约定它们在行为以外还应暴露哪些只读信息。

在下面的例子中，我们继续以 `Service` 为例扩展它：
```hulo {2,3}
trait Service {
    readonly port: num
    readonly name: str

    run() throws
}
```

这里定义了两个只读属性：`port` 表示服务监听的端口，`name` 表示服务名称。这些属性不能在特征中赋值，只能在实现该特征的具体类型中提供 getter。

以 GameService 为例，实现新扩展的行为如下：
```hulo
impl Service for GameService {
    get port => 30000
    get name => "GameService"
}
```

通过 get 关键字，我们为 `GameService` 实现了特征中定义的属性。这种方式让每个实现体都能够清晰、明确地表达自身的特征信息。

完成实现后，就可以像方法那样直接访问这些属性，例如：
```hulo
let svc: Service = GameService()
print(svc.name)  // 输出: GameService
print(svc.port)  // 输出: 30000
```
这种设计不仅统一了接口调用形式，还提升了代码的可读性与规范性。

## 特征的高级用法

说实话，如果特征仅仅提供一些方法或属性的定义，你可能会觉得它只是“花里胡哨”的语法糖，不值得特别使用。但实际上，特征的强大之处体现在它可以参与更复杂的语义组合，比如构造器（`operator new`）、运算符重载（`operator >`）等。我们来看一个更复杂且实用的示例。

```hulo
trait Service {
    final name: str
    final port: num

    operator new() -> Service
    operator >(other: Service) -> bool
}
```

这里的 `final` 属性意味着一旦赋值，不允许被更改。同时，`Service` 特征中定义了一个构造器 `operator new` 和一个重载的比较运算符 `>`，这使得我们可以统一构造逻辑以及拷贝、比较等行为。

对于 GameService 来说，与 `readonly` 修饰不同，由于 `name` 和 `port` 是特征中已声明的 `final` 字段，因此只需要在构造函数时完成初始化即可。

```hulo
impl Service for GameService {
    operator new($this.name = "GameService", $this.port = 3000) {
        echo "initialize ${this.name}"
    }

    operator >(other: Service) -> bool {
        $other = $this
        return true
    }
}
```
上面的 `new` 构造器为 `GameService` 提供了默认初始化逻辑，并允许在实例化时传入不同的服务名或端口。运算符 `>` 在这里被用作“赋值复制”行为，表示将当前对象拷贝到另一个同类型对象上。

使用示例如下：
```hulo
let srv: Service = new GameService("MyGameService")
let srv2: Service?

$srv > $srv2 // 通过自定义运算符实现对象拷贝

assert(srv, srv2) // ok，两个对象内容相同
```
通过这种方式，特征不再只是接口定义的工具，它还能承载更强的构造与行为逻辑。这样不仅提高了代码复用性，也为设计统一的服务接口和行为提供了强大的语义支持。

### 默认实现

有时候我们希望为某些方法或属性提供默认行为，使得实现该特征的类型可以选择性地覆盖它们，这就是“默认实现”的用途。
```hulo
trait Pingable {
    fn ping() {
        echo "default ping"
    }
}
```

如果某个类型实现了 `Pingable` 特征，但没有显式定义 `ping` 方法，那么就会自动使用特征中提供的默认实现。
```hulo
impl Pingable for Device {}
```

当你调用：
```hulo
let dev: Pingable = new Device()
dev.ping() // 输出: default ping
```

如果你希望自定义行为，也可以覆盖默认实现：
```hulo
impl Pingable for Server {
    fn ping() {
        echo "custom ping from server"
    }
}
```

通过默认实现，我们可以提供“合理的默认行为”，让实现者可以只专注于他们想要改变的部分，从而减少重复代码。

## 特性继承
在 Hulo 中，特性（trait）同样支持继承机制。一个特性可以继承自其他特性，进而复用已有的定义和行为。通过继承，我们可以将多个通用能力组合在一个新的特性中，实现更强的抽象和复用能力。

例如，假设我们有两个基本特性 `Startable` 和 `Stoppable`，它们定义了启动与停止的能力：
```hulo
trait Startable {
    fn start()
}

trait Stoppable {
    fn stop()
}
```

我们可以通过继承，创建一个新的特性 `Controllable` 来表示既可启动又可停止的实体：
```hulo
trait Controllable: Startable, Stoppable {}
```

任何实现 `Controllable` 的类型，只需实现 `start` 和 `stop` 方法即可满足所有特性的要求。

继承不仅能继承方法签名，还能继承默认实现。这样可以有效减少代码重复，同时构建具有层次化结构的能力系统。通过组合继承，Hulo 提供了更加灵活的特性抽象方式。

## 解决和覆盖特征冲突

在实现多个特性（trait）时，若多个特性中定义了同名的方法或属性，就可能产生冲突。Hulo 提供了解决此类冲突的机制，以确保程序行为明确、可控。

当一个类型实现多个存在重名成员的特性时，编译器会提示冲突，要求开发者显式选择要采用的实现，或通过自定义实现来覆盖冲突部分。

例如，假设 `Readable` 和 `Writable` 特性中都定义了 `status()` 方法：

```hulo
trait Readable {
    fn status() -> str {
        return "readable"
    }
}

trait Writable {
    fn status() -> str {
        return "writable"
    }
}
```

当一个类型同时实现它们时，必须手动指定使用哪一个，或者提供自定义版本：

```hulo
impl Readable, Writable for FileStream {
    fn status<Readable>() -> str {
        echo $super.status() // 先执行默认实现
        return "file stream ready"
    }

    fn status<Writable>() -> str {
        echo $super.status()
        return "file stream ready"
    }
}
```

这样做不仅消除了冲突，还能根据上下文提供更贴切的实现。通过明确的覆盖机制，Hulo 避免了多重继承中的歧义问题，提升了接口组合的可靠性和可维护性。

## 命令特征

除了标准的 `class` 能够实现特征以外，Hulo 的 `cmd` 类型也可以实现相应的特征。

假设我们有 `echo` 和 `printf` 两个命令，而我们希望为它们实现一个通用的 `Printable` 特征，使得任何实现该特征的命令都能以统一方式进行文本输出。

```hulo
trait cmd Printable {
    // enable interpretation of backslash escapes
    e: bool

    Printable()
    Printable(e)
}
```
在上面的示例中，`Printable(e)` 是当命令只传入 -e 参数的时候调用的构造器，而 `Printable()` 是其它构造器规则都不匹配的时候调用。

## 实现命令特征

同 `class` 一样，实现命令特征的方式别无二致。
```hulo
impl Printable for echo {
    Printable() {
        echo $super.args 
    }

    Printable(e) {
        echo -e $super.args
    }
}

impl Printable for printf {
    Printable() {
        printf $super.args
    }

    Printable(e) {
        printf $super.args
    }
}
```

与传统的特征不同的是，命令特征可以直接调用，编译器默认会应用首个扫描到的作为实现类。例如，在下述代码中 `Printable` 很可能最终以 `echo` 命令作为运行。
```hulo
Printable -e "Hello World!\n"
```

具体会以哪一个命令作为默认选项，没有一定的标准，因为实际的开发场景都是多文件、多模块的，编译器具体会先扫描谁没有确切的答案。当然，你也可以使用 `use` 关键字显式的指明实现。

```hulo
use Printable = echo // ok，echo 实现了 Printable
use Printable = ls // 错误，ls 并没有实现上述的方法
```

## 组合命令实现特征

想象一下有这么一个场景，你希望在大多数情况下使用 `printf`，仅在出现 -e 的时候走 `echo`，对于上面介绍的语法糖就没法满足这个需求。于是，Hulo 就在 `use` 中引入了同类型组合一样语法——命令组合。

::: important
可能有人会说，这个场景是没事找事设想出来的无端需求。设想一下，在 posix 系列系统上自带的 `grep` 命令如何在 windows 上用 `find`、`findstr` 等命令模拟尽可能多的情况，你就会知道这个需求如此重要，哪怕他会以增加 Hulo 编写的复杂性为代价。
:::

```hulo
use Printable = Pick<echo, Printable(e)> & printf
```

::: tip
上述案例只是其中一种实现方式，具体要怎么组合你可以自行选择。比如，用上 `If`、`Exclude`、`Pick`、`Omit`等也是可以的 ：）
:::

这意味着命令本身也可以被当作对象来扩展和组合功能，从而构建更灵活的工具链。通过这种机制，命令不仅具备自身的执行能力，还可以通过特征参与到更高层次的行为约定中，实现一致性更强、复用性更高的命令式架构设计。

## 实现 cmd

与 `class` 不同的是， `cmd` 类型能够充当 `trait` 的角色。也就是说，一个命令既可以是一系列具体行为的集合，也可以是一组抽象行为的集合。

假设 `echo` 的定义如下：
```hulo
cmd echo {
    n: bool // 不输出结尾的换行符
    e: bool // 启用反斜杠转义字符（如 \n, \t 等）
    E: bool // 禁用转义字符（是默认行为）
}
```

下面我们将为 `printf` 命令实现 `echo` 的特征并调用它：
```hulo
impl echo for printf {
    echo() {
        printf $this.args
    }
}

use echo = printf
echo -e "Hello World!\n"
```
上述这段代码中对 `echo` 命令的调用会转向对 `printf` 命令的执行。在 Hulo 的 comptime 阶段求值后上面的代码可能会变成：

```hulo
printf "Hello World!\n"
```

::: note
不要小看这一转换的含金量，为了实现命令的抽象 Hulo 引入了大量的概念，这一切都是值得的。
:::

让我们来看一个更复杂的案例：

```hulo
use grep = If<$os == "windows", find & findstr, If<$os == "posix", grep, null>>;
```

如果系统在 windows 下会采用 `find` 和 `findstr` 去实现 `grep`，在 posix 系统下则直接使用。对于超出这个范围的系统上，grep 命令为 null 值，即没有任何实现类，在编译的时候将抛出异常。