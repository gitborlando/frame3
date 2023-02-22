import { dtsPlugin } from 'esbuild-plugin-d.ts'
import * as esbuild from 'esbuild'

esbuild
  .context({
    bundle: true,
    format: 'esm',
    entryPoints: ['./src/index.ts'],
    outfile: './lib/index.js',
    sourcemap: true,
    plugins: [
      dtsPlugin({
        outDir: './lib',
      }),
    ],
    minify: true,
  })
  .then((ctx) => ctx.watch())
