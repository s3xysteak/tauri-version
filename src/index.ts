import { readFile, writeFileSync } from 'node:fs'
import { join, normalize } from 'node:path'

import { jsonParser } from '@core/jsonParser'
import { tomlParser } from '@core/tomlParser'
import type { VersionOption } from '@core/version'

function tauriVersion(options: VersionOption, _path = './src-tauri/') {
  const path = normalize(join(process.cwd(), _path))

  /** Cargo */
  readFile(join(path, 'Cargo.toml'), 'utf-8', (err, data) => {
    if (err) throw err
    writeFileSync(join(path, 'Cargo.toml'), tomlParser(data, options))
  })
  /** Conf */
  readFile(join(path, 'tauri.conf.json'), 'utf-8', (err, data) => {
    if (err) throw err
    writeFileSync(join(path, 'tauri.conf.json'), jsonParser(data, options))
  })
}
export default tauriVersion
