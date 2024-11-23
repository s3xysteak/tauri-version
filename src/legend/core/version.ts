const VERSION_OPTIONS = ['patch', 'minor', 'major'] as const

export type VersionOption = typeof VERSION_OPTIONS[number]

export function version(str: string, targetVer: VersionOption | string): string {
  if (targetVer === undefined)
    throw new Error('Missed version.')

  if (!VERSION_OPTIONS.includes(targetVer as VersionOption))
    return targetVer

  let versionArr: number[]

  try {
    versionArr = str.split('.').map(v => Number(v))
  }
  catch {
    throw new Error('Invalid project version.')
  }

  if (versionArr.length !== 3)
    throw new Error('Invalid project version.')

  const versionMap: Record<string, (arr: number[]) => number[]> = {
    patch: arr => [arr[0], arr[1], arr[2] + 1],
    minor: arr => [arr[0], arr[1] + 1, 0],
    major: arr => [arr[0] + 1, 0, 0],
  }

  return versionMap[targetVer](versionArr).join('.')
}
