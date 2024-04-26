import { promises as fs } from 'node:fs'
import { exec } from 'node:child_process'
import { consola } from 'consola'
import { findSubStringEndIndex } from '@/core/tomlParser'
import { version } from '@/core/version'

const raw = await getVersions()

setTimeout(() => {
  exec('cd ./test/__e2e__/src-tauri && cargo run')
}, 1000)

exec('esno ./src/cli.ts patch -b "test/__e2e__" --no-git', async () => {
  const after = await getVersions()

  for (const key of Object.keys(raw)) {
    if (version(raw[key], 'patch') !== after[key])
      throw new Error(`Version ${key} is not the expected value.`)
  }

  consola.success('e2e pass.')
})

/** End */

function getTomlVersion(content: string) {
  const packageEndIndex = findSubStringEndIndex(content, 'name = "__e2e__"')

  const versionEndIndex = findSubStringEndIndex(
    content,
    'version',
    packageEndIndex,
  )

  const firstQuoteIndex = content.indexOf('"', versionEndIndex)
  const secondQuoteIndex = content.indexOf('"', firstQuoteIndex + 1)

  return content.substring(firstQuoteIndex + 1, secondQuoteIndex)
}
async function getVersions(): Promise<Record<string, string>> {
  const packageContent = await fs.readFile('test/__e2e__/package.json', 'utf-8')
  const tauriConf = await fs.readFile('test/__e2e__/src-tauri/tauri.conf.json', 'utf-8')
  const toml = await fs.readFile('test/__e2e__/src-tauri/Cargo.toml', 'utf-8')
  const lock = await fs.readFile('test/__e2e__/src-tauri/Cargo.lock', 'utf-8')

  return {
    package: JSON.parse(packageContent).version,
    tauriConf: JSON.parse(tauriConf).version,
    toml: getTomlVersion(toml),
    lock: getTomlVersion(lock),
  }
}
