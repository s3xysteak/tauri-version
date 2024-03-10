import { readFileSync, writeFileSync } from 'node:fs'
import { it, expect } from 'vitest'

import {
  replaceSubstring,
  findSubStringEndIndex,
  tomlParser
} from '@core/tomlParser'
import { version } from '@core/version'

it('replaceSubstring', () => {
  expect(replaceSubstring('012345', 'abc', 1, 4)).toBe('0abc45')
})

it('findSubStringEndIndex', () => {
  expect(findSubStringEndIndex('012345', '34')).toBe(4)
  expect(findSubStringEndIndex('xx12xx', 'xx', 1)).toBe(5)
})

it('version', () => {
  const v = '1.2.3'

  expect(version(v, 'patch')).toBe('1.2.4')
  expect(version(v, 'minor')).toBe('1.3.0')
  expect(version(v, 'major')).toBe('2.0.0')
})

it('tomlParser', () => {
  const content = readFileSync('test/files/raw.toml', 'utf-8')
  const val = tomlParser(content, '0.0.5')
  writeFileSync('test/files/patch.toml', val)

  expect(readFileSync('test/files/patch.toml', 'utf-8')).toBe(
    readFileSync('test/files/patch-target.toml', 'utf-8')
  )
})
