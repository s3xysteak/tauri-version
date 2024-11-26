# tauri-version

English | [简体中文](./README-zh.md)

A simple tool for conveniently upgrading the tauri-app version, similar in function to `npm version`.

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
  // execute: tauri(),

  // execute: tauri({/* options */})

  async execute(config) {
    await tauri({/* options */})(config)
    // do something
  }
})
```

## Usage

Basic usage:

```sh
npm bumpp
npm bumpp -h # --help
npm bumpp patch # major/minor/patch, etc...
npm bumpp --no-commit --no-tag --no-push
npm bumpp -r # --recursive. For monorepo
npm bumpp -a # --all. Commit/tag/push ALL pending files, not just the ones that were bumped.
```

More options please refer to [bumpp](https://github.com/antfu-collective/bumpp) .

## Example

Please refer to [test](/test/fixture/)

## Options

```js
export default defineConfig({
  execute: tauri({
    // options
  })
})
```

`lock`: A Boolean or Number. After editing `Cargo.toml`, the Rust extension will update the `Cargo.lock` file. This option controls how `tauri-version` handles waiting for the `Cargo.lock` update. If set to `false`, it will skip waiting; if set to `true`, it will wait for the update to complete. If set to a number, it represents the timeout in milliseconds — the process will skip if the update isn't completed within the specified time. The default value is `1000 * 3` (3 seconds).
