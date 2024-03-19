import { URL, fileURLToPath } from 'node:url'

export default r({
  '@': './src',
  '@core': './src/core',
})

function r(aliasMap: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(aliasMap).map(([key, value]) => [
      key,
      fileURLToPath(new URL(value, import.meta.url)),
    ]),
  )
}
