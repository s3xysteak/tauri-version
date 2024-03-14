import { expect, it } from 'vitest'

import { version } from '@core/version'

it('version', () => {
  const v = '1.2.3'

  expect(version(v, 'patch')).toBe('1.2.4')
  expect(version(v, 'minor')).toBe('1.3.0')
  expect(version(v, 'major')).toBe('2.0.0')
})
