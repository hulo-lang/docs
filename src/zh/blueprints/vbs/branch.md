---
title: Conditional branch
icon: fas fa-code-branch
date: 2025-04-18
category: blueprint
tag: 
    - vbs
    - branch
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

```vb
Dim age
age = 10

If age > 18 Then
    MsgBox "you are an adult"
End If
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
```vb
score = 60

If score > 90 Then
    WScript.Echo "Grade: excellent"
ElseIf score > 75 Then
    WScript.Echo "Grade: good"
ElseIf score > 60 Then
    WScript.Echo "Grade: Pass"
Else
    WScript.Echo "Grade: fail"
End If
```

### 命令

```hulo
if ! cmd {
    echo "cmd not found"
}

if $(cmd) == "0" {
    echo "successfully to execute"
}
```

### 原生集成

## match
