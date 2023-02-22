npx esbuild src/core/index.ts \
  --bundle \
  --outfile=lib/index.js \
  --sourcemap \
  --format=esm \
  --watch \
  --minify
