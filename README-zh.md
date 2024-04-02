# :tada: tauri-version

[English](./README.md) | 简体中文

方便地升级 tauri-app 版本的简单工具，其作用类似于`npm version`.

## :rocket: 功能

自动更新以下文件的版本号：

- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

提交这些更改，并为提交打上一个名为 `v[版本号]` 的tag。

## :wrench: 使用

假设当前版本为`v0.0.2`：

### 基本使用

```sh
$ npx tauri-version patch # `v0.0.2` -> `v0.0.3` - Commit message `0.0.3`
$ npx tauri-version minor # `v0.0.2` -> `v0.1.0` - Commit message `0.1.0`
$ npx tauri-version major # `v0.0.2` -> `v1.0.0` - Commit message `1.0.0`
$ npx tauri-version 123 # `v0.0.2` -> `v123` - 自定义版本。 commit message `123`
```

### 自定义commit message

提交消息中的 `%s` 将会被替换为版本号。

`npx tauri-version patch -m "chore: release v%s"`
这将会将 commit message 改为：
`chore: release v0.0.2`
