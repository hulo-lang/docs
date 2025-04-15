---
title: Editor Plugin
icon: fa-solid fa-puzzle-piece
date: 2025-04-13
category: toolchain
tag:
    - plugin
license: MIT
---

@startregex
/^(?<command>\w+)(?:\s+-(?<flag>\w+)(?:\s+(?<arg>(?:"[\"]*"|'[\']*'|\[[\]]*\]|\{[\}]*\}|[^*]+))?)?(?:\s+|$))*/gmx
@endregex