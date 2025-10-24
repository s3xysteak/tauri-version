import { execSync } from 'node:child_process'
import * as fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import consola from 'consola'
import { join } from 'pathe'
import { parse as parseTOML } from 'smol-toml'

const cwd = fileURLToPath(new URL('../test/fixture', import.meta.url))
type Keys = 'pkg' | 'conf' | 'cargo' | 'lock'
const paths: Record<Keys, string> = {
  pkg: join(cwd, 'package.json'),
  conf: join(cwd, 'src-tauri', 'tauri.conf.json'),
  cargo: join(cwd, 'src-tauri', 'Cargo.toml'),
  lock: join(cwd, 'src-tauri', 'Cargo.lock'),
}

const raw = await ready()

const currentVersion = await getVersions()
for (const [key, val] of Object.entries(currentVersion)) {
  if (val !== '1.0.0') {
    consola.error(`${key}: Wrong current version, which should be all 1.0.0`)
    process.exit(0)
  }
}

execSync('pnpm --filter=fixture release major', { stdio: 'inherit' })

async function callError(key?: string) {
  consola.error(`${key ? `${key}: ` : ''}Wrong new version, which should be all 2.0.0`)
  await reset()
  process.exit(0)
}
const newVersion = await getVersions()
const newVersionEntries = Object.entries(newVersion)
if (newVersionEntries.length !== 4) {
  callError()
}
for (const [key, val] of newVersionEntries) {
  if (val !== '2.0.0') {
    callError(key)
  }
}

consola.success('All tests passed!')
await reset()

// ---

async function ready() {
  return Object.fromEntries(await Promise.all(
    Object.entries(paths).map(async ([key, path]) => [
      key,
      [path, await fs.readFile(path, 'utf-8')],
    ]),
  )) as Record<Keys, [string, string]>
}

async function reset() {
  for (const [path, content] of Object.values(raw)) {
    await fs.writeFile(path, content)
  }
}

async function getVersions() {
  return Object.fromEntries(await Promise.all(
    Object.entries(paths).map(async ([key, path]) => {
      const toml = async () => {
        const result = parseTOML(await fs.readFile(path, 'utf-8'))

        return (result as any)?.package?.version ?? (result as any)?.package?.find((val: any) => val.name === '__e2e__').version
      }

      return [
        key,
        path.endsWith('.json')
          ? JSON.parse(await fs.readFile(path, 'utf-8')).version
          : await toml(),
      ]
    }),
  )) as Record<Keys, string>
}
