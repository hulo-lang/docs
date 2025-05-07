---
title: Loop
icon: fas fa-repeat
date: 2025-04-17
category: blueprint
tag: 
    - bash
    - loop
license: MIT
---

## 无限循环

::: tip
在 Hulo 中无限循环默认使用 while 实现，当然你也可以修改编译选项自定义。
:::


::: code-tabs#shell
@tab while

```yaml title="huloc.yaml"
infiniteLoop: while
```

@tab until

```yaml title="huloc.yaml"
infiniteLoop: until
```

@tab for

```yaml title="huloc.yaml"
infiniteLoop: for
```
:::

**输入：**

```hulo
loop {
  echo "Hello World"
}
```

**输出：**
::: code-tabs#shell
 
@tab while

```bash
while true; do
  echo "Hello World"
done
```

@tab until

```bash
until false; do
  echo "Hello World"
done
```

@tab for

```bash
for ((;;)); do
  echo "Hello World"
done
```
:::

## while

**输入：**
```hulo
$i := 0
loop $i < 10 {
    echo "i = $i"
    $i++
}
```

**输出：**
```bash
i=0
while [ "$i" -lt 10 ]; do
  echo "i = $i"
  i=$((i + 1))
done
```

## until

::: important
由于 until 语句和 while 仅仅是条件差了个取反，Hulo 在默认情况下不会翻译成 until，你需要在编译器选项中手动设置以取代 while 规则。
在 huloc.yaml 中设置 enableUntil: true 即可
:::

**输入：**
```hulo
$i := 0
loop $i < 10 {
    echo "i = $i"
    $i++
}
```

**输出：**
```bash
i=0
until [ "$i" -ge 10 ]; do
  echo "i = $i"
  i=$((i + 1))
done
```

## for

**输入：**
```hulo
loop $i := 0; $i < 5; $i++ {
  echo $i
}
```

**输出：**
```bash
for (( i=0; i<5; i=i+1 )); do
  echo $i
done
```

## foreach

### 数组元素

**输入：**
```hulo
loop $i in ["a", "b", "c"] {
    echo $i
}
```

**输出：**
```bash
for i in a b c; do
  echo $i
done
```

### 通配符

**输入：**
```hulo
loop $i in f"*.png" {
    ls -l $i
}
```

**输出：**
```bash
for i in *.png; do
  ls -l $i
done
```

## break、continue

`break` 命令立即终止循环，程序继续执行循环块之后的语句，即不再执行剩下的循环。

**输入：**
```hulo
$i := 0

loop {
    if $i == 5 {
        break
    }
    $i++
}
```

**输出：**
```bash
i=0

while true; do
  if [ "$i" -eq 5 ]; then
    break
  fi
  i=$((i + 1))
done
```

`continue` 命令立即终止本轮循环，开始执行下一轮循环。

**输入：**
```hulo
loop $i := 0; $i < 10; $i++ {
    if $i == 5 {
        continue
    }
    echo $i
}
```

**输出：**
```bash
for ((i = 0; i < 10; i++)); do
  if [[ "$i" -eq 5 ]]; then
    continue
  fi
  echo "$i"
done
```

## select

::: tip
为了保证跨平台，Hulo 暂不支持 select 语法。因此，为了使用原生select语法糖，你需要使用unsafe嵌入原生脚本。
:::

**输入：**
```hulo
${
select fruit in apple banana orange
do
  if [ -n "$fruit" ]; then
    echo "You selected: $fruit"
    break
  else
    echo "Invalid choice"
  fi
done
}
```

**输出：**
```bash
select fruit in apple banana orange
do
  if [ -n "$fruit" ]; then
    echo "You selected: $fruit"
    break
  else
    echo "Invalid choice"
  fi
done
```