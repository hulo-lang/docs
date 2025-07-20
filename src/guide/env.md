---
title: Environment Variables
icon: gear
date: 2025-07-20
category: guide
tag:
    - environment
    - configuration
license: MIT
---

While most installation methods automatically configure the `bin/` directory to your system `PATH`, manual downloads require manual configuration. Hulo also provides several key-value environment variables for configuring the compiler and third-party libraries.

## HULO_PATH

The `HULO_PATH` environment variable specifies the location of your Hulo installation directory, primarily used to locate the `core/` standard library directory.

**Default Behavior**: If not set, the compiler automatically searches for the `core/` directory in the parent directory of the executable's `bin/` folder.

**Use Cases**: When you need to customize the Hulo installation location or use non-standard installation paths.

## HULO_MODULES

The `HULO_MODULES` environment variable specifies the location of locally installed third-party libraries.

**Features**: Hulo uses a global library cache mechanism, unlike Node.js's `node_modules` which maintains local caches in each project.

**Benefits**: Global caching saves disk space and avoids duplicate installations of the same libraries. 