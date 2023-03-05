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
      ;[
        'runtime-core/index.js',
        'runtime-core/index.js.map',
        'compiler-sfc/index.js',
        'compiler-sfc/index.js.map',
      ].forEach((i) => {
        if (existsSync(`./packages/${i}`)) {
          writeFileSync(`./packages/frame3/${i}`, readFileSync(`./packages/${i}`, 'utf-8'))
        }
      })
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
    sourcemap: true,
  })
  .then((ctx) => {
    ctx.watch()
    console.clear()
    console.log('is watching change...')
  })
