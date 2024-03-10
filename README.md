# :tada: tauri-version

English | [简体中文](./README-zh.md)

A simple tool for conveniently upgrading the tauri-app version, similar in function to `npm version`.

## :rocket: Feature

Automatically update the version number in the following files:

- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

Submit these changes and tag the commit with a label named `v[version number]`.

## :wrench: Usage

If the current version is `v0.0.2`:

### Basic Usage

- `npx tauri-version patch` : `v0.0.2` -> `v0.0.3`
- `npx tauri-version minor` : `v0.0.2` -> `v0.1.0`
- `npx tauri-version major` : `v0.0.2` -> `v1.0.0`

### Custom Commit Message

`npx tauri-version patch -m "chore: release v%s"`  
This will change the commit message to:  
`chore: release v0.0.2`
