import { defineConfig } from 'bumpp'
import tauri from '../../src/index'

export default defineConfig({
  execute: tauri(),
})
