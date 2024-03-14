/// <reference types="vitest" />

import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: ['./src/index.ts', './src/cli.ts'],
      formats: ['es', 'cjs'],
      fileName: (format, fileName) => {
        const name = fileName.endsWith('cli') ? 'cli' : 'index'
        const ext = format === 'es' ? 'mjs' : 'cjs'
        return `${name}.${ext}`
      },
    },
    rollupOptions: {
      external: [
        'node:fs',
        'node:path',
        'node:child_process',
        'node:process',
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
  test: {
    environment: 'node',
    exclude: [
      ...configDefaults.exclude,
      'e2e/*',
      '**/public/**',
      '**/.{vscode,svn}/**',
    ],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
    },
  },
})
