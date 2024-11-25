# tauri-version

[English](./README.md) | 简体中文

方便地升级 tauri-app 版本的简单工具，其作用类似于`npm version`.

## 安装

1. 安装 `tauri-version`

```sh
pnpm i -D bumpp tauri-version
```

2. 创建 `<root>/bump.config.js` 文件

```ts
import { defineConfig } from 'bumpp'
import tauri from 'tauri-version'

export default defineConfig({
  execute: tauri(),
})
```

## 使用

基本使用:

```sh
pnpm bumpp
pnpm bumpp patch # major/minor/patch, etc...
```

更多选项请移步 [bumpp](https://github.com/antfu-collective/bumpp) 。
