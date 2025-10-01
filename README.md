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
  all: true,
  execute: tauri(),

  // execute: tauri({/* options */})

  // async execute(config) {
  //   await tauri({/* options */})(config)
  //   // do something
  // }
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

`lock`: Default `true`. A Boolean, indicating if edit cargo.lock.
