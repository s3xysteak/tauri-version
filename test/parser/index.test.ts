import { URL, fileURLToPath } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'

import {
  findSubStringEndIndex,
  replaceSubstring,
  tomlParser,
} from '@core/tomlParser'

describe('tomlParser', () => {
  it('replaceSubstring', () => {
    expect(replaceSubstring('012345', 'abc', 1, 4)).toBe('0abc45')
  })

  it('findSubStringEndIndex', () => {
    expect(findSubStringEndIndex('012345', '34')).toBe(4)
    expect(findSubStringEndIndex('xx12xx', 'xx', 1)).toBe(5)
  })

  it('tomlParser', () => {
    const base = fileURLToPath(new URL('./', import.meta.url))

    const content = readFileSync(resolve(base, './files/raw.toml'), 'utf-8')
    const val = tomlParser(content, '0.0.5')
    writeFileSync(resolve(base, './files/patch.toml'), val)

    expect(readFileSync(resolve(base, './files/patch.toml'), 'utf-8')).toBe(
      readFileSync(resolve(base, './files/patch-target.toml'), 'utf-8'),
    )
  })
})
