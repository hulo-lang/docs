---
title: 异步
icon: fas fa-feather
date: 2025-04-19
category: grammar
tag: 
    - async
license: MIT
---

> **Asynchronous（异步）** 是一种编程模型，用于在不阻塞主程序流程的情况下处理耗时任务（如网络请求、文件IO或定时操作）。
>
> 与同步调用不同，异步操作允许程序继续执行后续逻辑，并在任务完成时通过回调函数、Promise、Future、async/await 等机制处理结果。
>
> 异步编程的优势包括：
> - 提高程序响应性，尤其适用于 UI 或服务器场景
> - 更好地利用系统资源，实现高并发
> - 避免线程阻塞带来的性能瓶颈


::: important
由于 Hulo 最终是要编译成目标语言运行的，能否异步取决于目标语言是否支持。如果目标语言不支持的情况下，异步的代码还是会同步执行的。Hulo 只是尽可能实现异步这个特性。
:::

## 关键字
```hulo
let task = async (i: num) => {
    return $i.to_str()
}

loop $i := 1..100 {
    echo task(i)
}

await _
```

## 函数
```hulo
future.delay(const duration(sec: 1), () => {
    echo "Hello World"
})
```