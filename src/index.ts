import * as process from 'node:process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join, normalize } from 'node:path'

import { tomlParser } from '@core/tomlParser'
import { type VersionOption, version } from '@core/version'

function isV1(conf: Record<string, any>): boolean {
  return !!conf?.package
}

function main(
  options: VersionOption,
  tauriPath = './src-tauri/',
  packagePath = './',
) {
  const getPath = (path: string) => normalize(join(process.cwd(), path))

  /** package.json */
  const packageContent = readFileSync(
    join(getPath(packagePath), 'package.json'),
    'utf-8',
  )
  const packageObj = JSON.parse(packageContent)
  const ver = version(packageObj.version, options)
  packageObj.version = ver
  writeFileSync(
    join(getPath(packagePath), 'package.json'),
    JSON.stringify(packageObj, null, 2),
  )

  /** Cargo */
  const tomlContent = readFileSync(
    join(getPath(tauriPath), 'Cargo.toml'),
    'utf-8',
  )
  writeFileSync(
    join(getPath(tauriPath), 'Cargo.toml'),
    tomlParser(tomlContent, ver),
  )

  /** Conf */
  const confContent = readFileSync(
    join(getPath(tauriPath), 'tauri.conf.json'),
    'utf-8',
  )
  const confObj = JSON.parse(confContent)

  if (isV1(confObj))
    confObj.package.version = ver
  else
    confObj.version = ver

  writeFileSync(
    join(getPath(tauriPath), 'tauri.conf.json'),
    JSON.stringify(confObj, null, 2),
  )

  return ver
}

export default main
