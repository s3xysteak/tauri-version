import { execSync } from 'node:child_process'
import * as fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import consola from 'consola'
import { resolve } from 'pathe'
import { parse as parseTOML } from 'smol-toml'

const cwd = fileURLToPath(new URL('../test/fixture', import.meta.url))

const raw = await ready()

const currentVersion = await getVersions()
if ([...new Set(Object.values(currentVersion))][0] !== '1.0.0') {
  consola.error('Wrong current version, which should be all 1.0.0')
  process.exit(0)
}

execSync('pnpm --filter=fixture release major', { stdio: 'inherit' })
const newVersion = await getVersions()
const arr = [...new Set(Object.values(newVersion))]
if (arr.length !== 1 || arr[0] !== '2.0.0') {
  consola.error('Wrong new version, which should be all 2.0.0')
  await reset()
  process.exit(0)
}
consola.success('All tests passed!')

await reset()

// ---

type Keys = 'pkg' | 'conf' | 'cargo'

async function ready() {
  const val = {
    pkg: resolve(cwd, 'package.json'),
    conf: resolve(cwd, 'src-tauri', 'tauri.conf.json'),
    cargo: resolve(cwd, 'src-tauri', 'Cargo.toml'),
  }

  return Object.fromEntries(await Promise.all(
    Object.entries(val).map(async ([key, path]) => [
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
  const val = {
    pkg: resolve(cwd, 'package.json'),
    conf: resolve(cwd, 'src-tauri', 'tauri.conf.json'),
    cargo: resolve(cwd, 'src-tauri', 'Cargo.toml'),
  }

  return Object.fromEntries(await Promise.all(
    Object.entries(val).map(async ([key, path]) => [
      key,
      path.endsWith('.json')
        ? JSON.parse(await fs.readFile(path, 'utf-8')).version
        : (parseTOML(await fs.readFile(path, 'utf-8')).package as any).version,
    ]),
  )) as Record<Keys, string>
}
