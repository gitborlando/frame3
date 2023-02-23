import * as esbuild from 'esbuild'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'

if (!existsSync('./lib')) mkdirSync('./lib')
writeFileSync('./lib/index.d.ts', readFileSync('./src/runtime/dts.txt'))

esbuild
  .context({
    bundle: true,
    format: 'esm',
    entryPoints: readdirSync('./src/export')
      .filter((file) => !file.match(/vite-plugin/))
      .map((file) => ({
        in: `./src/export/${file}`,
        out: `${file.replace(/.ts$/, '')}`,
      })),
    outdir: 'lib',
    sourcemap: true,
    minify: true,
    platform: 'node',
  })
  .then((ctx) => {
    ctx.watch()
    console.log('is watching change...')
  })
