import process from 'node:process'
import { isAbsolute, resolve } from 'pathe'

export function toAbsolute(path: string, base = process.cwd()) {
  return isAbsolute(base) ? resolve(base, path) : resolve(process.cwd(), base, path)
}

/**
 * ## example
 * ```js
 * findSubStringEndIndex('012345', '34')).toBe(4) // true
 * ```
 */
export function findSubStringEndIndex(str: string, sub: string, start?: number): number {
  const val = str.indexOf(sub, start)
  return val === -1 ? -1 : val + sub.length - 1
}

/** Only for type check */
export function readOnly<T>(p: T): Readonly<T> {
  return p
}
