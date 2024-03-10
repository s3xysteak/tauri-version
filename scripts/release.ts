import { execSync } from 'node:child_process'

const versionList = ['major', 'minor', 'patch'] as const

type Version = (typeof versionList)[number]

const isValidVersion = (version: Version) => {
  return versionList.includes(version)
}

const version = process.argv[2] as Version
if (!isValidVersion(version)) {
  console.error(new Error('Invalid version'))
  process.exit(1)
}

execSync(`npm version ${version} -m "release: v%s"`, { stdio: 'inherit' })
execSync('git push --tags', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
