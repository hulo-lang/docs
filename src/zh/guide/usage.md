---
title: 使用
icon: rocket
date: 2025-07-20
category: 指南
tag:
    - 使用
    - 开发
license: MIT
---

## 基本用法

### 创建第一个 Hulo 程序

创建一个名为 `hello.hl` 的文件：

```hulo title="hello.hl"
echo "Hello, Hulo!"
```

### 编译和运行

```bash
# 编译为 Bash 脚本
hulo hello.hl -t bash

# 编译为 PowerShell 脚本
hulo hello.hl -t powershell

# 编译为 VBScript
hulo hello.hl -t vbs

# 直接运行（默认编译为当前平台脚本）
hulo hello.hl
```

## 命令行选项

```bash
hulo [选项] <文件>

选项:
  -t, --target <平台>    指定目标平台 (bash|powershell|vbs)
  -o, --output <文件>    指定输出文件
  -V, --version         显示版本信息
  -h, --help           显示帮助信息
  --verbose            显示详细编译信息
```

## 项目结构

一个典型的 Hulo 项目结构：

```
my-project/
├── src/
│   ├── main.hl         # 主程序入口
│   ├── utils.hl        # 工具函数
│   └── config.hl       # 配置文件
├── tests/
│   └── test.hl         # 测试文件
├── dist/               # 编译输出目录
└── huloc.yaml          # 项目配置文件
```

## 项目配置

创建 `huloc.yaml` 配置文件：

```yaml
main: main.hl # 主程序的入口
targets: # 要编译到的平台
    - vbs
    - bash
out_dir: dist/ # 编译后输出路径
```

## 开发工作流

### 1. 编写代码

```hulo title="src/main.hl"
import "utils"

fn main() {
    utils.greet("World")
    echo "程序执行完成！"
}
```

### 2. 编译测试

```bash
# 编译并测试
hulo src/main.hl -t bash
./dist/main.sh
```

### 3. 调试

```bash
# 启用详细输出
hulo src/main.hl --verbose

# 检查语法
hulo src/main.hl --check
```

## 最佳实践

### 代码组织

- 将相关功能组织到模块中
- 使用有意义的文件名和函数名
- 添加适当的注释和文档
<!-- TODO 这是语法有问题，我以后完善
### 错误处理

```hulo
fn safe_operation() {
    if file_exists("config.txt") {
        // 执行操作
    } else {
        echo "错误：配置文件不存在"
        exit(1)
    }
}
```

### 平台兼容性

```hulo
// 使用条件编译处理平台差异
#if target == "windows"
    echo "Windows 平台特定代码"
#else
    echo "Unix 平台特定代码"
#endif
``` -->

## 集成开发

### 编辑器支持

- **VS Code**: 安装 Hulo 扩展获得语法高亮和智能提示
- **Vim/Neovim**: 配置语法高亮和自动补全
- **其他编辑器**: 支持通用语法高亮

### 版本控制

```bash
# 初始化 Git 仓库
git init

# 添加 .gitignore
echo "dist/" >> .gitignore
echo "*.log" >> .gitignore

# 提交代码
git add .
git commit -m "Initial commit"
```

## 部署

### 本地部署

```bash
# 编译生产版本
hulo src/main.hl -t bash -o dist/app.sh

# 设置执行权限
chmod +x dist/app.sh
```

### 跨平台分发

```bash
# 编译多个平台版本
hulo src/main.hl -t bash -o dist/app.sh
hulo src/main.hl -t powershell -o dist/app.ps1
hulo src/main.hl -t vbs -o dist/app.vbs
```

## 常见问题

### Q: 如何指定自定义输出目录？
A: 使用 `-o` 选项：`hulo main.hl -o /path/to/output/script.sh`

### Q: 支持哪些目标平台？
A: 目前支持 Bash、PowerShell、VBScript，更多平台正在开发中。

### Q: 如何处理依赖管理？
A: 使用 `hulo.toml` 配置文件管理项目依赖和构建设置。

### Q: 如何调试编译错误？
A: 使用 `--verbose` 选项获取详细的编译信息。

