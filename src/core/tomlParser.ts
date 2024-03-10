export const findSubStringEndIndex = (
  str: string,
  sub: string,
  start?: number
): number => {
  const val = str.indexOf(sub, start)
  return val === -1 ? -1 : val + sub.length - 1
}

export const replaceSubstring = (
  str: string,
  replacement: string,
  start: number,
  end: number
) => str.substring(0, start) + replacement + str.substring(end)

export function tomlParser(content: string, version: string) {
  const packageEndIndex = findSubStringEndIndex(content, '[package]')

  const versionEndIndex = findSubStringEndIndex(
    content,
    'version',
    packageEndIndex
  )

  const firstQuoteIndex = content.indexOf('"', versionEndIndex)
  const secondQuoteIndex = content.indexOf('"', firstQuoteIndex + 1)

  return replaceSubstring(
    content,
    version,
    firstQuoteIndex + 1,
    secondQuoteIndex
  )
}
