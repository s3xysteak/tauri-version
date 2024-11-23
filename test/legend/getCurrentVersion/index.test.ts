import { createContext, getCurrentVersion } from '@/legend/index'
import { describe, expect, it } from 'vitest'

describe('getCurrentVersion', () => {
  it('should return version when all versions match', () => {
    const ctx = createContext('patch', 'test/legend/__e2e__')
    expect(getCurrentVersion(ctx)).toBe('0.0.1')
  })

  it('should throw error when versions mismatch', () => {
    const ctx = createContext('patch', 'test/legend/getCurrentVersion/files')
    expect(() => getCurrentVersion(ctx)).toThrow('Version mismatch')
  })
})
