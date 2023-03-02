import * as esbuild from 'esbuild'

const entryPoints = [{ in: './packages/vite-plugin/index.ts', out: '/vite-plugin/index' }]

esbuild
  .context({
    bundle: true,
    format: 'esm',
    entryPoints,
    outdir: './packages',
    platform: 'node',
    minify: true,
  })
  .then((ctx) => {
    ctx.watch()
    console.clear()
    console.log('watching plugin build')
  })
