---
title: Trait
icon: fas fa-scale-unbalanced-flip
date: 2025-04-19
category: grammar
tag:
    - trait
license: MIT
---

> `trait` is a structure in the Hulo language used to **define class members and method signatures**, used to **specify contracts for specific behaviors or functionalities**. It is similar to traditional interfaces in object-oriented programming, but usually does not contain method implementations.

## Method Definition in Traits

Suppose we now have two types of servers, `LogService` and `GameService`, and we want them to provide a unified running interface to the outside world. At this point, we can use traits to define the common behaviors that services should have.

```hulo
trait Service {
    run() throws
}
```

In the example above, `Service` is a trait that defines the core functionality that all services should implement through the `run()` method. This method uses `throws` to indicate that it may throw exceptions, allowing specific implementations to handle errors according to their own circumstances.

By using traits, multiple different types of services (such as log services, game services, etc.) can uniformly implement the `Service` interface, making the code have consistent forms and behaviors when calling these services. This not only enhances the modular design of the system but also improves extensibility and testability.

## Implementing Traits for Types

Since traits only define what behaviors are like, we need to implement specific traits for types to define how behaviors are specifically implemented.

First, let's implement the `Service` trait for `LogService` and `GameService`:

```hulo
// Implicit implementation
class LogService {
    fn run() throws => echo "run LogService"
}

class GameService {}

// Explicit implementation
impl Service for GameService {
    fn run() throws => echo "run GameService"
}
```

The syntax for implementing traits is very similar to implementing methods for classes and enums: `impl Service for GameService`, read as "implement the `Service` trait for the `GameService` type", and then implement the specific methods of that trait within the braces of `impl`.

::: tip
For implicit declaration, you can also explicitly declare it without needing to implement it again. For example:
```hulo
impl Service for LogService, GameService;
```
:::

Next, you can call the trait's methods on this type:

```hulo
let srvs: Service[] = [LogService{}, GameService{}] 

loop $srv in $srvs {
    $srv.run()
}
```

Output:
```
run LogService
run GameService
```

## Property Definition in Traits

Like methods, traits can also define properties. These properties set the field interfaces that types implementing this trait must provide, used to specify what read-only information they should expose beyond behaviors.

In the following example, we continue to extend `Service` as an example:

```hulo {2,3}
trait Service {
    readonly port: num
    readonly name: str

    run() throws
}
```

Here we define two read-only properties: `port` represents the port the service listens on, and `name` represents the service name. These properties cannot be assigned values in the trait, but can only provide getters in the specific types that implement this trait.

Taking `GameService` as an example, implementing the newly extended behavior is as follows:

```hulo
impl Service for GameService {
    get port() => 30000
    get name() => "GameService"
}
```

Through the `get` keyword, we implement the properties defined in the trait for `GameService`. This approach allows each implementation to clearly and explicitly express its own characteristic information.

After completing the implementation, you can access these properties directly like methods, for example:

```hulo
let svc: Service = GameService()
echo $svc.name  // Output: GameService
echo $svc.port  // Output: 30000
```

This design not only unifies the interface calling form but also improves the readability and standardization of the code.

## Advanced Usage of Traits

If traits only provide definitions of some methods or properties, you might think they are just "fancy" syntactic sugar, not worth special use. But in fact, the power of traits is reflected in their ability to participate in more complex semantic combinations, such as constructors (`operator new`), operator overloading (`operator >`), etc. Let's look at a more complex and practical example.

```hulo
trait Service {
    final name: str
    final port: num

    operator new() -> Service
    operator >(other: Service) -> bool
}
```

The `final` properties here mean that once assigned, they cannot be changed. At the same time, the `Service` trait defines a constructor `operator new` and an overloaded comparison operator `>`, which allows us to unify construction logic as well as copying, comparison, and other behaviors.

For `GameService`, unlike `readonly` modifiers, since `name` and `port` are `final` fields already declared in the trait, we only need to complete initialization in the constructor.

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

The `new` constructor above provides default initialization logic for `GameService` and allows passing different service names or ports during instantiation. The operator `>` is used here as an "assignment copy" behavior, indicating copying the current object to another object of the same type.

Usage example:

```hulo
let srv: Service = new GameService("MyGameService")
let srv2: Service?

$srv > $srv2 // Implement object copying through custom operator

assert($srv, $srv2) // ok, both objects have the same content
```

Through this approach, traits are no longer just tools for interface definition; they can also carry stronger construction and behavioral logic. This not only improves code reusability but also provides powerful semantic support for designing unified service interfaces and behaviors.

### Default Implementation

Sometimes we want to provide default behaviors for certain methods or properties, allowing types that implement this trait to optionally override them. This is the purpose of "default implementation".

```hulo
trait Pingable {
    fn ping() {
        echo "default ping"
    }
}
```

If a type implements the `Pingable` trait but doesn't explicitly define the `ping` method, it will automatically use the default implementation provided in the trait.

```hulo
impl Pingable for Device {}
```

When you call:

```hulo
let dev: Pingable = new Device()
$dev.ping() // Output: default ping
```

If you want custom behavior, you can also override the default implementation:

```hulo
impl Pingable for Server {
    fn ping() {
        echo "custom ping from server"
    }
}
```

Through default implementation, we can provide "reasonable default behaviors", allowing implementers to focus only on the parts they want to change, thereby reducing code duplication.

## Trait Inheritance

In Hulo, traits also support inheritance mechanisms. A trait can inherit from other traits, thereby reusing existing definitions and behaviors. Through inheritance, we can combine multiple common capabilities in a new trait, achieving stronger abstraction and reusability.

For example, suppose we have two basic traits `Startable` and `Stoppable`, which define the capabilities of starting and stopping:

```hulo
trait Startable {
    fn start()
}

trait Stoppable {
    fn stop()
}
```

We can create a new trait `Controllable` through inheritance to represent entities that can both start and stop:

```hulo
trait Controllable: Startable, Stoppable {}
```

Any type that implements `Controllable` only needs to implement the `start` and `stop` methods to satisfy all trait requirements.

Inheritance can not only inherit method signatures but also inherit default implementations. This can effectively reduce code duplication while building a hierarchical capability system. Through compositional inheritance, Hulo provides a more flexible trait abstraction approach.

## Resolving and Overriding Trait Conflicts

When implementing multiple traits, if multiple traits define methods or properties with the same name, conflicts may arise. Hulo provides mechanisms to resolve such conflicts to ensure program behavior is clear and controllable.

When a type implements multiple traits with members of the same name, the compiler will prompt for conflicts, requiring developers to explicitly choose which implementation to adopt, or override conflicting parts through custom implementations.

For example, suppose both `Readable` and `Writable` traits define a `status()` method:

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

When a type implements both of them, you must manually specify which one to use, or provide a custom version:

```hulo
impl Readable, Writable for FileStream {
    fn status<Readable>() -> str {
        echo $super.status() // Execute default implementation first
return "file stream ready"
}

fn status<Writable>() -> str {
echo $super.status()
return "file stream ready"
    }
}
```

This approach not only eliminates conflicts but also provides more appropriate implementations based on context. Through explicit override mechanisms, Hulo avoids ambiguity issues in multiple inheritance and improves the reliability and maintainability of interface composition.

## Command Traits

In addition to standard `class` types being able to implement traits, Hulo's `cmd` types can also implement corresponding traits.

Suppose we have two commands, `echo` and `printf`, and we want to implement a common `Printable` trait for them, so that any command implementing this trait can perform text output in a unified manner.

```hulo
trait cmd Printable {
    // enable interpretation of backslash escapes
    e: bool

    Printable()
    Printable(e)
}
```

In the example above, `Printable(e)` is the constructor called when the command only passes the `-e` parameter, while `Printable()` is called when other constructor rules don't match.

## Implementing Command Traits

Like `class`, the way to implement command traits is no different.

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

Unlike traditional traits, command traits can be called directly, and the compiler will by default use the first implementation it finds as the implementation class. For example, in the following code, `Printable` will most likely end up being executed as the `echo` command.

```hulo
Printable -e "Hello World!\n"
```

Which command is used as the default implementation is not strictly defined, because in real development scenarios with multiple files and modules, there is no definite answer as to which one the compiler will scan first. Of course, you can also use the `use` keyword to explicitly specify the implementation.

```hulo
use Printable = echo // ok，echo implements Printable
use Printable = ls // error, ls does not implement the above method(s)
```

## Combining Commands to Implement Traits

Imagine a scenario where you want to use `printf` in most cases, but use `echo` only when the `-e` option is present. The syntactic sugar introduced above cannot satisfy this requirement. Therefore, Hulo introduces a command composition syntax in `use`, similar to type composition.

::: important
Some may say this scenario is an unnecessary contrivance. But imagine how the built-in `grep` command on POSIX systems can be simulated on Windows using `find` and `findstr` to cover as many cases as possible—you'll see why this requirement is important, even at the cost of increased Hulo complexity.
:::

```hulo
use Printable = Pick<echo, Printable(e)> & printf
```

::: tip
The above case is just one way to implement it. You can choose how to combine as you like. For example, you can also use `If`, `Exclude`, `Pick`, `Omit`, etc.
:::

This means that commands themselves can be extended and combined as objects, building a more flexible toolchain. With this mechanism, commands not only have their own execution capabilities, but can also participate in higher-level behavioral contracts through traits, achieving a more consistent and reusable command architecture.

## Implementing cmd

Unlike `class`, the `cmd` type can also act as a `trait`. That is, a command can be a collection of concrete behaviors or a set of abstract behaviors.

Suppose `echo` is defined as follows:

```hulo
cmd echo {
    n: bool // Do not output a trailing newline
    e: bool // Enable backslash escapes (like \n, \t, etc.)
    E: bool // Disable escapes (default behavior)
}
```

Now let's implement the `echo` trait for the `printf` command and call it:

```hulo
impl echo for printf {
    echo() {
        printf $this.args
    }
}

use echo = printf
echo -e "Hello World!\n"
```

In the code above, calling the `echo` command will be redirected to the `printf` command. After Hulo's comptime evaluation, the code may become:

```hulo
printf "Hello World!\n"
```

::: note
Don't underestimate the value of this transformation. Hulo introduces many concepts to achieve command abstraction, and it's all worth it.
:::

Let's look at a more complex example:

```hulo
use grep = If<$os == "windows", find & findstr, If<$os == "posix", grep, null>>;
```

If the system is Windows, it will use `find` and `findstr` to implement `grep`; on POSIX systems, it will use `grep` directly. On systems outside this range, the `grep` command will be `null`, meaning there is no implementation, and a compile-time error will be thrown.