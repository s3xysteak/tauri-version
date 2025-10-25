<h1 align="center">tauri-version</h1>

<p align="center">
方便地升级 tauri-app 版本的简单工具
</p>

<br>
<p align="center">
🌏 [English](./README.md) | 简体中文
</p>
<br>

> [!NOTE]
> 在 v0 中提供的 CLI 工具， 为了向后兼容仍然在v1中保留。 更多关于v0的信息请参考 [document](./src/legend/README.md)。 在 v2 这个功能将会被移除.

## 安装

1. 安装 `bumpp` 和 `tauri-version`

```sh
npm i -D bumpp tauri-version
```

2. 创建 `<root>/bump.config.js` 文件

```ts
import { defineConfig } from 'bumpp'
import tauri from 'tauri-version'

export default defineConfig({
  all: true,
  execute: tauri(),

  // execute: tauri({/* options */})

  // execute: async (ctx) => {
  //   await tauri({/* options */})(ctx)
  //   // do something
  // }
})
```

## 使用

基本使用:

```sh
npm bumpp # it will open a GUI in console
npm bumpp -h # --help
npm bumpp patch # major/minor/patch, etc...
npm bumpp --no-commit --no-tag --no-push
npm bumpp -r # --recursive. For monorepo
```

更多选项请移步 [bumpp](https://github.com/antfu-collective/bumpp) 。

## 使用例

请移步至 [测试用例](/test/fixture/)

## 选项

- `lock`: Default `true`. A Boolean, indicating if edit cargo.lock.
