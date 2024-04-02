# :tada: tauri-version

English | [简体中文](./README-zh.md)

A simple tool for conveniently upgrading the tauri-app version, similar in function to `npm version`.

## :rocket: Feature

Automatically update the version number in the following files:

- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

Commit these changes and label the commit with a tag named `v[version number]`.

## :wrench: Usage

If the current version is `v0.0.2`:

### Basic Usage

```sh
$ npx tauri-version patch # `v0.0.2` -> `v0.0.3` - Commit message `0.0.3`
$ npx tauri-version minor # `v0.0.2` -> `v0.1.0` - Commit message `0.1.0`
$ npx tauri-version major # `v0.0.2` -> `v1.0.0` - Commit message `1.0.0`
$ npx tauri-version 123 # `v0.0.2` -> `v123` - Customize version. commit message `123`
```

### Custom Commit Message

`%s` in commit message will be replaced by version.

`npx tauri-version patch -m "chore: release v%s"`
This will change the commit message to:
`chore: release v0.0.2`
