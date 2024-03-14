import { URL, fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { copyFileSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { io, isV1 } from '@core/io'

describe('io', () => {
  it('isV1', () => {
    const v1 = {
      package: {
        productName: 'lethal-company-mods-copier',
        version: '0.0.5',
      },
      plugins: [],
      tauri: {},
      build: {},
    }
    const v2 = {
      productName: 'tauri-v2',
      version: '0.0.0',
      identifier: 'com.tauri.dev',
      plugins: [],
      bundle: {},
      app: {},
      build: {},
    }

    expect(isV1(v1)).toBe(true)
    expect(isV1(v2)).toBe(false)
  })

  it('io', () => {
    const base = fileURLToPath(new URL('./', import.meta.url))
    copyFileSync(join(base, './raw.txt'), join(base, './lab.txt'))
    const rawContent = readFileSync(join(base, './raw.txt'), 'utf-8')
    const targetContent = readFileSync(join(base, './target.txt'), 'utf-8')

    const IO = io(join(base, './lab.txt'))
    const content = IO.read()
    expect(content).toBe(rawContent)

    IO.write('I am target.')
    expect(IO.read()).toBe(targetContent)
  })
})
