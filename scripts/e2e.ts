import { exec } from 'node:child_process'
import { promises as fs } from 'node:fs'
import process from 'node:process'
import { findSubStringEndIndex } from '@/core/tomlParser'
import { version } from '@/core/version'
import { consola } from 'consola'

let rawContent: {
  package: string[]
  tauriConf: string[]
  toml: string[]
  lock: string[]
}

await e2e()
await e2eReset()

async function e2e() {
  const raw = await getVersions()
  rawContent = raw.contents

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      exec('cd ./test/__e2e__/src-tauri && cargo run')
    }, 1000)

    const child = exec('esno ./src/cli.ts patch -b "test/__e2e__" --no-git', async () => {
      const after = await getVersions()

      for (const key of objectKeys(raw.versions)) {
        if (version(raw.versions[key], 'patch') !== after.versions[key])
          throw new Error(`Version ${key} is not the expected value.`)
      }

      consola.success('e2e pass.')
      resolve()

      /** End */
    })
    child.stdout?.pipe(process.stdout)
  })
}
async function e2eReset() {
  for (const [path, content] of Object.values(rawContent))
    await fs.writeFile(path, content, 'utf-8')

  /** End */
}

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
async function getVersions() {
  const packagePath = 'test/__e2e__/package.json'
  const packageContent = await fs.readFile(packagePath, 'utf-8')

  const tauriConfPath = 'test/__e2e__/src-tauri/tauri.conf.json'
  const tauriConf = await fs.readFile(tauriConfPath, 'utf-8')

  const tomlPath = 'test/__e2e__/src-tauri/Cargo.toml'
  const toml = await fs.readFile(tomlPath, 'utf-8')

  const lockPath = 'test/__e2e__/src-tauri/Cargo.lock'
  const lock = await fs.readFile(lockPath, 'utf-8')

  return {
    versions: {
      package: JSON.parse(packageContent).version,
      tauriConf: JSON.parse(tauriConf).version,
      toml: getTomlVersion(toml),
      lock: getTomlVersion(lock),
    },
    contents: {
      package: [packagePath, packageContent],
      tauriConf: [tauriConfPath, tauriConf],
      toml: [tomlPath, toml],
      lock: [lockPath, lock],
    },
  }
}
function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}
