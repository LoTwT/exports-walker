import { type SgNode, ts } from "@ast-grep/napi"
import fse from "fs-extra"
import { isFileExists } from "./fs"

export async function parse(source: string): Promise<SgNode> {
  if (await isFileExists(source)) source = await fse.readFile(source, "utf8")

  const ast = ts.parse(source).root()

  return ast
}

export function getExportStatements(node: SgNode) {
  return node.findAll({
    rule: {
      kind: "export_statement",
    },
  })
}
