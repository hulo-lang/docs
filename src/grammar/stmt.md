---
title: Statements
icon: fas fa-scroll
date: 2025-04-13
category: grammar
tag: 
    - stmt
license: MIT
---

> `Statements` are the basic syntax units in the Hulo language used for **executing operations**, including variable declarations, type definitions, scope control, comments, etc. Statements do not produce values, but rather execute specific actions, such as defining variables, declaring types, controlling program flow, etc. Statements are the foundation for building program structures, and by combining different statement types, complete program logic and functional modules can be constructed.

## Comment

::: tip 
In Hulo, comments are preserved after compilation and converted to the corresponding comment format of the target language. This is particularly useful for preserving documentation information, debugging assistance, or generating target code with comments. If you want the generated code to be more concise, you can also disable comment output by setting `disableComment = true`.
:::

### Line Comment

Single-line comments start with `//` and are suitable for adding brief explanations:
```hulo
let x = 42  // Define an integer variable x
```

### Block Comment

Multi-line comments are wrapped with `/** ... */` and can contain more complex, formatted annotation descriptions. Suitable for function descriptions, configuration explanations, module documentation, etc.:

```hulo
/**
 * Initialize program
 * Here we configure the environment and startup process
 */
fn init() {
    // TODO: Implementation details
}
```

### Build Directive Comments

Hulo supports passing build directives through specially formatted comments, such as target platform, compilation options, etc. These comments start with `// @hulo-build`, and the keywords and parameters that follow will be parsed by the compiler rather than treated as ordinary comments.
```hulo
// @hulo-build bash
```

The above statement instructs the Hulo compiler to use Bash as the target platform for building in the current file. This is very useful when cross-platform support is needed, allowing you to write differentiated logic or configuration for different platforms without affecting the structure of the main code.

In many cases, simply specifying the target platform is not sufficient to meet more granular control requirements. Therefore, Hulo also supports attaching parameters to build directives to achieve more flexible build behavior:
```hulo
// @hulo-build bash@4.0 --path /bin/bash
```

In the example above, `bash@4.0` specifies the target platform and its version, while `--path /bin/bash` is passed as a build parameter to the backend tool for adjusting generation logic or path configuration. This approach can be used for platform difference adaptation, multi-version support, plugin switching, and other advanced usage scenarios.


## Scope

### let

* Scope range: Only valid within the `{}` block where it is declared
* Reassignment: Allowed
* Redeclaration: Forbidden (within the same scope)
```hulo
{
  let a = 10
  echo $a // 
  $a = 20
}

echo $a // null
```

### var

* Scope range: Spans all code blocks until the end of the file/function
* Reassignment: Allowed
* Redeclaration: Allowed (will override the previous value)
```hulo
{
  var a = 10
  echo $a // 10
  $a = 20
}

echo $a // 20
```

### const

* Scope range: Same as `let`, only valid within the declaration block
* Reassignment: Forbidden
* Redeclaration: Forbidden
```hulo
{
  const a = 10
  echo $a // 10
  $a = 20 // Error
}

echo $a // null
```

## type

::: tip
The type system in Hulo is similar to `Typescript`. This system is primarily introduced to achieve abstraction of commands. In addition to the `type` keyword, the `use` keyword also supports the corresponding type system. We will elaborate on `use` in the command chapter.
:::

### Type Alias
```hulo
type int = num
type float = num

let i: int = 1
const PI: float = 3.14
```

### Union Types
```hulo
type A = num | str | bool
type B = num & str

type Protocal = 'tcp' | 'udp'

type User = { name: str, age: num }

type Function<T, R> = (arg: T) => R;

// Inherit interface
type Releaser = { Package.install, Package.init  }
```

### Basic Composite Types

**never**
`never` is a special type in the type system that represents **values that are never reachable or operations that never return**.

* Exclude certain cases in type operations
```hulo
type NonNull<T> = T extends null ? never : T
```

* Represent impossible branches
```hulo
type Shape = Circle | Square
fn getArea(s: Shape): num {
    if (s is Circle) {
        return s.radius * s.radius * 3.14
    } else if (s is Square) {
        return s.size * s.size
    } else {
        // Here s is of type never
        // Indicates all possible cases have been handled
    }
}
```

**[key in T]**

Iterate over `T` itself (requires `T` to be a union type), generating a new type with keys from `T` members.

```hulo
type Protocal = 'udp' | 'tcp'
```
For iteration over `Protocal`, we will get the keys `udp`, `tcp` in sequence:
```hulo
type ProtocalNo = {
  [K in Protocal]: num
}
/* Result:
type ProtocalNo {
  udp: num
  tcp: num
}
*/
```

**[key in keyof T]**

Iterate over all **property names (keys)** of type `T`, generating a new mapped type.

```hulo
class User {
  name: str
  age: num
}
```
For the `User` type, all property names iterated are `name`, `age`
```hulo
type UserClone<T extends User> = {
  [K in keyof T]: T[K]
}
/* Result:
type UserClone {
  name: str
  age: num
}
*/
```

**T[K]**

Get the type of the corresponding property in type `T` through key name `K`.

```hulo
type User = {
  name: str
  age: num
}

type NameType = User["name"]  // str

type AgeType = User["age"]   // num
```
::: tip
* `K` must be a known key name (or union key name) of `T`
* Supports nested access (such as `T["a"]["b"]`)
:::

**extends**

Used for conditional constraints or inheritance of types.

* Generic constraints
```hulo
// Ensure T must contain id property
type WithId<T extends { id: str }> = T

// Valid
type Valid = WithId<{ id: "123", name: str }>

// Invalid (missing id)
type Invalid = WithId<{ name: str }>
```

* Conditional judgment
```hulo
// If T is num then return str, otherwise return bool
type TypeCheck<T> = T extends num ? str : bool

type A = TypeCheck<10>     // str
type B = TypeCheck<"hello"> // bool
```

::: tip
In Hulo, the `extends` keyword is also used for class inheritance
:::

### ValueOf

**Type signature:**
```hulo
type ValueOf<T> = T[keyof T]
```

**Example:**
```hulo
class Foo {
  a: num
  b: str
}

type FooValues = ValueOf<Foo> // num | str
```

### Readonly

Make all properties of `T` read-only.

**Type signature:**

```hulo
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

**Example:**
```hulo
class Config {
  timeout: num
}
type ImmutableConfig = Readonly<Config>  // { readonly timeout: num }
```

### Partial

`Partial<T>` is a **utility type** used to make all properties of type `T` **optional properties**. It is particularly suitable for scenarios that need to handle partial updates of objects.

**Type signature:**
```hulo
type Partial<T> = {
  [P in keyof T]?: T[p] // Mark each property P of T as optional
}
```

**Example:**
```hulo
class User {
  name: str
  age: num
}

type PartialUser = Partial<User> // { name?: str, age?: num }
```

### Pick

Select a set of properties `K` from type `T` to form a new type.

**Type signature:**
```hulo
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

**Example:**
```hulo
class User {
  id: str
  name: str
  age: num
  email: str
}

type UserBasicInfo = Pick<User, "id" | "name">
/* Result:
type UserBasicInfo = {
  id: str
  name: str
}
*/
```

### Exclude

Exclude types assignable to `U` from type `T`.

**Type signature:**
```hulo
type Exclude<T, U> = T extends U ? never : T
```

**Example:**
```hulo
type Allowed = num | str | bool
type NoStrings = Exclude<Allowed, str>  // num | bool
```

### Omit

Exclude a set of properties `K` from type `T` to form a new type.

**Type signature:**
```hulo
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

**Example:**
```hulo
// Exclude sensitive fields
type SafeUser = Omit<User, "email" | "id">
/* Result:
type SafeUser = {
  name: str
  age: num
}
*/
```

### If

Implement conditional logic in the type system, similar to ternary expressions but operating at the type level.

**Type signature:**
```hulo
type If<Condition, Then, Else> = Condition extends true ? Then : Else
```

**Example:**
```hulo
type IsNumber<T> = T extends num ? true : false
type Result = If<IsNumber<str>, "Yes", "No">  // "No"

type Status = "success" | "error"
type Message<T> = If<
  T extends "success", 
  { code: 200 }, 
  { code: 500 }
>

type TypeChecker<T> = 
    T extends str ? "string" :
    T extends num ? "number" :
    T extends bool ? "boolean" :
    "null";

type A = TypeChecker<str>;  // "string"
type B = TypeChecker<num>;  // "number"
type C = TypeChecker<bool>; // "boolean"
type D = TypeChecker<null>; // "null"
```

### Merge

Merge properties of two types `T` and `U`, where properties with the same name in `U` will override those in `T`.

**Type signature:**
```hulo
type Merge<T, U> = {
  [K in keyof T | keyof U]:
    K extends keyof U ? U[K] :
    K extends keyof T ? T[K] :
    never
}
```

**Example:**
```hulo
type A = { name: str; age: num }
type B = { age: str; email: str }

type C = Merge<A, B>
/* Result:
{
  name: str
  age: str  // Overridden by B
  email: str
}
*/
```

### Diff

Find properties that exist in `T` but not in `U`.

**Type signature:**
```hulo
type Diff<T, U> = {
  [K in Exclude<keyof T, keyof U>]: T[K]
}
```

**Example:**
```hulo
type User = { id: str; name: str; age: num }
type UpdatedUser = { id: str; name: str }

type ChangedFields = Diff<User, UpdatedUser>
/* Result:
{
  age: num  // Only User has this
}
*/
```

### Mutable

Make all `readonly` properties of type `T` mutable by removing the read-only modifier from all properties.

**Type signature:**
```hulo
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

**Example:**
```hulo
class ImmutableConfig {
  readonly timeout: num
  readonly retries: num
}

type EditableConfig = Mutable<ImmutableConfig>
/* Result:
{
  timeout: num
  retries: num
}
*/
```

### NonNullable
```hulo

```

### Exclude

## use

In the Hulo language, `use` is the core syntactic structure for command composition, forming a symmetrical design with `type`.

Before we begin, let's assume we have a command trait like this:
```hulo
@command
trait Placeholder {
  readonly a: num
  readonly b: str

  Placeholder()

  Placeholder(a)

  Placeholder(a, b)
}
```

And the following commands that implement this trait:
```hulo
impl Placeholder for Foo, Bar, Baz;
```

### Basic Usage

By default, Hulo will select the first matching implementation class as the default command.
```hulo
Placeholder -a 10 -b "abc" // Foo -a 10 -b "abc"
```

Specify command
```hulo
use Placeholder = Bar;
Placeholder -a 10 -b "abc" // Bar -a 10 -b "abc"
```

### Command Composition
```hulo
use Placeholder = Exclude<Bar, Placeholder()> & Baz

Placeholder // Baz
Placeholder -a 10 -b "abc" // Bar -a 10 -b "abc"
```

### Pattern Matching
```hulo
use Placeholder = Bar(_) & Baz
```

Matching rules:
No extension wrapper represents full matching
Parameter matching needs to be wrapped with ( ) for matching rules

(_) represents matching all possibilities with parameters
(_, _) represents matching all possibilities with two parameters
(a, b) represents matching all possibilities with parameter names a and b
(_, b) represents matching first parameter arbitrary, second parameter as b
(_, b | c) represents matching first parameter arbitrary, second parameter as b or c combination
(_, ~b) represents matching first parameter arbitrary, second parameter excluding b
(_, ~b & c) represents first parameter arbitrary, second parameter excluding b but must include c

## extension
