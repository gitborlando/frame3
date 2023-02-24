import * as esbuild from 'esbuild'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const entryPoints = [
  { in: './packages/runtime-core/src/index.ts', out: '/runtime-core/index' },
  { in: './packages/compiler-sfc/src/index.ts', out: '/compiler-sfc/index' },
]

const plugin = {
  name: 'buildOnEnd',
  setup(build) {
    build.onEnd(() => {
      if (existsSync('./packages/runtime-core/index.js')) {
        writeFileSync(
          './packages/frame3/runtime-core/index.js',
          readFileSync('./packages/runtime-core/index.js', 'utf-8')
        )
      }
      if (existsSync('./packages/compiler-sfc/index.js')) {
        writeFileSync(
          './packages/frame3/compiler-sfc/index.js',
          readFileSync('./packages/compiler-sfc/index.js', 'utf-8')
        )
      }
    })
  },
}

esbuild
  .context({
    bundle: true,
    format: 'esm',
    entryPoints,
    outdir: './packages',
    minify: true,
    plugins: [plugin],
    // sourcemap: true,
  })
  .then((ctx) => {
    ctx.watch()
    console.log('is watching change...')
  })
