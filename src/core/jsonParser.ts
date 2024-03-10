import { version, type VersionOption } from './version'

export function jsonParser(content: string, options: VersionOption) {
  const obj = JSON.parse(content)

  obj.package.version = version(obj.package.version, options)

  return JSON.stringify(obj, null, 2)
}
