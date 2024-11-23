import { io, isV1 } from '@/legend/core/io'
import { getCargoVersion, replaceTomlVersion } from '@/legend/core/tomlParser'
import { readOnly, toAbsolute } from '@/legend/core/utils'
import { version, type VersionOption } from '@/legend/core/version'

export * from '@/legend/core/io'
export * from '@/legend/core/tomlParser'
export * from '@/legend/core/utils'
export * from '@/legend/core/version'

export type Context = ReturnType<typeof createContext>

export function createContext(targetVer?: VersionOption, base?: string) {
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

  /** Cargo */
  const tomlIO = io(getPath(pathMap.cargo))
  const tomlContent = tomlIO.read()

  /** Conf */
  const confIO = io(getPath(pathMap.conf))
  const confObj = JSON.parse(confIO.read())

  /** IO END */

  let _ver: string
  const ver = () => {
    if (!targetVer)
      throw new Error('Must indicate target version')
    return _ver || (_ver = version(packageObj.version, targetVer))
  }

  return {
    version: ver,
    package: {
      read: () => readOnly(packageObj),
      write: () => {
        const obj = { ...packageObj }
        obj.version = ver()
        packageIO.write(JSON.stringify(obj, null, 2))
      },
    },
    toml: {
      read: () => ({
        beforeVersion: getCargoVersion(tomlContent),
      }),
      write: () => tomlIO.write(replaceTomlVersion(tomlContent, ver())),
    },
    conf: {
      read: () => readOnly(confObj),
      write: () => {
        const obj = { ...confObj }

        if (isV1(obj))
          obj.package.version = ver()
        else
          obj.version = ver()

        confIO.write(JSON.stringify(obj, null, 2))
      },
    },
  }
}

export function getCurrentVersion(ctx: Context) {
  const versions = getTauriVersions(ctx)

  if (versions.package !== versions.cargo
    || versions.package !== versions.conf
    || versions.cargo !== versions.conf) {
    throw new Error(
      'Version mismatch detected between '
      + `package.json (${versions.package}), `
      + `Cargo.toml (${versions.cargo}) and `
      + `tauri.conf.json (${versions.conf})`,
    )
  }

  return versions.package
}

function getTauriVersions(ctx: Context) {
  const confObj = ctx.conf.read()
  const conf = isV1(confObj)
    ? confObj.package.version
    : confObj.version

  return {
    package: ctx.package.read().version,
    cargo: ctx.toml.read().beforeVersion,
    conf,
  }
}
