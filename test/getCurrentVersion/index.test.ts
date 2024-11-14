import { getCurrentVersion } from '@/index'
import { describe, expect, it } from 'vitest'

describe('getCurrentVersion', () => {
  it('should return version when all versions match', () => {
    expect(getCurrentVersion('test/__e2e__')).toBe('0.0.1')
  })

  it('should throw error when versions mismatch', () => {
    expect(() => getCurrentVersion('test/getCurrentVersion/files')).toThrow('Version mismatch')
  })
})
