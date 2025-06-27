---
title: Generics
icon: fas fa-layer-group
date: 2025-04-19
category: grammar
tag: 
    - generics
license: MIT
---

> `Generics` is a mechanism in programming languages used to implement **type parameterization**, allowing developers to write program components without pre-specifying concrete data types, but rather specifying types when actually using them. It is an abstraction capability that enables functions, types, interfaces, structs, or classes to introduce one or more type parameters when defined. These type parameters act as placeholders for actual types within the component, and are only replaced with concrete types when the component is instantiated or called.

In Hulo, classes/functions/interfaces can have type parameters, for example:
```hulo :no-line-numbers
class Box<T> {
    value: T

    Box($this.value)
}

let box: Box<num> = Box<num>(3.14)
```
However, if type parameters can be inferred, for example from constructor parameters or other means, the type parameters can be omitted:
```hulo :no-line-numbers
let box = Box(3.14)
```

## Generic Functions

Generic functions allow you to write functions that can handle multiple data types without writing duplicate code for each type. Type parameters are automatically inferred from the arguments passed during function calls, or can be explicitly specified.

### Basic Generic Functions

```hulo
// Simple generic function
fn identity<T>(value: T) -> T {
    return $value
}

// Using automatic type inference
let num = identity(42)        // Inferred as num
let str = identity("hello")   // Inferred as str
let bool = identity(true)     // Inferred as bool

// Explicitly specifying type parameters
let explicit = identity<num>(42)
```

### Multi-Parameter Generic Functions

```hulo
// Two parameters of the same type
fn add<T>(a: T, b: T) -> T {
    return $a + $b
}

// Two parameters of different types
fn pair<T, U>(first: T, second: U) -> [T, U] {
    return [$first, $second]
}

// Usage examples
let sum = add(10, 20)                    // Automatically inferred as num
let concat = add("Hello", "World")       // Automatically inferred as str
let tuple = pair("age", 25)              // Inferred as [str, num]
```

### Generic Functions with Operator Overloading

```hulo
// Define generic function supporting addition
fn sum<T>(a: T, b: T) -> T {
    return $a + $b
}

// Add operator overloading for custom types
class Vector {
    x: num
    y: num
    
    Vector($this.x, $this.y)
    
    operator +(other: Vector) -> Vector {
        return Vector($this.x + $other.x, $this.y + $other.y)
    }
}

// Now can be used with custom types
let v1 = Vector(1, 2)
let v2 = Vector(3, 4)
let v3 = sum($v1, $v2)  // Automatically uses Vector's + operator
```

::: tip
* Type parameters `<T>` are declared after the function name in generic functions
* Type parameters can be used in parameter lists, return types, and function bodies
* The compiler automatically infers type parameters based on passed arguments
* Type parameters can also be explicitly specified: `identity<num>(42)`
* Multiple type parameters are supported: `fn process<T, U, V>(...)`
:::

## Generic Classes

Generic classes allow you to create classes that can handle multiple data types. The class is instantiated with specific type parameters, making all properties and methods within the class use this type.

### Basic Generic Classes

```hulo
// Simple generic container class
class Box<T> {
    value: T
    
    Box($this.value)
    
    fn getValue(): T => $this.value
    
    fn setValue(value: T) {
        $this.value = $value
    }
}

// Usage examples
let numBox = Box<num>(42)
let strBox = Box<str>("Hello")
let boolBox = Box<bool>(true)

echo $numBox.getValue()   // 42
echo $strBox.getValue()   // "Hello"
```

### Multi-Type Parameter Classes

```hulo
// Key-value pair class
class Pair<K, V> {
    key: K
    value: V
    
    Pair($this.key, $this.value)
    
    fn getKey(): K => $this.key
    
    fn getValue(): V => $this.value
    
    fn setValue(value: V) {
        $this.value = $value
    }
}

// Usage examples
let userPair = Pair<str, num>("age", 25)
let configPair = Pair<str, bool>("enabled", true)

echo $userPair.getKey()     // "age"
echo $userPair.getValue()   // 25
```

### Generic Classes with Constraints

```hulo
// Generic class with constraints
class SortedList<T extends Comparable<T>> {
    items: T[] = []
    
    fn add(item: T) {
        $this.items.push($item)
        $this.items.sort()
    }
    
    fn get(index: num): T => $this.items[index]
    
    fn size(): num => $this.items.length()
}

// Usage example (num implements Comparable)
let numbers = SortedList<num>()
$numbers.add(3)
$numbers.add(1)
$numbers.add(2)

echo $numbers.get(0)  // 1 (sorted)
```

::: tip
* Type parameters in generic classes are declared after the class name: `class Box<T>`
* Type parameters can be used in class properties, method parameters, and return types
* Type parameters can be explicitly specified during instantiation: `Box<num>(42)`
* If constructor parameters can infer the type, type parameters can be omitted: `Box(42)`
* Constraints can be used in class definitions: `class Container<T extends SomeTrait>`
:::

### Generic Class Inheritance

```hulo
// Base generic container
class Container<T> {
    value: T
    
    Container($this.value)
    
    fn get(): T => $this.value
}

// Generic class inheriting from generic class
class Box<T> extends Container<T> {
    Box(value: T) {
        super($value)
    }
    
    fn set(value: T) {
        $this.value = $value
    }
}

// Non-generic class inheriting from generic class (specifying concrete type)
class StringContainer extends Container<str> {
    StringContainer(value: str) {
        super($value)
    }
    
    fn toUpper(): str => $this.value.toUpper()
}

// Usage examples
let box = Box<num>(42)
let stringContainer = StringContainer("hello")
```

## Generic Interfaces

Generic interfaces (traits) allow you to define interfaces that can handle multiple data types. Classes implementing generic interfaces must provide concrete type parameters, or implement the generic version of the interface.

### Basic Generic Interfaces

```hulo
// Comparable interface
trait Comparable<T> {
    compare: (T) -> num  // Returns -1, 0, 1
}

// Cloneable interface
trait Cloneable<T> {
    clone: () -> T
}

// Serializable interface
trait Serializable<T> {
    serialize: () -> str
    deserialize: (str) -> T
}
```

### Implementing Generic Interfaces

```hulo
// Implement interface for concrete types
class User {
    name: str
    age: num
    
    User($this.name, $this.age)
    
    // Implement Comparable<User>
    fn compare(other: User) -> num {
        if $this.age < $other.age return -1
        if $this.age > $other.age return 1
        return 0
    }
    
    // Implement Cloneable<User>
    fn clone() -> User {
        return User($this.name, $this.age)
    }
    
    // Implement Serializable<User>
    fn serialize() -> str {
        return "{\"name\":\"${$this.name}\",\"age\":${$this.age}}"
    }
    
    fn deserialize(data: str) -> User {
        // Parse JSON and create User object
        // Simplified here
        return User("parsed", 0)
    }
}

// Explicit interface implementation
impl Comparable<User> for User {
    fn compare(other: User) -> num {
        if $this.age < $other.age return -1
        if $this.age > $other.age return 1
        return 0
    }
}

impl Cloneable<User> for User {
    fn clone() -> User {
        return User($this.name, $this.age)
    }
}

impl Serializable<User> for User {
    fn serialize() -> str {
        return "{\"name\":\"${$this.name}\",\"age\":${$this.age}}"
    }
    
    fn deserialize(data: str) -> User {
        return User("parsed", 0)
    }
}
```

### Generic Interface Composition

```hulo
// Compose multiple interfaces
type Sortable<T> = Comparable<T> & Cloneable<T>

// Function using composed interface
fn sort<T: Sortable<T>>(items: T[]) -> T[] {
    // Sorting logic
    return $items.sort()
}

// Usage example
let users: User[] = [
    User("Alice", 25),
    User("Bob", 30),
    User("Charlie", 20)
]

let sortedUsers = sort($users)
```

### Advanced Usage of Generic Interfaces

```hulo
// Factory interface
trait Factory<T> {
    create: () -> T
}

// Builder interface
trait Builder<T> {
    build: () -> T
    reset: () -> void
}

// Observer interface
trait Observer<T> {
    update: (T) -> void
}

// Observable interface
trait Observable<T> {
    addObserver: (Observer<T>) -> void
    removeObserver: (Observer<T>) -> void
    notify: (T) -> void
}

// Implementation examples
impl Factory<User> for UserFactory {
    fn create() -> User {
        return User("default", 0)
    }
}

class UserFactory {}

impl Builder<User> for UserBuilder {
    fn build() -> User {
        return User($this.name, $this.age)
    }
    
    fn reset() {
        $this.name = ""
        $this.age = 0
    }
}

class UserBuilder {
    name: str = ""
    age: num = 0
    
    fn setName(name: str) {
        $this.name = $name
    }
    
    fn setAge(age: num) {
        $this.age = $age
    }
}
```

### Default Implementations in Generic Interfaces

```hulo
// Generic interface with default implementations
trait Printable<T> {
    fn print() {
        echo "default print"
    }
    
    fn format() -> str {
        return "default format"
    }
}

// Using default implementation
impl Printable<User> for User {}

// Override default implementation
impl Printable<User> for User {
    fn print() {
        echo "User: ${$this.name}, Age: ${$this.age}"
    }
    
    fn format() -> str {
        return "User(${$this.name}, ${$this.age})"
    }
}
```

### Generic Interface Inheritance

```hulo
// Base interfaces
trait Readable<T> {
    read: () -> T
}

trait Writable<T> {
    write: (T) -> void
}

// Inherited interface
trait ReadWrite<T>: Readable<T>, Writable<T> {
    // Can add new methods
    fn clear() {
        // Default implementation
    }
}

// Implement inherited interface
impl ReadWrite<str> for FileHandler {
    fn read() -> str {
        return "file content"
    }
    
    fn write(data: str) {
        echo "writing: $data"
    }
    
    fn clear() {
        echo "clearing file"
    }
}

class FileHandler {}
```

::: tip
* Type parameters in generic interfaces are declared after the interface name: `trait Comparable<T>`
* Interface method signatures can use type parameters
* When implementing interfaces, concrete types can be specified or kept generic
* Type aliases can be used to simplify complex interface compositions: `type Sortable<T> = Comparable<T> & Cloneable<T>`
* Interface composition and inheritance are supported, providing powerful abstraction capabilities
:::

## Generic Constraints

> **Generic constraints** refer to restrictions imposed on type parameters when using generics, used to specify conditions that type parameters must satisfy. They ensure that at compile time, the passed types have certain characteristics, such as implementing an interface, inheriting from a class, having specific operations or members, etc. By setting constraints, developers can safely use syntax and operations that depend on these characteristics in generic code without explicit conversion or additional checks.

### Basic Constraint Syntax

Hulo supports multiple constraint syntaxes, including the `extends` keyword and colon syntax:

#### extends Syntax (Recommended)
```hulo
// Single constraint
fn process<T extends Addable>(item: T) -> T {
    return $item + $item
}

// Multiple constraints (intersection)
fn process<T extends Addable + Comparable>(item: T) -> T {
    if $item > 0 {
        return $item + $item
    }
    return $item
}

// Union constraints
fn process<T extends str | num>(item: T) -> T {
    return $item
}
```

#### Colon Syntax
```hulo
// Single constraint
fn process<T: Addable>(item: T) -> T {
    return $item + $item
}

// Multiple constraints (intersection)
fn process<T: Addable & Comparable>(item: T) -> T {
    if $item > 0 {
        return $item + $item
    }
    return $item
}

// Union constraints
fn process<T: str | num>(item: T) -> T {
    return $item
}
```

### Interface Constraints

The most common constraint type is using generic interfaces, requiring type parameters that implement this interface to be applied to the type.
```hulo :no-line-numbers
fn add<T extends Additive<T>>(a: T, b: T) {
    return $a + $b
}
```

As shown in the above declaration, the add function requires that both input parameters must be additive types:
```hulo :no-line-numbers
add(1, 2) // OK, num is an additive type
add(true, false) // Error, bool type cannot be added
```

### Composite Constraints

Similar to composite types in the type system, generic constraints also follow the same rules.
```hulo :no-line-numbers
fn add<T extends str | num>(a: T, b: T) => $a + $b
```

You can even apply composite type rules to generic interface constraints, for example:
```hulo :no-line-numbers
fn add<T extends Additive<T> + Comparable<T>>(a: T, b: T) => $a + $b
```

### Type Gymnastics Constraints

Hulo supports complex type gymnastics constraints, allowing type calculations and conditional judgments at compile time:

#### Conditional Constraints
```hulo
// Conditional type constraints
fn process<T extends (T extends str ? HasLength : HasValue)>(item: T) {
    if $item is str {
        echo $item.length()
    } else {
        echo $item.value()
    }
}

// Nested conditional constraints
fn safeAccess<T extends (T extends null ? never : T)>(item: T) -> T {
    return $item
}
```

#### Mapping Constraints
```hulo
// Mapping type constraints
fn processObject<T extends { [K in keyof T]: T[K] extends str ? T[K] : never }>(obj: T) {
    loop ($key, $value) of $obj {
        echo "$key: $value"
    }
}

// Readonly constraints
fn processReadonly<T extends { readonly [P in keyof T]: T[P] }>(obj: T) {
    // Process readonly objects
}
```

#### Recursive Constraints
```hulo
// Recursive type constraints
fn deepClone<T extends (T extends object ? { [K in keyof T]: T[K] } : T)>(item: T) -> T {
    if $item is object {
        // Deep clone logic
        return clone($item)
    }
    return $item
}
```

## Generic Specialization

In the above examples, we implemented the add function using generic constraints, but it doesn't support bool types or other custom types. To solve this problem, we can implement constraint extensions for specific types we want to handle, similar to function overloading.

```hulo :no-line-numbers
fn add(a: bool, b: bool) => $a & $b
```
After declaring this function overload, calls to `add(true, false)` won't throw exceptions. Of course, you can also add type parameters before the declaration to more formally tell other developers that this is a generic specialization rather than a simple function overload.

::: tip
Regardless of which two writing methods, there's no essential difference for the compiler.
:::

```hulo :no-line-numbers
fn add<T extends bool>(a: T, b: T) => $a & $b
```

### Advanced Specialization Patterns

#### Conditional Specialization
```hulo
// Specialize based on type conditions
fn process<T extends (T extends str ? HasLength : HasValue)>(item: T) {
    if $item is str {
        echo "String length: ${$item.length()}"
    } else {
        echo "Value: ${$item.value()}"
    }
}

// Specialized versions
fn process<T extends str>(item: T) {
    echo "String: $item"
}

fn process<T extends num>(item: T) {
    echo "Number: $item"
}
```

#### Constraint Combination Specialization
```hulo
// Base constraints
fn merge<T extends Addable + Comparable>(a: T, b: T) -> T {
    return $a > $b ? $a : $b
}

// Specialized version: string concatenation
fn merge<T extends str>(a: T, b: T) -> T {
    return $a + " " + $b
}

// Specialized version: array concatenation
fn merge<T extends list<any>>(a: T, b: T) -> T {
    return [...$a, ...$b]
}
```

## Generic Utility Types

Hulo provides a series of built-in generic utility types for type operations and transformations:

### Basic Utility Types
```hulo
// Optional type
type Optional<T> = T | null

// Readonly type
type Readonly<T> = { readonly [P in keyof T]: T[P] }

// Partial type
type Partial<T> = { [P in keyof T]?: T[P] }

// Required type
type Required<T> = { [P in keyof T]-?: T[P] }

// Pick type
type Pick<T, K extends keyof T> = { [P in K]: T[P] }

// Omit type
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

### Advanced Utility Types
```hulo
// Conditional type
type If<C extends bool, T, F> = C extends true ? T : F

// Non-nullable type
type NonNullable<T> = T extends null | undefined ? never : T

// Function parameter type
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never

// Function return type
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never

// Constructor parameter type
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never

// Instance type
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : never
```

## Generic Best Practices

### Constraint Design Principles
```hulo
// ✅ Good constraints: clear and minimal
fn sort<T extends Comparable<T>>(items: T[]) -> T[] {
    // Only needs comparison capability
}

// ❌ Bad constraints: too broad
fn sort<T>(items: T[]) -> T[] {
    // No constraints, may cause runtime errors
}

// ✅ Good constraints: combine necessary capabilities
fn process<T extends Addable<T> + Comparable<T> + Cloneable<T>>(item: T) -> T {
    // Clearly specify needed capabilities
}
```

### Type Inference Optimization
```hulo
// ✅ Leverage type inference
fn createBox<T>(value: T) -> Box<T> {
    return Box($value)
}

let box = createBox(42) // Automatically inferred as Box<num>

// ✅ Explicit type parameters (when inference is inaccurate)
let box = createBox<num>(42) // Explicitly specify type
```

### Progressive Enhancement of Generic Constraints
```hulo
// Basic version
fn process<T>(item: T) -> T {
    return $item
}

// Enhanced version: add constraints
fn process<T extends Cloneable<T>>(item: T) -> T {
    return $item.clone()
}

// Further enhancement: more constraints
fn process<T extends Cloneable<T> + Comparable<T>>(item: T) -> T {
    let cloned = $item.clone()
    return $cloned > $item ? $cloned : $item
}
```