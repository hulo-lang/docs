---
title: Usage
icon: rocket
date: 2025-07-20
category: guide
tag:
    - usage
    - development
license: MIT
---

## Basic Usage

### Create Your First Hulo Program

Create a file named `hello.hl`:

```hulo title="hello.hl"
echo "Hello, Hulo!"
```

### Compile and Run

```bash
# Compile to Bash script
hulo hello.hl -t bash

# Compile to PowerShell script
hulo hello.hl -t powershell

# Compile to VBScript
hulo hello.hl -t vbs

# Run directly (defaults to current platform script)
hulo hello.hl
```

## Command Line Options

```bash
hulo [options] <file>

Options:
  -t, --target <platform>  Specify target platform (bash|powershell|vbs)
  -o, --output <file>      Specify output file
  -V, --version           Show version information
  -h, --help             Show help information
  --verbose              Show detailed compilation information
```

## Project Structure

A typical Hulo project structure:

```
my-project/
├── src/
│   ├── main.hl         # Main program entry
│   ├── utils.hl        # Utility functions
│   └── config.hl       # Configuration files
├── tests/
│   └── test.hl         # Test files
├── dist/               # Compiled output directory
└── huloc.yaml         # Project configuration file
```

## Project Configuration

Create a `huloc.yaml` configuration file:

```yaml
main: main.hl # Main program entry point
targets: # Platforms to compile to
    - vbs
    - bash
out_dir: dist/ # Output path after compilation
```

## Development Workflow

### 1. Write Code

```hulo title="src/main.hl"
import "utils"

fn main() {
    utils.greet("World")
    echo "Program execution completed!"
}
```

### 2. Compile and Test

```bash
# Compile and test
hulo src/main.hl -t bash
./dist/main.sh
```

### 3. Debug

```bash
# Enable verbose output
hulo src/main.hl --verbose

# Check syntax
hulo src/main.hl --check
```

## Best Practices

### Code Organization

- Organize related functionality into modules
- Use meaningful file names and function names
- Add appropriate comments and documentation

<!-- TODO This syntax has issues, I'll improve it later
### Error Handling

```hulo
fn safe_operation() {
    if file_exists("config.txt") {
        // Execute operation
    } else {
        echo "Error: Configuration file not found"
        exit(1)
    }
}
```

### Platform Compatibility

```hulo
// Use conditional compilation to handle platform differences
#if target == "windows"
    echo "Windows platform specific code"
#else
    echo "Unix platform specific code"
#endif
```
-->

## Development Integration

### Editor Support

- **VS Code**: Install Hulo extension for syntax highlighting and IntelliSense
- **Vim/Neovim**: Configure syntax highlighting and auto-completion
- **Other editors**: Support for generic syntax highlighting

### Version Control

```bash
# Initialize Git repository
git init

# Add .gitignore
echo "dist/" >> .gitignore
echo "*.log" >> .gitignore

# Commit code
git add .
git commit -m "Initial commit"
```

## Deployment

### Local Deployment

```bash
# Compile production version
hulo src/main.hl -t bash -o dist/app.sh

# Set execution permissions
chmod +x dist/app.sh
```

### Cross-platform Distribution

```bash
# Compile for multiple platforms
hulo src/main.hl -t bash -o dist/app.sh
hulo src/main.hl -t powershell -o dist/app.ps1
hulo src/main.hl -t vbs -o dist/app.vbs
```

## Frequently Asked Questions

### Q: How to specify a custom output directory?
A: Use the `-o` option: `hulo main.hl -o /path/to/output/script.sh`

### Q: Which target platforms are supported?
A: Currently supports Bash, PowerShell, VBScript, with more platforms under development.

### Q: How to handle dependency management?
A: Use the `huloc.yaml` configuration file to manage project dependencies and build settings.

### Q: How to debug compilation errors?
A: Use the `--verbose` option to get detailed compilation information.