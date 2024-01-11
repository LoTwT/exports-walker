import { getDts, getExportStatements, parse } from "./utils"

export async function walkExports(source: string) {
  const ast = await parse(source)
  const exportStatements = getExportStatements(ast)
  const exportsCode = exportStatements.map((n) => n.text()).join("\n")

  return exportsCode
}

export async function getExportsDts(source: string) {
  const exportsCode = await walkExports(source)
  const dtsContent = await getDts(exportsCode)

  return dtsContent
}
