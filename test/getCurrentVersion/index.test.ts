import { getCurrentVersion } from '@/index'
import { describe, expect, it } from 'vitest'

describe('getCurrentVersion', () => {
    it('should return version when all versions match', () => {
        expect(getCurrentVersion('test/__e2e__')).toBe('0.0.1')
    })
})
