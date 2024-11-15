import { findSubStringEndIndex } from './utils'

/**
 * ## example
 * ```js
 * const [start, end] = findVersionIndex(content)
 * content.slice(start, end) // 0.0.1
 * ```
 */
export function findVersionIndex(content: string) {
  const packageEndIndex = findSubStringEndIndex(content, '[package]')

  const versionEndIndex = findSubStringEndIndex(
    content,
    'version',
    packageEndIndex,
  )

  const firstQuoteIndex = content.indexOf('"', versionEndIndex)
  const secondQuoteIndex = content.indexOf('"', firstQuoteIndex + 1)

  return [firstQuoteIndex + 1, secondQuoteIndex]
}

export function replaceTomlVersion(content: string, version: string) {
  const [start, end] = findVersionIndex(content)
  return content.slice(0, start) + version + content.slice(end)
}

export function getCargoVersion(content: string) {
  return content.slice(...findVersionIndex(content))
}
