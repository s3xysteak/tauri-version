#!/usr/bin/env node

import { consola } from 'consola'
import cac from 'cac'
import { version } from '../package.json'
import tauriVersion from '.'

const cli = cac('tauri-version')

const tip =
  'Accept <patch|minor|major>. Increment the version by the specified level.'

cli.version(version).option('<patch|minor|major>', tip).help()

cli.command('<options>', tip).action(options => {
  try {
    tauriVersion(options)
    consola.success(
      'The versions of cargo.toml & tauri.conf.json updated successfully'
    )
  } catch (error) {
    consola.error(String(error))
  }
})

cli.parse()
