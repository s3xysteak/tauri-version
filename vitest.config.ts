import { defaultExclude, defineConfig } from 'vitest/config'
import alias from './alias'

export default defineConfig({
  test: {
    environment: 'node',
    exclude: [
      ...defaultExclude,
    ],
    typecheck: {
      enabled: true,
    },
    alias,
  },
})
