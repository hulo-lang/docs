---
title: Guide
icon: lightbulb
date: 2025-04-13
category: guide
license: MIT
---

```component VPBanner
title: Step-by-Step Tutorial
content: Welcome to the world of Hulo programming language! This tutorial is designed for beginners. If you already have programming experience, you can jump directly to the <i>Grammar</i> section.
background: url("https://theme-hope-assets.vuejs.press/bg/10-light.svg")
actions:
  - text: View Grammar
    link: ../grammar/
```

Welcome to the Hulo programming language documentation! 🎉

Hulo is a cross-platform scripting language that compiles your code into scripts for multiple target platforms, including Bash, PowerShell, VBScript, and more.

## Quick Start

Here's a simple Hello World example:

```hulo title="main.hl"
echo "Hello World"
```

Run `hulo main.hl`, and it will compile to:

### Bash Version
```sh
echo "Hello World"
```

### VBScript Version
```vb
Set shell = CreateObject("WScript.Shell")
shell.Exec("cmd.exe /c echo ""Hello, World!""")
```

### PowerShell Version
```powershell
Write-Host "Hello World"
```

## Key Features

- **Cross-platform compilation**: Write once, run anywhere
- **Easy to learn**: Simple syntax with low learning curve
- **Rich standard library**: Built-in utilities and functions
- **Type system**: Compile-time static type checking for safety and efficiency

## Next Steps

- [Install Hulo](./install.md) - Learn how to install and configure
- [Environment Variables](./env.md) - Configure your development environment
- [Grammar Reference](../grammar/) - Deep dive into language features
- [Standard Library](../libs/) - Explore built-in functionality

More platforms and target languages will be supported in future releases!
