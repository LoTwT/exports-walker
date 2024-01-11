import { defu } from "defu"
import { getDts, getExportStatements, parse, writeContent } from "./utils"

export async function walkExports(source: string) {
  const ast = await parse(source)
  const exportStatements = getExportStatements(ast)
  const exportsCode = exportStatements.map((n) => n.text()).join("\n")

  return exportsCode
}

export interface WalkOptions {
  write?: boolean
  writePath?: string
}

const defaultWalkOptions: WalkOptions = {
  write: false,
  writePath: "exports.d.ts",
}

export async function walk(source: string, options: WalkOptions = {}) {
  const { write, writePath } = defu(options, defaultWalkOptions)

  const exportsCode = await walkExports(source)
  const dtsContent = await getDts(exportsCode)

  if (write && writePath) {
    await writeContent(dtsContent, writePath)
  }

  return dtsContent
}
