import { defineConfig } from 'vitest/config'
import alias from './alias'

export default defineConfig({
  test: {
    environment: 'node',
    typecheck: {
      enabled: true,
    },
    alias,
  },
})
