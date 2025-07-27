---
title: Environment Setup
icon: wrench
date: 2025-07-27
category: architecture
tag:
    - install
    - go
    - antlr
    - development
license: MIT
---

## Required Software

### 1. Go 1.24.4+

Since Hulo is written in Go, the code in this tutorial is primarily in Go. You need to ensure the same development environment as Hulo:

```bash
# Download URL
https://golang.org/dl/

# Verify installation
go version
# Should display: go version go1.24.4 ...
```

### 2. Java 11+

ANTLR is written in Java, so you must have Java 11+ or higher installed before installing ANTLR.

```bash
# Verify installation
java -version
# Should display Java version information
```

### 3. ANTLR4 4.13.2

Reference [Getting Started with ANTLR v4](https://github.com/antlr/antlr4/blob/master/doc/getting-started.md) for download:
```bash
curl -O https://www.antlr.org/download/antlr-4.13.2-complete.jar
```

In addition to the above installation method, you can also install through Python3's pip package manager, which will automatically help you install ANTLR and the Java environment needed to run it.

```bash
pip install antlr4-tools
```

This command creates antlr4 and antlr4-parse executables that, if necessary, will download and install Java 11 plus the latest ANTLR jar:

```bash
$ antlr4 
Downloading antlr4-4.13.2-complete.jar
ANTLR tool needs Java to run; install Java JRE 11 yes/no (default yes)? y
Installed Java in /Users/parrt/.jre/jdk-11.0.15+10-jre; remove that dir to uninstall
ANTLR Parser Generator  Version 4.13.2
 -o ___              specify output directory where all output is generated
 -lib ___            specify location of grammars, tokens files
...
```

## Development Tools

### VS Code Extensions
- **Go Extension**: `golang.go`
- **ANTLR4 Extension**: `mike-lischke.vscode-antlr4` (version 2.4.7)

### Installation Commands
```bash
# VS Code extension installation
code --install-extension golang.go
code --install-extension mike-lischke.vscode-antlr4
```

## Environment Verification

```bash
# Check Go
go version

# Check Java
java -version

# Check ANTLR4
java -jar ./antlr.jar
```

## Common Issues

### Q: ANTLR4 command not found?
A: Check environment variables and alias settings, ensure `antlr-4.13.2-complete.jar` is in the correct path.

### Q: Java version incompatible?
A: Ensure you're using Java 8 or higher, Java 11 is recommended.

### Q: Go module download failed?
A: Use proxy:
```bash
go env -w GOPROXY=https://goproxy.cn,direct
```