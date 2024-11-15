#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { watch as fsWatch } from 'node:fs'
import cac from 'cac'
import { consola } from 'consola'
import { createContext, getCurrentVersion, toAbsolute } from '.'
import { version as pkgVersion } from '../package.json'

const cli = cac('tauri-version')

const tip
  = 'Accept <patch|minor|major|any-custom-version>. Increment the version by the specified level.'

cli.version(pkgVersion).option('[patch|minor|major]', tip).help()

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
    '--sign [sign]',
    'Sign the tag with a GPG/SSH key',
  )
  .option(
    '-b, --base <base>',
    'The base path to the project. Default to the current working directory.',
  )
  .option(
    '--no-lock',
    'Do not wait for the lock file.',
    { default: false },
  )
  .option(
    '--lock [lock]',
    'Wait for the lock file.',
    { default: true },
  )
  .action(async (version, options) => {
    try {
      const {
        message = '%s',
        git,
        base,
        lock,
        sign = false,
      } = options

      const getPath = (path: string) => toAbsolute(path, base)

      if (!version) {
        console.log(
          getCurrentVersion(createContext('patch', base)),
        )
        return
      }

      const ctx = createContext(version, base)
      ctx.conf.write()
      ctx.package.write()
      ctx.toml.write()

      const timer = setTimeout(() => {
        consola.info('It has been waiting a long time for the `Cargo.lock` update. Maybe you wanna try the option `--no-lock`?')
      }, 3000)
      lock && await waitForLock(getPath('./src-tauri/Cargo.lock'))
      clearTimeout(timer)

      if (!git)
        return consola.success(ctx.version)

      const pathList = [
        './package.json',
        './src-tauri/tauri.conf.json',
        './src-tauri/Cargo.toml',
      ]
      lock && pathList.push('./src-tauri/Cargo.lock')
      execSync(`git add ${pathList.map(path => getPath(path)).join(' ')}`)

      const parsedMessage = message.replace('%s', ctx.version)
      execSync(`git commit -m "${parsedMessage}"`)
      execSync(`git tag --annotate --message="${parsedMessage}" v${ctx.version}${sign ? ' --sign' : ''}`)

      consola.success(`v${ctx.version}`)
    }
    catch (error) {
      consola.error(String(error))
    }
  })

cli.parse()

function waitForLock(path: string) {
  return new Promise<void>((resolve) => {
    const watcher = fsWatch(path, (e) => {
      if (e !== 'change')
        return

      watcher.close()
      resolve()
    })
  })
}
