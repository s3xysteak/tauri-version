#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { consola } from 'consola'
import cac from 'cac'
import { version as ver } from '../package.json'
import { tauriVersion, toAbsolute } from '.'

const cli = cac('tauri-version')

const tip
  = 'Accept <patch|minor|major|any-custom-version>. Increment the version by the specified level.'

cli.version(ver).option('[patch|minor|major]', tip).help()

cli
  .command('[version]', tip)
  .option(
    '-m, --message <message>',
    'Commit message. Use %s to replace the version number.',
    { default: '\"%s\"' },
  )
  .option(
    '--no-git',
    'Do not commit and tag the version. Always be opposite of --git.',
    { default: false },
  )
  .option(
    '--git [git]',
    'Commit and tag the version. Always be opposite of --no-git.',
    { default: true },
  )
  .option(
    '-b, --base <base>',
    'The base path to the project. Default to the current working directory.',
  )
  .action((version, options) => {
    try {
      const {
        message = '%s',
        git,
        base,
      } = options

      const ver = tauriVersion(version, base)

      if (!git)
        return consola.success(ver)

      const getPath = (path: string) => toAbsolute(path, base)
      const pathList = [
        './package.json',
        './src-tauri/tauri.conf.json',
        './src-tauri/Cargo.toml',
      ]
      execSync(`git add ${pathList.map(path => getPath(path)).join(' ')}`)

      const parsedMessage = message.replace('%s', ver)
      execSync(`git commit -m "${parsedMessage}"`)
      execSync(`git tag v${ver}`)

      consola.success(`v${ver}`)
    }
    catch (error) {
      consola.error(String(error))
    }
  })

cli.parse()
