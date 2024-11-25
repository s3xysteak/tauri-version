import type { VersionBumpOptions } from 'bumpp'
import { promises as fs, watch as fsWatch } from 'node:fs'
import consola from 'consola'
import { resolve } from 'pathe'

export interface Options {
  lock: boolean | number
}

function tauri(options?: Partial<Options>): VersionBumpOptions['execute'] {
  const defaultOptions: Options = {
    lock: 1000 * 3,
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

    const pathUnderTauri = (p: string) => resolve(cwd, 'src-tauri', p)
    const targetHandler = [
      // tauri.conf.json
      async () => {
        const path = pathUnderTauri('tauri.conf.json')
        const content = await fs.readFile(path, 'utf-8')
        const updatedContent = content.replace(new RegExp(`"version"\\s*:\\s*"${escapeRegExp(currentVersion)}"`), `"version": "${newVersion}"`)
        await fs.writeFile(path, updatedContent, 'utf-8')
      },

      // Cargo.toml
      async () => {
        const path = pathUnderTauri('Cargo.toml')
        const content = await fs.readFile(path, 'utf-8')
        const updatedContent = content.replace(new RegExp(`version\\s*=\\s*"${escapeRegExp(currentVersion)}"`), `version = "${newVersion}"`)
        await fs.writeFile(path, updatedContent, 'utf-8')
      },

      // Cargo.lock
      async () => {
        if (!opts.lock)
          return

        const path = pathUnderTauri('Cargo.lock')

        const watcher = fsWatch(path, (e) => {
          if (e !== 'change')
            return

          watcher.close()
        })

        if (typeof opts.lock === 'number') {
          setTimeout(() => {
            watcher.close()
            consola.warn('Cargo.lock not updated in time, ignore it.')
          }, opts.lock)
        }

        const watcherPromise = () => new Promise<void>(res => watcher.addListener('close', res))
        await watcherPromise()
      },
    ]

    await Promise.all(targetHandler.map(fn => fn()))
  }
}

function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export default tauri
