---
title: Expressions
icon: fas fa-puzzle-piece
date: 2025-04-13
category: grammar
tag: 
    - expr
license: MIT
---

> `Expressions` are the basic syntax units in the Hulo language used for **computing values**, composed of operands, operators, function calls, and other elements. Expressions can produce a value, which can be numeric, string, boolean, or other types of data. Expressions are the foundation for building complex program logic, and by combining different operators and operands, various calculations and operations can be achieved.

## Arithmetic Operators
> Arithmetic operators are used to perform basic mathematical operations on numeric types.

### + Addition

The addition operator `+` is a multi-purpose operator that supports operations on different types of data. It can be used not only for numeric addition but also for string concatenation and list merging, with good versatility and intuitive semantic expression. Based on the operand types, `+` automatically infers and executes the corresponding merge or concatenation behavior.
```hulo
1 + 1 // 2
"Hello " + "World!" // "Hello World!"
[1, 2] + [3, 4] // [1, 2, 3, 4]
```

### - Subtraction

The subtraction operator `-` is used to perform subtraction operations between numeric values, with the result being the difference between two numbers. For numeric types, it performs standard mathematical subtraction operations.
```hulo
10 - 3 // 7
3.14 - 1.5 // 1.64
```

### * Multiplication

The multiplication operator `*` performs numeric multiplication calculations and is widely used in numeric types. For strings and arrays, it can also be used for repetition operations.
```hulo
5 * 3 // 15
"ha" * 3 // "hahaha"
[1, 2] * 2 // [1, 2, 1, 2]
```

### / Division

The division operator `/` performs numeric division and returns a result with decimal places. Even when dividing two integers, the result may be a floating-point number.
```hulo
10 / 2 // 5.0
7 / 3 // 2.333...
```

### % Modulo

The modulo operator `%` returns the remainder after dividing two numbers, commonly used in loops, conditionals, and other logical structures.
```hulo
10 % 3 // 1
15 % 4 // 3
```

### ** Exponentiation

The exponentiation operator `**` represents exponential operations, with the left side as the base and the right side as the exponent.
```hulo
2 ** 3 // 8
5 ** 2 // 25
```

### // Integer Division

The integer division operator `//` returns the quotient after integer division (floor division), discarding the decimal part.
```hulo
10 // 3 // 3
7 // 2 // 3
```

### ++ Increment

The increment operator `++` performs an increment operation on a variable, commonly used in counting logic. It supports both prefix and postfix forms.
```hulo
let a = 5
$a++ // Postfix increment, use value first then increment
echo $a // 6

let b = 5
++$b // Prefix increment, increment first then use value
echo $b // 6
```

### -- Decrement

The decrement operator `--` performs a decrement operation on a variable, used for reverse traversal and other scenarios. It also supports both prefix and postfix forms.
```hulo
let a = 5
$a-- // Postfix decrement
echo $a // 4

let b = 5
--$b // Prefix decrement
echo $b // 4
```

## Relational Operators
> Relational operators are used to compare two values and return a boolean value (true or false). They are widely used in conditional judgments and control flow.

### == Equality

Determines whether two values are equal. For basic types (such as num, str, bool), comparison is done by value.
```hulo
1 == 1 // true
"hi" == "hi" // true
[1, 2] == [1, 2] // true
```

### != Inequality

Determines whether two values are not equal.
```hulo
1 != 2 // true
"hi" != "hello" // true
```

### > Greater than / < Less than

Size comparison between numeric values and comparable objects:
```hulo
3 > 1 // true
2 < 5 // true
"abc" > "abb" // true (lexicographic comparison)
```

### >= Greater than or equal / <= Less than or equal

```hulo
5 >= 5 // true
2 <= 3 // true
```

### in Membership Check

When used in `if` expressions, it checks whether an element exists in a collection, string, or mapping.
```hulo
2 in [1, 2, 3] // true
"lo" in "hello" // true
"key" in {"key": 1} // true
```

## Assignment Operators

### = Basic Assignment

The basic assignment operator `=` is used to assign the value of the right-side expression to the left-side variable.
```hulo
let a = 10
let b = "hello"
```

### += Addition Assignment

The addition assignment operator `+=` adds the right-side value to the left-side variable, then assigns the result to the left-side variable.
```hulo
let a = 5
$a += 3 // Equivalent to a = a + 3
echo $a // 8

let s = "Hello"
$s += " World" // Equivalent to s = s + " World"
echo $s // "Hello World"
```

### -= Subtraction Assignment

The subtraction assignment operator `-=` subtracts the right-side value from the left-side variable, then assigns the result to the left-side variable.
```hulo
let a = 10
$a -= 3 // Equivalent to a = a - 3
echo $a // 7
```

### *= Multiplication Assignment

The multiplication assignment operator `*=` multiplies the left-side variable by the right-side value, then assigns the result to the left-side variable.
```hulo
let a = 5
$a *= 3 // Equivalent to a = a * 3
echo $a // 15
```

### /= Division Assignment

The division assignment operator `/=` divides the left-side variable by the right-side value, then assigns the result to the left-side variable.
```hulo
let a = 15
$a /= 3 // Equivalent to a = a / 3
echo $a // 5.0
```

### **= Exponentiation Assignment

The exponentiation assignment operator `**=` uses the left-side variable's value as the base and the right-side value as the exponent for exponentiation, then assigns the result to the left-side variable.
```hulo
let a = 2
$a **= 3 // Equivalent to a = a ** 3
echo $a // 8
```

### //= Integer Division Assignment

The integer division assignment operator `//=` divides the left-side variable by the right-side value (floor division), then assigns the result to the left-side variable.
```hulo
let a = 10
$a //= 3 // Equivalent to a = a // 3
echo $a // 3
```

### Bitwise Assignment

Bitwise assignment operators include `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=`, used for compound assignment of bitwise operations.
```hulo
let a = 5
$a &= 3 // Equivalent to a = a & 3
echo $a // 1

let b = 8
$b |= 2 // Equivalent to b = b | 2
echo $b // 10

let c = 4
$c <<= 2 // Equivalent to c = c << 2
echo $c // 16
```

### := Walrus Operator

The walrus operator `:=` is a syntax sugar in Hulo for declaring and assigning variables in one step. It combines the declaration of `let` with the assignment of `=`, suitable for scenarios where you want to quickly declare variables in expressions. It's commonly used in conditional expressions, loops, and other structures to make code more concise.
```hulo
$value := 10

$value = "Hello World" // Error, value is a num type variable
```

::: info
`:=` allows the Hulo language system to perform type inference during variable assignment and maintain type consistency. Unlike `any`, it doesn't break the type system.
:::

### Ternary Operator

The ternary operator `? :` is a concise conditional judgment expression with the format `condition ? value1 : value2`. When the condition is true, it returns value1, otherwise it returns value2. It's a compact alternative to `if-else` statements, commonly used for selecting results based on conditions.
```hulo
let age = 18
echo($age >= 18 ? "adult": "minor") // adult
```

### Nullish Coalescing

The nullish coalescing operator `??` is used to handle optional values that may be `null` or undefined. It allows you to provide default values for null values, thus avoiding runtime errors. `??=` is its corresponding shorthand form, which only assigns when the variable is `null`, keeping existing values unchanged. This is very practical in scenarios like initializing optional configurations, parameter defaulting, etc.
```hulo
let name: str?
echo($name ?? "default") // default

$name ??= "default"
echo(name) // default

$name ??= "hulo"
echo(name) // default
```

## Logical Operators

### && Logical AND

The logical AND operator `&&` returns true when both operands are true, otherwise returns false. It supports short-circuit evaluation.
```hulo
true && true // true
true && false // false
false && true // false
false && false // false

// Short-circuit evaluation example
let a = 5
let b = 0
$a > 0 && $b > 0 // false, second condition won't execute
```

### || Logical OR

The logical OR operator `||` returns true when at least one of the two operands is true, otherwise returns false. It also supports short-circuit evaluation.
```hulo
true || true // true
true || false // true
false || true // true
false || false // false

// Short-circuit evaluation example
let a = 5
let b = 0
$a > 0 || $b > 0 // true, second condition won't execute
```

### ! Logical NOT

The logical NOT operator `!` performs logical negation on the operand, true becomes false, false becomes true.
```hulo
!true // false
!false // true
!($a > 0) // Equivalent to a <= 0
```

## Bitwise Operators

### & Bitwise AND

The bitwise AND operator `&` performs AND operation on each bit of two operands. Only when both bits are 1 does the result become 1.
```hulo
5 & 3 // 1 (binary: 101 & 011 = 001)
```

### | Bitwise OR

The bitwise OR operator `|` performs OR operation on each bit of two operands. As long as one bit is 1, the result becomes 1.
```hulo
5 | 3 // 7 (binary: 101 | 011 = 111)
```

### ^ Bitwise XOR

The bitwise XOR operator `^` performs XOR operation on each bit of two operands. Same bits result in 0, different bits result in 1.
```hulo
5 ^ 3 // 6 (binary: 101 ^ 011 = 110)
```

### ~ Bitwise NOT

The bitwise NOT operator `~` performs negation operation on each bit of the operand, 0 becomes 1, 1 becomes 0.
```hulo
~5 // -6 (binary: ~101 = 11111111111111111111111111111010)
```

### << Left Shift

The left shift operator `<<` shifts all bits of the operand to the left by the specified number of positions, padding with 0 on the right.
```hulo
5 << 2 // 20 (binary: 101 << 2 = 10100)
```

### >> Arithmetic Right Shift

The arithmetic right shift operator `>>` shifts all bits of the operand to the right by the specified number of positions, padding with the sign bit on the left.
```hulo
-8 >> 1 // -4 (preserves sign bit)
8 >> 1 // 4
```

### >>> Logical Right Shift

The logical right shift operator `>>>` shifts all bits of the operand to the right by the specified number of positions, padding with 0 on the left.
```hulo
-8 >>> 1 // 2147483644 (doesn't preserve sign bit)
8 >>> 1 // 4
```

## Type Operators
> Type operators are used to perform type-related operations at runtime or compile time, including type checking (is), type retrieval (typeof), type conversion (as), etc. These operators provide flexible ways to check, derive, or change value types, making code more robust and controllable. They are an important component of Hulo's type system.

### typeof

`typeof` is a keyword used to get the static type of an expression at runtime. It returns a type object (such as num, str, list\<num>, etc.). This is very useful in generic programming, type derivation, unit testing, and debugging, especially suitable for scenarios that require type-based judgment or assertions.

Unlike `is`, `typeof` is used to get types, not to determine whether a value belongs to a certain type. You can compare the result of `typeof` with other type literals, or use it for dynamic type derivation.
```hulo
// Basic type checking
assert_eq(typeof 10, num)
assert_eq(typeof "hello", str)
assert_eq(typeof true, bool)

type int = num

// Variable type derivation verification
let i: int = 1
assert(typeof $i == num)

let f = 3.14
if typeof f == num {
  echo "It's a number"
}

// List type checking
let names = ["Alice", "Bob"]
assert_eq(typeof $names, list<str>)

// Nested type checking
let matrix = [[1, 2], [3, 4]]
assert(typeof $matrix == list<list<num>>)

// Function type checking
fn greet(name: str) -> str {
  return "Hello, " + $name
}

assert(typeof $greet == (str) -> str)

// Used with generics
fn print_type<T>(value: T) {
  echo "Type: ${typeof $value}"
}

print_type(123)       // Output: Type: num
print_type("hello")   // Output: Type: str
```
Using `typeof` can greatly enhance the expressive power and safety of programs in the type dimension, especially valuable when writing generic tools, validating assertions, or building type-driven logic.

### is

`is` is used to determine the type of a value at runtime. It's commonly used in conditional statements to execute different logic branches based on different data types. The syntax for type checking expressions is:
```hulo
type Boolean = bool

let value = 10

if $value is num {
  echo "The value is a number"
} else if $value is str {
  echo "The value is a string"
} else if $value is Boolean {
  echo "The value is a boolean"
} else {
  echo "The value has an unknown type"
}
```
This syntax supports matching of basic types (such as num, str, bool, etc.) as well as custom types, and is an important tool for type-safe processing. Of course, for complex type inference statements, `if-else` syntax may not be the best practice, but `match` statements can effectively improve code robustness and readability. For example:

```hulo
match $value {
  num => echo "The value is a number",
  str => echo "The value is a string",
  Boolean => echo "The value is a boolean",
  _ => echo "The value has an unknown type",
}
```

### as

`as` is a keyword in Hulo used for type conversion. It allows you to explicitly convert an expression's type to a specified target type. In scenarios with strict type system checking, this ability to convert to specific types is particularly important, as it ensures controllability and readability of code at the type level.
```hulo
let s = "Hello World" as str
```

::: warning
`as` also brings certain risks, especially when converting values to `any` type. Although this practice is common in some dynamic languages, in Hulo's type system, it bypasses compile-time type checking, which may introduce potential errors and break the type safety of programs. Correct use of `as`, especially avoiding over-reliance on `any`, is key to maintaining code robustness. This practice is not recommended:
```hulo
let obj = "Hello World" as any

$obj = 10 // Breaks the type system
```
:::

## Member Access Operators

### Member Access

The member access operator `.` is used to access object properties and methods.
```hulo
class Person {
  name: str
  age: num
  
  fn greet() -> str {
    return "Hello, I'm ${this.name}"
  }
}

let person = Person("Alice", 25)
echo $person.name // Access property
echo $person.greet() // Call method
```

### Module Access

The module access operator `::` is used to access static members of modules or classes.
```hulo
class Math {
  static PI: num = 3.14159
  
  static fn max(a: num, b: num) -> num {
    return $a > $b ? $a : $b
  }
}

echo Math::PI // Access static property
echo Math::max(10, 20) // Call static method
```

### Subscript Indexing

The subscript indexing operator `[]` is used to access elements in arrays, strings, or mappings.
```hulo
let arr = [1, 2, 3, 4, 5]
echo $arr[0] // 1

let str = "Hello"
echo $str[1] // "e"

let map = {"name": "Alice", "age": 25}
echo $map["name"] // "Alice"
```

### Function Call

The function call operator `()` is used to call functions or methods.
```hulo
fn greet(name: str) -> str {
  return "Hello, $name"
}

echo greet("Alice") // "Hello, Alice"

// Method call
let list = [1, 2, 3]
$list.push(4) // Call push method
```

### in Value Access

The `in` keyword is used to iterate over values in collections, suitable for scenarios where you only need to access element values without needing indices or keys.

```hulo
let items = [1, 2, 3]

// Used to iterate over array elements
loop $item in $items {
  echo $item // 1 2 3
}

// Iterate over string characters
let text = "Hello"
loop $char in $text {
  echo $char // H e l l o
}

// Iterate over set elements
let fruits: set<str> = {"apple", "banana", "orange"}
loop $fruit in $fruits {
  echo $fruit
}

// Iterate over mapping values
let scores: map<str, num> = {"Alice": 95, "Bob": 87}
loop $score in $scores {
  echo $score // 95 87
}
```

### of Key-Value Pair Access

The `of` keyword is used to iterate over key-value pairs in objects. Unlike `in`, `of` is specifically used to access key-value pairs in objects.

```hulo
let obj = { "name": "Alice", "age": 30 }

// Iterate over object keys
loop $key of $obj {
  echo "$key: ${obj[$key]}"  // Output: name: Alice, age: 30
}

// Iterate over object key-value pairs
loop $key, $value of $obj {
  echo "$key: $value"  // Output: name: Alice, age: 30
}

// Iterate over array indices and values
let colors = ["red", "green", "blue"]
loop $index, $color of $colors {
  echo "Color $index: $color"  // Get index and value
}

// Iterate over string characters and positions
let text = "ABC"
loop $pos, $char of $text {
  echo "Position $pos: Character $char"  // Get position and character
}
```

### Variadic Parameters

The variadic parameter operator `...` is used in function definitions to indicate acceptance of a variable number of parameters.
```hulo
fn sum(...args: num[]) -> num {
  let total = 0
  loop $arg in $args {
    $total += $arg
  }
  return $total
}

echo sum(1, 2, 3, 4, 5) // 15
```

### Spread Operator

The spread operator `...` is used to expand the contents of arrays or objects.
```hulo
let list1 = [1, 2, 3]
let list2 = [0, ...list1, 4]
echo $list2 // [0, 1, 2, 3, 4]

// Merge objects
let obj1 = {"name": "Alice"}
let obj2 = {"age": 25}
let combined = {...obj1, ...obj2}
echo $combined // {"name": "Alice", "age": 25}
```

<!-- ### Address Resolution

The address resolution operator `&` is used to get the memory address of a variable (in languages that support pointers).
```hulo
let a = 10
let ptr = &a // Get the address of variable a
``` -->

### Cascade Operator

The cascade operator `..` is used to perform consecutive operations on the same object, avoiding repeated object name references.

#### Cascade Method Calls
```hulo
$obj := MyClass() 
  ..set_name("Hulo")
  ..set_age(18)
  ..print_info()
```
Equivalent to:
```hulo
$obj := MyClass()
$obj.set_name("Hulo")
$obj.set_age(18)
$obj.print_info()
```

#### Cascade Property Modification
```hulo
$user := User()
  ..name = "Alice"
  ..age = 25
  ..email = "alice@example.com";
```
Equivalent to:
```hulo
$user = User()
$user.name = "Alice"
$user.age = 25
$user.email = "alice@example.com"
```

#### Cascade Method Calls
```hulo
$list := []
  ..push(1)
  ..push(2)
  ..push(3);
```
Equivalent to:
```hulo
$list = []
$list.push(1)
$list.push(2)
$list.push(3)
```

### Pipeline Operator

The pipeline operator `<-` is used for data flow processing, passing data from the left side to the processing function on the right side.
```hulo
$ch <- "hello"

let data <- $ch
```

### Conditional Member Access / Optional Chaining

The conditional member access operator `?.` is used to safely access members of objects that may be null.
```hulo
let name: str?
echo($name?.length) // name is null, won't call length

let person: Person?
echo($person?.name) // Safe access, returns null if person is null
```

### Compile-time Member Access

The compile-time member access operator `!` is used to access members at compile time, typically used in macros or compile-time calculations.
```hulo
println!("Hello World")
$FILE!

$name?.len!()
```

## Arrow Functions

Arrow functions are a concise syntax for function definitions, using the `=>` symbol.
```hulo
fn printf(v: any) => echo($v)

// Equivalent to
fn printf(v: any) {
  return echo($v)
}

// Arrow function with parameters
fn add(a: num, b: num) => $a + $b

// Multi-line arrow function
fn process(data: str) => {
  let result = $data.to_upper()
  return $result
}
```

## Precedence and Associativity

Operator precedence determines the execution order of operations in expressions, while associativity determines the execution order of operators with the same precedence.

### Operator Precedence (from high to low)

1. **Unary operators**: `!`, `~`, `++`, `--`, `typeof`, `&`
2. **Exponentiation**: `**`
3. **Multiplication/Division**: `*`, `/`, `//`, `%`
4. **Addition/Subtraction**: `+`, `-`
5. **Bitwise shift**: `<<`, `>>`, `>>>`
6. **Relational operators**: `<`, `<=`, `>`, `>=`
7. **Equality operators**: `==`, `!=`
8. **Bitwise operators**: `&`, `^`, `|`
9. **Logical operators**: `&&`, `||`
10. **Conditional operators**: `? :`
11. **Assignment operators**: `=`, `+=`, `-=`, `*=`, `/=`, `**=`, `//=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=`

### Associativity

- **Left associative**: Most binary operators are left associative
- **Right associative**: Assignment operators and conditional operators are right associative

```hulo
// Left associativity example
1 + 2 + 3 // Equivalent to (1 + 2) + 3

// Right associativity example
$a = $b = $c = 1 // Equivalent to a = (b = (c = 1))
```

## Expression Evaluation

Expression evaluation in Hulo follows standard mathematical and logical rules, supporting short-circuit evaluation and lazy evaluation.

### Short-circuit Evaluation

Logical operators `&&` and `||` support short-circuit evaluation, which can improve program efficiency and avoid potential errors.

```hulo
// && short-circuit evaluation
let a = 5
let b = 0
$a > 0 && $b > 0 // false, $b > 0 won't execute

// || short-circuit evaluation
let name: str?
echo($name || "default") // If name is null, return "default"
```

### Lazy Evaluation

Some expressions support lazy evaluation, calculating values only when needed.

```hulo
// Conditional expressions
let result = $condition ? expensive_function() : 0
// Only call expensive_function when condition is true
```

<!-- TODO
  Symbols used for file 2>&1 
  and & "main.exe"
  "main.exe" &
  > >> >>> file operation symbols
  -->