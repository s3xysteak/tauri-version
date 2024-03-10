#!/usr/bin/env node

import { execSync } from 'node:child_process'

import { consola } from 'consola'
import cac from 'cac'
import { version } from '../package.json'
import tauriVersion from '.'

const cli = cac('tauri-version')

const tip =
  'Accept <patch|minor|major>. Increment the version by the specified level.'

cli.version(version).option('[patch|minor|major]', tip).help()

cli
  .command('[version]', tip)
  .option('-a, --add', 'git add changes')
  .option('--path <path>', 'path to src-tauri')
  .action((version, options) => {
    try {
      tauriVersion(version)
      if (options.add) {
        const files = ['Cargo.toml', 'tauri.conf.json']
        execSync(
          `git add ${files
            .map(file => options.path ?? './src-tauri/' + file)
            .join(' ')}`
        )
      }
      consola.success(
        'The versions of cargo.toml & tauri.conf.json updated successfully'
      )
    } catch (error) {
      consola.error(String(error))
    }
  })

cli.parse()
