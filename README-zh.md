# tauri-version

[English](./README.md) | 简体中文

方便地升级 tauri-app 版本的简单工具，其作用类似于`npm version`.

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
  // execute: tauri(),

  // execute: tauri({/* options */})

  async execute(config) {
    await tauri({/* options */})(config)
    // do something
  }
})
```

## 使用

基本使用:

```sh
npm bumpp
npm bumpp -h # --help
npm bumpp patch # major/minor/patch, etc...
npm bumpp --no-commit --no-tag --no-push
npm bumpp -r # --recursive. For monorepo
npm bumpp -a # --all. Commit/tag/push ALL pending files, not just the ones that were bumped.
```

更多选项请移步 [bumpp](https://github.com/antfu-collective/bumpp) 。

## 使用例

请移步至 [测试用例](/test/fixture/)

## 选项

```js
export default defineConfig({
  execute: tauri({
    // options
  })
})
```

`lock`: 布尔值或数字。由于修改 `Cargo.toml` 后会导致 Rust 扩展更新 `Cargo.lock` 文件，此选项控制是否等待 `Cargo.lock` 更新。如果设置为 `false`，则跳过等待；如果设置为 `true`，则等待更新完成；如果设置为数字，则表示超时时间（毫秒），超时后跳过等待。默认值为 `1000 * 3`（3 秒）。
