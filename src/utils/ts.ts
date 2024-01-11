import { ModuleKind, Project, ScriptTarget } from "ts-morph"

export const tsVirtualFileName = "_exrpots_walker_virutal.ts"

export async function getDts(code: string) {
  const project = new Project({
    compilerOptions: {
      declaration: true,
      target: ScriptTarget.ESNext,
      module: ModuleKind.ESNext,
    },
  })

  project.createSourceFile(tsVirtualFileName, code)

  const emitResult = await project.emitToMemory({ emitOnlyDtsFiles: true })

  const fileText = emitResult.getFiles()[0].text

  return fileText
}
