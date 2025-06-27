---
title: Function
icon: fas fa-superscript
date: 2025-04-13
category: grammar
tag: 
    - func
license: MIT
---

> `Functions` are core concepts in the Hulo language, used for **encapsulating reusable code blocks**. Functions achieve code modularization and reuse by receiving parameters, executing specific logic, and returning results. Hulo supports multiple function declaration methods, including standard declarations, lambda expressions, function overloading, and closures, providing flexible choices for different programming scenarios.

## Function Declaration

In Hulo, functions are fundamental programming concepts that represent code blocks that perform specific tasks. Functions are called by name, receive parameters (input), and may return results (output). The main purpose of functions is to improve code reusability, readability, and modularity.

### Lambda Declaration

Lambda declarations provide a concise way to define functions, especially suitable for single-line functions and simple expressions.

```hulo
fn f() => println("Hello World!");

fn f() => "Hello World";

fn f(x: num) => $x * 2;

fn f(x: num, y: str) => ( $x + 10 , "sss $y s" );
```

This syntax allows for more concise declaration of single-line functions, using the `=>` arrow syntax to directly return expression results.

### Standard Declaration

Standard declarations provide complete function definition syntax, supporting multiple parameter types and complex function logic.

#### Basic Syntax

```hulo
pub fn functionName(param1: type1, param2: type2 = defaultValue) -> returnType {
    // Function body
    return result
}
```

#### Parameter Types Explained

**Positional Parameters**

Positional parameters are passed in the order they are declared and are the most basic parameter type.

```hulo
fn greet(name: str, age: num) {
    echo "Hello $name, you are $age years old"
}

greet("Alice", 25)  // Pass parameters by position
```

**Default Parameters**

You can specify default values for parameters, which are used when the parameter is not provided during the call.

```hulo
fn createUser(name: str, age: num = 18, email: str = "") {
    echo "User: $name, Age: $age, Email: $email"
}

createUser("Bob")                    // Use default age and email
createUser("Charlie", 30)            // Use default email
createUser("David", 35, "d@test.com") // Provide all parameters
```

**Variadic Parameters**

Using the `...` syntax, you can receive any number of parameters, which are processed as arrays within the function.

```hulo
fn sum(...numbers: num) -> num {
    let total = 0
    loop num in $numbers {
        $total += $num
    }
    return $total
}

echo sum(1, 2, 3, 4, 5)  // 15
echo sum(10, 20)         // 30
echo sum()               // 0
```

**Named Parameters**

Named parameters are wrapped in curly braces `{}` and support the `required` keyword to mark required parameters.

```hulo
fn configureServer(
    host: str = "localhost",
    port: num = 8080,
    {required secure: bool, timeout: num = 30}
) {
    echo "Server: $host:$port, Secure: $secure, Timeout: $timeout"
}

// Calling methods
configureServer("example.com", 443, secure: true)
configureServer(port: 9000, secure: false, timeout: 60)
configureServer(secure: true)  // Use default host and port
```

**Imperative Calling**

Hulo supports imperative calling syntax, allowing you to omit parentheses and commas for more concise code.

```hulo
fn processFile(filename: str, format: str = "txt", {required backup: bool}) {
    echo "Processing $filename with format $format, backup: $backup"
}

// Traditional calling method
processFile("data.txt", "json", backup: true)

// Imperative calling method
processFile "data.txt" "json" -backup true

// Mixed usage
processFile "config.txt" -backup false
processFile "log.txt" "csv" -backup true
```

**Imperative Calling Rules:**

1. **Positional parameters**: Pass directly in order without commas
2. **Named parameters**: Use `-` prefix, format as `-paramName value`
3. **Boolean parameters**: `-flag` means `true`, `-flag false` means `false`
4. **Variable references**: Use `$` prefix to reference variables

```hulo
fn createUser(name: str, age: num = 18, {required active: bool, role: str = "user"}) {
    echo "User: $name, Age: $age, Active: $active, Role: $role"
}

let userName = "Alice"
let userAge = 25

// Imperative calling examples
createUser $userName $userAge -active true -role "admin"
createUser "Bob" -active true
createUser "Charlie" 30 -active false -role "guest"
```

**Mixed Parameter Types**

You can combine different types of parameters in the same function.

```hulo
fn processData(
    data: str,                    // Positional parameter
    format: str = "json",         // Default parameter
    ...options: str,              // Variadic parameter
    {required validate: bool,     // Required named parameter
     encoding: str = "utf-8"}     // Optional named parameter
) {
    echo "Processing $data with format $format"
    echo "Validation: $validate, Encoding: $encoding"
    echo "Options: $options"
}

// Traditional calling examples
processData("user.json", "xml", "compress", "encrypt", validate: true)
processData("config.txt", validate: false, encoding: "ascii")

// Imperative calling examples
processData "user.json" "xml" "compress" "encrypt" -validate true
processData "config.txt" -validate false -encoding "ascii"
```

#### Function Visibility

Use the `pub` keyword to control function visibility.

```hulo
fn internalFunction() {
    // Private function, only accessible within current module
}

pub fn publicFunction() {
    // Public function, can be accessed by other modules
}
```

#### Complete Example

```hulo
import { pi } from "math"

pub fn calculateArea(
    shape: str,
    width: num,
    height: num = 0,
    ...dimensions: num,
    {required unit: str, precision: num = 2}
) -> num {
    let area = 0
    
    match $shape {
        "rectangle" => $area = $width * $height,
        "circle" => $area = $pi * $width * $width,
        "triangle" => $area = 0.5 * $width * $height,
        _ => {
            echo "Unknown shape: $shape"
            return 0
        }
    }
    
    // Apply precision
    $area = round($area, $precision)
    
    echo "Area: $area $unit"
    return $area
}

// Calling examples
calculateArea("rectangle", 10, 5, unit: "m²")
calculateArea("circle", 5, unit: "cm²", precision: 3)
calculateArea("triangle", 8, 6, unit: "in²")
```

### Return Value Types

Hulo functions support multiple return value types, including basic types, union types, and tuple types. If you need to return multiple values, you can use tuples or union types.

#### Basic Type Return Values

```hulo
fn getAge() -> num {
    return 25
}

fn getName() -> str {
    return "Alice"
}

fn isActive() -> bool {
    return true
}
```

#### Lambda Expression Return Values

Lambda expressions also support return values, but the syntax differs from traditional functions. Since lambda itself uses `=>` as an arrow, to avoid syntax conflicts, lambda return values use `:` instead of `->`.

```hulo
// Lambda expression return value syntax
fn getValue() => 42

fn add(x: num, y: num) => $x + $y

fn getUser() => ("Alice", 25)

// Lambda with return type (not recommended)
fn getAge(): num => 25

fn calculate(x: num, y: num): num => $x * $y

fn process(data: str): (bool, str) => (true, "processed: $data")
```

::: warning
Although lambda expressions support return type declarations, it is **not recommended** to use them. Since the original intention of lambda design is to simplify function declarations, if you still need to explicitly declare return types, it loses the meaning of simplification. It's recommended to let the compiler automatically infer return types.
:::

::: tip
**Syntax comparison:**
- **Traditional functions**: `fn name() -> ReturnType { ... }`
- **Lambda expressions**: `fn name() => expression` or `fn name(): ReturnType => expression`
:::

#### Union Type Return Values

Union types allow functions to return multiple possible types, especially suitable for conditional return values.

```hulo
fn getValue(condition: bool) -> num | str {
    if condition {
        return 42
    }
    return "default"
}

fn findUser(id: num) -> User | null {
    if id > 0 {
        return User("Alice", 25)
    }
    return null
}
```

#### Tuple Return Values

Using tuples, you can return multiple related values, providing structured return values.

```hulo
fn getUserInfo() -> (str, num, str) {
    return ("Alice", 30, "alice@example.com")
}

fn calculateStats(numbers: list<num>) -> (num, num, num) {
    let sum = 0
    let count = $numbers.len()
    let avg = 0
    
    loop num in $numbers {
        $sum += $num
    }
    
    if $count > 0 {
        $avg = $sum / $count
    }
    
    return ($sum, $count, $avg)
}

// Use tuple destructuring to receive multiple return values
let (name, age, email) = getUserInfo()
echo "Name: $name, Age: $age, Email: $email"

let (total, count, average) = calculateStats([1, 2, 3, 4, 5])
echo "Sum: $total, Count: $count, Average: $average"
```

#### Complex Return Value Examples

```hulo
fn processData(data: str) -> (bool, str, num) | Error {
    if $data.len() == 0 {
        return Error("Empty data")
    }
    
    let success = true
    let result = "Processed: $data"
    let count = $data.len()
    
    return ($success, $result, $count)
}

// Handle return values
match processData("test") {
    (success, result, count) => {
        echo "Success: $success, Result: $result, Count: $count"
    },
    Error => {
        echo "Error occurred"
    }
}
```

### Compile-time Functions

Compile-time functions execute during the compilation phase rather than at runtime. They are declared using the `comptime` keyword and can be called using the `!` operator or directly within `comptime` blocks.

#### Basic Usage

```hulo
comptime fn my_print(msg: str) {
    println!($msg)
}

comptime fn get_version() -> str {
    return "1.0.0"
}

// Use ! operator to call compile-time functions
my_print!("Hello from compile time")
echo "Version: ${get_version!()}"
```

#### comptime Block Calls

Within `comptime` blocks, you can directly call compile-time functions without using the `!` operator.

```hulo
comptime fn setup_constants() {
    let PI = 3.14159
    let E = 2.71828
    println!("Constants initialized")
}

comptime fn get_config() -> str {
    return "production"
}

// Call compile-time functions in comptime block
comptime {
    setup_constants()  // Direct call, no ! needed
    let env = get_config()  // Direct call, no ! needed
    println!("Environment: $env")
}
```

#### Compile-time Calculations

```hulo
comptime fn calculate_constants() {
    let PI = 3.14159
    let E = 2.71828
    let GOLDEN_RATIO = 1.61803
    
    println!("PI: $PI")
    println!("E: $E")
    println!("Golden Ratio: $GOLDEN_RATIO")
}

// Execute at compile time
calculate_constants!()
```

#### Compile-time Conditions

```hulo
comptime fn setup_environment(env: str) {
    match $env {
        "development" => {
            println!("Setting up development environment")
            // Set development environment configuration
        },
        "production" => {
            println!("Setting up production environment")
            // Set production environment configuration
        },
        _ => {
            println!("Unknown environment: $env")
        }
    }
}

setup_environment!("development")
```

#### Complex Compile-time Logic

```hulo
comptime fn generate_config(env: str, debug: bool) {
    let config = {
        "environment": $env,
        "debug": $debug,
        "version": "1.0.0"
    }
    
    if $debug {
        $config["log_level"] = "debug"
        $config["verbose"] = true
    }
    
    println!("Generated config: $config")
}

// Execute complex logic in comptime block
comptime {
    let is_debug = true
    let environment = "development"
    
    generate_config($environment, $is_debug)
    
    if $is_debug {
        println!("Debug mode enabled")
    }
}
```

Compile-time functions execute before being converted to target code. There are two calling methods:
- **Using `!` operator**: `function!()` or `function!(args)`
- **In `comptime` block**: Direct call without `!` operator

Compile-time functions are commonly used for:
- Configuration generation
- Constant calculations
- Environment setup
- Code generation

## Function Overloading

> **Function overloading** refers to defining multiple functions with the same name but different implementations in the same scope, distinguished by the number, type, or order of parameters. The compiler determines which specific function to call based on the characteristics of the parameters (number, type, or order) when the function is called. The main purpose of function overloading is to enhance code flexibility and readability.

### Basic Overloading

Basic overloading demonstrates how to overload functions based on different parameter types.

```hulo
fn f(s: str) => echo($s)

fn f(i: num) => echo $i

f("hello world")  // Call str version
f(3.14)           // Call num version
```

### Parameter Count Overloading

You can overload functions based on different parameter counts.

```hulo
fn greet() => echo("Hello, World!")

fn greet(name: str) => echo("Hello, $name!")

fn greet(name: str, title: str) => echo("Hello, $title $name!")

greet()                    // "Hello, World!"
greet("Alice")             // "Hello, Alice!"
greet("Bob", "Dr.")        // "Hello, Dr. Bob!"
```

### Type Overloading

You can overload functions based on different parameter types, including union types and custom types.

```hulo
fn process(s: str | num) => echo("Processing: $s")

fn process(s: bool) => echo("Boolean: $s")

class User {
    name: str
    age: num
}

fn process(user: User) => echo("User: ${user.name}, Age: ${user.age}")

// Calling examples
process("text")            // Call str | num version
process(42)                // Call str | num version
process(true)              // Call bool version
process(User("Alice", 25)) // Call User version
```

### Complex Overloading Examples

```hulo
fn calculate(a: num, b: num) -> num => $a + $b

fn calculate(a: str, b: str) -> str => "$a$b"

fn calculate(a: num, b: num, c: num) -> num => $a + $b + $c

fn calculate(a: list<num>) -> num {
    let sum = 0
    loop num in $a {
        $sum += $num
    }
    return $sum
}

// Calling examples
echo calculate(5, 3)           // 8
echo calculate("Hello", "World") // "HelloWorld"
echo calculate(1, 2, 3)        // 6
echo calculate([1, 2, 3, 4, 5]) // 15
```

### Overloading Rules and Limitations

**Allowed overloading:**
- Different parameter counts
- Different parameter types
- Different parameter orders

**Not allowed overloading:**
- Only return types differ
- Only parameter names differ

```hulo
// ❌ Error: Only return types differ
fn f(s: str) => "abc"
fn f(i: num) => 10

// ❌ Error: Only parameter names differ
fn f(name: str) => echo($name)
fn f(title: str) => echo($title)

// ✅ Correct: Different parameter types
fn f(s: str) => echo($s)
fn f(i: num) => echo($i)
```

## Closures

> **Closures** are a bundle of a function with its lexical environment (variable scope) at the time of definition. This allows the function to access variables in that scope even when executed outside the original scope. Closures are commonly used for data encapsulation, callback functions, and factory functions.
> Simply put, closures allow functions to "remember" the environment in which they were created.

::: warning
Due to Hulo's compile-time interpretation and runtime translation architecture, closure functionality in target languages may be limited. Compile-time closures can be fully supported, but runtime closure functionality may vary due to target language characteristics.
:::

### Basic Closures

```hulo
fn createCounter() -> fn() -> num {
    let count = 0
    return fn() -> num {
        $count++
        return $count
    }
}

let counter = createCounter()
echo counter()  // 1
echo counter()  // 2
echo counter()  // 3
```

### Closures with Parameters

```hulo
fn createMultiplier(factor: num) -> fn(num) -> num {
    return fn(x: num) -> num {
        return $x * $factor
    }
}

let double = createMultiplier(2)
let triple = createMultiplier(3)

echo double(5)  // 10
echo triple(5)  // 15
```

### Closures as Callbacks

```hulo
fn processNumbers(numbers: list<num>, callback: fn(num) -> num) -> list<num> {
    let result: list<num> = []
    loop num in $numbers {
        $result.push(callback($num))
    }
    return $result
}

let numbers = [1, 2, 3, 4, 5]

// Use closures as callbacks
let doubled = processNumbers($numbers, fn(x: num) -> num => $x * 2)
let squared = processNumbers($numbers, fn(x: num) -> num => $x * $x)

echo $doubled  // [2, 4, 6, 8, 10]
echo $squared  // [1, 4, 9, 16, 25]
```

### Closures Capturing External Variables

```hulo
fn createGreeter(greeting: str) -> fn(str) -> str {
    return fn(name: str) -> str {
        return "$greeting, $name!"  // Capture external greeting variable
    }
}

let helloGreeter = createGreeter("Hello")
let hiGreeter = createGreeter("Hi")

echo helloGreeter("Alice")  // "Hello, Alice!"
echo hiGreeter("Bob")       // "Hi, Bob!"
```

### Practical Applications of Closures

```hulo
// Configuration manager
fn createConfigManager(defaultConfig: map<str, any>) -> (fn(str, any), fn(str) -> any) {
    let config = $defaultConfig
    
    let setConfig = fn(key: str, value: any) {
        $config[$key] = $value
    }
    
    let getConfig = fn(key: str) -> any {
        return $config[$key]
    }
    
    return ($setConfig, $getConfig)
}

let (setConfig, getConfig) = createConfigManager({"theme": "dark", "language": "en"})

setConfig("theme", "light")
setConfig("fontSize", 14)

echo getConfig("theme")     // "light"
echo getConfig("fontSize")  // 14
echo getConfig("language")  // "en"
```

### Closure Characteristics

**Advantages:**
- Data encapsulation and privacy protection
- State preservation
- Functional programming support
- Callback function implementation

**Considerations:**
- Memory usage: Closures maintain references to captured variables
- Performance considerations: Overuse of closures may affect performance
- Debugging complexity: Closures may make debugging more complex