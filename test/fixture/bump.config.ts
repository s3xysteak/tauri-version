import { fileURLToPath } from 'node:url'
import { defineConfig } from 'bumpp'
import tauri from 'tauri-version'

export default defineConfig({
  cwd: fileURLToPath(new URL('.', import.meta.url)),
  execute: tauri({
    lock: false,
  }),
})
