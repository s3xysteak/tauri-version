import { readFileSync, writeFileSync } from 'node:fs'
import { join, normalize } from 'node:path'

import { jsonParser } from '@core/jsonParser'
import { tomlParser } from '@core/tomlParser'
import type { VersionOption } from '@core/version'

function tauriVersion(options: VersionOption, _path = './src-tauri/') {
  const path = normalize(join(process.cwd(), _path))

  /** Cargo */
  const tomlContent = readFileSync(join(path, 'Cargo.toml'), 'utf-8')
  writeFileSync(join(path, 'Cargo.toml'), tomlParser(tomlContent, options))
  /** Conf */
  const confContent = readFileSync(join(path, 'tauri.conf.json'), 'utf-8')
  writeFileSync(join(path, 'tauri.conf.json'), jsonParser(confContent, options))
}
export default tauriVersion
