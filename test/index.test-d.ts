import type { VersionBumpOptions } from 'bumpp'
import { expectTypeOf, test } from 'vitest'
import tauriVersion from '../src'

test('type', () => {
  const fn = tauriVersion()

  expectTypeOf(fn).toMatchTypeOf<VersionBumpOptions['execute']>()
  expectTypeOf(async () => { await fn() }).toMatchTypeOf<VersionBumpOptions['execute']>()
})
