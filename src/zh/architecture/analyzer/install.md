---
title: 环境准备
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

## 必需软件

### 1. Go 1.24.4+

由于 Hulo 采用Go语言编写，所以本次的教程所写的代码都以Go为主。你需要确保同 Hulo 一样的开发环境：
```bash
# 下载地址
https://golang.org/dl/

# 验证安装
go version
# 应该显示：go version go1.24.4 ...
```

### 2. Java 11+

ANTLR是由Java写成的，所以在安装ANTLR前必须保证已经安装有Java 11+或以上版本。

```bash
# 验证安装
java -version
# 应该显示 Java 版本信息
```

### 3. ANTLR4 4.13.2

参考 [Getting Started with ANTLR v4](https://github.com/antlr/antlr4/blob/master/doc/getting-started.md) 下载：
```bash
curl -O https://www.antlr.org/download/antlr-4.13.2-complete.jar
```

除了上述的安装方式，你还可以通过python3的pip包管理安装，它会自动帮你安装ANTLR以及运行所需要的Java环境。

```bash
pip install antlr4-tools
```

这个命令会创建 antlr4 和 antlr4-parse 两个可执行文件，在必要时它们会自动下载并安装 Java 11 和最新版本的 ANTLR 文件：

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

## 开发工具

### VS Code 扩展
- **Go 扩展**：`golang.go`
- **ANTLR4 扩展**：`mike-lischke.vscode-antlr4` (版本 2.4.7)

### 安装命令
```bash
# VS Code 扩展安装
code --install-extension golang.go
code --install-extension mike-lischke.vscode-antlr4
```

## 验证环境

```bash
# 检查 Go
go version

# 检查 Java
java -version

# 检查 ANTLR4
java -jar ./antlr.jar
```

## 常见问题

### Q: ANTLR4 命令找不到？
A: 检查环境变量和别名设置，确保 `antlr-4.13.2-complete.jar` 在正确路径。

### Q: Java 版本不兼容？
A: 确保使用 Java 8 或更高版本，推荐 Java 11。

### Q: Go 模块下载失败？
A: 使用代理：
```bash
go env -w GOPROXY=https://goproxy.cn,direct
```
