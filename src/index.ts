import type { VersionBumpOptions } from 'bumpp'
import * as fs from 'node:fs/promises'
import { join } from 'pathe'
import { createRegex } from './handler'

export interface Options {
  lock: boolean
}

function tauri(options?: Partial<Options>): Extract<VersionBumpOptions['execute'], (...p: any[]) => any> {
  const defaultOptions: Options = {
    lock: true,
  }
  const opts: Options = {
    ...defaultOptions,
    ...options,
  }

  return async (ctx) => {
    if (!ctx)
      return

    const { cwd } = ctx.options
    const { newVersion, currentVersion } = ctx.state

    const getPath = (p: string) => join(cwd, 'src-tauri', p)

    const tauriConfJsonPath = getPath('tauri.conf.json')
    const tauriConfJsonContent = await fs.readFile(tauriConfJsonPath, 'utf-8')
    const name: string = JSON.parse(tauriConfJsonContent).productName

    const regex = createRegex(name, currentVersion, newVersion)

    const targetHandler = [
      // tauri.conf.json
      async () => {
        const updatedContent = regex.conf(tauriConfJsonContent)
        await fs.writeFile(tauriConfJsonPath, updatedContent, 'utf-8')
      },

      // Cargo.toml
      async () => {
        const path = getPath('Cargo.toml')
        const content = await fs.readFile(path, 'utf-8')
        const updatedContent = regex.toml(content)
        await fs.writeFile(path, updatedContent, 'utf-8')
      },

      // Cargo.lock
      async () => {
        if (!opts.lock)
          return

        const path = getPath('Cargo.lock')
        const content = await fs.readFile(path, 'utf-8')
        const updatedContent = regex.lock(content)
        await fs.writeFile(path, updatedContent, 'utf-8')
      },
    ]

    await Promise.all(targetHandler.map(fn => fn()))
  }
}

export default tauri
