---
title: Installation
icon: download
date: 2025-07-20
category: guide
tag:
    - install
license: MIT
---

::: tip
Hulo provides multiple installation methods. Due to the release process not being fully automated yet, package updates on certain platforms may have delays. For the latest version, we recommend downloading directly from GitHub Releases.
:::

## Direct Downloads

Download pre-built packages from [GitHub Releases](https://github.com/hulo-lang/hulo/releases), extract them and add the `bin/` directory to your system's PATH.

You can also use the following commands for one-click installation:

```sh
# Linux/macOS
curl -L https://github.com/hulo-lang/hulo/releases/latest/download/install.sh | bash

# Windows (PowerShell)
irm https://github.com/hulo-lang/hulo/releases/latest/download/install.ps1 | iex
```

## From Source

If you want to build the latest version from source:

```sh
# Clone repository
git clone https://github.com/hulo-lang/hulo.git
cd hulo

# for Windows
tools/scripts/setup.ps1

# for linux
tools/scripts/setup.sh

# Build for all platforms
mage release:all
```

## Package Managers

Install Hulo through your favorite package manager:

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

| Package Manager | HomePage | Repository |
|----------------|------------|--------|
| **npm** | [hulo-lang](https://www.npmjs.com/package/hulo-lang) | [hulo-npm](https://github.com/hulo-lang/hulo-npm) |
| **pypi** | [hulo](https://pypi.org/project/hulo) | [hulo-py](https://github.com/hulo-lang/hulo-py) |
| **scoop** |  | [scoop-hulo](https://github.com/hulo-lang/scoop-hulo) |
| **brew** |  | [homebrew-hulo](https://github.com/hulo-lang/homebrew-hulo) |

::: important
We are actively working to expand Hulo's installation methods. If you'd like to support more platforms or package managers, we welcome your ideas and contributions!
:::
