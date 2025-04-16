---
title: Architecture
icon: sitemap
---

```flow:vue
source=>start: 源文件
e=>end: 目标代码
io=>inputoutput: Hulo节点
op1=>operation: Comptime
sub1=>subroutine: 求值
cond=>condition: 存在?

source->io->op1(right)->cond
cond(no, right)->e
cond(yes)->sub1(left)->op1
```

Hulo 在翻译AST节点前会将所有Comptime求值，这个流程可以表示为 `huloast.Node` -> `huloast.Node`。之后才会将 hulo节点 翻译成目标节点。


::: important Frontmatter

Frontmatter is an important concept in VuePress. If you don't know it, you need to read [Frontmatter Introduction](https://theme-hope.vuejs.press/cookbook/vuepress/page.html#front-matter).

:::
