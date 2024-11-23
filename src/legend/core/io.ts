import { readFileSync, writeFileSync } from 'node:fs'

export function isV1(conf: Record<string, any>): boolean {
  return !!conf?.package
}

export function io(path: string) {
  const read = () => readFileSync(path, 'utf-8')
  const write = (content: string) => writeFileSync(path, content)

  return {
    read,
    write,
  }
}
