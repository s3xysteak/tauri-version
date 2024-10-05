import { copyFileSync, readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { io, isV1 } from '@core/io'
import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'

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
    copyFileSync(resolve(base, './raw.txt'), resolve(base, './lab.txt'))
    const rawContent = readFileSync(resolve(base, './raw.txt'), 'utf-8')
    const targetContent = readFileSync(resolve(base, './target.txt'), 'utf-8')

    const IO = io(resolve(base, './lab.txt'))
    const content = IO.read()
    expect(content).toBe(rawContent)

    IO.write('I am target.')
    expect(IO.read()).toBe(targetContent)
  })
})
