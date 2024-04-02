import process from 'node:process'
import { isAbsolute, resolve } from 'pathe'

export function toAbsolute(path: string, base = process.cwd()) {
  return isAbsolute(base) ? resolve(base, path) : resolve(process.cwd(), base, path)
}
