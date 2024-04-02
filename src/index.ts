import { tomlParser } from '@core/tomlParser'
import { type VersionOption, version } from '@core/version'
import { io, isV1 } from '@core/io'
import { toAbsolute } from '@core/utils'

export * from '@core/version'
export * from '@core/io'
export * from '@core/tomlParser'
export * from '@core/utils'

export function tauriVersion(targetVer: VersionOption, base?: string) {
  const pathMap = {
    package: './package.json',
    cargo: './src-tauri/Cargo.toml',
    conf: './src-tauri/tauri.conf.json',
  }

  const getPath = (path: string) => toAbsolute(path, base)

  /** IO START */

  /** package.json */
  const packageIO = io(getPath(pathMap.package))
  const packageObj = JSON.parse(packageIO.read())
  const ver = version(packageObj.version, targetVer)
  packageObj.version = ver
  packageIO.write(JSON.stringify(packageObj, null, 2))

  /** Cargo */
  const tomlIO = io(getPath(pathMap.cargo))
  tomlIO.write(tomlParser(tomlIO.read(), ver))

  /** Conf */
  const confIO = io(getPath(pathMap.conf))
  const confObj = JSON.parse(confIO.read())

  if (isV1(confObj))
    confObj.package.version = ver
  else
    confObj.version = ver

  confIO.write(JSON.stringify(confObj, null, 2))

  /** IO END */

  return ver
}
