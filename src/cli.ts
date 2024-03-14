#!/usr/bin/env node

import * as process from 'node:process'
import { join } from 'node:path'
import { execSync } from 'node:child_process'

import { consola } from 'consola'
import cac from 'cac'
import { version } from '../package.json'
import { tauriVersion } from '.'

const cli = cac('tauri-version')

const tip
  = 'Accept <patch|minor|major>. Increment the version by the specified level.'

cli.version(version).option('[patch|minor|major]', tip).help()

cli
  .command('[version]', tip)
  .option(
    '-m, --message <message>',
    'Commit message. Use %s to replace the version number.',
  )
  .action((version, options) => {
    try {
      const { message = '%s' } = options
      const ver = tauriVersion(version)

      const getPath = (path: string) => join(process.cwd(), path)
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
