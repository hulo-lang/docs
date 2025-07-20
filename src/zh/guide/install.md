---
title: 安装
icon: download
date: 2025-07-20
category: 指南
tag:
    - 安装
license: MIT
---

::: tip
Hulo 提供多种安装方式。由于发布流程尚未完全自动化，某些平台的包更新可能存在延迟。如需获取最新版本，建议从 GitHub Releases 直接下载。
:::

## 直接下载

从 [GitHub Releases](https://github.com/hulo-lang/hulo/releases) 下载预构建的压缩包，解压后将 `bin/` 目录添加到系统环境变量即可使用。

你也可以使用以下命令进行一键安装：

```sh
# Linux/macOS
curl -L https://github.com/hulo-lang/hulo/releases/latest/download/install.sh | bash

# Windows (PowerShell)
irm https://github.com/hulo-lang/hulo/releases/latest/download/install.ps1 | iex
```

## 从源码构建

如果你想从源码构建最新版本：

```sh
# 克隆仓库
git clone https://github.com/hulo-lang/hulo.git
cd hulo

# Windows 用户
tools/scripts/setup.ps1

# Linux 用户
tools/scripts/setup.sh

# 构建所有平台版本
mage release:all
```

## 包管理器

通过你熟悉的包管理器安装 Hulo：

::: code-tabs#shell

@tab npm

```bash
npm install hulo-lang
```

@tab pip

```bash
pip install hulo
```

@tab scoop

```bash
scoop bucket add hulo https://github.com/hulo-lang/scoop-hulo

scoop install hulo
```

@tab homebrew

```bash
brew tap hulo-lang/hulo

brew install hulo
```

:::

| 包管理器 | 主页 | 仓库 |
|---------|------|------|
| **npm** | [hulo-lang](https://www.npmjs.com/package/hulo-lang) | [hulo-npm](https://github.com/hulo-lang/hulo-npm) |
| **pypi** | [hulo](https://pypi.org/project/hulo) | [hulo-py](https://github.com/hulo-lang/hulo-py) |
| **scoop** |  | [scoop-hulo](https://github.com/hulo-lang/scoop-hulo) |
| **brew** |  | [homebrew-hulo](https://github.com/hulo-lang/homebrew-hulo) |

::: important
我们正在努力扩展 Hulo 的安装方式。如果你希望为更多平台或包管理器提供支持，欢迎贡献你的想法和代码！
:::