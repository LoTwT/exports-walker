import { isAbsolute, resolve } from "node:path"
import { cwd } from "node:process"
import { ensureFile, exists, remove, writeFile } from "fs-extra"

export function isFileExists(path: string) {
  return exists(path)
}

export async function writeContent(content: string, filepath: string) {
  if (!isAbsolute(filepath)) {
    filepath = resolve(cwd(), filepath)
  }

  try {
    ensureFile(filepath)
    await writeFile(filepath, content, "utf8")
  } catch (error) {
    remove(filepath)
    throw error
  }
}
