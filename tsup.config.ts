import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    format: ["esm", "cjs"],
    target: "esnext",
    clean: true,
    dts: true,
    splitting: true,
    cjsInterop: true,
  },
  {
    entry: ["./src/bin/index.ts"],
    format: ["cjs"],
    target: "esnext",
    outDir: "dist/bin",
    clean: true,
    dts: false,
    splitting: false,
    cjsInterop: true,
  },
])
