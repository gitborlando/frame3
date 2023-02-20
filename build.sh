npx esbuild src/index.ts \
  --bundle \
  --outfile=lib/index.iife.js \
  --global-name=frame3 \
  --sourcemap

npx esbuild src/index.ts \
  --bundle \
  --outfile=lib/index.mjs \
  --sourcemap \
  --format=esm
