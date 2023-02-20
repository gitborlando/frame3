npx esbuild src/index.ts \
  --bundle \
  --outfile=lib/index.js \
  --global-name=frame3 \
  --watch \
  --sourcemap
