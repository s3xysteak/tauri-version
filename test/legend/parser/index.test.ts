import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { findVersionIndex, getCargoVersion, replaceTomlVersion } from '@/legend/core/tomlParser'
import { resolve } from 'pathe'

import { describe, expect, it } from 'vitest'

describe('tomlParser', () => {
  const path = (p: string) => resolve(fileURLToPath(new URL('./', import.meta.url)), p)
  const content = readFileSync(path('./files/raw.toml'), 'utf-8')

  it('findVersionIndex', () => {
    expect(
      content.slice(...findVersionIndex(content)),
    ).toBe('0.0.4')
  })

  it('replaceTomlVersion', () => {
    expect(
      content.slice(...findVersionIndex(content)),
    ).toBe('0.0.4')

    const val = replaceTomlVersion(content, '0.0.5')
    writeFileSync(path('./files/patch.toml'), val)

    expect(readFileSync(path('./files/patch.toml'), 'utf-8')).toBe(
      readFileSync(path('./files/patch-target.toml'), 'utf-8'),
    )
  })

  it('getCargoVersion', () => {
    expect(getCargoVersion(content)).toBe('0.0.4')
  })
})
