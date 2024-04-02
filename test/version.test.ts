import { describe, expect, it } from 'vitest'

import { version } from '@core/version'

describe('version', () => {
  const v = '1.2.3'

  it('should work', () => {
    expect(version(v, 'patch')).toBe('1.2.4')
    expect(version(v, 'minor')).toBe('1.3.0')
    expect(version(v, 'major')).toBe('2.0.0')
  })

  it('should work with specified version', () => {
    expect(version(v, '1.3.0')).toBe('1.3.0')
  })
})
