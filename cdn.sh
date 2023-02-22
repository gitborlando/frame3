npx esbuild src/cdn.ts \
  --bundle \
  --outfile=lib/cdn.js \
  --sourcemap \
  --format=esm \
  --watch
