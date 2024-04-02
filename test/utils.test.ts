import { describe, expect, it } from 'vitest'
import { normalize } from 'pathe'
import { toAbsolute } from '@core/utils'

describe('toAbsolute', () => {
  it('should work', () => {
    expect(toAbsolute('a')).toBe(normalize(`${process.cwd()}/a`))
    expect(toAbsolute('a', '/b')).toBe(normalize('/b/a'))
    expect(toAbsolute('a', 'b')).toBe(normalize(`${process.cwd()}/b/a`))
  })
})
