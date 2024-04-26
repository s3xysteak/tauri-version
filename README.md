# :tada: tauri-version

English | [简体中文](./README-zh.md)

A simple tool for conveniently upgrading the tauri-app version, similar in function to `npm version`.

## :rocket: Feature

Automatically update the version number in the following files:

- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

Commit these changes and label the commit with a tag named `v[version number]`.

## :memo: Usage

If the current version is `v0.0.2`:

```sh
$ npx tauri-version patch # `v0.0.2` -> `v0.0.3` - Commit message `0.0.3`
$ npx tauri-version minor # `v0.0.2` -> `v0.1.0` - Commit message `0.1.0`
$ npx tauri-version major # `v0.0.2` -> `v1.0.0` - Commit message `1.0.0`
$ npx tauri-version 123 # `v0.0.2` -> `v123` - Customize version. commit message `123`
```

Recommended to use `pnpx` to use the latest version of `tauri-version`.

```sh
$ pnpx tauri-version patch

# Equal to:

$ npx tauri-version@latest patch
```

## :wrench: Options

Use `tauri-version -h` to see the whole help message.

### Custom Commit Message

`%s` in commit message will be replaced by version.

`tauri-version patch -m "chore: release v%s"`
This will change the commit message to:
`chore: release v0.0.2`

### Prevent `git commit`

`tauri-version patch --no-git`

### Do not wait for the update of `Cargo.lock`

Change the version in `Cargo.toml` will change the version in `Cargo.lock` automatically. In default, `tauri-version` will wait for the update of `Cargo.lock` then `git commit`.

To prevent it, use `tauri-version patch --no-lock`.
