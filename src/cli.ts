#!/usr/bin/env node

import * as process from 'node:process'
import { execSync } from 'node:child_process'
import { resolve } from 'pathe'

import { consola } from 'consola'
import cac from 'cac'
import { version as ver } from '../package.json'
import { tauriVersion } from '.'

const cli = cac('tauri-version')

const tip
  = 'Accept <patch|minor|major>. Increment the version by the specified level.'

cli.version(ver).option('[patch|minor|major]', tip).help()

cli
  .command('[version]', tip)
  .option(
    '-m, --message <message>',
    'Commit message. Use %s to replace the version number.',
    { default: '\"%s\"' },
  )
  .option(
    '--git',
    'Commit and tag the version. Always be opposite of --no-git.',
    { default: true },
  )
  .option(
    '--no-git',
    'Do not commit and tag the version. Always be opposite of --git.',
    { default: false },
  )
  .option(
    '-t, --target <target>',
    'The target version. Default is tauri version.',
  )
  .action((version, options) => {
    try {
      const {
        message = '%s',
        git,
      } = options

      const ver = tauriVersion(version)

      if (!git)
        return consola.success(ver)

      const getPath = (path: string) => resolve(process.cwd(), path)
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
