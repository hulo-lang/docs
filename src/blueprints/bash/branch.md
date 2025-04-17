---
title: Conditional branch
icon: fa-solid fa-code-branch
date: 2025-04-14
category: blueprint
tag: 
    - bash
    - flow
license: MIT
---

## if

### 单分支

**输入：**
```hulo
let age: num = 10

if $age > 18 {
    echo "you are an adult"
}
```

**输出：**
```bash
age=10

if [ "$age" -gt 18 ];then
    echo "you are an adult"
fi
```

### 多分支

**输入：**
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
```

**输出：**
```bash
score=85

if [ "$score" -ge 90 ]; then
  echo "Grade: excellent"
elif [ "$score" -ge 75 ]; then
  echo "Grade: good"
elif [ "$score" -ge 60 ]; then
  echo "Grade: Pass"
else
  echo "Grade: fail"
fi
```


### 命令
```
if ! cmd {
    echo "cmd not found"
}

if $(cmd) == "0" {
    echo "successfully to execute"
}
```

### 原生集成
```
if ${} {

}
```

### 判断表达式

#### 整数比较
::: warning
只能用于整数
:::

| 表达式      | 含义 | 等价于 |
| ----------- | ----------- | ----------- |
| `-eq` |	等于	|  == |
| `-ne` |	不等于  | != |
| `-gt` |	大于	|  > |
| `-ge` |	大于等于 | >= |
| `-lt` |	小于	 | < |
| `-le` |	小于等于 | <= |

#### 字符串判断

| 表达式      | 含义 | 等价于 |
| ----------- | ----------- | ----------- |
| -z "$str" |	字符串长度为 0（空字符串）| $str.length == 0 或 ! $str.length |
| -n "$str" | 字符串长度不为 0 | $str.length != 0 或 $str.length |
| "$a" = "$b" |	字符串相等| $a == $b |
| "$a" != "$b" | 字符串不相等 | $a != $b |

#### 逻辑判断
| 表达式      | 含义 | 等价于 |
| ----------- | ----------- | ----------- |
| `-a`      | 与       | & |
| `-o`   | 或        | \| |
| `!`   | 非        | ! |
| `&&`   | 条件与（用于多个 `[ ... ]`）| && |


#### 文件相关

| 表达式      | 含义 | 等价于 |
| ----------- | ----------- | ----------- |
| `-e` | 文件存在 | f"file.txt".exist |
| `-f` | 是普通文件（非目录）| f"file.txt".is_file 或 ! f"file.txt".is_dir |
| `-d` | 是目录 | f"dir/".is_dir() |
| `-r` | 文件可读 |	f"file.txt".readable |
| `-w` | 文件可写 | f"file.txt".writable |
| `-x` | 文件可执行 | f"script.sh".executable |
| `-s` | 文件大小非 0 | f"file.txt".size |
| `-L` | 是符号链接 | f"link.txt".is_symbol_link |
| `-h` | 同 -L，也是符号链接 | f"link.txt".is_symbol_link |
| `-b` | 是块设备文件 | f"/dev/sda".is_block_dev |
| `-c` | 是字符设备文件 | f"/dev/tty0".is_char_dev |
| `-p` | 是命名管道（FIFO）| f"fifo.pipe".is_pipe |
| `-S` | 是 socket 文件	| f"/tmp/mysock".is_sock |
| `-u` | 设置了 SUID 位 | f"somefile".suid |
| `-g` | 设置了 SGID 位	| f"somefile".sgid |
| `-k` | 设置了粘着位（sticky bit）| f"/tmp".sticky |
| file1 -nt file2 |	file1 比 file2 新 |	f"file1" > f"file2" |
| file1 -ot file2 | file1 比 file2 旧 |	f"file1" < f"file2" |
| file1 -ef file2 | file1 和 file2 是同一个文件（硬链接）|	f"file1" == f"file2" |

## case

### 单模式匹配

**输入：**
```hulo
$i := 1

match $i {
    0 => echo "i is 0",
    1 => echo "i is 1",
    _ => echo "i is others",
}
```

**输出：**
```bash
i=1

case "$i" in
  0)
    echo "i is 0"
    ;;
  1)
    echo "i is 1"
    ;;
  *)
    echo "i is others"
    ;;
esac
```

### 多模式匹配

**输入：**
```hulo
match $x {
    "apple", "banana" => echo "matched: apple or banana",
    _ => echo "no matched",
}
```

**输出：**
```bash
case "$x" in
  apple|banana)
    echo "matched: apple or banana"
    ;;
  *)
    echo "no matched"
    ;;
esac
```

### 通配符
