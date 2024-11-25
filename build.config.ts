import { defineBuildConfig } from 'unbuild'

import alias from './alias'
import pkg from './package.json'

export default defineBuildConfig({
  declaration: true,
  externals: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)],
  rollup: {
    esbuild: {
      minify: true,
    },
    inlineDependencies: true,
  },
  alias,
})
