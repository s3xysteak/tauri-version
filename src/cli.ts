#!/usr/bin/env node

import cac from 'cac'
import { version } from '../package.json'
import tauriVersion from '.'

const cli = cac('tauri-version')

const tip =
  'Accept <patch|minor|major>. Increment the version by the specified level.'

cli.version(version).option('version <patch|minor|major>', tip).help()

cli.command('version <options>', tip).action(options => {
  tauriVersion(options)
})

cli.parse()
