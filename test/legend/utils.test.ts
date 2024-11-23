import { findSubStringEndIndex, toAbsolute } from '@/legend/core/utils'
import { normalize } from 'pathe'
import { describe, expect, it } from 'vitest'

describe('utils', () => {
  it('toAbsolute', () => {
    expect(toAbsolute('a')).toBe(normalize(`${process.cwd()}/a`))
    expect(toAbsolute('a', '/b')).toBe(normalize('/b/a'))
    expect(toAbsolute('a', 'b')).toBe(normalize(`${process.cwd()}/b/a`))
  })

  it('findSubStringEndIndex', () => {
    expect(findSubStringEndIndex('012345', '34')).toBe(4)
    expect(findSubStringEndIndex('xx12xx', 'xx', 1)).toBe(5)
  })
})
