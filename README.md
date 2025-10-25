<h1 align="center">tauri-version</h1>

<p align="center">
A simple tool for conveniently upgrading the tauri-app version.
</p>

<br>
<p align="center">
🌏 English | [简体中文](./README-zh.md)
</p>
<br>

> [!NOTE]
> In v0, it provides a CLI, which still exist in v1 for backward compatibility. For more information please refer to [document](./src/legend/README.md). This feature will be removed in v2.

## Install

1. Install `bumpp` and `tauri-version`

```sh
npm i -D bumpp tauri-version
```

2. Create file `<root>/bump.config.js`

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

## Usage

Basic usage:

```sh
npm bumpp # it will open a GUI in console
npm bumpp -h # --help
npm bumpp patch # major/minor/patch, etc...
npm bumpp --no-commit --no-tag --no-push
npm bumpp -r # --recursive. For monorepo
```

More options please refer to [bumpp](https://github.com/antfu-collective/bumpp) .

## Example

Please refer to [test](/test/fixture/)

## Options

- `lock`: Default `true`. A Boolean, indicating if edit cargo.lock.
