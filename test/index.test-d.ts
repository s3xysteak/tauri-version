import type { VersionBumpOptions } from 'bumpp'
import { expectTypeOf, test } from 'vitest'
import tauriVersion from '../src'

test('type', () => {
  const fn = tauriVersion()

  expectTypeOf(fn).toExtend<VersionBumpOptions['execute']>()
})
