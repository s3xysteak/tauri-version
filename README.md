# tauri-version

English | [简体中文](./README-zh.md)

A simple tool for conveniently upgrading the tauri-app version, similar in function to `npm version`.

## Install

1. Install `tauri-version`

```sh
pnpm i -D bumpp tauri-version
```

2. Create file `<root>/bump.config.js`

```ts
import { defineConfig } from 'bumpp'
import tauri from 'tauri-version'

export default defineConfig({
  execute: tauri(),
})
```

## Usage

Basic usage:

```sh
pnpm bumpp
pnpm bumpp patch # major/minor/patch, etc...
```

More options please refer to [bumpp](https://github.com/antfu-collective/bumpp) .
