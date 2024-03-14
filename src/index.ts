import * as process from 'node:process'
import { join } from 'node:path'

import { tomlParser } from '@core/tomlParser'
import { type VersionOption, version } from '@core/version'
import { io, isV1 } from '@core/io'

export * from '@core/version'
export * from '@core/io'
export * from '@core/tomlParser'

export function tauriVersion(options: VersionOption, tauriPath = './src-tauri/', packagePath = './') {
  const getPath = (path: string) =>
    (fileName: string) => join(join(process.cwd(), path), fileName)

  /** IO START */

  /** package.json */
  const packageIO = io(getPath(packagePath)('package.json'))
  const packageObj = JSON.parse(packageIO.read())
  const ver = version(packageObj.version, options)
  packageObj.version = ver
  packageIO.write(JSON.stringify(packageObj, null, 2))

  /** Cargo */
  const tomlIO = io(getPath(tauriPath)('Cargo.toml'))
  tomlIO.write(tomlParser(tomlIO.read(), ver))

  /** Conf */
  const confIO = io(getPath(tauriPath)('tauri.conf.json'))
  const confObj = JSON.parse(confIO.read())

  if (isV1(confObj))
    confObj.package.version = ver
  else
    confObj.version = ver

  confIO.write(JSON.stringify(confObj, null, 2))

  /** IO END */

  return ver
}
