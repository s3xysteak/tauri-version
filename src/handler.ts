const BLOCK_REGEX = /\[\[package\]\][\s\S]*?(?=\[\[package\]\]|$)/g

export function createRegex(
  name: string,
  currentVersion: string,
  newVersion: string,
) {
  const TOML_NAME_REGEX = new RegExp(`name\\s+=\\s+"${escapeRegExp(name)}"`)
  const TOML_VERSION_REGEX = new RegExp(`(version\\s+=\\s+")(${escapeRegExp(currentVersion)})(")`)

  return {
    conf: (str: string) => str.replace(
      new RegExp(`("version"\\s*:\\s*")(${escapeRegExp(currentVersion)})(")`),
      `$1${newVersion}$3`,
    ),
    toml: (str: string) => str.replace(
      TOML_VERSION_REGEX,
      `$1${newVersion}$3`,
    ),
    lock: (str: string) => str.replace(BLOCK_REGEX, (block) => {
      if (!TOML_NAME_REGEX.test(block))
        return block

      return block.replace(TOML_VERSION_REGEX, `$1${newVersion}$3`)
    }),
  }
}

function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
