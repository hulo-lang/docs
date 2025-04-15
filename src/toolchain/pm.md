---
title: Package Manager
icon: fa-solid fa-cube
date: 2025-04-13
category: toolchain
tag:
    - package
license: MIT
---

> 包管理工具（Package Manager）是开发生态系统中的核心基础设施之一，负责查找、安装、升级、配置以及管理代码库中的依赖包。它极大地简化了软件开发流程，使开发者能够专注于业务逻辑的实现，而无需手动管理第三方库的版本、依赖关系与兼容性问题。

::: tip
hlpm 封装了大部分 hulo 编译器的命令，因此在一般情况下只需要使用包管理工具便可代替编译器的大部分功能执行。
:::

## install

安装第三方依赖
### Declaration

``` :no-line-numbers
hlpm install <pkg>...

别名：add, i, in, ins, inst, insta, instal
```

### Examples

```sh
hlpm install HelloWorld
hlpm i HelloWorld@1.0.0
hlpm i HelloWorld@1.0.0 HelloWorld@1.0.1
```

### Configuration


## uninstall

卸载第三方依赖
### Declaration

``` :no-line-numbers
hlpm uninstall <pkg>...

别名: remove, rm, r, un
```

### Examples

### Configuration

## run

编译完指定源文件后，会在当前工作目录创建临时文件运行目标语言脚本，结束后自动删除。

### Declaration

``` :no-line-numbers
hlpm run [FLAGS] [FILE]

别名：r
```

### Examples

```sh
hlpm run main.hl
```

### Configuration

## build

### Declaration

``` :no-line-numbers
hlpm build [FLAGS] [FILES]...

别名：b, bu
```

### Examples

```sh
hlpm build main.hl --lang bash
```

### Configuration

**`-l`、`--lang`**

设置编译后的目标语言
* 类型：`str`
* 默认值: "bash"
* 可选值："bash"、"powershell"、"batch"、"vbs"、"amber"

**`-c`、`--comptime`**

对comptime进行求值
* 类型: `bool`
* 默认值: false

## test

### Declaration

``` :no-line-numbers
hlpm test [FILE] [FUNC]... -- [FLAGS]

别名：t
```

### Examples
```sh
hlpm test test.hl test_a test_b
```

### Configuration

## version

### Declaration

``` :no-line-numbers
hlpm version

别名：v
```

### Examples
```sh
hlpm version
hlpm v -p
```

### Configuration

**`-p`、`--pure`**

纯净打印，不输出hlpm的logo
* 类型： `bool`
* 默认值: false

::: info
你可以将 hlpm 的logo用在任何地方，只要你愿意 ：）
:::
```
██╗  ██╗██╗     ██████╗ ███╗   ███╗
██║  ██║██║     ██╔══██╗████╗ ████║
███████║██║     ██████╔╝██╔████╔██║
██╔══██║██║     ██╔═══╝ ██║╚██╔╝██║
██║  ██║███████╗██║     ██║ ╚═╝ ██║
╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝     ╚═╝
```