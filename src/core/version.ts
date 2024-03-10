export type VersionOption = 'patch' | 'minor' | 'major'

export function version(str: string, options: VersionOption) {
  const versionArr = str.split('.').map(v => Number(v))

  if (versionArr.length !== 3) {
    throw new Error('Invalid version')
  }

  const versionMap: Record<string, (arr: number[]) => number[]> = {
    patch: arr => [arr[0], arr[1], arr[2] + 1],
    minor: arr => [arr[0], arr[1] + 1, 0],
    major: arr => [arr[0] + 1, 0, 0]
  }

  return versionMap[options](versionArr).join('.')
}
