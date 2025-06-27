---
title: Control Flow
icon: fas fa-repeat
date: 2025-04-13
category: grammar
tag: 
    - condition
    - loop
    - try
    - defer
license: MIT
---

> `Control flow` refers to controlling the **execution order** of program logic, involving the form and state changes of data during logical processing. It determines which statements execute, when they execute, whether they repeat execution, etc.

## Conditional Statements

In Hulo, `if` is used to execute code blocks based on conditions. The syntax is concise and intuitive, supporting single branch, multi-branch (`else if`), and final `else` default branch.
::: tip
* `if` **expressions must be followed by code blocks**, and curly braces cannot be omitted.
* When **condition is true**, the corresponding branch executes; **otherwise**, continue to judge subsequent branches or enter else.
:::

### Single Branch

Single branch conditional statements are the most basic conditional control structures. When the condition is true, the code block executes; otherwise, it skips. Suitable for scenarios where code only needs to execute under specific conditions.

```hulo
let age: num = 10

if $age > 18 {
    echo "you are an adult"
}

// Conditional expressions support complex logical operations
if $age >= 18 && $age <= 65 {
    echo "working age"
}
```

### Multi-branch

Multi-branch conditional statements use `else if` and `else` to handle multiple different conditional branches. Conditions are checked in order. Once a condition is true, the corresponding branch executes, and subsequent conditions are no longer checked.

```hulo
$score := 60

if $score > 90 {
  echo "Grade: excellent"
} else if $score > 75 {
  echo "Grade: good"
} else if $score > 60 {
  echo "Grade: Pass"
} else {
  echo "Grade: fail"
}

// Nested conditional statements
if $score > 90 {
  if $score == 100 {
    echo "Perfect score!"
  } else {
    echo "Excellent but not perfect"
  }
} else {
  echo "Need improvement"
}
```

## Pattern Matching

In Hulo, `match` is used to execute different code branches based on value patterns. The syntax is flexible and powerful, supporting value matching, type assertions, tuple matching, and guard conditions, among other matching methods.
::: tip
* `match` **expressions must exhaust all possible cases**, usually requiring a default branch `_`.
* **Match in order**, the first successfully matched branch executes, and subsequent branches won't execute.
:::

### Value Matching

Value matching is the basic form of pattern matching, supporting exact value matching, range matching, and multiple matching. Use `|` to match multiple values, use `..` to match ranges, and use `_` as the default branch.

```hulo :no-line-numbers
let max = $a > $b ? $a : $b

$max = ($a > $b) ? $a : ($b > 10 ? $b : ($b > $max ? $b : $max))

match $max {
    1 => println("one!"),
    2 | 3 | 5 => println("this is prime"),  // Multiple matching
    13..19 => println($max),                // Range matching
    _ => println("default"),                // Default branch
}

// String matching
let status = "success"
match $status {
    "success" => println("Operation completed"),
    "error" => println("Operation failed"),
    "pending" => println("Operation in progress"),
    _ => println("Unknown status")
}
```

### Type Assertions

Type assertions are used to execute different logic based on the actual type of a variable. This is particularly useful when handling union types or dynamic types, allowing safe type checking and conversion.

```hulo :no-line-numbers
let a = 10

let ok: str? = () => {
    match $a {
        num => return $a.to_str(),  // If it's a numeric type, convert to string
        _ => null,                  // Other types return null
    }
}

// Handling union types
let value: num | str | bool = "hello"
match $value {
    num => println("Number: $value"),
    str => println("String: $value"),
    bool => println("Boolean: $value"),
    _ => println("Unknown type")
}
```

### Tuple Matching

Tuple matching allows pattern matching based on tuple structure and content. It supports exact matching, partial matching, and guard conditions, and can extract values from tuples into variables.

```hulo :no-line-numbers
let pair: triple<num> = (2, -3)

match $pair {
    (2, -3) => println("2, -3"),                    // Exact matching
    (x, _) if $x % 2 == 0 => println("x is even"),  // Partial matching + guard condition
    (x, y) if $x + y == 5 => println("x + y = 5"),  // Complete matching + guard condition
    _ => println("null"),                           // Default branch
}

// Nested tuple matching
let complex = ((1, 2), (3, 4))
match $complex {
    ((a, b), (c, d)) if $a + $b == $c + $d => println("Sums are equal"),
    ((x, _), (_, y)) => println("First: $x, Last: $y"),
    _ => println("No pattern matched")
}
```

### Enum Matching

Enum matching allows pattern matching based on enum types and associated values. It supports basic enums, associated value enums, and algebraic data type matching.

```hulo :no-line-numbers
// Basic enum matching
enum Status {
    Pending,
    Approved,
    Rejected
}

let status = Status::Approved
match $status {
    Status::Pending => println("Pending"),
    Status::Approved => println("Approved"),
    Status::Rejected => println("Rejected"),
    _ => println("Unknown status")
}

// Associated value enum matching
enum Protocol {
    port: num
    tcp(6),
    udp(17)
}

let protocol = Protocol::tcp(8080)
match $protocol {
    Protocol::tcp(80) => println("HTTP protocol"),
    Protocol::tcp(443) => println("HTTPS protocol"),
    Protocol::tcp(port) => println("TCP port: $port"),
    Protocol::udp(port) => println("UDP port: $port"),
    _ => println("Unknown protocol")
}

// Algebraic data type matching
enum NetworkPacket {
    TCP { src_port: num, dst_port: num },
    UDP { port: num, payload: str }
}

let packet = NetworkPacket::TCP { src_port: 1234, dst_port: 80 }
match $packet {
    NetworkPacket::TCP { src_port, dst_port } => {
        println("TCP packet: $src_port -> $dst_port")
    },
    NetworkPacket::UDP { port, payload } => {
        println("UDP packet: port $port, data: $payload")
    }
}
```

## Loop Structures

In Hulo, `loop` is used to repeatedly execute code blocks until specific termination conditions are met. The syntax is concise and efficient, supporting list iteration, numeric iteration, while loops, do...while loops, and labeled loop control, among other loop methods.
::: tip
* `loop` **supports multiple loop syntaxes**, and you can choose the appropriate loop form based on specific needs.
* **Supports label jumping**, you can use `break` and `continue` with labels to implement complex loop control.
:::

### List Iteration

Hulo provides two list iteration methods: traditional index iteration and modern iterator iteration. Index iteration is suitable for scenarios that need to access element positions, while iterator iteration is more concise and efficient.

```hulo :no-line-numbers
let arr: list<num> = [1, 3.14, 5.0, 0.7]

// Index iteration - suitable for scenarios that need to access indices
loop (let i = 0; $i < $arr.len(); $i++) {
    echo $i $arr[$i]
}

// Iterator iteration - more concise, suitable for scenarios that only need values
loop (i: num, v: num) in $arr {
    echo $i $v
}

// Using in keyword iteration - only get values
loop $item in $arr {
    echo $item
}

// Using of keyword iteration - get key-value pairs
loop ($key, $value) of $arr {
    echo "Index $key: Value $value"
}

// Iterate over strings
let text = "Hello"
loop $char in $text {
    echo $char
}

// Iterate over sets
let colors: set<str> = {"red", "green", "blue"}
loop $color in $colors {
    echo $color
}

// Iterate over mappings
let config: map<str, str> = {"host": "localhost", "port": "8080"}
loop ($key, $value) of $config {
    echo "$key = $value"
}
```

### Numeric Iteration

Numeric iteration supports specifying start value, end value, and step size, with concise and intuitive syntax. Step size can be decimal, supporting forward and reverse iteration.

```hulo
// Iterate from 1 to 5 with step size 0.1
loop $i in 1..5..0.1 {
    echo $i
}

// Reverse iteration, from 10 to 1 with step size -1
loop $i in 10..1..-1 {
    echo $i
}
```

### in and of Iteration Patterns

Hulo provides two different iteration patterns: `in` and `of`, which are suitable for different data structures and access needs.

#### in Pattern - Value Iteration

The `in` pattern is used to iterate over values in collections, suitable for scenarios where you only need to access element values without needing indices or keys.

```hulo
// Iterate over array values
let numbers = [1, 2, 3, 4, 5]
loop $num in $numbers {
    echo $num  // Only get values: 1, 2, 3, 4, 5
}

// Iterate over string characters
let message = "Hello"
loop $char in $message {
    echo $char  // Get each character: H, e, l, l, o
}

// Iterate over set elements
let fruits: set<str> = {"apple", "banana", "orange"}
loop $fruit in $fruits {
    echo $fruit  // Get each fruit name
}

// Iterate over mapping values
let scores: map<str, num> = {"Alice": 95, "Bob": 87, "Charlie": 92}
loop $score in $scores {
    echo $score  // Only get scores: 95, 87, 92
}
```

#### of Pattern - Key-Value Pair Iteration

The `of` pattern is used to iterate over key-value pairs, suitable for scenarios that need to access both keys and values simultaneously.

```hulo
// Iterate over array indices and values
let colors = ["red", "green", "blue"]
loop $index, $color of $colors {
    echo "Color $index: $color"  // Get index and value
}

// Iterate over mapping key-value pairs
let config: map<str, str> = {"host": "localhost", "port": "8080"}

loop $key of $config {
    echo $key // Get keys
}

loop $key, $value of $config {
    echo "$key = $value"  // Get keys and values
}

// Iterate over string characters and positions
let text = "ABC"
loop $pos, $char of $text {
    echo "Position $pos: Character $char"  // Get position and character
}

// Iterate over set elements and indices (if supported)
let items: set<str> = {"item1", "item2", "item3"}
loop $index, $item of $items {
    echo "Item $index: $item"
}
```

#### Pattern Selection Guide

- **Use `in`**: When you only need values, not indices or keys
- **Use `of`**: When you need to access both keys (indices) and values
- **Performance consideration**: `in` pattern is usually more efficient as it avoids the overhead of key-value pair destructuring

### while Loop

while loops are suitable for scenarios with uncertain loop counts, with conditions checked at the beginning of the loop. If the condition is false, the loop body won't execute even once.

```hulo :no-line-numbers
let cnt = 0
loop {
    $cnt++

    if ($cnt > 100) {
        break
    }
}
```

### do...while Loop

do...while loops guarantee the loop body executes at least once, with conditions checked at the end of the loop. Suitable for scenarios that need to execute first then judge.

```hulo :no-line-numbers
let cnt = 0
do {
    $cnt++
} loop ($cnt > 100)
```

### Lambda Expressions with Loops

When using loops in lambda expressions, you can use `return` statements to exit the function early and return values. This is very useful for scenarios that require complex logical calculations.

```hulo :no-line-numbers
let cnt = 0
let res: num = () => {
    loop {
        $cnt+=2

        if $cnt == 10 {
            return $cnt * 2;  // Return early and exit function
        }
    }
    return -1  // Default return value
}
```

### Label Control

Label control allows precise jump control in nested loops. `break` is used to break out of the specified label's loop, and `continue` is used to skip the current iteration and continue to the next iteration.

```hulo :no-line-numbers
L1: loop {
    println("enter l1")

    L2: loop {
        println("l2")
        break L1;  // Directly break out of L1 loop
    }

    println("exit l1")  // This line won't execute
}

// Using continue to skip current iteration
loop $i in 1..10 {
    if $i % 2 == 0 {
        continue  // Skip even numbers
    }
    echo $i  // Only print odd numbers
}
```

## Exception Handling

Hulo provides a concise and powerful exception handling mechanism, using `try`-`catch`-`finally` structure, ensuring that programs can respond gracefully when errors occur, rather than crashing and exiting. Its syntax is inspired by modern programming languages and is also suitable for error catching and resource management in script scenarios.

### Syntax Structure

```hulo
try {
    // Code that may throw exceptions
} catch (err) {
    // Logic to handle after catching exceptions
} finally {
    // Code that executes regardless of whether exceptions occur (optional)
}
```

### Basic Examples

Basic exception handling demonstrates the simplest try-catch structure. When exceptions are thrown in the code block, the program jumps to the catch block for processing, avoiding program crashes.

```hulo
try {
    throw Error("Something went wrong")
} catch (err) {
    echo "Caught error: $err"
}

// Handle potential runtime errors
try {
    let result = 10 / 0  // Division by zero error
} catch (err) {
    echo "Division error: $err"
}
```

### Structure with finally

The finally block is used to ensure that certain cleanup code executes regardless of whether exceptions occur. This is very important for resource management, file closing, connection release, and other scenarios.

```hulo
try {
    let a = 1 / 0
} catch (err) {
    echo "Caught: $err"
} finally {
    echo "Cleanup done"  // Always executes
}

// File operation example
try {
    let file = open("data.txt")
    let content = file.read()
    echo $content
} catch (err) {
    echo "File error: $err"
} finally {
    if file {
        file.close()  // Ensure file is closed
    }
}
```

### Catching Exceptions in Functions

Exceptions thrown inside functions can be caught by the calling party's try-catch block. This allows functions to focus on business logic while leaving error handling to the caller.

```hulo
fn mayFail(v: num) {
    if v < 0 {
        throw Error("Negative number not allowed")
    }
    return v
}

try {
    let result = mayFail(-1)
} catch (err) {
    echo "Error: $err"
}

// Exception handling for multiple function calls
fn validateInput(input: str) {
    if input.len() == 0 {
        throw Error("Input cannot be empty")
    }
    if input.len() > 100 {
        throw Error("Input too long")
    }
}

try {
    validateInput("")
    validateInput("very long input...")
} catch (err) {
    echo "Validation failed: $err"
}
```

### Custom Exception Types

Hulo allows throwing any type of object as an exception, but it's recommended to use the built-in `Error` type or custom structures to provide richer error information.

```hulo
// Using built-in Error type
throw Error("Invalid file path")

// Throwing strings (simple cases)
throw "Invalid file path"

// Custom exception structure
class ValidationError {
    field: str
    message: str
}

fn validateUser(name: str, age: num) {
    if $name.len() == 0 {
        throw ValidationError("name", "Name cannot be empty")
    }
    if $age < 0 || $age > 150 {
        throw ValidationError("age", "Age must be between 0 and 150")
    }
}

try {
    validateUser("", -5)
} catch (err) {
    if $err is ValidationError {
        echo "Validation error in field ${err.field}: ${err.message}"
    } else {
        echo "Unknown error: $err"
    }
}
```

### Nested Catching

Nested try-catch structures allow handling different types of exceptions at different levels, providing more fine-grained error control.

```hulo
try {
    try {
        let file = open("config.txt")
        let config = parseConfig($file.read())
        applyConfig($config)
    } catch (err) {
        if $err is FileError {
            echo "Using default configuration"
            applyDefaultConfig()
        } else {
            throw $err  // Re-throw unknown exceptions
        }
    }
} catch (err) {
    echo "Critical error: $err"
    exit 1
}
```

## Deferred Execution

> `defer` is used to register code blocks that execute when the current scope ends. Whether the function ends normally, throws an exception, or returns early through `return`, the code in `defer` is guaranteed to execute. Suitable for resource release, logging, and other scenarios.

```hulo
defer { ... }  // Deferred execution code block
```

::: tip
The execution order of deferred code is **last registered, first executed (LIFO)**.
But please note: when `exit` **forces exit, `defer` will not execute.**
:::

### Basic Usage

The basic usage of defer is to ensure cleanup code executes when the function ends, regardless of how the function ends. This is particularly important for resource management.

```hulo
fn example() {
    defer { println("Third") }   // 3. Execute last
    defer println("Second")      // 2. Execute second
    println("First")             // 1. Execute first
}
// Output: First → Second → Third

// Resource management example
fn processFile(filename: str) {
    let file = open($filename)
    defer $file.close()  // Ensure file is closed
    
    let content = $file.read()
    processContent($content)
    // Automatically call file.close() when function ends
}
```

### Execution on Early Return

Even if the function returns early, the code in defer will still execute. This ensures cleanup code always runs.

```hulo
fn example2(v: num | str) {
  defer println("return")  // Always executes

  if $v is num {
    return  // Even with early return, defer still executes
  }

  echo $v
  // defer also executes on normal end
}

// Conditional return example
fn validateAndProcess(data: str) {
    defer println("Validation completed")
    
    if $data.len() == 0 {
        defer println("Empty data detected")
        return false
    }
    
    if $data.len() > 1000 {
        defer println("Data too large")
        return false
    }
    
    processData($data)
    return true
}
```

### Deferred Execution in Exception Handling

In exception handling flow, the execution order of defer is: try block → defer block → catch block. This ensures necessary cleanup even in exceptional cases.

```hulo
try {
    let file = f"data.txt"
    defer $file.close() // Guarantee resource release
    throw Error("Oops")
} catch (e) {
    println("Caught:", e)
}
```
::: note
At this time, the exception flow execution order is `try` → `defer` → `catch`
:::

```hulo
// More complex exception handling example
fn safeOperation() {
    let resource1 = acquireResource1()
    defer $resource1.release()
    
    let resource2 = acquireResource2()
    defer $resource2.release()
    
    try {
        performOperation($resource1, $resource2)
    } catch (err) {
        println("Operation failed: $err")
        // Even if exceptions occur, both resources will be released
    }
}
```

### exit Force Exit

When using `exit` to force exit the program, the code in defer will not execute. This is because exit immediately terminates the program, skipping all cleanup code.

```hulo
defer println("shutdown")
exit 1 // shutdown won't be printed

// Compare normal exit
fn normalExit() {
    defer println("cleanup")
    return  // cleanup will be printed
}

fn forceExit() {
    defer println("cleanup")
    exit 1  // cleanup won't be printed
}
```

### Practical Application Scenarios

defer has various application scenarios in actual development, including resource management, logging, performance monitoring, etc.

```hulo
// Performance monitoring
fn expensiveOperation() {
    let start = time.now()
    defer {
        let duration = time.now() - start
        println("Operation took $duration ms")
    }
    
    // Execute expensive operation
    performExpensiveTask()
}

// Logging
fn processRequest(request: Request) {
    defer println("Request $request.id processed")
    
    if !validateRequest(request) {
        defer println("Request $request.id validation failed")
        return
    }
    
    handleRequest(request)
}
```
