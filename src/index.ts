import { io, isV1 } from '@core/io'
import { tomlParser } from '@core/tomlParser'
import { toAbsolute } from '@core/utils'
import { version, type VersionOption } from '@core/version'

export * from '@core/io'
export * from '@core/tomlParser'
export * from '@core/utils'
export * from '@core/version'

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

export function getCurrentVersion(base?: string) {
  const versions = getTauriVersions(base)

  if (versions.package !== versions.cargo ||
    versions.package !== versions.conf ||
    versions.cargo !== versions.conf)
    throw new Error(
      'Version mismatch detected between ' +
      `package.json (${versions.package}), ` +
      `Cargo.toml (${versions.cargo}) and ` +
      `tauri.conf.json (${versions.conf})`
    )

  return versions.package
}

function getTauriVersions(base?: string) {
  const pathMap = {
    package: './package.json',
    cargo: './src-tauri/Cargo.toml',
    conf: './src-tauri/tauri.conf.json',
  }

  const getPath = (path: string) => toAbsolute(path, base)

  const versions = {
    package: JSON.parse(io(getPath(pathMap.package)).read()).version,
    cargo: io(getPath(pathMap.cargo)).read().match(/version\s*=\s*"([^"]+)"/)?.[1] || '',
    conf: (() => {
      const conf = JSON.parse(io(getPath(pathMap.conf)).read())
      return isV1(conf) ? conf.package.version : conf.version
    })()
  }

  return versions
}